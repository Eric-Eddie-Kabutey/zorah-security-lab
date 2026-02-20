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
import { Spotlight } from "@/components/ui/spotlight-new";

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

const SECURITY_BLOCKS = [
  {
    id: "01",
    icon: Shield,
    title: "Cyber Defence & Threat Neutralization",
    color: "bg-gray-100",
  },
  {
    id: "02",
    icon: Scan,
    title: "Digital Forensics & Investigations",
    color: "bg-gray-400",
  },
  {
    id: "03",
    icon: Fingerprint,
    title: "Intelligence & Data Integrity",
    color: "bg-gray-300",
  },
  {
    id: "04",
    icon: Lock,
    title: "Critical Infrastructure Protection",
    color: "bg-gray-700",
  },
];

const InfoBlock = ({
  block,
  className = "",
}: {
  block: (typeof SECURITY_BLOCKS)[0];
  className?: string;
}) => (
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className={cn("hero-info-container", block.color, className)}>
      <div className="flex flex-row justify-between items-start gap-2">
        <span className="text-sm leading-2 font-bold text-gray-900">{block.id}</span>
        <div className="w-12 h-12 flex items-center justify-center">
          <block.icon
            className={cn(
              "w-10 h-10",
              block.color === "bg-gray-700" ? "text-gray-100" : "text-gray-900"
            )}
          />
        </div>
      </div>
      <div className="mt-4">
        <p
          className={cn(
            "text-md font-normal capitalize",
            block.color === "bg-gray-700" ? "text-gray-100" : "text-gray-900"
          )}
        >
          {block.title}
        </p>
      </div>
    </div>
  </motion.h1>
);

const Hero: React.FC = () => {
  const [partnerIndex, setPartnerIndex] = useState(0);
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPartnerIndex((prevIndex) => (prevIndex + 1) % partnerSets.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentPartnerSet = partnerSets[partnerIndex];

  return (
    <section className="relative bg-white max-w-[1230px] 2xl:max-w-[1390px] mx-auto h-auto flex flex-col-reverse md:flex-col items-start justify-start text-left px-6 ">

      {/* <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .15) 0, hsla(210, 100%, 55%, .05) 50%, hsla(210, 100%, 45%, 0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .12) 0, hsla(210, 100%, 55%, .04) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .1) 0, hsla(210, 100%, 45%, .03) 80%, transparent 100%)"
        translateY={-350}
        smallWidth={240}
        duration={7}
        xOffset={100}
      /> */}
      {/* Responsive Info Blocks Section */}
      <div className="w-full mt-14 md:mt-20 mb-10 md:mb-20 z-20">
        {/* Mobile Carousel*/}
        <div className="md:hidden overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {SECURITY_BLOCKS.map((block) => (
              <div key={block.id} className="flex-[0_0_100%] min-w-0 px-1">
                <InfoBlock block={block} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Grid  */}
        <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-1">
          <div className="hero-info-container bg-transparent"></div>
          <InfoBlock block={SECURITY_BLOCKS[0]} />
          <InfoBlock block={SECURITY_BLOCKS[1]} />
          <InfoBlock block={SECURITY_BLOCKS[2]} />
          <InfoBlock block={SECURITY_BLOCKS[3]} />
          <div className="hero-info-container bg-transparent"></div>
        </div>
      </div>

      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent,black)] dark:bg-[#F7F8F5]"></div>
      <div className="z-20">

        <div className="w-full">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl mg:text-5xl md:text-7xl font-mono text-gray-900 font-bold leading-14 uppercase">
            Digital Forensics
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl mg:text-5xl md:text-7xl font-mono text-gray-900/80 font-bold leading-14 uppercase">
            Business Security
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mt-4 text-base lg:text-lg font-mono text-gray-700 font-medium leading-relaxed">
            Zorah Security Lab is the first integrated partner dedicated to securing Critical Governmenet and Business Digital Integrity, critical infrastructure and assets by unifying cyber defence, digital forensics, investigations and physical asset recovery under one command.
          </motion.p>
        </div>

        {/* Animated Partner Logos Section */}
        <div className="pt-10  w-full">
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