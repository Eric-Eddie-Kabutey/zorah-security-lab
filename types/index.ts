import { StaticImageData } from 'next/image';

export type ContentType = 'news' | 'research';

export interface Publication {
    slug: string;
    title: string;    
    type: 'news' | 'research'; // to differentiate between publications types    
    publishedDate: string; // CRITICAL: This must be a string for serialization
    readingTime: number;
    featured: boolean;
    summary: string;
    collaborator?: string;
    featureImage?: string | StaticImageData;// image to display on the card
    coverImage?: string | StaticImageData; // image to display at the top of the blog post
    content?: React.ReactNode;
}

// This represents the shape of the frontmatter data *plus* the slug
export type PublicationFrontmatter = Omit<Publication, 'content'>;

// This is the new return type for our refactored function
export interface MdxPageData {
    frontmatter: PublicationFrontmatter;
    content: string; // This will be the raw MDX string
}