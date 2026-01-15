// src/pages/WorkDetail.jsx
// Works page using the new GenieWorld experience
import GenieWorld from "../components/gallery/GenieWorld";
import { Header } from "../components/layout/Header";

// Project data - B.U.G Portfolio
const PROJECTS = [
  {
    id: "1",
    year: "2025",
    category: "WEB DEVELOPMENT",
    subcategory: "CLIENT",
    title: "Mannah Caterers",
    description:
      "A premium catering website for Chennai's finest caterers, featuring an elegant menu showcase, event booking system, and seamless user experience that reflects their culinary excellence.",
    image: "/portfolio/mannah/cover.png",
    role: "Full-Stack Development",
    timeline: "3 weeks",
    tech: "React, Tailwind CSS, Vercel, Responsive Design",
    challenge:
      "The client needed a modern online presence that could showcase their diverse menu offerings while allowing customers to easily inquire about catering services for events.",
    solution:
      "We built a visually stunning, mobile-first website with an interactive menu gallery, integrated contact forms, and SEO optimization to attract local Chennai customers.",
    liveUrl: "https://mannahcaterers.com",
    type: "client",
  },
  {
    id: "2",
    year: "2025",
    category: "MOBILE APP",
    subcategory: "INTERNAL",
    title: "Aura",
    description:
      "A premier video-sharing platform where creativity meets innovation. Built for creators and explorers to discover endless possibilities and share their journey of limitless exploration.",
    image: "/portfolio/aura/cover.png",
    role: "Mobile Development",
    timeline: "2 months",
    tech: "React Native, Expo, Appwrite, NativeWind",
    challenge:
      "Creating a seamless cross-platform video sharing experience with robust authentication, real-time feeds, and intuitive content management.",
    solution:
      "Built with React Native and Expo for true cross-platform support, integrated Appwrite for secure backend services, and implemented smooth video playback with custom thumbnail generation.",
    features: ["Video Upload", "AI Prompts", "Smart Search", "User Profiles"],
    type: "internal",
  },
  {
    id: "3",
    year: "2025",
    category: "AI AUTOMATION",
    subcategory: "INTERNAL",
    title: "GenieVoice",
    description:
      "AI-powered voice assistant that brings the magic of conversation to life. Natural language processing meets intuitive design for seamless human-AI interaction.",
    image: "/portfolio/genievoice/cover.png",
    role: "AI Development",
    timeline: "6 weeks",
    tech: "Python, OpenAI, Whisper, ElevenLabs, FastAPI",
    challenge:
      "Developing a voice assistant that feels natural and responsive while handling complex queries and maintaining context across conversations.",
    solution:
      "Integrated cutting-edge AI models for speech recognition and synthesis, built a robust backend for real-time processing, and designed an intuitive interface for seamless interactions.",
    features: [
      "Voice Commands",
      "Natural Language",
      "Context Memory",
      "Multi-language",
    ],
    type: "internal",
  },
  {
    id: "4",
    year: "2025",
    category: "BRAND IDENTITY",
    subcategory: "INTERNAL",
    title: "B.U.G Brand Motion",
    description:
      "The animated identity of Build Your Genie — a collection of motion graphics, logo animations, and visual effects that bring the B.U.G brand to life across digital platforms.",
    image: "/portfolio/bugmotion/cover.png",
    role: "Motion Design",
    timeline: "Ongoing",
    tech: "After Effects, Rive, GSAP, CSS Animations",
    challenge:
      "Creating a memorable brand identity that conveys innovation, creativity, and the 'magical' nature of the genie concept while remaining professional.",
    solution:
      "We developed a cohesive motion design system with animated logos, particle effects, and interactive web animations that capture the essence of 'wishes coming to life'.",
    features: [
      "Logo Animation",
      "Web Effects",
      "Particle Systems",
      "Interactive Elements",
    ],
    type: "internal",
  },
  {
    id: "5",
    year: "2025",
    category: "WEB APP",
    subcategory: "INTERNAL",
    title: "B.U.G Portfolio",
    description:
      "The very website you're browsing — an immersive showcase of B.U.G's capabilities, featuring 3D animations, WebGL effects, and cutting-edge React patterns.",
    image: "/portfolio/bug-portfolio/cover.png",
    role: "Full-Stack Development",
    timeline: "4 weeks",
    tech: "React, Vite, GSAP, Three.js, OGL, Tailwind CSS",
    challenge:
      "Building an Awwwards-worthy portfolio that demonstrates our technical prowess while remaining performant and accessible.",
    solution:
      "Created an experiential website with particle systems, infinite scrolling galleries, cinematic page transitions, and premium micro-interactions.",
    features: [
      "3D Animations",
      "Infinite Gallery",
      "Particle Effects",
      "Dark Mode",
    ],
    type: "internal",
  },
];

export default function WorkDetail() {
  return (
    <>
      <Header isFixed />
      <GenieWorld projects={PROJECTS} />
    </>
  );
}
