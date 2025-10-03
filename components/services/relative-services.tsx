"use client";

import Link from 'next/link';
import { ServiceFrontmatter } from '@/types';

interface RelatedServicesProps {
  services: ServiceFrontmatter[];
  currentSlug: string;
  categorySlug: string;
}

const RelatedServices: React.FC<RelatedServicesProps> = ({ services, currentSlug, categorySlug }) => {
  // Filter out the currently active service from the list
  const relatedServices = services.filter(service => service.slug !== currentSlug);

  // If there are no other services in the category, don't render anything
  if (relatedServices.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Explore Other Services
      </h3>
      <div className="flex flex-wrap gap-3">
        {relatedServices.map(service => (
          <Link
            key={service.slug}
            href={`/services/${categorySlug}/${service.slug}`}
            className="px-4 py-2 text-sm font-medium border border-muted rounded-full text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
          >
            {service.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedServices;