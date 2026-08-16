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
    <section className="bg-background max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6 pb-16 md:pb-24">
      <div className="w-full">
        {/* The main text content */}
        <div className="max-w-none text-left space-y-6 text-lg md:text-xl text-gray-500 leading-relaxed mb-12">
          <p >
            Zorah Security Lab secures the physical and digital frontiers for clients across Africa. We are the first line of defense against sophisticated cybercrime, dedicated to neutralizing threats from data breaches and business email compromise to advanced malware.
          </p>
          <p >
            Our mission extends into the digital core of modern systems. We specialize in forensic investigations, extracting critical evidence from computers, mobile devices, and vehicle electronics to uncover the truth. This expertise is mirrored in our physical security operations, where we leverage direct vehicle telematics and a continent-wide tracking network to locate and recover stolen assets.
          </p>
          <p >
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