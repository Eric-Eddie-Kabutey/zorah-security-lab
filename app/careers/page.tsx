import HiringProcess from '@/components/careers/hiring-process'
import JoinUsContent from '@/components/careers/joins-us-content'
import FeaturedRolesSection from '@/components/home/roles/featured-roles'
import Newsletter from '@/components/shared/news-letter'
import PageHeader from '@/components/shared/page-header'

export default function CareersPage() {
	return (
		<>
			{/* Hero section */}
			<div className='grid grid-cols-1 lg:grid-cols-5'>
				{/* empty space */}
				<div className='hidden lg:block lg:col-span-2'></div>

				<div className='lg:col-span-3 max-w-[572px] mx-auto md:-ml-20'>
					<PageHeader title='Work with us' />
					{/* About content section */}
					<JoinUsContent />
				</div>
            </div>

            {/* Roles section */}
            <FeaturedRolesSection visible={false} />
            
            {/* HiringProcess section */}
            <HiringProcess />

			{/* Newsletter section */}
			<Newsletter />
		</>
	)
}
