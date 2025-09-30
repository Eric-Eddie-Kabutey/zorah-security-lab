"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsletterFormSchema, NewsletterFormValues } from '@/lib/validators'; // Adjust path

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

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
      // We don't reset the form immediately, we show a success message instead.
    } catch (error) {
      console.error('Subscription failed:', error);
      setStatus('error');
    }
  };

  return (
    <section className="bg-[#e0eedc] text-foreground/90">
      <div className="max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-8 md:gap-16">
          {/* Column 1: Title */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-medium text-foreground">Stay updated</h2>
          </div>

          {/* Column 2: Description */}
          <div className="md:col-span-2 max-w-[256px] md:max-w-[236px] mx-auto md:font-medium text-black">
            <p>
              Sign up for our newsletter and get notified of irregular updates
            </p>
          </div>

          {/* Column 3: Form */}
          <div className="md:col-span-2">
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
      </div>
    </section>
  );
};

export default Newsletter;