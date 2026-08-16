import Link from 'next/link';
import React from 'react';

interface BrandLogoProps {
	variant?: 'light' | 'dark';
	className?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'dark', className }) => {
	const textColor = variant === 'light' ? 'text-white' : 'text-zinc-900';

	return (
		<Link
			href='/'
			className={`flex items-center gap-2 transition-colors ${textColor} ${className || ''}`}
		>
			<span className='lg:text-xl font-mono font-bold tracking-tight uppercase'>
				Zorah Security Lab
			</span>
			<svg
				width='20'
				height='18'
				viewBox='0 0 32 24'
				fill='currentColor'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path d='M0 24H5.33333L32 0H26.6667L0 24Z' />
			</svg>
		</Link>
	);
};

export default BrandLogo;