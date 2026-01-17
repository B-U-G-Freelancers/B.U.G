// src/pages/ProjectPage.jsx
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, Calendar, Tag } from "lucide-react";
import Header from "../components/layout/Header";

// Project data - in a real app this would come from an API or CMS
const PROJECTS = [
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

export default function ProjectPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Find project by ID
  const project = PROJECTS.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Project Not Found
          </h1>
          <Link to="/works" className="text-blue-400 hover:underline">
            ← Back to Works
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header isFixed />
      <main className="min-h-screen bg-black text-white">
        {/* Hero Image */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-10" />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />

          {/* Back Button */}
          <button
            onClick={() => navigate("/works")}
            className="absolute top-24 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Works
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-20 z-20">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-7xl mx-auto"
            >
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm font-medium tracking-widest text-blue-300/80 uppercase">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {project.year}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                <span className="flex items-center gap-1">
                  <Tag className="w-4 h-4" /> {project.category}
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4">
                {project.title}
              </h1>

              <p className="text-lg sm:text-xl text-white/70 max-w-2xl font-light leading-relaxed">
                {project.description}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-20 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-12">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-4">The Challenge</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">The Solution</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </motion.div>

              {/* Features */}
              {project.features && (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-10"
            >
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                    Role
                  </h4>
                  <p className="text-lg">{project.role}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                    Timeline
                  </h4>
                  <p className="text-lg">{project.timeline}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.split(", ").map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs rounded-full bg-white/10 text-blue-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {project.liveUrl && project.liveUrl !== "#" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  Visit Live Site
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
