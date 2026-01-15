// src/pages/TemplatesPage.jsx
// Premium cinematic Templates & Pricing page
// Uses anime.js for weighted, cinematic animations
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

// Pricing tiers data
const PRICING_TIERS = [
  {
    id: "essential",
    name: "TIER.ESSENTIAL",
    priceRange: "₹15,000 — ₹25,000",
    description:
      "Perfect for startups and personal brands launching their digital presence.",
    features: [
      "Single-page landing website",
      "Mobile responsive design",
      "Contact form integration",
      "Basic SEO setup",
      "2 revision rounds",
      "1 week delivery",
    ],
    cta: "INITIATE.PROJECT",
    highlighted: false,
  },
  {
    id: "professional",
    name: "TIER.PROFESSIONAL",
    priceRange: "₹40,000 — ₹80,000",
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
    priceRange: "₹1,00,000+",
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
  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);

  const initLines = [
    { text: "SYS.BOOT", delay: 0 },
    { text: "LOADING ENVIRONMENT...", delay: 200 },
    { text: "INITIALIZING DISPLAY MATRIX", delay: 400 },
    { text: "CALIBRATING VISUAL LAYER", delay: 600 },
    { text: "STATUS: READY", delay: 800 },
  ];

  useEffect(() => {
    // Show lines one by one
    initLines.forEach((line, index) => {
      setTimeout(() => {
        setLines((prev) => [...prev, line.text]);
      }, line.delay);
    });

    // Fade out and complete
    setTimeout(() => {
      if (containerRef.current) {
        anime({
          targets: containerRef.current,
          opacity: [1, 0],
          duration: 800,
          easing: "easeInOutQuad",
          complete: onComplete,
        });
      }
    }, 1800);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      <div className="font-mono text-xs text-white/60 space-y-2">
        {lines.map((line, i) => (
          <div
            key={i}
            className="tracking-widest uppercase"
            style={{ fontFamily: "'Space Grotesk', monospace" }}
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
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      anime({
        targets: cardRef.current,
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 1000,
        delay: 600 + index * 200,
        easing: "easeOutQuart",
      });
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative p-8 rounded-lg border transition-all duration-500 opacity-0 ${
        tier.highlighted
          ? "border-blue-500/40 bg-blue-500/5"
          : "border-white/10 bg-white/[0.02]"
      } hover:border-white/20 hover:bg-white/[0.04]`}
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
      <button
        className={`w-full py-4 rounded text-xs tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
          tier.highlighted
            ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30"
            : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
        }`}
        style={{ fontFamily: "'Space Grotesk', monospace" }}
      >
        {tier.cta}
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// Main page
export default function TemplatesPage() {
  const [initialized, setInitialized] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const pageRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const pricingHeadingRef = useRef(null);

  useEffect(() => {
    if (initialized) {
      // Delay before showing content
      setTimeout(() => setContentVisible(true), 200);
    }
  }, [initialized]);

  useEffect(() => {
    if (contentVisible) {
      // Animate headings
      anime({
        targets: headingRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1200,
        easing: "easeOutQuart",
      });

      anime({
        targets: subheadingRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        delay: 300,
        easing: "easeOutQuart",
      });

      anime({
        targets: pricingHeadingRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        delay: 400,
        easing: "easeOutQuart",
      });
    }
  }, [contentVisible]);

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
        <div className="relative z-10 pt-32 pb-24 px-6 max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <h1
              ref={headingRef}
              className="text-5xl md:text-7xl font-semibold mb-6 opacity-0"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Investment Tiers
            </h1>
            <p
              ref={subheadingRef}
              className="text-lg text-white/50 max-w-xl mx-auto leading-relaxed opacity-0"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Select the tier that matches your vision. Each project is crafted
              with precision and delivered with care.
            </p>
          </div>

          {/* Subtle divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

          {/* Pricing label */}
          <div ref={pricingHeadingRef} className="text-center mb-12 opacity-0">
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
          <div className="mt-20 text-center">
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
