"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Publication } from '@/data/publication-data';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Terminal, Calendar, Layers } from 'lucide-react';

interface PublicationCardProps {
  publication: Publication;
  index: number;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication, index }) => {
  return (
    <Link
      href={publication.href}
      className="group block relative h-full w-[350px] md:w-[450px] lg:w-[500px] flex-shrink-0"
    >
      <div className="relative h-full flex flex-col overflow-hidden">

        {/* Top Technical Header */}
        <div className="flex items-center justify-between py-4 border-b border-gray-50 bg-gray-50/30">
          <div className="">
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="text-[9px] font-mono text-gray-400">{publication.date}</span>
            </div>
            <div className="text-md font-mono font-bold text-gray-900 tracking-widest">
              {publication.category}
            </div>
          </div>
        </div>

        {/* Cover Image Container */}
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[10px]">
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={publication.coverImage}
              alt={publication.title}
              fill
              className="object-cover rounded-[10px]"
              sizes="(max-width: 1024px) 100vw, 500px"
            />
          </motion.div>
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
        </div>

        {/* Content Area */}
        <div className="flex-1 py-6 lg:py-8 flex flex-col justify-between bg-white relative">

          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-[1.1] mb-4 group-hover:text-black transition-colors">
              {publication.title}
            </h3>

            <p className="text-sm lg:text-base font-medium text-gray-500 font-mono leading-relaxed line-clamp-2 mb-6">
              {publication.description}
            </p>
          </div>

          {/* <div className="flex items-center justify-between pt-4 ">
            <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-300">
              <span className="text-lg group-hover:text-white group-hover:translate-x-0.5 transition-all">→</span>
            </div>
          </div> */}

          {/* Background Decorative Element */}
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
            <span className="text-8xl font-black font-mono leading-none">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PublicationCard;