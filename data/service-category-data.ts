import { ServiceCategory } from '@/types/service-category-types';

export const allServiceCategories: ServiceCategory[] = [
    {
        id: 'digital-forensics',
        title: 'Digital Forensics',
        services: [
            {
                id: 'computer-forensics',
                title: 'Computer Forensics',
                imageUrl: '/assets/images/services/digital-forensics/computer-forensics-cover-img.avif',
                altText: 'An image representing computer forensics.',
                href: '/services/digital-forensics/computer-forensics',
            },
            {
                id: 'drone-forensics',
                title: 'Drone Forensics',
                imageUrl: '/assets/images/services/digital-forensics/drone-forensics-cover-img.jpg',
                altText: 'An image representing drone forensics.',
                href: '/services/digital-forensics/drone-forensics',
            },
            {
                id: 'vehicle-ecu-forensics',
                title: 'Vehicle ECU Forensics',
                imageUrl: '/assets/images/services/digital-forensics/ecu-forensics-cover-img.jpg',
                altText: 'An image representing vehicle ECU forensics.',
                href: '/services/digital-forensics/vehicle-ecu-forensics',
            },
            {
                id: 'mobile-phone-forensics',
                title: 'Mobile Phone Forensics',
                imageUrl: '/assets/images/services/digital-forensics/mobile-forensics-cover-img.jpg',
                altText: 'An image representing mobile phone forensics.',
                href: '/services/digital-forensics/mobile-phone-forensics',
            },
        ],
    },
    {
        id: 'cyber-enabled-crime',
        title: 'Cyber-Enabled Crime Forensics',
        services: [
            {
                id: 'business-email-compromise',
                title: 'Business Email Compromise Investigation',
                imageUrl: '/assets/images/services/cyber-enable-crime/bce-investigation-cover-img.avif',
                altText: 'An image representing a business email compromise investigation.',
                href: '/services/cyber-enabled-crime/business-email-compromise',
            },
            {
                id: 'data-breach-response',
                title: 'Data Breach Investigation & Response',
                imageUrl: '/assets/images/services/cyber-enable-crime/data-breach-investigation-cover-img.jpg',
                altText: 'An image representing a data breach response.',
                href: '/services/cyber-enabled-crime/data-breach-response',
            },
            {
                id: 'malware-removal',
                title: 'Remote Malware Removal',
                imageUrl: '/assets/images/services/cyber-enable-crime/penetration-testing-cover-img.jpg',
                altText: 'An image representing malware removal.',
                href: '/services/cyber-enabled-crime/malware-removal',
            },
            {
                id: 'penetration-testing',
                title: 'Penetration Testing',
                imageUrl: '/assets/images/services/cyber-enable-crime/remote-malware-cover-img.jpg',
                altText: 'An image representing penetration testing.',
                href: '/services/cyber-enabled-crime/penetration-testing',
            },
        ],
    },
    {
        id: 'network-intelligence',
        title: 'Network Intelligence',
        services: [
            {
                id: 'ethical-hacking-team',
                title: 'Ethical Hacking Team',
                imageUrl: '/assets/images/services/network-intelligence/ethical-hacking-team-cover-img.jpg',
                altText: 'An image representing an ethical hacking team.',
                href: '/services/network-intelligence/ethical-hacking-team',
            },
            {
                id: 'gsm-jamming-detector',
                title: 'GSM Jamming Detector',
                imageUrl: '/assets/images/services/network-intelligence/gms-jamming-detector-cover-img.jpg',
                altText: 'An image representing a GSM jamming detector.',
                href: '/services/network-intelligence/gsm-jamming-detector',
            },
            {
                id: 'rsl-hacking-van',
                title: 'RSL Hacking Van',
                imageUrl: '/assets/images/services/network-intelligence/rsl-hacking-van-cover-img.jpg',
                altText: 'An image representing a hacking van.',
                href: '/services/network-intelligence/rsl-hacking-van',
            },
            {
                id: 'wifi-probe',
                title: 'WiFi Probe',
                imageUrl: '/assets/images/services/network-intelligence/wifi-probe-cover-img.avif',
                altText: 'An image representing a WiFi probe.',
                href: '/services/network-intelligence/wifi-probe',
            },
        ],
    },
    {
        id: 'automotive-investigation',
        title: 'Automotive Investigation',
        services: [
            {
                id: 'oem-telematics',
                title: 'OEM Telematics',
                imageUrl: '/assets/images/services/automotive-investigation/oem-telematics-cover-img.avif',
                altText: 'An image representing OEM telematics.',
                href: '/services/automotive-investigation/oem-telematics',
            },
            {
                id: 'rental-car-theft',
                title: 'Rental Car Theft and Embezzlement',
                imageUrl: '/assets/images/services/automotive-investigation/rental-car-theft-cover-img.jpg',
                altText: 'An image representing rental car theft investigation.',
                href: '/services/automotive-investigation/rental-car-theft',
            },
        ],
    },
];