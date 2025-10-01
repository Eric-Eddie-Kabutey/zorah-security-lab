import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Publication, MdxPageData, PublicationFrontmatter } from '@/types';

// 1. Define the path to your content directory
const POSTS_PATH = path.join(process.cwd(), 'content/publications');
const contentDirectory = path.join(process.cwd(), 'content');

/**
 * Reads all .mdx files from the content directory, parses their frontmatter,
 * and returns them as an array of Publication objects, sorted by date.
 */
export const getAllPublications = (): Publication[] => {
    // 2. Get all filenames from the directory
    const fileNames = fs.readdirSync(POSTS_PATH);

    const allPosts = fileNames
        .filter(fileName => fileName.endsWith('.mdx')) // Ensure we only read .mdx files
        .map(fileName => {
            // 3. Read the file content
            const filePath = path.join(POSTS_PATH, fileName);
            const fileContent = fs.readFileSync(filePath, 'utf8');

            // 4. Parse the frontmatter using gray-matter
            const { data } = matter(fileContent);

            // 5. Generate the slug from the filename
            const slug = fileName.replace(/\.mdx$/, '');

            // 6. Return the structured data, ensuring types are correct
            return {
                ...(data as Omit<Publication, 'slug'>), // Cast the data to match your type
                slug,
            } as Publication;
        });

    // 7. Sort posts by publishedDate in descending order (newest first)
    const sortedPosts = allPosts.sort((a, b) =>
        new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );

    return sortedPosts;
};


/**
 * Finds a specific publication by its slug and returns its frontmatter
 * and raw MDX content separately.
 */
export const getPublicationBySlug = (slug: string): MdxPageData | null => {
    try {
        const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
        const fileContent = fs.readFileSync(filePath, 'utf8');

        // This part is the same: parse the file.
        const { data, content } = matter(fileContent);

        // This is the key change: structure the return value as requested.
        return {
            frontmatter: {
                ...(data as Omit<Publication, 'slug' | 'content'>),
                slug, // Add the slug to the frontmatter object
            },
            content, // The raw MDX content string
        };
    } catch (error) {
        console.error(`Error reading publication with slug "${slug}":`, error);
        return null;
    }
};