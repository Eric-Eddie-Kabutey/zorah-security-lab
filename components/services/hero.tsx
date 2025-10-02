'use client'
import Image from 'next/image'
import React from 'react'

import { motion } from 'framer-motion'

const Hero: React.FC = () => {
	return (
		<section className='bg-background py-12 px-6'>
			{/* inner wrapper for the hero image */}
			<div className='w-full max-w-5xl mx-auto md:text-center mb-10'>
				{/* hero title */}
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
					className='text-3xl md:text-4xl font-serif text-black font-medium leading-tight'>
					Frontier AI Security
				</motion.h1>
				{/* Subheading */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
					className='mt-6 max-w-[476px] mx-auto text-lg text-black font-medium leading-relaxed'>
					Irregular is the first frontier security lab with the mission of
					protecting the world in the time of increasingly capable and
					sophisticated AI systems.
				</motion.p>
			</div>
			<div className='relative w-full max-w-5xl mx-auto h-[200px] md:h-[300px] overflow-hidden rounded-xl'>
				<Image
					src='/assets/images/services-hero-cover.avif'
					alt='Service hero cover'
					fill
					className='object-cover'
					priority
				/>
			</div>
		</section>
	)
}

export default Hero
