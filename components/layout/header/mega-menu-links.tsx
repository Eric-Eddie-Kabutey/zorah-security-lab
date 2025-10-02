import React from 'react'
import Link from 'next/link'
import { MegaMenuLink } from '@/types/nav-types'

interface MegaMenuLinkItemProps {
	link: MegaMenuLink
}

const MegaMenuLinkItem: React.FC<MegaMenuLinkItemProps> = ({ link }) => {
    console.log("link", link);
    
	return (
		<Link href={link.href} className='group block'>
			<p className='font-semibold text-foreground group-hover:text-foreground/70 transition-colors'>
				{link.title}
			</p>
			{link.description?.map((item, index) => (
				<p key={index} className='text-sm text-foreground/70'>
					{item}
				</p>
			))}
		</Link>
	)
}

export default MegaMenuLinkItem
