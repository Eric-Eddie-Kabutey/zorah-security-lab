"use client"; // This directive is crucial

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ServiceFrontmatter } from '@/types';
import ServiceCard from './services-card'; 

interface ServicesListProps {
  services: ServiceFrontmatter[];
  categorySlug: string;
}

// Animation variant for the grid container to stagger its children
const gridContainerVariants: Variants = {
  visible: { transition: { staggerChildren: 0.1 } },
  hidden: {},
};

const ServicesList: React.FC<ServicesListProps> = ({ services, categorySlug }) => {
  return (
    <motion.div
      className="max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={gridContainerVariants}
    >
      {services.map(service => (        
        <ServiceCard
          key={service.slug}
          service={service}
          categorySlug={categorySlug}
        />
      ))}
    </motion.div>
  );
};

export default ServicesList;