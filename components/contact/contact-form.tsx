"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormValues } from '@/lib/validators';
import { Input, Textarea } from '@/components/ui/form-input';

import { motion } from 'framer-motion';
import { GridPattern } from '../ui/grid-pattern';

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<SubmissionStatus>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus('submitting');
    try {
      // --- FAKE API CALL ---
      // In a real app, you would post this data to your API endpoint
      // e.g., await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
      console.log('Form data submitted:', data);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      // --- END FAKE API CALL ---

      setStatus('success');
      reset(); // Clear the form on success
    } catch (error) {
      console.error('Submission failed:', error);
      setStatus('error');
    }
  };

  return (
    <section className="relative pt-32 overflow-hidden">
      {/* Technical Grid Background */}

      <div className="relative z-10 max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12  items-start">

          {/* Left Column: Heading & Technical Info */}
          <div className="lg:col-span-5 flex flex-col pt-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-7xl font-bold text-gray-900 leading-[0.9] tracking-tighter mb-8 uppercase">
                Contact<br />
                <span className="text-gray-400 not-italic">US</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-500 max-w-md leading-relaxed mb-12">
                Leave a message and we’ll get back to you as soon as possible!
              </p>

              {/* Technical Metadata Decoration */}
              {/* <div className="hidden md:flex flex-col gap-6 mt-12 border-l border-gray-100 pl-8">
                <div>
                  <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.3em] mb-1">Response Protocol</p>
                  <p className="text-sm font-bold text-gray-900 uppercase tracking-widest">24/7 Rapid Deployment</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.3em] mb-1">Transmission Mode</p>
                  <p className="text-sm font-bold text-gray-900 uppercase tracking-widest">End-to-End Encrypted</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.3em] mb-1">Global HQ</p>
                  <p className="text-sm font-bold text-gray-900 uppercase tracking-widest">Digital Forensics Center</p>
                </div>
              </div> */}
            </motion.div>
          </div>

          {/* Right Column: The Form */}
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-8 md:p-12 "
            >
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-2xl">✓</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-2">SIGNAL RECEIVED</h3>
                  <p className="text-gray-500 font-mono text-sm uppercase tracking-wider">Our operators will contact you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                  <div className="space-y-8">
                    <Input name="name" label="IDENTIFIER / NAME" register={register} error={errors.name} />
                    <Input name="email" label="COMMS LINK / EMAIL" type="email" register={register} error={errors.email} />
                    <Input name="company" label="ENTITY / ORGANIZATION" register={register} error={errors.company} />
                    <Textarea name="message" label="INTEL / MESSAGE" register={register} error={errors.message} />
                  </div>

                  {status === 'error' && (
                    <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Failure. Please resubmit.</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-[10px] border border-gray-900 text-gray-900 font-bold uppercase tracking-widest text-xs hover:bg-gray-900 hover:text-white transition-all duration-300"
                  >
                    <span className="relative z-10">{isSubmitting ? 'SENDING...' : 'Reach out to us'}</span>
                    {!isSubmitting && <span className="relative z-10 transition-transform group-hover:translate-x-1">&rarr;</span>}
                  </button>

                  {/* <p className="text-[9px] text-gray-400 font-mono uppercase tracking-[0.1em] text-center">
                    Secure transmission encrypted with AES-256 standard protocols.
                  </p> */}
                </form>
              )}
            </motion.div>

            {/* Deco Corner Elements */}
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-gray-900/10 pointer-events-none" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-gray-900/10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;