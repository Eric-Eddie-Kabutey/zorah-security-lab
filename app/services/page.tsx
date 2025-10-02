import Hero from '@/components/services/hero'
import ServicesGrid from '@/components/services/service-grid'
import ServicesListing from '@/components/services/services-listing'
import Divider from '@/components/shared/divider'
import Newsletter from '@/components/shared/news-letter'

export default function AboutPage() {
    return (<>
        {/* Hero section*/}
        <Hero />

        {/* Divider section */}
        <Divider />

        {/* Service list */}
        <ServicesListing />

        {/* Divider section */}
        <Divider />


        {/* Services cards */}
        <ServicesGrid />

        {/* Newsletter section */}
        <Newsletter />
    </>)
}