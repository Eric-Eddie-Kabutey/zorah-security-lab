import Link from 'next/link';
import React from 'react';

const BrandLogo: React.FC = () => (
  <Link href="/" className="flex items-center gap-2 text-foreground">
    <span className="text-xl font-bold tracking-wider">IRREGULAR</span>
    <svg 
      width="28" 
      height="21" 
      viewBox="0 0 32 24" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M0 24H5.33333L32 0H26.6667L0 24Z" />
    </svg>
  </Link>
);

export default BrandLogo;