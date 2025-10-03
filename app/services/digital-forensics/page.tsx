import PageHeader from '@/components/shared/page-header';
import ServicesList from '@/components/services/services-list';
import { getServicesByCategory } from '@/lib/mdx';
import React from 'react';

// This is a Server Component, so we can use async/await directly
export default async function DigitalForensicsPage() {
  // 1. Define the specific category for this page
  const categorySlug = "digital-forensics";
  const pageTitle = "Digital Forensics";

  // 2. Fetch only the services that belong to this category
  const services = getServicesByCategory(categorySlug);

  return (
    <>
      {/* Render the PageHeader with the correct title */}
      <PageHeader title={pageTitle} />

      <section className="bg-background py-16 md:py-24 px-6">
        {/* 
          3. Render the ServicesList CLIENT component and pass the fetched data 
             and the category slug as props.
        */}
        <ServicesList services={services} categorySlug={categorySlug} />
      </section>
    </>
  );
}