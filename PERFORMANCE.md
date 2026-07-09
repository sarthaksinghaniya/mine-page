# Performance Optimization Strategy

The Open World Portfolio relies on strict memory management and rendering optimization to achieve 60 FPS in a web browser.

## 1. Instancing
Instead of rendering individual meshes for trees, foliage, and props, the engine uses `InstancedMesh`. `VegetationInstancer.tsx` efficiently renders up to 3,000 procedural trees using only a single draw call for trunks and a single draw call for leaves, significantly reducing CPU-to-GPU overhead.

## 2. Dynamic Zone Streaming (ZoneCuller)
The world is chunked. `ZoneCuller.ts` runs a distance algorithm every frame to track which terrain zones the player is currently near. Distant zones are unmounted from the React Tree entirely, saving both memory and render time.

## 3. Geometry Caching & React.useMemo
All complex geometries (like procedural terrain in `TerrainChunk.tsx`) are generated once and memoized. React will not rebuild the vertices on component re-renders unless the chunk boundaries change.

## 4. Materials and Shaders
- **BakeShadows:** Static shadows are baked where possible.
- **MeshReflectorMaterial:** Water reflections use lower resolution buffers (512x512) and depth thresholds to avoid rendering the entire scene twice at full resolution.
- **Occlusion Culling:** Built-in Three.js frustum culling ensures objects behind the camera are immediately discarded.
