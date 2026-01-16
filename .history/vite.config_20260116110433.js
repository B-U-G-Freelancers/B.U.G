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
      test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,

      // Exclude patterns (optional)
      exclude: undefined,
      include: undefined,

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

    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "three-vendor": ["three", "@react-three/fiber", "@react-three/drei"],
          "animation-vendor": ["gsap", "motion"],
        },
      },
    },

    // Target modern browsers
    target: "esnext",

    // Source maps for production debugging (optional)
    sourcemap: false,
  },
});
