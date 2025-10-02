import React from 'react';
import Link from 'next/link';
import { MegaMenuLink } from '@/types/nav-types';

interface MegaMenuLinkItemProps {
  link: MegaMenuLink;
}

const MegaMenuLinkItem: React.FC<MegaMenuLinkItemProps> = ({ link }) => {
  return (
    <Link href={link.href} className="group block">
      <p className="font-semibold text-foreground group-hover:text-foreground/70 transition-colors">
        {link.title}
      </p>
      <p className="text-sm text-foreground/70">
        {link.description}
      </p>
    </Link>
  );
};

export default MegaMenuLinkItem;