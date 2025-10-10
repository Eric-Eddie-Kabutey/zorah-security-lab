// Define the type for our publication data
export interface Publication {
    id: number;
    title: string;
    partner: string;
    href: string;
    coverImage: string;
}

// Mock data for the publications. You can fetch this from a CMS or API.
export const allPublications: Publication[] = [
    {
        id: 1,
        title: "Track Lost Phones",
        partner: "OpenAI",
        href: "/publications/gpt-5-cybersecurity",
        coverImage: "/assets/images/publications/track-lost-phone.webp",
    },
    {
        id: 2,
        title: "Track Lost Cars",
        partner: "Anthropic",
        href: "/publications/claude-4-offensive-security",
        coverImage: "/assets/images/publications/track-lost-car.webp",
    },
    {
        id: 3,
        title: "Uncover Individual Identity",
        partner: "Anthropic",
        href: "/publications/confidential-ai-inference",
        coverImage: "/assets/images/publications/uncover-individual-identity.webp",
    },
    // Duplicate data for the "View All" functionality
    {
        id: 4,
        title: "Advanced Red Teaming with Foundation Models: A Case Study",
        partner: "Google",
        href: "/publications/red-teaming-foundation-models",
        coverImage: "/assets/images/cover-img.jpg",
    },
    {
        id: 5,
        title: "Securing the Supply Chain for Large Language Model Training Data",
        partner: "OpenAI",
        href: "/publications/securing-llm-data",
        coverImage: "/assets/images/cover-img.jpg",
    },
    {
        id: 6,
        title: "A Framework for Quantifying AI Model Robustness Against Evasion",
        partner: "Independent Research",
        href: "/publications/quantifying-ai-robustness",
        coverImage: "/assets/images/cover-img.jpg",
    },
]