"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
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
};


const Publications: React.FC = () => {
  const [ visibleCount, setVisibleCount ] = useState(INITIAL_VISIBLE_COUNT);
  const [ showMany, setShowMany ] = useState(false)
  const [title, setTitle] = useState('VIEW ALL')

  const showMore = () => {
    setVisibleCount(allPublications.length);
  };

  const handler = () => {
    if (showMany) {
      setTitle('VIEW ALL')
      setShowMany(true)
    } else {
      setTitle('VIEW LESS')
      setShowMany(false)
    }
  }

  const visiblePublications = allPublications.slice(0, visibleCount);  
  

  return (
    <section className="bg-background py-24 ">
      <div className="max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-lg font-medium text-foreground">Latest Publications</h2>
          {visibleCount < allPublications.length && (
            <button
              onClick={showMore}
              className="text-sm font-medium tracking-widest text-black hover:text-gray-800"
            >
              VIEW ALL &rarr;
            </button>
          )}
        </div>

        {/* Publications Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {visiblePublications.map((publication) => (
            <PublicationCard
              key={publication.id}
              publication={publication}
              variants={itemVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Publications;