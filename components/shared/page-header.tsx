"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          // This is the core responsive logic:
          // - 'text-start' aligns the text to the left by default (for mobile).
          // - 'md:text-center' centers the text on medium screens and larger.
          className="text-3xl md:text-4xl font-serif text-foreground text-start max-w-2xl mx-auto"
        >
          {title}
        </motion.h1>
      </div>
    </section>
  );
};

export default PageHeader;