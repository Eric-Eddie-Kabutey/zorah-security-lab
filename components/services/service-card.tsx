"use client";

import Image, { StaticImageData } from 'next/image';
import { motion, Variants } from 'framer-motion';

// The animation variant for each card
export const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

interface ServiceCardProps {
  imageUrl: string | StaticImageData;
  altText: string;
  title: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ imageUrl, altText, title }) => {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-lg"
    >
      <Image
        src={imageUrl}
        alt={altText}
        fill
        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
      {/* Optional: Add an overlay or title on hover */}
      <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-6">
        <h3 className="text-white text-xl font-medium">{title}</h3>
      </div>
    </motion.div>
  );
};

export default ServiceCard;