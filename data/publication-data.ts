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
        title: "Irregular x OpenAI: Evaluating GPT-5's Cybersecurity Capabilities",
        partner: "OpenAI",
        href: "/publications/gpt-5-cybersecurity",
        coverImage: "/assets/images/cover-img.jpg",
    },
    {
        id: 2,
        title: "From Scripts to Strategy: Claude 4's Advanced Approach to Offensive Security",
        partner: "Anthropic",
        href: "/publications/claude-4-offensive-security",
        coverImage: "/assets/images/cover-img.jpg",
    },
    {
        id: 3,
        title: "Irregular and Anthropic Publish Whitepaper on Confidential AI Inference Systems",
        partner: "Anthropic",
        href: "/publications/confidential-ai-inference",
        coverImage: "/assets/images/cover-img.jpg",
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