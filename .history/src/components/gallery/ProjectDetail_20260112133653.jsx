// src/components/gallery/ProjectDetail.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function ProjectDetail({ project, onClose, isVisible }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    if (isVisible) {
      // Entrance animation
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
          onComplete: () => setIsAnimating(false),
        }
      );

      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      // Stagger in child elements
      gsap.fromTo(
        contentRef.current.querySelectorAll(".animate-in"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.3,
        }
      );
    }
  }, [isVisible]);

  const handleClose = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Exit animation
    gsap.to(contentRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.4,
      ease: "power3.in",
    });

    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.2,
      ease: "power3.in",
      onComplete: () => {
        setIsAnimating(false);
        onClose?.();
      },
    });
  };

  if (!project) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-bg-primary/95 backdrop-blur-sm overflow-y-auto"
      style={{ opacity: 0 }}
    >
      {/* Close button - fixed position */}
      <button
        onClick={handleClose}
        className="fixed top-6 left-6 z-50 flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 group"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div ref={contentRef} className="max-w-6xl mx-auto px-6 py-24 lg:px-12">
        {/* Hero Section */}
        <header className="mb-16 lg:mb-24">
          <div className="animate-in flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-accent mb-6">
            <span>{project.year || "2024"}</span>
            <span className="h-1 w-1 rounded-full bg-gray-700" />
            <span>{project.category || "PROJECT"}</span>
          </div>

          <h1 className="animate-in font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-8">
            {project.title}
          </h1>

          <p className="animate-in text-xl sm:text-2xl text-gray-400 max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </header>

        {/* Main Image */}
        <div className="animate-in relative aspect-video mb-16 lg:mb-24 rounded-2xl overflow-hidden bg-bg-secondary">
          <img
            src={project.image || project.src}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-bg-primary/40 to-transparent" />
        </div>

        {/* Project Details Grid */}
        <div className="animate-in grid md:grid-cols-3 gap-12 mb-16 lg:mb-24">
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
              Role
            </h3>
            <p className="text-lg text-white">
              {project.role || "Full-Stack Development"}
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
              Timeline
            </h3>
            <p className="text-lg text-white">
              {project.timeline || "3 months"}
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
              Tech Stack
            </h3>
            <p className="text-lg text-white">
              {project.tech || "React, Node.js, PostgreSQL"}
            </p>
          </div>
        </div>

        {/* Challenge & Solution */}
        {project.challenge && (
          <section className="animate-in mb-16 lg:mb-24">
            <h2 className="text-3xl font-bold text-white mb-6">
              The Challenge
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed max-w-4xl">
              {project.challenge}
            </p>
          </section>
        )}

        {project.solution && (
          <section className="animate-in mb-16 lg:mb-24">
            <h2 className="text-3xl font-bold text-white mb-6">Our Solution</h2>
            <p className="text-lg text-gray-400 leading-relaxed max-w-4xl">
              {project.solution}
            </p>
          </section>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="animate-in mb-16 lg:mb-24">
            <h2 className="text-3xl font-bold text-white mb-8">Gallery</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.gallery.map((img, i) => (
                <div
                  key={i}
                  className="aspect-video rounded-xl overflow-hidden bg-bg-secondary"
                >
                  <img
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <footer className="animate-in flex flex-col sm:flex-row items-center justify-center gap-4 pt-12 border-t border-white/10">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent-soft transition-colors"
            >
              <span>View Live Project</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
          <button
            onClick={handleClose}
            className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
          >
            Back to Works
          </button>
        </footer>
      </div>
    </div>
  );
}
