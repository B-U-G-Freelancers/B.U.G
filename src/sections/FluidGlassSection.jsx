// src/sections/FluidGlassSection.jsx
import FluidGlass from "../components/ui/FluidGlass";

export default function FluidGlassSection() {
  return (
    <section
      id="fluid-glass"
      className="relative w-full"
      style={{ height: "100vh" }}
    >
      <FluidGlass
        mode="lens"
        backgroundColor="#0a0a12"
        title="BUILD YOUR GENIE"
        lensProps={{
          scale: 0.2,
          ior: 1.2,
          thickness: 5,
          chromaticAberration: 0.15,
        }}
        images={[
          { url: "/demo/demo1.jpg", position: [-2, 0, 0], scale: [3, 3, 1] },
          { url: "/demo/demo2.jpg", position: [2, 0, 3], scale: 3 },
          {
            url: "/demo/demo3.jpg",
            position: [-2.05, -6, 6],
            scale: [1, 3, 1],
          },
        ]}
      />
    </section>
  );
}
