import { StaticImageData } from 'next/image';
export interface DropdownMenuItem {
    title: string;
    description: string;
    href: string;
    iconUrl: string | StaticImageData; 
}

export type NavItem = {
    label: string;
    href: string;
    dropdownMenuContent?: DropdownMenuItem[];
};