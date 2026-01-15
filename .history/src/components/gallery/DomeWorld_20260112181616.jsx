// src/components/gallery/DomeWorld.jsx
// Unified immersive gallery: Dome visual aesthetic + Circular gallery interactivity
import { useEffect, useMemo, useRef, useCallback, useState } from "react";
import { useGesture } from "@use-gesture/react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const DEFAULT_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800",
    alt: "Project 1",
  },
  {
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800",
    alt: "Project 2",
  },
  {
    src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800",
    alt: "Project 3",
  },
  {
    src: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800",
    alt: "Project 4",
  },
  {
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800",
    alt: "Project 5",
  },
  {
    src: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800",
    alt: "Project 6",
  },
];

const DEFAULTS = {
  segments: 35,
  maxVerticalRotation: 8,
  dragSensitivity: 15,
  autoRotateSpeed: 0.08,
};

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const wrapAngle = (deg) => ((deg % 360) + 360) % 360;

function buildItems(pool, seg) {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  if (pool.length === 0) {
    return coords.map((c) => ({ ...c, src: "", alt: "", title: "" }));
  }

  const usedImages = Array.from(
    { length: totalSlots },
    (_, i) => pool[i % pool.length]
  );

  return coords.map((c, i) => ({
    ...c,
    ...usedImages[i],
  }));
}

export default function DomeWorld({
  projects = [],
  onProjectClick,
  overlayBlurColor = "#060010",
  segments = DEFAULTS.segments,
}) {
  const rootRef = useRef(null);
  const sphereRef = useRef(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const rafRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // Format projects for dome
  const images =
    projects.length > 0
      ? projects.map((p) => ({
          src:
            p.image || `https://picsum.photos/seed/${p.id}/800/600?grayscale`,
          alt: p.title,
          title: p.title,
          ...p,
        }))
      : DEFAULT_IMAGES;

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  // Apply transform to sphere
  const applyTransform = useCallback(() => {
    if (!sphereRef.current) return;
    sphereRef.current.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`;
  }, []);

  // Animation loop - handles auto-rotation and inertia
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time) => {
      const delta = (time - lastTime) / 16.67; // Normalize to ~60fps
      lastTime = time;

      if (!isDraggingRef.current) {
        // Apply inertia decay
        velocityRef.current.x *= 0.95;
        velocityRef.current.y *= 0.95;

        // Auto-rotate when not dragging and low velocity
        if (Math.abs(velocityRef.current.y) < 0.1) {
          velocityRef.current.y = DEFAULTS.autoRotateSpeed;
        }

        // Apply velocity
        rotationRef.current.x = clamp(
          rotationRef.current.x + velocityRef.current.x * delta,
          -DEFAULTS.maxVerticalRotation,
          DEFAULTS.maxVerticalRotation
        );
        rotationRef.current.y = wrapAngle(
          rotationRef.current.y + velocityRef.current.y * delta
        );
      }

      applyTransform();
      rafRef.current = requestAnimationFrame(animate);
    };

    // Entrance delay
    setTimeout(() => {
      setIsReady(true);
      rafRef.current = requestAnimationFrame(animate);
    }, 300);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [applyTransform]);

  // Gesture handling for drag rotation
  const bind = useGesture(
    {
      onDragStart: () => {
        isDraggingRef.current = true;
        velocityRef.current = { x: 0, y: 0 };
      },
      onDrag: ({
        delta: [dx, dy],
        velocity: [vx, vy],
        direction: [dirX, dirY],
      }) => {
        rotationRef.current.x = clamp(
          rotationRef.current.x - dy / DEFAULTS.dragSensitivity,
          -DEFAULTS.maxVerticalRotation,
          DEFAULTS.maxVerticalRotation
        );
        rotationRef.current.y += dx / DEFAULTS.dragSensitivity;

        velocityRef.current.x = -vy * dirY * 0.5;
        velocityRef.current.y = vx * dirX * 0.5;

        applyTransform();
      },
      onDragEnd: () => {
        isDraggingRef.current = false;
      },
    },
    {
      drag: { filterTaps: true },
    }
  );

  // Handle scroll for rotation
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      velocityRef.current.y += e.deltaY * 0.002;
      velocityRef.current.x += e.deltaX * 0.001;
    };

    const root = rootRef.current;
    if (root) {
      root.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (root) root.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleItemClick = (item, index) => {
    if (onProjectClick) {
      onProjectClick(item, index);
    }
  };

  const cssStyles = `
    .dome-world {
      --radius: 800px;
      --circ: calc(var(--radius) * 3.14);
      --rot-y: calc((360deg / var(--segments-x)) / 2);
      --rot-x: calc((360deg / var(--segments-y)) / 2);
      --item-width: calc(var(--circ) / var(--segments-x));
      --item-height: calc(var(--circ) / var(--segments-y));
    }
    
    @media (max-width: 768px) {
      .dome-world { --radius: 500px; }
    }
    
    .dome-world * { box-sizing: border-box; }
    .dome-sphere, .dome-tile { transform-style: preserve-3d; }
    
    .dome-stage {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      position: absolute;
      inset: 0;
      perspective: calc(var(--radius) * 2.5);
      perspective-origin: 50% 50%;
    }
    
    .dome-sphere {
      transform: translateZ(calc(var(--radius) * -1));
      will-change: transform;
      position: absolute;
    }
    
    .dome-tile {
      width: calc(var(--item-width) * var(--item-size-x));
      height: calc(var(--item-height) * var(--item-size-y));
      position: absolute;
      inset: -999px;
      margin: auto;
      transform-origin: 50% 50%;
      backface-visibility: hidden;
      transform: 
        rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)))) 
        rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)))) 
        translateZ(var(--radius));
    }
    
    .dome-tile-inner {
      position: absolute;
      inset: 12px;
      border-radius: 20px;
      overflow: hidden;
      cursor: pointer;
      backface-visibility: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      background: rgba(20, 20, 30, 0.8);
    }
    
    .dome-tile-inner:hover {
      transform: scale(1.08) translateZ(20px);
      box-shadow: 0 20px 60px rgba(58, 124, 255, 0.3);
    }
    
    .dome-tile-inner img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(0.7);
      transition: filter 0.3s ease;
    }
    
    .dome-tile-inner:hover img {
      filter: grayscale(0);
    }
    
    .dome-tile-label {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 16px;
      background: linear-gradient(transparent, rgba(0,0,0,0.8));
      color: white;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 14px;
      font-weight: 600;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.3s, transform 0.3s;
    }
    
    .dome-tile-inner:hover .dome-tile-label {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
      <div
        ref={rootRef}
        className="dome-world fixed inset-0 w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        style={{
          "--segments-x": segments,
          "--segments-y": segments,
          background: `radial-gradient(ellipse at center, #0a0a15 0%, ${overlayBlurColor} 100%)`,
          opacity: isReady ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
        {...bind()}
      >
        {/* Back button */}
        <Link
          to="/"
          className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 group backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Home</span>
        </Link>

        {/* Title overlay - subtle hint */}
        <div className="fixed top-6 right-6 z-10 pointer-events-none text-right">
          <p className="text-white/20 text-sm tracking-wider uppercase font-bold">
            Our Works
          </p>
        </div>

        {/* Instruction hint */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
          <p className="text-white/40 text-sm tracking-wider uppercase">
            Drag or scroll to explore • Click to view project
          </p>
        </div>

        {/* Sphere stage */}
        <div className="dome-stage">
          <div ref={sphereRef} className="dome-sphere">
            {items.map((item, i) => (
              <div
                key={`${item.x},${item.y},${i}`}
                className="dome-tile"
                style={{
                  "--offset-x": item.x,
                  "--offset-y": item.y,
                  "--item-size-x": item.sizeX,
                  "--item-size-y": item.sizeY,
                }}
              >
                <div
                  className="dome-tile-inner"
                  onClick={() => handleItemClick(item, i % images.length)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(-1)}
                >
                  {item.src && (
                    <img
                      src={item.src}
                      alt={item.alt || item.title || ""}
                      draggable={false}
                    />
                  )}
                  {item.title && (
                    <div className="dome-tile-label">{item.title}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Radial overlay for depth */}
        <div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background: `radial-gradient(ellipse at center, transparent 40%, ${overlayBlurColor} 100%)`,
          }}
        />

        {/* Top/bottom fades */}
        <div
          className="absolute left-0 right-0 top-0 h-32 pointer-events-none z-[3]"
          style={{
            background: `linear-gradient(to bottom, ${overlayBlurColor}, transparent)`,
          }}
        />
        <div
          className="absolute left-0 right-0 bottom-0 h-32 pointer-events-none z-[3]"
          style={{
            background: `linear-gradient(to top, ${overlayBlurColor}, transparent)`,
          }}
        />
      </div>
    </>
  );
}
