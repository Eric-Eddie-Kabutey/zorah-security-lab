export type MegaMenuLink = {
    icon?: string;
    title: string;
    description: string;
    href: string;
};

export type MegaMenuColumn = {
    title: string;
    description: string;
    // This new property will let us style link groups, e.g., as a grid
    linkLayout?: 'list' | 'grid';
    links: MegaMenuLink[];
};

export type NavItem = {
    label: string;
    href: string;
    // The content is now a simple array of columns. The length of this array is key.
    megaMenuContent?: MegaMenuColumn[];
};