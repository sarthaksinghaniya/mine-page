# Open World Portfolio Architecture

## Core Engine
- **React Three Fiber (R3F):** Manages the 3D scene graph and declarative rendering loop.
- **Rapier Physics:** High performance 3D physics engine for collisions and character movement.
- **Zustand:** Global state management for Player, World, and Camera.
- **Three.js:** Underlying WebGL rendering layer.

## Subsystems
### 1. Environment & Terrain Engine
Uses `simplex-noise` for procedural terrain generation. Generates seamless rolling hills and incorporates a `WaterBody` with advanced reflections via `MeshReflectorMaterial`.

### 2. Event & Interaction System
`EventBus` (PubSub) orchestrates interactions. `InteractionManager` handles raycasting/proximity detection to trigger world events (e.g., entering a building).

### 3. Application Manager
Buildings are wrappers for 2D UI applications. When a player enters a building, the `CinematicDirector` plays a seamless camera push, followed by `AppManager` rendering the React application dynamically over the canvas.

### 4. Player & Camera
- `AnimatedPlayerController` drives procedurally animated models based on character state.
- `ThirdPersonCamera` provides a framerate-independent, mathematically smoothed orbit camera around the player, utilizing spherical coordinates and collision clamping.
