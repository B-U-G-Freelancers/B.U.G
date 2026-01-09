/**
 * ParticleRenderer - 2D Canvas rendering with 3D projection
 * Supports theming and per-particle color variation
 */
export class ParticleRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: true });
    this.width = canvas.width;
    this.height = canvas.height;
    this.fov = 800; // Field of view for 3D projection

    // Theme configuration
    this.theme = {
      bgColor: { r: 255, g: 255, b: 255, a: 1 },
      particleColor: { r: 0, g: 0, b: 0 },
      targetBg: { r: 255, g: 255, b: 255, a: 1 },
      targetParticle: { r: 0, g: 0, b: 0 },
      useColorVariation: false,
      colorPalette: [],
    };
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  /**
   * Set theme - accepts preset string or custom config object
   * @param {string|object} config - 'light' | 'dark' | custom config object
   * @param {number} progress - 0-1 for smooth transitions
   */
  setTheme(config, progress = 1) {
    if (typeof config === "string") {
      // Preset themes
      if (config === "dark") {
        this.theme.targetBg = { r: 10, g: 10, b: 10, a: 1 };
        this.theme.targetParticle = { r: 255, g: 255, b: 255 };
        this.theme.useColorVariation = false;
      } else {
        // Default: light
        this.theme.targetBg = { r: 255, g: 255, b: 255, a: 1 };
        this.theme.targetParticle = { r: 0, g: 0, b: 0 };
        this.theme.useColorVariation = false;
      }
    } else if (typeof config === "object") {
      // Custom theme config
      if (config.bg)
        this.theme.targetBg = { ...this.theme.targetBg, ...config.bg };
      if (config.particle)
        this.theme.targetParticle = {
          ...this.theme.targetParticle,
          ...config.particle,
        };
      if (config.colorPalette) {
        this.theme.colorPalette = config.colorPalette;
        this.theme.useColorVariation = true;
      }
    }

    // Apply transition
    if (progress >= 1) {
      this.theme.bgColor = { ...this.theme.targetBg };
      this.theme.particleColor = { ...this.theme.targetParticle };
    } else {
      this.blendColors(progress);
    }
  }

  blendColors(progress) {
    const lerp = (a, b, t) => a + (b - a) * t;
    const bg = this.theme.bgColor;
    const target = this.theme.targetBg;
    const pTarget = this.theme.targetParticle;
    const factor = progress * 0.1;

    bg.r = lerp(bg.r, target.r, factor);
    bg.g = lerp(bg.g, target.g, factor);
    bg.b = lerp(bg.b, target.b, factor);
    bg.a = lerp(bg.a, target.a, factor);

    const pc = this.theme.particleColor;
    pc.r = lerp(pc.r, pTarget.r, factor);
    pc.g = lerp(pc.g, pTarget.g, factor);
    pc.b = lerp(pc.b, pTarget.b, factor);
  }

  clear() {
    const { r, g, b, a } = this.theme.bgColor;
    this.ctx.fillStyle = `rgba(${Math.round(r)},${Math.round(g)},${Math.round(
      b
    )},${a})`;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  draw(store) {
    const { count, x, y, z, a, size } = store;
    const ctx = this.ctx;
    const cx = this.width / 2;
    const cy = this.height / 2;
    const fov = this.fov;

    const { r: pr, g: pg, b: pb } = this.theme.particleColor;
    const useVariation = this.theme.useColorVariation;
    const palette = this.theme.colorPalette;

    for (let i = 0; i < count; i++) {
      // 3D projection
      const scale = fov / (fov + z[i]);
      if (scale <= 0) continue;

      const px = x[i] * scale + cx;
      const py = y[i] * scale + cy;
      const s = size[i] * scale;

      if (a[i] < 0.01) continue;

      // Round to pixel for crisp rendering
      const finalX = (px + 0.5) << 0;
      const finalY = (py + 0.5) << 0;
      const finalSize = Math.max(1, (s + 0.5) << 0);

      // Particle color
      let fr, fg, fb;
      if (useVariation && palette.length > 0) {
        const colorIdx = i % palette.length;
        const baseColor = palette[colorIdx];
        const variation = ((i * 17) % 30) - 15;
        fr = Math.min(255, Math.max(0, baseColor.r + variation));
        fg = Math.min(255, Math.max(0, baseColor.g + variation * 0.7));
        fb = Math.min(255, Math.max(0, baseColor.b + variation * 0.3));
      } else {
        fr = pr;
        fg = pg;
        fb = pb;
      }

      ctx.fillStyle = `rgba(${Math.round(fr)},${Math.round(fg)},${Math.round(
        fb
      )},${a[i]})`;
      ctx.fillRect(finalX, finalY, finalSize, finalSize);
    }
  }
}
