"use client";

import React from 'react';
import { ContentType } from '@/types';

type FilterOption = 'all' | ContentType;

interface FilterControlsProps {
  activeFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
}

const filterOptions: { label: string; value: FilterOption }[] = [
  { label: 'All', value: 'all' },
  { label: 'Research', value: 'research' },
  { label: 'News', value: 'news' },
];

const FilterControls: React.FC<FilterControlsProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex items-center gap-2 mb-12">
      {filterOptions.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
            activeFilter === value
              ? 'bg-gray-200 text-background'
              : 'bg-muted text-foreground/70 hover:bg-accent'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default FilterControls;