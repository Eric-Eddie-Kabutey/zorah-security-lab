"use client";

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ServiceFrontmatter } from '@/types';

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

interface ServiceCardProps {
  service: ServiceFrontmatter;
  categorySlug: string; 
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, categorySlug }) => {
  return (
    <motion.div variants={cardVariants}>
      <Link
        href={`/services/${categorySlug}/${service.slug}`}
        className="group block bg-white p-8 rounded-xl border border-muted hover:shadow-lg hover:border-transparent transition-all duration-300 h-full"
      >
        <h3 className="text-2xl font-semibold text-foreground mb-3">{service.title}</h3>
        <p className="text-foreground/70 mb-6">{service.summary}</p>
        <div className="text-sm font-medium text-foreground/80 flex items-center gap-2 group-hover:text-foreground">
          Learn more
          <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;