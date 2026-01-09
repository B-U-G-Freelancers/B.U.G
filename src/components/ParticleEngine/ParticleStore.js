/**
 * ParticleStore - Data layer for particle system
 * Uses typed arrays for performance with large particle counts
 */
export class ParticleStore {
  constructor(count = 1500) {
    this.count = count;

    // Position arrays
    this.x = new Float32Array(count);
    this.y = new Float32Array(count);
    this.z = new Float32Array(count);

    // Velocity arrays (for physics simulation)
    this.vx = new Float32Array(count);
    this.vy = new Float32Array(count);
    this.vz = new Float32Array(count);

    // Color arrays (r, g, b, alpha)
    this.r = new Float32Array(count);
    this.g = new Float32Array(count);
    this.b = new Float32Array(count);
    this.a = new Float32Array(count);

    // Size per particle
    this.size = new Float32Array(count);

    // Mass (for physics variation)
    this.mass = new Float32Array(count);

    // Initialize with random positions
    this.init();
  }

  init() {
    for (let i = 0; i < this.count; i++) {
      this.resetParticle(i);
    }
  }

  resetParticle(i) {
    // Random spread
    this.x[i] = (Math.random() - 0.5) * 2000;
    this.y[i] = (Math.random() - 0.5) * 2000;
    this.z[i] = (Math.random() - 0.5) * 1000;

    // Zero velocity
    this.vx[i] = 0;
    this.vy[i] = 0;
    this.vz[i] = 0;

    // Default color (black)
    this.r[i] = 0;
    this.g[i] = 0;
    this.b[i] = 0;
    this.a[i] = 1;

    // Random size (1-4px)
    this.size[i] = 1 + Math.random() * 3;

    // Random mass (0.5-1.5)
    this.mass[i] = 0.5 + Math.random();
  }
}
