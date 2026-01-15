/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { useRef, useState, useEffect, memo } from "react";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import {
  useFBO,
  useGLTF,
  Image,
  Preload,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { easing } from "maath";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function FluidGlassHero() {
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Wait for intro animation to complete (roughly 5s)
    const delay = 5;

    const tl = gsap.timeline({ delay });

    // Set initial states
    gsap.set(
      [
        headlineRef.current,
        subtitleRef.current,
        ctaRef.current,
        scrollRef.current,
      ],
      {
        opacity: 0,
        y: 40,
      }
    );

    // Staggered entrance
    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    })
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .to(
        scrollRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.2"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center"
    >
      {/* FluidGlass Canvas Background */}
      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>
          <LensScene
            backgroundColor="#0a0a12"
            images={[
              {
                url: "/demo/demo1.jpg",
                position: [-2, 0, 0],
                scale: [3, 3, 1],
              },
              { url: "/demo/demo2.jpg", position: [2, 0, 3], scale: 3 },
              {
                url: "/demo/demo3.jpg",
                position: [-2.05, -2, 6],
                scale: [1, 3, 1],
              },
            ]}
            lensProps={{
              scale: 0.2,
              ior: 1.2,
              thickness: 5,
              chromaticAberration: 0.15,
            }}
          />
          <Preload />
        </Canvas>
      </div>

      {/* HTML Overlay - Hero Content */}
      <div className="relative z-10 max-w-5xl px-6 text-center lg:px-8">
        <h1
          ref={headlineRef}
          className="font-display text-5xl font-black leading-[1.05] tracking-tighter text-text-primary sm:text-7xl lg:text-9xl"
        >
          We build digital <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-text-primary/80 to-text-muted">
            products that work
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="mx-auto mt-10 max-w-xl text-lg text-text-secondary sm:text-xl font-light leading-relaxed"
        >
          Engineering-led design for high-growth companies.{" "}
          <br className="hidden sm:block" />
          We turn complexity into clarity.
        </p>

        <div
          ref={ctaRef}
          className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row"
        >
          <Link
            to="/contact"
            className="group relative h-14 overflow-hidden rounded-md bg-accent px-10 text-base font-bold text-text-primary shadow-[0_0_30px_rgba(58,124,255,0.3)] transition-all hover:bg-accent-soft hover:shadow-[0_0_40px_rgba(58,124,255,0.5)] flex items-center justify-center"
          >
            <span className="relative z-10">Get in touch</span>
            <div className="absolute inset-0 -translate-x-full bg-text-primary/10 skew-x-12 transition-transform duration-500 group-hover:translate-x-full"></div>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-text-secondary animate-bounce"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] mb-2 font-bold opacity-50">
          Scroll
        </span>
        <ChevronDown className="size-6" />
      </div>
    </section>
  );
}

// Simplified Lens Scene without ScrollControls
const LensScene = memo(function LensScene({
  backgroundColor,
  images,
  lensProps = {},
}) {
  return (
    <LensWrapper backgroundColor={backgroundColor} modeProps={lensProps}>
      <Images images={images} />
    </LensWrapper>
  );
});

const LensWrapper = memo(function LensWrapper({
  children,
  modeProps = {},
  backgroundColor = "#0a0a12",
}) {
  const ref = useRef();
  const { nodes } = useGLTF("/3d/lens.glb");
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);

  useEffect(() => {
    const geo = nodes.Cylinder?.geometry;
    if (geo) {
      geo.computeBoundingBox();
      geoWidthRef.current = geo.boundingBox.max.x - geo.boundingBox.min.x || 1;
    }
  }, [nodes]);

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    // Lens follows pointer
    const destX = (pointer.x * v.width) / 2;
    const destY = (pointer.y * v.height) / 2;
    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    // Auto-scale lens
    if (modeProps.scale == null) {
      const maxWorld = v.width * 0.9;
      const desired = maxWorld / geoWidthRef.current;
      ref.current.scale.setScalar(Math.min(0.15, desired));
    }

    // Render scene to buffer
    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    // Set background color
    const color = new THREE.Color(backgroundColor);
    gl.setClearColor(color, 1);
  });

  const {
    scale,
    ior,
    thickness,
    anisotropy,
    chromaticAberration,
    ...extraMat
  } = modeProps;

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh
        ref={ref}
        scale={scale ?? 0.15}
        rotation-x={Math.PI / 2}
        geometry={nodes.Cylinder?.geometry}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          {...extraMat}
        />
      </mesh>
    </>
  );
});

function Images({ images }) {
  const group = useRef();

  return (
    <group ref={group}>
      {images.map((img, idx) => (
        <Image
          key={idx}
          position={
            Array.isArray(img.position) ? img.position : [0, 0, idx * 3]
          }
          scale={img.scale || 3}
          url={img.url}
        />
      ))}
    </group>
  );
}

// Preload 3D model
useGLTF.preload("/3d/lens.glb");
