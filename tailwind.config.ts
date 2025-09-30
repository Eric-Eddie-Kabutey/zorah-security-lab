/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-bg': '#fdfdfc',
                'brand-banner-bg': '#dbe4eb',
                'brand-text': '#111',
                'brand-button-bg': '#f0f0f0',
            },
        },
    },
    plugins: [],
};