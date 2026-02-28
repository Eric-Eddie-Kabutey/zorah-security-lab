// Define the type for our publication data
export interface Publication {
    id: number;
    title: string;
    partner: string;
    href: string;
    coverImage: string;
    description?: string;
    date: string;
    category: string;
    systemId: string;
}

// Mock data for the publications. You can fetch this from a CMS or API.
export const allPublications: Publication[] = [
    {
        id: 1,
        title: "Track Lost Phones: GPT-5 Cybersecurity",
        partner: "OpenAI",
        href: "/publications/gpt-5-cybersecurity",
        coverImage: "/assets/images/publications/phone.jpeg",
        description: "Using GPT-5 to enhance cybersecurity measures and protect against emerging threats.",
        date: "2025.08.07",
        category: "RESEARCH",
        systemId: "ZSR-882-P"
    },
    {
        id: 2,
        title: "Track Lost Cars: Claude 4 Offensive Security",
        partner: "Anthropic",
        href: "/publications/claude-4-offensive-security",
        coverImage: "/assets/images/publications/car.jpeg",
        description: "Leveraging Claude 4 for advanced offensive security strategies in modern cyber defense.",
        date: "2025.08.15",
        category: "RESEARCH",
        systemId: "ZSR-441-A"
    },
    {
        id: 3,
        title: "Uncover Individual Identity: Confidential AI Inference",
        partner: "Anthropic",
        href: "/publications/confidential-ai-inference",
        coverImage: "/assets/images/publications/face.jpeg",
        description: "Exploring confidential AI inference techniques to safeguard individual identities in data processing.",
        date: "2025.09.01",
        category: "RESEARCH",
        systemId: "ZSR-109-I"
    },
    {
        id: 4,
        title: "Advanced Red Teaming with Foundation Models",
        partner: "Google",
        href: "/publications/red-teaming-foundation-models",
        coverImage: "/assets/images/cover-img.jpg",
        description: "A detailed case study on advanced red teaming techniques using state-of-the-art foundation models.",
        date: "2025.09.10",
        category: "CASE-STUDY",
        systemId: "ZSR-772-F"
    },
    {
        id: 5,
        title: "Securing the LLM Data Supply Chain",
        partner: "OpenAI",
        href: "/publications/securing-llm-data",
        coverImage: "/assets/images/cover-img.jpg",
        description: "Technical strategies for securing the data supply chain used in training large language models.",
        date: "2025.10.05",
        category: "WHITEPAPER",
        systemId: "ZSR-331-S"
    },
    {
        id: 6,
        title: "Quantifying AI Model Robustness",
        partner: "Independent Research",
        href: "/publications/quantifying-ai-robustness",
        coverImage: "/assets/images/cover-img.jpg",
        description: "Quantitative methods for measuring how well AI models resist evasion attacks.",
        date: "2025.11.12",
        category: "RESEARCH",
        systemId: "ZSR-550-N"
    },
]