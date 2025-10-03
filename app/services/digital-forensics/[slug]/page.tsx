import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { getServiceBySlug } from '@/lib/mdx';
import ServiceLayout from '@/components/services/service-layout'; 
import { compileMDX } from 'next-mdx-remote/rsc';

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Hardcode the category for this specific route
const CATEGORY = 'digital-forensics';

// This function tells Next.js all the possible 'slug' values within this category
// to build statically at build time.
export async function generateStaticParams() {
  const categoryPath = path.join(process.cwd(), 'content/services', CATEGORY);
  const serviceFiles = fs.readdirSync(categoryPath).filter(file => file.endsWith('.mdx'));
  
  return serviceFiles.map(file => ({
    slug: file.replace(/\.mdx$/, ''),
  }));
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
    // Use the hardcoded category and the dynamic slug to fetch the correct MDX file
    const slug = (await params).slug
  const serviceData = getServiceBySlug(CATEGORY, slug);

  if (!serviceData) {
    notFound();
  }

  const { frontmatter, content: mdxSource } = serviceData;

  const { content } = await compileMDX({
    source: mdxSource,
    options: { parseFrontmatter: false },
  });

  return (
    <ServiceLayout post={frontmatter} categorySlug={CATEGORY}>
      {content}
    </ServiceLayout>
  );
}