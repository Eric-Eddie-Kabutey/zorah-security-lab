import AboutContent from '@/components/about/about-content'
import Newsletter from '@/components/shared/news-letter'
import PageHeader from '@/components/shared/page-header'
import WaveDivider2 from '@/components/svg/wave-divider2'

export default function AboutPage() {
	return (
		<>
			{/* Hero section */}
			<div className='grid grid-cols-1 lg:grid-cols-5'>
				{/* empty space */}
				<div className='hidden lg:block lg:col-span-2'></div>

				<div className='lg:col-span-3 max-w-[572px] md:mx-auto md:-ml-20 px-6 md:px-0'>
					<PageHeader title='About Zorah Security Lab' />
					{/* About content section */}
					<AboutContent />
				</div>
			</div>
			<WaveDivider2 />

			{/* Newsletter section */}
			<Newsletter />
		</>
	)
}
