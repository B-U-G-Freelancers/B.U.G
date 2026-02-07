// src/data/projects.js
// Centralized project data for the entire application

export const PROJECTS = [
  {
    id: "mannah",
    title: "Mannah Caterers",
    category: "WEB DEVELOPMENT",
    subcategory: "CLIENT",
    year: "2025", // Updated year
    image: "/portfolio/mannah/cover.png",
    description:
      "A premium catering website for Chennai's finest caterers, featuring an elegant menu showcase, event booking system, and seamless user experience that reflects their culinary excellence.",
    challenge:
      "The client needed a modern online presence that could showcase their diverse menu offerings while allowing customers to easily inquire about catering services for events.",
    solution:
      "We built a visually stunning, mobile-first website with an interactive menu gallery, integrated contact forms, and SEO optimization to attract local Chennai customers.",
    tech: "React, Tailwind CSS, Vercel, Responsive Design",
    role: "Full-Stack Development",
    timeline: "3 weeks",
    liveUrl: "https://mannahcaterers.com",
    features: [
      "Custom Menu Builder",
      "Real-time Order Tracking",
      "Event Calendar Integration",
      "Mobile-First Design",
    ],
    type: "client",
  },
  {
    id: "aura",
    title: "Aura",
    category: "MOBILE APP",
    subcategory: "INTERNAL",
    year: "2025",
    image: "/portfolio/aura/cover.png",
    description:
      "A premier video-sharing platform where creativity meets innovation. Built for creators and explorers to discover endless possibilities and share their journey of limitless exploration.",
    challenge:
      "Creating a seamless cross-platform video sharing experience with robust authentication, real-time feeds, and intuitive content management.",
    solution:
      "Built with React Native and Expo for true cross-platform support, integrated Appwrite for secure backend services, and implemented smooth video playback with custom thumbnail generation.",
    tech: "React Native, Expo, Appwrite, NativeWind",
    role: "Mobile Development",
    timeline: "2 months",
    liveUrl: "#",
    features: ["Video Upload", "AI Prompts", "Smart Search", "User Profiles"],
    type: "internal",
  },
  {
    id: "genievoice",
    title: "GenieVoice",
    category: "AI AUTOMATION",
    subcategory: "INTERNAL",
    year: "2025",
    image: "/portfolio/genievoice/cover.png",
    description:
      "AI-powered voice assistant that brings the magic of conversation to life. Natural language processing meets intuitive design for seamless human-AI interaction.",
    challenge:
      "Developing a voice assistant that feels natural and responsive while handling complex queries and maintaining context across conversations.",
    solution:
      "Integrated cutting-edge AI models for speech recognition and synthesis, built a robust backend for real-time processing, and designed an intuitive interface for seamless interactions.",
    tech: "Python, OpenAI, Whisper, ElevenLabs, FastAPI",
    role: "AI Development",
    timeline: "6 weeks",
    liveUrl: "#",
    features: [
      "Voice Commands",
      "Natural Language",
      "Context Memory",
      "Multi-language",
    ],
    type: "internal",
  },
  {
    id: "bugmotion",
    title: "B.U.G Brand Motion",
    category: "BRAND IDENTITY", // Updated category
    subcategory: "INTERNAL",
    year: "2025",
    image: "/portfolio/bugmotion/cover.png",
    description:
      "The animated identity of Build Your Genie — a collection of motion graphics, logo animations, and visual effects that bring the B.U.G brand to life across digital platforms.",
    challenge:
      "Creating a memorable brand identity that conveys innovation, creativity, and the 'magical' nature of the genie concept while remaining professional.",
    solution:
      "We developed a cohesive motion design system with animated logos, particle effects, and interactive web animations that capture the essence of 'wishes coming to life'.",
    tech: "After Effects, Rive, GSAP, CSS Animations",
    role: "Motion Design",
    timeline: "Ongoing",
    liveUrl: "#",
    features: [
      "Logo Animation",
      "Web Effects",
      "Particle Systems",
      "Interactive Elements",
    ],
    type: "internal",
  },
  {
    id: "avinyaa",
    title: "AVINYAA",
    category: "WEB DEVELOPMENT",
    subcategory: "CLIENT",
    year: "2026",
    image: "/portfolio/bug-portfolio/cover.png", // Using a placeholder image for now, ideally should use one from the site if available or ask user
    description:
      "The official web presence for AVINYAA '26, a cutting-edge technical symposium. Designed to showcase events, workshops, and the vibrant spirit of the fest.",
    challenge:
      "To create a digital experience that reflects the energy and innovation of the symposium while making event registration seamless.",
    solution:
      "A high-performance web application with dynamic event showcases, real-time updates, and an engaging user interface.",
    tech: "React, Vite, Tailwind CSS",
    role: "Web Development",
    timeline: "Ongoing",
    liveUrl: "https://avinyaa.pages.dev/",
    features: [
      "Event Registration",
      "Live Updates",
      "Interactive Gallery",
      "Schedule Planner",
    ],
    type: "client",
  },
];

export default PROJECTS;
