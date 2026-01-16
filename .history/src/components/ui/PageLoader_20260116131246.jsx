// src/components/ui/PageLoader.jsx
// Premium loading screen with B.U.G branding

import { useState, useEffect } from "react";

/**
 * PageLoader - Full-page loading screen with animated genie lamp
 * @param {boolean} isLoading - Whether to show the loader
 * @param {string} pageName - Name to display (e.g., "Genie World", "Genie Labs")
 * @param {number} minDuration - Minimum display time in ms (default: 1500)
 */
export default function PageLoader({
  isLoading = true,
  pageName = "Loading",
  minDuration = 1500,
  onLoadComplete,
}) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Faster start, slower end (easing)
        const increment = prev < 70 ? 8 : prev < 90 ? 3 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 50);

    // Minimum display duration
    const minTimer = setTimeout(() => {
      if (!isLoading) {
        triggerFadeOut();
      }
    }, minDuration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(minTimer);
    };
  }, []);

  useEffect(() => {
    if (!isLoading && progress >= 100) {
      triggerFadeOut();
    }
  }, [isLoading, progress]);

  const triggerFadeOut = () => {
    setProgress(100);
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setVisible(false);
        onLoadComplete?.();
      }, 600);
    }, 300);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-600 ${
        fadeOut ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
      style={{
        backgroundColor: "#0b0d10",
        perspective: "1000px",
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
          style={{
            background: "radial-gradient(circle, #3a7cff 0%, transparent 70%)",
            animation: "pulse-glow 3s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-15"
          style={{
            background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
            animation: "pulse-glow 4s ease-in-out infinite 1s",
          }}
        />

        {/* Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Genie Lamp Icon */}
        <div className="relative mb-8">
          <div
            className="relative"
            style={{
              animation: "float 3s ease-in-out infinite",
            }}
          >
            {/* Lamp Glow */}
            <div
              className="absolute -inset-8 rounded-full blur-2xl opacity-40"
              style={{
                background:
                  "radial-gradient(circle, #3a7cff 0%, transparent 70%)",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            />

            {/* Lamp SVG */}
            <svg
              width="80"
              height="80"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10"
            >
              {/* Lamp Body */}
              <ellipse
                cx="32"
                cy="42"
                rx="20"
                ry="8"
                fill="url(#lampGradient)"
                className="opacity-90"
              />
              <path
                d="M20 42C20 42 22 52 32 52C42 52 44 42 44 42"
                stroke="url(#lampGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              {/* Lamp Top */}
              <ellipse
                cx="32"
                cy="38"
                rx="18"
                ry="6"
                fill="url(#lampTopGradient)"
              />
              {/* Spout */}
              <path
                d="M48 38C52 36 56 34 58 32"
                stroke="url(#lampGradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Smoke/Magic Particles */}
              <circle
                cx="58"
                cy="28"
                r="2"
                fill="#3a7cff"
                style={{ animation: "particle 2s ease-out infinite" }}
              />
              <circle
                cx="56"
                cy="22"
                r="1.5"
                fill="#60a5fa"
                style={{ animation: "particle 2s ease-out infinite 0.3s" }}
              />
              <circle
                cx="54"
                cy="16"
                r="1"
                fill="#93c5fd"
                style={{ animation: "particle 2s ease-out infinite 0.6s" }}
              />
              {/* Gradients */}
              <defs>
                <linearGradient
                  id="lampGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#3a7cff" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
                <linearGradient
                  id="lampTopGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#3a7cff" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Page Name */}
        <h2
          className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight"
          style={{
            fontFamily: "'Space Grotesk', monospace",
            animation: "fadeInUp 0.6s ease-out",
          }}
        >
          {pageName}
        </h2>

        {/* Loading Text */}
        <p
          className="text-white/50 text-sm tracking-[0.3em] uppercase mb-8"
          style={{ animation: "fadeInUp 0.6s ease-out 0.2s backwards" }}
        >
          Summoning Magic...
        </p>

        {/* Progress Bar */}
        <div
          className="w-48 h-1 bg-white/10 rounded-full overflow-hidden"
          style={{ animation: "fadeInUp 0.6s ease-out 0.4s backwards" }}
        >
          <div
            className="h-full rounded-full transition-all duration-200 ease-out"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #3a7cff 0%, #60a5fa 100%)",
              boxShadow: "0 0 20px rgba(58, 124, 255, 0.5)",
            }}
          />
        </div>

        {/* Progress Percentage */}
        <span
          className="mt-4 text-xs text-white/30 font-mono"
          style={{ animation: "fadeInUp 0.6s ease-out 0.5s backwards" }}
        >
          {progress}%
        </span>
      </div>

      {/* Inline Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.05); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes particle {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-20px) scale(0.5); }
        }
      `}</style>
    </div>
  );
}
