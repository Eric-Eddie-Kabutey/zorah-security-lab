"use client";

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

// The animation variant for each list item
export const roleItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

interface RoleItemProps {
  title: string;
  href: string;
}

const RoleItem: React.FC<RoleItemProps> = ({ title, href }) => {
  return (
    <motion.div variants={roleItemVariants}>
      {/* 
        The 'group' class enables child elements to react to the Link's hover state.
        The negative margins (-mx-8) and padding (px-8) make the background color
        bleed to the edges of the parent container, creating the full-width effect.
      */}
      <Link
        href={href}
        className="group flex items-center justify-between border-b border-muted py-8 -mx-8 px-8 transition-colors duration-300 hover:bg-blue-200"
      >
        {/* Left side group for the appearing arrow and title */}
        <div className="flex items-center gap-6">
          {/* The appearing arrow on the left */}
          <span className="text-2xl text-foreground opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            &rarr;
          </span>
          <span className="text-3xl font-medium text-foreground group-hover:translate-x-12">
            {title}
          </span>
        </div>

        {/* The disappearing arrow on the right */}
        <span className="text-2xl text-foreground opacity-100 transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-4">
          &rarr;
        </span>
      </Link>
    </motion.div>
  );
};

export default RoleItem;