import { createContext, useContext, useCallback } from "react";

// Context for particle controller
const ParticlesContext = createContext(null);

/**
 * Provider component - wrap your app with this to use useParticles hook
 */
export const ParticlesProvider = ParticlesContext.Provider;

/**
 * Hook to control particles from any component
 * @returns {object} Controller methods
 */
export function useParticles() {
  const controller = useContext(ParticlesContext);

  const snapTo = useCallback((key) => controller?.snapTo(key), [controller]);

  const morphTo = useCallback(
    (key, duration, ease) => controller?.morphTo(key, duration, ease),
    [controller]
  );

  const formText = useCallback(
    (text, options) => controller?.formText(text, options),
    [controller]
  );

  const setTheme = useCallback(
    (config, progress) => controller?.setTheme(config, progress),
    [controller]
  );

  const setFormations = useCallback(
    (formations) => controller?.setFormations(formations),
    [controller]
  );

  const setPhysics = useCallback(
    (config) => controller?.setPhysics(config),
    [controller]
  );

  return {
    isReady: !!controller,
    controller,
    snapTo,
    morphTo,
    formText,
    setTheme,
    setFormations,
    setPhysics,
  };
}
