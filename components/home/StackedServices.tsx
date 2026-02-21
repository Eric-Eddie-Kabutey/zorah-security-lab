"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ServiceCard from "./service-card";
import { DropdownMenuItem } from "@/types/nav-types";

type Props = {
    items: DropdownMenuItem[];
};

export function StackedServices({ items }: Props) {
    const ref = useRef<HTMLDivElement | null>(null);

    // Scroll progress within this section only
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    const totalItems = items.length;

    return (
        <section
            ref={ref}
            className="relative"
            style={{ height: `${100 + (totalItems - 1) * 80}vh` }}
        >
            {/* Sticky stage */}
            <div className="sticky top-0 h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden">

                {/* Pinned Header */}
                <div className="w-full max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6 md:px-12 shrink-0">
                    <h2 className="text-lg md:text-xl font-mono font-bold uppercase text-foreground">Our Services</h2>
                </div>

                {/* Stacking Area - Responsively taking remaining space */}
                <div className="relative flex-grow flex items-center justify-center min-h-0 px-4 md:px-12">
                    <div className="relative w-full max-w-[1230px] 2xl:max-w-[1390px] mx-auto">
                        {/* Dynamic Height container matching ServiceCard's new larger height */}
                        <div className="relative h-[65vh] min-h-[500px] max-h-[800px] w-full">
                            {items.map((service, index) => {
                                const step = totalItems > 1 ? 1 / (totalItems - 1) : 1;
                                const startProgress = index === 0 ? 0 : (index - 1) * step;
                                const endProgress = index * step;

                                // Sliding in animation
                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                const y = useTransform(
                                    scrollYProgress,
                                    [startProgress, endProgress],
                                    [index === 0 ? 0 : 600, 0]
                                );

                                // Shrinking slightly as newer cards arrive ON TOP
                                const shrinkStart = endProgress;
                                const shrinkEnd = Math.min(1, endProgress + step);

                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                const scale = useTransform(
                                    scrollYProgress,
                                    [shrinkStart, shrinkEnd],
                                    [1, 0.96]
                                );

                                // Fade in animation
                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                const opacity = useTransform(
                                    scrollYProgress,
                                    [startProgress, Math.min(1, startProgress + (step * 0.2))],
                                    [index === 0 ? 1 : 0, 1]
                                );

                                const zIndex = 10 + index;
                                const visualOffset = index * (20);

                                return (
                                    <motion.div
                                        key={service.href}
                                        style={{
                                            y,
                                            scale,
                                            opacity,
                                            zIndex,
                                        }}
                                        className="absolute inset-0"
                                    >
                                        <div style={{ transform: `translateY(${visualOffset}px)` }}>
                                            <ServiceCard service={service} />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Pinned Footer (Hint text) at the bottom */}
                <div className="w-full max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6 md:px-12 shrink-0">
                    <div className="text-xs md:text-sm font-mono text-foreground/60">
                        {totalItems > 1 ? "Scroll to explore our services →" : ""}
                    </div>
                </div>
            </div>
        </section>
    );
}
