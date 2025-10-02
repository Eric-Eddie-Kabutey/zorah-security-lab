import { notes, processSteps } from '@/data/hiringprocess-data';
import React from 'react';


const ServicesListing: React.FC = () => {
  return (
    <section id="hiring-process" className="bg-background py-24 px-6">
      <div className="max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column: Section Title */}
              <div>
                  <p className='text-gray-800 text-sm md:text-base sticky top-28'>Services</p>
          <h2 className="text-lg font-medium text-black sticky top-36">
            Our Core Service
                  </h2>
                  {/* underline  */}
                  <div className='bg-gray-500 h-1 w-10 sticky top-46'></div>
        </div>

        {/* Right Column: Main Content */}
        <div className="md:col-span-2 prose prose-lg max-w-none prose-p:text-foreground/80 prose-headings:text-foreground prose-strong:text-foreground">
          <p className='text-black font-normal md:font-medium text-lg mb-4'>
            The hiring process at Irregular varies based on role and candidate, but our standard process will include the following stages:
          </p>
          
          {/* Ordered list for the process steps */}
          <ol className='list-decimal'>
            {processSteps.map((step) => (
              <li key={step.title} className='text-black font-normal md:font-medium text-[16px]  mb-4'>
                <strong>{step.title}</strong>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>

          {/* Notes section with its own heading and list */}
          <h3 className="!mt-16 mb-4 text-black font-normal md:font-medium text-lg">Notes</h3>
          <ol className='list-decimal'>
            {notes.map((note, index) => (
              <li key={index} className='text-black font-normal md:font-medium text-lg mb-2'>
                <p>{note}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ServicesListing;