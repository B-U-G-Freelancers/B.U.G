import { ParticleStore } from "./ParticleStore";
import { ParticleRenderer } from "./ParticleRenderer";

/**
 * ParticleEngine - Core animation loop and event handling
 * Manages the render loop, resizing, and mouse tracking
 */
export class ParticleEngine {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.store = new ParticleStore(options.count || 1500);
    this.renderer = new ParticleRenderer(canvas);

    this.rafId = null;
    this.isRunning = false;

    // Mouse tracking
    this.mouse = { x: 0, y: 0 };

    // Bind methods
    this.loop = this.loop.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);

    // Initial resize
    this.handleResize();

    // Event listeners
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("mousemove", this.handleMouseMove);
  }

  start(onUpdate) {
    if (this.isRunning) return;
    this.isRunning = true;
    this.onUpdate = onUpdate;
    this.lastTime = performance.now();
    this.loop();
  }

  stop() {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  loop() {
    if (!this.isRunning) return;

    const time = performance.now();
    const dt = (time - this.lastTime) / 1000;
    this.lastTime = time;

    // Call update callback (Layer 2: Controller)
    if (this.onUpdate) {
      this.onUpdate(time / 1000, dt, this.mouse);
    }

    // Render
    this.renderer.clear();
    this.renderer.draw(this.store);

    this.rafId = requestAnimationFrame(this.loop);
  }

  handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.resize(width, height);
  }

  handleMouseMove(e) {
    // Normalize to center-based coordinates
    this.mouse.x = e.clientX - window.innerWidth / 2;
    this.mouse.y = e.clientY - window.innerHeight / 2;
  }

  dispose() {
    this.stop();
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("mousemove", this.handleMouseMove);
  }
}
