'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
    createGlobeTexture,
    createLandMaskTexture,
    createBorderTexture,
    createCharTexture,
    lonLatToCameraPos,
    getFeatureCentroid,
    easeInOut,
    GeoJSONData
} from './GlobeUtils';
import './GlobeStyles.css';

const HIGHLIGHTED_COUNTRIES = [
    "Gambia",
    "Senegal",
    "Ghana",
    "Sierra Leone",
    "Liberia",
    "South Africa",
];

const COUNTRY_DATA: Record<string, { desc: string; lon: string; lat: string }> = {
    "Gambia": {
        desc: "Located on the west coast of Africa, it is the smallest country on mainland Africa. It is known for its diverse ecosystems around the central Gambia River.",
        lon: "15.3101° W", lat: "13.4432° N"
    },
    "Senegal": {
        desc: "The westernmost country in the Cape Verde peninsula, Senegal is a gateway to Africa with a rich colonial heritage and vibrant culture.",
        lon: "14.4524° W", lat: "14.4974° N"
    },
    "Ghana": {
        desc: "Located along the Gulf of Guinea, Ghana is a beacon of stability and economic growth, known for its diverse wildlife and rich history.",
        lon: "1.0232° W", lat: "7.9465° N"
    },
    "Sierra Leone": {
        desc: "A West African nation with a stunning coastline and significant mineral wealth, Sierra Leone is emerging as a resilient hub for digital security and integrity.",
        lon: "11.7799° W", lat: "8.4606° N"
    },
    "Liberia": {
        desc: "Africa's oldest republic, Liberia is known for its lush rainforests and vital maritime sector along the Atlantic coast.",
        lon: "9.4295° W", lat: "6.4281° N"
    },
    "South Africa": {
        desc: "The southernmost power, defined by its advanced industrial index and major financial centers. A critical hub for continent-wide digital infrastructure.",
        lon: "22.9375° E", lat: "30.5595° S"
    }
};

const BASE_R = 2.0;
const CAM_FAR = 5.0;
const CAM_NEAR = 3.2;
const ROTATE_DURATION = 2.0;
const ZOOM_IN_DURATION = 1.4;
const PAUSE_DURATION = 2.5;
const ZOOM_OUT_DURATION = 1.0;

export default function ZorahGlobe() {
    const mountRef = useRef<HTMLDivElement>(null);
    const hudRef = useRef<HTMLDivElement>(null);
    const [currentIdx, setCurrentIdx] = useState(-1);
    const [phase, setPhase] = useState("idle");

    useEffect(() => {
        if (!mountRef.current) return;

        // --- Scene Setup ---
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#ffffff");
        scene.fog = new THREE.FogExp2(0xf4f7fa, 0.1);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const globeGroup = new THREE.Group();
        scene.add(globeGroup);

        // Lights
        scene.add(new THREE.AmbientLight(0xffffff, 0.9));
        const sunLight = new THREE.DirectionalLight(0xffffff, 0.7);
        sunLight.position.set(5, 5, 5);
        scene.add(sunLight);
        const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
        rimLight.position.set(-5, 2, -5);
        scene.add(rimLight);

        let mistMat: THREE.ShaderMaterial;

        // Animation Shared State
        const anim = {
            phase: 'idle',
            t: 0,
            pauseTimer: 0,
            idx: -1,
            targets: [] as THREE.Vector3[],
            centroids: [] as THREE.Vector3[],
            startRot: new THREE.Euler(),
            endRot: new THREE.Euler(),
        };

        const overlayMeshes: THREE.Mesh[] = [];

        function updateCameraOffset() {
            if (!mountRef.current) return;
            const nw = mountRef.current.clientWidth;
            const nh = mountRef.current.clientHeight;
            if (nw <= 0 || nh <= 0) return;

            camera.aspect = nw / nh;
            camera.updateProjectionMatrix();
            renderer.setSize(nw, nh);

            // Position globe on the right by creating a larger virtual canvas
            // and viewing the left portion of it. Center is at fullWidth/2.
            const fullWidth = nw * 1.5;
            camera.setViewOffset(fullWidth, nh, 0, 0, nw, nh);
        }
        updateCameraOffset();
        window.addEventListener('resize', updateCameraOffset);

        // --- Data Initialization ---
        async function init() {
            const res = await fetch('/geojson/countries.json');
            const data: GeoJSONData = await res.json();

            // 1. Base Globe
            const baseTex = await createGlobeTexture({ json: data });
            const baseGlobe = new THREE.Mesh(
                new THREE.SphereGeometry(BASE_R, 128, 128),
                new THREE.MeshBasicMaterial({ map: baseTex, transparent: true, opacity: 0.7, side: THREE.DoubleSide })
            );
            globeGroup.add(baseGlobe);

            // 2. Highlighting Meshes
            for (const name of HIGHLIGHTED_COUNTRIES) {
                const feature = data.features.find(f => f.properties.name === name);
                if (!feature) continue;

                const singleData: GeoJSONData = { ...data, features: [feature] };
                const mask = await createLandMaskTexture({ json: singleData });
                const mesh = new THREE.Mesh(
                    new THREE.SphereGeometry(BASE_R + 0.005, 128, 128),
                    new THREE.MeshBasicMaterial({ map: mask, transparent: true, opacity: 0, depthWrite: false })
                );
                overlayMeshes.push(mesh);
                globeGroup.add(mesh);

                const [lon, lat] = getFeatureCentroid(feature);
                const pos = lonLatToCameraPos(lon, lat, BASE_R);
                anim.targets.push(pos);
                anim.centroids.push(pos.clone());
            }

            // 3. Borders
            const borderTex = await createBorderTexture({ json: data });
            globeGroup.add(new THREE.Mesh(
                new THREE.SphereGeometry(BASE_R + 0.002, 128, 128),
                new THREE.MeshBasicMaterial({ map: borderTex, transparent: true, depthWrite: false })
            ));

            // 4. Mist
            mistMat = new THREE.ShaderMaterial({
                uniforms: {
                    glowColor: { value: new THREE.Color("#d0e2f5") },
                    viewVector: { value: camera.position }
                },
                vertexShader: `
          uniform vec3 viewVector;
          varying float intensity;
          void main() {
            vec3 vNormal = normalize( normalMatrix * normal );
            vec3 vNormel = normalize( normalMatrix * viewVector );
            intensity = pow( 0.7 - dot(vNormal, vNormel), 3.0 );
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }
        `,
                fragmentShader: `
          uniform vec3 glowColor;
          varying float intensity;
          void main() { gl_FragColor = vec4( glowColor, intensity * 0.4 ); }
        `,
                side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true
            });
            globeGroup.add(new THREE.Mesh(new THREE.SphereGeometry(BASE_R * 1.08, 64, 64), mistMat));

            // 5. Particles
            const tex0 = createCharTexture('0');
            const tex1 = createCharTexture('1');
            const createParticles = (texture: THREE.Texture) => {
                const count = 800;
                const pos = new Float32Array(count * 3);
                const col = new Float32Array(count * 3);
                for (let i = 0; i < count; i++) {
                    const r = BASE_R + Math.random() * 0.15;
                    const phi = Math.random() * Math.PI * 2, theta = Math.random() * Math.PI;
                    pos[i * 3] = r * Math.sin(theta) * Math.cos(phi);
                    pos[i * 3 + 1] = r * Math.cos(theta);
                    pos[i * 3 + 2] = r * Math.sin(theta) * Math.sin(phi);
                    const b = 0.3 + Math.random() * 0.4;
                    col[i * 3] = b * 0.2; col[i * 3 + 1] = b * 0.4; col[i * 3 + 2] = b * 0.6;
                }
                const geom = new THREE.BufferGeometry();
                geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
                geom.setAttribute('color', new THREE.BufferAttribute(col, 3));
                return new THREE.Points(geom, new THREE.PointsMaterial({
                    size: 0.05, map: texture, vertexColors: true, transparent: true, opacity: 0.4, depthWrite: false
                }));
            };
            globeGroup.add(createParticles(tex0));
            globeGroup.add(createParticles(tex1));

            goToNext();
        }

        function setHighlight(idx: number, t: number) {
            const mesh = overlayMeshes[idx];
            if (mesh) {
                const material = mesh.material;
                if (Array.isArray(material)) {
                    material.forEach(m => {
                        if ('opacity' in m) (m as THREE.MeshBasicMaterial).opacity = t;
                    });
                } else {
                    if ('opacity' in material) (material as THREE.MeshBasicMaterial).opacity = t;
                }
            }
        }

        function goToNext() {
            if (anim.idx >= 0) setHighlight(anim.idx, 0);
            anim.idx = (anim.idx + 1) % anim.targets.length;
            setCurrentIdx(anim.idx);
            anim.startRot.copy(globeGroup.rotation);
            const dummy = new THREE.Object3D();
            dummy.lookAt(anim.targets[anim.idx].clone().normalize());
            const targetEuler = new THREE.Euler().setFromQuaternion(dummy.quaternion.invert());
            anim.endRot.copy(targetEuler);
            if (Math.abs(anim.endRot.y - anim.startRot.y) > Math.PI) {
                anim.endRot.y += (anim.endRot.y > anim.startRot.y) ? -Math.PI * 2 : Math.PI * 2;
            }
            anim.t = 0;
            anim.phase = 'rotating';
            setPhase('rotating');
        }

        const clock = new THREE.Clock();
        function animate() {
            const requestID = requestAnimationFrame(animate);
            const dt = clock.getDelta();

            switch (anim.phase) {
                case 'rotating':
                    anim.t = Math.min(1, anim.t + dt / ROTATE_DURATION);
                    const e = easeInOut(anim.t);
                    const axes = ['x', 'y', 'z'] as const;
                    axes.forEach((axis) => {
                        globeGroup.rotation[axis] = THREE.MathUtils.lerp(anim.startRot[axis], anim.endRot[axis], e);
                    });
                    camera.position.set(0, 0, CAM_FAR);
                    camera.lookAt(0, 0, 0);
                    if (anim.t >= 1) { anim.t = 0; anim.phase = 'zoom-in'; setPhase('zoom-in'); }
                    break;
                case 'zoom-in':
                    anim.t = Math.min(1, anim.t + dt / ZOOM_IN_DURATION);
                    camera.position.set(0, 0, THREE.MathUtils.lerp(CAM_FAR, CAM_NEAR, easeInOut(anim.t)));
                    setHighlight(anim.idx, easeInOut(anim.t));
                    if (anim.t >= 1) { anim.pauseTimer = 0; anim.phase = 'pausing'; setPhase('pausing'); }
                    break;
                case 'pausing':
                    setHighlight(anim.idx, 1);
                    globeGroup.rotation.y += dt * 0.06;
                    anim.pauseTimer += dt;
                    if (anim.pauseTimer >= PAUSE_DURATION) { anim.t = 0; anim.phase = 'zoom-out'; setPhase('zoom-out'); }
                    break;
                case 'zoom-out':
                    anim.t = Math.min(1, anim.t + dt / ZOOM_OUT_DURATION);
                    camera.position.set(0, 0, THREE.MathUtils.lerp(CAM_NEAR, CAM_FAR, easeInOut(anim.t)));
                    setHighlight(anim.idx, 1 - easeInOut(anim.t));
                    globeGroup.rotation.y += dt * 0.06;
                    if (anim.t >= 1) goToNext();
                    break;
            }

            // Sync HUD position to current target
            if (hudRef.current && anim.idx >= 0 && mountRef.current) {
                const targetPos = anim.centroids[anim.idx].clone();
                targetPos.applyMatrix4(globeGroup.matrixWorld);

                const worldPos = targetPos.clone();
                const normal = worldPos.normalize();
                const camPos = camera.position.clone();
                // Relaxed facing check to show HUD earlier
                const visibleOnSphere = normal.dot(camPos.normalize()) > 0.05;

                targetPos.project(camera);

                const width = mountRef.current.clientWidth;
                const height = mountRef.current.clientHeight;

                if (width > 0 && height > 0) {
                    const x = (targetPos.x * 0.5 + 0.5) * width;
                    const y = (targetPos.y * -0.5 + 0.5) * height;

                    hudRef.current.style.left = `${x}px`;
                    hudRef.current.style.top = `${y}px`;

                    // More reliable visibility check
                    const isVisible = visibleOnSphere && anim.phase !== 'rotating';
                    hudRef.current.style.opacity = isVisible ? '1' : '0';
                    hudRef.current.style.display = 'block';
                }
            }

            if (mistMat) mistMat.uniforms.viewVector.value.copy(camera.position);


            renderer.render(scene, camera);
            return requestID;
        }

        init();
        const animID = animate();

        const currentMount = mountRef.current;
        return () => {
            window.removeEventListener('resize', updateCameraOffset);
            cancelAnimationFrame(animID);
            renderer.dispose();
            currentMount?.removeChild(renderer.domElement);
        };
    }, []);

    const country = currentIdx >= 0 ? HIGHLIGHTED_COUNTRIES[currentIdx] : null;
    const data = country ? COUNTRY_DATA[country] : null;

    return (
        <div className="globe-container w-full max-w-[1230px] 2xl:max-w-[1390px] min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] mx-auto px-6">
            <div ref={mountRef} className="absolute inset-0" />
            <div className="absolute top-0 h-[10%] w-[100%] bg-gradient-to-b from-white to-transparent" ></div>
            <div className="absolute bottom-0 h-[10%] w-[100%] bg-gradient-to-t from-white to-transparent" ></div>
            <div className="fogginess-overlay" />

            {/* Top Header */}
            <div id="top-header">
                <div className="text-xl font-bold uppercase text-gray-900">Powering African businesses</div>
                <div className="text-lg md:text-xl text-gray-500 max-w-xl leading-relaxed mt-4">
                    Zorah Security Lab has been impactful and instrumental in the fight against cybercrime in Ghana and across Africa.
                </div>
            </div>

            {/* Sidebar Stats */}
            <div id="sidebar" className={phase === 'pausing' || phase === 'zoom-in' || phase === 'zoom-out' ? 'visible' : ''}>
                <div className="country-id">{String(currentIdx + 1).padStart(2, '0')}</div>
                <div className="stat-header">TARGET ACQUIRED</div>
                <div className="country-name">{country}</div>
                <div className="country-desc">{data?.desc}</div>
                <div className="coords-table">
                    <div className="coords-row">
                        <span className="coords-label">LONGITUDE</span>
                        <span className="coords-value">{data?.lon}</span>
                    </div>
                    <div className="coords-row">
                        <span className="coords-label">LATITUDE</span>
                        <span className="coords-value">{data?.lat}</span>
                    </div>
                    <div className="coords-row">
                        <span className="coords-label">STATUS</span>
                        <span className="coords-value">ACTIVE</span>
                    </div>
                </div>
            </div>

            {/* HUD Reticle */}
            <div id="hud" ref={hudRef}>
                <svg viewBox="-160 -160 320 320" xmlns="http://www.w3.org/2000/svg">
                    <g className="ring-spin-slow">
                        <circle cx="0" cy="0" r="148" fill="none" stroke="rgba(0,180,255,0.15)" strokeWidth="1" />
                        <circle cx="0" cy="0" r="148" fill="none" stroke="rgba(0,180,255,0.5)" strokeWidth="2" strokeDasharray="1.5 4.15" />
                    </g>
                    <circle cx="0" cy="0" r="130" fill="none" stroke="rgba(0,180,255,0.3)" strokeWidth="1.5" />
                    <g stroke="rgba(0,180,255,0.8)" strokeWidth="2" className="flicker">
                        <line x1="-12" y1="-130" x2="12" y2="-130" />
                        <line x1="-12" y1="130" x2="12" y2="130" />
                        <line x1="130" y1="-12" x2="130" y2="12" />
                        <line x1="-130" y1="-12" x2="-130" y2="12" />
                    </g>
                    <circle cx="0" cy="0" r="44" fill="none" stroke="rgba(0,180,255,0.5)" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="4" fill="rgba(0,180,255,0.8)" className="pulse" />
                </svg>
            </div>

            {/* Status Bar */}
            {/* <div id="status-bar">
                <div className="status-group">
                    <div className="status-item">
                        <div className="status-indicator"></div>
                        <span className="status-label">SYS STATUS:</span>
                        <span className="status-val">
                            {phase === 'rotating' ? 'SCANNING_COORDINATES' : phase === 'zoom-in' ? 'LOCKING_TARGET' : phase === 'pausing' ? 'TARGET_ACQUIRED' : 'RETRACTING_VIEW'}
                        </span>
                    </div>
                    <div className="status-item">
                        <span className="status-label">TARGETS:</span>
                        <span className="status-val">{String(currentIdx + 1).padStart(2, '0')} / 06</span>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
