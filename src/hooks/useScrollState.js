// src/hooks/useScrollState.js
import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Custom hook for scroll-driven state transitions
 * Maps scroll position to discrete states with smooth interpolation
 */
export function useScrollState(thresholds = [0, 0.25, 0.55, 1]) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentState, setCurrentState] = useState(0);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);

  // Lerp function for smooth interpolation
  const lerp = useCallback((start, end, factor) => {
    return start + (end - start) * factor;
  }, []);

  // Calculate state from scroll position
  const calculateState = useCallback(
    (progress) => {
      for (let i = thresholds.length - 1; i >= 0; i--) {
        if (progress >= thresholds[i]) {
          return i;
        }
      }
      return 0;
    },
    [thresholds]
  );

  // Calculate transition progress within current state
  const calculateTransitionProgress = useCallback(
    (progress, state) => {
      const stateStart = thresholds[state] || 0;
      const stateEnd = thresholds[state + 1] || 1;
      const range = stateEnd - stateStart;
      if (range <= 0) return 1;
      return Math.min(1, Math.max(0, (progress - stateStart) / range));
    },
    [thresholds]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = container.scrollHeight - window.innerHeight;
      const progress =
        scrollHeight > 0
          ? Math.min(1, Math.max(0, scrollTop / scrollHeight))
          : 0;
      targetScrollRef.current = progress;
    };

    const animate = () => {
      // Smooth lerp towards target
      currentScrollRef.current = lerp(
        currentScrollRef.current,
        targetScrollRef.current,
        0.08
      );

      const progress = currentScrollRef.current;
      const state = calculateState(progress);
      const transition = calculateTransitionProgress(progress, state);

      setScrollProgress(progress);
      setCurrentState(state);
      setTransitionProgress(transition);

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [lerp, calculateState, calculateTransitionProgress]);

  return {
    containerRef,
    scrollProgress,
    currentState,
    transitionProgress,
    // Helper to check if we're in a specific state
    isState: useCallback((state) => currentState === state, [currentState]),
    // Helper to check transition between states
    isTransitioning: useCallback(
      (from, to) => {
        return currentState === from && transitionProgress > 0.8;
      },
      [currentState, transitionProgress]
    ),
  };
}

export default useScrollState;
