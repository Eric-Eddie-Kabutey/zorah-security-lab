'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import MobileMenu from './mobile-menu'
import BrandLogo from '../logo/brand-logo'

const MainHeader = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	// Prevent scrolling on the body when the menu is open
	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
		// Cleanup function to restore scrolling when component unmounts
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [isMenuOpen])

	return (
		<>
			<header className='sticky top-0 z-40 w-full bg-brand-bg/80 backdrop-blur-sm border-b border-gray-200'>
				<div className='max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6 py-5 flex justify-between items-center'>
					<BrandLogo />

					{/* Desktop Navigation */}
					<nav className='hidden md:flex items-center gap-10 text-brand-text'>
						<Link href='/publications' className='hover:text-gray-600'>
							Publications
						</Link>
						<Link href='/about' className='hover:text-gray-600'>
							About
						</Link>
						<Link href='/contact' className='hover:text-gray-600'>
							Contact
						</Link>
						<Link
							href='/careers'
							className='hidden md:inline-block bg-brand-button-bg text-brand-text font-medium py-3 px-6 rounded-full hover:bg-gray-200 transition-colors'>
							Join our team &rarr;
						</Link>
					</nav>

					{/* Mobile Hamburger/Close Button Logic */}
					<div className='md:hidden'>
						{isMenuOpen ? (
							<button
								onClick={() => setIsMenuOpen(false)}
								className='p-2 text-3xl text-black'
								aria-label='Close menu'>
								&times;
							</button>
						) : (
							<button
								onClick={() => setIsMenuOpen(true)}
								className='p-2'
								aria-label='Open menu'>
								<div className='space-y-1.5'>
									<span className='block w-6 h-0.5 bg-black'></span>
									<span className='block w-6 h-0.5 bg-black'></span>
								</div>
							</button>
						)}
					</div>
				</div>
			</header>

			<AnimatePresence>
				{isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
			</AnimatePresence>
		</>
	)
}

export default MainHeader
