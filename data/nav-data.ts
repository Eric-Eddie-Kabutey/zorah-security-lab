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
                description: 'Some description coming some for digital forensics',
                linkLayout: 'list',
                links: [
                    {
                        title: 'Computer Forensics',
                        imgUrl: '/assets/icons/setting.png',
                        href: '/digital-forensics#computerforensics',
                    },
                    {
                        title: 'Mobile Forensics',   
                        imgUrl: '/assets/icons/setting.png',
                        href: '/digital-forensics#mobileforensics',
                    },
                    {
                        title: 'ECU Forensics',  
                        imgUrl: '/assets/icons/setting.png',
                        href: '/digital-forensics#ecuforensics',
                    },  
                    {
                        title: 'Drone Forensics',
                        imgUrl: '/assets/icons/setting.png',
                        href: '/digital-forensics#drone-forensics',
                    },  
                ],
            },
            {
                title: 'Cyber Enable Crime',  
                description: 'Some description coming some for cyber enable crime',
                linkLayout: 'list',
                links: [
                    {
                        title: 'BEC Investigation',    
                        imgUrl: '/assets/icons/setting.png',
                        href: '/cyber-enable-crime#bec-investigations',
                    },
                    {
                        title: 'Penetration Testing',  
                        imgUrl: '/assets/icons/setting.png',
                        href: '/cyber-enable-crime#penetration-testing',
                    },
                    {
                        title: 'Data Breach Investigation', 
                        imgUrl: '/assets/icons/setting.png',
                        href: '/cyber-enable-crime#data-breach-investigation',
                    },
                    {
                        title: 'Malware (Viral) Remote',  
                        imgUrl: '/assets/icons/setting.png',
                        href: '/cyber-enable-crime#malware-viral-remote',
                    },
                ],
            },            
            {
                title: 'Network Intelligence',     
                description: 'Some description coming some for network intelligence',
                linkLayout: 'list',
                links: [
                    {
                        title: 'Ethical Hacking Team',  
                        imgUrl: '/assets/icons/setting.png',
                        href: '/network-intelligence#ethical-hacking',
                    },
                    {
                        title: 'WIFI Probe',      
                        imgUrl: '/assets/icons/setting.png',
                        href: '/network-intelligence#wifi-probe',
                    },
                    {
                        title: 'RSL Hacking Van',
                        imgUrl: '/assets/icons/setting.png',
                        href: '/network-intelligence#rls-hacking-van',
                    },
                    {
                        title: 'GSM Jamming Detector',
                        imgUrl: '/assets/icons/setting.png',
                        href: '/network-intelligence#gms-jamming-detector',
                    },
                ],
            },
            {
                title: 'Automotive Investigation',
                description: 'Some description coming some for automotive investigation',
                linkLayout: 'list',
                links: [
                    {
                        title: 'Stolen Vehicle Investigation',
                        imgUrl: '/assets/icons/setting.png',                        
                        href: '/automotive-investigation#stolenvehicleinvestigation',
                    },
                    {
                        title: 'Rental Car Theft',
                        imgUrl: '/assets/icons/setting.png',                        
                        href: '/automotive-investigation#rentalcartheft',
                    },
                    {
                        title: 'OEM Terematics',
                        imgUrl: '/assets/icons/setting.png',                        
                        href: '/automotive-investigation#oem',
                    },
                    {
                        title: 'Patrol Emergency and Intelligent',
                        imgUrl: '/assets/icons/setting.png',                        
                        href: '/automotive-investigation#patrolemergencyintelligent',
                        hasBnt: true
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
