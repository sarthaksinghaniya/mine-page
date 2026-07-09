# Asset Pipeline Documentation

## Folder Structure
All raw assets must be placed inside `public/assets/` to be served statically by the bundler.

```text
public/
  assets/
    characters/
    buildings/
    props/
    nature/
    vehicles/
    effects/
```

## Loading Pipeline
We use `@react-three/drei`'s `useGLTF` wrapped inside a custom `SafeModel` component (`src/core/assets/AssetManager.ts`).
The `SafeModel` loader:
1. **Attempts to load** the requested GLB file.
2. **Automatically clones** the scene so multiple instances of the same model can be rendered simultaneously without geometry conflicts.
3. **Applies shadow configurations** dynamically (`castShadow`, `receiveShadow`) across all descendant meshes.
4. **Gracefully falls back** to colored primitive shapes if the asset file does not exist, preventing the app from crashing.

## Caching
R3F's `useGLTF` automatically caches models based on their URL. If you mount `SafeModel` 100 times for the same tree, the GLB is only fetched over the network once.

## Supported Formats
- Standard `.glb` and `.gltf`
- Draco compressed geometries (requires `draco/` decoder path configuration in `AssetManager`)
- Meshopt compressed geometries
- KTX2 Texture compression
