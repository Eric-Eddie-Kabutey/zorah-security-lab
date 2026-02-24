"use client";

import React from "react";
import { motion } from "framer-motion";
import InteractiveMap from "@/components/svg/interactive-map";

const HIGHLIGHTED_IDS = ["c154", "c50", "c100", "c150", "c199", "c184"];

const GlobeSection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isZoomingOut, setIsZoomingOut] = React.useState(false);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIsZoomingOut((prev) => {
                if (prev) {
                    // We were zoomed out (world view), now move to next ID and zoom in
                    setCurrentIndex((idx) => (idx + 1) % HIGHLIGHTED_IDS.length);
                    return false;
                } else {
                    // We were zoomed in, now zoom out to world view
                    return true;
                }
            });
        }, 8000); // 8 seconds per "beat" for a calm, slow pulse
        return () => clearInterval(interval);
    }, []);

    const activeId = isZoomingOut ? undefined : HIGHLIGHTED_IDS[currentIndex];

    return (
        <section className="relative w-full h-[calc(100vh-80px)] max-h-[900px] min-h-[600px] bg-white flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute top-12 left-0 right-0 z-10 pointer-events-none w-full flex flex-col items-center">
                <motion.div
                    key={activeId || "global"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center"
                >
                    {/* <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                        {!activeId ? "Global Network Connectivity" : "Localized Security Focus"}
                    </h2>
                    <p className="text-gray-500 mt-2 font-mono text-xs md:text-sm">
                        {!activeId ? "Overview of active operations" : `Active Highlight: ${activeId}`}
                    </p> */}
                </motion.div>
            </div>

            <div className="w-full h-full">
                <InteractiveMap
                    className="w-full h-full"
                    highlightedIds={HIGHLIGHTED_IDS}
                    focalId={activeId}
                />
            </div>
        </section>
    );
};

export default GlobeSection;
