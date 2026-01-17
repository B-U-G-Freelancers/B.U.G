// src/components/gallery/CircularGallery.jsx
// True infinite circular gallery using OGL for smooth WebGL rendering
import {
  Camera,
  Mesh,
  Plane,
  Program,
  Renderer,
  Texture,
  Transform,
} from "ogl";
import { useEffect, useRef } from "react";

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function createTextTexture(
  gl,
  text,
  font = "bold 24px Inter, sans-serif",
  color = "#ffffff",
) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width) || 100; // Fallback width

  // Extract number from font string (e.g. "bold 24px" -> 24)
  const fontSizeMatch = font.match(/(\d+)px/);
  const fontSize = fontSizeMatch ? parseInt(fontSizeMatch[1], 10) : 24;
  const textHeight = Math.ceil(fontSize * 1.5);

  // Ensure valid positive dimensions to prevent WebGL warnings
  canvas.width = Math.max(textWidth + 40, 1);
  canvas.height = Math.max(textHeight + 20, 1);

  // Clear and set debug background if needed
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.font = font;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";

  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  constructor({
    gl,
    plane,
    text,
    textColor = "#ffffff",
    font = "bold 24px Inter, sans-serif",
  }) {
    this.gl = gl;
    this.plane = plane; // Keep reference to parent plane
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.aspect = 1;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor,
    );
    this.aspect = width / height;

    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
      cullFace: false,
      depthTest: false,
      depthWrite: false,
    });

    this.mesh = new Mesh(this.gl, { geometry, program });
    // Parent to scene directly to avoid parent shader effects
    // plane.parent should be the scene
    if (this.plane && this.plane.parent) {
      this.mesh.setParent(this.plane.parent);
    }
  }

  update() {
    if (!this.mesh || !this.plane) return;

    // 1. Copy base position from plane (center of card)
    this.mesh.position.copy(this.plane.position);
    this.mesh.rotation.copy(this.plane.rotation);

    // 2. Calculate size based on current plane scale
    const textHeight = this.plane.scale.y * 0.12;
    const textWidth = textHeight * this.aspect;
    this.mesh.scale.set(textWidth, textHeight, 1);

    // 3. Calculate offset in rotated space
    // We want the title ABOVE the card (local Y+)
    const offset = this.plane.scale.y * 0.5 + textHeight * 0.8;

    // Apply rotation Z to the offset vector (0, offset, 0)
    const rotZ = this.plane.rotation.z;
    const dx = -Math.sin(rotZ) * offset;
    const dy = Math.cos(rotZ) * offset;

    // Add offset to position
    this.mesh.position.x += dx;
    this.mesh.position.y += dy;

    // 4. Push forward in Z to ensure it's in front of the card
    this.mesh.position.z += 0.2;
  }
}

class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0.05,
    font,
    category,
  }) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.category = category;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          // Vertex displacement effect for liquid motion
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.05 + abs(uSpeed) * 0.3);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [
        img.naturalWidth,
        img.naturalHeight,
      ];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      text: this.text,
      textColor: this.textColor,
      font: this.font,
    });
  }

  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);

      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;

    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }

    // Update title position manually
    if (this.title) {
      this.title.update();
    }
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;

    this.scale = this.screen.height / 1500;
    this.plane.scale.y =
      (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x =
      (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [
      this.plane.scale.x,
      this.plane.scale.y,
    ];

    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;

    // Update title scale/position when plane resizes
    if (this.title && this.title.mesh) {
      const textHeight = this.plane.scale.y * 0.12;
      // Re-calculate aspect if we can, or just rely on previous ratio?
      // Let's assume aspect ratio was set in createMesh.
      // We need to access the aspect ratio from the title mesh geometry or texture.
      // Accessing private/local var 'aspect' from Title.createMesh is hard.
      // Let's just recreate the title mesh or update it properly?
      // Simpler: Just force text scale Y and X based on new plane scale.
      // But we need the texture aspect ratio.

      // Let's just createTitle AFTER onResize?
      // No, createTitle needs gl context etc.

      // Better: Store texture aspect in Title instance.
      if (this.title.textureAspect) {
        const textWidth = textHeight * this.title.textureAspect;
        this.title.mesh.scale.set(textWidth, textHeight, 1);
        this.title.mesh.position.y =
          this.plane.scale.y * 0.5 + textHeight * 0.8;
        this.title.mesh.position.z = 0.1;
      }
    }
  }
}

class GalleryApp {
  constructor(
    container,
    {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase,
      onItemClick,
      onLoopComplete,
    },
  ) {
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    this.onItemClick = onItemClick;
    this.onLoopComplete = onLoopComplete;
    this.items = items;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;

    // Track if loop has been completed
    this.loopCompleted = false;
    this.totalScrolled = 0;

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias();
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100,
    });
  }

  createMedias() {
    // Duplicate items for seamless infinite scroll
    this.mediasImages = this.items.concat(this.items);
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        scene: this.scene,
        screen: this.screen,
        text: data.title,
        category: data.category,
        viewport: this.viewport,
        bend: this.bend,
        textColor: this.textColor,
        borderRadius: this.borderRadius,
        font: this.font,
      });
    });
  }

  onTouchDown(e) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = e.touches ? e.touches[0].clientX : e.clientX;
  }

  onTouchMove(e) {
    if (!this.isDown) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }

  onWheel(e) {
    const delta = e.deltaY || e.wheelDelta || e.detail;
    this.scroll.target +=
      (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }

  onClick(e) {
    if (!this.medias || !this.onItemClick) return;

    // Calculate which item is centered
    const width = this.medias[0]?.width || 1;
    const currentIndex =
      Math.round(Math.abs(this.scroll.current) / width) % this.items.length;

    // Check if click is in center area
    const rect = this.container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const centerArea = rect.width * 0.4;
    const centerStart = (rect.width - centerArea) / 2;
    const centerEnd = centerStart + centerArea;

    if (clickX >= centerStart && clickX <= centerEnd) {
      this.onItemClick(this.items[currentIndex], currentIndex);
    }
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onKeyDown(e) {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      this.scroll.target += width;
      this.onCheckDebounce();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      this.scroll.target -= width;
      this.onCheckDebounce();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const currentIndex =
        Math.round(Math.abs(this.scroll.current) / width) % this.items.length;
      if (this.onItemClick) {
        this.onItemClick(this.items[currentIndex], currentIndex);
      }
    }
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height,
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach((media) =>
        media.onResize({ screen: this.screen, viewport: this.viewport }),
      );
    }
  }

  update() {
    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease,
    );
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });

    // Track total scroll distance for loop detection
    const scrollDelta = Math.abs(this.scroll.current - this.scroll.last);
    this.totalScrolled += scrollDelta;

    // Check if user has scrolled through all unique items (one full loop)
    if (!this.loopCompleted && this.medias && this.medias[0]) {
      const singleLoopWidth = this.medias[0].width * this.items.length;
      if (this.totalScrolled >= singleLoopWidth) {
        this.loopCompleted = true;
        if (this.onLoopComplete) {
          this.onLoopComplete();
        }
      }
    }

    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  // Navigate to next item
  goNext() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    this.scroll.target += width;
    this.onCheckDebounce();
  }

  // Navigate to previous item
  goPrev() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    this.scroll.target -= width;
    this.onCheckDebounce();
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    this.boundOnClick = this.onClick.bind(this);

    window.addEventListener("resize", this.boundOnResize);
    // NOTE: Wheel removed to allow page scrolling
    this.container.addEventListener("mousedown", this.boundOnTouchDown);
    this.container.addEventListener("mousemove", this.boundOnTouchMove);
    this.container.addEventListener("mouseup", this.boundOnTouchUp);
    this.container.addEventListener("touchstart", this.boundOnTouchDown);
    this.container.addEventListener("touchmove", this.boundOnTouchMove);
    this.container.addEventListener("touchend", this.boundOnTouchUp);
    this.container.addEventListener("click", this.boundOnClick);

    // Keyboard navigation (only when gallery is focused)
    this.boundOnKeyDown = this.onKeyDown.bind(this);
    this.container.addEventListener("keydown", this.boundOnKeyDown);
    this.container.setAttribute("tabindex", "0");
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.boundOnResize);
    this.container.removeEventListener("mousedown", this.boundOnTouchDown);
    this.container.removeEventListener("mousemove", this.boundOnTouchMove);
    this.container.removeEventListener("mouseup", this.boundOnTouchUp);
    this.container.removeEventListener("touchstart", this.boundOnTouchDown);
    this.container.removeEventListener("touchmove", this.boundOnTouchMove);
    this.container.removeEventListener("touchend", this.boundOnTouchUp);
    this.container.removeEventListener("click", this.boundOnClick);
    this.container.removeEventListener("keydown", this.boundOnKeyDown);

    if (
      this.renderer &&
      this.renderer.gl &&
      this.renderer.gl.canvas.parentNode
    ) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 24px Inter, sans-serif",
  scrollSpeed = 2,
  scrollEase = 0.05,
  onItemClick,
  onLoopComplete,
  showArrows = true,
}) {
  const containerRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !items || items.length === 0) return;

    let app;

    (async () => {
      // Ensure canvas text fonts are available before texture creation
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      app = new GalleryApp(containerRef.current, {
        items,
        bend,
        textColor,
        borderRadius,
        font,
        scrollSpeed,
        scrollEase,
        onItemClick,
        onLoopComplete,
      });

      appRef.current = app;
    })();

    return () => {
      if (app) {
        app.destroy();
        app = null;
        appRef.current = null;
      }
    };
  }, [
    items,
    bend,
    textColor,
    borderRadius,
    font,
    scrollSpeed,
    scrollEase,
    onItemClick,
    onLoopComplete,
  ]);

  const handlePrev = () => appRef.current?.goPrev();
  const handleNext = () => appRef.current?.goNext();

  return (
    <div className="relative w-full h-full">
      <div
        className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
        ref={containerRef}
      />

      {/* Arrow Navigation */}
      {showArrows && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all group"
            aria-label="Previous project"
          >
            <svg
              className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all group"
            aria-label="Next project"
          >
            <svg
              className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
