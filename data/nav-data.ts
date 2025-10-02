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
        href: '/services',
        megaMenuContent: [
            {
                title: 'Digital Forensics',
                description:
                    'Unlock 3 fundamental digital forensics: integrate and manage any digital asset',
                linkLayout: 'list',
                links: [
                    {
                        title: 'Cryptocurrencies',
                        description: 'Custody, stake and manage crypto incl. NFT >',
                        href: '/solutions/crypto',
                    },
                    {
                        title: 'Tokenized assets',
                        description: 'Digitize, tokenize any asset on any standard >',
                        href: '/solutions/tokenized-assets',
                    },
                    {
                        title: 'Stablecoins',
                        description: 'Issue, book, transact stablecoins, CBDC >',
                        href: '/solutions/stablecoins',
                    },
                ],
            },
            {
                title: 'Cyber Crime',
                description:
                    'Any business willing to start, grow or scale digital asset activity with an enterprise-grade infrastructure',
                linkLayout: 'list',
                links: [
                    {
                        title: 'Banks and financial institutions',
                        description: 'Start, expand your digital asset product offering >',
                        href: '/for/banks',
                    },
                    {
                        title: 'Others',
                        description: 'Technology providers, private companies, etc. >',
                        href: '/for/others',
                    },
                ],
            },
            {
                title: 'Auto Motive',
                description:
                    'Any business willing to start, grow or scale digital asset activity with an enterprise-grade infrastructure',
                linkLayout: 'list',
                links: [
                    {
                        title: 'Banks and financial institutions',
                        description: 'Start, expand your digital asset product offering >',
                        href: '/for/banks',
                    },
                    {
                        title: 'Others',
                        description: 'Technology providers, private companies, etc. >',
                        href: '/for/others',
                    },
                ],
            },
            {
                title: 'Network Integration',
                description:
                    'Any business willing to start, grow or scale digital asset activity with an enterprise-grade infrastructure',
                linkLayout: 'list',
                links: [
                    {
                        title: 'Banks and financial institutions',
                        description: 'Start, expand your digital asset product offering >',
                        href: '/for/banks',
                    },
                    {
                        title: 'Others',
                        description: 'Technology providers, private companies, etc. >',
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
