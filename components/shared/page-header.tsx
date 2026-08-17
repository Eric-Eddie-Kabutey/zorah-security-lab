"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { DotPattern } from '../ui/dot-pattern';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <section className="relative bg-background pt-20 pb-12 max-w-[1230px] 2xl:max-w-[1390px] mx-auto py-16 md:py-24 px-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.2] tracking-tight text-center"
      >
        {title}
      </motion.h1>
      <DotPattern
        width={32}
        height={32}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)] opacity-20 text-neutral-400/20",
        )}
      />
    </section>
  );
};

export default PageHeader;