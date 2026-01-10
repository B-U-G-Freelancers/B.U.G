import React, { useState, useEffect } from 'react';

// --- Constants ---
const PROJECTS = [
    {
        id: '1',
        year: '2024',
        category: 'FINTECH',
        subcategory: 'BACKEND',
        title: 'Nebula Finance',
        description: 'Re-architected the core transaction engine to reduce latency by 400ms, enabling real-time high-frequency trading for institutional clients.'
    },
    {
        id: '2',
        year: '2023',
        category: 'HEALTHCARE',
        subcategory: 'MOBILE',
        title: 'Aether Health',
        description: 'Built a HIPAA-compliant telehealth infrastructure capable of scaling to 50k concurrent patients with zero downtime during peak hours.'
    },
    {
        id: '3',
        year: '2024',
        category: 'AI / SAAS',
        subcategory: 'R&D',
        title: 'Velocity AI',
        description: 'Integrated proprietary LLM models for automated customer support, reducing human agent workload by 65% while increasing resolution accuracy.'
    },
    {
        id: '4',
        year: '2022',
        category: 'AUTOMOTIVE',
        subcategory: 'EMBEDDED',
        title: 'Flux Drive',
        description: 'Developed the OS middleware for next-gen EV dashboards, optimizing touch response rates and battery consumption metrics.'
    }
];

const NAV_LINKS = [
    { label: 'Works', href: '#works' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' }
];

// --- Components ---

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-bg-dark/80 backdrop-blur-md border-b border-white/5 h-16' : 'h-24'}`}>
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-12">
                <div className="flex items-center gap-3 text-white group cursor-pointer">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-white text-black transition-transform duration-300 group-hover:rotate-12">
                        <span className="material-symbols-outlined" style={{ fontSize: '20px', fontWeight: 'bold' }}>bug_report</span>
                    </div>
                    <h2 className="text-xl font-black tracking-tighter uppercase">Bug</h2>
                </div>

                <nav className="hidden md:flex items-center gap-10">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
                            href={link.href}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-6">
                    <a className="hidden text-sm font-medium text-gray-400 transition-colors hover:text-white md:block" href="#login">
                        Login
                    </a>
                    <button className="flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-bold text-black transition-all hover:bg-primary hover:text-white active:scale-95">
                        Get in Touch
                    </button>
                </div>
            </div>
        </header>
    );
};

const Hero = () => {
    return (
        <section className="pt-40 pb-20 lg:pt-48 lg:pb-32">
            <div className="flex flex-col gap-8">
                <h1 className="font-display text-7xl font-black uppercase leading-[0.85] tracking-tighter text-white sm:text-8xl lg:text-[10rem]">
                    Selected <br />
                    <span className="text-gray-900/80 drop-shadow-[0_0_1px_rgba(255,255,255,0.1)] transition-colors hover:text-gray-800">Works</span>
                </h1>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                    <div className="h-[2px] w-12 bg-primary"></div>
                    <p className="text-lg font-normal text-gray-400">Engineering digital wishes into reality.</p>
                </div>
            </div>
        </section>
    );
};

const ProjectItem = ({ project }) => {
    return (
        <div className="group relative flex flex-col gap-8 border-t border-white/10 py-16 transition-all hover:bg-white/[0.02] sm:flex-row sm:justify-between sm:gap-12 lg:px-8">
            <div className="flex flex-1 flex-col gap-5">
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    <span>{project.year}</span>
                    <span className="h-1 w-1 rounded-full bg-gray-700"></span>
                    <span>{project.category}</span>
                    <span className="h-1 w-1 rounded-full bg-gray-700"></span>
                    <span>{project.subcategory}</span>
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className="font-display text-4xl font-bold tracking-tighter text-white transition-colors group-hover:text-primary sm:text-6xl">
                        {project.title}
                    </h3>
                    <p className="max-w-2xl text-lg leading-relaxed text-gray-400 group-hover:text-gray-300">
                        {project.description}
                    </p>
                </div>
            </div>
            <div className="flex shrink-0 items-start pt-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 text-white transition-all duration-500 group-hover:border-primary group-hover:bg-primary group-hover:text-white group-hover:rotate-[-45deg]">
                    <span className="material-symbols-outlined font-light" style={{ fontSize: '28px' }}>arrow_outward</span>
                </div>
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="mt-auto border-t border-white/5 bg-black py-12">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 sm:flex-row lg:px-12">
                <div className="text-sm font-medium text-gray-600">
                    © 2024 BUG. All rights reserved.
                </div>

                <div className="flex gap-10">
                    <a className="text-gray-500 transition-colors hover:text-white" href="#" aria-label="X (Twitter)">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                        </svg>
                    </a>
                    <a className="text-gray-500 transition-colors hover:text-white" href="#" aria-label="GitHub">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
};

const WorkDetail = () => {
    return (
        <div className="flex min-h-screen flex-col bg-bg-dark font-sans selection:bg-primary selection:text-white">
            <Navbar />

            <main className="flex-grow">
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <Hero />

                    <section id="works" className="flex flex-col pb-32">
                        {PROJECTS.map((project) => (
                            <ProjectItem key={project.id} project={project} />
                        ))}

                        <div className="mt-24 border-t border-white/10 pt-32 text-center pb-20">
                            <p className="mb-8 text-[11px] font-bold uppercase tracking-[0.3em] text-gray-500">
                                Ready to build?
                            </p>
                            <button className="group inline-flex items-center justify-center gap-4 rounded-xl bg-white px-10 py-5 text-lg font-bold text-black transition-all hover:bg-primary hover:text-white active:scale-95">
                                <span>Start Your Project</span>
                                <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                            </button>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default WorkDetail;
