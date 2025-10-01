"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Publication } from '@/data/publication-data';

// A simple placeholder icon component
const AbstractIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#E0F2FE" />
    <path d="M15 25L25 15" stroke="#0284C7" strokeWidth="2" strokeLinecap="round"/>
    <path d="M15 15L25 25" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);



interface PublicationCardProps {
  publication: Publication;  
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication }) => {
  return (
      <Link 
        href={publication.href} 
        className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 h-full"
      >
        <div className="flex flex-col h-full">
          {/* Card Cover Image */}
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-2xl">
            <Image
              src={publication.coverImage}
              alt={`Cover image for ${publication.title}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Card Content */}
          <div className="p-8 flex flex-col flex-grow">
            <div className="mb-6">
              <AbstractIcon />
            </div>

            <h3 className="text-2xl font-medium text-foreground mb-6 flex-grow">
              {publication.title}
            </h3>

            <div className="text-sm">
              <span className="text-foreground/60">In collaboration with</span>
              <p className="font-bold text-foreground mt-1">{publication.partner}</p>
            </div>
            
            <div className="mt-8 text-sm font-medium text-foreground/80 flex items-center gap-2 group-hover:text-foreground">
              Read more
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </div>
          </div>
        </div>
      </Link>    
  );
};

export default PublicationCard;