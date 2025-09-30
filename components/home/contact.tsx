"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormValues } from '@/lib/validators'; // Adjust path
import { Input, Textarea } from '@/components/ui/form-input'; // Adjust path

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact: React.FC = () => {
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
    <section className="bg-background min-h-screen py-24">
      <div className="max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
        {/* Left Column: Title */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-medium text-foreground">Get in touch</h2>
        </div>

        {/* Right Column: Form */}
        <div className="md:col-span-2">
          {status === 'success' ? (
            <div className="text-center p-8 border border-green-300 bg-green-50 rounded-lg">
              <h3 className="text-2xl font-semibold text-green-800">Thank you!</h3>
              <p className="mt-2 text-green-700">Your message has been sent successfully. We&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
              <p className="text-xl text-foreground/90">
                Leave a message and we’ll get back to you as soon as possible!
              </p>
              
              <div className="space-y-10">
                <Input name="name" label="Name" register={register} error={errors.name} />
                <Input name="email" label="Email" type="email" register={register} error={errors.email} />
                <Input name="company" label="Company" register={register} error={errors.company} />
                <Textarea name="message" label="Message" register={register} error={errors.message} />
              </div>

              {status === 'error' && (
                <p className="text-red-500">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-black text-white font-medium rounded-full transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
                {!isSubmitting && <span>&rarr;</span>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;