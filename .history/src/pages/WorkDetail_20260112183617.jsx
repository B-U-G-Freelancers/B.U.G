// src/pages/WorkDetail.jsx
// Orchestrates the Neptune Globe → Dome Gallery experience
import { useState, useCallback } from "react";
import EarthGlobe from "../components/gallery/EarthGlobe";
import DomeWorld from "../components/gallery/DomeWorld";
import ProjectDetail from "../components/gallery/ProjectDetail";

// Experience states (simplified - no burst transition for now)
const STATES = {
  INTRO: "intro",
  GALLERY: "gallery",
};

// Project data with images for the gallery
const PROJECTS = [
  {
    id: "1",
    year: "2024",
    category: "FINTECH",
    subcategory: "BACKEND",
    title: "Nebula Finance",
    description:
      "Re-architected the core transaction engine to reduce latency by 400ms, enabling real-time high-frequency trading for institutional clients.",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop",
    role: "Full-Stack Development",
    timeline: "4 months",
    tech: "Node.js, PostgreSQL, Redis, WebSocket",
    challenge:
      "The existing transaction engine was built on a monolithic architecture that couldn't handle the increasing volume of trades during peak hours, causing significant latency issues.",
    solution:
      "We redesigned the system using a microservices architecture with Redis-based caching and WebSocket connections for real-time data streaming, reducing latency from 600ms to under 200ms.",
  },
  {
    id: "2",
    year: "2023",
    category: "HEALTHCARE",
    subcategory: "MOBILE",
    title: "Aether Health",
    description:
      "Built a HIPAA-compliant telehealth infrastructure capable of scaling to 50k concurrent patients with zero downtime during peak hours.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
    role: "Backend & Infrastructure",
    timeline: "6 months",
    tech: "React Native, AWS, HIPAA-compliant infrastructure",
    challenge:
      "Healthcare providers needed a reliable telehealth platform that could handle surge capacity during the pandemic while maintaining strict HIPAA compliance.",
    solution:
      "We implemented auto-scaling infrastructure with end-to-end encryption, achieving 99.99% uptime and successfully handling 50k+ concurrent sessions.",
  },
  {
    id: "3",
    year: "2024",
    category: "AI / SAAS",
    subcategory: "R&D",
    title: "Velocity AI",
    description:
      "Integrated proprietary LLM models for automated customer support, reducing human agent workload by 65% while increasing resolution accuracy.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    role: "AI/ML Engineering",
    timeline: "5 months",
    tech: "Python, LangChain, OpenAI, Vector DB",
    challenge:
      "Customer support teams were overwhelmed with repetitive queries, leading to long wait times and inconsistent responses.",
    solution:
      "We fine-tuned LLM models on company-specific data and built an intelligent routing system that handles 65% of queries automatically with 94% accuracy.",
  },
  {
    id: "4",
    year: "2022",
    category: "AUTOMOTIVE",
    subcategory: "EMBEDDED",
    title: "Flux Drive",
    description:
      "Developed the OS middleware for next-gen EV dashboards, optimizing touch response rates and battery consumption metrics.",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&auto=format&fit=crop",
    role: "Embedded Systems",
    timeline: "8 months",
    tech: "C++, Qt, Linux Embedded, CAN Bus",
    challenge:
      "Traditional automotive dashboards had sluggish touch response and consumed significant battery power, impacting EV range.",
    solution:
      "We developed a lightweight middleware layer with predictive touch algorithms and power-efficient rendering, achieving 60fps response with 40% less power consumption.",
  },
  {
    id: "5",
    year: "2024",
    category: "E-COMMERCE",
    subcategory: "FULL-STACK",
    title: "Luxe Market",
    description:
      "Built a headless commerce platform for luxury brands with AR product visualization and personalized shopping experiences.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    role: "Technical Lead",
    timeline: "7 months",
    tech: "Next.js, Shopify Hydrogen, Three.js, AR Kit",
  },
  {
    id: "6",
    year: "2023",
    category: "EDTECH",
    subcategory: "PLATFORM",
    title: "LearnFlow",
    description:
      "Created an adaptive learning platform that uses AI to personalize curriculum paths for 500k+ students worldwide.",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop",
    role: "Platform Architecture",
    timeline: "10 months",
    tech: "React, Python, TensorFlow, GraphQL",
  },
];

export default function WorkDetail() {
  const [currentState, setCurrentState] = useState(STATES.INTRO);
  const [selectedProject, setSelectedProject] = useState(null);

  // Handle CTA click from Earth Globe
  const handleEnterExperience = useCallback(() => {
    setCurrentState(STATES.BURSTING);
  }, []);

  // Handle burst transition complete
  const handleBurstComplete = useCallback(() => {
    setCurrentState(STATES.GALLERY);
  }, []);

  // Handle project click from dome
  const handleProjectClick = useCallback((project, index) => {
    setSelectedProject(PROJECTS[index % PROJECTS.length]);
  }, []);

  // Handle project detail close
  const handleClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <>
      {/* Phase 1: Earth Globe Intro */}
      {currentState === STATES.INTRO && (
        <EarthGlobe onEnter={handleEnterExperience} projects={PROJECTS} />
      )}

      {/* Phase 2: Burst Transition */}
      {currentState === STATES.BURSTING && (
        <BurstTransition
          onComplete={handleBurstComplete}
          projectCount={PROJECTS.length}
        />
      )}

      {/* Phase 3: Dome Gallery */}
      {currentState === STATES.GALLERY && (
        <DomeWorld
          projects={PROJECTS}
          onProjectClick={handleProjectClick}
          overlayBlurColor="#060010"
        />
      )}

      {/* Project Detail Overlay */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={handleClose}
          isVisible={true}
        />
      )}
    </>
  );
}
