import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
import AnimatedBlock from '@/components/mdx/animated-block';

export const mdxComponents: MDXComponents = {
	// Headings: Adjusted sizes and margins for proper hierarchy.
	h2: ({ children }) => (
		<AnimatedBlock as="h2" className='text-3xl font-bold text-gray-900 mt-12 mb-6'>
			{children}
		</AnimatedBlock>
	),
	h3: ({ children }) => (
		<AnimatedBlock as="h3" className='text-2xl font-bold text-gray-900 mt-10 mb-5'>
			{children}
		</AnimatedBlock>
	),
	h4: ({ children }) => (
		<AnimatedBlock as="h4" className='text-xl font-semibold text-gray-900 mt-8 mb-4'>
			{children}
		</AnimatedBlock>
	),

	// Paragraphs: Generous line spacing and bottom margin.
	p: ({ children }) => (
		<AnimatedBlock as="p" className='text-lg text-black md:font-medium leading-relaxed mb-2'>
			{children}
		</AnimatedBlock>
	),

	// Lists: Proper indentation, spacing, and marker styles.
	ul: ({ children }) => (
		<AnimatedBlock as="ul" className='list-disc pl-6 space-y-3 mb-6 text-lg text-black md:font-medium'>
			{children}
		</AnimatedBlock>
	),
	ol: ({ children }) => (
		<AnimatedBlock as="ol" className='list-decimal pl-6 space-y-3 mb-6 text-lg text-black md:font-medium'>
			{children}
		</AnimatedBlock>
	),
	li: ({ children }) => (
		<AnimatedBlock as="li" className='pl-2'>
			{children}
		</AnimatedBlock>
	),

	// Blockquotes: Styled to match the centered, italic design.
	blockquote: ({ children }) => (
		<AnimatedBlock as="blockquote" className='text-center font-serif text-xl italic text-gray-600 my-10 px-4'>
			{children}
		</AnimatedBlock>
	),

	// Links: Consistent brand color.
	a: ({ href, children }) => (
		<AnimatedBlock as="a" href={href} className='text-brand-teal font-medium no-underline hover:underline'>
			{children}
		</AnimatedBlock>
	),

	// Code Fragments: Styling for both inline and block-level code.
	code: ({ children }) => (
		<AnimatedBlock as="code" className='font-mono text-sm bg-gray-100 text-gray-800 rounded-md px-[0.4em] py-[0.2em] font-medium'>
			{children}
		</AnimatedBlock>
	),
	pre: ({ children }) => (
		<AnimatedBlock as="pre" className='bg-gray-900 text-white rounded-lg p-4 my-8 overflow-x-auto'>
			<code className='[&_code]:bg-transparent [&_code]:p-0 [&_code]:text-white'>
				{children}
			</code>
		</AnimatedBlock>
	),

	// Horizontal Rule: A simple, clean divider.
	hr: () => (
		<AnimatedBlock>
			<hr className='my-12 border-t border-gray-200' />
		</AnimatedBlock>
	),

	// Ensure strong and em tags have default browser styles or your custom ones.
	strong: ({ children }) => (
		<AnimatedBlock as="strong" className='font-bold'>
			{children}
		</AnimatedBlock>
	),
	em: ({ children }) => (
		<AnimatedBlock as="em" className='italic'>
			{children}
		</AnimatedBlock>
	),

	img: (props: ImageProps) => {
		const { alt, ...rest } = props;
		return (
			<AnimatedBlock>
				<span className="block my-10 rounded-lg overflow-hidden shadow-md">
					<Image
						width={800}
						height={450}
						alt={alt || ''}
						className="w-full h-auto"
						{...rest}
					/>

				</span>
			</AnimatedBlock>
		);
	},
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...mdxComponents,
		...components,
	}
};