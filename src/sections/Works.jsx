import { ArrowRight, ArrowUpRight } from "lucide-react";

const PROJECTS = [
    {
        title: "Nova Finance",
        category: "Fintech • Mobile App & Dashboard",
        image:
            "https://images.unsplash.com/photo-1639322537228-ad714291f22c?q=80&w=2600&auto=format&fit=crop",
        stagger: false,
    },
    {
        title: "Aether Core",
        category: "SaaS • AI Infrastructure",
        image:
            "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
        stagger: true,
    },
    {
        title: "Lumina Vision",
        category: "E-commerce • 3D Design System",
        image:
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        stagger: false,
    },
    {
        title: "MedSync Prime",
        category: "Healthcare • Bio-Tech Interface",
        image:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop",
        stagger: true,
    },
];

export default function Works() {
    return (
        <section
            id="works"
            className="relative py-40 px-6 lg:px-8 bg-transparent pointer-events-none overflow-hidden"
        >
            {/* SECTION AURA (Luxury Contrast Layer) */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
                <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3A7CFF]/10 blur-[180px]" />
            </div>

            <div className="mx-auto max-w-7xl relative z-10 pointer-events-auto">
                {/* HEADER */}
                <div className="flex items-end justify-between mb-28">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 border border-[#3A7CFF]/30 rounded-full bg-[#3A7CFF]/10 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-[#3A7CFF] animate-pulse shadow-[0_0_8px_#3A7CFF]" />
                            <span className="text-[#3A7CFF] text-xs font-mono font-bold tracking-[0.25em] uppercase">
                                Project Archives
                            </span>
                        </div>

                        <h2 className="text-5xl sm:text-7xl font-black tracking-tighter text-white leading-tight">
                            SELECTED{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A7CFF] to-[#00f6ff]">
                                WORKS
                            </span>
                        </h2>
                    </div>

                    <a
                        href="#"
                        className="hidden sm:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#3A7CFF] hover:text-white transition-colors group"
                    >
                        View all projects
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>

                {/* PROJECT GRID */}
                <div className="grid gap-16 md:grid-cols-2 lg:gap-24">
                    {PROJECTS.map((project) => (
                        <div
                            key={project.title}
                            className={`group ${project.stagger ? "md:mt-32" : ""}`}
                        >
                            {/* CARD */}
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-700 group-hover:border-[#3A7CFF]/70">

                                {/* IMAGE */}
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover scale-105 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[1200ms]"
                                />

                                {/* LUXURY OVERLAYS */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:100%_4px]" />

                                {/* DATA HUD */}
                                <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                                    <span className="w-1.5 h-1.5 bg-[#3A7CFF] rounded-full animate-pulse" />
                                    <span className="text-xs font-mono uppercase tracking-widest text-[#3A7CFF]">
                                        Case Study
                                    </span>
                                </div>

                                {/* CTA */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700">
                                    <div className="w-20 h-20 rounded-full bg-[#3A7CFF] text-black flex items-center justify-center scale-75 group-hover:scale-100 transition-transform shadow-[0_0_30px_#3A7CFF]">
                                        <ArrowUpRight className="w-9 h-9" />
                                    </div>
                                </div>
                            </div>

                            {/* META */}
                            <div className="mt-10 pl-4 border-l-2 border-white/0 group-hover:border-[#3A7CFF] transition-all">
                                <h3 className="text-3xl font-bold text-white group-hover:text-[#3A7CFF] transition-colors">
                                    {project.title}
                                </h3>
                                <p className="mt-2 text-xs font-mono uppercase tracking-[0.25em] text-gray-400">
                                    {project.category}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* MOBILE CTA */}
                <div className="mt-24 sm:hidden">
                    <a
                        href="#"
                        className="flex items-center justify-center gap-2 w-full py-6 border border-[#3A7CFF]/30 rounded-xl text-sm font-bold uppercase tracking-widest text-[#3A7CFF] hover:bg-[#3A7CFF] hover:text-black transition-colors"
                    >
                        View all projects
                        <ArrowRight className="size-4" />
                    </a>
                </div>
            </div>
        </section>
    );
}
