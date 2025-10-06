import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ServiceFrontmatter } from '@/types';

interface ServiceLayoutProps {
    post: ServiceFrontmatter;
    children: React.ReactNode;
  categorySlug: string;
  relatedServices?: React.ReactNode;
}

const ServiceLayout: React.FC<ServiceLayoutProps> = ({ post, categorySlug, children, relatedServices }) => {
      // Helper to format the slug for display (e.g., "digital-forensics" -> "DIGITAL FORENSICS")
  const formattedCategoryName = categorySlug.replace(/-/g, ' ').toUpperCase();
  return (
    <article className="bg-background text-foreground">
      {/* Section 1: Service Hero */}
      <header className="pt-12 pb-8 md:pt-24 md:pb-16 px-6 md:text-center bg-muted">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-serif leading-tight mb-4">{post.title}</h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">{post.summary}</p>
          {post.coverImage && (
            <div className="relative mt-12 w-full max-w-5xl mx-auto h-[200px] md:h-[300px] overflow-hidden rounded-xl">
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
      <div className="max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6 py-5 grid grid-cols-1 lg:grid-cols-5 gap-x-4 lg:gap-x-12">
        {/* Left Column: Options */}
        <aside className="hidden md:block md:col-span-2">
          <div className="sticky top-28">
            <h3 className="text-sm md:text-lg font-medium tracking-widest text-foreground/70 mb-4">
        See pass projects
      </h3>            
            <Link href='/gallery' className="text-sm font-medium tracking-widest text-foreground/70 hover:text-foreground">
              See more &rarr;
            </Link>
          </div>
        </aside>

        {/* Right Column: MDX Content */}
        <div className="lg:col-span-3 max-w-[572px] mx-auto md:-ml-20">
          <div className="prose prose-lg max-w-none prose-p:text-foreground/80 prose-headings:text-foreground prose-a:text-blue-600 prose-strong:text-foreground">
            {children}
          </div>

          <div className="mt-16 border-t border-muted">
            {relatedServices}
          </div>

          <div className="mt-16 pt-8 border-t border-muted">
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