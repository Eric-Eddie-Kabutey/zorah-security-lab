"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnthropicLogo, GoogleLogo, OpenAILogo, RedpointLogo, SequoiaLogo } from '../logo/works-with-logos';


const partnerSets = [
  {
    label: "Trusted by the world's leading AI labs",
    logos: [<OpenAILogo key="openai" />, <GoogleLogo key="google" />, <AnthropicLogo key="anthropic" />]
  },
  {
    label: "Backed by leading investors, among others",
    logos: [<SequoiaLogo key="sequoia" />, <RedpointLogo key="redpoint" />]
  }
];

const Hero: React.FC = () => {
  const [partnerIndex, setPartnerIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPartnerIndex(prevIndex => (prevIndex + 1) % partnerSets.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); 
  }, []);

  const currentPartnerSet = partnerSets[partnerIndex];

  return (
    <section className="min-h[95vh] lg:min-h-screen flex flex-col items-center justify-center text-center bg-background px-6 pt-18 md:py-24">
      <div className=" max-w-3xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-4xl  mg:text-5xl md:text-7xl font-serif text-black font-medium leading-tight">
          Digital Forensics & Business Security 
        </h1>

        {/* Subheading */}
        <p className="mt-4 max-w-[476px] mx-auto text-lg text-black font-medium leading-relaxed">
          Zorah Security Lab is the first integrated partner dedicated to securing Critical Governmenet and Business Digital Integrity, critical infrastructure and assets by unifying cyber defence, digital forensics, investigations and physical asset recovery under one command.
        </p>
      </div>

      {/* Animated Partner Logos Section */}
      <div className="mt-14 lg:mt-24 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={partnerIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
            className="flex flex-col items-center"
          >
            <p className="text-sm text-black font-medium mb-6">{currentPartnerSet.label}</p>
            <div className="flex justify-center items-center gap-10 md:gap-16 flex-wrap">
              {currentPartnerSet.logos}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;