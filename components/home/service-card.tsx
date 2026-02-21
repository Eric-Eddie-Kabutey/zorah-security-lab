"use client";

import Image from 'next/image';
import Link from 'next/link';
import { DropdownMenuItem } from '@/types/nav-types';

interface ServiceCardProps {
    service: DropdownMenuItem;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    return (
        <Link
            href={service.href}
            // Occupying more vertical space: increased vh and min/max heights
            className="relative group transition-all duration-300 w-full h-[65vh] min-h-[500px] max-h-[800px] flex justify-center items-center"
        >
            {/* Removed bg-black from here to prevent covering the -z-10 image */}
            <div className="h-full w-full overflow-hidden rounded-[10px] relative">

                {/* Card Content Area - Glassmorphic overlay at the bottom */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 flex flex-col justify-end z-20 text-white backdrop-blur-md bg-gradient-to-b from-transparent via-black/35 to-black/50">
                    <h3 className="text-3xl md:text-5xl lg:text-5xl font-semibold mb-3 leading-tight tracking-tight">
                        {service.title}
                    </h3>

                    <div className="text-sm md:text-lg max-w-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="font-sans leading-relaxed">{service.description}</p>
                    </div>
                </div>

                {/* Card Cover Image Layer */}
                <div className="absolute inset-0 overflow-hidden -z-10 bg-black">
                    {service.imageUrl && (
                        <Image
                            src={service.imageUrl}
                            alt={`Cover image for ${service.title}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-100"
                            sizes="(max-width: 768px) 100vw, 80vw"
                            priority
                        />
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ServiceCard;
