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
  as?: keyof typeof motion;
  [key: string]: unknown;
}

const AnimatedBlock: React.FC<AnimatedBlockProps> = ({ children, className, as = 'div', ...props }) => {
  const Component = motion[as] as React.ElementType;

  return (
    <Component
      variants={animationVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
};

export default AnimatedBlock;