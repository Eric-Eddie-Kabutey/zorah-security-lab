"use client";

import React, { useEffect, useState } from 'react';

interface Heading {
  id: string;
  level: number;
  text: string;
}

const slugify = (text: string) => text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

const TableOfContents: React.FC = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    // Find all h2 and h3 tags *inside the prose container*
    const headingElements = Array.from(
      document.querySelectorAll('.prose h2, .prose h3')
    ) as HTMLElement[];

    const extractedHeadings = headingElements.map(heading => {
      const text = heading.innerText;
      const level = Number(heading.tagName.substring(1));
      const id = slugify(text);
      heading.id = id; // Set the ID on the element itself for the anchor link to work
      return { id, level, text };
    });

    setHeadings(extractedHeadings);
  }, []); // Empty dependency array means this runs once on mount

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-28"> {/* Sticky positioning */}
      <h3 className="text-sm md:text-lg font-medium tracking-widest text-foreground/70 mb-4">
        In this article
      </h3>
      <ul className="space-y-1">
        {headings.map(heading => (
          <li key={heading.id} className={heading.level === 3 ? 'ml-4' : ''}>
            <a
              href={`#${heading.id}`}
              className="text-sm text-black font-medium hover:text-foreground transition-colors underline"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;