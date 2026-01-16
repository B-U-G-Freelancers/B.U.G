import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

/* =========================
   3D ORB (UNCHANGED)
========================= */
function ServiceOrb({ position, color, speed }) {
    const mesh = useRef();

    useFrame((_, delta) => {
        if (mesh.current) {
            mesh.current.rotation.y += delta * speed;
            mesh.current.rotation.x += delta * (speed * 0.5);
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={mesh} position={position}>
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={3}
                    wireframe
                />
            </mesh>
        </Float>
    );
}

/* =========================
   CYBER COLOR PALETTE
========================= */
const NEON_PALETTE = [
    "#0066ff",
    "#00f6ff",
    "#E947F5",
    "#ffe900",
    "#fa1616",
    "#16fa2f"
];

/* =========================
   FINAL SERVICES
========================= */
const services = [
    {
        title: "Website Development",
        desc: "Modern, responsive websites engineered for performance and clarity.",
    },
    {
        title: "UI / UX Design",
        desc: "Conversion-focused interfaces with elite cyberpunk aesthetics.",
    },
    {
        title: "AI Automation",
        desc: "Intelligent automation pipelines that eliminate manual workflows.",
    },
    {
        title: "Chatbot Deployment",
        desc: "Custom-trained chatbots deployed across platforms seamlessly.",
    },
    {
        title: "Content & Script Writing",
        desc: "High-impact storytelling crafted for digital products and brands.",
    },
    {
        title: "Logo Design & Animation",
        desc: "Distinct brand identities with motion-driven visual systems.",
    },
];

export default function Services() {
    return (
        <section
            id="services"
            className="relative min-h-screen py-28 bg-transparent text-white overflow-hidden pointer-events-none"
        >
            <div className="container mx-auto px-6 relative z-10 pointer-events-auto">

                {/* =========================
            HEADER
        ========================= */}
                <div className="mb-28 flex flex-col items-center text-center">

                    {/* SYSTEM LABEL */}
                    <div className="mb-8 inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/15 bg-black/40 backdrop-blur-md">
                        <span className="text-[#0066ff] text-xs font-mono font-bold tracking-[0.28em] uppercase drop-shadow-[0_0_14px_#0066ff]">
                            System Capabilities
                        </span>
                    </div>

                    {/* TITLE */}
                    <div className="relative">
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white relative z-10">
                            OUR SERVICES
                        </h2>

                        {/* CYBER GLOW */}
                        <h2 className="absolute inset-0 text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#0066ff] via-[#00f6ff] to-[#E947F5] blur-[4px] opacity-60">
                            OUR SERVICES
                        </h2>
                    </div>

                    <p className="mt-10 max-w-2xl text-lg text-gray-300 font-light leading-relaxed">
                        Modular digital systems engineered with
                        <span className="text-[#0066ff] font-semibold"> cyberpunk precision</span>.
                    </p>
                </div>

                {/* =========================
            SERVICES GRID
        ========================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
                    {services.map((service, index) => {
                        const color = NEON_PALETTE[index % NEON_PALETTE.length];

                        return (
                            <div
                                key={index}
                                className="group relative p-12 rounded-3xl border border-white/10 bg-[#050a14]/60 backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-2"
                            >
                                {/* TEXT */}
                                <div className="relative z-10">

                                    {/* TITLE */}
                                    <h3
                                        className="relative text-4xl font-bold mb-5 tracking-tight text-white group-hover:text-transparent bg-clip-text transition-all duration-500"
                                        style={{
                                            backgroundImage: `linear-gradient(to right, #ffffff, ${color})`,
                                        }}
                                    >
                                        {service.title}

                                        {/* ENERGY UNDERLINE */}
                                        <span
                                            className="absolute left-0 -bottom-2 h-[2px] w-0 group-hover:w-full transition-all duration-700"
                                            style={{
                                                background: `linear-gradient(to right, ${color}, transparent)`,
                                                boxShadow: `0 0 12px ${color}`,
                                            }}
                                        />
                                    </h3>

                                    {/* DESCRIPTION */}
                                    <p className="text-gray-400 group-hover:text-gray-200 leading-relaxed font-light text-xl transition-colors duration-500">
                                        {service.desc}
                                    </p>
                                </div>

                                {/* MICRO GLITCH TEXT LAYER */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.03]"
                                    style={{
                                        backgroundImage:
                                            "repeating-linear-gradient(0deg, rgba(255,255,255,0.5), rgba(255,255,255,0.5) 1px, transparent 1px, transparent 3px)",
                                    }}
                                />

                                {/* 3D ORB */}
                                <div className="absolute -top-14 -right-14 w-72 h-72 opacity-20 group-hover:opacity-45 transition-opacity duration-700 pointer-events-none">
                                    <Canvas gl={{ alpha: true }}>
                                        <ambientLight intensity={1} />
                                        <ServiceOrb
                                            position={[0, 0, 0]}
                                            color={color}
                                            speed={1 + index * 0.35}
                                        />
                                    </Canvas>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
