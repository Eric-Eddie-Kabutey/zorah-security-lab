import React from 'react';
import PartnersSection from '@/components/shared/partners-section';
import { AnthropicLogo, GoogleLogo, OpenAILogo, RedpointLogo, SequoiaLogo } from '../logo/works-with-logos';

// Define the data for the static partners list
const partnerGroups = [
  {
    label: "Trusted by the world's leading AI labs",
    logos: [
      <OpenAILogo key="openai" />, 
      <GoogleLogo key="google" />, 
      <AnthropicLogo key="anthropic" />
    ]
  },
  {
    label: "Backed by leading investors, among others",
    logos: [
      <SequoiaLogo key="sequoia" />, 
      <RedpointLogo key="redpoint" />
    ]
  }
];

const AboutContent: React.FC = () => {
  return (
    <section className="bg-background -mt-12 md:-mt-18 pb-16 md:pb-24">
      <div className="max-w-2xl mx-auto text-center">
        {/* The main text content */}
        <div className="prose prose-xl max-w-none prose-p:text-foreground/90 mx-auto text-left">
          <p className='text-black font-normal md:font-medium text-lg mb-2 md:mb-4'>
            Zorah Security Lab secures the physical and digital frontiers for clients across Africa. We are the first line of defense against sophisticated cybercrime, dedicated to neutralizing threats from data breaches and business email compromise to advanced malware.
                  </p>                  
          <p className='text-black font-normal md:font-medium text-lg mb-2 md:mb-4'>
           Our mission extends into the digital core of modern systems. We specialize in forensic investigations, extracting critical evidence from computers, mobile devices, and vehicle electronics to uncover the truth. This expertise is mirrored in our physical security operations, where we leverage direct vehicle telematics and a continent-wide tracking network to locate and recover stolen assets.

          </p>

          <p className='text-black font-normal md:font-medium text-lg mb-2 md:mb-4'>
          From penetration testing and wireless integrity services to active patrols and intelligence-led recovery, we provide end-to-end protection. For our partners in The Gambia, Senegal, Ghana, Sierra Leone, Liberia, and South Africa, Zorah Security Lab is the single, trusted partner ensuring operational security and resilience.
            
          </p>
        </div>
        
        {/* Divider */}
        <hr className="my-16 md:my-24 border-muted" />

        {/* The static partners section */}
        <PartnersSection groups={partnerGroups} />
      </div>
    </section>
  );
};

export default AboutContent;