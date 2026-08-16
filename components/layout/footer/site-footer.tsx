"use client";

import React from 'react';
import Link from 'next/link';
import Logo from '@/components/logo/brand-logo';
import { navigationItems } from '@/data/nav-data';

const Footer: React.FC = () => {
  const services = navigationItems.find(item => item.label === 'What We Do')?.dropdownMenuContent || [];
  const mainLinks = navigationItems.filter(item => item.label !== 'What We Do' && item.label !== 'Join our team');
  const careerLink = navigationItems.find(item => item.label === 'Join our team');

  const socialLinks = [
    { label: 'Facebook', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'Twitter', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a0a0a] pt-18 overflow-hidden flex flex-col transition-colors duration-500">
      {/* Text Overlay */}
      <div className="relative justify-center w-full max-w-[1230px] 2xl:max-w-[1390px] mx-auto grid grid-cols-12">
        <div className="col-span-1"></div>
        <div className="col-span-1 rotate-12">
          <span className="text-[clamp(5.3rem,22vw,295px)] text-center font-black text-white uppercase tracking-tighter leading-none whitespace-nowrap">/</span>
        </div>
        <div className="col-span-10">
          <h1 className="text-[clamp(6rem,25vw,342px)] text-center font-black text-white uppercase tracking-tighter leading-none whitespace-nowrap">
            ZORAH
          </h1>
        </div>
        <div className="absolute w-[100vw] inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10"></div>
      </div>

      {/* Center Footer Content*/}
      <div className="w-full max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6 pb-18 pt-10 relative z-20 border-b border-white/5">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-12 lg:gap-18">

          {/* Column 1: Brand & Copyright */}
          <div className="flex flex-col gap-3 col-span-2 sm:col-span-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <Logo variant="light" />
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">Zorah Security Lab is the first integrated partner dedicated to securing Critical Governmenet and Business Digital Integrity, critical infrastructure and assets by unifying cyber defence, digital forensics, investigations and physical asset recovery under one command.</p>
          </div>

          {/* Column 4: Nav Links */}
          <div className="col-span-1 text-left">
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="flex flex-col gap-3 ">
              {mainLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-zinc-400 hover:text-white transition-colors text-md">
                    {link.label}
                  </Link>
                </li>
              ))}
              {careerLink && (
                <li>
                  <Link href={careerLink.href} className="text-zinc-400 hover:text-white transition-colors text-md">
                    Careers
                  </Link>
                </li>
              )}
              <li>
                <Link href="#" className="text-zinc-400 hover:text-white transition-colors text-md">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div className="col-span-1 text-left">
            <h3 className="text-white font-bold mb-4">Services</h3>
            <ul className="flex flex-col gap-3">
              {services.map((service) => (
                <li key={service.title}>
                  <Link href={service.href} className="text-zinc-400 hover:text-white transition-colors text-md">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Socials */}
          <div className="col-span-1 sm:col-span-1 text-left">
            <h3 className="text-white font-bold mb-4">Socials</h3>
            <ul className="flex flex-col gap-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <Link href={social.href} className="text-zinc-400 hover:text-white transition-colors text-md">
                    {social.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="w-full max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6 py-8 relative z-20 flex flex-col md:flex-row justify-center md:justify-between gap-8">
        <p className="text-sm text-zinc-500 leading-relaxed text-center md:text-start">
          Copyright <span className="text-white text-xs">©</span>  Zorah Security Lab {currentYear}. All rights reserved.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-sm text-zinc-500 leading-relaxed text-end md:text-center hover:text-white transition-colors cursor-pointer"
        >
          Back to top <span className="text-white text-xs">↑</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;