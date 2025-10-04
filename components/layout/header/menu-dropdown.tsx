"use client";

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { NavItem } from '@/types/nav-types';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const MenuDropdown: React.FC<{ item: NavItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  // This item is a simple link, not a dropdown
  if (!item.dropdownMenuContent) {
    return (
      <li>
        <Link href={item.href} className="block text-foreground hover:text-foreground/70 transition-colors">
          {item.label}
        </Link>
      </li>
    );
  }

  const menuItems = item.dropdownMenuContent;

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return ( 
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)} 
      onMouseLeave={() => setIsOpen(false)}
    >     
      <div
        className={cn(
          "flex items-center gap-1 cursor-pointer text-foreground transition-colors",
          isOpen ? "text-foreground" : "hover:text-foreground/70"
        )}
      >
        <span>{item.label}</span>
        {/* 1. ADDED DROPDOWN INDICATOR */}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs"
        >
          ▼
        </motion.span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-full -translate-x-1/2 left-1/2 mt-3 origin-top"
          >
            <div className="w-[500px] rounded-lg bg-white shadow-2xl border border-muted p-2">
              <div className="flex flex-col">
                {menuItems.map((menuItem) => (
                  <Link
                    key={menuItem.title}
                    href={menuItem.href}                    
                    onClick={handleLinkClick}
                    className="flex items-start gap-4 p-4 rounded-md hover:bg-sky-50 transition-colors"
                  >
                    <Image
                      src={menuItem.iconUrl}
                      alt={`${menuItem.title} icon`}
                      width={24}
                      height={24}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{menuItem.title}</p>
                      <p className="text-sm text-foreground/70">{menuItem.description}</p>
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

export default MenuDropdown;