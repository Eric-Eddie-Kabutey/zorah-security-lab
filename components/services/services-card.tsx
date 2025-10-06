"use client";

import Link from 'next/link';
import Image from 'next/image';
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
        className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col"
      >     
        <div className='flex flex-col h-full p-4'>
          {service.coverImage && (
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-xl mb-6">
              <Image
                src={service.coverImage}
                alt={`Cover image for ${service.title}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
      
          {/* card content */}
          <div className="flex flex-col flex-grow">
            <div>
              <h3 className="text-2xl font-semibold text-foreground  mt-2 mb-6">{service.title}</h3>
              <p className="text-foreground/70 my-4">{service.summary}</p>
            </div>
            <div className="mt-auto pt-6 text-sm font-medium text-foreground/80 flex items-center gap-2 group-hover:text-foreground my-2">
              Learn more
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </div>
          </div>
        </div>  
      </Link>
    </motion.div>
  );
};

export default ServiceCard;