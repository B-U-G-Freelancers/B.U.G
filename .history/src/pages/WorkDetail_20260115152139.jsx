// src/pages/WorkDetail.jsx
// Works page using the new GenieWorld experience
import GenieWorld from "../components/gallery/GenieWorld";

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
      "An intelligent AI receptionist that handles both voice calls and chat interactions, providing 24/7 automated customer support with natural conversation capabilities.",
    image: "/portfolio/genievoice/cover.png",
    role: "AI/ML Engineering",
    timeline: "Ongoing",
    tech: "Python, OpenAI Whisper, Twilio, LangChain, FastAPI",
    challenge:
      "Businesses need round-the-clock customer support but staffing 24/7 is expensive. Traditional chatbots feel robotic and frustrating.",
    solution:
      "We developed GenieVoice with both voice (Twilio) and chat capabilities, using Whisper for speech-to-text and GPT-4 for natural, context-aware conversations.",
    features: [
      "Voice Calls",
      "Chat Support",
      "Appointment Booking",
      "FAQ Handling",
    ],
    type: "internal",
  },
  {
    id: "4",
    year: "2025",
    category: "ML DEVELOPMENT",
    subcategory: "INTERNAL",
    title: "StockSense",
    description:
      "A machine learning-powered stock price prediction system using LSTM neural networks and technical indicators to forecast market trends with actionable insights.",
    image: "/portfolio/stocksense/cover.png",
    role: "ML Engineering",
    timeline: "6 weeks",
    tech: "Python, TensorFlow, LSTM, Pandas, Plotly",
    challenge:
      "Stock market prediction is notoriously difficult due to market volatility, external factors, and the chaotic nature of financial data.",
    solution:
      "We built an LSTM-based model trained on historical data with technical indicators (RSI, MACD, Bollinger Bands), achieving reliable trend predictions with confidence intervals.",
    features: [
      "Price Forecasting",
      "Technical Analysis",
      "Trend Detection",
      "Visual Dashboard",
    ],
    type: "internal",
  },
  {
    id: "5",
    year: "2025",
    category: "MEDIA DEVELOPMENT",
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
];

export default function WorkDetail() {
  return <GenieWorld projects={PROJECTS} />;
}
