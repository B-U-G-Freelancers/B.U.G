import React from "react";
import { Link } from "react-router-dom";

// --- Constants ---
const PROJECTS = [
  {
    id: "1",
    year: "2024",
    category: "FINTECH",
    subcategory: "BACKEND",
    title: "Nebula Finance",
    description:
      "Re-architected the core transaction engine to reduce latency by 400ms, enabling real-time high-frequency trading for institutional clients.",
  },
  {
    id: "2",
    year: "2023",
    category: "HEALTHCARE",
    subcategory: "MOBILE",
    title: "Aether Health",
    description:
      "Built a HIPAA-compliant telehealth infrastructure capable of scaling to 50k concurrent patients with zero downtime during peak hours.",
  },
  {
    id: "3",
    year: "2024",
    category: "AI / SAAS",
    subcategory: "R&D",
    title: "Velocity AI",
    description:
      "Integrated proprietary LLM models for automated customer support, reducing human agent workload by 65% while increasing resolution accuracy.",
  },
  {
    id: "4",
    year: "2022",
    category: "AUTOMOTIVE",
    subcategory: "EMBEDDED",
    title: "Flux Drive",
    description:
      "Developed the OS middleware for next-gen EV dashboards, optimizing touch response rates and battery consumption metrics.",
  },
];

// --- Components ---

const Hero = () => {
  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="flex flex-col gap-8">
        <h1 className="font-display text-7xl font-black uppercase leading-[0.85] tracking-tighter text-white sm:text-8xl lg:text-[10rem]">
          Selected <br />
          <span className="text-gray-900/80 drop-shadow-[0_0_1px_rgba(255,255,255,0.1)] transition-colors hover:text-gray-800">
            Works
          </span>
        </h1>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <div className="h-[2px] w-12 bg-accent"></div>
          <p className="text-lg font-normal text-gray-400">
            Engineering digital wishes into reality.
          </p>
        </div>
      </div>
    </section>
  );
};

const ProjectItem = ({ project }) => {
  return (
    <div className="group relative flex flex-col gap-8 border-t border-white/10 py-16 transition-all hover:bg-white/[0.02] sm:flex-row sm:justify-between sm:gap-12 lg:px-8">
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
          <span>{project.year}</span>
          <span className="h-1 w-1 rounded-full bg-gray-700"></span>
          <span>{project.category}</span>
          <span className="h-1 w-1 rounded-full bg-gray-700"></span>
          <span>{project.subcategory}</span>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-display text-4xl font-bold tracking-tighter text-white transition-colors group-hover:text-accent sm:text-6xl">
            {project.title}
          </h3>
          <p className="max-w-2xl text-lg leading-relaxed text-gray-400 group-hover:text-gray-300">
            {project.description}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-start pt-2">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 text-white transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-white group-hover:rotate-[-45deg]">
          <span
            className="material-symbols-outlined font-light"
            style={{ fontSize: "28px" }}
          >
            arrow_outward
          </span>
        </div>
      </div>
    </div>
  );
};

const WorkDetail = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-12">
      <Hero />

      <section id="works" className="flex flex-col pb-32">
        {PROJECTS.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}

        <div className="mt-24 border-t border-white/10 pt-32 text-center pb-20">
          <p className="mb-8 text-[11px] font-bold uppercase tracking-[0.3em] text-gray-500">
            Ready to build?
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-4 rounded-xl bg-white px-10 py-5 text-lg font-bold text-black transition-all hover:bg-accent hover:text-white active:scale-95"
          >
            <span>Start Your Project</span>
            <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1">
              arrow_forward
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WorkDetail;
