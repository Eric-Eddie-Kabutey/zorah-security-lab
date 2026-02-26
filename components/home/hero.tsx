"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  AnthropicLogo,
  GoogleLogo,
  OpenAILogo,
  RedpointLogo,
  SequoiaLogo,
} from "../logo/works-with-logos";
import { Shield, Scan, Fingerprint, Lock } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { navigationItems } from "@/data/nav-data";
import { DropdownMenuItem } from "@/types/nav-types";

// Helper to get services from nav data
const getServices = () => {
  const servicesItem = navigationItems.find(item => item.label === 'Services');
  return servicesItem?.dropdownMenuContent || [];
};

const partnerSets = [
  {
    label: "Trusted by the world's leading AI labs",
    logos: [
      <OpenAILogo key="openai" />,
      <GoogleLogo key="google" />,
      <AnthropicLogo key="anthropic" />,
    ],
  },
  {
    label: "Backed by leading investors, among others",
    logos: [<SequoiaLogo key="sequoia" />, <RedpointLogo key="redpoint" />],
  },
];

const COLORS = [
  "bg-gray-100",
  "bg-gray-400",
  "bg-gray-300",
  "bg-gray-700",
];

const ICONS = [Shield, Scan, Fingerprint, Lock];

const InfoBlock = ({
  item,
  index,
  className = "",
}: {
  item: DropdownMenuItem;
  index: number;
  className?: string;
}) => {
  const color = COLORS[index % COLORS.length];
  const isDark = color === "bg-gray-700" || color === "bg-gray-400";
  const displayId = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="h-full"
    >
      <div
        className={cn(
          "hero-info-container h-full min-h-[160px] md:min-h-[190px]",
          className,
          "relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between",
          color,
          "backdrop-blur-xl",
        )}
      >
        {/* glass overlay layer */}
        <div className="pointer-events-none absolute inset-0" />

        {/* content */}
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex flex-row justify-between items-start gap-2">
            <span
              className={cn(
                "text-4xl leading-none font-bold",
                isDark ? "text-white/30" : "text-gray-900/30"
              )}
            >
              {displayId}
            </span>
          </div>

          <div className="mt-2 flex-grow">
            <h3
              className={cn(
                "text-lg font-bold uppercase tracking-tight leading-tight mb-3",
                isDark ? "text-gray-100" : "text-gray-900"
              )}
            >
              {item.title}
            </h3>

            {/* Sub-services as badges */}
            <div className="flex flex-wrap gap-1.5">
              {item.tags?.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-[10px] border",
                    isDark
                      ? "bg-white/10 border-white/20 text-white/70"
                      : "bg-black/5 border-black/10 text-black/60"
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* glass effect decorations */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className={cn(
            "absolute -top-12 -left-12 h-32 w-32 rounded-full blur-2xl",
            isDark ? "bg-white/20" : "bg-black/10"
          )} />
        </div>
      </div>
    </motion.div>
  );
};


const Hero: React.FC = () => {
  const services = getServices();
  const [partnerIndex, setPartnerIndex] = useState(0);
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPartnerIndex((prevIndex) => (prevIndex + 1) % partnerSets.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentPartnerSet = partnerSets[partnerIndex];

  return (
    <section className="relative bg-white max-w-[1230px] 2xl:max-w-[1390px] mx-auto h-auto flex flex-col-reverse md:flex-col items-start justify-start text-left px-6 overflow-hidden">

      {/* Responsive Info Blocks Section */}
      <div className="w-full mt-4 md:mt-16 mb-10 md:mb-20 z-10">
        {/* Mobile Carousel */}
        <div className="md:hidden overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {services.map((item, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 px-1">
                <InfoBlock item={item} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-4">
          <div className="hero-info-container bg-transparent"></div>
          {services.slice(0, 4).map((item, index) => (
            <InfoBlock key={index} item={item} index={index} />
          ))}
          <div className="hero-info-container bg-transparent"></div>
        </div>
      </div>

      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_2px)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent,black)]"></div>

      <div className="z-20">
        <div className="w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-7xl font-mono text-gray-900 font-bold md:leading-20 uppercase"
          >
            Digital Forensics
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-4xl md:text-7xl font-mono text-gray-900/80 font-bold md:leading-20 uppercase"
          >
            Business Security
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="max-w-5xl mt-4 text-base lg:text-lg font-mono text-gray-700 font-medium leading-relaxed"
          >
            Zorah Security Lab is the first integrated partner dedicated to securing Critical Government and Business Digital Integrity, critical infrastructure and assets by unifying cyber defence, digital forensics, investigations and physical asset recovery under one command.
          </motion.p>
        </div>

        <div className="py-10 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={partnerIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
              className="flex flex-col font-mono items-start"
            >
              <p className="text-sm text-gray-900 font-bold mb-6 uppercase">{currentPartnerSet.label}</p>
              <div className="flex justify-start items-start gap-10 md:gap-16 flex-wrap">
                {currentPartnerSet.logos}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Hero;