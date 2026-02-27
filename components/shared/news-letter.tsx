"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsletterFormSchema, NewsletterFormValues } from '@/lib/validators'; // Adjust path

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { BlobBackground } from '../svg/blob-background';
import { WaveBackground } from '../svg/wave-background';

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
    <section className="relative max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6 min-h-[80vh] flex items-center overflow-hidden">
      {/* Reusable Animated Wave Background */}
      <WaveBackground />

      {/* Content Container */}
      <div className="relative z-20 max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">

          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-8 flex flex-col pt-20 lg:pt-0">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-8"
            >
              STAY<br />
              <span className="text-gray-400 font-black uppercase tracking-tight">CONNECTED</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-500 max-w-xl leading-relaxed"
            >
              Join our exclusive network for critical security updates, digital forensic insights,
              and strategic intelligence briefs.
            </motion.p>
          </div>

          {/* Right Column: Email Subscription Form (Minimalist) */}
          <div className="lg:col-span-4 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full"
            >
              {status === 'success' ? (
                <div className="py-4">
                  <p className="text-gray-900 font-bold mb-1 tracking-tight">ACCESS GRANTED</p>
                  <p className="text-sm text-gray-500 font-mono">Channel successfully encrypted.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm lg:ml-auto">
                  <div className="relative group">
                    <div className="flex items-end gap-4 pb-2 border-b border-gray-900/10 transition-colors group-focus-within:border-gray-900/40">
                      <div className="flex-1 space-y-1">
                        <label className="block text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-gray-400">
                          Secure Link
                        </label>
                        <input
                          type="email"
                          placeholder="Email Address"
                          {...register('email')}
                          disabled={isSubmitting}
                          className="w-full bg-transparent focus:outline-none text-base placeholder:text-gray-300 transition-all disabled:opacity-50"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="pb-1 transition-transform duration-300 hover:translate-x-1 disabled:opacity-30"
                      >
                        <span className="text-2xl font-light text-gray-900">&rarr;</span>
                      </button>
                    </div>
                    {/* Progress Indicator */}
                    <div className="absolute -bottom-[1px] left-0 h-[1px] w-0 bg-gray-900 transition-all duration-700 group-focus-within:w-full" />
                  </div>

                  {errors.email && (
                    <p className="mt-2 text-[10px] font-mono text-red-500 uppercase tracking-wider">{errors.email.message}</p>
                  )}
                </form>
              )}
            </motion.div>
          </div>
        </div>

        {/* Technical Navigation Deco */}
        <div className="mt-24 md:mt-32 pb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.3em] text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <div className="w-12 h-[1px] bg-gray-200 group-hover:bg-gray-900 transition-colors" />
              CONTACT US
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Background Technical Radar Decoration */}
      {/* <div className="absolute top-1/2 left-[70%] -translate-y-1/2 opacity-[0.03] pointer-events-none z-0">
        <div className="relative w-[800px] h-[800px] border border-gray-900 rounded-full flex items-center justify-center">
          <RadarSweep />
          <div className="w-[600px] h-[600px] border border-gray-900 rounded-full" />
          <div className="w-[400px] h-[400px] border border-gray-900 rounded-full" />
          <RadarBlip top="20%" left="30%" delay={0} />
          <RadarBlip top="60%" left="15%" delay={1.5} />
          <RadarBlip top="40%" left="80%" delay={4} />
          <RadarBlip top="75%" left="65%" delay={2.2} />
        </div>
      </div> */}
    </section>
  );
};

export default Newsletter;