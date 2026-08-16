"use client";

import React from 'react';
import { navigationItems } from '@/data/nav-data';
import { StackedServices } from './StackedServices';

const Services: React.FC = () => {
    const servicesItem = navigationItems.find(item => item.label === 'Services');
    const allServices = servicesItem?.dropdownMenuContent || [];

    return (
        <section id="services-section" className="relative bg-white w-full">
            <StackedServices items={allServices} />
        </section>
    );
};

export default Services;
