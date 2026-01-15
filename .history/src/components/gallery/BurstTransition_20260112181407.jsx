// src/components/gallery/BurstTransition.jsx
// Particle explosion that morphs from globe to dome gallery positions
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const ALADDIN_BLUE = {
  primary: "#3A7CFD",
  secondary: "#6B5BFF",
  glow: "#4F9EFF",
};

// Easing function
const easeInOutQuart = (t) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

// Particle class - defined outside component
class Particle {
  constructor(index, total, centerX, centerY, width, height) {
    this.index = index;
    this.total = total;

    // Start position - arranged in a sphere shape
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;
    const radius = 120;

    this.startX = centerX + radius * Math.cos(theta) * Math.sin(phi);
    this.startY = centerY + radius * Math.sin(theta) * Math.sin(phi);
    this.x = this.startX;
    this.y = this.startY;

    // Velocity for burst
    const angle = Math.atan2(this.startY - centerY, this.startX - centerX);
    const speed = 8 + Math.random() * 12;
    this.vx = Math.cos(angle) * speed + (Math.random() - 0.5) * 4;
    this.vy = Math.sin(angle) * speed + (Math.random() - 0.5) * 4;
    this.friction = 0.96 + Math.random() * 0.02;

    // Target position for dome - arranged in arc pattern
    const domeAngle = (index / total) * Math.PI * 2;
    const domeRadius = Math.min(width, height) * 0.4;
    this.targetX = centerX + Math.cos(domeAngle) * domeRadius;
    this.targetY = centerY + Math.sin(domeAngle) * domeRadius * 0.6;

    // Visual properties
    this.size = 4 + Math.random() * 6;
    this.originalSize = this.size;
    this.alpha = 1;
    this.hue = Math.random() > 0.5 ? 220 : 250; // Blue range
    this.saturation = 70 + Math.random() * 30;
    this.lightness = 50 + Math.random() * 20;

    // Trail
    this.trail = [];
    this.maxTrailLength = 8;
  }

  burst(progress) {
    // Apply velocity with friction
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= this.friction;
    this.vy *= this.friction;

    // Add trail point
    this.trail.unshift({ x: this.x, y: this.y, alpha: 1 });
    if (this.trail.length > this.maxTrailLength) {
      this.trail.pop();
    }

    // Size pulse
    this.size = this.originalSize * (1 + Math.sin(progress * Math.PI) * 0.5);
  }

  regroup(progress) {
    // Lerp to target position with elastic effect
    const eased = easeInOutQuart(progress);
    this.x = this.x + (this.targetX - this.x) * eased * 0.15;
    this.y = this.y + (this.targetY - this.y) * eased * 0.15;

    // Spiral motion towards target
    const spiralAngle = progress * Math.PI * 4;
    const spiralRadius = (1 - progress) * 30;
    this.x += Math.cos(spiralAngle + this.index) * spiralRadius * 0.05;
    this.y += Math.sin(spiralAngle + this.index) * spiralRadius * 0.05;

    // Fade trail
    this.trail = this.trail.slice(
      0,
      Math.floor((1 - progress) * this.maxTrailLength)
    );

    // Grow size as we approach target
    this.size = this.originalSize * (0.5 + eased * 1.5);
    this.alpha = 0.5 + eased * 0.5;
  }

  draw(ctx) {
    // Draw trail
    this.trail.forEach((point, i) => {
      const trailAlpha = (1 - i / this.trail.length) * 0.3 * this.alpha;
      const trailSize = this.size * (1 - i / this.trail.length) * 0.8;
      ctx.beginPath();
      ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${trailAlpha})`;
      ctx.fill();
    });

    // Draw main particle with glow
    ctx.save();
    ctx.shadowColor = `hsla(${this.hue}, 100%, 60%, 0.8)`;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;
    ctx.fill();
    ctx.restore();
  }
}

export default function BurstTransition({ onComplete, projectCount = 6 }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [phase, setPhase] = useState("burst"); // burst -> regroup -> complete

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    };
    resize();

    const width = window.innerWidth;
    const height = window.innerHeight;
    const centerX = width / 2;
    const centerY = height / 2;

    // Create particles
    const particleCount = 150;
    const particles = Array.from(
      { length: particleCount },
      (_, i) => new Particle(i, particleCount, centerX, centerY, width, height)
    );

    // Animation state
    let burstStartTime = Date.now();
    const burstDuration = 800;
    const regroupDuration = 1200;
    let currentPhase = "burst";

    // Shockwave state
    let shockwaveRadius = 0;
    let shockwaveAlpha = 1;

    const animate = () => {
      const now = Date.now();

      // Clear with trail effect
      ctx.fillStyle = "rgba(6, 0, 16, 0.15)";
      ctx.fillRect(0, 0, width, height);

      if (currentPhase === "burst") {
        const elapsed = now - burstStartTime;
        const progress = Math.min(elapsed / burstDuration, 1);

        // Draw shockwave
        shockwaveRadius = progress * Math.max(width, height) * 0.8;
        shockwaveAlpha = 1 - progress;

        if (shockwaveAlpha > 0) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, shockwaveRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(58, 124, 253, ${shockwaveAlpha * 0.5})`;
          ctx.lineWidth = 3 + (1 - progress) * 10;
          ctx.stroke();

          // Inner ring
          ctx.beginPath();
          ctx.arc(centerX, centerY, shockwaveRadius * 0.7, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(107, 91, 255, ${shockwaveAlpha * 0.3})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        particles.forEach((p) => p.burst(progress));

        if (progress >= 1) {
          currentPhase = "regroup";
          setPhase("regroup");
          burstStartTime = now;
        }
      } else if (currentPhase === "regroup") {
        const elapsed = now - burstStartTime;
        const progress = Math.min(elapsed / regroupDuration, 1);

        particles.forEach((p) => p.regroup(progress));

        if (progress >= 1) {
          currentPhase = "complete";
          setPhase("complete");

          // Fade out animation
          gsap.to(canvas, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              onComplete?.();
            },
          });
          return;
        }
      }

      // Draw all particles
      particles.forEach((p) => p.draw(ctx));

      // Center glow during burst
      if (currentPhase === "burst") {
        const gradient = ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          150
        );
        gradient.addColorStop(0, "rgba(58, 124, 253, 0.3)");
        gradient.addColorStop(0.5, "rgba(107, 91, 255, 0.1)");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onComplete, projectCount]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "#060010" }}
      />

      {/* Phase indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-sm font-mono">
        {phase === "burst" && "✦ Initiating..."}
        {phase === "regroup" && "✦ Forming gallery..."}
      </div>
    </div>
  );
}
