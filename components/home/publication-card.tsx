"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Publication } from '@/data/publication-data';

interface PublicationCardProps {
  publication: Publication;  
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication }) => {
  return (
      <Link 
        href={publication.href} 
        className="group block  transition-all duration-300 h-full"
      >
        <div className="grid grid-cols-6 h-full p-4">

          {/* Card Content */}
          <div className="col-span-2 flex flex-col flex-grow">           

            <h3 className="text-7xl font-medium text-foreground mt-2 mb-6 ">
              {publication.title}
            </h3>

            <div className="text-sm my-2">
              <p className="font-medium text-foreground mt-1">{publication.description}</p>
            </div>
            
            <div className="mt-6 mb-4 text-sm font-medium text-foreground/80 flex items-center gap-2 group-hover:text-foreground">
              Read more
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </div>
          </div>
          {/* Card Cover Image */}
          <div className="col-span-4 relative w-full aspect-[16/9] overflow-hidden rounded-t-2xl mb-6">
            <Image
              src={publication.coverImage}
              alt={`Cover image for ${publication.title}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      </Link>    
  );
};

export default PublicationCard;