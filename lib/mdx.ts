import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
    PublicationFrontmatter, MdxPublicationPageData,
    ServiceFrontmatter, MdxServicePageData
} from '@/types';

// Define paths for both content types
const PUBLICATIONS_PATH = path.join(process.cwd(), 'content/publications');
const SERVICES_PATH = path.join(process.cwd(), 'content/services');

// A generic function to get all posts from a directory
const getAllPosts = <T extends { publishedDate: string; slug: string }>(directoryPath: string): T[] => {
    const fileNames = fs.readdirSync(directoryPath);

    const allPosts = fileNames
        .filter(fileName => fileName.endsWith('.mdx'))
        .map(fileName => {
            const filePath = path.join(directoryPath, fileName);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const { data } = matter(fileContent);
            const slug = fileName.replace(/\.mdx$/, '');
            
            return { ...data, slug } as T;
        });

    return allPosts.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
};

// Specific functions for each content type
export const getAllPublications = (): PublicationFrontmatter[] => getAllPosts<PublicationFrontmatter>(PUBLICATIONS_PATH);
export const getAllServices = (): ServiceFrontmatter[] => getAllPosts<ServiceFrontmatter>(SERVICES_PATH);


// A generic function to get a single post by slug
const getPostBySlug = <T extends { slug: string }>(directoryPath: string, slug: string): { frontmatter: T; content: string } | null => {
    try {
        const filePath = path.join(directoryPath, `${slug}.mdx`);
        console.log("filepath", filePath);
        
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);
        return {
            frontmatter: { ...data, slug } as T, 
            content,
        };
    } catch (error) {
        console.error(`Error reading content from "${directoryPath}" with slug "${slug}":`, error);
        return null;
    }
};


/** 
 * Reads all .mdx files from a specific category sub-directory within services,
 * parses their frontmatter, and returns them as an array.
 */
export const getServicesByCategory = (category: string): ServiceFrontmatter[] => {
    console.log("category", category);
    
    const categoryPath = path.join(SERVICES_PATH, category);
    console.log("path", categoryPath);
    

    // Check if the category directory exists to prevent errors
    if (!fs.existsSync(categoryPath)) {
        console.warn(`Warning: Category directory not found at: ${categoryPath}`);
        return [];
    }

    // We can reuse our generic getAllPosts function by passing the specific category path!
    return getAllPosts<ServiceFrontmatter>(categoryPath);
};

// Specific functions for each content type
export const getPublicationBySlug = (slug: string): MdxPublicationPageData | null => getPostBySlug<PublicationFrontmatter>(PUBLICATIONS_PATH, slug);


export const getServiceBySlug = (category: string, slug: string): MdxServicePageData | null => {
    // Construct the full, correct path including the category
    const filePath = path.join(SERVICES_PATH, category, `${slug}.mdx`);

    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        return {
            frontmatter: {
                ...(data as Omit<ServiceFrontmatter, 'slug'>),
                slug,
            },
            content,
        };
    } catch (error) {
        console.error(`Error reading service file at: ${filePath}`, error);
        return null;
    }
};