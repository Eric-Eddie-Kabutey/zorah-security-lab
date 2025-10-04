"use client";

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Logo from '@/components/logo/brand-logo';
import MobileAccordion from './mobile-accordion'; 

import { navigationItems } from '@/data/nav-data';

const menuVariants: Variants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { x: '100%', transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

const navListVariants: Variants = {
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  hidden: {},
};


interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu = ({ onClose }: MobileMenuProps) => {
  const mainNavItems = navigationItems.filter(item => item.label !== 'Join our team');
  const joinNavItem = navigationItems.find(item => item.label === 'Join our team');

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gray-300 flex flex-col"
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex justify-between items-center px-6 h-20 shrink-0">
        <Logo />
        <button onClick={onClose} className="p-2 text-3xl text-black" aria-label="Close menu">
          &times;
        </button>
        
      </div>

      <motion.nav
        className="px-6 py-8 flex flex-col"
        variants={navListVariants}
        initial="hidden"
        animate="visible"
      >
        {mainNavItems.map((item) => 
          item.dropdownMenuContent ? (
            <MobileAccordion key={item.label} item={item} onClose={onClose} />
          ) : (
            <div key={item.label} className="border-b border-muted">
              <Link href={item.href} className="block text-2xl font-normal py-4 hover:text-foreground/70" onClick={onClose}>
                {item.label}
              </Link>
            </div>
          )
        )}
      </motion.nav>

      {joinNavItem && (
        <motion.div
          className="mt-auto p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5 } }}
        >
          <Link href={joinNavItem.href} className="block w-full text-center bg-sky-50 text-foreground font-medium py-4 px-6 rounded-full hover:bg-accent" onClick={onClose}>
            {joinNavItem.label} &rarr;
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MobileMenu;