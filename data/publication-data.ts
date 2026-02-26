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
        title: "Track Lost Phones",
        partner: "OpenAI",
        href: "/publications/track-lost-phones",
        coverImage: "/assets/images/publications/phone.jpeg",
        description: "Advanced signal triangulation and IMSI catching techniques for rapid mobile asset recovery.",
        date: "2024.02.15",
        category: "FORENSICS",
        systemId: "ZSR-882-P"
    },
    {
        id: 2,
        title: "Track Lost Cars",
        partner: "Anthropic",
        href: "/publications/track-lost-cars",
        coverImage: "/assets/images/publications/car.jpeg",
        description: "Utilizing OEM telematics and CAN-bus protocol analysis to locate and recover stolen high-value vehicles.",
        date: "2024.01.10",
        category: "AUTOMOTIVE",
        systemId: "ZSR-441-A"
    },
    {
        id: 3,
        title: "Uncover Individual Identity",
        partner: "Anthropic",
        href: "/publications/uncover-identity",
        coverImage: "/assets/images/publications/face.jpeg",
        description: "De-anonymization frameworks across decentralized networks using behavioral biometric analysis.",
        date: "2023.12.05",
        category: "INTELLIGENCE",
        systemId: "ZSR-109-I"
    },
    {
        id: 4,
        title: "Cyber-Enabled Fraud Detection",
        partner: "Google",
        href: "/publications/fraud-detection",
        coverImage: "/assets/images/cover-img.jpg",
        description: "Real-time pattern recognition systems for identifying and neutralizing cross-border financial fraud.",
        date: "2023.11.20",
        category: "CRIME",
        systemId: "ZSR-772-F"
    },
    {
        id: 5,
        title: "Securing LLM Training Data",
        partner: "OpenAI",
        href: "/publications/securing-llm-data",
        coverImage: "/assets/images/cover-img.jpg",
        description: "Robust security protocols for protecting large-scale datasets from poisoning and unauthorized access.",
        date: "2023.10.12",
        category: "AI_SECURITY",
        systemId: "ZSR-331-S"
    },
    {
        id: 6,
        title: "Network Robustness Evasion",
        partner: "Independent Research",
        href: "/publications/network-robustness",
        coverImage: "/assets/images/cover-img.jpg",
        description: "Quantifying global infrastructure resilience against advanced evasion techniques and state-level actors.",
        date: "2023.09.28",
        category: "INFRASTRUCTURE",
        systemId: "ZSR-550-N"
    },
]