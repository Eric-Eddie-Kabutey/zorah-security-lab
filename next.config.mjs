import nextMdx from '@next/mdx'

const withMDX = nextMdx({
	// This config is optional, but allows you to use custom components in MDX
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
	},
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Configure pageExtensions to include md and mdx
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	// Optionally, add any other Next.js config below
	reactStrictMode: true,
}

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
