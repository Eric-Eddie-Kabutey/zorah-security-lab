'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { PublicationFrontmatter, ContentType } from '@/types'
import FilterControls from './filter-controls'
import PublicationListItem from './publication-list-item'

type FilterOption = 'all' | ContentType

interface PublicationsListProps {
	publications: PublicationFrontmatter[]
}

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
	exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const PublicationsList: React.FC<PublicationsListProps> = ({
	publications,
}) => {
	const [activeFilter, setActiveFilter] = useState<FilterOption>('all')

	const filteredPublications = React.useMemo(() => {
		if (activeFilter === 'all') {
			return publications
		}
		return publications.filter((p) => p.type === activeFilter)
	}, [activeFilter, publications])

	return (
		<div className='bg-background'>
			<div className='max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6 py-5'>
                
				<FilterControls
					activeFilter={activeFilter}
					onFilterChange={setActiveFilter}
				/>

				<motion.div layout>
					<AnimatePresence initial={false}>
						{filteredPublications.length > 0 ? filteredPublications.map((publication) => (
							<motion.div
								key={publication.slug}
								layout
								variants={itemVariants}
								initial='hidden'
								animate='visible'
								exit='exit'>
								<PublicationListItem publication={publication} />
							</motion.div>
						)) : <p className='text-sm md:text-lg mb-6'>No publications found.</p>}
					</AnimatePresence>
				</motion.div>
			</div>
		</div>
	)
}

export default PublicationsList
