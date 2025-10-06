"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ServiceCategory } from '@/types/service-category-types';
import ServiceCard from '@/components/services/service-card'; 

interface FilterableGalleryProps {
  categories: ServiceCategory[];
}

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
};

const FilterableGallery: React.FC<FilterableGalleryProps> = ({ categories }) => {
  // State for the main category filter (e.g., 'digital-forensics')
  const [activeCategory, setActiveCategory] = useState<string>('all');
  // State for the sub-category/service filter (e.g., 'computer-forensics')
  const [activeService, setActiveService] = useState<string>('all');

  // Memoize the list of all services to avoid re-flattening the array on every render
  const allServices = useMemo(() => categories.flatMap(cat => cat.services), [categories]);

  // Memoize the currently available sub-category/service options based on the main category
  const availableServices = useMemo(() => {
    if (activeCategory === 'all') return []; // Don't show sub-filters if 'All' is selected
    const category = categories.find(cat => cat.id === activeCategory);
    return category ? category.services : [];
  }, [activeCategory, categories]);

  // Memoize the final list of cards to display based on both filters
  const filteredItems = useMemo(() => {
    let items = allServices;

    if (activeCategory !== 'all') {
      items = items.filter(service => service.href.startsWith(`/services/${activeCategory}`));
    }
    
    if (activeService !== 'all') {
      items = items.filter(service => service.id === activeService);
    }
    
    return items;
  }, [activeCategory, activeService, allServices]);

  // When the main category changes, reset the sub-category filter
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setActiveService('all'); 
  };

  return (
    <div>
      {/* Main Category Filter */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button
          onClick={() => handleCategoryChange('all')}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
            activeCategory === 'all' ? 'bg-foreground text-background' : 'bg-muted text-foreground/70 hover:bg-accent'
          }`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              activeCategory === cat.id ? 'bg-foreground text-background' : 'bg-muted text-foreground/70 hover:bg-accent'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Sub-Category/Service Filter (conditionally rendered) */}
      <AnimatePresence>
        {activeCategory !== 'all' && availableServices.length > 0 && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-12"
          >
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-muted">
              <span className="text-sm text-foreground/60 mr-2">Filter by service:</span>
              <button
                onClick={() => setActiveService('all')}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                  activeService === 'all' ? 'bg-foreground/80 text-background' : 'bg-muted text-foreground/70 hover:bg-accent'
                }`}
              >
                All
              </button>
              {availableServices.map(service => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    activeService === service.id ? 'bg-foreground/80 text-background' : 'bg-muted text-foreground/70 hover:bg-accent'
                  }`}
                >
                  {service.title}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Animated Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredItems.map(item => (
            // Use your provided ServiceCard component, wrapped in motion.div
            <motion.div
              key={item.id}
              layout
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ServiceCard
                imageUrl={item.imageUrl}
                altText={item.altText}
                title={item.title}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FilterableGallery;