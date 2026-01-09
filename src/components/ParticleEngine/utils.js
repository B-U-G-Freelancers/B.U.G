/**
 * Formation generation utilities
 * Creates Float32Array position data for various shapes
 */
export const generateFormation = {
  /**
   * Generate positions from canvas text
   * @param {string} text - Text to render
   * @param {number} count - Number of particles
   * @param {object} options - { fontSize, font, width, height }
   */
  fromText(text, count, options = {}) {
    const {
      fontSize = 160,
      font = "Space Grotesk",
      width = window.innerWidth,
      height = window.innerHeight,
    } = options;

    const cvs = document.createElement("canvas");
    const ctx = cvs.getContext("2d");
    cvs.width = width;
    cvs.height = height;

    ctx.font = `900 ${fontSize}px "${font}", sans-serif`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, width / 2, height / 2);

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const validPoints = [];
    const skip = 4;

    for (let y = 0; y < height; y += skip) {
      for (let x = 0; x < width; x += skip) {
        const alpha = data[(y * width + x) * 4 + 3];
        if (alpha > 128) {
          validPoints.push({
            x: x - width / 2,
            y: -(y - height / 2),
            z: 0,
          });
        }
      }
    }

    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const p = validPoints[Math.floor(Math.random() * validPoints.length)] || {
        x: 0,
        y: 0,
        z: 0,
      };
      pos[i3] = p.x + (Math.random() - 0.5) * 5;
      pos[i3 + 1] = p.y + (Math.random() - 0.5) * 5;
      pos[i3 + 2] = p.z + (Math.random() - 0.5) * 5;
    }

    return pos;
  },

  /**
   * Generate from image or SVG
   * @param {HTMLImageElement|string} src - Image element or URL
   * @param {number} count - Number of particles
   * @param {object} options - { size, scale }
   */
  async fromImage(src, count, options = {}) {
    const { size = 400, scale = 1.2 } = options;

    const img = typeof src === "string" ? await loadImage(src) : src;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = size;
    canvas.height = size;
    ctx.drawImage(img, 0, 0, size, size);

    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;
    const points = [];
    const skip = 2;

    for (let y = 0; y < size; y += skip) {
      for (let x = 0; x < size; x += skip) {
        const idx = (y * size + x) * 4;
        const alpha = data[idx + 3];
        if (alpha > 50) {
          points.push({
            x: (x - size / 2) * scale,
            y: (y - size / 2) * scale,
          });
        }
      }
    }

    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      if (points.length > 0) {
        const p = points[Math.floor(Math.random() * points.length)];
        pos[i3] = p.x + (Math.random() - 0.5) * 4;
        pos[i3 + 1] = p.y + (Math.random() - 0.5) * 4;
        pos[i3 + 2] = (Math.random() - 0.5) * 30;
      }
    }

    return pos;
  },

  /**
   * Generate random scatter
   */
  random(count, spread = 2000) {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * (spread / 2);
    }
    return pos;
  },

  /**
   * Generate filled sphere
   */
  sphere(count, radius = 200) {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = radius * Math.pow(Math.random(), 1 / 3);

      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi);
    }
    return pos;
  },

  /**
   * Generate structured grid
   */
  grid(count, width = 1000, height = 600, cols = 50) {
    const pos = new Float32Array(count * 3);
    const rows = Math.ceil(count / cols);
    const spacingX = width / cols;
    const spacingY = height / rows;

    for (let i = 0; i < count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      pos[i * 3] = (col - cols / 2) * spacingX;
      pos[i * 3 + 1] = (row - rows / 2) * spacingY;
      pos[i * 3 + 2] = 0;
    }
    return pos;
  },

  /**
   * Generate ring/circle
   */
  ring(count, radius = 200, thickness = 20) {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const angle = (i / count) * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * thickness;
      pos[i3] = Math.cos(angle) * r;
      pos[i3 + 1] = Math.sin(angle) * r;
      pos[i3 + 2] = (Math.random() - 0.5) * thickness;
    }
    return pos;
  },

  /**
   * Generate DNA helix
   */
  helix(count, height = 800, radius = 60, turns = 4) {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const t = i / count;
      const y = (t - 0.5) * height;
      const angle = t * Math.PI * 2 * turns;
      const strandOffset = i % 2 === 0 ? 0 : Math.PI;
      const thickness = Math.random() * 10;

      pos[i3] = Math.cos(angle + strandOffset) * (radius + thickness);
      pos[i3 + 1] = y;
      pos[i3 + 2] = Math.sin(angle + strandOffset) * (radius + thickness);
    }
    return pos;
  },
};

// Helper to load image
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
