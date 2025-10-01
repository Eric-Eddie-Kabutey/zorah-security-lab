"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PublicationFrontmatter } from '@/types';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

// Placeholder icon for research items
const AbstractIcon = () => (
  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#E0F2FE" /><path d="M15 25L25 15" stroke="#0284C7" strokeWidth="2" strokeLinecap="round"/><path d="M15 15L25 25" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

interface PublicationListItemProps {
  publication: PublicationFrontmatter;
}

const PublicationListItem: React.FC<PublicationListItemProps> = ({ publication }) => {
  const isResearch = publication.type === 'research';

  return (
    <Link href={`/publications/${publication.slug}`} className="block group py-12 border-t border-muted border-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-x-2 gap-y-4">
        {/* Left Column: Date & Type */}
        <div className="md:col-span-2 text-sm text-black flex flex-row md:flex-col gap-x-4">
          <p className="capitalize text-sm md:text-lg font-medium">{publication.type}</p>
          <time dateTime={publication.publishedDate} className='text-gray-600 text-sm md:text-lg font-medium'>
            {format(new Date(publication.publishedDate), 'MMMM d, yyyy')}
          </time>
        </div>

        {/* Right Column: Main Content */}
        <div className="md:col-span-3 flex flex-col gap-6 md:-ml-16 max-w-[572px]">
          {/* Conditional Top Section: Icon for Research, Image for News */}
          {isResearch ? (
            <div className="flex items-center gap-6">
              <AbstractIcon />
              <h2 className="text-3xl font-medium text-foreground group-hover:text-foreground/80 transition-colors">{publication.title}</h2>
            </div>
          ) : (
            <div>
              {publication.featureImage && (
                <div className="relative w-full aspect-[16/9] mb-6 rounded-lg overflow-hidden">
                  <Image src={publication.featureImage} alt={publication.title} fill className="object-cover"/>
                </div>
              )}
              <h2 className="text-3xl font-medium text-black group-hover:text-foreground/80 transition-colors">{publication.title}</h2>
            </div>
          )}

          <p className="text-black font-medium max-w-3xl">{publication.summary}</p>
          
          {/* Conditional Collaborator section for Research */}
          {isResearch && publication.collaborator && (
            <div className="text-sm">
              <span className="text-foreground/60">In collaboration with</span>
              <p className="font-bold text-foreground mt-1">{publication.collaborator}</p>
            </div>
          )}

          <div className="text-sm font-medium text-foreground/80 flex items-center gap-2 group-hover:text-foreground">
            Read more
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PublicationListItem;