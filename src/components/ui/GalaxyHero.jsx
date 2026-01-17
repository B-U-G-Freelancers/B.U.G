import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  ChevronDown,
  BarChart3,
  Activity,
  Globe,
  Cpu,
  Radio,
  ChevronDown as ScrollArrow,
  Signal,
  Wifi,
} from "lucide-react";

/* =========================
   DECRYPTION TEXT EFFECT
========================= */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?";

const DecryptionText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const elementRef = useRef(null);

  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iterations >= text.length) {
        clearInterval(interval);
      }
      iterations += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span ref={elementRef} className={className}>
      {displayText}
    </span>
  );
};

/* =========================
   PARTICLE OVERLAY
   (Anti-Gravity System Nodes)
========================= */
// Particle factory function - moved outside component
function createParticle(width, height) {
  const particle = {
    x: Math.random() * width,
    y: height + Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    speedY: -(Math.random() * 0.5 + 0.2),
    speedX: (Math.random() - 0.5) * 0.2,
    opacity: 0,
    maxOpacity: Math.random() * 0.6 + 0.2,
    life: 0,
    maxLife: 100 + Math.random() * 200,
  };

  particle.reset = function (w, h) {
    this.x = Math.random() * w;
    this.y = h + Math.random() * 100;
    this.size = Math.random() * 1.5 + 0.5;
    this.speedY = -(Math.random() * 0.5 + 0.2);
    this.speedX = (Math.random() - 0.5) * 0.2;
    this.opacity = 0;
    this.maxOpacity = Math.random() * 0.6 + 0.2;
    this.life = 0;
    this.maxLife = 100 + Math.random() * 200;
  };

  particle.update = function (w, h) {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life++;

    if (this.life < 20) this.opacity += 0.05;
    else if (this.life > this.maxLife - 20) this.opacity -= 0.05;

    if (this.opacity < 0) this.opacity = 0;
    if (this.opacity > this.maxOpacity) this.opacity = this.maxOpacity;

    if (this.y < -10 || this.life >= this.maxLife) {
      this.reset(w, h);
    }
  };

  particle.draw = function (ctx) {
    ctx.fillStyle = `rgba(58, 124, 255, ${this.opacity})`; // #3A7CFF
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  };

  return particle;
}

export function ParticleOverlay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(width, height));
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update(width, height);
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[5] pointer-events-none mix-blend-screen"
      id="hero-particles"
    />
  );
}

/* =========================
   COMMAND CENTER HOLOGRAM
   (Projected 3D Interface)
========================= */
const HologramPanel = ({
  className,
  children,
  delay = 0,
  initialRotation = 0,
  tx = 0,
  ty = 0,
  tz = 0,
}) => {
  const panelRef = useRef(null);

  useEffect(() => {
    gsap.to(panelRef.current, {
      rotationY: `+=${10}`,
      y: "+=10",
      duration: 4 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay,
    });
  }, [delay]);

  return (
    <div
      ref={panelRef}
      className={`absolute backdrop-blur-md bg-[#3A7CFF]/5 border border-[#3A7CFF]/30 rounded-lg p-3 shadow-[0_0_20px_rgba(58,124,255,0.1)] transition-all hover:border-[#3A7CFF]/60 hover:shadow-[0_0_30px_rgba(58,124,255,0.2)] ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transform: `rotateY(${initialRotation}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`,
      }}
    >
      <div className="relative z-10 font-mono">{children}</div>
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#3A7CFF]" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#3A7CFF]" />
    </div>
  );
};

export function CommandCenter3D() {
  const containerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xRotation = (clientY / window.innerHeight - 0.5) * 10;
      const yRotation = (clientX / window.innerWidth - 0.5) * 10;

      // Move container
      gsap.to(imageContainerRef.current, {
        rotationX: -xRotation,
        rotationY: yRotation,
        duration: 1.5,
        ease: "power2.out",
        transformPerspective: 1000,
      });

      // Move Spotlight
      if (spotlightRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(58, 124, 255, 0.15), transparent 40%)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none"
      style={{ perspective: "2000px" }}
    >
      {/* Interactive Spotlight Overlay */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[50vh] bg-gradient-to-b from-[#3A7CFF] to-transparent opacity-30 z-0" />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#3A7CFF]/5 blur-[100px] rounded-full z-0" />

      <div
        ref={imageContainerRef}
        className="relative w-full max-w-4xl aspect-video flex items-center justify-center transition-all duration-1000 z-10"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative w-full h-full group">
          <div className="absolute inset-0 border border-[#3A7CFF]/10 rounded-xl mix-blend-overlay" />

          <div
            className="absolute inset-0 z-20 pointer-events-none opacity-10 bg-[length:100%_4px]"
            style={{
              backgroundImage: `linear-gradient(rgba(58, 124, 255, 0.2) 1px, transparent 1px)`,
            }}
          />

          {/* Transparent HUD Frame causing GlobalBackground to be visible */}
          <div className="w-full h-full relative overflow-hidden rounded-xl border border-[#3A7CFF]/10 bg-transparent backdrop-blur-[2px]">
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              {/* Central CPU/System Icon acting as a HUD reticle */}
              <Cpu className="w-32 h-32 text-[#3A7CFF] animate-pulse opacity-50" />
            </div>
          </div>

          <div className="absolute top-0 w-full h-[2px] bg-[#3A7CFF] opacity-50 blur-[2px] animate-scanline" />
        </div>

        {/* Original Widgets */}
        <HologramPanel
          className="w-48"
          initialRotation={-20}
          tx={-250}
          ty={-50}
          tz={100}
          delay={0}
        >
          <div className="flex items-center gap-2 mb-2 text-[#3A7CFF]">
            <Activity className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Sys_Monitor
            </span>
          </div>
          <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[65%] bg-[#3A7CFF] animate-pulse" />
          </div>
          <div className="mt-1 flex justify-between text-[8px] text-gray-400">
            <span>CPU</span>
            <span>48%</span>
          </div>
        </HologramPanel>

        <HologramPanel
          className="w-56"
          initialRotation={20}
          tx={280}
          ty={40}
          tz={120}
          delay={0.5}
        >
          <div className="flex items-center gap-2 mb-2 text-[#E947F5]">
            <Radio className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Net_Link
            </span>
          </div>
          <div className="flex gap-0.5 h-4 items-end">
            {[40, 70, 45, 90, 60, 80, 50, 95].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-[#E947F5]/60"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </HologramPanel>

        {/* NEW: Globe Uplink Widget */}
        <HologramPanel
          className="w-40"
          initialRotation={-15}
          tx={-280}
          ty={120}
          tz={80}
          delay={0.8}
        >
          <div className="flex items-center gap-2 mb-2 text-[#00f6ff]">
            <Globe className="w-3 h-3 animate-spin duration-[10s]" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Geo_Node
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`h-1 w-1 rounded-full ${
                  i % 3 === 0 ? "bg-[#00f6ff]" : "bg-white/10"
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-[8px] text-gray-400 font-mono tracking-widest">
            SYNCING...
          </p>
        </HologramPanel>

        {/* NEW: Signal Strength Widget */}
        <HologramPanel
          className="w-32"
          initialRotation={15}
          tx={320}
          ty={-100}
          tz={90}
          delay={1.2}
        >
          <div className="flex items-center gap-2 mb-2 text-[#ffe900]">
            <Wifi className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Signal
            </span>
          </div>
          <div className="flex items-end gap-1 h-6">
            <div className="w-2 h-2 bg-[#ffe900]/40" />
            <div className="w-2 h-3 bg-[#ffe900]/60" />
            <div className="w-2 h-4 bg-[#ffe900]/80" />
            <div className="w-2 h-6 bg-[#ffe900] animate-pulse" />
          </div>
        </HologramPanel>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
                @keyframes scanline {
                    0% { top: 0%; opacity: 0; }
                    50% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                .animate-scanline { animation: scanline 3s linear infinite; }
            `,
        }}
      />
    </div>
  );
}

/* =========================
   HERO CONTENT
========================= */
export function HeroContent() {
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    gsap.set(
      [
        headlineRef.current,
        subtitleRef.current,
        ctaRef.current,
        scrollRef.current,
      ],
      { autoAlpha: 0, y: 30, filter: "blur(10px)" }
    );

    tl.to(headlineRef.current, {
      autoAlpha: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out",
    })
      .to(
        subtitleRef.current,
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      )
      .to(
        ctaRef.current,
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      )
      .to(
        scrollRef.current,
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );

    gsap.to(scrollRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div className="relative z-30 flex flex-col items-center justify-center min-h-screen text-center px-4 pointer-events-none">
      <div className="mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3A7CFF]/30 bg-[#000510]/60 backdrop-blur-md">
        <div className="w-1.5 h-1.5 rounded-full bg-[#3A7CFF] animate-pulse shadow-[0_0_8px_#3A7CFF]" />
        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#3A7CFF] uppercase">
          System Online
        </span>
      </div>

      <h1
        ref={headlineRef}
        className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-tight drop-shadow-2xl px-2"
      >
        WE BUILD <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A7CFF] via-[#5c92ff] to-[#E947F5] animate-pulse-slow">
          <DecryptionText text="DIGITAL REALITIES" />
        </span>
      </h1>

      <p
        ref={subtitleRef}
        className="mt-6 md:mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed drop-shadow-md px-4"
      >
        High-performance engineering meets elite cyberpunk aesthetics.
        <br />
        Establish your digital dominance.
      </p>

      <div
        ref={ctaRef}
        className="mt-12 flex flex-col sm:flex-row gap-6 pointer-events-auto"
      >
        <a
          href="#services"
          className="group px-10 py-4 bg-[#3A7CFF] text-white font-bold tracking-widest uppercase hover:bg-white hover:text-[#3A7CFF] transition-all shadow-[0_0_20px_rgba(58,124,255,0.4)] clip-path-button flex items-center gap-2"
        >
          <span className="relative z-10">Get Started</span>
          <ChevronDown className="w-5 h-5 -rotate-90 group-hover:rotate-0 transition-transform duration-300" />
        </a>
        <a
          href="#works"
          className="px-8 py-4 border border-white/20 text-white font-bold tracking-widest uppercase hover:border-[#3A7CFF] hover:text-[#3A7CFF] transition-all bg-black/50 backdrop-blur-sm"
        >
          View Systems
        </a>
      </div>

      {/* Animated Scroll Arrow */}
      <a
        ref={scrollRef}
        href="#services"
        className="absolute bottom-12 pointer-events-auto flex flex-col items-center gap-2 group cursor-pointer"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#3A7CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Scroll Down
        </span>
        <div className="w-12 h-12 rounded-full border border-[#3A7CFF]/30 flex items-center justify-center group-hover:border-[#3A7CFF] group-hover:bg-[#3A7CFF]/10 transition-all shadow-[0_0_15px_rgba(58,124,255,0.2)]">
          <ScrollArrow className="w-6 h-6 text-[#3A7CFF] group-hover:text-white transition-colors" />
        </div>
      </a>
    </div>
  );
}

export function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-transparent z-0">
        <ParticleOverlay />
      </div>

      {/* HUD/Command Center - Hidden on mobile for cleaner experience */}
      <div className="absolute inset-0 z-10 hidden md:block">
        <CommandCenter3D />
      </div>

      {/* Content Layer */}
      <div className="relative z-30">
        <HeroContent />
      </div>

      {/* Bottom Fade Gradient to merge with next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
    </div>
  );
}

export default HeroSection;
