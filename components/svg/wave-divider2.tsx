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

    const stats = [
        {
            value: "200+",
            label: "CASES RESOLVED",
            description: "Advanced forensics work that delivers definitive evidence.",
        },
        {
            value: "100+",
            label: "SECURE PARTNERS",
            description: "Organizations and agencies that rely on our protection.",
        },
        {
            value: "15",
            label: "YEARS OF EXPERIENCE",
            description: "Expertise in cyber intelligence, forensics, and investigation.",
        },
        {
            value: "95%",
            label: "THREAT DETECTION",
            description: "Unparalleled accuracy in identifying and neutralizing risks.",
        },
    ];

    return (
        <div className={`relative w-full min-h-screen py-20 flex items-center overflow-hidden ${className}`}>
            {/* SVG Background */}
            <div className="absolute max-w-[1230px] 2xl:max-w-[1390px] mx-auto inset-0 z-0 pointer-events-none ">
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
                        const pathColor = color === "#49FF98"
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
            </div>

            {/* Edge Gradients for smooth blending */}
            <div className="w-full h-20 absolute top-0 left-0 bg-gradient-to-b from-white to-transparent z-20" />
            <div className="w-full h-20 absolute bottom-0 left-0 bg-gradient-to-t from-white to-transparent z-20" />
            <div className="w-[50%] h-full absolute top-0 left-0 bg-gradient-to-r from-white to-transparent z-20" />
            <div className="w-[50%] h-full absolute bottom-0 right-0 bg-gradient-to-l from-white to-transparent z-20" />

            {/* Content Container */}
            <div className="relative z-20 max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">

                    {/* Left Column: Text Content */}
                    <div className="lg:col-span-7 flex flex-col">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-8"
                        >
                            Investigate Fast.<br />
                            <span className="text-gray-400">Defend Smarter.</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-xl text-gray-500 max-w-xl leading-relaxed mb-12"
                        >
                            At Zorah Security Lab, we specialize in high-stakes digital investigations
                            and proactive defense. Our team of experts utilizes cutting-edge forensics
                            to safeguard your digital landscape.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <a
                                href="/about"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-[10px] border border-gray-900 text-gray-900 font-bold uppercase tracking-widest text-xs hover:bg-gray-900 hover:text-white transition-all duration-300"
                            >
                                Know More About us
                                <span>→</span>
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Column: Stats Grid */}
                    <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 * index }}
                                className="flex flex-col"
                            >
                                <span className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                                    {stat.value}
                                </span>
                                <div className="inline-flex mb-3">
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-3 py-1 bg-gray-50/50 border border-gray-100 rounded-[10px] text-gray-900">
                                        {stat.label}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
                                    {stat.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WaveDivider2;
