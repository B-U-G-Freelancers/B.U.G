# Particle Engine Component

A reusable React component for particle animations that can form custom shapes.

## Installation

Copy the entire `ParticleEngine/` folder into your project's components directory.

**Dependencies:**

- React 18+
- GSAP 3.x

```bash
npm install gsap
```

## Basic Usage

```jsx
import { Particles, generateFormation } from "./components/ParticleEngine";

function App() {
  // Pre-generate formations
  const formations = {
    logo: generateFormation.fromText("LOGO", 1500),
    sphere: generateFormation.sphere(1500, 200),
    grid: generateFormation.grid(1500, 800, 600),
  };

  return (
    <Particles
      count={1500}
      theme="dark"
      formations={formations}
      initialFormation="logo"
      onReady={(controller) => {
        // Access controller for programmatic control
        console.log("Particles ready!", controller);
      }}
    />
  );
}
```

## Props

| Prop               | Type             | Default | Description                               |
| ------------------ | ---------------- | ------- | ----------------------------------------- |
| `count`            | number           | 1500    | Number of particles                       |
| `theme`            | string \| object | "light" | `"light"`, `"dark"`, or custom config     |
| `formations`       | object           | {}      | Named formations `{ name: Float32Array }` |
| `initialFormation` | string           | -       | Formation to start with                   |
| `physics`          | object           | {}      | Physics config (see below)                |
| `className`        | string           | ""      | Additional CSS classes                    |
| `onReady`          | function         | -       | Callback with controller                  |
| `children`         | ReactNode        | -       | Child components                          |

### Theme Config

```jsx
// Preset
theme="dark"

// Custom
theme={{
  bg: { r: 20, g: 20, b: 40, a: 1 },
  particle: { r: 255, g: 200, b: 50 },
  colorPalette: [
    { r: 255, g: 215, b: 0 },
    { r: 255, g: 180, b: 30 },
  ]
}}
```

### Physics Config

```jsx
physics={{
  gravity: 8.0,        // Downward pull
  turbulence: 2.0,     // Random movement
  settlingForce: 0.15, // Spring toward target
  friction: 0.92,      // Velocity damping
}}
```

## useParticles Hook

Control particles from child components:

```jsx
import { useParticles } from "./components/ParticleEngine";

function Controls() {
  const { morphTo, formText, setTheme } = useParticles();

  return (
    <button onClick={() => morphTo("sphere", 1.5)}>Morph to Sphere</button>
  );
}

// Wrap in Particles component
<Particles formations={formations}>
  <Controls />
</Particles>;
```

## Formation Utilities

```jsx
import { generateFormation } from "./components/ParticleEngine";

// From text
const textShape = generateFormation.fromText("HELLO", 1500, {
  fontSize: 160,
  font: "Arial",
});

// From image (async)
const logoShape = await generateFormation.fromImage("/logo.svg", 1500);

// Primitives
generateFormation.random(count, spread);
generateFormation.sphere(count, radius);
generateFormation.grid(count, width, height, cols);
generateFormation.ring(count, radius, thickness);
generateFormation.helix(count, height, radius, turns);
```

## Controller Methods

```jsx
controller.snapTo("formationName"); // Instant
controller.morphTo("formationName", 1.5); // Animated
controller.formText("TEXT"); // Form text shape
controller.setTheme("dark"); // Change theme
controller.setPhysics({ gravity: 12 }); // Update physics
controller.setFormations({ new: array }); // Add formations
```
