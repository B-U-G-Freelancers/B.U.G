// src/pages/TemplatesPage.jsx
// Premium cinematic Templates page
// Uses CSS animations for reliability
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  X,
  Monitor,
  Tablet,
  Smartphone,
  Sparkles,
  Layout,
  ShoppingBag,
  Briefcase,
  Zap,
} from "lucide-react";
import {
  FloatingFragments,
  SceneParallax,
} from "../components/ui/FloatingElement";
import { Header } from "../components/layout/Header";

// Template showcase data - B.U.G branded templates with Bento Grid config
const TEMPLATES = [
  {
    id: "genie-starter",
    name: "Genie Starter",
    category: "LANDING.PAGE",
    description:
      "Clean, minimal landing page perfect for startups and personal brands.",
    image: "/templates/1st template/screen.png",
    codeUrl: "/templates/1st template/code.html",
    tier: "Essential",
    features: ["Responsive", "Contact Form", "SEO Ready"],
    gridClass: "md:col-span-2 md:row-span-2", // Large Feature
    type: "large",
  },
  {
    id: "genie-studio",
    name: "Genie Studio",
    category: "PORTFOLIO",
    description: "Creative portfolio template with smooth animations.",
    image: "/templates/2nd template/screen.png",
    codeUrl: "/templates/2nd template/code.html",
    tier: "Essential",
    features: ["Gallery", "Animations"],
    gridClass: "md:col-span-1 md:row-span-1", // Standard
    type: "standard",
  },
  {
    id: "genie-commerce",
    name: "Genie Commerce",
    category: "E-COMMERCE",
    description: "Full-featured online store with cart flow.",
    image: "/templates/3rd template/screen.png",
    codeUrl: "/templates/3rd template/code.html",
    tier: "Professional",
    features: ["Product Grid", "Cart"],
    gridClass: "md:col-span-1 md:row-span-2", // Tall
    type: "tall",
  },
  {
    id: "genie-corporate",
    name: "Genie Corporate",
    category: "BUSINESS",
    description: "Professional business website with services.",
    image: "/templates/4th template/screen.png",
    codeUrl: "/templates/4th template/code.html",
    tier: "Professional",
    features: ["Multi-page", "CMS Ready"],
    gridClass: "md:col-span-1 md:row-span-1", // Standard
    type: "standard",
  },
  {
    id: "genie-agency",
    name: "Genie Agency",
    category: "AGENCY",
    description: "Premium agency template with case studies and testimonials.",
    image: "/templates/5th template/screen.png",
    codeUrl: "/templates/5th template/code.html",
    tier: "Enterprise",
    features: ["Case Studies", "Premium Animations", "Dashboard"],
    gridClass: "md:col-span-2 md:row-span-1", // Wide
    type: "wide",
  },
  {
    id: "genie-starter-pro",
    name: "Genie Starter Pro",
    category: "LANDING.PAGE",
    description: "Enhanced landing page with advanced sections.",
    image: "/templates/1st template copy/screen.png",
    codeUrl: "/templates/1st template copy/code.html",
    tier: "Essential",
    features: ["Animations", "Multi-Section"],
    gridClass: "md:col-span-1 md:row-span-1",
    type: "standard",
  },
  {
    id: "genie-studio-pro",
    name: "Genie Studio Pro",
    category: "PORTFOLIO",
    description: "Premium portfolio with lightbox gallery.",
    image: "/templates/2nd template copy/screen.png",
    codeUrl: "/templates/2nd template copy/code.html",
    tier: "Professional",
    features: ["Filters", "Lightbox"],
    gridClass: "md:col-span-1 md:row-span-1",
    type: "standard",
  },
  {
    id: "genie-commerce-pro",
    name: "Genie Commerce Pro",
    category: "E-COMMERCE",
    description: "Advanced e-commerce with inventory management and dashboard.",
    image: "/templates/3rd template copy/screen.png",
    codeUrl: "/templates/3rd template copy/code.html",
    tier: "Enterprise",
    features: ["Dashboard", "Inventory", "Analytics"],
    gridClass: "md:col-span-2 md:row-span-2", // Large
    type: "large",
  },
  {
    id: "genie-corporate-pro",
    name: "Genie Corporate Pro",
    category: "BUSINESS",
    description: "Enterprise business platform.",
    image: "/templates/4th template copy/page 1/screen.png",
    codeUrl: "/templates/4th template copy/page1/code.html",
    tier: "Enterprise",
    features: ["Integrations", "Admin Panel"],
    gridClass: "md:col-span-1 md:row-span-1",
    type: "standard",
  },
  {
    id: "genie-agency-pro",
    name: "Genie Agency Pro",
    category: "AGENCY",
    description: "Full agency suite with client portal and project management.",
    image: "/templates/5th template copy/page 2/screen.png",
    codeUrl: "/templates/5th template copy/page 2/code.html",
    tier: "Enterprise",
    features: ["Client Portal", "Project Tracking"],
    gridClass: "md:col-span-3 md:row-span-1", // Full Width
    type: "wide",
  },
];

// System initialization sequence
function SystemInit({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [fading, setFading] = useState(false);
  const hasRun = useRef(false);

  const initLines = [
    { text: "SYS.BOOT", delay: 0 },
    { text: "LOADING ENVIRONMENT...", delay: 200 },
    { text: "INITIALIZING DISPLAY MATRIX", delay: 400 },
    { text: "CALIBRATING VISUAL LAYER", delay: 600 },
    { text: "STATUS: READY", delay: 800 },
  ];

  useEffect(() => {
    // Prevent double execution in StrictMode
    if (hasRun.current) return;
    hasRun.current = true;

    // Show lines one by one
    initLines.forEach((line) => {
      setTimeout(() => {
        setLines((prev) => [...prev, line.text]);
      }, line.delay);
    });

    // Start fade out
    setTimeout(() => setFading(true), 1500);

    // Complete
    setTimeout(() => onComplete(), 2200);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-700 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ backgroundColor: "#0b0d10" }}
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

// System status bar
function SystemStatus() {
  const [uptime, setUptime] = useState("00:00:00");

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const hours = String(Math.floor(elapsed / 3600)).padStart(2, "0");
      const mins = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
      const secs = String(elapsed % 60).padStart(2, "0");
      setUptime(`${hours}:${mins}:${secs}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-white/30"
      style={{ fontFamily: "'Space Grotesk', monospace" }}
    >
      <div className="flex items-center gap-8">
        <span>SYS.ONLINE</span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3a7cff] animate-pulse" />
          SIGNAL.ACTIVE
        </span>
      </div>
      <div className="flex items-center gap-8">
        <span>UPTIME: {uptime}</span>
        <span>LAT 13.04° N</span>
      </div>
    </div>
  );
}

// Template preview modal with device size toggles
function TemplatePreviewModal({ template, onClose }) {
  const [deviceSize, setDeviceSize] = useState("desktop");

  const deviceSizes = {
    desktop: { width: "100%", label: "Desktop", icon: Monitor },
    tablet: { width: "768px", label: "Tablet", icon: Tablet },
    mobile: { width: "375px", label: "Mobile", icon: Smartphone },
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#0b0d10]/95 backdrop-blur-sm">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-[#0b0d10] to-transparent">
        {/* Template info */}
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all border border-white/5"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <div
              className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1"
              style={{ fontFamily: "'Space Grotesk', monospace" }}
            >
              {template.category}
            </div>
            <h2
              className="text-white text-lg font-semibold"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {template.name}
            </h2>
          </div>
        </div>

        {/* Device toggles */}
        <div className="flex items-center gap-2">
          {Object.entries(deviceSizes).map(([key, { label, icon: Icon }]) => (
            <button
              key={key}
              onClick={() => setDeviceSize(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all border ${
                deviceSize === key
                  ? "bg-[#3a7cff]/20 text-[#3a7cff] border-[#3a7cff]/30"
                  : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10"
              }`}
              style={{ fontFamily: "'Space Grotesk', monospace" }}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Iframe container */}
      <div className="h-full w-full flex items-center justify-center pt-24 pb-8 px-6">
        <div
          className="h-full bg-white rounded-lg overflow-hidden shadow-2xl transition-all duration-500 border border-white/10"
          style={{
            width: deviceSizes[deviceSize].width,
            maxWidth: "100%",
          }}
        >
          <iframe
            src={template.codeUrl}
            title={template.name}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>

      {/* Footer hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <span
          className="text-[10px] tracking-wider uppercase text-white/30"
          style={{ fontFamily: "'Space Grotesk', monospace" }}
        >
          Press ESC to close
        </span>
      </div>
    </div>
  );
}

// Bento Grid Template Card
function TemplateCard({ template, index, onPreview }) {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = (category) => {
    if (category.includes("LANDING")) return <Layout className="w-3 h-3" />;
    if (category.includes("COMMERCE"))
      return <ShoppingBag className="w-3 h-3" />;
    if (category.includes("PORTFOLIO")) return <Sparkles className="w-3 h-3" />;
    if (category.includes("BUSINESS")) return <Briefcase className="w-3 h-3" />;
    if (category.includes("AGENCY")) return <Zap className="w-3 h-3" />;
    return <Layout className="w-3 h-3" />;
  };

  // Determine flex direction based on type
  const isWide = template.type === "wide";
  const containerClasses = `h-full flex flex-col ${
    isWide ? "md:flex-row" : ""
  }`;

  // Determine image container sizing
  const imageContainerClasses = `relative overflow-hidden ${
    template.type === "large"
      ? "h-[300px] md:h-[60%] w-full"
      : isWide
      ? "h-[200px] md:h-full md:w-1/2"
      : template.type === "tall"
      ? "h-[60%] w-full"
      : "h-[200px] w-full"
  }`;

  // Determine content container sizing
  const contentContainerClasses = `p-6 flex flex-col justify-between relative z-10 ${
    template.type === "large"
      ? "h-auto md:h-[40%] border-t border-white/[0.06]"
      : isWide
      ? "h-auto md:h-full md:w-1/2 border-t md:border-t-0 md:border-l border-white/[0.06]"
      : template.type === "tall"
      ? "h-[40%] border-t border-white/[0.06]"
      : "flex-1 border-t border-white/[0.06]"
  }`;

  return (
    <div
      className={`group relative rounded-2xl border border-white/[0.08] bg-[#0b0d10] overflow-hidden transition-all duration-500 animate-emerge hover:border-[#3a7cff]/50 hover:shadow-[0_0_30px_-5px_rgba(58,124,255,0.15)] ${template.gridClass}`}
      style={{ animationDelay: `${0.1 + index * 0.05}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Layout Container */}
      <div className={containerClasses}>
        {/* Visual Section */}
        <div className={imageContainerClasses}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] to-transparent z-10 opacity-60 md:opacity-40 transition-opacity duration-500 group-hover:opacity-20" />
          <img
            src={template.image}
            alt={template.name}
            className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          />

          {/* Action Overlay */}
          <div
            className={`absolute inset-0 z-20 flex items-center justify-center gap-3 transition-all duration-300 ${
              isHovered
                ? "opacity-100 backdrop-blur-sm bg-black/40"
                : "opacity-0"
            }`}
          >
            <button
              onClick={() => onPreview(template)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-[#3a7cff] hover:text-white font-medium text-xs tracking-widest uppercase transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
          </div>

          {/* Tier Badge */}
          <div className="absolute top-3 right-3 z-20">
            <span
              className={`px-2.5 py-1 rounded text-[9px] tracking-wider uppercase font-medium border backdrop-blur-md ${
                template.tier === "Enterprise"
                  ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                  : template.tier === "Professional"
                  ? "bg-[#3a7cff]/10 text-[#3a7cff] border-[#3a7cff]/20"
                  : "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
              }`}
              style={{ fontFamily: "'Space Grotesk', monospace" }}
            >
              {template.tier}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className={contentContainerClasses}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded bg-white/5 text-white/60">
                {getIcon(template.category)}
              </div>
              <span
                className="text-[9px] tracking-[0.2em] uppercase text-white/40"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              >
                {template.category}
              </span>
            </div>

            <h3
              className={`font-semibold text-white mb-2 leading-tight ${
                template.type === "large" ? "text-2xl" : "text-lg"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {template.name}
            </h3>

            <p
              className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {template.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-dashed border-white/10">
            {template.features
              .slice(0, template.type === "standard" ? 2 : 4)
              .map((feature, i) => (
                <span
                  key={i}
                  className="text-[10px] text-white/40 bg-white/[0.03] px-2 py-1 rounded"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {feature}
                </span>
              ))}
            {template.features.length >
              (template.type === "standard" ? 2 : 4) && (
              <span className="text-[10px] text-white/30 px-1 py-1">+</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main page
export default function TemplatesPage() {
  const [initialized, setInitialized] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);
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

  return (
    <div
      ref={pageRef}
      className="min-h-screen relative overflow-hidden selection:bg-[#3a7cff] selection:text-white"
      style={{
        backgroundColor: "#0b0d10",
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
          from { opacity: 0; transform: translateY(40px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-emerge {
          opacity: 0;
          animation: emerge 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* System initialization */}
      {!initialized && <SystemInit onComplete={() => setInitialized(true)} />}

      {/* System status bar */}
      {initialized && <SystemStatus />}

      {/* Floating background effect - Optimized */}
      {initialized && <FloatingFragments count={8} />}

      {/* Atmospheric layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 0%, #0b0d10 100%)",
          }}
        />

        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Ambient Glows using Brand Accent */}
        <div
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
          style={{
            background: "#3a7cff",
            transform:
              "translate(calc(var(--parallax-x) * 0.5), calc(var(--parallax-y) * 0.5))",
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-15"
          style={{
            background: "#243a6e",
            transform:
              "translate(calc(var(--parallax-x) * -0.5), calc(var(--parallax-y) * -0.5))",
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform:
              "translate(calc(var(--parallax-x) * 0.2), calc(var(--parallax-y) * 0.2))",
          }}
        />
      </div>

      {/* Navigation - Header */}
      {initialized && <Header isFixed />}

      {/* Main content */}
      {contentVisible && (
        <SceneParallax
          strength={10}
          duration={0.5}
          className="relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-20 mt-">
            <h1
              className="text-5xl md:text-8xl font-semibold mb-6 animate-emerge tracking-tight text-white"
              style={{
                fontFamily: "'Inter', sans-serif",
                animationDelay: "0s",
              }}
            >
              Genie Lab
            </h1>
            <p
              className="text-lg text-white/50 max-w-xl mx-auto leading-relaxed animate-emerge"
              style={{
                fontFamily: "'Inter', sans-serif",
                animationDelay: "0.2s",
              }}
            >
              Premium templates crafted by B.U.G. Choose your foundation and let
              us build your reality.
            </p>
          </div>

          {/* Filter / Label */}
          <div
            className="flex items-center justify-between mb-8 animate-emerge border-b border-white/5 pb-4"
            style={{ animationDelay: "0.3s" }}
          >
            <span
              className="text-[10px] tracking-[0.3em] uppercase text-white/30"
              style={{ fontFamily: "'Space Grotesk', monospace" }}
            >
              / ARCHIVE.01
            </span>
            <div
              className="flex gap-4 text-[10px] tracking-[0.2em] uppercase text-white/30"
              style={{ fontFamily: "'Space Grotesk', monospace" }}
            >
              <span>{TEMPLATES.length} EXPERIENCES</span>
            </div>
          </div>

          {/* BENTO GRID LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(280px,auto)] mb-24">
            {TEMPLATES.map((template, index) => (
              <TemplateCard
                key={template.id}
                template={template}
                index={index}
                onPreview={setPreviewTemplate}
              />
            ))}
          </div>

          {/* Subtle divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

          {/* Get a Quote CTA */}
          <div
            className="relative rounded-2xl overflow-hidden animate-emerge"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="absolute inset-0 bg-blue-600/5"></div>
            <div className="relative text-center py-20 px-6 border border-white/5 rounded-2xl bg-[#0b0d10]/50 backdrop-blur-sm">
              <div
                className="text-[10px] tracking-[0.3em] uppercase text-[#3a7cff] mb-6"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              >
                READY.TO.START
              </div>
              <h2
                className="text-3xl md:text-5xl font-semibold mb-6"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Need something unique?
              </h2>
              <p
                className="text-white/50 max-w-md mx-auto mb-10 text-lg"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Every project is a new universe. Let's create something that has
                never been seen before.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#3a7cff] text-white text-xs tracking-[0.15em] uppercase transition-all hover:bg-[#3a7cff]/80 hover:scale-105 shadow-[0_0_40px_-10px_rgba(58,124,255,0.4)]"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              >
                INITIATE PROJECT
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </SceneParallax>
      )}

      {/* Bottom gradient fade */}
      <div className="fixed bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0b0d10] to-transparent pointer-events-none z-20" />

      {/* Template preview modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
        />
      )}
    </div>
  );
}
