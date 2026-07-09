# Model Guide & Blender Export Settings

To maintain a consistent AAA Stylized low-poly aesthetic across the portfolio, all external models must adhere to the following guidelines.

## Art Style
We highly recommend using models from [Quaternius](https://quaternius.com/) or [Kenney](https://kenney.nl/) to ensure a consistent, stylized low-poly art direction. Mixing photorealistic assets with low-poly assets will ruin the world's cohesion.

## Asset Naming Conventions
Use snake_case for all file names.
- Characters: `player.glb`, `scientist.glb`
- Props: `bench.glb`, `wooden_crate.glb`
- Buildings: `revibe_lab.glb`, `village_house.glb`

## Blender Export Settings (GLTF 2.0)
When exporting your own models from Blender to be used in the `AssetManager`:
1. **Format:** `glTF Binary (.glb)`
2. **Include:** Limit to `Selected Objects`. Ensure `Custom Properties` and `Cameras/Punctual Lights` are disabled unless strictly necessary.
3. **Geometry:** Apply Modifiers. Export Normals. Disable Tangents (calculated at runtime if needed to save space).
4. **Animation:** Check `Animation`, `Shape Keys`, and `Skinning` if exporting a character rig. Use NLA strips if managing multiple clips (Idle, Walk, Run).

## Materials
- **PBR Workflow:** Stick to standard principled BSDF.
- **Texture Atlasing:** Instead of using 10 different materials for a building, bake the colors into a single texture atlas (e.g. 256x256 palette) and UV map the faces to the colored squares. This drastically reduces draw calls.
- **Shared Materials:** R3F handles material instancing natively, but exporting fewer distinct material definitions per GLB improves parsing time.
