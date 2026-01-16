import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Sparkles, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function Core() {
  const ring = useRef();
  const innerRing = useRef();
  const coreObj = useRef();

  useFrame((state, delta) => {
    if (ring.current) {
      ring.current.rotation.z += delta * 0.2;
      ring.current.rotation.x += delta * 0.05;
    }
    if (innerRing.current) {
      innerRing.current.rotation.z -= delta * 0.3;
      innerRing.current.rotation.y += delta * 0.1;
    }
    if (coreObj.current) {
      coreObj.current.rotation.y -= delta * 0.4;
      coreObj.current.rotation.x -= delta * 0.2;
    }
  });

  return (
    <group>
      {/* Main Holographic Ring */}
      <mesh ref={ring}>
        <torusGeometry args={[2, 0.08, 32, 100]} />
        <meshStandardMaterial
          color="#4f9cff"
          emissive="#1e90ff"
          emissiveIntensity={2}
          metalness={1}
          roughness={0}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Inner Fast Ring */}
      <mesh ref={innerRing} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.4, 0.03, 32, 80]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={3}
          metalness={1}
          roughness={0}
          toneMapped={false}
        />
      </mesh>

      {/* Central Core sphere */}
      <mesh ref={coreObj} scale={0.5}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
           color="#101010"
           emissive="#4f9cff"
           emissiveIntensity={1}
           wireframe
        />
      </mesh>
    </group>
  );
}

function FloatingPanels() {
  const group = useRef();
  
  useFrame((state, delta) => {
    // Gentle floating for the whole panel group
    if(group.current) {
        group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  // Create random panel positions
  const panels = useMemo(() => {
    return new Array(6).fill(0).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 8, // Wider spread
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4 - 2 // Mostly behind or around
      ],
      rotation: [
        Math.random() * 0.2,
        Math.random() * 0.5,
        Math.random() * 0.2
      ],
      scale: 0.5 + Math.random() * 0.5
    }));
  }, []);

  return (
    <group ref={group}>
      {panels.map((props, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={0.5} floatIntensity={1}>
            <mesh position={props.position} rotation={props.rotation}>
            <planeGeometry args={[2 * props.scale, 1.2 * props.scale]} />
            <meshPhysicalMaterial 
                color="#88ccff"
                metalness={0.9}
                roughness={0.1}
                transmission={0.5} // Glass-like
                thickness={0.5}
                transparent
                opacity={0.15}
                side={THREE.DoubleSide}
            />
            {/* Simple border/frame hint */}
            <lineSegments>
                <edgesGeometry args={[new THREE.PlaneGeometry(2 * props.scale, 1.2 * props.scale)]} />
                <lineBasicMaterial color="#4f9cff" transparent opacity={0.3} />
            </lineSegments>
            </mesh>
        </Float>
      ))}
    </group>
  );
}

function DigitalGrid() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
            <planeGeometry args={[50, 50, 40, 40]} />
            <meshBasicMaterial 
                color="#0066ff" 
                wireframe 
                transparent 
                opacity={0.05} 
            />
        </mesh>
    )
}

export default function Hero3D() {
  return (
    <div className="w-full h-full absolute inset-0 z-0 bg-black">
        <Canvas gl={{ antialias: true, toneMapping: THREE.ReinhardToneMapping }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        
        {/* Cinematic Atmosphere */}
        <color attach="background" args={['#020205']} />
        <fog attach="fog" args={['#020205', 5, 20]} />

        {/* Lights */}
        <ambientLight intensity={0.5} color="#001133" />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#4f9cff" />
        <pointLight position={[-10, -5, -10]} intensity={1} color="#ff0044" /> {/* Cyberpunk contrast */}
        <spotLight position={[0, 10, 0]} intensity={2} angle={0.5} penumbra={1} color="#00ffff" />

        {/* Floating Core */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Core />
        </Float>

        {/* Particles "Anti-gravity" */}
        <Sparkles 
            count={200} 
            scale={12} 
            size={2} 
            speed={-0.2} // Drifting Up
            opacity={0.4} 
            color="#4f9cff"
        />

        {/* Orbiting UI Glass Panels */}
        <FloatingPanels />
        
        {/* Background Grid */}
        <DigitalGrid />

        <Environment preset="city" blur={0.8} />
        </Canvas>
    </div>
  );
}
