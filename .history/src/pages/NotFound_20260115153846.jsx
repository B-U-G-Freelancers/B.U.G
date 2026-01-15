// src/pages/NotFound.jsx
// 404 Page matching the cinematic design system
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.9) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Subtle fog */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "radial-gradient(ellipse at 30% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-md">
        {/* 404 Number */}
        <div
          className="text-[150px] md:text-[200px] font-bold leading-none text-white/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          404
        </div>

        {/* System label */}
        <div
          className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-6 relative"
          style={{ fontFamily: "'Space Grotesk', monospace" }}
        >
          ERR.NOT_FOUND
        </div>

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl font-semibold mb-4 relative"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Lost in space
        </h1>

        {/* Description */}
        <p
          className="text-white/50 mb-10 leading-relaxed relative"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          The coordinates you're looking for don't exist in this system. The
          page may have been moved or deleted.
        </p>

        {/* Actions */}
        <div className="flex gap-4 justify-center relative">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 text-xs tracking-widest uppercase transition-all border border-white/10"
            style={{ fontFamily: "'Space Grotesk', monospace" }}
          >
            <ArrowLeft className="w-4 h-4" />
            GO BACK
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-xs tracking-widest uppercase transition-all border border-blue-500/30"
            style={{ fontFamily: "'Space Grotesk', monospace" }}
          >
            <Home className="w-4 h-4" />
            HOME
          </Link>
        </div>

        {/* Status indicator */}
        <div
          className="mt-16 flex items-center justify-center gap-2 text-[10px] tracking-widest uppercase text-white/20"
          style={{ fontFamily: "'Space Grotesk', monospace" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
          STATUS: ROUTE.UNDEFINED
        </div>
      </div>
    </div>
  );
}
