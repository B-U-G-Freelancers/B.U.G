// src/pages/TemplatesPage.jsx
// Premium cinematic Templates & Pricing page
// Uses CSS animations for reliability
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, ExternalLink, Eye } from "lucide-react";

// Template showcase data - B.U.G branded templates
const TEMPLATES = [
  {
    id: "genie-starter",
    name: "Genie Starter",
    category: "LANDING.PAGE",
    description:
      "Clean, minimal landing page perfect for startups and personal brands.",
    image: "/templates/1st template/screen.png",
    tier: "Essential",
    features: ["Responsive", "Contact Form", "SEO Ready"],
  },
  {
    id: "genie-studio",
    name: "Genie Studio",
    category: "PORTFOLIO",
    description:
      "Creative portfolio template with smooth animations and gallery.",
    image: "/templates/2nd template/screen.png",
    tier: "Essential",
    features: ["Gallery", "Animations", "Dark Mode"],
  },
  {
    id: "genie-commerce",
    name: "Genie Commerce",
    category: "E-COMMERCE",
    description: "Full-featured online store with cart and checkout flow.",
    image: "/templates/3rd template/screen.png",
    tier: "Professional",
    features: ["Product Grid", "Cart", "Payments"],
  },
  {
    id: "genie-corporate",
    name: "Genie Corporate",
    category: "BUSINESS",
    description:
      "Professional business website with services and team sections.",
    image: "/templates/4th template/screen.png",
    tier: "Professional",
    features: ["Multi-page", "CMS Ready", "Blog"],
  },
  {
    id: "genie-agency",
    name: "Genie Agency",
    category: "AGENCY",
    description: "Premium agency template with case studies and testimonials.",
    image: "/templates/5th template/screen.png",
    tier: "Enterprise",
    features: ["Case Studies", "Premium Animations", "Dashboard"],
  },
  {
    id: "genie-starter-pro",
    name: "Genie Starter Pro",
    category: "LANDING.PAGE",
    description: "Enhanced landing page with advanced sections and animations.",
    image: "/templates/1st template copy/screen.png",
    tier: "Essential",
    features: ["Animations", "Multi-Section", "CTA Optimized"],
  },
  {
    id: "genie-studio-pro",
    name: "Genie Studio Pro",
    category: "PORTFOLIO",
    description: "Premium portfolio with project details and lightbox gallery.",
    image: "/templates/2nd template copy/screen.png",
    tier: "Professional",
    features: ["Case Studies", "Filters", "Lightbox"],
  },
  {
    id: "genie-commerce-pro",
    name: "Genie Commerce Pro",
    category: "E-COMMERCE",
    description: "Advanced e-commerce with inventory management and dashboard.",
    image: "/templates/3rd template copy/screen.png",
    tier: "Enterprise",
    features: ["Dashboard", "Inventory", "Analytics"],
  },
  {
    id: "genie-corporate-pro",
    name: "Genie Corporate Pro",
    category: "BUSINESS",
    description:
      "Enterprise business platform with multiple pages and integrations.",
    image: "/templates/4th template copy/page 1/screen.png",
    tier: "Enterprise",
    features: ["5+ Pages", "Integrations", "Admin Panel"],
  },
  {
    id: "genie-agency-pro",
    name: "Genie Agency Pro",
    category: "AGENCY",
    description: "Full agency suite with client portal and project management.",
    image: "/templates/5th template copy/page 2/screen.png",
    tier: "Enterprise",
    features: ["Client Portal", "Project Tracking", "Premium Animations"],
  },
];

// Pricing tiers data
const PRICING_TIERS = [
  {
    id: "essential",
    name: "TIER.ESSENTIAL",
    priceRange: "₹8,000 — ₹15,000",
    description:
      "Perfect for startups and personal brands launching their digital presence.",
    features: [
      "Single-page landing website",
      "Mobile responsive design",
      "Contact form integration",
      "Basic SEO setup",
      "2 revision rounds",
      "5-7 days delivery",
    ],
    cta: "INITIATE.PROJECT",
    highlighted: false,
  },
  {
    id: "professional",
    name: "TIER.PROFESSIONAL",
    priceRange: "₹20,000 — ₹45,000",
    description:
      "For businesses ready to scale with a complete digital platform.",
    features: [
      "Multi-page website (up to 8 pages)",
      "CMS integration (content management)",
      "Advanced animations & interactions",
      "Full SEO optimization",
      "Analytics integration",
      "4 revision rounds",
      "2-3 weeks delivery",
    ],
    cta: "INITIATE.PROJECT",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "TIER.ENTERPRISE",
    priceRange: "₹60,000+",
    description: "Custom-built digital solutions for ambitious ventures.",
    features: [
      "Full-stack web application",
      "AI/ML integrations",
      "Custom backend & database",
      "Mobile app development",
      "Dedicated project manager",
      "Priority support",
      "Timeline based on scope",
    ],
    cta: "REQUEST.CONSULTATION",
    highlighted: false,
  },
];

// System initialization sequence
function SystemInit({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [fading, setFading] = useState(false);

  const initLines = [
    { text: "SYS.BOOT", delay: 0 },
    { text: "LOADING ENVIRONMENT...", delay: 200 },
    { text: "INITIALIZING DISPLAY MATRIX", delay: 400 },
    { text: "CALIBRATING VISUAL LAYER", delay: 600 },
    { text: "STATUS: READY", delay: 800 },
  ];

  useEffect(() => {
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
              animationDelay: `${i * 0.1}s`,
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
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
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

// Pricing tier card
function PricingCard({ tier, index }) {
  return (
    <div
      className={`relative p-8 rounded-lg border transition-all duration-500 animate-emerge ${
        tier.highlighted
          ? "border-blue-500/40 bg-blue-500/5"
          : "border-white/10 bg-white/[0.02]"
      } hover:border-white/20 hover:bg-white/[0.04]`}
      style={{ animationDelay: `${0.6 + index * 0.15}s` }}
    >
      {tier.highlighted && (
        <div
          className="absolute -top-px left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500/20 text-blue-400 text-[10px] tracking-[0.2em] uppercase rounded-b"
          style={{ fontFamily: "'Space Grotesk', monospace" }}
        >
          RECOMMENDED
        </div>
      )}

      {/* Tier name */}
      <div
        className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-4"
        style={{ fontFamily: "'Space Grotesk', monospace" }}
      >
        {tier.name}
      </div>

      {/* Price */}
      <div
        className="text-3xl font-semibold text-white mb-4"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {tier.priceRange}
      </div>

      {/* Description */}
      <p
        className="text-white/50 text-sm leading-relaxed mb-8"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {tier.description}
      </p>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {tier.features.map((feature, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-sm text-white/70"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Check className="w-4 h-4 text-blue-400/70 mt-0.5 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to="/contact"
        className={`w-full py-4 rounded text-xs tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
          tier.highlighted
            ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30"
            : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
        }`}
        style={{ fontFamily: "'Space Grotesk', monospace" }}
      >
        {tier.cta}
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

// Template showcase card
function TemplateCard({ template, index }) {
  const [isHovered, setIsHovered] = useState(false);

  const tierColors = {
    Essential: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    Professional: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    Enterprise: "text-purple-400 bg-purple-500/10 border-purple-500/30",
  };

  return (
    <div
      className="group relative rounded-lg border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-500 animate-emerge hover:border-white/20"
      style={{ animationDelay: `${0.3 + index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={template.image}
          alt={template.name}
          className={`w-full h-full object-cover object-top transition-transform duration-700 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />
        {/* Overlay on hover */}
        <div
          className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs tracking-widest uppercase transition-all border border-white/20"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <Eye className="w-3.5 h-3.5" />
            PREVIEW
          </button>
        </div>
        {/* Tier badge */}
        <div
          className={`absolute top-3 right-3 px-2 py-1 rounded text-[9px] tracking-wider uppercase border ${
            tierColors[template.tier]
          }`}
          style={{ fontFamily: "'Space Grotesk', monospace" }}
        >
          {template.tier}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <div
          className="text-[9px] tracking-[0.2em] uppercase text-white/30 mb-2"
          style={{ fontFamily: "'Space Grotesk', monospace" }}
        >
          {template.category}
        </div>

        {/* Name */}
        <h3
          className="text-lg font-semibold text-white mb-2"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {template.name}
        </h3>

        {/* Description */}
        <p
          className="text-sm text-white/50 mb-4 line-clamp-2"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {template.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {template.features.map((feature, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-white/5 text-white/50 text-[10px] rounded border border-white/10"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main page
export default function TemplatesPage() {
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

      {/* System status bar */}
      {initialized && <SystemStatus />}

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
        <div
          className="absolute inset-0 opacity-15"
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 40%)",
            transform:
              "translate(calc(var(--parallax-x) * -0.3), calc(var(--parallax-y) * -0.3))",
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
            transform:
              "translate(calc(var(--parallax-x) * 0.2), calc(var(--parallax-y) * 0.2))",
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
        <div className="relative z-10 pt-32 pb-24 px-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1
              className="text-5xl md:text-7xl font-semibold mb-6 animate-emerge"
              style={{
                fontFamily: "'Inter', sans-serif",
                animationDelay: "0s",
              }}
            >
              Templates & Pricing
            </h1>
            <p
              className="text-lg text-white/50 max-w-xl mx-auto leading-relaxed animate-emerge"
              style={{
                fontFamily: "'Inter', sans-serif",
                animationDelay: "0.2s",
              }}
            >
              Premium website templates crafted by B.U.G. Select a template and
              tier to begin your project.
            </p>
          </div>

          {/* Template showcase label */}
          <div
            className="text-center mb-8 animate-emerge"
            style={{ animationDelay: "0.3s" }}
          >
            <span
              className="text-[10px] tracking-[0.3em] uppercase text-white/30"
              style={{ fontFamily: "'Space Grotesk', monospace" }}
            >
              TEMPLATE.COLLECTION
            </span>
          </div>

          {/* Template grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {TEMPLATES.map((template, index) => (
              <TemplateCard
                key={template.id}
                template={template}
                index={index}
              />
            ))}
          </div>

          {/* Subtle divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

          {/* Pricing label */}
          <div
            className="text-center mb-12 animate-emerge"
            style={{ animationDelay: "0.4s" }}
          >
            <span
              className="text-[10px] tracking-[0.3em] uppercase text-white/30"
              style={{ fontFamily: "'Space Grotesk', monospace" }}
            >
              PRICING.MATRIX
            </span>
          </div>

          {/* Pricing grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {PRICING_TIERS.map((tier, index) => (
              <PricingCard key={tier.id} tier={tier} index={index} />
            ))}
          </div>

          {/* Footer note */}
          <div
            className="mt-20 text-center animate-emerge"
            style={{ animationDelay: "1.2s" }}
          >
            <p
              className="text-xs text-white/30 tracking-wide"
              style={{ fontFamily: "'Space Grotesk', monospace" }}
            >
              ALL PRICES IN INR • CUSTOM QUOTES AVAILABLE • 50% ADVANCE TO
              INITIATE
            </p>
          </div>
        </div>
      )}

      {/* Bottom gradient fade */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
    </div>
  );
}
