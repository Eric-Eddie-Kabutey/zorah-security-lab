import { StaticImageData } from 'next/image';

// Represents a single, specific service (e.g., "Computer Forensics")
export interface ServiceItem {
    id: string; // A unique ID, could be the slug
    title: string;
    imageUrl: string | StaticImageData;
    altText: string;
    href: string; // The full path to the service page
}

// Represents a main service category (e.g., "Digital Forensics")
export interface ServiceCategory {
    id: 'digital-forensics' | 'cyber-enabled-crime' | 'network-intelligence' | 'automotive-investigation';
    title: string;
    services: ServiceItem[];
}