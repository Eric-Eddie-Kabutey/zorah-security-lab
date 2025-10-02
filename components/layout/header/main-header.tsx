"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import MobileMenu from './mobile-menu'; 
import Logo from '@/components/logo/brand-logo';
import MegaMenuDropdown from './mega-menu';

import { navigationItems } from '@/data/nav-data';

const MainHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  const mainNavItems = navigationItems.filter(item => item.label !== 'Join our team');
  const joinNavItem = navigationItems.find(item => item.label === 'Join our team');

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Logo />

          {/* DYNAMIC DESKTOP NAVIGATION */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {mainNavItems.map((item) => (
                <MegaMenuDropdown key={item.label} item={item} />
              ))}
              {joinNavItem && (
                <li>
                  <Link
                    href={joinNavItem.href}
                    className="bg-muted text-foreground font-medium py-3 px-6 rounded-full hover:bg-accent transition-colors"
                  >
                    {joinNavItem.label} &rarr;
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          
          {/* ... mobile menu toggle ... */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)} aria-label="Open menu">...</button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default MainHeader;