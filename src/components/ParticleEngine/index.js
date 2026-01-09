// Reusable Particle Engine Component
// Drop this folder into any React project to use

// Main component
export { default as Particles } from "./Particles";

// Hook for controlling particles
export { useParticles, ParticlesProvider } from "./useParticles";

// Formation utilities
export { generateFormation } from "./utils";

// Core classes (for advanced usage)
export { ParticleEngine } from "./ParticleEngine";
export { ParticleController } from "./ParticleController";
export { ParticleRenderer } from "./ParticleRenderer";
export { ParticleStore } from "./ParticleStore";
