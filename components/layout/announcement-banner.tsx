"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

const bannerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const AnnouncementBanner = () => {
  return (
    <motion.div
      className="bg-blue-200 text-brand-text py-3 px-6 text-center text-sm"
      variants={bannerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="flex justify-between md:justify-center items-center gap-2  md:gap-8 flex-wrap">
        <p className='text-start text-sm md:text-base md:font-bold'>Irregular Raises $80 Million to Set the <br className='md:hidden' /> Security Standards for Frontier AI</p>
        <Link href="/news/funding" className="font-medium md:font-base text-sm md:text-[15px] whitespace-nowrap hover:underline">
          Read more &rarr;
        </Link>
      </div>
    </motion.div>
  );
};

export default AnnouncementBanner;