import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

export const mdxComponents:  MDXComponents = {	
		// Headings: Adjusted sizes and margins for proper hierarchy.
		h2: ({ children }) => (
			<h2 className='text-3xl font-bold text-gray-900 mt-12 mb-6'>
				{children}
			</h2>
		),
		h3: ({ children }) => (
			<h3 className='text-2xl font-bold text-gray-900 mt-10 mb-5'>
				{children}
			</h3>
		),
		h4: ({ children }) => (
			<h4 className='text-xl font-semibold text-gray-900 mt-8 mb-4'>
				{children}
			</h4>
		),

		// Paragraphs: Generous line spacing and bottom margin.
		p: ({ children }) => (
			<p className='text-lg text-black md:font-medium leading-relaxed mb-2'>{children}</p>
		),

		// Lists: Proper indentation, spacing, and marker styles.
		ul: ({ children }) => (
			<ul className='list-disc pl-6 space-y-3 mb-6 text-lg text-black md:font-medium'>
				{children}
			</ul>
		),
		ol: ({ children }) => (
			<ol className='list-decimal pl-6 space-y-3 mb-6 text-lg text-black md:font-medium'>
				{children}
			</ol>
		),
		li: ({ children }) => <li className='pl-2'>{children}</li>,

		// Blockquotes: Styled to match the centered, italic design.
		blockquote: ({ children }) => (
			<blockquote className='text-center font-serif text-xl italic text-gray-600 my-10 px-4'>
				{children}
			</blockquote>
		),

		// Links: Consistent brand color.
		a: ({ href, children }) => (
			<a
				href={href}
				className='text-brand-teal font-medium no-underline hover:underline'>
				{children}
			</a>
		),

		// Code Fragments: Styling for both inline and block-level code.
		code: ({ children }) => (
			<code className='font-mono text-sm bg-gray-100 text-gray-800 rounded-md px-[0.4em] py-[0.2em] font-medium'>
				{children}
			</code>
		),
		pre: ({ children }) => (
			<pre className='bg-gray-900 text-white rounded-lg p-4 my-8 overflow-x-auto'>
				{/* The `code` tag inside `pre` will be targeted by this child selector */}
				<code className='[&_code]:bg-transparent [&_code]:p-0 [&_code]:text-white'>
					{children}
				</code>
			</pre>
		),

		// Horizontal Rule: A simple, clean divider.
		hr: () => <hr className='my-12 border-t border-gray-200' />,

		// Ensure strong and em tags have default browser styles or your custom ones.
		strong: ({ children }) => <strong className='font-bold'>{children}</strong>,
		em: ({ children }) => <em className='italic'>{children}</em>,
		// You can even override the default `img` tag to use `next/image`!
	// img: (props) => <MdxImage {...props} />
		 // Images within content: Handled by next/image for optimization.
  img: (props: ImageProps) => {
    const { alt, ...rest } = props;
    return (
      <span className="block my-10 rounded-lg overflow-hidden shadow-md">
			<Image
				width={800}
				height={450}
				alt={alt || ''}
				className="w-full h-auto"
				{...rest}
			/>
			
      </span>
    );
  },
	}

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...mdxComponents,
		...components,
	}
};