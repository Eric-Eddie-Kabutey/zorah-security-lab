import Hero from '@/components/services/hero'
import ServicesGrid from '@/components/services/service-grid'
import ServicesListing from '@/components/services/services-listing'

export default function AboutPage() {
    return (<>
        {/* Hero section*/}
        <Hero />

        {/* Content section */}
        

        {/* Service list */}
        <ServicesListing />

        {/* Services cards */}
        <ServicesGrid />
    </>)
}