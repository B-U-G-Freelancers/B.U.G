// src/components/ui/floatPresets.js
// Floating intensity presets - separated for Vite Fast Refresh compatibility

export const FLOAT_PRESETS = {
  // Hero text: extremely subtle, barely noticeable
  hero: {
    yDrift: 8,
    xDrift: 4,
    rotation: 0.3,
    duration: { min: 10, max: 14 },
    parallaxStrength: 0.15, // Cursor-responsive
  },
  // Project cards: slow drift + micro-rotation
  card: {
    yDrift: 15,
    xDrift: 8,
    rotation: 0.5,
    duration: { min: 7, max: 11 },
    parallaxStrength: 0.25, // More responsive to cursor
  },
  // Background fragments: slower, deeper
  background: {
    yDrift: 20,
    xDrift: 12,
    rotation: 0.4,
    duration: { min: 12, max: 18 },
    parallaxStrength: 0.4, // Strong cursor parallax for depth
  },
  // UI elements: minimal movement (heavier gravity = importance)
  ui: {
    yDrift: 4,
    xDrift: 2,
    rotation: 0.15,
    duration: { min: 14, max: 20 },
    parallaxStrength: 0.08,
  },
  // No floating for CTAs
  static: {
    yDrift: 0,
    xDrift: 0,
    rotation: 0,
    duration: { min: 0, max: 0 },
    parallaxStrength: 0,
  },
};
