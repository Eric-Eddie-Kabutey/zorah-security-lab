import { NavItem } from '@/types/nav-types'

export const navigationItems: NavItem[] = [
    {
        label: 'Publications',
        href: '/publications',
    },
    {
        label: 'About',
        href: '/about',
    },
    {
        label: 'Services',
        href: '#',
        dropdownMenuContent: [
            {
                title: 'Digital Forensics',
                href: '/services/digital-forensics',
                description: 'Some description coming some for digital forensics',
                iconUrl: '/assets/icons/digital-forensics/link-icon.png',
                imageUrl: '/assets/images/services/digital-forensics/computer-forensics-cover-img.avif',
                tags: ['Mobile', 'Computer', 'Network']
            },
            {
                title: 'Cyber Enable Crime',
                href: '/services/cyber-enable-crime',
                description: 'Some description coming some for cyber enable crime',
                iconUrl: '/assets/icons/cyber-enable-crime/link-icon.png',
                imageUrl: '/assets/images/services/cyber-enable-crime/bce-investigation-cover-img.avif',
                tags: ['Fraud', 'Extortion', 'Identity']
            },
            {
                title: 'Network Intelligence',
                href: '/services/network-intelligence',
                description: 'Some description coming some for network intelligence',
                iconUrl: '/assets/icons/network-intelligence/link-icon.png',
                imageUrl: '/assets/images/services/network-intelligence/ethical-hacking-team-cover-img.jpg',
                tags: ['OSINT', 'Threat Intel', 'Analysis']
            },
            {
                title: 'Automotive Investigation',
                href: '/services/automotive-investigation',
                description: 'Some description coming some for automotive investigation',
                iconUrl: '/assets/icons/automotive-investigation/link-icon.png',
                imageUrl: '/assets/images/services/automotive-investigation/oem-telematics-cover-img.avif',
                tags: ['Telematics', 'CANBus', 'ECU']
            },
        ],
    },
    {
        label: 'Product',
        href: '/product',
    },
    {
        label: 'Contact',
        href: '/contact',
    },
    {
        label: 'Join our team',
        href: '/careers'
    },
]
