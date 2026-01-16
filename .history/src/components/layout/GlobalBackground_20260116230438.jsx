import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, SpotLight, Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* =========================
   GLOBAL CYBERPUNK UNIVERSE
========================= */

// PRIMARY COLOR: #0066ff
// SECONDARY GLOW: #00f6ff
// RARE ACCENT: #E947F5

function RotatingDataPlane() {
    const mesh = useRef();

    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.rotation.z += delta * 0.05; // Slow rotation
        }
    });

    return (
        <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, 0]}>
            <planeGeometry args={[120, 120, 60, 60]} />
            <meshBasicMaterial
                color="#0066ff"
                wireframe
                transparent
                opacity={0.15}
            />
        </mesh>
    );
}

function OrbitingSystemNodes() {
    const group = useRef();

    // Nodes orbit the center
    const nodes = useMemo(() => new Array(25).fill(0).map((_, i) => {
        const angle = (i / 25) * Math.PI * 2;
        const radius = 10 + Math.random() * 15;
        return {
            initialAngle: angle,
            radius: radius,
            speed: (Math.random() * 0.2 + 0.05) * (Math.random() > 0.5 ? 1 : -1),
            yOffset: (Math.random() - 0.5) * 10,
            scale: Math.random() * 0.4 + 0.1
        };
    }), []);

    useFrame((state, delta) => {
        if (group.current) {
            // Global slow drift
            group.current.rotation.y += delta * 0.01;
        }
    });

    return (
        <group ref={group}>
            {nodes.map((node, i) => (
                <OrbitingNode key={i} {...node} />
            ))}
        </group>
    );
}

function OrbitingNode({ initialAngle, radius, speed, yOffset, scale }) {
    const mesh = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const currentAngle = initialAngle + t * speed;
        // Orbit logic
        mesh.current.position.x = Math.cos(currentAngle) * radius;
        mesh.current.position.z = Math.sin(currentAngle) * radius;
        // Sine wave vertical drift (Anti-gravity)
        mesh.current.position.y = yOffset + Math.sin(t * 0.5 + initialAngle) * 2;

        // Face center
        mesh.current.lookAt(0, 0, 0);
    });

    return (
        <mesh ref={mesh} scale={scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                color="#00f6ff"
                emissive="#0066ff"
                emissiveIntensity={1}
                transparent
                opacity={0.7}
                wireframe={false}
            />
            {/* Wireframe overlay for tech feel */}
            <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
                <lineBasicMaterial color="#ffffff" transparent opacity={0.4} />
            </lineSegments>
        </mesh>
    );
}

function GlobalCore() {
    const group = useRef();
    const coreMesh = useRef();
    const ring1 = useRef();
    const ring2 = useRef();
    const ring3 = useRef();

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();

        // Core pulse
        if (coreMesh.current) {
            coreMesh.current.rotation.y -= delta * 0.2;
            coreMesh.current.rotation.x += delta * 0.1;
            const scale = 2.5 + Math.sin(t * 2) * 0.05;
            coreMesh.current.scale.set(scale, scale, scale);
        }

        // Ring rotations
        if (ring1.current) {
            ring1.current.rotation.z = t * 0.1;
            ring1.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.2) * 0.1;
        }
        if (ring2.current) {
            ring2.current.rotation.y = t * 0.15;
            ring2.current.rotation.x = Math.PI / 3 + Math.cos(t * 0.1) * 0.1;
        }
        if (ring3.current) {
            ring3.current.rotation.z = -t * 0.08;
            ring3.current.rotation.y = Math.PI / 4;
        }
    });

    return (
        <group ref={group} position={[0, 0, -5]}>
            {/* Central Core - The Brain */}
            <mesh ref={coreMesh}>
                <icosahedronGeometry args={[1, 2]} />
                <meshStandardMaterial
                    color="#000000"
                    emissive="#0066ff"
                    emissiveIntensity={0.8}
                    wireframe
                />
            </mesh>

            {/* Inner Glow Core */}
            <mesh scale={0.8}>
                <icosahedronGeometry args={[1, 1]} />
                <meshBasicMaterial color="#00f6ff" transparent opacity={0.4} />
            </mesh>

            {/* Orbiting Neon Rings */}
            <mesh ref={ring1}>
                <torusGeometry args={[3.5, 0.02, 16, 100]} />
                <meshBasicMaterial color="#00f6ff" transparent opacity={0.8} />
            </mesh>

            <mesh ref={ring2}>
                <torusGeometry args={[4.5, 0.02, 16, 100]} />
                <meshBasicMaterial color="#0066ff" transparent opacity={0.6} />
            </mesh>

            <mesh ref={ring3}>
                <torusGeometry args={[5.5, 0.01, 16, 100]} />
                <meshBasicMaterial color="#E947F5" transparent opacity={0.5} />
            </mesh>
        </group>
    );
}

function SceneLighting() {
    return (
        <group>
            <ambientLight intensity={0.2} />
            {/* Main Blue Beam */}
            <SpotLight
                position={[0, 20, 0]}
                angle={0.6}
                penumbra={1}
                intensity={3}
                distance={60}
                color="#0066ff"
                volumetricDistance={20}
                attenuation={5}
                anglePower={5}
            />
            {/* Secondary Cyan Glow */}
            <SpotLight
                position={[-10, 10, 5]}
                angle={0.5}
                penumbra={0.5}
                intensity={2}
                color="#00f6ff"
            />
            {/* Rim Light for Contrast */}
            <pointLight position={[10, 0, -10]} color="#E947F5" intensity={1.2} distance={25} />
        </group>
    );
}

export default function GlobalBackground() {
    return (
        <div className="fixed inset-0 -z-10 bg-[#020305]">
            <Canvas
                camera={{ position: [0, 0, 15], fov: 45 }}
                gl={{ alpha: false, antialias: true, toneMapping: THREE.ReinhardToneMapping }}
                dpr={[1, 2]}
            >
                {/* Reduced Fog for clearer 3D visibility */}
                <fog attach="fog" args={['#020305', 12, 45]} />

                <SceneLighting />
                <GlobalCore />
                <RotatingDataPlane />
                <OrbitingSystemNodes />

                {/* Space Dust / Particles */}
                <Sparkles
                    count={200}
                    scale={25}
                    size={3}
                    speed={0.4}
                    opacity={0.7}
                    color="#00f6ff"
                />

                <Environment preset="city" blur={0.8} />
            </Canvas>

            {/* Cinematic Vignette - Reduced opacity to show background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />

            {/* Scanline Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(0,0,0,0.1)_50%,transparent_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] pointer-events-none bg-[length:100%_4px,6px_100%]" />
        </div>
    );
}
