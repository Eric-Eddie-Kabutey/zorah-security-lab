import { NavItem } from '@/types/nav-types'
// Import other icons...

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
        megaMenuContent: [
            {
                title: 'Digital Forensics',
                description:
                    'Unlock 3 fundamental digital forensics: integrate and manage any digital asset',
                linkLayout: 'list',
                links: [
                    {
                        title: 'Computer Forensics',
                        href: '/digital-forensics#computerforensics',
                    },
                    {
                        title: 'Mobile Forensics',                        
                        href: '/digital-forensics#mobileforensics',
                    },
                    {
                        title: 'ECU Forensics',                        
                        href: '/digital-forensics#ecuforensics',
                    },                    
                ],
            },
            {
                title: 'Cyber Enable Crime',
                description:
                    'Any business willing to start, grow or scale digital asset activity with an enterprise-grade infrastructure',
                linkLayout: 'list',
                links: [
                    {
                        title: 'BEC Investigation',                    
                        href: '/cyber-enable-crime#bec-investigations',
                    },
                    {
                        title: 'Penetration Testing',                        
                        href: '/cyber-enable-crime#penetration-testing',
                    },
                    {
                        title: 'Data Breach Investigation',                        
                        href: '/cyber-enable-crime#data-breach-investigation',
                    },
                    {
                        title: 'Malware (Viral) Remote',                        
                        href: '/cyber-enable-crime#malware-viral-remote',
                    },
                ],
            },
            {
                title: 'Automotive Investigation',
                description:
                    'Any business willing to start, grow or scale digital asset activity with an enterprise-grade infrastructure',
                linkLayout: 'list',
                links: [
                    {
                        title: 'Stolen Vehicle Investigation',                        
                        href: '/automotive-investigation#stolenvehicleinvestigation',
                    },
                    {
                        title: 'Rental Car Theft',                        
                        href: '/automotive-investigation#rentalcartheft',
                    },
                    {
                        title: 'OEM Terematics',
                        href: '/automotive-investigation#oem',
                    },
                    {
                        title: 'Patrol Emergency and Intelligent',
                        href: '/automotive-investigation#patrolemergencyintelligent',
                    },
                ],
            },
            {
                title: 'Network Integration',            
                linkLayout: 'list',
                links: [
                    {
                        title: 'Banks and financial institutions',  
                        description:
                            'Any business willing to start, grow or scale digital asset ',
                        href: '/for/banks',
                    },
                    {
                        title: 'Others',      
                        description:
                            'Any business willing to start, grow or scale digital asset ',
                        href: '/for/others',
                    },
                ],
            },
        ],
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
