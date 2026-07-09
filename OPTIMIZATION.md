# Performance Optimization Strategy

Targeting 60+ FPS on desktop and a stable 40+ FPS on integrated graphics/mid-range mobile requires strict adherence to React Three Fiber rendering guidelines.

## 1. Object Pooling & Instancing
When replacing procedural terrain and vegetation with GLTF assets:
- DO NOT render 2,000 `<SafeModel path="tree.glb" />` components. This will result in 2,000 distinct draw calls.
- INSTEAD: Load the `tree.glb` once via `useGLTF`, extract its `.geometry` and `.material`, and feed those into a **single `<instancedMesh>`** instance. Update the `instanceMatrix` via dummy objects. This reduces 2,000 draw calls to 1.

## 2. Lazy Loading & Chunk Streaming
The world is massive and cannot be held in memory entirely.
- The `ChunkManager` keeps track of the player's 3D coordinates.
- District components (like `ProjectsDistrict` and `AIResearchDistrict`) are only mounted to the React DOM when their zone ID is within the active chunk array.
- When leaving a district, R3F unmounts the component, effectively hiding all GLTF assets inside. The browser's garbage collector can then flush unused textures if memory pressure is high, while `useGLTF` caching ensures rapid re-mounting if the player turns back.

## 3. Shadows & Lighting
- **Frustum Culling:** R3F handles culling meshes outside the camera view automatically.
- **Shadow Maps:** Directional light shadow maps are tightly bound to the player's position, ensuring high resolution for near-field contact shadows without calculating shadows for distant, out-of-focus geometry.
- **Baking:** Whenever possible, bake static lighting and Ambient Occlusion (AO) directly into your GLTF textures in Blender. This drastically reduces the need for expensive real-time light calculations on static structures like houses and stadiums.

## 4. Animation Batching
For NPCs:
- If you have 50 NPCs sharing the same skeleton and walk cycle, consider using Three.js `InstancedMesh` with an animation library or a vertex shader approach to play animations on GPU instances rather than CPU-bound `AnimationMixer` updates for every single entity.
