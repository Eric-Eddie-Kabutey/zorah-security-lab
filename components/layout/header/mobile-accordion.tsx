"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem } from '@/types/nav-types';

interface MobileAccordionProps {
  item: NavItem;
  onClose: () => void;
}

const MobileAccordion: React.FC<MobileAccordionProps> = ({ item, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-muted">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-2xl font-normal"
      >
        <span>{item.label}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-xl"
        >
          &#9660; {/* Down arrow */}
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden pl-4"
          >
            {item.megaMenuContent?.map((column) => (
              <div key={column.title} className="py-4">
                <h4 className="font-semibold text-xl text-foreground mb-2">{column.title}</h4>
                <div className="space-y-3">
                  {column.links.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      onClick={onClose}
                      className="block text-lg text-foreground/80 hover:text-foreground"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileAccordion;