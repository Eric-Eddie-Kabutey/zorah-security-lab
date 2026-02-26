"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { DropdownMenuItem } from "@/types/nav-types";
import Image from 'next/image';

type Props = {
    items: DropdownMenuItem[];
};

const DigitCounter = ({ value }: { value: number }) => {
    const digits = value.toString().padStart(2, '0').split('');
    const prevValue = useRef(value);
    const direction = value > prevValue.current ? 1 : -1;

    useEffect(() => {
        prevValue.current = value;
    }, [value]);

    return (
        <div className="flex overflow-hidden text-7xl md:text-[8rem] lg:text-[10rem] font-bold leading-none">
            {digits.map((digit, i) => (
                <div key={`${i}-${digit}`} className="relative h-[1.1em] overflow-hidden">
                    <AnimatePresence mode="popLayout" custom={direction}>
                        <motion.span
                            key={digit}
                            custom={direction}
                            variants={{
                                initial: (dir: number) => ({ y: dir > 0 ? '105%' : '-105%', opacity: 0 }),
                                animate: { y: 0, opacity: 1 },
                                exit: (dir: number) => ({ y: dir > 0 ? '-105%' : '105%', opacity: 0 }),
                            }}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="block"
                            style={{
                                WebkitTextStroke: '1px rgba(0,0,0,0.1)',
                                color: 'transparent',
                                backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.02))',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text'
                            }}
                        >
                            {digit}
                        </motion.span>
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};

const GridBackground = () => (
    <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}
    />
);

export function StackedServices({ items }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [activeIndex, setActiveIndex] = useState(0);
    const [itemProgress, setItemProgress] = useState(0);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const totalItems = items.length;
        const index = Math.min(Math.floor(latest * totalItems), totalItems - 1);

        if (index !== activeIndex) {
            setActiveIndex(index);
        }

        const sectionSize = 1 / totalItems;
        const relativeProgress = (latest % sectionSize) / sectionSize;
        setItemProgress(Math.round(relativeProgress * 100));
    });

    const activeItem = items[activeIndex];

    return (
        <div ref={containerRef} className="relative w-full" style={{ height: `${items.length * 200}vh` }}>
            {/* Sticky Container */}
            <div className="sticky top-[80px] h-[calc(100vh-80px)] max-h-[900px] max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6 w-full bg-white flex flex-col shadow-[0_-1px_rgba(0,0,0,0.02)] overflow-hidden">

                {/* Top Section - "Our Services" */}
                <div className="w-full py-4 md:py-8 flex justify-between items-end">
                    <h2 className="text-xl font-mono font-bold uppercase text-gray-900">
                        Our Services
                    </h2>
                </div>

                {/* Middle Section - Grid Content */}
                <div className="flex-1 w-full relative">
                    <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4">
                        {/* Left Content (Text - 4 columns) */}
                        <div className="lg:col-span-4 flex flex-col justify-start pt-4 lg:justify-center h-full z-10 bg-white relative">
                            <GridBackground />

                            <div className="relative z-10">
                                <DigitCounter value={activeIndex + 1} />

                                <div className="relative min-h-[160px] md:min-h-[220px] lg:min-h-[260px]">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeIndex}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 flex flex-col justify-start"
                                        >
                                            <motion.h3
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                                                className="text-2xl md:text-3xl lg:text-5xl font-bold font-mono text-gray-900 mb-4 lg:mb-6 uppercase tracking-[-0.03em] leading-[1.1] max-w-sm"
                                            >
                                                {activeItem.title}
                                            </motion.h3>

                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: 40 }}
                                                transition={{ duration: 0.8, delay: 0.3 }}
                                                className="h-[2px] bg-black mb-4 lg:mb-6"
                                            />

                                            <motion.p
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                                                className="text-base md:text-lg font-mono text-gray-400 max-w-xs leading-relaxed"
                                            >
                                                {activeItem.description}
                                            </motion.p>

                                            <motion.div
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                                                className="mt-6 lg:mt-12"
                                            >
                                                <a
                                                    href={activeItem.href}
                                                    className="inline-flex items-center gap-2 px-6 lg:px-8 py-2.5 lg:py-3 rounded-[10px] border border-gray-500 transition-all duration-300 hover:bg-black hover:text-white group"
                                                >
                                                    <span className="text-xs lg:text-sm font-medium">
                                                        Discover More
                                                    </span>
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        →
                                                    </span>
                                                </a>
                                            </motion.div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Right Content (Image - 8 columns) */}
                        <div className="lg:col-span-8 relative h-[35vh] md:h-[45vh] lg:h-full overflow-hidden bg-gray-50 rounded-[10px] mt-12 lg:mt-0">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1 }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <motion.div
                                        className="absolute inset-0 w-full h-full"
                                        style={{ scale: 1 + (itemProgress / 1000) }}
                                    >
                                        {activeItem.imageUrl && (
                                            <Image
                                                src={activeItem.imageUrl}
                                                alt={activeItem.title}
                                                fill
                                                className="object-cover"
                                                priority
                                                sizes="(max-width: 1024px) 100vw, 66vw"
                                            />
                                        )}
                                    </motion.div>

                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent" />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Progress Indicator */}
                <div className="w-full bg-white pt-8 lg:pt-12">
                    {/* Refined Progress Bar */}
                    <div className="w-full h-px bg-gray-100 relative">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-black z-10"
                            animate={{ width: `${itemProgress}%` }}
                            transition={{ type: "spring", stiffness: 200, damping: 40 }}
                        />
                    </div>

                    {/* Meta-info container */}
                    <div className="py-4 lg:py-8 flex justify-between items-center text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-gray-400">
                        <div className="flex gap-8">
                            <span className="text-gray-900">Next: {100 - itemProgress}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
