import Link from 'next/link';
import React from 'react';

const BrandLogo: React.FC = () => (
  <Link href='/' className='flex items-center gap-2 text-brand-text'>
		<span className='lg:text-xl font-bold tracking-tight uppercase'>Zorah Security Lab</span>
		<svg
			width='20'
			height='18'
			viewBox='0 0 32 24'
			fill='currentColor'
			xmlns='http://www.w3.org/2000/svg'>
			<path d='M0 24H5.33333L32 0H26.6667L0 24Z' />
		</svg>
		{/* <Image src='/assets/logo/site-logo.png' alt='Zorah Security Lab Logo' width={80} height={60} className='w-auto h-4' /> */}
	</Link>
);

export default BrandLogo;