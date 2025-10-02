"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';

import AnnouncementBanner from './announcement-banner';
import MainHeader from './header/main-header';

const Header = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isHomePage && isAtTop && <AnnouncementBanner />}
      </AnimatePresence>
      <MainHeader />
    </>
  );
};

export default Header;