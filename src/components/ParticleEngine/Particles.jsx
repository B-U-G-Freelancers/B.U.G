import { useEffect, useRef, useMemo } from "react";
import { ParticleEngine } from "./ParticleEngine";
import { ParticleController } from "./ParticleController";
import { ParticlesProvider } from "./useParticles";
import { generateFormation } from "./utils";

/**
 * Particles - Reusable particle system React component
 *
 * @param {object} props
 * @param {number} props.count - Number of particles (default: 1500)
 * @param {string|object} props.theme - 'light' | 'dark' | custom { bg, particle, colorPalette }
 * @param {object} props.formations - Named formations { name: Float32Array }
 * @param {string} props.initialFormation - Formation to start with
 * @param {object} props.physics - Physics config { gravity, turbulence, settlingForce, friction }
 * @param {string} props.className - Additional CSS classes
 * @param {function} props.onReady - Callback with controller reference
 * @param {React.ReactNode} props.children - Child components (can use useParticles hook)
 */
export default function Particles({
  count = 1500,
  theme = "light",
  formations = {},
  initialFormation,
  physics = {},
  className = "",
  onReady,
  children,
}) {
  const canvasRef = useRef(null);
  const controllerRef = useRef(null);

  // Create default random formation if none provided
  const allFormations = useMemo(() => {
    const defaults = {
      random: generateFormation.random(count),
    };
    return { ...defaults, ...formations };
  }, [count, formations]);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize engine
    const engine = new ParticleEngine(canvasRef.current, { count });

    // Initialize controller
    const ctrl = new ParticleController(engine.store, physics);
    ctrl.renderer = engine.renderer;

    // Set theme
    ctrl.setTheme(theme);

    // Set formations
    ctrl.setFormations(allFormations);

    // Snap to initial formation
    const startFormation = initialFormation || Object.keys(allFormations)[0];
    if (startFormation && allFormations[startFormation]) {
      ctrl.snapTo(startFormation);
    }

    // Start animation loop
    engine.start((time, dt, mouse) => ctrl.update(time, dt, mouse));

    // Store controller ref
    controllerRef.current = ctrl;

    // Callback
    if (onReady) {
      onReady(ctrl);
    }

    return () => {
      engine.dispose();
      controllerRef.current = null;
    };
  }, [count]); // Only recreate on count change

  // Update theme when prop changes
  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.setTheme(theme);
    }
  }, [theme]);

  // Update formations when prop changes
  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.setFormations(allFormations);
    }
  }, [allFormations]);

  // Update physics when prop changes
  useEffect(() => {
    if (controllerRef.current && physics) {
      controllerRef.current.setPhysics(physics);
    }
  }, [physics]);

  return (
    <ParticlesProvider value={controllerRef.current}>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 w-full h-full z-0 pointer-events-none ${className}`}
      />
      {children}
    </ParticlesProvider>
  );
}
