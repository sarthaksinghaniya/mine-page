import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';

// ─────────────────────────────────────────────────────────────────────────────
// Vite Configuration — Open-World Portfolio
//
// Performance priorities:
//  1. Manual chunk splitting → long-term browser caching
//  2. WASM passthrough for Rapier physics
//  3. All path aliases mirrored from tsconfig.app.json
//  4. Visualizer plugin available in analyze mode
// ─────────────────────────────────────────────────────────────────────────────

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    // Bundle visualizer — only active when ANALYZE=true
    ...(process.env['ANALYZE'] === 'true'
      ? [visualizer({ open: true, gzipSize: true, brotliSize: true })]
      : []),
  ],

  // ── Path Aliases ────────────────────────────────────────────────────────────
  resolve: {
    alias: {
      '@':        resolve(__dirname, './src'),
      '@core':    resolve(__dirname, './src/core'),
      '@features':resolve(__dirname, './src/features'),
      '@ui':      resolve(__dirname, './src/ui'),
      '@shared':  resolve(__dirname, './src/shared'),
      '@config':  resolve(__dirname, './src/config'),
      '@types':   resolve(__dirname, './src/types'),
      '@styles':  resolve(__dirname, './src/styles'),
    },
  },

  // ── Asset Handling ──────────────────────────────────────────────────────────
  assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.hdr', '**/*.ktx2', '**/*.wasm'],

  // ── Dev Server ──────────────────────────────────────────────────────────────
  server: {
    port: 5173,
    strictPort: true,
    // Required for Rapier WASM shared memory
    headers: {
      'Cross-Origin-Opener-Policy':   'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },

  // ── Preview Server ──────────────────────────────────────────────────────────
  preview: {
    port: 4173,
    headers: {
      'Cross-Origin-Opener-Policy':   'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },

  // ── Build ───────────────────────────────────────────────────────────────────
  build: {
    target: 'esnext',
    sourcemap: mode === 'development',
    // Warn if any single chunk exceeds 600 KB
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        /**
         * Manual chunk strategy:
         *  - 'vendor-react'  : React + React DOM (highly stable, long cache)
         *  - 'vendor-three'  : Three.js core (large, infrequently changed)
         *  - 'vendor-r3f'    : React Three Fiber + Drei (changes with Three)
         *  - 'vendor-physics': Rapier WASM (separate for WASM-specific headers)
         *  - 'vendor-motion' : Framer Motion / GSAP animation libraries
         *  - 'vendor-state'  : Zustand, Miniplex
         *  - 'vendor-audio'  : Howler.js
         */
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react/'))
              return 'vendor-react';
            if (id.includes('three/'))
              return 'vendor-three';
            if (id.includes('@react-three/fiber') || id.includes('@react-three/drei'))
              return 'vendor-r3f';
            if (id.includes('@react-three/rapier') || id.includes('@dimforge'))
              return 'vendor-physics';
            if (id.includes('motion') || id.includes('gsap'))
              return 'vendor-motion';
            if (id.includes('zustand') || id.includes('miniplex'))
              return 'vendor-state';
            if (id.includes('howler'))
              return 'vendor-audio';
          }
        },

        // Deterministic file naming for long-term CDN caching
        chunkFileNames:  'assets/js/[name]-[hash].js',
        entryFileNames:  'assets/js/[name]-[hash].js',
        assetFileNames:  'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },

  // ── Worker ──────────────────────────────────────────────────────────────────
  worker: {
    format: 'es',
  },

  // ── Optimizations ───────────────────────────────────────────────────────────
  optimizeDeps: {
    // Pre-bundle heavy deps to speed up cold dev server starts
    include: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'zustand',
      'gsap',
    ],
    // Exclude WASM — must be handled at runtime
    exclude: ['@react-three/rapier'],
  },
}));
