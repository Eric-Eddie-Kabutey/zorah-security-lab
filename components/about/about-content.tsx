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
    <section className="bg-background -mt-12 md:-mt-18 pb-16 md:pb-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* The main text content */}
        <div className="prose prose-xl max-w-none prose-p:text-foreground/90 mx-auto text-left">
          <p className='text-black font-normal md:font-medium text-lg mb-2'>
            Irregular is the first frontier security lab with the mission of protecting 
            the world in the time of increasingly capable and sophisticated AI systems. 
            We build next-generation defenses through high-fidelity research platforms 
            that simulate and monitor real-world AI security scenarios.
                  </p>
                  <br />
          <p className='text-black font-normal md:font-medium text-lg mb-2'>
            As AI systems become more powerful, we focus on staying ahead of emerging 
            threats and vulnerabilities, ensuring these transformative technologies 
            can be deployed safely and securely.
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