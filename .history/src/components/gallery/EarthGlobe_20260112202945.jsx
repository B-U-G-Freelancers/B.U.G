// src/components/gallery/EarthGlobe.jsx
// Wireframe globe intro with floating project cards
import { useRef, useEffect, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Color palette
const COLORS = {
  grid: "#3A7CFD",
  gridDim: "#1a3a6d",
  accent: "#6B5BFF",
  text: "#ffffff",
};

// Wireframe globe component
function WireframeGlobe() {
  const groupRef = useRef();

  // Create wireframe sphere geometry
  const { latLines, longLines, glowRings } = useMemo(() => {
    const latLines = [];
    const longLines = [];
    const glowRings = [];

    // Latitude lines (horizontal circles)
    const latCount = 12;
    for (let i = 0; i <= latCount; i++) {
      const phi = (i / latCount) * Math.PI;
      const radius = 2;
      const y = Math.cos(phi) * radius;
      const ringRadius = Math.sin(phi) * radius;

      if (ringRadius > 0.01) {
        const points = [];
        const segments = 64;
        for (let j = 0; j <= segments; j++) {
          const theta = (j / segments) * Math.PI * 2;
          points.push(
            new THREE.Vector3(
              Math.cos(theta) * ringRadius,
              y,
              Math.sin(theta) * ringRadius
            )
          );
        }
        latLines.push(points);
      }
    }

    // Longitude lines (vertical great circles)
    const longCount = 24;
    for (let i = 0; i < longCount; i++) {
      const theta = (i / longCount) * Math.PI * 2;
      const points = [];
      const segments = 64;
      for (let j = 0; j <= segments; j++) {
        const phi = (j / segments) * Math.PI;
        const radius = 2;
        points.push(
          new THREE.Vector3(
            Math.sin(phi) * Math.cos(theta) * radius,
            Math.cos(phi) * radius,
            Math.sin(phi) * Math.sin(theta) * radius
          )
        );
      }
      longLines.push(points);
    }

    // Glow rings at equator
    const glowPoints = [];
    for (let j = 0; j <= 64; j++) {
      const theta = (j / 64) * Math.PI * 2;
      glowPoints.push(
        new THREE.Vector3(Math.cos(theta) * 2.05, 0, Math.sin(theta) * 2.05)
      );
    }
    glowRings.push(glowPoints);

    return { latLines, longLines, glowRings };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slow continuous rotation
      groupRef.current.rotation.y += delta * 0.08;
      // Subtle tilt breathing
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Latitude lines */}
      {latLines.map((points, i) => (
        <line key={`lat-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={points.length}
              array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={COLORS.gridDim}
            transparent
            opacity={0.4}
            linewidth={1}
          />
        </line>
      ))}

      {/* Longitude lines */}
      {longLines.map((points, i) => (
        <line key={`long-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={points.length}
              array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={COLORS.gridDim}
            transparent
            opacity={0.3}
            linewidth={1}
          />
        </line>
      ))}

      {/* Glow ring at equator */}
      {glowRings.map((points, i) => (
        <line key={`glow-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={points.length}
              array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={COLORS.grid}
            transparent
            opacity={0.6}
            linewidth={2}
          />
        </line>
      ))}

      {/* Inner atmosphere glow */}
      <mesh>
        <sphereGeometry args={[1.98, 32, 32]} />
        <meshBasicMaterial
          color={COLORS.grid}
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// Floating project card in 3D space
function FloatingCard({ project, position, rotation, index, onHover }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const initialPos = useRef(position);
  const time = useRef(index * 17.5); // Deterministic initial offset based on index

  useFrame((state, delta) => {
    if (meshRef.current) {
      time.current += delta;
      // Gentle floating animation
      meshRef.current.position.y =
        initialPos.current[1] + Math.sin(time.current * 0.5 + index) * 0.1;
      meshRef.current.position.x =
        initialPos.current[0] + Math.sin(time.current * 0.3 + index * 2) * 0.05;

      // Scale on hover
      const targetScale = hovered ? 1.15 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerEnter={() => {
        setHovered(true);
        onHover?.(project);
      }}
      onPointerLeave={() => {
        setHovered(false);
        onHover?.(null);
      }}
    >
      <planeGeometry args={[1.2, 0.8]} />
      <meshBasicMaterial color="#1a1a2e" transparent opacity={0.9} />
    </mesh>
  );
}

// Image cards floating around the globe
function FloatingCards({ projects, isGalleryMode }) {
  // Calculate 3D positions around the globe
  const cardPositions = useMemo(() => {
    return projects.map((project, i) => {
      const phi = Math.acos(-1 + (2 * (i + 0.5)) / projects.length);
      const theta = Math.sqrt(projects.length * Math.PI) * phi;
      const radius = 3.5;
      return {
        position: [
          Math.cos(theta) * Math.sin(phi) * radius,
          Math.cos(phi) * radius * 0.6,
          Math.sin(theta) * Math.sin(phi) * radius,
        ],
        rotation: [0, -theta, 0],
      };
    });
  }, [projects]);

  if (!isGalleryMode) return null;

  return (
    <>
      {projects.map((project, i) => (
        <FloatingCard
          key={project.id}
          project={project}
          position={cardPositions[i].position}
          rotation={cardPositions[i].rotation}
          index={i}
        />
      ))}
    </>
  );
}

// Main scene
function Scene({ projects, isGalleryMode }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <WireframeGlobe isGalleryMode={isGalleryMode} />
      <FloatingCards projects={projects} isGalleryMode={isGalleryMode} />
    </>
  );
}

// Glitch text component
function GlitchText({ children, className = "" }) {
  return (
    <div className={`glitch-text-container ${className}`}>
      <span className="glitch-text" data-text={children}>
        {children}
      </span>
      <style>{`
        .glitch-text-container {
          position: relative;
        }
        .glitch-text {
          position: relative;
          display: inline-block;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .glitch-text::before {
          left: 2px;
          text-shadow: -2px 0 #ff0040;
          clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
          animation: glitch-anim-1 2s infinite linear alternate-reverse;
        }
        .glitch-text::after {
          left: -2px;
          text-shadow: 2px 0 #00ffff;
          clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
          animation: glitch-anim-2 3s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim-1 {
          0%, 100% { clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%); }
          25% { clip-path: polygon(0 15%, 100% 15%, 100% 50%, 0 50%); }
          50% { clip-path: polygon(0 40%, 100% 40%, 100% 75%, 0 75%); }
          75% { clip-path: polygon(0 25%, 100% 25%, 100% 60%, 0 60%); }
        }
        @keyframes glitch-anim-2 {
          0%, 100% { clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%); }
          25% { clip-path: polygon(0 50%, 100% 50%, 100% 85%, 0 85%); }
          50% { clip-path: polygon(0 70%, 100% 70%, 100% 100%, 0 100%); }
          75% { clip-path: polygon(0 60%, 100% 60%, 100% 95%, 0 95%); }
        }
      `}</style>
    </div>
  );
}

// Main component
export default function EarthGlobe({ onEnter, projects = [] }) {
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [isGalleryMode, setIsGalleryMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setIsGalleryMode(true);
    setTimeout(() => {
      onEnter?.();
    }, 800);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
      style={{
        background: "#000000",
        opacity: isReady ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene projects={projects} isGalleryMode={isGalleryMode} />
        </Canvas>
      </div>

      {/* Intro overlay - visible until gallery mode */}
      <div
        className="relative z-10 flex flex-col items-center text-center pointer-events-none transition-opacity duration-700"
        style={{
          opacity: isGalleryMode ? 0 : 1,
        }}
      >
        {/* Title with glitch effect */}
        <GlitchText>
          <h1
            className="font-display text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-white"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            <span className="font-bold tracking-tight">GENIE</span>
            <span
              className="italic font-light"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              WORLD
            </span>
          </h1>
        </GlitchText>

        {/* Globe icon */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <svg
            className="w-8 h-8 text-white/60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <circle cx="12" cy="12" r="10" />
            <ellipse cx="12" cy="12" rx="10" ry="4" />
            <path d="M12 2v20" />
            <path d="M2 12h20" />
          </svg>
          <p className="text-sm text-white/50 tracking-widest uppercase">
            Drag to explore our world
          </p>
        </div>
      </div>

      {/* Enter button - only visible in intro */}
      {!isGalleryMode && (
        <button
          onClick={handleEnter}
          className="absolute bottom-12 pointer-events-auto px-8 py-3 rounded-full border border-white/20 text-white/80 text-sm tracking-widest uppercase hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          style={{
            opacity: isReady ? 1 : 0,
            transform: isReady ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s",
          }}
        >
          Explore Works
        </button>
      )}

      {/* Corner branding */}
      <div className="absolute top-6 left-6 z-10">
        <p className="text-white text-sm tracking-wide">
          <span className="font-light">B.U.G</span>{" "}
          <span className="font-bold">studio</span>
        </p>
      </div>

      {/* Copyright */}
      <div className="absolute bottom-6 right-6 z-10">
        <p className="text-white/40 text-xs">©2025</p>
      </div>
    </div>
  );
}
