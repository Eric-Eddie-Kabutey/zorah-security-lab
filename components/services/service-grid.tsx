"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import ServiceCard, { cardVariants } from './service-card';

// Mock data for the services. In a real app, this might come from a CMS.
const services = [
  { id: 1, title: 'AI Model Auditing', imageUrl: '/assets/images/img1.jpg', altText: 'Abstract representation of AI model auditing.' },
  { id: 2, title: 'Red Teaming', imageUrl: '/assets/images/img2.jpg', altText: 'Abstract representation of red teaming.' },
  { id: 3, title: 'Supply Chain Security', imageUrl: '/assets/images/img3.jpg', altText: 'Abstract representation of supply chain security.' },
  { id: 4, title: 'Vulnerability Research', imageUrl: '/assets/images/img3.jpg', altText: 'Abstract representation of vulnerability research.' },
  { id: 5, title: 'Policy Advisory', imageUrl: '/assets/images/img1.jpg', altText: 'Abstract representation of policy advisory.' },
  { id: 6, title: 'Secure Deployments', imageUrl: '/assets/images/img2.jpg', altText: 'Abstract representation of secure deployments.' },
];

// Animation variant for the grid container to stagger its children
const gridContainerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1, // Each card will animate 0.1s after the previous one
    },
  },
};

const ServicesGrid: React.FC = () => {
  return (
    <motion.div
      className="max-w-5xl mx-auto px-6 py-12 lg:py-22 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={gridContainerVariants}
    >
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          imageUrl={service.imageUrl}
          altText={service.altText}
          title={service.title}
        />
      ))}
    </motion.div>
  );
};

export default ServicesGrid;