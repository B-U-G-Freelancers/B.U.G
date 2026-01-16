import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    ViteImageOptimizer({
      // Test patterns for images to optimize
      test: /\.(jpe?g|png|gif|tiff|webp|avif)$/i,

      // PNG optimization
      png: {
        quality: 80,
        compressionLevel: 9,
      },

      // JPEG optimization
      jpeg: {
        quality: 80,
        progressive: true,
      },

      // JPG optimization (same as JPEG)
      jpg: {
        quality: 80,
        progressive: true,
      },

      // WebP optimization
      webp: {
        quality: 80,
        lossless: false,
      },

      // AVIF optimization (next-gen format)
      avif: {
        quality: 70,
        lossless: false,
      },

      // GIF optimization
      gif: {},

      // TIFF optimization
      tiff: {
        quality: 80,
      },

      // SVG optimization (using SVGO)
      svg: {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeViewBox: false,
                cleanupNumericValues: {
                  floatPrecision: 2,
                },
              },
            },
          },
          "removeDimensions",
        ],
      },

      // Cache optimized images
      cache: true,
      cacheLocation: "node_modules/.cache/vite-plugin-image-optimizer",
    }),
  ],

  // Build optimization
  build: {
    // Enable minification
    minify: "esbuild",

    // Target modern browsers
    target: "esnext",

    // Source maps for production debugging (optional)
    sourcemap: false,

    // Increase chunk size warning limit (optional)
    chunkSizeWarningLimit: 600,

    // Optimized chunk splitting
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/scheduler/")
          ) {
            return "react-core";
          }

          // React Router
          if (
            id.includes("node_modules/react-router") ||
            id.includes("node_modules/@remix-run/")
          ) {
            return "react-router";
          }

          // Three.js ecosystem (largest chunk - split it)
          if (id.includes("node_modules/three/")) {
            return "three-core";
          }
          if (id.includes("node_modules/@react-three/fiber")) {
            return "r3f-fiber";
          }
          if (id.includes("node_modules/@react-three/drei")) {
            return "r3f-drei";
          }

          // Animation libraries
          if (id.includes("node_modules/gsap/")) {
            return "gsap";
          }
          if (
            id.includes("node_modules/motion/") ||
            id.includes("node_modules/framer-motion/")
          ) {
            return "motion";
          }

          // Other utilities
          if (id.includes("node_modules/maath/")) {
            return "math-utils";
          }
          if (id.includes("node_modules/lucide-react/")) {
            return "icons";
          }

          // Spline
          if (id.includes("node_modules/@splinetool/")) {
            return "spline";
          }

          // Catch-all for remaining node_modules
          if (id.includes("node_modules/")) {
            return "vendor";
          }
        },
      },
    },
  },
});
