# Open World 3D Portfolio

Welcome to the production release of my interactive 3D portfolio experience! 
Built as a futuristic, glassmorphic city, this project seamlessly blends professional achievements with game development architecture.

## 🚀 Features

- **Interactive Environment:** A fully explorable 3D world built with React Three Fiber.
- **Agentic Physics:** Custom-tuned kinematic physics using Rapier.
- **Dynamic Optimization:** Three graphical presets (`LOW`, `MEDIUM`, `HIGH`) to ensure butter-smooth framerates across low-end mobile devices and high-end gaming rigs.
- **Glassmorphic Architecture:** High-end physical materials (`meshPhysicalMaterial`) complete with environment reflections and inner-glowing structures.
- **Immersive Audio:** Dynamic spatial audio zones and footstep SFX based on surface tracking.
- **Gamified HUD:** Floating UI, interactive maps, and responsive menus built with Tailwind CSS and Zustand.

## 🛠 Tech Stack

- **Framework:** React 19 / Vite 8
- **3D Engine:** Three.js / React-Three-Fiber / Drei
- **Physics Engine:** @react-three/rapier
- **State Management:** Zustand
- **Animations:** GSAP & Framer Motion
- **Styling:** Tailwind CSS 4

## 🎮 Controls

| Action | Key / Input |
| --- | --- |
| **Move** | `W` `A` `S` `D` |
| **Sprint** | `Shift` (Hold) |
| **Jump** | `Spacebar` |
| **Interact / Enter** | `E` |
| **Toggle Map** | `M` |
| **Toggle Menu** | `Esc` |

## ⚙️ Performance Notes

To achieve the best experience, the application utilizes dynamic performance scaling.
If you experience low FPS on a laptop or mobile device, change your graphics setting:
1. Open Menu (`Esc`)
2. Go to **Settings** -> **Graphics**
3. Select **LOW** (disables shadows, reflections, and fog)

**Target Metrics:**
- FPS: Stable 60fps on modern machines
- Build Size: Optimized Vite chunking (Brotli/Gzip ready)

## 📦 Deployment Steps

This application is configured for modern edge deployment (Vercel / Netlify).

1. Clone the repository
2. Install dependencies: `npm install`
3. Verify local build: `npm run build`
4. Deploy the `dist/` directory to your chosen provider.
5. *Note for Netlify/Vercel:* Ensure the build command is set to `npm run build` and publish directory is `dist`.

---
*Developed with a passion for Generative AI, Full-Stack Engineering, and creating experiences that wow.*
