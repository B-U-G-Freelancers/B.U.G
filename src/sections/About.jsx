import { useEffect, useRef } from "react";

// Reusable Starfield Effect for consistency with Hero
function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = 150; // High density for a rich, lively space

    class Particle {
      constructor() {
        this.reset();
        this.opacity = Math.random() * 0.6;
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.2 + 0.3; // More variety in sizes

        // Much more lively, energetic movement
        this.speedX = (Math.random() - 0.5) * 1.2;
        this.speedY = (Math.random() - 0.5) * 1.2;

        // Adding a slight 'drift' factor to make it feel like they're caught in a cosmic wind
        this.driftX = (Math.random() - 0.5) * 0.5;
        this.driftY = (Math.random() - 0.5) * 0.5;

        this.opacity = 0;
        this.maxOpacity = Math.random() * 0.8 + 0.2;
        this.fadeSpeed = 0.005 + Math.random() * 0.01;

        // Twinkle effect state
        this.twinkleFactor = Math.random() * 0.1;
      }
      update() {
        // Lively movement with drift
        this.x += this.speedX + Math.sin(Date.now() * 0.001) * this.driftX;
        this.y += this.speedY + Math.cos(Date.now() * 0.001) * this.driftY;

        if (this.opacity < this.maxOpacity) this.opacity += this.fadeSpeed;

        // Dynamic twinkling
        this.currentOpacity = this.opacity + (Math.sin(Date.now() * 0.01 * this.twinkleFactor) * 0.15);

        if (this.x < -50 || this.x > width + 50 || this.y < -50 || this.y > height + 50) {
          this.reset();
        }
      }
      draw() {
        const isPurple = this.size > 1.8; // Larger stars tend to have more hue
        const isPink = !isPurple && this.size > 1.5;

        let color;
        if (isPurple) color = `rgba(58, 124, 255, ${this.currentOpacity})`; // Brand Blue
        else if (isPink) color = `rgba(233, 71, 245, ${this.currentOpacity})`; // Magenta
        else color = `rgba(255, 255, 255, ${this.currentOpacity * 0.8})`; // White/Neutral

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Interactive Glow for 'Lively' feel
        if (this.size > 1.2) {
          ctx.shadowBlur = 8 + (Math.sin(Date.now() * 0.005) * 4);
          ctx.shadowColor = isPurple ? "#3A7CFF" : isPink ? "#E947F5" : "rgba(255,255,255,0.3)";
        } else {
          ctx.shadowBlur = 0;
        }
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
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
      className="absolute inset-0 z-[1] pointer-events-none opacity-60"
    />
  );
}

export default function About() {
  const contentRef = useRef(null);

  return (
    <section
      id="about"
      className="relative py-24 px-6 lg:px-8 bg-[#040506] overflow-hidden"
    >
      {/* 1. Deep Space Base (Gradients) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[#040506]" />
        {/* Nebula Pulses shifted downwards to prevent edge lifting/color mismatch */}
        <div className="absolute top-[10%] right-[-10%] w-[80%] h-[80%] bg-[#3A7CFF]/5 blur-[160px] rounded-full animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#E947F5]/10 blur-[130px] rounded-full animate-pulse" style={{ animationDuration: '14s' }} />
        <div className="absolute top-[50%] left-[20%] w-[50%] h-[50%] bg-[#3A7CFF]/5 blur-[100px] rounded-full animate-pulse" style={{ animationDuration: '18s' }} />
      </div>

      {/* 2. Top Edge Sync Cover - Ensures perfect black color match with Hero bottom */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#040506] via-[#040506]/80 to-transparent z-[5] pointer-events-none" />

      {/* 3. Energetic Starfield */}
      <Starfield />

      {/* 4. Content */}
      <div className="mx-auto max-w-5xl relative z-20" ref={contentRef}>
        <h2 className="text-center font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl lg:leading-[1.1]">
          <span className="text-gray-400 drop-shadow-sm">Execution over fluff.</span> <br />
          <span className="text-white drop-shadow-md">
            Clarity over complexity.
          </span>{" "}
          <br />
          <span className="text-[#3A7CFF] inline-flex items-center gap-4 drop-shadow-[0_0_15px_rgba(58,124,245,0.4)]">
            We are an engineering-first studio
          </span>
        </h2>
      </div>

      {/* 5. Enhanced Cosmic Noise Layer */}
      <div
        className="absolute inset-0 z-[10] pointer-events-none opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px'
        }}
      />

      {/* 6. Moving 'Dust' Grain Overlay for extra liveliness */}
      <div
        className="absolute inset-0 z-[11] pointer-events-none opacity-[0.03] mix-blend-screen animate-noise-drift"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '500px 500px'
        }}
      />

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes noise-drift {
            0% { transform: translate(0,0); }
            50% { transform: translate(-5%, -5%); }
            100% { transform: translate(0,0); }
        }
        .animate-noise-drift {
            animation: noise-drift 20s infinite linear;
        }
      `}} />
    </section>
  );
}
