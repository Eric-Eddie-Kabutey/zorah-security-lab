"use client"; 

import React from 'react';
import { motion, Variants } from 'framer-motion';

const animationVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

interface AnimatedBlockProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedBlock: React.FC<AnimatedBlockProps> = ({ children, className }) => {
  return (
    <motion.div
      variants={animationVariants}
      initial="hidden"
      whileInView="visible"      
      viewport={{ once: true, amount: 0.1 }} 
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedBlock;