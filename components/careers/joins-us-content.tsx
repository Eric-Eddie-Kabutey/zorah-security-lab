import React from 'react';
import Link from 'next/link';

const JoinUsContent: React.FC = () => {
  return (
    <section className="bg-background -mt-12 md:-mt-18 pb-16 md:pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* 
          The 'prose' classes from @tailwindcss/typography are perfect for this.
          They automatically style paragraphs, headings, links, etc., with beautiful
          and consistent spacing and typography.
        */}
        <div className="prose prose-xl max-w-none prose-p:text-foreground/90">
          <p className='text-black font-normal md:font-medium text-lg mb-2'>
            We are building the world&apos;s first frontier security lab to solve the most
            critical AI security challenges and architect the next generation of
            defenses.
          </p>
          <p className='text-black font-normal md:font-medium text-lg mb-2'>
            Our team is small but talent-dense: AI scientists published in the world&apos;s
            most prestigious venues; senior leaders who have scaled R&D
            organizations into the hundreds; world debate champions; and top cyber
            and national security experts who have uncovered vulnerabilities in
            critical infrastructure.
          </p>
          <p className='text-black font-normal md:font-medium text-lg mb-2'>
            Backed by Sequoia, Redpoint, and other leading investors, we have the
            resources and support to tackle these challenges head on.
          </p>
          <p className='text-black font-normal md:font-medium text-lg mb-2'>
            The defining problems of AI security lie ahead. We are building the
            defenses that will keep advanced AI secure, and we are looking for
            exceptional minds to join us.
          </p>
          <p className='text-black font-normal md:font-medium text-lg mb-2'>
            If that inspires you, apply.
          </p>
          <p className='text-black font-normal md:font-medium text-lg mb-2'>
            For our hiring process,{' '}
            <Link href="#hiring-process" className="underline hover:text-foreground transition-colors">
              see below
            </Link>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default JoinUsContent;