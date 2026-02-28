"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import BrandLogo from '@/components/logo/brand-logo';

export default function NotFound() {
    return (
        <div className="relative min-h-[85vh] flex flex-col items-center justify-center bg-white overflow-hidden selection:bg-gray-900 selection:text-white">
            <DotPattern
                width={32}
                height={32}
                cx={1}
                cy={1}
                cr={1}
                className={cn(
                    "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)] opacity-30 text-neutral-400/20",
                )}
            />

            <div className="relative z-10 max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6 text-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.03] select-none pointer-events-none">
                    <h1 className="text-[20vw] font-black uppercase tracking-tighter leading-none">
                        404
                    </h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center"
                >
                    <div className="mb-8">
                        <BrandLogo />
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black text-gray-900 uppercase tracking-tighter mb-6 leading-none">
                        Sector <span className="text-gray-400">Not Found</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 font-medium leading-relaxed mb-12">
                        Zorah Security Lab is the first integrated partner dedicated to securing Critical Government and Business Digital Integrity, critical infrastructure and assets by unifying cyber defence, digital forensics, investigations and physical asset recovery under one command.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-[10px] bg-gray-900 text-white font-bold uppercase tracking-widest text-xs hover:bg-black transition-all duration-300 group"
                        >
                            <span>Home</span>
                            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                        </Link>

                        {/* <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-[10px] border border-gray-900 text-gray-900 font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-all duration-300"
                        >
                            Contact Support
                        </Link> */}
                    </div>
                </motion.div>
            </div>

            <div className="absolute top-32 right-12 hidden lg:block opacity-20">
                <div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">
                    <div>ERR_CODE: 0x404_PAGE_MISSING</div>
                    <div>PROTOCOL: PAGE_REDIRECT_REQUIRED</div>
                </div>
            </div>
        </div>
    );
}
