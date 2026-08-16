"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { allPublications } from '@/data/publication-data';
import PublicationCard from './publication-card';
import { cn } from '@/lib/utils';

const Publications: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="flex flex-col">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight uppercase font-mono">
              Latest <br />
              <span className="text-gray-400">Publications</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 mr-4">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "h-1 transition-all duration-300 rounded-full",
                    index === selectedIndex ? "w-8 bg-black" : "w-2 bg-gray-200"
                  )}
                  onClick={() => emblaApi?.scrollTo(index)}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={scrollPrev}
                className="w-12 h-12 rounded-[10px] border border-gray-200 flex items-center justify-center hover:bg-black hover:border-black hover:text-white transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-black"
                disabled={!emblaApi?.canScrollPrev()}
              >
                <span className="text-xl">←</span>
              </button>
              <button
                onClick={scrollNext}
                className="w-12 h-12 rounded-[10px] border border-gray-200 flex items-center justify-center hover:bg-black hover:border-black hover:text-white transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-black"
                disabled={!emblaApi?.canScrollNext()}
              >
                <span className="text-xl">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {allPublications.map((publication, index) => (
              <div key={publication.id} className="flex-[0_0_auto]">
                <PublicationCard
                  publication={publication}
                  index={index}
                />
              </div>
            ))}
          </div>
          {/* Edge Gradients for smooth blending */}
          {/* <div className="w-[8%] h-full absolute top-0 left-0 bg-gradient-to-r from-white to-transparent z-20" />
            <div className="w-[8%] h-full absolute bottom-0 right-0 bg-gradient-to-l from-white to-transparent z-20" /> */}
        </div>
      </div>
    </section>
  );
};

export default Publications;