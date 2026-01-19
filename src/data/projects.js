// src/data/projects.js
// Centralized project data for the entire application

export const PROJECTS = [
  {
    id: "mannah",
    title: "Mannah Caterers",
    category: "Web Design",
    year: "2024",
    image: "/portfolio/mannah/cover.png",
    description:
      "Premium catering website with elegant menu presentation and online ordering.",
    challenge:
      "Create a sophisticated digital presence that reflects the premium quality of Mannah's catering services while making menu browsing and ordering seamless.",
    solution:
      "Designed an immersive website with rich imagery, animated menu sections, and an intuitive ordering flow that increased online bookings by 150%.",
    tech: "React, Tailwind CSS, Framer Motion, Supabase",
    role: "Full-Stack Development",
    timeline: "6 weeks",
    liveUrl: "https://mannahcaterers.com",
    features: [
      "Custom Menu Builder",
      "Real-time Order Tracking",
      "Event Calendar Integration",
      "Mobile-First Design",
    ],
  },
  {
    id: "aura",
    title: "Aura App",
    category: "Mobile App",
    year: "2024",
    image: "/portfolio/aura/cover.png",
    description:
      "Wellness and meditation app with personalized AI-guided sessions.",
    challenge:
      "Build a calming, intuitive mobile experience that helps users develop consistent meditation habits through personalization.",
    solution:
      "Created an AI-powered meditation companion with adaptive session lengths, mood tracking, and breathing exercises that feel natural and engaging.",
    tech: "React Native, Expo, TensorFlow Lite, Firebase",
    role: "Mobile Development & AI Integration",
    timeline: "10 weeks",
    liveUrl: "#",
    features: [
      "AI Voice Guidance",
      "Mood Analytics",
      "Sleep Stories",
      "Breathing Exercises",
    ],
  },
  {
    id: "genievoice",
    title: "GenieVoice AI",
    category: "AI Product",
    year: "2024",
    image: "/portfolio/genievoice/cover.png",
    description: "Voice-first AI assistant for enterprise workflow automation.",
    challenge:
      "Develop a voice AI that understands complex business contexts and integrates with existing enterprise tools.",
    solution:
      "Built a custom LLM-powered voice agent with enterprise SSO, CRM integration, and natural language task execution.",
    tech: "Python, FastAPI, OpenAI, Whisper, React",
    role: "AI Architecture & Backend",
    timeline: "16 weeks",
    liveUrl: "#",
    features: [
      "Voice Commands",
      "CRM Integration",
      "Task Automation",
      "Analytics Dashboard",
    ],
  },
  {
    id: "bugmotion",
    title: "B.U.G Motion",
    category: "Motion Design",
    year: "2024",
    image: "/portfolio/bugmotion/cover.png",
    description: "Motion design and animation studio showcase.",
    challenge:
      "Create a portfolio that showcases motion design work in an engaging, interactive way.",
    solution:
      "Built a WebGL-powered showcase with smooth transitions, 3D elements, and interactive project previews.",
    tech: "Three.js, GSAP, React, WebGL",
    role: "Creative Development",
    timeline: "8 weeks",
    liveUrl: "#",
    features: [
      "3D Showcases",
      "Interactive Timelines",
      "Video Integration",
      "Custom Cursors",
    ],
  },
  {
    id: "bug-portfolio",
    title: "B.U.G Portfolio",
    category: "Web Experience",
    year: "2024",
    image: "/portfolio/bug-portfolio/cover.png",
    description: "Immersive portfolio experience with 3D WebGL effects.",
    challenge:
      "Create an Awwwards-level portfolio that stands out and demonstrates technical excellence.",
    solution:
      "Developed this very site you're viewing - featuring particle systems, 3D galleries, and seamless page transitions.",
    tech: "React, Three.js, Framer Motion, Tailwind CSS",
    role: "Full Creative Development",
    timeline: "Ongoing",
    liveUrl: "https://buildyourgenie.com",
    features: [
      "3D Particle Engine",
      "Circular Gallery",
      "Page Transitions",
      "Dark Mode",
    ],
  },
];

export default PROJECTS;
