// src/components/gallery/EarthGlobe.jsx
// Neptune 3D planet intro with glitter effects
import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// Aladdin Blue color palette
const ALADDIN_BLUE = {
  primary: "#3A7CFD",
  secondary: "#6B5BFF",
  glow: "#4F9EFF",
  dark: "#1E3A8A",
};

// Seeded random for deterministic generation
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Glitter particle system
function GlitterParticles({ active, mousePos }) {
  const particlesRef = useRef();
  const particleCount = 80;

  // Use refs for mutable particle data
  const positionsRef = useRef(null);
  const velocitiesRef = useRef(null);
  const lifetimesRef = useRef(null);
  const sizesRef = useRef(null);

  // Initialize once
  if (!positionsRef.current) {
    positionsRef.current = new Float32Array(particleCount * 3);
    velocitiesRef.current = [];
    lifetimesRef.current = new Float32Array(particleCount);
    sizesRef.current = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positionsRef.current[i * 3] = 0;
      positionsRef.current[i * 3 + 1] = 0;
      positionsRef.current[i * 3 + 2] = 0;
      velocitiesRef.current[i] = {
        x: (seededRandom(i * 3) - 0.5) * 0.05,
        y: (seededRandom(i * 3 + 1) - 0.5) * 0.05,
        z: (seededRandom(i * 3 + 2) - 0.5) * 0.05,
      };
      lifetimesRef.current[i] = 0;
      sizesRef.current[i] = seededRandom(i * 7) * 0.08 + 0.02;
    }
  }

  useFrame(() => {
    if (!particlesRef.current) return;

    const positions = positionsRef.current;
    const velocities = velocitiesRef.current;
    const lifetimes = lifetimesRef.current;
    const sizes = sizesRef.current;

    const posAttr = particlesRef.current.geometry.attributes.position;
    const sizeAttr = particlesRef.current.geometry.attributes.size;

    for (let i = 0; i < particleCount; i++) {
      if (active && lifetimes[i] <= 0 && Math.random() > 0.92) {
        // Spawn new particle near mouse
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 0.3;
        positions[i * 3] = mousePos.x + Math.cos(angle) * radius;
        positions[i * 3 + 1] = mousePos.y + Math.sin(angle) * radius;
        positions[i * 3 + 2] = 0.5 + Math.random() * 0.3;
        velocities[i] = {
          x: (Math.random() - 0.5) * 0.03,
          y: Math.random() * 0.04 + 0.01,
          z: (Math.random() - 0.5) * 0.02,
        };
        lifetimes[i] = 1.0;
        sizes[i] = Math.random() * 0.1 + 0.03;
      }

      // Update particle
      if (lifetimes[i] > 0) {
        positions[i * 3] += velocities[i].x;
        positions[i * 3 + 1] += velocities[i].y;
        positions[i * 3 + 2] += velocities[i].z;
        lifetimes[i] -= 0.015;
        sizes[i] *= 0.985;
      }

      sizeAttr.array[i] = lifetimes[i] > 0 ? sizes[i] : 0;
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
          array={positionsRef.current}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizesRef.current}
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

// Neptune planet using FBX model
function NeptunePlanet({ isHovered }) {
  const groupRef = useRef();
  const glowRef = useRef();
  const [hoverIntensity, setHoverIntensity] = useState(0);

  // Load the FBX model
  const fbx = useLoader(FBXLoader, "/3d/source/neptune.fbx");

  // Load textures
  const [diffuseMap1, diffuseMap2, bumpMap1, specMap, bumpMap2] = useTexture([
    "/3d/textures/Uv1_neptune1_diff.png",
    "/3d/textures/Uv1_neptune2_diff.png",
    "/3d/textures/Uv2_neptune1_bump.png",
    "/3d/textures/Uv2_neptune1_spec.png",
    "/3d/textures/Uv2_neptune2_bump.png",
  ]);

  // Apply textures to the model
  useEffect(() => {
    if (fbx) {
      fbx.traverse((child) => {
        if (child.isMesh) {
          // Apply main diffuse texture with emissive glow
          child.material = new THREE.MeshStandardMaterial({
            map: diffuseMap1,
            bumpMap: bumpMap1,
            bumpScale: 0.05,
            metalness: 0.2,
            roughness: 0.7,
            emissive: new THREE.Color(ALADDIN_BLUE.primary),
            emissiveIntensity: 0.1,
          });
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [fbx, diffuseMap1, bumpMap1]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Continuous rotation
      groupRef.current.rotation.y += delta * 0.1;
      // Subtle wobble
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      groupRef.current.rotation.z =
        Math.cos(state.clock.elapsedTime * 0.2) * 0.03;
    }

    // Animate hover intensity
    const targetIntensity = isHovered ? 1 : 0;
    setHoverIntensity((prev) => prev + (targetIntensity - prev) * 0.08);

    // Update emissive on hover
    if (fbx) {
      fbx.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.emissiveIntensity = 0.1 + hoverIntensity * 0.3;
        }
      });
    }

    // Glow effect
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.12 + hoverIntensity * 0.2;
      glowRef.current.scale.setScalar(1.1 + hoverIntensity * 0.08);
    }
  });

  // Calculate scale to fit nicely in view
  const scale = 0.015; // Adjust based on model size

  return (
    <group ref={groupRef}>
      {/* Outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[180 * scale, 32, 32]} />
        <meshBasicMaterial
          color={ALADDIN_BLUE.glow}
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Neptune FBX model */}
      <primitive object={fbx} scale={scale} />

      {/* Atmospheric rim light effect */}
      <mesh>
        <sphereGeometry args={[175 * scale, 64, 64]} />
        <shaderMaterial
          transparent
          side={THREE.BackSide}
          uniforms={{
            glowColor: { value: new THREE.Color(ALADDIN_BLUE.glow) },
            intensity: { value: 0.6 + hoverIntensity * 0.4 },
          }}
          vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform vec3 glowColor;
            uniform float intensity;
            varying vec3 vNormal;
            void main() {
              float glow = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
              gl_FragColor = vec4(glowColor, glow * intensity * 0.5);
            }
          `}
        />
      </mesh>
    </group>
  );
}

// Loading fallback
function LoadingFallback() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color={ALADDIN_BLUE.dark}
        emissive={ALADDIN_BLUE.primary}
        emissiveIntensity={0.2}
        wireframe
      />
    </mesh>
  );
}

// Mouse tracker
function MouseTracker({ onMouseMove }) {
  const { camera } = useThree();

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
function Scene() {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
      <pointLight
        position={[-10, -10, -10]}
        intensity={0.6}
        color={ALADDIN_BLUE.primary}
      />
      <pointLight
        position={[5, -5, 5]}
        intensity={0.4}
        color={ALADDIN_BLUE.secondary}
      />

      <group
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <Suspense fallback={<LoadingFallback />}>
          <NeptunePlanet isHovered={isHovered} />
        </Suspense>
      </group>

      <GlitterParticles active={isHovered} mousePos={mousePos} />
      <MouseTracker onMouseMove={setMousePos} />
    </>
  );
}

// Pre-generate floating particles to avoid Math.random during render
const FLOATING_PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  width: (Math.sin(i * 1.5) * 0.5 + 0.5) * 3 + 1,
  height: (Math.cos(i * 1.7) * 0.5 + 0.5) * 3 + 1,
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  opacity: (Math.sin(i * 2.3) * 0.5 + 0.5) * 0.4 + 0.1,
  duration: (Math.sin(i * 1.9) * 0.5 + 0.5) * 15 + 10,
  delay: (i * 0.7) % 10,
}));

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
          <Scene />
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
        {FLOATING_PARTICLES.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.width + "px",
              height: particle.height + "px",
              left: particle.left + "%",
              top: particle.top + "%",
              background: `radial-gradient(circle, ${ALADDIN_BLUE.glow}, transparent)`,
              opacity: particle.opacity,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `-${particle.delay}s`,
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
