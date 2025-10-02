"use client";

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Logo from '@/components/logo/brand-logo';

const menuVariants: Variants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { x: '100%', transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

const navListVariants: Variants = {
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  hidden: {},
};

const navItemVariants: Variants = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  hidden: { opacity: 0, x: -20 },
};

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu = ({ onClose }: MobileMenuProps) => {
  return (
    <motion.div      
      className="fixed inset-0 z-50 bg-gray-300 flex flex-col"
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* 1. Internal Header for the Menu */}
      <div className="flex justify-between items-center px-6 h-20 shrink-0">
        <Logo />
        <button
          onClick={onClose}
          className="p-2 text-3xl text-foreground"
          aria-label="Close menu"
        >
          &times;
        </button>
      </div>

      {/* 2. Navigation Links */}
      <motion.nav
        className="px-6 py-8 flex flex-col gap-4"
        variants={navListVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={navItemVariants} className="border-b border-muted">
          <Link href="/publications" className="block text-3xl font-medium py-4 hover:text-foreground/70" onClick={onClose}>
            Publications
          </Link>
        </motion.div>
        <motion.div variants={navItemVariants} className="border-b border-muted">
          <Link href="/about" className="block text-3xl font-medium py-4 hover:text-foreground/70" onClick={onClose}>
            About
          </Link>
        </motion.div>
        <motion.div variants={navItemVariants} className="border-b border-muted">
          <Link href="/services" className="block text-3xl font-medium py-4 hover:text-foreground/70" onClick={onClose}>
            Services
          </Link>
        </motion.div>
        <motion.div variants={navItemVariants} className="border-b border-muted">
          <Link href="/contact" className="block text-3xl font-medium py-4 hover:text-foreground/70" onClick={onClose}>
            Contact
          </Link>
        </motion.div>
      </motion.nav>

      {/* 3. "Join our team" button at the bottom */}
      <motion.div
        className="mt-auto p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.3 } }}
      >
        <Link href="/careers" className="block w-full text-center bg-muted text-foreground font-medium py-4 px-6 rounded-full hover:bg-accent transition-colors" onClick={onClose}>
          Join our team &rarr;
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default MobileMenu;