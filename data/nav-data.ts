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
                linkLayout: 'list',
                links: [
                    {
                        title: 'Computer Forensics',
                        description: ['Any business willing to start', 'grow or scale digital asset '],
                        href: '/digital-forensics#computerforensics',
                    },
                    {
                        title: 'Mobile Forensics',   
                        description: ['Any business willing to start', 'grow or scale digital asset '],
                        href: '/digital-forensics#mobileforensics',
                    },
                    {
                        title: 'ECU Forensics',  
                        description: ['Any business willing to start', 'grow or scale digital asset '],
                        href: '/digital-forensics#ecuforensics',
                    },  
                    {
                        title: 'Drone Forensics',
                        description: ['Any business willing to start', 'grow or scale digital asset '],
                        href: '/digital-forensics#drone-forensics',
                    },  
                ],
            },
            {
                title: 'Cyber Enable Crime',               
                linkLayout: 'list',
                links: [
                    {
                        title: 'BEC Investigation',    
                        description: ['Any business willing to start', 'grow or scale digital asset '],
                        href: '/cyber-enable-crime#bec-investigations',
                    },
                    {
                        title: 'Penetration Testing',  
                        description: ['Any business willing to start', 'grow or scale digital asset '],
                        href: '/cyber-enable-crime#penetration-testing',
                    },
                    {
                        title: 'Data Breach Investigation', 
                        description: ['Any business willing to start', 'grow or scale digital asset '],
                        href: '/cyber-enable-crime#data-breach-investigation',
                    },
                    {
                        title: 'Malware (Viral) Remote',  
                        description: ['Any business willing to start', 'grow or scale digital asset '],
                        href: '/cyber-enable-crime#malware-viral-remote',
                    },
                ],
            },
            {
                title: 'Automotive Investigation',                
                linkLayout: 'list',
                links: [
                    {
                        title: 'Stolen Vehicle Investigation', 
                        description: ['Any business willing to start', 'grow or scale digital asset '],
                        href: '/automotive-investigation#stolenvehicleinvestigation',
                    },
                    {
                        title: 'Rental Car Theft',   
                        description: ['Any business willing to start', 'grow or scale digital asset '],
                        href: '/automotive-investigation#rentalcartheft',
                    },
                    {
                        title: 'OEM Terematics',
                        description: ['Any business willing to start', 'grow or scale digital asset '],
                        href: '/automotive-investigation#oem',
                    },
                    {
                        title: 'Patrol Emergency and Intelligent',
                        description: ['Any business willing to start', 'grow or scale digital asset '],
                        href: '/automotive-investigation#patrolemergencyintelligent',
                    },
                ],
            },
            {
                title: 'Network Intelligence',            
                linkLayout: 'list',
                links: [
                    {
                        title: 'Ethical Hacking Team',  
                        description:
                            ['Any business willing to start', 'grow or scale digital asset '],
                        href: '/network-intelligence#ethical-hacking',
                    },
                    {
                        title: 'WIFI Probe',      
                        description:
                            ['Any business willing to start', 'grow or scale digital asset '],
                        href: '/network-intelligence#wifi-probe',
                    },
                    {
                        title: 'RSL Hacking Van',
                        description: ['Any business willing to start', 'grow or scale digital asset '],
                        href: '/network-intelligence#rls-hacking-van',
                    },
                    {
                        title: 'GSM Jamming Detector',
                        description:
                            ['Any business willing to start', 'grow or scale digital asset '],
                        href: '/network-intelligence#gms-jamming-detector',
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
