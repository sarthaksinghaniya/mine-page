# Open World Portfolio

> A cinematic, interactive, open-world 3D portfolio built as a futuristic city experience.

---

## Quick Start

```bash
npm install
npm run dev       # Start dev server at http://localhost:5173
npm run build     # TypeScript check + production build
npm run test      # Run all unit tests
npm run lint      # ESLint check
npm run format    # Prettier format
ANALYZE=true npm run build  # Open bundle visualizer
```

---

## Architecture Overview

```
src/
├── app/           Entry point, providers, root Canvas
├── core/          Engine primitives (ECS, GameLoop, EventBus)
├── features/      Domain-specific game logic (vertical slices)
├── ui/            2D HUD and overlay components
├── shared/        Cross-feature hooks, utils, constants
├── config/        Env validation, performance profiles
├── styles/        Global CSS, design tokens, animations
└── types/         Global TypeScript declarations
```

### Core Principles

| Principle | Rule |
|-----------|------|
| **ECS** | All per-frame game logic lives in ECS systems, never in React state |
| **Refs > State** | Use `useRef` for 3D values that change every frame |
| **Feature Isolation** | Features communicate ONLY via `eventBus`, never via direct imports |
| **Single GameLoop** | All systems register via `registerSystem()` — no scattered `useFrame` calls |
| **Config-driven** | Performance decisions (shadow quality, LOD) flow from `performanceProfile` |

---

## Naming Conventions

### Files

| Type | Convention | Example |
|------|-----------|---------|
| React Component | `PascalCase.tsx` | `PlayerCamera.tsx` |
| React Hook | `camelCase.ts` with `use` prefix | `useKeyboard.ts` |
| ECS System | `PascalCase` + `System` suffix | `MovementSystem.ts` |
| Zustand Store | `camelCase` + `.store.ts` | `player.store.ts` |
| Type definitions | `camelCase` + `.types.ts` | `player.types.ts` |
| Utility functions | `camelCase.ts` | `math.ts` |
| Barrel exports | `index.ts` | `index.ts` |
| Test files | `filename.test.ts(x)` | `math.test.ts` |
| CSS files | `kebab-case.css` | `globals.css` |

### Code

| Type | Convention | Example |
|------|-----------|---------|
| React Component | `PascalCase` | `function GameLoop()` |
| Hook | `camelCase` with `use` prefix | `function useKeyboard()` |
| Event names | `feature:action` | `'player:zoneChanged'` |
| Constants | `UPPER_SNAKE_CASE` | `PLAYER_WALK_SPEED` |
| Types/Interfaces | `PascalCase` | `interface PlayerState` |
| Enums | `PascalCase` | `type WeatherType = 'clear' \| 'rain'` |
| Private class members | `camelCase` | `private readonly sounds` |
| ECS entity IDs | `camelCase` string | `'player'`, `'npc-guide-01'` |

### Import Order (enforced by ESLint)

```ts
// 1. Node built-ins
// 2. External packages
import { useEffect } from 'react';
import * as THREE from 'three';

// 3. Internal packages (path aliases, @-prefixed)
import { world } from '@core/ecs';
import { usePlayerStore } from '@features/player';

// 4. Relative imports (local module)
import { lerp } from './math';

// 5. Type-only imports (always last, use `import type`)
import type { PlayerState } from '@features/player';
```

---

## Feature Development Guide

### Adding a New Feature

1. Create `src/features/<name>/` directory
2. Define types in `<name>.types.ts` (pure data, no imports from other features)
3. Create Zustand store in `<name>.store.ts`
4. Add components in `components/` subfolder
5. Add ECS systems in `systems/` subfolder
6. Register systems in the GameLoop via `registerSystem()`
7. Communicate with other features ONLY via `eventBus`
8. Export everything via `index.ts`

### Adding an ECS System

```ts
// In your feature's system file
import { registerSystem, deregisterSystem } from '@core/engine/GameLoop';
import { world } from '@core/ecs/world';

const npcQuery = world.with('brain', 'navigation', 'transform');

function tick(delta: number): void {
  for (const entity of npcQuery) {
    // Mutate entity data directly — no React setState
    entity.navigation.currentIndex; // read
    entity.transform.position.x += entity.velocity.linear.x * delta; // write
  }
}

// Call once during feature initialization
registerSystem('npc.brain', tick, 20); // priority 20
```

### Adding a Zustand Store

```ts
// Always use subscribeWithSelector for fine-grained subscriptions
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export const useMyStore = create<MyState & MyActions>()(
  subscribeWithSelector((set) => ({
    // state and actions
  }))
);

// Subscribe to a slice (outside components, for system use)
useMyStore.subscribe(
  (state) => state.someValue,
  (newValue) => { /* react to change */ },
);
```

---

## Performance Rules

1. **Never call `setState` inside `useFrame`** — use refs and sync to store at reduced frequency
2. **Always dispose Three.js objects** when components unmount (geometries, materials, textures)
3. **Check `performanceProfile`** before creating particle systems, shadows, or post-processing
4. **Lazy load zone components** using `React.lazy()` + dynamic `import()`
5. **Use `instancedMesh`** for repeated geometry (grass, windows, street lights)
6. **Cap animation frame rate** for non-critical animations using time accumulators

---

## Environment Variables

Copy `.env.example` to `.env` and fill in values:

```bash
cp .env.example .env
```

All env vars are accessed through `src/config/env.ts` — **never** via `import.meta.env` directly.

---

## Tech Stack

| Domain | Library | Version |
|--------|---------|---------|
| Build | Vite | 6.x |
| Framework | React | 19.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| 3D | Three.js + R3F + Drei | latest |
| Physics | @react-three/rapier | 2.x |
| Animation | GSAP + motion | 3.x / 12.x |
| State | Zustand | 5.x |
| ECS | Miniplex | 2.x |
| Audio | Howler.js | 2.x |
| Testing | Vitest | latest |

---

## Scripts Reference

```bash
npm run dev          # Dev server (localhost:5173)
npm run build        # Type check + production build
npm run preview      # Preview production build (localhost:4173)
npm run lint         # ESLint (all TS/TSX files)
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier write
npm run format:check # Prettier check (for CI)
npm run test         # Vitest run (single pass)
npm run test:watch   # Vitest watch mode
npm run test:ui      # Vitest browser UI
npm run type-check   # TypeScript no-emit check
ANALYZE=true npm run build  # Bundle visualizer
```
