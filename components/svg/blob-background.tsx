"use client";

import React from "react";
import { motion } from "framer-motion";
import { BLOB_PATHS } from "./blob-paths";

interface BlobBackgroundProps {
    className?: string;
    color?: string;
}

const BRAND_GREEN = "#49FF98";

export const BlobBackground: React.FC<BlobBackgroundProps> = ({
    className = "",
}) => {
    return (
        <div className={`absolute inset-0 z-0 pointer-events-none overflow-hidden bg-white ${className}`}>
            <motion.div
                className="w-full h-full flex items-center justify-center scale-110 lg:scale-125"
                animate={{
                    rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <svg
                    width="865"
                    height="838"
                    viewBox="0 0 865 838"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[120%] h-[120%] opacity-90"
                >
                    <motion.g
                        animate={{
                            x: [0, 15, 0, -15, 0],
                            y: [0, -10, 0, 10, 0],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {BLOB_PATHS.map((path, index) => {
                            // Sinusoidal variation based on index to create "flow"
                            const duration = 8 + (index % 10) * 0.5;
                            const delay = (index % 50) * -0.2;
                            const baseOpacity = 0.2 + (index % 5) * 0.1;

                            return (
                                <motion.path
                                    key={index}
                                    d={path}
                                    fill={BRAND_GREEN}
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: [baseOpacity, baseOpacity * 1.5, baseOpacity],
                                        scale: [1, 1.3, 1],
                                        // Individual particle drift
                                        x: [0, (Math.random() - 0.5) * 20, 0],
                                        y: [0, (Math.random() - 0.5) * 20, 0],
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
                    </motion.g>
                </svg>
            </motion.div>

            {/* Concentrated focus mask */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,white_85%)] z-10" />

            {/* Edge Fades */}
            <div className="w-full h-80 absolute top-0 left-0 bg-gradient-to-b from-white to-transparent z-10" />
            <div className="w-full h-80 absolute bottom-0 left-0 bg-gradient-to-t from-white to-transparent z-10" />
        </div>
    );
};
