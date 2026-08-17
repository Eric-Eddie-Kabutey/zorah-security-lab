"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the types for the component's props
interface PartnerGroup {
  label: string;
  logos: React.ReactNode[];
}

interface PartnersSectionProps {
  groups: PartnerGroup[];
  animated?: boolean; // Make the animation optional
  interval?: number;
}

// Define your logo components (or import them from a central file)

const PartnersSection: React.FC<PartnersSectionProps> = ({ groups, animated = false, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!animated || groups.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % groups.length);
    }, interval);

    return () => clearInterval(timer);
  }, [animated, groups.length, interval]);

  if (animated) {
    const currentGroup = groups[currentIndex];
    return (
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
            className="flex flex-col items-center justify-start"
          >
            <p className="text-sm text-foreground/60 mb-8">{currentGroup.label}</p>
            <div className="flex justify-start items-center gap-10 md:gap-16 flex-wrap text-foreground/80">
              {currentGroup.logos}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // Static rendering for the About page
  return (
    <div className="w-full space-y-12">
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col items-center">
          <p className="text-sm text-foreground/60 mb-8">{group.label}</p>
          <div className="flex justify-center items-center gap-10 md:gap-16 flex-wrap text-foreground/80">
            {group.logos}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PartnersSection;