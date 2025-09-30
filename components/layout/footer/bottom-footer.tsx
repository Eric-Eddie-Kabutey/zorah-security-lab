import React from 'react';
import Link from 'next/link';

const BottomFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-6 pt-12  flex  items-center gap-4">
      <p className="text-sm text-foreground/60">
        &copy; {currentYear} Irregular. All rights reserved.
          </p>
          <span className='w-2 h-px bg-black '></span>
      <div className="flex items-center gap-4 text-sm text-foreground/60">
        <Link href="/privacy" className="hover:text-foreground transition-colors">
          Privacy
        </Link>        
      </div>
    </div>
  );
};

export default BottomFooter;