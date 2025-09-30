import { z } from 'zod';

export const contactFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    company: z.string().optional(),
    message: z.string().min(10, { message: "Message must be at least 10 characters long." }),
});


// New schema for the newsletter
export const newsletterFormSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
});

export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;

export type ContactFormValues = z.infer<typeof contactFormSchema>;