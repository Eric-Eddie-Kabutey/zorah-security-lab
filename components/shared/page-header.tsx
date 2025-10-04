"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <section className="bg-background py-16 md:py-32">      
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}         
          className="text-3xl md:text-4xl font-serif text-foreground text-start max-w-2xl mx-auto"
        >
          {title}
        </motion.h1>      
    </section>
  );
};

export default PageHeader;