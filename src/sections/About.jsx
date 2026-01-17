import { useEffect, useRef } from "react";
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";

/* =========================
   STARFIELD
========================= */
function Starfield() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let raf;

        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        const stars = Array.from({ length: 140 }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 2 + 0.4,
            speed: Math.random() * 0.6 + 0.3,
            color:
                Math.random() > 0.6
                    ? "#4f9cff"
                    : Math.random() > 0.5
                        ? "#b44cff"
                        : "#ffffff",
        }));

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            stars.forEach((s) => {
                s.y += s.speed;
                if (s.y > h) s.y = 0;
                ctx.fillStyle = s.color;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fill();
            });
            raf = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(raf);
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-[1] opacity-60" />;
}

/* =========================
   PROFESSIONAL TEXT COMPONENTS
========================= */
const ProfessionalTitle = ({ children }) => (
    <h2 className="relative inline-block text-6xl md:text-8xl font-black tracking-tight mb-16 group cursor-default">
        <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-400 group-hover:to-slate-200 transition-all duration-700">
            {children}
        </span>
        <span className="absolute -bottom-4 left-0 w-full h-1 bg-[#4f9cff] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-expo origin-left" />
    </h2>
);

const ProfessionalText = ({ children }) => (
    <p className="max-w-4xl mx-auto text-xl md:text-2xl leading-relaxed mb-24 text-slate-400 font-light">
        <span className="hover:text-white transition-colors duration-500">
            {children}
        </span>
    </p>
);

/* =========================
   UTILS
========================= */
const lerp = (a, b, t) => a + (b - a) * t;

/* =========================
   CIRCULAR GALLERY (AUTO SCROLL)
========================= */
class CircularGalleryApp {
    constructor(container, items) {
        this.container = container;
        this.items = items;
        this.scroll = { current: 0, target: 0 };
        this.speed = 0.02;
        this.init();
    }

    init() {
        this.renderer = new Renderer({ alpha: true, antialias: true });
        this.gl = this.renderer.gl;
        this.container.appendChild(this.gl.canvas);

        this.camera = new Camera(this.gl, { fov: 45 });
        this.camera.position.z = 12;

        this.scene = new Transform();
        this.geometry = new Plane(this.gl, { widthSegments: 40, heightSegments: 20 });

        this.createMedias();
        this.onResize();
        this.update();

        window.addEventListener("resize", () => this.onResize());
    }

    createMedias() {
        this.medias = this.items.map((item, index) => {
            const texture = new Texture(this.gl);
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = item.image;
            img.onload = () => (texture.image = img);

            const program = new Program(this.gl, {
                vertex: `
          attribute vec3 position;
          attribute vec2 uv;
          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;
          uniform float uTime;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 p = position;
            p.z += sin(p.x * 3.0 + uTime) * 0.3;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,
                fragment: `
          precision highp float;
          uniform sampler2D tMap;
          varying vec2 vUv;
          void main() {
            vec4 c = texture2D(tMap, vUv);
            gl_FragColor = vec4(c.rgb, c.a);
          }
        `,
                uniforms: {
                    tMap: { value: texture },
                    uTime: { value: Math.random() * 10 },
                },
                transparent: true,
            });

            const mesh = new Mesh(this.gl, { geometry: this.geometry, program });
            mesh.index = index;
            mesh.setParent(this.scene);
            return mesh;
        });
    }

    onResize() {
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;

        this.renderer.setSize(w, h);
        this.camera.perspective({ aspect: w / h });

        const fov = (this.camera.fov * Math.PI) / 180;
        const viewportHeight = 2 * Math.tan(fov / 2) * this.camera.position.z;
        const viewportWidth = viewportHeight * (w / h);

        this.planeHeight = viewportHeight * 0.55;
        this.planeWidth = this.planeHeight * 1.4;
        this.gap = this.planeWidth * 0.35;

        this.totalWidth = (this.planeWidth + this.gap) * this.medias.length;

        this.medias.forEach((m, i) => {
            m.scale.set(this.planeWidth, this.planeHeight, 1);
            m.position.x = i * (this.planeWidth + this.gap);
        });
    }

    update() {
        this.scroll.target += this.speed;
        this.scroll.current = lerp(this.scroll.current, this.scroll.target, 0.05);

        this.medias.forEach((m) => {
            m.position.x =
                m.index * (this.planeWidth + this.gap) - this.scroll.current;

            if (m.position.x < -this.totalWidth / 2) {
                m.position.x += this.totalWidth;
            }

            m.program.uniforms.uTime.value += 0.04;
        });

        this.renderer.render({ scene: this.scene, camera: this.camera });
        this.raf = requestAnimationFrame(() => this.update());
    }

    destroy() {
        cancelAnimationFrame(this.raf);
        this.gl.canvas.remove();
    }
}

/* =========================
   ABOUT SECTION
========================= */
export default function About() {
    const galleryRef = useRef(null);

    const team = [
        { image: "https://picsum.photos/seed/1/800/600?grayscale" },
        { image: "https://picsum.photos/seed/2/800/600?grayscale" },
        { image: "https://picsum.photos/seed/3/800/600?grayscale" },
        { image: "https://picsum.photos/seed/4/800/600?grayscale" },
        { image: "https://picsum.photos/seed/5/800/600?grayscale" },
        { image: "https://picsum.photos/seed/6/800/600?grayscale" },
        { image: "https://picsum.photos/seed/7/800/600?grayscale" },
    ];

    useEffect(() => {
        const gallery = new CircularGalleryApp(galleryRef.current, team);
        return () => gallery.destroy();
    }, []);

    return (
        <section className="relative min-h-screen bg-[#050505] overflow-hidden py-32 px-6 text-white">
            <Starfield />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="relative z-10 max-w-7xl mx-auto text-center">

                <ProfessionalTitle>B.U.G FREELANCING</ProfessionalTitle>

                <ProfessionalText>
                    is a specialized collective of engineers and designers. We don’t build
                    templates — we engineer <span className="text-[#4f9cff] font-medium">immersive digital realities</span> that survive scale,
                    pressure, and chaos.
                </ProfessionalText>

                {/* TEAM TITLE */}
                <h3 className="text-4xl font-bold uppercase tracking-widest mb-16 text-slate-300">
                    The People Behind <span className="text-[#4f9cff]">B.U.G</span>
                </h3>

                <div ref={galleryRef} className="w-full h-[600px]" />
            </div>
        </section>
    );
}
