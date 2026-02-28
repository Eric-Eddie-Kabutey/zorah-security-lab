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
import { } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { navigationItems } from "@/data/nav-data";
import { DropdownMenuItem } from "@/types/nav-types";
import { DotPattern } from "../ui/dot-pattern";

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
      className="h-full p-0 md:p-1" // Added p-2 to create a consistent 16px gap between card contents
    >
      <div
        className={cn(
          "hero-info-container h-full min-h-[168px]", // Matches the height of the tallest item in the row
          className,
          "relative overflow-hidden rounded-xl flex flex-col justify-between",
          color,
          "backdrop-blur-xl border border-neutral-300/50",
        )}
      >
        {/* glass overlay layer */}
        <div className="pointer-events-none absolute inset-0" />

        {/* content */}
        <div className="relative z-10 flex flex-col h-full p-6 pt-5">
          <div className="flex justify-between items-start">
            <span
              className={cn(
                "text-5xl font-mono font-bold tracking-tighter leading-none",
                isDark ? "text-gray-100/70" : "text-gray-900/70"
              )}
            >
              {displayId}
            </span>
          </div>

          <div className="mt-2 flex flex-col gap-4">
            <h3
              className={cn(
                "text-xl font-bold uppercase tracking-tight leading-[1.2] max-w-[90%]",
                isDark ? "text-gray-100" : "text-gray-900"
              )}
            >
              {item.title}
            </h3>

            {/* Sub-services as badges */}
            <div className="flex flex-wrap gap-1.5">
              {item.tags?.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border",
                    isDark
                      ? "bg-white/5 border-gray-100/10 text-gray-100"
                      : "bg-black/5 border-gray-900/10 text-gray-900"
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Deco */}
        {/* <div className="pointer-events-none absolute top-0 right-0 p-4 opacity-20">
          <div className={cn(
            "w-8 h-8 border-t border-r",
            isDark ? "border-white" : "border-black"
          )} />
        </div> */}
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
    <section className="relative bg-white w-full max-w-[1230px] 2xl:max-w-[1390px] mx-auto h-auto flex flex-col items-start justify-start text-left px-6 overflow-hidden">

      {/* Responsive Info Blocks Section */}
      <div className="w-full mt-4 md:mt-8 mb-10 md:mb-10 z-10">
        <div className="md:hidden overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {services.map((item, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 px-1">
                <InfoBlock item={item} index={index} />
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:grid grid-cols-3 gap-0">
          <div className="hero-info-container bg-transparent"></div>
          {services.slice(0, 4).map((item, index) => (
            <InfoBlock key={index} item={item} index={index} className="" />
          ))}
          <div className="hero-info-container bg-transparent "></div>
        </div>
      </div>

      {/* <GridPattern
        width={100}
        height={100}
        x={24}
        y={0}
        className={cn(
          "[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]",
        )}
      /> */}

      <DotPattern
        width={32}
        height={32}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent,black)]"></div>

      <div className="z-20">
        <div className="w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] md:leading-20 "
          >
            Digital Forensics
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-400 leading-[1.1] md:leading-20 "
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