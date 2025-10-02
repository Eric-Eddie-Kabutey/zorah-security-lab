import React from 'react';
import Logo from '@/components/logo/brand-logo'; 
import SocialLink from './social-links';
import BottomFooter from './bottom-footer';


const Footer: React.FC = () => {  

  return (
    <footer className="bg-background text-foreground">
      <div className="max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6 py-16">
        {/* Top section: Logo and Connect Info */}
        <div className="max-w-2xl flex flex-col md:flex-row justify-between items-start gap-12">
          <Logo />

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold tracking-widest uppercase text-foreground/70">
              Connect
            </h3>
            <a href="mailto:hello@irregular.com" className="hover:underline font-semibold">
              hello@irregular.com
            </a>
            <div className="flex items-center gap-2 mt-2 self-start">
              <SocialLink href="https://x.com/irregular" label="Follow us on X">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialLink>
              <SocialLink href="https://linkedin.com/company/irregular" label="Follow us on LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-2.13-1.5-2.13S13 13 13 14.26V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.4 1.16 3.4 4.64z" />
                </svg>
              </SocialLink>
            </div>
          </div>
        </div>

        {/* Bottom section: Copyright and Privacy */}
       <BottomFooter />        
      </div>
    </footer>
  );
};

export default Footer;