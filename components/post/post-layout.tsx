import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PublicationFrontmatter } from '@/types';
import { format } from 'date-fns';
import TableOfContents from './table-of-content';

// A small component to display collaborator info cleanly
const CollaboratorInfo: React.FC<{ name: string }> = ({ name }) => (
  <div className="mt-12">
    <h3 className="text-sm font-semibold tracking-widest text-black mb-2">
      In collaboration with
    </h3>    
    <p className="text-lg font-bold text-foreground">{name}</p>
  </div>
);

interface PostLayoutProps {
  post: PublicationFrontmatter;
  children: React.ReactNode;
}

const PostLayout: React.FC<PostLayoutProps> = ({ post, children }) => {
  const isResearch = post.type === 'research';

  return (
    <article className="bg-background text-foreground py-24 px-2 md:px-6">
      <div className="max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6 py-5 grid grid-cols-1 lg:grid-cols-5 gap-x-4">
        
        {/* SIDEBAR (Table of Contents & Meta) */}
        {/* This entire column is only rendered for 'research' articles */}
        <aside className="hidden lg:block lg:col-span-2">
        {isResearch && (
            <div className="sticky top-28">
              <TableOfContents />
              {post.collaborator && <CollaboratorInfo name={post.collaborator} />}
            </div>
        )}
        </aside>

        {/* SECTION 2: MAIN CONTENT */}
        {/* This column takes up the full width if not research, or 3/5ths if it is */}
        <div className={'lg:col-span-3 max-w-[572px] mx-auto md:-ml-20'}>
          {/* Post Header (Title & Date) is now INSIDE the main content column */}
          <header className="mb-12">
            <h1 className="text-2xl md:text-5xl text-black font-medium font-serif leading-tight mb-4 max-w-[572px]">
              {post.title}
            </h1>
            <time dateTime={post.publishedDate} className="text-foreground/60">
              {format(new Date(post.publishedDate), 'MMMM d, yyyy')}
            </time>
          </header>

          {/* Optional Cover Image for 'news' type */}
          {post.coverImage && !isResearch && (
            <div className="relative mb-12 aspect-[16/9] w-full rounded-xl overflow-hidden shadow-md">
              <Image
                src={post.coverImage}
                alt={`Cover image for ${post.title}`}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          
          {/* Rendered MDX Content */}
          <div className="prose prose-lg max-w-none prose-p:text-foreground/80 prose-headings:text-foreground prose-a:text-blue-600 prose-strong:text-foreground">
            {children}
          </div>

          {/* Back to Publications Link */}
          <div className="mt-24 pt-8 border-t border-muted">
            <Link href="/publications" className="text-sm font-medium tracking-widest text-foreground/70 hover:text-foreground">
              &larr; BACK TO PUBLICATIONS
            </Link>
          </div>
        </div>

      </div>
    </article>
  );
};

export default PostLayout;