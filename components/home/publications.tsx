"use client";

import React, { useState } from 'react';
import { motion,AnimatePresence, Variants } from 'framer-motion';
import { allPublications } from '@/data/publication-data'
import PublicationCard from './publication-card';
;

const INITIAL_VISIBLE_COUNT = 3;

// Animation variants
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3, ease: 'easeIn' } },
};


const Publications: React.FC = () => {   
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleView = () => {
    setIsExpanded(prevState => !prevState);
  };

  const visibleCount = isExpanded ? allPublications.length : INITIAL_VISIBLE_COUNT;
  const visiblePublications = allPublications.slice(0, visibleCount);
  const buttonText = isExpanded ? 'VIEW LESS' : 'VIEW ALL';  
  

  return (
        <section className="bg-background py-24 px-6">
      <div className="max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-lg font-medium text-foreground">Latest Publications</h2>
          {/* Button is always visible if there are more items to show/hide */}
          {allPublications.length > INITIAL_VISIBLE_COUNT && (
            <button
              onClick={toggleView}
              className="text-sm font-medium tracking-widest text-foreground/70 hover:text-foreground"
            >
              {buttonText} &rarr;
            </button>
          )}
        </div>

        {/* Publications Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* 4. WRAP THE MAPPED ITEMS IN AnimatePresence */}
          <AnimatePresence>
            {visiblePublications.map((publication) => (
              // The key needs to be on the motion component directly inside AnimatePresence
              <motion.div
                key={publication.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit" // This tells Framer Motion how to animate the item out
                layout // This helps animate the grid reflow smoothly
              >
                <PublicationCard publication={publication} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>

  );
};

export default Publications;