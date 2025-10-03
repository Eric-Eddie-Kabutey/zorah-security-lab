import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ServiceFrontmatter } from '@/types';
import TableOfContents from '@/components/post/table-of-content';

interface ServiceLayoutProps {
    post: ServiceFrontmatter;
    categorySlug: string;
  children: React.ReactNode;
}

const ServiceLayout: React.FC<ServiceLayoutProps> = ({ post, categorySlug, children }) => {
      // Helper to format the slug for display (e.g., "digital-forensics" -> "DIGITAL FORENSICS")
  const formattedCategoryName = categorySlug.replace(/-/g, ' ').toUpperCase();
  return (
    <article className="bg-background text-foreground">
      {/* Section 1: Service Hero */}
      <header className="py-24 px-6 text-center bg-muted">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-4">{post.title}</h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">{post.summary}</p>
          {post.coverImage && (
            <div className="relative mt-12 aspect-[16/9] w-full rounded-xl overflow-hidden shadow-md">
              <Image
                src={post.coverImage}
                alt={`Cover image for ${post.title}`}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </header>

      {/* Section 2: Main Content Grid */}
      <div className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-x-12 lg:gap-x-24">
        {/* Left Column: Table of Contents */}
        <aside className="hidden md:block md:col-span-2">
          <div className="sticky top-28">
            <TableOfContents />
          </div>
        </aside>

        {/* Right Column: MDX Content */}
        <div className="md:col-span-3">
          <div className="prose prose-lg max-w-none prose-p:text-foreground/80 prose-headings:text-foreground prose-a:text-blue-600 prose-strong:text-foreground">
            {children}
          </div>
          <div className="mt-24 pt-8 border-t border-muted">
            <Link href={`/services/${categorySlug}`} className="text-sm font-medium tracking-widest text-foreground/70 hover:text-foreground">
              &larr; ALL {formattedCategoryName}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ServiceLayout;