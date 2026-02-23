"use client";

import React from "react";
import { motion } from "framer-motion";
import { MAP_PATHS } from "./map-paths";

interface InteractiveMapProps {
    className?: string;
    highlightedIds?: string[];
    baseColor?: string;
    highlightColor?: string;
    strokeColor?: string;
}

/**
 * InteractiveMap - A responsive world map component with highlighting.
 * Uses extracted paths from map.svg.
 */
const InteractiveMap: React.FC<InteractiveMapProps> = ({
    className = "",
    highlightedIds = ["c1", "c50", "c100", "c150"], // Default 4 for demo
    baseColor = "#E2E8F0", // slate-200
    highlightColor = "#49FF98", // Theme green
    strokeColor = "#FFFFFF",
}) => {
    return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-white ${className}`}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 1010 666"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-auto max-h-screen"
            >
                {MAP_PATHS.map((path) => {
                    const isHighlighted = highlightedIds.includes(path.id);

                    return (
                        <motion.path
                            key={path.id}
                            d={path.d}
                            fill={isHighlighted ? highlightColor : baseColor}
                            stroke={strokeColor}
                            strokeWidth="0.5"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                fill: isHighlighted ? highlightColor : baseColor
                            }}
                            whileHover={{
                                fill: highlightColor,
                                opacity: 0.8,
                                transition: { duration: 0.2 }
                            }}
                            transition={{
                                duration: 0.5,
                                delay: Math.random() * 0.5
                            }}
                        />
                    );
                })}
            </svg>
        </div>
    );
};

export default InteractiveMap;
