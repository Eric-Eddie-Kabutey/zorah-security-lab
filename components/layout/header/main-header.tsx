"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import MobileMenu from './mobile-menu'; 
import Logo from '@/components/logo/brand-logo';
import MegaMenuDropdown from './menu-dropdown';

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
        <div className="max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6 h-20 flex justify-between items-center">
          <Logo />

          {/* DYNAMIC DESKTOP NAVIGATION */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {mainNavItems.map((item) => (
                <li key={item.label}>
                  <MegaMenuDropdown key={item.label} item={item} />
                </li>
              ))}
              {joinNavItem && (
                <li>
                  <Link
                    href={joinNavItem.href}
                    className="bg-sky-50 text-foreground font-medium py-3 px-6 rounded-full hover:bg-accent transition-colors"
                  >
                    {joinNavItem.label} &rarr;
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          
          {/* ... mobile menu toggle ... */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)} aria-label="Open menu" className='flex flex-col gap-y-1'>
             <span className="block w-6 h-0.5 bg-black"></span> 
            <span className="block w-6 h-0.5 bg-black"></span>
            </button>
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