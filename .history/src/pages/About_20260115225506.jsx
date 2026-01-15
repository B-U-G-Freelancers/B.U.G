// src/pages/About.jsx
// Premium About page with cinematic design
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Target, Sparkles, Code } from "lucide-react";
import {
  FloatingFragments,
  SceneParallax,
} from "../components/ui/FloatingElement";
import { Header } from "../components/layout/Header";

// System initialization sequence
function SystemInit({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [fading, setFading] = useState(false);
  const hasRun = useRef(false);

  const initLines = [
    { text: "SYS.BOOT", delay: 0 },
    { text: "LOADING IDENTITY...", delay: 200 },
    { text: "INITIALIZING STORY MODULE", delay: 400 },
    { text: "STATUS: READY", delay: 600 },
  ];

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    initLines.forEach((line) => {
      setTimeout(() => {
        setLines((prev) => [...prev, line.text]);
      }, line.delay);
    });

    setTimeout(() => setFading(true), 1200);
    setTimeout(() => onComplete(), 1800);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-700 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="font-mono text-xs text-white/60 space-y-2">
        {lines.map((line, i) => (
          <div
            key={i}
            className="tracking-widest uppercase animate-fade-in"
            style={{
              fontFamily: "'Space Grotesk', monospace",
              animationDelay: `${i * 0.2}s`,
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

// Value card component
function ValueCard({ icon: Icon, title, description, index }) {
  return (
    <div
      className="group p-6 rounded-lg border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500 animate-emerge"
      style={{ animationDelay: `${0.4 + index * 0.15}s` }}
    >
      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
      <h3
        className="text-lg font-semibold text-white mb-2"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {title}
      </h3>
      <p
        className="text-sm text-white/50 leading-relaxed"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {description}
      </p>
    </div>
  );
}

export default function About() {
  const [initialized, setInitialized] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const pageRef = useRef(null);

  useEffect(() => {
    if (initialized) {
      setTimeout(() => setContentVisible(true), 200);
    }
  }, [initialized]);

  // Parallax on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!pageRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      pageRef.current.style.setProperty("--parallax-x", `${x}px`);
      pageRef.current.style.setProperty("--parallax-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const values = [
    {
      icon: Sparkles,
      title: "Innovation First",
      description:
        "We push boundaries with cutting-edge technology and fresh perspectives to create digital experiences that stand out.",
    },
    {
      icon: Users,
      title: "Client Partnership",
      description:
        "We believe in true collaboration. Your vision drives our process, and together we create something exceptional.",
    },
    {
      icon: Target,
      title: "Results Driven",
      description:
        "Every pixel, every line of code serves a purpose. We measure success by the impact we create for your business.",
    },
    {
      icon: Code,
      title: "Craft & Quality",
      description:
        "We take pride in clean code, polished designs, and attention to detail that elevates every project.",
    },
  ];

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-black text-white relative overflow-hidden"
      style={{
        "--parallax-x": "0px",
        "--parallax-y": "0px",
      }}
    >
      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes emerge {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-emerge {
          opacity: 0;
          animation: emerge 1s cubic-bezier(0.33, 1, 0.68, 1) forwards;
        }
      `}</style>

      {/* System initialization */}
      {!initialized && <SystemInit onComplete={() => setInitialized(true)} />}

      {/* Floating background effect */}
      {initialized && <FloatingFragments count={10} />}

      {/* Atmospheric layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)",
          }}
        />

        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Fog layers */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            transform:
              "translate(calc(var(--parallax-x) * 0.5), calc(var(--parallax-y) * 0.5))",
          }}
        />
      </div>

      {/* Navigation */}
      {initialized && (
        <Link
          to="/"
          className="fixed top-6 left-6 z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 text-xs tracking-widest uppercase transition-all border border-white/10"
          style={{ fontFamily: "'Space Grotesk', monospace" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          HOME
        </Link>
      )}

      {/* Main content */}
      {contentVisible && (
        <SceneParallax
          strength={15}
          duration={0.5}
          className="relative z-10 pt-32 pb-24 px-6 max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-20">
            <div
              className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4 animate-emerge"
              style={{
                fontFamily: "'Space Grotesk', monospace",
                animationDelay: "0s",
              }}
            >
              WHO.WE.ARE
            </div>
            <h1
              className="text-5xl md:text-7xl font-semibold mb-6 animate-emerge"
              style={{
                fontFamily: "'Inter', sans-serif",
                animationDelay: "0.1s",
              }}
            >
              We Are B.U.G
            </h1>
            <p
              className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed animate-emerge"
              style={{
                fontFamily: "'Inter', sans-serif",
                animationDelay: "0.2s",
              }}
            >
              A collective of designers, developers, and dreamers crafting
              digital experiences that leave lasting impressions. We turn ideas
              into reality.
            </p>
          </div>

          {/* Story section */}
          <div
            className="mb-20 animate-emerge"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div
                  className="text-[10px] tracking-[0.2em] uppercase text-blue-400/70 mb-4"
                  style={{ fontFamily: "'Space Grotesk', monospace" }}
                >
                  OUR.STORY
                </div>
                <h2
                  className="text-3xl font-semibold mb-6"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Building Dreams Into Reality
                </h2>
                <div className="space-y-4 text-white/60 leading-relaxed">
                  <p>
                    B.U.G — Build Your Genie — was born from a simple belief:
                    technology should feel magical. Like a genie granting
                    wishes, we transform your ideas into digital realities that
                    exceed expectations.
                  </p>
                  <p>
                    Based in Chennai, we're a team of passionate creators who
                    blend cutting-edge technology with thoughtful design. From
                    stunning websites to complex applications, we craft
                    experiences that users love.
                  </p>
                  <p>
                    Our approach is simple: understand deeply, design
                    thoughtfully, build precisely. Every project is a journey we
                    take together with our clients.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/10 border border-white/10 flex items-center justify-center">
                  <div
                    className="text-[120px] font-bold text-white/5"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    B.U.G
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div
                className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              >
                OUR.VALUES
              </div>
              <h2
                className="text-3xl font-semibold"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                What Drives Us
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <ValueCard key={value.title} {...value} index={index} />
              ))}
            </div>
          </div>

          {/* CTA section */}
          <div className="text-center py-16">
            <div
              className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-6"
              style={{ fontFamily: "'Space Grotesk', monospace" }}
            >
              READY.TO.START
            </div>
            <h2
              className="text-3xl md:text-4xl font-semibold mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Let's Create Something Amazing
            </h2>
            <p
              className="text-white/50 max-w-md mx-auto mb-8"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Have a project in mind? We'd love to hear about it and explore how
              we can help bring your vision to life.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-xs tracking-widest uppercase transition-all border border-blue-500/30"
              style={{ fontFamily: "'Space Grotesk', monospace" }}
            >
              GET.IN.TOUCH
            </Link>
          </div>
        </SceneParallax>
      )}

      {/* Bottom gradient fade */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
    </div>
  );
}
