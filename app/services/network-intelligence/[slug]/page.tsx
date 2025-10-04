import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import { getServiceBySlug, getServicesByCategory } from '@/lib/mdx'
import ServiceLayout from '@/components/services/service-layout'
import RelatedServices from '@/components/services/relative-services'
import { compileMDX } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/mdx-components'

interface ServiceDetailPageProps {
    params: Promise<{
        slug: string
    }>
}

// Hardcode the category for this specific route
const CATEGORY = 'network-intelligence'

// This function tells Next.js all the possible 'slug' values within this category
// to build statically at build time.
export async function generateStaticParams() {
    const categoryPath = path.join(process.cwd(), 'content/services', CATEGORY)
    const serviceFiles = fs
        .readdirSync(categoryPath)
        .filter((file) => file.endsWith('.mdx'))

    return serviceFiles.map((file) => ({
        slug: file.replace(/\.mdx$/, ''),
    }))
}

export default async function CyberEnableCrimeForensicsDetailPage({
    params,
}: ServiceDetailPageProps) {
    // Use the hardcoded category and the dynamic slug to fetch the correct MDX file
    const slug = (await params).slug
    // Fetch the data for the CURRENT service
    const serviceData = getServiceBySlug(CATEGORY, slug)

    // Fetch the data for ALL services in this category
    const allServicesInCategory = getServicesByCategory(CATEGORY)

    if (!serviceData) {
        notFound()
    }

    const { frontmatter, content: mdxSource } = serviceData

    const { content } = await compileMDX({
    source: mdxSource,
    components: mdxComponents,
        options: { parseFrontmatter: false },
    })

    // Create the RelatedServices component to pass as a prop
    const relatedServicesComponent = (
        <RelatedServices
            services={allServicesInCategory}
            currentSlug={slug}
            categorySlug={CATEGORY}
        />
    )

    return (
        <ServiceLayout
            post={frontmatter}
            categorySlug={CATEGORY}
            relatedServices={relatedServicesComponent}>
            {content}
        </ServiceLayout>
    )
}
