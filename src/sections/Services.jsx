// Services section with individual WebGL orbs per card
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

/* =========================
   CYBER COLOR PALETTE
========================= */
const NEON_PALETTE = [
  "#0066ff",
  "#00f6ff",
  "#E947F5",
  "#ffe900",
  "#fa1616",
  "#16fa2f",
];

/* =========================
   WEBGL SERVICE ORB
   (Small, per-card)
========================= */
function ServiceOrb({ color, isHovered }) {
  const mesh = useRef();

  useFrame((_, delta) => {
    if (mesh.current) {
      const speed = isHovered ? 2 : 0.5;
      mesh.current.rotation.y += delta * speed;
      mesh.current.rotation.x += delta * (speed * 0.5);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={mesh} scale={isHovered ? 1.2 : 1}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered ? 4 : 2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

/* =========================
   SERVICE CARD WITH ORB
========================= */
function ServiceCard({ service, color }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl border border-white/10 bg-[#050a14]/60 backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* TEXT */}
      <div className="relative z-10">
        {/* TITLE */}
        <h3
          className="relative text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-5 tracking-tight text-white group-hover:text-transparent bg-clip-text transition-all duration-500"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff, ${color})`,
          }}
        >
          {service.title}

          {/* ENERGY UNDERLINE */}
          <span
            className="absolute left-0 -bottom-2 h-0.5 w-0 group-hover:w-full transition-all duration-700"
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

      {/* SMALL WEBGL ORB - positioned in corner */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 md:w-40 md:h-40 pointer-events-none transition-opacity duration-300"
        style={{ opacity: isHovered ? 0.8 : 0.4 }}
      >
        <Canvas
          gl={{
            alpha: true,
            antialias: false,
            powerPreference: "low-power",
            failIfMajorPerformanceCaveat: false,
          }}
          camera={{ position: [0, 0, 3], fov: 50 }}
          dpr={1}
          frameloop="always"
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[2, 2, 2]} intensity={1} color={color} />
          <ServiceOrb color={color} isHovered={isHovered} />
        </Canvas>
      </div>

      {/* Glow effect behind orb */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none blur-3xl"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

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
      className="relative min-h-screen py-16 md:py-28 bg-transparent text-white overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* =========================
            HEADER
        ========================= */}
        <div className="mb-16 md:mb-28 flex flex-col items-center text-center">
          {/* SYSTEM LABEL */}
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/15 bg-black/40 backdrop-blur-md">
            <span className="text-[#0066ff] text-xs font-mono font-bold tracking-[0.28em] uppercase drop-shadow-[0_0_14px_#0066ff]">
              System Capabilities
            </span>
          </div>

          {/* TITLE */}
          <div className="relative">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter text-white relative z-10">
              OUR SERVICES
            </h2>

            {/* CYBER GLOW */}
            <h2 className="absolute inset-0 text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-[#0066ff] via-[#00f6ff] to-[#E947F5] blur-xs opacity-60">
              OUR SERVICES
            </h2>
          </div>

          <p className="mt-6 md:mt-10 max-w-2xl text-base md:text-lg text-gray-300 font-light leading-relaxed px-4">
            Modular digital systems engineered with
            <span className="text-[#0066ff] font-semibold">
              {" "}
              cyberpunk precision
            </span>
            .
          </p>
        </div>

        {/* =========================
            SERVICES GRID
        ========================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              color={NEON_PALETTE[index % NEON_PALETTE.length]}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
