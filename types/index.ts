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

export type PublicationFrontmatter = Omit<Publication, 'content'> & { collaborator?: string };
export interface MdxPublicationPageData { frontmatter: PublicationFrontmatter; content: string; }


export type ServicesContentType = 'digital forensics' | 'cyber enable crime' | 'network intelligence' | 'automotive investigation';
export interface Service {
    slug: string;
    title: string;
    type: ServicesContentType;
    publishedDate: string; // Using a common name for sorting
    summary: string;
    coverImage?: string | StaticImageData;
    content?: React.ReactNode;
}
export type ServiceFrontmatter = Omit<Service, 'content'>;
export interface MdxServicePageData { frontmatter: ServiceFrontmatter; content: string; }