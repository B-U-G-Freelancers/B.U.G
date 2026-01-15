// src/components/gallery/EarthGlobe.jsx
// Spinning 3D Earth globe with Aladdin blue glitter effect on hover
import { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Aladdin Blue color palette
const ALADDIN_BLUE = {
  primary: "#3A7CFD",
  secondary: "#6B5BFF",
  glow: "#4F9EFF",
  dark: "#1E3A8A",
};

// Glitter particle system
function GlitterParticles({ active, mousePos }) {
  const particlesRef = useRef();
  const particleCount = 80;
  const positions = useRef(new Float32Array(particleCount * 3));
  const velocities = useRef([]);
  const lifetimes = useRef(new Float32Array(particleCount));
  const sizes = useRef(new Float32Array(particleCount));

  useEffect(() => {
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      positions.current[i * 3] = 0;
      positions.current[i * 3 + 1] = 0;
      positions.current[i * 3 + 2] = 0;
      velocities.current[i] = {
        x: (Math.random() - 0.5) * 0.05,
        y: (Math.random() - 0.5) * 0.05,
        z: (Math.random() - 0.5) * 0.05,
      };
      lifetimes.current[i] = 0;
      sizes.current[i] = Math.random() * 0.08 + 0.02;
    }
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const posAttr = particlesRef.current.geometry.attributes.position;
    const sizeAttr = particlesRef.current.geometry.attributes.size;

    for (let i = 0; i < particleCount; i++) {
      if (active && lifetimes.current[i] <= 0 && Math.random() > 0.92) {
        // Spawn new particle near mouse
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 0.3;
        positions.current[i * 3] = mousePos.x + Math.cos(angle) * radius;
        positions.current[i * 3 + 1] = mousePos.y + Math.sin(angle) * radius;
        positions.current[i * 3 + 2] = 0.5 + Math.random() * 0.3;
        velocities.current[i] = {
          x: (Math.random() - 0.5) * 0.03,
          y: Math.random() * 0.04 + 0.01,
          z: (Math.random() - 0.5) * 0.02,
        };
        lifetimes.current[i] = 1.0;
        sizes.current[i] = Math.random() * 0.1 + 0.03;
      }

      // Update particle
      if (lifetimes.current[i] > 0) {
        positions.current[i * 3] += velocities.current[i].x;
        positions.current[i * 3 + 1] += velocities.current[i].y;
        positions.current[i * 3 + 2] += velocities.current[i].z;
        lifetimes.current[i] -= 0.015;
        sizes.current[i] *= 0.985;
      }

      sizeAttr.array[i] = lifetimes.current[i] > 0 ? sizes.current[i] : 0;
    }

    posAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions.current}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes.current}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          attribute float size;
          varying float vAlpha;
          void main() {
            vAlpha = size * 10.0;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * 300.0 * (1.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying float vAlpha;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
            vec3 color1 = vec3(0.227, 0.486, 0.992); // #3A7CFD
            vec3 color2 = vec3(0.420, 0.357, 1.0);   // #6B5BFF
            vec3 color = mix(color1, color2, gl_PointCoord.y);
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </points>
  );
}

// The globe mesh
function Globe({ isHovered, images = [] }) {
  const meshRef = useRef();
  const glowRef = useRef();
  const [hoverIntensity, setHoverIntensity] = useState(0);

  // Create a composite texture from project images
  const compositeTexture = useRef(null);

  useEffect(() => {
    // Create canvas texture with project images arranged on sphere
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");

    // Dark base with gradient
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, "#0a0a1a");
    gradient.addColorStop(0.5, "#1a1a2e");
    gradient.addColorStop(1, "#0f0f23");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = "rgba(58, 124, 253, 0.15)";
    ctx.lineWidth = 1;

    // Latitude lines
    for (let i = 0; i < 12; i++) {
      const y = (canvas.height / 12) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Longitude lines
    for (let i = 0; i < 24; i++) {
      const x = (canvas.width / 24) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Add glowing nodes at intersections
    ctx.fillStyle = ALADDIN_BLUE.primary;
    for (let i = 1; i < 12; i++) {
      for (let j = 0; j < 24; j++) {
        if (Math.random() > 0.7) {
          const x = (canvas.width / 24) * j;
          const y = (canvas.height / 12) * i;
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    compositeTexture.current = new THREE.CanvasTexture(canvas);
    compositeTexture.current.needsUpdate = true;

    // Load project images into specific regions
    if (images.length > 0) {
      const loadImages = async () => {
        const cols = 4;
        const rows = 2;
        const tileW = canvas.width / cols;
        const tileH = canvas.height / rows;

        for (let i = 0; i < Math.min(images.length, cols * rows); i++) {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = images[i].image || images[i].src;

          img.onload = () => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x = col * tileW + tileW * 0.1;
            const y = row * tileH + tileH * 0.1;
            const w = tileW * 0.8;
            const h = tileH * 0.8;

            // Draw rounded rectangle with image
            ctx.save();
            ctx.beginPath();
            const r = 20;
            ctx.roundRect(x, y, w, h, r);
            ctx.clip();
            ctx.globalAlpha = 0.6;
            ctx.drawImage(img, x, y, w, h);
            ctx.restore();

            // Border glow
            ctx.strokeStyle = ALADDIN_BLUE.glow;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(x, y, w, h, r);
            ctx.stroke();

            compositeTexture.current.needsUpdate = true;
          };
        }
      };
      loadImages();
    }
  }, [images]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Continuous rotation
      meshRef.current.rotation.y += delta * 0.15;
      // Subtle tilt
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }

    // Animate hover intensity
    const targetIntensity = isHovered ? 1 : 0;
    setHoverIntensity((prev) => prev + (targetIntensity - prev) * 0.08);

    // Glow effect
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.15 + hoverIntensity * 0.25;
      glowRef.current.scale.setScalar(1.15 + hoverIntensity * 0.1);
    }
  });

  return (
    <group>
      {/* Outer glow */}
      <Sphere ref={glowRef} args={[2.3, 32, 32]}>
        <meshBasicMaterial
          color={ALADDIN_BLUE.glow}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Main globe */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          map={compositeTexture.current}
          emissive={ALADDIN_BLUE.primary}
          emissiveIntensity={hoverIntensity * 0.3}
          metalness={0.3}
          roughness={0.7}
        />
      </Sphere>

      {/* Inner glow core */}
      <Sphere args={[1.95, 32, 32]}>
        <meshBasicMaterial
          color={ALADDIN_BLUE.dark}
          transparent
          opacity={0.5}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

// Mouse tracker
function MouseTracker({ onMouseMove }) {
  const { camera, size } = useThree();

  useFrame(({ mouse }) => {
    // Convert mouse to world position
    const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));
    onMouseMove({ x: pos.x, y: pos.y });
  });

  return null;
}

// Main scene
function Scene({ onEnter, images }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight
        position={[-10, -10, -10]}
        intensity={0.5}
        color={ALADDIN_BLUE.primary}
      />

      <group
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <Globe isHovered={isHovered} images={images} />
      </group>

      <GlitterParticles active={isHovered} mousePos={mousePos} />
      <MouseTracker onMouseMove={setMousePos} />
    </>
  );
}

// Main component
export default function EarthGlobe({ onEnter, projects = [] }) {
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Entrance animation delay
    const timer = setTimeout(() => setIsReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #0a0a1a 0%, #060010 100%)",
        opacity: isReady ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene onEnter={onEnter} images={projects} />
        </Canvas>
      </div>

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center text-center pointer-events-none">
        {/* Title */}
        <h1
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-4"
          style={{
            textShadow: `0 0 60px ${ALADDIN_BLUE.primary}40`,
            opacity: isReady ? 1 : 0,
            transform: isReady ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.3s",
          }}
        >
          Enter Our World
        </h1>

        <p
          className="text-lg sm:text-xl text-gray-400 mb-12 max-w-md"
          style={{
            opacity: isReady ? 1 : 0,
            transform: isReady ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.5s",
          }}
        >
          Discover the projects that define our craft
        </p>

        {/* CTA Button */}
        <button
          onClick={onEnter}
          className="pointer-events-auto group relative px-10 py-4 rounded-full font-bold text-lg text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: `linear-gradient(135deg, ${ALADDIN_BLUE.primary}, ${ALADDIN_BLUE.secondary})`,
            boxShadow: `0 0 40px ${ALADDIN_BLUE.primary}60, inset 0 0 20px ${ALADDIN_BLUE.glow}30`,
            opacity: isReady ? 1 : 0,
            transform: isReady ? "translateY(0)" : "translateY(20px)",
            transition:
              "opacity 0.8s ease 0.7s, transform 0.8s ease 0.7s, box-shadow 0.3s, scale 0.2s",
          }}
        >
          {/* Shimmer effect */}
          <span
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            }}
          />
          <span className="relative flex items-center gap-3">
            Explore Works
            <span className="material-symbols-outlined">arrow_forward</span>
          </span>
        </button>
      </div>

      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              background: `radial-gradient(circle, ${ALADDIN_BLUE.glow}, transparent)`,
              opacity: Math.random() * 0.5 + 0.2,
              animation: `float ${
                Math.random() * 10 + 10
              }s ease-in-out infinite`,
              animationDelay: `-${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* CSS for floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
      `}</style>
    </div>
  );
}
