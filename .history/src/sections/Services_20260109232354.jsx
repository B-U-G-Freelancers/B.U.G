// src/sections/Services.jsx
import { Network, Layers, Terminal } from "lucide-react";

const SERVICES = [
  {
    id: "01",
    title: "Product Strategy",
    description:
      "Roadmapping, market fit analysis, and technical feasibility studies designed to reduce risk.",
    icon: Network,
  },
  {
    id: "02",
    title: "Interface Design",
    description:
      "High-fidelity prototyping and design systems that prioritize usability and implementation speed.",
    icon: Layers,
  },
  {
    id: "03",
    title: "Full-stack Engineering",
    description:
      "React, Node.js, Python, and scalable cloud architecture built to handle millions of users.",
    icon: Terminal,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 flex flex-col gap-4 border-l-2 border-accent pl-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-accent">
            Our Expertise
          </h2>
          <h3 className="text-4xl font-bold text-text-primary sm:text-5xl tracking-tight">
            Systematic scale.
          </h3>
        </div>

        <div className="grid gap-px bg-border-subtle sm:grid-cols-2 lg:grid-cols-3 border border-border-subtle rounded-2xl overflow-hidden shadow-2xl">
          {SERVICES.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="group relative flex flex-col gap-10 bg-bg-primary p-10 transition-all duration-500 hover:bg-bg-secondary"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs font-bold text-accent/60">
                    {service.id}
                  </span>
                  <IconComponent className="size-8 text-text-secondary group-hover:text-accent transition-colors group-hover:scale-110 duration-300" />
                </div>

                <div>
                  <h4 className="mb-4 text-2xl font-bold text-text-primary group-hover:text-accent transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-base leading-relaxed text-text-secondary">
                    {service.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-accent transition-all duration-500 group-hover:w-full"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
