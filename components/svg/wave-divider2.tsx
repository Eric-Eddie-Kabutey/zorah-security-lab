"use client";

import React from "react";
import { motion } from "framer-motion";
import { WAVE_PATHS } from "./wave-paths";

interface WaveDivider2Props {
    className?: string;
    color?: string;
}

const WaveDivider2: React.FC<WaveDivider2Props> = ({
    className = "",
    color = "#49FF98",
}) => {
    const GREY_VARIANTS = [
        "#F8FAFC", // slate-50
        "#F1F5F9", // slate-100
        "#E2E8F0", // slate-200
        "#CBD5E1", // slate-300
        "#94A3B8", // slate-400
        "#64748B", // slate-500
        "#475569", // slate-600
    ];

    return (
        <div className={`relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden ${className}`}>
            <div className="max-w-[1230px] 2xl:max-w-[1390px] mx-auto absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
                <span className="text-3xl sm:text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                    Investigate Fast. Defend Smarter.
                </span>
            </div>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 1916 873"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
                className="block min-h-screen w-full"
            >
                {WAVE_PATHS.map((path, index) => {
                    const duration = 8 + Math.random() * 7;
                    const delay = Math.random() * -15;
                    const opacity = 0.05 + Math.random() * 0.2;
                    const pathColor = color === "#49FF98"
                        ? GREY_VARIANTS[index % GREY_VARIANTS.length]
                        : color;

                    return (
                        <motion.path
                            key={index}
                            d={path}
                            stroke={pathColor}
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ opacity: 1, y: 0 }}
                            animate={{
                                opacity: [opacity, opacity * 2, opacity],
                                y: [0, -15, 0],
                                x: [0, index % 2 === 0 ? 10 : -10, 0],
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
        </div>
    );
};

export default WaveDivider2;
