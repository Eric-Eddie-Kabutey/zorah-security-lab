"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MAP_PATHS } from "./map-paths";

interface InteractiveMapProps {
    className?: string;
    highlightedIds?: string[];
    focalId?: string; // The ID to zoom into
    baseColor?: string;
    highlightColor?: string;
    strokeColor?: string;
    viewBox?: string; // Manual override if provided
}

export const MAP_REGIONS = {
    WORLD: "0 0 1010 666",
};

/**
 * InteractiveMap - A responsive world map component with highlighting.
 */
const InteractiveMap: React.FC<InteractiveMapProps> = ({
    className = "",
    highlightedIds = [],
    focalId,
    baseColor = "#E2E8F0",
    highlightColor = "#94A3B8", // Minimal Slate Grey
    strokeColor = "#FFFFFF",
    viewBox: manualViewBox,
}) => {
    const [hoveredData, setHoveredData] = React.useState<{ id: string; box: { x: number; y: number; w: number; h: number }; x: number; y: number } | null>(null);

    // Calculate viewBox based on focalId
    const currentViewBox = React.useMemo(() => {
        if (manualViewBox) return manualViewBox;

        if (focalId) {
            const path = MAP_PATHS.find(p => p.id === focalId);
            if (path && path.box) {
                const { x, y, w, h } = path.box;

                const svgAspect = 1010 / 666;

                // Goal: Focal box takes 20% width (0.2)
                let targetW = w / 0.2;
                let targetH = targetW / svgAspect;

                // Optimization: Ensure height fits (with 20% vertical padding)
                if (h > targetH * 0.8) {
                    targetH = h / 0.8;
                    targetW = targetH * svgAspect;
                }

                // Align to right with 5% margin from right edge
                // Right edge of focal box (x + w) should be at (targetX + 0.95 * targetW)
                const targetX = (x + w) - (targetW * 0.95);

                // Center focal point vertically
                const targetY = (y + h / 2) - (targetH / 2);

                return `${targetX} ${targetY} ${targetW} ${targetH}`;
            }
        }

        return MAP_REGIONS.WORLD;
    }, [focalId, manualViewBox]);

    const handleMouseMove = (e: React.MouseEvent, path: any) => {
        setHoveredData({ id: path.id, box: path.box, x: e.clientX, y: e.clientY });
    };

    // Extract focal path data if available
    const focalPathData = focalId ? MAP_PATHS.find(p => p.id === focalId) : null;

    return (
        <div
            className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-transparent ${className}`}
            style={{
                maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
            }}
        >
            <motion.svg
                width="100%"
                height="100%"
                viewBox={currentViewBox}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-auto max-h-screen"
                animate={{ viewBox: currentViewBox }}
                transition={{ duration: 4, ease: [0.22, 1, 0.36, 1] }}
            >
                {MAP_PATHS.map((path) => {
                    const isHighlighted = highlightedIds.includes(path.id);
                    const isFocal = path.id === focalId;

                    return (
                        <motion.path
                            key={path.id}
                            d={path.d}
                            fill={isHighlighted ? highlightColor : baseColor}
                            stroke={strokeColor}
                            strokeWidth="0.5"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                fill: isHighlighted ? highlightColor : baseColor,
                                // Subtle transition for focal state
                                // We use a longer transition if it's the focal one being transitioned
                                transition: {
                                    fill: { duration: isFocal || !focalId ? 3.5 : 0.3, ease: "easeInOut" }
                                }
                            }}
                            whileHover={{
                                fill: '#1E293B', // Deep Slate
                                opacity: 0.9,
                                transition: { duration: 0.2 }
                            }}
                            onMouseMove={(e) => handleMouseMove(e, path)}
                            onMouseEnter={(e) => handleMouseMove(e, path)}
                            onMouseLeave={() => setHoveredData(null)}
                            className="cursor-pointer"
                        />
                    );
                })}

                <AnimatePresence>
                    {/* Persistent Focal Bounding Box / Satellite Lock HUD */}
                    {focalPathData && (() => {
                        const MIN_SIZE = 20;
                        const centerX = focalPathData.box.x + focalPathData.box.w / 2;
                        const centerY = focalPathData.box.y + focalPathData.box.h / 2;

                        const visualW = Math.max(focalPathData.box.w * 1.2, MIN_SIZE);
                        const visualH = Math.max(focalPathData.box.h * 1.2, MIN_SIZE);

                        const visualX = centerX - visualW / 2;
                        const visualY = centerY - visualH / 2;

                        const HUD_COLOR = "#64748B"; // Slate 500

                        return (
                            <motion.g
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            >
                                {/* Static Frame Backdrop */}
                                <motion.rect
                                    x={visualX}
                                    y={visualY}
                                    width={visualW}
                                    height={visualH}
                                    fill="rgba(148, 163, 184, 0.05)"
                                    stroke="rgba(148, 163, 184, 0.1)"
                                    strokeWidth="0.1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 2 }}
                                />

                                {/* Horizontal Axis Lines */}
                                <motion.line x1={visualX - 10} y1={centerY} x2={visualX} y2={centerY} stroke={HUD_COLOR} strokeWidth="0.15" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 1 }} />
                                <motion.line x1={visualX + visualW} y1={centerY} x2={visualX + visualW + 10} y2={centerY} stroke={HUD_COLOR} strokeWidth="0.15" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 1 }} />

                                {/* Vertical Axis Lines */}
                                <motion.line x1={centerX} y1={visualY - 10} x2={centerX} y2={visualY} stroke={HUD_COLOR} strokeWidth="0.15" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.5, duration: 1 }} />
                                <motion.line x1={centerX} y1={visualY + visualH} x2={centerX} y2={visualY + visualH + 10} stroke={HUD_COLOR} strokeWidth="0.15" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.5, duration: 1 }} />

                                {/* Central Precision Crosshair (X) */}
                                {/* <motion.g
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1, duration: 0.8 }}
                                >
                                    <line x1={centerX - 2} y1={centerY - 2} x2={centerX + 2} y2={centerY + 2} stroke={HUD_COLOR} strokeWidth="0.2" />
                                    <line x1={centerX + 2} y1={centerY - 2} x2={centerX - 2} y2={centerY + 2} stroke={HUD_COLOR} strokeWidth="0.2" />
                                </motion.g> */}

                                {/* Advanced Corner Markers (Reference Style) */}
                                {[
                                    { x: 0, y: 0, r: 0 },
                                    { x: visualW, y: 0, r: 90 },
                                    { x: visualW, y: visualH, r: 180 },
                                    { x: 0, y: visualH, r: 270 }
                                ].map((pos, i) => (
                                    <motion.g
                                        key={i}
                                        transform={`translate(${visualX + pos.x}, ${visualY + pos.y}) rotate(${pos.r})`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.2 + i * 0.1 }}
                                    >
                                        <path d="M 0 6 L 0 0 L 6 0" stroke={HUD_COLOR} strokeWidth="0.4" fill="none" />
                                        {/* Small decorative square at corner */}
                                        <rect x="-1" y="-1" width="2" height="2" fill="#94A3B8" stroke={HUD_COLOR} strokeWidth="0.1" />
                                    </motion.g>
                                ))}

                                {/* HUD Metadata Text */}
                                <motion.g
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.8 }}
                                    transition={{ delay: 1.5 }}
                                >
                                    <text x={centerX} y={visualY + 8} textAnchor="middle" fill={HUD_COLOR} fontSize="2.5" fontWeight="normal" letterSpacing="0.2">
                                        Target
                                    </text>
                                    <text x={visualX + visualW + 12} y={centerY} textAnchor="start" fill={HUD_COLOR} fontSize="2" fontStyle="normal">
                                        TRK-88
                                    </text>
                                    <text x={visualX - 12} y={centerY} textAnchor="end" fill={HUD_COLOR} fontSize="2">
                                        {focalId}
                                    </text>
                                </motion.g>
                            </motion.g>
                        );
                    })()}

                    {/* Temporary Hover Bounding Box */}
                    {hoveredData && !focalId && (
                        <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.rect
                                x={hoveredData.box.x}
                                y={hoveredData.box.y}
                                width={hoveredData.box.w}
                                height={hoveredData.box.h}
                                fill="none"
                                stroke="#94A3B8"
                                strokeWidth="0.8"
                                strokeDasharray="2,2"
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                            />
                            <foreignObject
                                x={hoveredData.box.x}
                                y={hoveredData.box.y - 12}
                                width="100"
                                height="20"
                            >
                                <div className="bg-[#94A3B8] text-white px-1.5 py-0.5 rounded text-[6px] font-bold w-fit whitespace-nowrap shadow-lg">
                                    ID: {hoveredData.id}
                                </div>
                            </foreignObject>
                        </motion.g>
                    )}
                </AnimatePresence>
            </motion.svg>
        </div>
    );
};

export default InteractiveMap;
