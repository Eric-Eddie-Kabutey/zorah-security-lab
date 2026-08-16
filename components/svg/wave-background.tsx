"use client";

import React from "react";
import { motion } from "framer-motion";
import { WAVE_PATHS } from "./wave-paths";

interface WaveBackgroundProps {
    className?: string;
    color?: string;
}

const GREY_VARIANTS = [
    "#F8FAFC", // slate-50
    "#F1F5F9", // slate-100
    "#E2E8F0", // slate-200
    "#CBD5E1", // slate-300
    "#94A3B8", // slate-400
    "#64748B", // slate-500
    "#475569", // slate-600
];

export const WaveBackground: React.FC<WaveBackgroundProps> = ({
    className = "",
    color = "slate",
}) => {
    return (
        <div className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 1916 873"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
                className="w-full h-full"
            >
                {WAVE_PATHS.map((path, index) => {
                    const duration = 10 + Math.random() * 10;
                    const delay = Math.random() * -15;
                    const opacity = 0.05 + Math.random() * 0.15;
                    const pathColor = color === "slate"
                        ? GREY_VARIANTS[index % GREY_VARIANTS.length]
                        : color;

                    return (
                        <motion.path
                            key={index}
                            d={path}
                            stroke={pathColor}
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [opacity, opacity * 2, opacity],
                                y: [0, -20, 0],
                            }}
                            transition={{
                                duration: duration,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: delay,
                            }}
                        />
                    );
                })}
            </svg>

            {/* Soft Edge Gradients */}
            <div className="w-full h-40 absolute top-0 left-0 bg-gradient-to-b from-white via-white/50 to-transparent z-10" />
            <div className="w-full h-40 absolute bottom-0 left-0 bg-gradient-to-t from-white via-white/50 to-transparent z-10" />
            <div className="w-40 h-full absolute top-0 left-0 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="w-40 h-full absolute top-0 right-0 bg-gradient-to-l from-white to-transparent z-10" />
        </div>
    );
};
