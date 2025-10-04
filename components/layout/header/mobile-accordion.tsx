"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-2xl">
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
            className="overflow-hidden" 
          >           
            <div className="max-h-[50vh] overflow-y-auto pl-4 py-2">
              <div className="flex flex-col gap-2">
                {item.dropdownMenuContent?.map((menuItem) => (
                  <Link
                    key={menuItem.title}
                    href={menuItem.href}
                    onClick={onClose}
                    className="flex items-start gap-4 p-3 rounded-md hover:bg-muted"
                  >
                    <Image
                      src={menuItem.iconUrl}
                      alt={`${menuItem.title} icon`}
                      width={24}
                      height={24}
                      className="mt-1"
                    />
                    <div>
                      <p className="text-xl font-semibold text-foreground">{menuItem.title}</p>
                      <p className="text-base text-foreground/80">{menuItem.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileAccordion;