import { useEffect, useState, useRef, useCallback, useMemo } from "react";

/**
 * DecryptedText - A text reveal effect that scrambles characters before revealing the final text
 *
 * @param {string} text - The final text to display
 * @param {number} speed - Interval between scramble updates in ms (default: 50)
 * @param {number} maxIterations - Number of scramble iterations before revealing (default: 10)
 * @param {boolean} sequential - If true, reveals characters one by one
 * @param {string} revealDirection - "start", "end", or "center" for sequential reveal
 * @param {string} characters - Characters to use for scrambling
 * @param {string} animateOn - "view" (auto-start), "hover", or "both"
 * @param {string} className - CSS class for the text
 * @param {number} delay - Delay before starting animation in ms (default: 0)
 */
export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  animateOn = "view",
  delay = 0,
  ...props
}) {
  const containerRef = useRef(null);
  const [phase, setPhase] = useState("idle"); // idle, scrambling, revealed
  const [displayText, setDisplayText] = useState(text);
  const [revealedCount, setRevealedCount] = useState(0);
  const scrambleIterations = useRef(0);
  const hasTriggered = useRef(false);

  // Character pool for scrambling
  const charPool = useMemo(() => characters.split(""), [characters]);

  // Generate scrambled version of text
  const getScrambledText = useCallback(
    (revealCount = 0) => {
      return text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (sequential && i < revealCount) return text[i];
          return charPool[Math.floor(Math.random() * charPool.length)];
        })
        .join("");
    },
    [text, charPool, sequential]
  );

  // Start the scramble animation
  const startAnimation = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;

    // Apply delay if specified
    const startDelay = delay > 0 ? delay : 0;

    setTimeout(() => {
      // Initialize with scrambled text
      setDisplayText(getScrambledText(0));
      setPhase("scrambling");
      scrambleIterations.current = 0;
      setRevealedCount(0);
    }, startDelay);
  }, [delay, getScrambledText]);

  // Main scrambling effect
  useEffect(() => {
    if (phase !== "scrambling") return;

    const interval = setInterval(() => {
      if (sequential) {
        // Sequential reveal: reveal one character at a time
        setRevealedCount((prev) => {
          const newCount = prev + 1;
          if (newCount >= text.length) {
            clearInterval(interval);
            setDisplayText(text);
            setPhase("revealed");
            return text.length;
          }
          setDisplayText(getScrambledText(newCount));
          return newCount;
        });
      } else {
        // Non-sequential: scramble for maxIterations then reveal
        scrambleIterations.current += 1;
        if (scrambleIterations.current >= maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
          setPhase("revealed");
        } else {
          setDisplayText(getScrambledText(0));
        }
      }
    }, speed);

    return () => clearInterval(interval);
  }, [phase, text, speed, maxIterations, sequential, getScrambledText]);

  // Auto-start animation when component mounts (for animateOn="view" or "both")
  useEffect(() => {
    if (animateOn !== "view" && animateOn !== "both") return;

    // Start animation after a brief delay to ensure component is mounted
    const timer = requestAnimationFrame(() => {
      startAnimation();
    });

    return () => cancelAnimationFrame(timer);
  }, [animateOn, startAnimation]);

  // Hover handlers for animateOn="hover" or "both"
  const handleMouseEnter = useCallback(() => {
    if (animateOn === "hover" || animateOn === "both") {
      // Reset for hover
      hasTriggered.current = false;
      startAnimation();
    }
  }, [animateOn, startAnimation]);

  const handleMouseLeave = useCallback(() => {
    if (animateOn === "hover") {
      // Reset to original text on mouse leave
      hasTriggered.current = false;
      setPhase("idle");
      setDisplayText(text);
      scrambleIterations.current = 0;
      setRevealedCount(0);
    }
  }, [animateOn, text]);

  return (
    <span
      ref={containerRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {displayText.split("").map((char, index) => (
        <span
          key={index}
          style={{
            opacity: phase === "scrambling" && char !== text[index] ? 0.8 : 1,
            transition: "opacity 0.1s ease",
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
