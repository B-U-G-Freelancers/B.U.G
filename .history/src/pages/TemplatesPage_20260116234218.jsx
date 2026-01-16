// src/pages/TemplatesPage.jsx
// Premium Templates Showcase with Device Mockups, Parallax Scroll & Floating Animations
import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Eye, X, Monitor, Tablet, Smartphone } from "lucide-react";
import {
  PhoneMockup,
  TabletMockup,
  LaptopMockup,
  BrowserMockup,
} from "../components/ui/DeviceMockup";
import { Header } from "../components/layout/Header";

// Template showcase data with device configurations
// Visual Hierarchy Layout (5-column grid):
// Row 1-2: laptop(2) + phone(1) + browser(2) = 5  [Hero row]
// Row 3-4: tablet(2) + phone(1) + tablet(2) = 5   [Tablets flanking phone]
// Row 5-6: phone(1) + laptop(2) + browser(2) = 5  [Inverted pattern]
// Row 7-8: browser(3) + phone(2) = 5              [Featured finale]
const TEMPLATES = [
  // === ROW 1-2: Hero Row - laptop + phone + browser ===
  {
    id: "genie-starter",
    name: "Genie Starter",
    category: "LANDING.PAGE",
    description: "Clean, minimal landing page perfect for startups.",
    image: "/templates/1st template/screen.png",
    codeUrl: "/templates/1st template/code.html",
    tier: "Essential",
    device: "laptop",
    gridClass:
      "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 row-span-2",
    rotation: { x: 8, y: -5 },
    parallaxSpeed: 0.3,
    floatDelay: 0,
    floatDuration: 6,
  },
  {
    id: "genie-studio",
    name: "Genie Studio",
    category: "PORTFOLIO",
    description: "Creative portfolio with smooth animations.",
    image: "/templates/2nd template/screen.png",
    codeUrl: "/templates/2nd template/code.html",
    tier: "Essential",
    device: "phone",
    gridClass: "col-span-1 row-span-1 sm:row-span-2",
    rotation: { x: 5, y: 10 },
    parallaxSpeed: 0.5,
    floatDelay: 1,
    floatDuration: 5,
  },
  {
    id: "genie-new",
    name: "Genie New",
    category: "CREATIVE",
    description: "Fresh new creative template.",
    image: "/templates/new template/screen.png",
    codeUrl: "/templates/new template/code.html",
    tier: "Professional",
    device: "browser",
    gridClass:
      "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 row-span-2",
    rotation: { x: 4, y: -6 },
    parallaxSpeed: 0.4,
    floatDelay: 1.5,
    floatDuration: 6,
  },

  // === ROW 3-4: Tablets flanking phone ===
  {
    id: "genie-corporate",
    name: "Genie Corporate",
    category: "BUSINESS",
    description: "Professional business website.",
    image: "/templates/4th template/screen.png",
    codeUrl: "/templates/4th template/code.html",
    tier: "Professional",
    device: "tablet",
    gridClass:
      "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 row-span-2",
    rotation: { x: 10, y: 5 },
    parallaxSpeed: 0.2,
    floatDelay: 0.5,
    floatDuration: 8,
  },
  {
    id: "genie-commerce",
    name: "Genie Commerce",
    category: "E-COMMERCE",
    description: "Full-featured online store.",
    image: "/templates/3rd template/screen.png",
    codeUrl: "/templates/3rd template/code.html",
    tier: "Professional",
    device: "phone",
    gridClass: "col-span-1 row-span-1 sm:row-span-2",
    rotation: { x: -5, y: -8 },
    parallaxSpeed: 0.7,
    floatDelay: 2,
    floatDuration: 7,
  },
  {
    id: "genie-studio-pro",
    name: "Genie Studio Pro",
    category: "PORTFOLIO",
    description: "Premium portfolio.",
    image: "/templates/2nd template copy/screen.png",
    codeUrl: "/templates/2nd template copy/code.html",
    tier: "Professional",
    device: "tablet",
    gridClass:
      "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 row-span-2",
    rotation: { x: 5, y: -10 },
    parallaxSpeed: 0.25,
    floatDelay: 0.8,
    floatDuration: 7,
  },

  // === ROW 5-6: Inverted pattern - phone + laptop + browser ===
  {
    id: "genie-starter-pro",
    name: "Genie Starter Pro",
    category: "LANDING.PAGE",
    description: "Enhanced landing page.",
    image: "/templates/1st template copy/screen.png",
    codeUrl: "/templates/1st template copy/code.html",
    tier: "Essential",
    device: "phone",
    gridClass: "col-span-1 row-span-1 sm:row-span-2",
    rotation: { x: -8, y: 12 },
    parallaxSpeed: 0.6,
    floatDelay: 2.5,
    floatDuration: 5.5,
  },
  {
    id: "genie-commerce-pro",
    name: "Genie Commerce Pro",
    category: "E-COMMERCE",
    description: "Advanced e-commerce platform.",
    image: "/templates/3rd template copy/screen.png",
    codeUrl: "/templates/3rd template copy/code.html",
    tier: "Enterprise",
    device: "laptop",
    gridClass:
      "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 row-span-2",
    rotation: { x: -5, y: 8 },
    parallaxSpeed: 0.35,
    floatDelay: 1.2,
    floatDuration: 6.5,
  },
  {
    id: "genie-agency",
    name: "Genie Agency",
    category: "AGENCY",
    description: "Premium agency template.",
    image: "/templates/5th template/screen.png",
    codeUrl: "/templates/5th template/code.html",
    tier: "Enterprise",
    device: "browser",
    gridClass:
      "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 row-span-2",
    rotation: { x: 3, y: -3 },
    parallaxSpeed: 0.4,
    floatDelay: 1.5,
    floatDuration: 6,
  },

  // === ROW 7-8: Featured finale - wide browser + phone ===
  {
    id: "genie-agency-pro",
    name: "Genie Agency Pro",
    category: "AGENCY",
    description: "Full agency suite.",
    image: "/templates/5th template copy/page 2/screen.png",
    codeUrl: "/templates/5th template copy/page 2/code.html",
    tier: "Enterprise",
    device: "browser",
    gridClass:
      "col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-3 row-span-2",
    rotation: { x: 2, y: 2 },
    parallaxSpeed: 0.45,
    floatDelay: 1.8,
    floatDuration: 7.5,
  },
  {
    id: "genie-corporate-pro",
    name: "Genie Corporate Pro",
    category: "BUSINESS",
    description: "Enterprise business platform.",
    image: "/templates/4th template copy/page 1/screen.png",
    codeUrl: "/templates/4th template copy/page1/code.html",
    tier: "Enterprise",
    device: "tablet",
    gridClass:
      "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 row-span-2",
    rotation: { x: 10, y: -5 },
    parallaxSpeed: 0.55,
    floatDelay: 3,
    floatDuration: 5,
  },
];

// Template preview modal with device size toggles
function TemplatePreviewModal({ template, onClose }) {
  const [deviceSize, setDeviceSize] = useState("desktop");

  const deviceSizes = {
    desktop: { width: "100%", label: "Desktop", icon: Monitor },
    tablet: { width: "768px", label: "Tablet", icon: Tablet },
    mobile: { width: "375px", label: "Mobile", icon: Smartphone },
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#0b0d10]/95 backdrop-blur-md">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-[#0b0d10] to-transparent">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all border border-white/5"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1 font-mono">
              {template.category}
            </div>
            <h2 className="text-white text-lg font-semibold">
              {template.name}
            </h2>
          </div>
        </div>

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
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

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

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <span className="text-[10px] tracking-wider uppercase text-white/30 font-mono">
          Press ESC to close
        </span>
      </div>
    </div>
  );
}

// Device Card Component with Parallax and Floating Animation
function DeviceCard({ template, index, onPreview, scrollY }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  const tierColors = {
    Essential: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    Professional: "bg-[#3a7cff]/10 text-[#3a7cff] border-[#3a7cff]/20",
    Enterprise: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  };

  // Calculate parallax offset based on scroll position
  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const centerY = window.innerHeight / 2;
      const cardCenterY = rect.top + rect.height / 2;
      const distanceFromCenter = cardCenterY - centerY;
      const parallaxOffset =
        distanceFromCenter * (template.parallaxSpeed || 0.3) * 0.1;
      setOffsetY(parallaxOffset);
    }
  }, [scrollY, template.parallaxSpeed]);

  const renderDevice = () => {
    const commonProps = {
      src: template.image,
      alt: template.name,
      className: "w-full h-auto max-h-full",
    };

    switch (template.device) {
      case "phone":
        return <PhoneMockup {...commonProps} />;
      case "tablet":
        return <TabletMockup {...commonProps} />;
      case "laptop":
        return <LaptopMockup {...commonProps} />;
      case "browser":
        return <BrowserMockup {...commonProps} url={`${template.id}.genie`} />;
      default:
        return <PhoneMockup {...commonProps} />;
    }
  };

  return (
    <div
      ref={cardRef}
      className={`group relative ${template.gridClass} flex items-center justify-center p-4 md:p-6 transition-opacity duration-700 animate-float-in`}
      style={{
        animationDelay: `${0.1 + index * 0.08}s`,
        perspective: "1000px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Device Container with 3D Transform, Parallax & Floating */}
      <div
        className="relative cursor-pointer"
        style={{
          transform: isHovered
            ? `translateY(${offsetY}px) rotateX(0deg) rotateY(0deg) scale(1.05)`
            : `translateY(${offsetY}px) rotateX(${
                template.rotation?.x || 0
              }deg) rotateY(${template.rotation?.y || 0}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          animation: `float ${template.floatDuration || 6}s ease-in-out ${
            template.floatDelay || 0
          }s infinite`,
        }}
        onClick={() => onPreview(template)}
      >
        {/* Device Mockup */}
        {renderDevice()}

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center rounded-2xl transition-all duration-300 ${
            isHovered ? "opacity-100 bg-black/40 backdrop-blur-sm" : "opacity-0"
          }`}
        >
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-[#3a7cff] hover:text-white font-medium text-xs tracking-widest uppercase transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <Eye className="w-4 h-4" />
            Preview
          </button>
        </div>

        {/* Floating Label */}
        <div
          className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-[#0b0d10]/90 backdrop-blur-sm border border-white/10 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <span className="text-[10px] font-medium text-white/80 tracking-wider uppercase whitespace-nowrap">
            {template.name}
          </span>
        </div>

        {/* Tier Badge */}
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded text-[8px] tracking-wider uppercase font-medium border backdrop-blur-md ${
            tierColors[template.tier]
          }`}
        >
          {template.tier}
        </div>

        {/* Glow Effect on Hover */}
        <div
          className={`absolute inset-0 -z-10 rounded-3xl transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(circle, rgba(58,124,255,0.3) 0%, transparent 70%)",
            filter: "blur(40px)",
            transform: "scale(1.2)",
          }}
        />
      </div>
    </div>
  );
}

// Main Page Component
export default function TemplatesPage() {
  const [contentVisible, setContentVisible] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const pageRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setContentVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll listener for parallax
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Mouse parallax for background
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!pageRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
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
        background:
          "linear-gradient(135deg, #2563eb 0%, #3b82f6 25%, #1d4ed8 50%, #2563eb 75%, #3b82f6 100%)",
        "--parallax-x": "0px",
        "--parallax-y": "0px",
      }}
    >
      {/* CSS Animations */}
      <style>{`
        @keyframes float-in {
          from { 
            opacity: 0; 
            transform: translateY(60px) scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)); 
          }
          50% { 
            transform: translateY(-20px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)); 
          }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-float-in {
          opacity: 0;
          animation: float-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Atmospheric Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Animated Gradient Orbs */}
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
            transform: `translate(calc(var(--parallax-x) * 0.5 + ${
              scrollY * 0.1
            }px), calc(var(--parallax-y) * 0.5))`,
            transition: "transform 0.1s linear",
          }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[80px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
            transform: `translate(calc(var(--parallax-x) * -0.3 - ${
              scrollY * 0.05
            }px), calc(var(--parallax-y) * -0.3))`,
            transition: "transform 0.1s linear",
          }}
        />
        <div
          className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full blur-[60px] opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(147,197,253,0.4) 0%, transparent 70%)",
            animation: "pulse-glow 4s ease-in-out infinite",
            transform: `translate(${scrollY * -0.08}px, ${scrollY * 0.03}px)`,
          }}
        />

        {/* Noise/Grain */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Navigation */}
      <Header isFixed />

      {/* Main Content */}
      {contentVisible && (
        <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          {/* Header with Parallax */}
          <div
            className="text-center mb-12 max-w-3xl mx-auto"
            style={{
              transform: `translateY(${scrollY * 0.15}px)`,
              opacity: Math.max(0, 1 - scrollY / 400),
            }}
          >
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 text-white animate-float-in tracking-tight px-2"
              style={{
                animationDelay: "0s",
                textShadow: "0 4px 30px rgba(0,0,0,0.2)",
              }}
            >
              Genie Lab
            </h1>
            <p
              className="text-base sm:text-lg md:text-xl text-white/70 max-w-xl mx-auto leading-relaxed animate-float-in px-4"
              style={{ animationDelay: "0.15s" }}
            >
              Premium templates crafted by B.U.G. Choose your foundation and let
              us bring your vision to life.
            </p>
          </div>

          {/* BENTO GRID with Device Mockups */}
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 auto-rows-[minmax(150px,auto)] sm:auto-rows-[minmax(200px,auto)]">
              {TEMPLATES.map((template, index) => (
                <DeviceCard
                  key={template.id}
                  template={template}
                  index={index}
                  onPreview={setPreviewTemplate}
                  scrollY={scrollY}
                />
              ))}
            </div>
          </div>

          {/* CTA Section with Parallax */}
          <div
            className="mt-20 text-center animate-float-in"
            style={{
              animationDelay: "1s",
              transform: `translateY(${scrollY * -0.05}px)`,
            }}
          >
            <div className="inline-block p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl bg-white/10 backdrop-blur-md border border-white/20">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
                Need something unique?
              </h2>
              <p className="text-sm sm:text-base text-white/60 max-w-md mx-auto mb-6 md:mb-8 px-2">
                Every project is a new universe. Let's create something
                extraordinary together.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#2563eb] font-semibold text-sm tracking-wide uppercase transition-all hover:scale-105 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.4)]"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
        />
      )}
    </div>
  );
}
