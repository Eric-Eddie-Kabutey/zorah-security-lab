"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { NavItem } from "@/types/nav-types";
import { cn } from "@/lib/utils";

const MegaMenuDropdown: React.FC<{ item: NavItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  // This item is a simple link, not a dropdown
  if (!item.megaMenuContent) {
    return (
      <li>
        <Link href={item.href} className="block text-foreground hover:text-foreground/70 transition-colors">
          {item.label}
        </Link>
      </li>
    );
  }

  // --- Logic for the Mega Menu Dropdown ---
  const columns = item.megaMenuContent;
  const numColumns = columns.length;

  return (
    <li onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      {/* 
        This is the trigger link in the main navbar.
        We make it a button-like element for accessibility, but it links to the main services page.
      */}
      <Link
        href={item.href}
        className={cn(
          "text-foreground transition-colors",
          isOpen ? "text-foreground" : "hover:text-foreground/70"
        )}
      >
        {item.label}
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            // --- NEW: Full-width positioning ---
            className="absolute top-10 left-10 xl:left-1/5 -translate-x-0 mt-3  origin-0"
          >
            <div className="mt-2 bg-gray-100 rounded-lg shadow-lg">
              <div className="max-w-7xl mx-auto">
                <div className={cn(
                  "grid divide-x divide-muted",
                  // Dynamically set grid columns based on data
                  {
                    'grid-cols-1': numColumns === 1,
                    'grid-cols-2': numColumns === 2,
                    'grid-cols-3': numColumns === 3,
                    'grid-cols-4': numColumns >= 4, // Your data has 4, so this will be applied
                  }
                )}>
                  {columns.map((column) => (
                    <div key={column.title} className="p-8">
                      <h3 className="text-base font-semibold text-foreground">{column.title}</h3>
                      <p className="mt-1 mb-6 text-sm text-foreground/70">{column.description}</p>
                      
                      <div className={cn(
                        column.linkLayout === 'grid' ? "grid grid-cols-2 gap-4" : "space-y-6"
                      )}>
                        {column.links.map((link) => (
                          <Link key={link.title} href={link.href} className="block group">
                            <div className="flex items-start gap-3">
                              {/* You can add icon logic back here if needed */}
                              <div>
                                <p className="font-semibold text-foreground group-hover:text-foreground/70 transition-colors">{link.title}</p>
                                        {link.description?.map((item, index) => (
                                            <p key={index} className="text-sm text-foreground/70">
                                                {item}
                                            </p>                                            
                                        ))}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default MegaMenuDropdown;