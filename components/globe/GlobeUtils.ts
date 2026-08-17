import * as THREE from "three";

export interface GeoJSONData {
    type: string;
    features: Array<{
        type: string;
        properties: {
            name: string;
            [key: string]: unknown;
        };
        geometry: {
            type: string;
            coordinates: number[][] | number[][][] | number[][][][];
        };
    }>;
}

/** Converts Lon/Lat to 3D Cartesian coordinates on a sphere */
export function lonLatToCameraPos(lon: number, lat: number, dist: number): THREE.Vector3 {
    const phi = ((lon + 180) / 360) * 2 * Math.PI;
    const theta = ((90 - lat) / 180) * Math.PI;
    return new THREE.Vector3(
        -dist * Math.cos(phi) * Math.sin(theta),
        dist * Math.cos(theta),
        dist * Math.sin(phi) * Math.sin(theta),
    );
}

/** Ease translation function */
export function easeInOut(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

/** Gets the approximate center of a GeoJSON feature */
export function getFeatureCentroid(feature: GeoJSONData['features'][0]): [number, number] {
    const geom = feature.geometry;
    let selectedRing: number[][] | number[] | undefined;

    if (geom.type === 'Polygon') {
        selectedRing = (geom.coordinates as number[][][])[0];
    } else if (geom.type === 'MultiPolygon') {
        let maxLen = 0;
        const polys = geom.coordinates as number[][][][];
        for (const poly of polys) {
            if (poly[0].length > maxLen) {
                maxLen = poly[0].length;
                selectedRing = poly[0];
            }
        }
    }

    if (!selectedRing) return [0, 0];
    const ring = selectedRing as number[][];
    let sumLon = 0, sumLat = 0;
    for (const [lon, lat] of ring) {
        sumLon += lon;
        sumLat += lat;
    }
    return [sumLon / ring.length, sumLat / ring.length];
}

/** Internal helpers for texture drawing */
function getX(lon: number, width: number) { return ((lon + 180) / 360) * width; }
function getY(lat: number, height: number) { return ((90 - lat) / 180) * height; }

interface GlobeTextureOptions {
    json: GeoJSONData;
    width?: number;
    height?: number;
    landColor?: string;
    seaColor?: string;
}

/** Create the main globe texture */
export async function createGlobeTexture({ json, width = 4096, height = 2048, landColor = "#f2f5f8", seaColor = "#cbdceb" }: GlobeTextureOptions) {
    const canvas = document.createElement('canvas');
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = seaColor;
    ctx.fillRect(0, 0, width, height);

    // Graticule lines
    ctx.save();
    ctx.strokeStyle = 'rgba(0,0,0,0.06)';
    ctx.lineWidth = Math.max(1.5, width / 2048);
    for (let lon = -180; lon <= 180; lon += 30) {
        ctx.beginPath(); ctx.moveTo(getX(lon, width), 0); ctx.lineTo(getX(lon, width), height); ctx.stroke();
    }
    for (let lat = -90; lat <= 90; lat += 30) {
        ctx.beginPath(); ctx.moveTo(0, getY(lat, height)); ctx.lineTo(width, getY(lat, height)); ctx.stroke();
    }
    ctx.restore();

    const features = json.features || [];
    const polygons: number[][][][] = []; // Each element is a polygon (array of rings)
    features.forEach((f) => {
        const { type, coordinates } = f.geometry;
        if (type === 'Polygon') polygons.push(coordinates as number[][][]);
        if (type === 'MultiPolygon') (coordinates as number[][][][]).forEach((p) => polygons.push(p));
    });

    function buildOuterPath(polygon: number[][][]) {
        if (!ctx) return;
        ctx.beginPath();
        const outerRing = polygon[0];
        if (!outerRing) return;
        ctx.moveTo(getX(outerRing[0][0], width), getY(outerRing[0][1], height));
        for (let i = 1; i < outerRing.length; i++) {
            const pt = outerRing[i];
            ctx.lineTo(getX(pt[0], width), getY(pt[1], height));
        }
        ctx.closePath();
    }

    // Draw land with soft halo
    ctx.save();
    ctx.shadowColor = 'rgba(120,160,220,0.15)';
    ctx.shadowBlur = width / 300;
    ctx.fillStyle = landColor;
    polygons.forEach(rings => { buildOuterPath(rings); ctx.fill(); });
    ctx.restore();

    // Solid fill
    ctx.fillStyle = landColor;
    ctx.strokeStyle = landColor;
    ctx.lineWidth = 1;
    polygons.forEach(rings => { buildOuterPath(rings); ctx.fill(); ctx.stroke(); });

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    return texture;
}

interface MaskTextureOptions {
    json: GeoJSONData;
    width?: number;
    height?: number;
    landColor?: string;
}

/** Create specific country masks */
export async function createLandMaskTexture({ json, width = 2048, height = 1024, landColor = "#333333" }: MaskTextureOptions) {
    const canvas = document.createElement('canvas');
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = landColor;
    ctx.strokeStyle = landColor;
    ctx.lineWidth = 0.5;

    const features = json.features || [];
    features.forEach((feature) => {
        const type = feature.geometry.type;
        const coords = feature.geometry.coordinates;
        // coordinates for Polygon is number[][][], for MultiPolygon is number[][][][]
        const polys = type === 'Polygon' ? [coords as number[][][]] : type === 'MultiPolygon' ? (coords as number[][][][]) : [];
        polys.forEach((rings) => {
            const polygonRings = rings as number[][][];
            ctx.beginPath();
            const outer = polygonRings[0];
            if (!outer) return;
            ctx.moveTo(getX(outer[0][0], width), getY(outer[0][1], height));
            for (let i = 1; i < outer.length; i++) ctx.lineTo(getX(outer[i][0], width), getY(outer[i][1], height));
            ctx.closePath();
            ctx.fill(); ctx.stroke();

            ctx.globalCompositeOperation = 'destination-out';
            for (let i = 1; i < polygonRings.length; i++) {
                const hole = polygonRings[i];
                ctx.beginPath();
                ctx.moveTo(getX(hole[0][0], width), getY(hole[0][1], height));
                for (let j = 1; j < hole.length; j++) ctx.lineTo(getX(hole[j][0], width), getY(hole[j][1], height));
                ctx.closePath();
                ctx.fill();
            }
            ctx.globalCompositeOperation = 'source-over';
        });
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    return texture;
}

interface BorderTextureOptions {
    json: GeoJSONData;
    width?: number;
    height?: number;
    borderColor?: string;
    lineWidth?: number;
}

/** Create crisp country border texture */
export async function createBorderTexture({ json, width = 8192, height = 4096, borderColor = "rgba(0,0,0,0.12)", lineWidth = 1.5 }: BorderTextureOptions) {
    const canvas = document.createElement('canvas');
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    const features = json.features || [];
    features.forEach((feature) => {
        const type = feature.geometry.type;
        const coords = feature.geometry.coordinates;
        const polys = type === 'Polygon' ? [coords as number[][][]] : type === 'MultiPolygon' ? (coords as number[][][][]) : [];
        polys.forEach((polygon) => {
            const polygonRings = polygon as number[][][];
            polygonRings.forEach((ring) => {
                ctx.beginPath();
                ctx.moveTo(getX(ring[0][0], width), getY(ring[0][1], height));
                for (let i = 1; i < ring.length; i++) ctx.lineTo(getX(ring[i][0], width), getY(ring[i][1], height));
                ctx.closePath();
                ctx.stroke();
            });
        });
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    texture.generateMipmaps = true;
    return texture;
}

/** Create particle texture for 0s and 1s */
export function createCharTexture(char: string): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 64; canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 48px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(char, 32, 32);

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillRect(0, 0, 64, 64);

    return new THREE.CanvasTexture(canvas);
}
