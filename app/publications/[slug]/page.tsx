import { notFound } from 'next/navigation'
import { getPublicationBySlug, getAllPublications } from '@/lib/mdx'
import PostLayout from '@/components/post/post-layout'
import { compileMDX } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/mdx-components'
import Newsletter from '@/components/shared/news-letter'

interface PostPageProps {
	params: Promise<{ slug: string }>
}

// Function to generate static pages at build time
export async function generateStaticParams() {
	const posts = await getAllPublications()
	return posts.map((post) => ({ slug: post.slug }))
}

// The main page component
export default async function PostPage({ params }: PostPageProps) {
	const slug = (await params).slug
	const postData = getPublicationBySlug(slug)

	if (!postData) {
		notFound()
	}

	const { frontmatter, content: mdxSource } = postData

	const { content } = await compileMDX({
		source: mdxSource,
		components: mdxComponents,
		options: { parseFrontmatter: false },
	})

	return (
		<>
			<PostLayout post={frontmatter}>{content}</PostLayout>

			{/* Newsletter section */}
			<Newsletter />
		</>
	)
}
