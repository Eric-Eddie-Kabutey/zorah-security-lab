"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsletterFormSchema, NewsletterFormValues } from '@/lib/validators'; // Adjust path
import { } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';


const RadarBlip = ({ top, left, delay }: { top: string, left: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.4, 0],
      scale: [0.5, 1.2, 0.8]
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
      times: [0, 0.2, 1]
    }}
    style={{ top, left }}
    className="absolute w-1.5 h-1.5 bg-black rounded-full z-40"
  />
);

const RadarSweep = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    className="absolute inset-0 rounded-full pointer-events-none z-0"
    style={{
      background: 'conic-gradient(from 0deg, transparent 0deg, rgba(31, 41, 55, .3) 90deg, transparent 95deg)'
    }}
  />
);

const Newsletter: React.FC = () => {



  const [status, setStatus] = useState<SubmissionStatus>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    setStatus('submitting');
    try {
      // --- FAKE API CALL ---
      // In a real app, you would post this data to your newsletter service (e.g., Mailchimp, ConvertKit)
      console.log('Subscribing email:', data.email);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      // --- END FAKE API CALL ---

      setStatus('success');
      reset();
    } catch (error) {
      console.error('Subscription failed:', error);
      setStatus('error');
    }
  };

  return (
    <section className=" text-foreground/90">
      <div className="relative max-w-[1230px] 2xl:max-w-[1390px] min-h-[80vh] mx-auto px-6 flex items-center justify-center">
        <div className="w-full relative grid grid-cols-1 md:grid-cols-5 items-center gap-12 md:gap-16 z-20"><div className="col-span-1 md:col-span-3">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight uppercase font-mono">Stay up to date</h2>
          <div className="relative inline-block border-1 border-gray-900/30 px-4 py-2 mt-2">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-400 tracking-tight uppercase font-mono">with our newsletter</h2>

            {/* Corner Handles */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-200 z-30" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-200 z-30" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-200 z-30" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-200 z-30" />
          </div></div><div className="w-full col-span-1 md:col-span-2 max-w-full md:max-w-[236px] md:mx-auto md:font-medium text-black text-left md:text-right">
            <p className="text-lg md:text-xl text-gray-500 max-w-xl leading-relaxed mb-12">
              Sign up for our newsletter and get notified with regular updates
            </p>
          </div><div className="col-span-1 md:col-span-5 w-full mt-8 md:mt-0">
            {status === 'success' ? (
              <p className="text-center md:text-left font-medium">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center gap-4">
                  <div className="relative w-full">
                    <input
                      type="email"
                      placeholder="Email"
                      {...register('email')}
                      disabled={isSubmitting}
                      className="w-full bg-transparent border-b border-foreground/40 focus:border-foreground focus:outline-none py-2 disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label="Submit newsletter subscription"
                    className="p-2 transition-transform hover:translate-x-1 disabled:opacity-50"
                  >
                    <span className="text-2xl">&rarr;</span>
                  </button>
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                )}
                {status === 'error' && (
                  <p className="mt-2 text-sm text-red-600">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
        {/* Decorative Background Circles & Radar Effects */}
        <div className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[45%] aspect-square border border-gray-900/5 rounded-full z-0 flex items-center justify-center bg-gray-200/5 overflow-hidden",
          "[background-size:10px_10px]",
          "[background-image:linear-gradient(to_right,#f9fafb_1px,transparent_1px),linear-gradient(to_bottom,#f9fafb_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
        >
          <RadarSweep />
          <RadarBlip top="20%" left="30%" delay={0} />
          <RadarBlip top="60%" left="15%" delay={1.5} />
          <RadarBlip top="40%" left="80%" delay={4} />
          <RadarBlip top="75%" left="65%" delay={2.2} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[32%] aspect-square border border-gray-800/20 rounded-full z-0 pointer-events-none flex items-center justify-center bg-gray-200/0">
          <RadarBlip top="30%" left="70%" delay={0.8} />
          <RadarBlip top="70%" left="20%" delay={3.1} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[22%] aspect-square border border-gray-800/40 rounded-full z-0 pointer-events-none flex items-center justify-center bg-gray-900/15">
          <RadarBlip top="50%" left="50%" delay={5} />
        </div>


        {/* Orbiting Icons distributed across all three circles */}
        {/* Outer Circle (45%) */}
        {/* <OrbitingIcon icon={Shield} radius="45%" duration={30} delay={0} />
        <OrbitingIcon icon={Search} radius="45%" duration={30} delay={-15} reverse /> */}

        {/* Middle Circle (32%) */}
        {/* <OrbitingIcon icon={Scan} radius="32%" duration={25} delay={-5} />
        <OrbitingIcon icon={Search} radius="32%" duration={25} delay={-17} reverse /> */}

        {/* Inner Circle (22%) */}
        {/* <OrbitingIcon icon={Scan} radius="22%" duration={20} delay={-2} />
        <OrbitingIcon icon={Shield} radius="22%" duration={20} delay={-12} reverse /> */}

        <div className='absolute inset-0 z-10 bg-gradient-to-b from-transparent via-white to-white'></div>


      </div>
    </section>
  );
};

export default Newsletter;