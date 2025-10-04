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
                iconUrl: '/assets/icons/digital-forensics/link-icon.png'
            },
            {
                title: 'Cyber Enable Crime',  
                href: '/services/cyber-enable-crime',
                description: 'Some description coming some for cyber enable crime',   
                iconUrl: '/assets/icons/cyber-enable-crime/link-icon.png'
            },            
            {
                title: 'Network Intelligence',     
                href: '/services/network-intelligence',
                description: 'Some description coming some for network intelligence',
                iconUrl: '/assets/icons/network-intelligence/link-icon.png'
            },
            {
                title: 'Automotive Investigation',
                href: '/services/automotive-investigation',
                description: 'Some description coming some for automotive investigation',
                iconUrl: '/assets/icons/automotive-investigation/link-icon.png'
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
