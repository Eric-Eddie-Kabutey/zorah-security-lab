"use client";

import React from "react";
import { motion } from "framer-motion";
import InteractiveMap from "@/components/svg/interactive-map";

const GlobeSection: React.FC = () => {
    return (
        <section className="w-full min-h-screen py-24 bg-white flex flex-col items-center justify-center overflow-hidden">
            <div className="max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6 w-full flex flex-col items-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold text-gray-900 mb-12 text-center"
                >
                    Global Security Presence
                </motion.h2>
                <InteractiveMap
                    className="w-full aspect-[1010/666] max-h-[70vh]"
                    highlightedIds={["c14", "c52", "c91", "c180"]}
                />
            </div>
        </section>
    );
};

export default GlobeSection;
