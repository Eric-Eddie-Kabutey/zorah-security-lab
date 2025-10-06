'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils'; 

// Base props common to both link and button
interface BaseProps {
  children: React.ReactNode;
  className?: string;
  withArrow?: boolean; // To optionally show the arrow
}

// Props when the component is used as a Next.js Link
type LinkProps = BaseProps & {
  href: string;
} & Omit<React.ComponentProps<typeof Link>, 'href'>;

// Props when the component is used as a standard HTML button
type ButtonProps = BaseProps & {
  href?: never; // Ensure href is not passed for a button
} & React.ComponentProps<'button'>;

// The final prop type is a union of the two
type ActionButtonProps = LinkProps | ButtonProps;


// --- COMPONENT IMPLEMENTATION ---

const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const { children, className, withArrow = true } = props;

  const baseClasses = "inline-flex items-center justify-center gap-2 font-medium py-3 px-6 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = "bg-muted text-foreground hover:bg-accent";
  const combinedClasses = cn(baseClasses, variantClasses, className);

  if ('href' in props && props.href) {
    // Destructure only anchor-compatible props for Link
    const { href, replace, scroll, shallow, prefetch, locale, ...anchorProps } = props as LinkProps;
    return (
      <Link
        href={href}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        prefetch={prefetch}
        locale={locale}
        className={combinedClasses}
        {...anchorProps}
      >
        {children}
        {withArrow && <span>&rarr;</span>}
      </Link>
    );
  }

  // Otherwise, render a standard button
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { href: _href, ...buttonProps } = props as ButtonProps;
  return (
    <button {...buttonProps} className={combinedClasses}>
      {children}
      {withArrow && <span>&rarr;</span>}
    </button>
  );
};

export default ActionButton;