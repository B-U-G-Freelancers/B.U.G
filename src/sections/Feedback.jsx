import { Quote } from "lucide-react";

/* =========================
   MOCK FEEDBACK DATA
   (Galaxy Transmission Logs)
========================= */
const feedbacks = [
    {
        text:
            "The team at B.U.G didn't just build a website; they architected a digital ecosystem. The precision and aesthetic is unmatched.",
        name: "Alexander K.",
        role: "CTO, Vertex Core",
    },
    {
        text:
            "Working with B.U.G felt like integrating with a futuristic command system. Every detail was intentional and powerful.",
        name: "Sophia M.",
        role: "Product Lead, Nova Systems",
    },
    {
        text:
            "Their cyberpunk design language and engineering depth gave our platform a presence that truly stands out.",
        name: "Ethan R.",
        role: "Founder, Orbit Labs",
    },
    {
        text:
            "B.U.G transformed our vision into a living digital experience. The system feels fast, intelligent, and visually elite.",
        name: "Liam O.",
        role: "Engineering Manager, Flux Dynamics",
    },
    {
        text:
            "From UI motion to backend logic, everything feels synchronized. It’s not just development — it’s digital architecture.",
        name: "Isabella T.",
        role: "Head of Design, Neon Collective",
    },
    {
        text:
            "We wanted something bold, scalable, and futuristic. What we received was a platform that feels years ahead.",
        name: "Noah P.",
        role: "CEO, Hyperlane Tech",
    },
    {
        text:
            "B.U.G delivered a system that looks cinematic but performs flawlessly. That balance is extremely rare.",
        name: "Aarav S.",
        role: "Tech Strategist, Quantum Edge",
    },
    {
        text:
            "The attention to interaction, motion, and performance is unreal. It feels like operating inside a digital universe.",
        name: "Maya R.",
        role: "Product Owner, Astra Labs",
    },
];

/* =========================
   FEEDBACK SECTION
========================= */
export default function Feedback() {
    return (
        <section
            id="feedback"
            className="relative py-32 bg-transparent overflow-hidden pointer-events-none"
        >
            <div className="relative z-10 pointer-events-auto">

                {/* HEADER */}
                <div className="mb-20 text-center">
                    <div className="inline-block mb-4 px-3 py-1 border border-[#3A7CFF]/30 rounded-full bg-[#3A7CFF]/10 backdrop-blur-md">
                        <span className="text-[#3A7CFF] text-xs font-mono font-bold tracking-[0.25em] uppercase">
                            Transmission Log
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(58,124,255,0.3)]">
                        CLIENT <span className="text-[#3A7CFF]">FEEDBACK</span>
                    </h2>
                </div>

                {/* SCROLLING FEEDBACK LOOP */}
                <div className="relative w-full overflow-hidden">

                    {/* EDGE GRADIENT MASKS */}
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-black to-transparent z-20" />
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-black to-transparent z-20" />

                    {/* TRACK */}
                    <div className="flex gap-8 w-max animate-feedback-scroll">

                        {/* Duplicate array for seamless loop */}
                        {[...feedbacks, ...feedbacks].map((item, index) => (
                            <div
                                key={index}
                                className="relative w-[420px] shrink-0 p-10 rounded-2xl border border-[#3A7CFF]/20 bg-black/40 backdrop-blur-xl transition-all duration-500 hover:border-[#3A7CFF]/50"
                            >
                                {/* Quote Icon */}
                                <Quote className="absolute top-8 right-8 text-[#3A7CFF]/20 w-12 h-12 rotate-180" />

                                {/* Feedback Text */}
                                <p className="text-gray-300 text-lg leading-relaxed mb-8 italic">
                                    “{item.text}”
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#0a1025] border border-[#3A7CFF]/30" />
                                    <div>
                                        <h4 className="text-white font-bold tracking-wide">
                                            {item.name}
                                        </h4>
                                        <p className="text-[#3A7CFF] text-xs font-mono uppercase tracking-widest">
                                            {item.role}
                                        </p>
                                    </div>
                                </div>

                                {/* Subtle Scanline Overlay */}
                                <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:100%_4px]" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* LOCAL ANIMATION */}
            <style jsx>{`
        @keyframes feedback-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-feedback-scroll {
          animation: feedback-scroll 45s linear infinite;
        }
      `}</style>
        </section>
    );
}
