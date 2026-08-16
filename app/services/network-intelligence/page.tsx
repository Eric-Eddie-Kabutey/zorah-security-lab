import PageHeader from '@/components/shared/page-header';
import ServicesList from '@/components/services/services-list';
import { getServicesByCategory } from '@/lib/mdx';
import Newsletter from '@/components/shared/news-letter';
import ActionButton from '@/components/shared/action-button';


export default async function CyberEnableCrimeForensicsPage() {
  // Define the specific category for this page
  const categorySlug = "network-intelligence";
  const pageTitle = "Network Intelligence";

  // Fetch only the services that belong to this category
  const services = getServicesByCategory(categorySlug);

  const label = "See Gallery";

  return (
    <>
      {/* Render the PageHeader with the correct title */}
      <PageHeader title={pageTitle} />

      <section className="bg-background pb-16 md:pb-24 px-6">
        {/* 
          Render the ServicesList CLIENT component and pass the fetched data 
             and the category slug as props.
        */}
        <ServicesList services={services} categorySlug={categorySlug} />
      </section>     

      {/* see gallery btn */}
      <div className='max-w-[1230px] 2xl:max-w-[1390px] mx-auto flex items-center justify-center px-6 pb-10 md:pb-18'>
       <ActionButton href="/gallery" className='border border-[#464646] text-foreground font-medium rounded-[10px] py-3 px-6 transition-colors'>
              {label}
            </ActionButton>
      </div>

      {/* Newsletter section */}
      <Newsletter />
    </>
  );
}