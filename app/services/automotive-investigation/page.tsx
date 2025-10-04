import PageHeader from '@/components/shared/page-header';
import ServicesList from '@/components/services/services-list';
import { getServicesByCategory } from '@/lib/mdx';
import Newsletter from '@/components/shared/news-letter';
import ServicesGrid from '@/components/services/service-grid';

export default async function CyberEnableCrimeForensicsPage() {
  // Define the specific category for this page
  const categorySlug = "automotive-investigation";
  const pageTitle = "Automotive Investigation";

  // Fetch only the services that belong to this category
  const services = getServicesByCategory(categorySlug);

  return (
    <>
      {/* Render the PageHeader with the correct title */}
      <div className='grid grid-cols-1 lg:grid-cols-5'>
                  {/* empty space */}
          <div className='hidden lg:block lg:col-span-2'></div>
          <div className='lg:col-span-3 max-w-[572px] md:mx-auto md:-ml-20 px-6 md:px-0'>          
            <PageHeader title={pageTitle} />
          </div>
        </div>

      <section className="bg-background py-16 md:py-24 px-6">
        {/* 
          Render the ServicesList CLIENT component and pass the fetched data 
             and the category slug as props.
        */}
        <ServicesList services={services} categorySlug={categorySlug} />
      </section>

      {/* services grid section */}
        <ServicesGrid />

      {/* Newsletter section */}
        <Newsletter />
    </>
  );
}