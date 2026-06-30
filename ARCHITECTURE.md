# Project Architecture Summary

This document describes the architectural layout, data flow, and runtime mechanics of the Open World Interactive Developer Portfolio.

## 1. System Architecture
The application runs as a hybrid **React (DOM) + Three.js (Canvas)** application.
- **3D Canvas**: Handles collision, camera cinematics, interaction volumes, and physics (`@react-three/fiber`, `@react-three/drei`).
- **Application Shell**: An overlay DOM layer that acts as the "operating system". It mounts District Applications (like the Resume Center or Skills Lab) natively over the 3D canvas when the player interacts with specific buildings.

## 2. Folder Structure
- `src/core/`: Singleton managers and foundational systems (`AppManager`, `InteractionManager`, `CacheManager`, `RequestManager`, `TerminalManager`, `EventBus`).
- `src/features/`: Domain-specific business logic.
  - `districts/`: Scene definitions, building meshes, and NPC components for specific areas.
  - `apps/`: The UI applications that mount in the Application Shell (e.g. `SkillsLab`, `ProjectsDistrict`).
  - `player/`: Physics, camera, and input controllers.
  - `audio/`: Global audio managers for ducking/ambience transitions.
  - `npc/`: Dialogue state machines and AI guide logic.
- `src/ui/`: Global DOM overlays (HUD, Terminal, Loading Screen, Tooltips).
- `src/shared/`: Utility functions and global constants.

## 3. Data Flow & Service Layer
The portfolio fetches live developer metrics from multiple platforms without routing through a proprietary backend.
1. **RequestManager**: The singular choke point for all network requests. Handles timeouts, HTTP 429 backoff retries, and cancellation via `AbortController`.
2. **API Services**: `GitHubService`, `LeetCodeService`, `CodeforcesService`.
3. **CacheManager**: Caches raw API responses using a hybrid Memory+LocalStorage approach to guarantee <50ms load times and prevent rate limits.
4. **PortfolioAnalytics**: Aggregates the raw endpoints into a composite `DeveloperScore`.

## 4. Event Flow
All subsystems are strictly decoupled using a custom pub/sub `EventBus`.
- Example: When an NPC conversation ends, `DialogueManager` emits `npc:conversationEnded`. The `ApplicationAudioManager` listens to this event to restore background music volume.
- Components communicate via events rather than circular imports.

## 5. Application Lifecycle
When a user approaches a building and presses 'E':
1. `InteractionManager` validates cooldowns and emits `app:opening`.
2. `CinematicDirector` takes over the camera, locking player input and swooping into the building.
3. `AppManager` lazy-loads the React component (e.g., `import('@features/apps/SkillsLab')`).
4. `ApplicationShell` mounts the UI layer, catching focus for accessibility.

## 6. Performance Optimizations
- **React Rendering**: Heavy visualizations (Heatmaps, SVGs) are aggressively memoized (`React.memo`, `useMemo`) and chunked via `React.lazy`.
- **Three.js**: Geometries are instantiated and reused.
- **GPU Usage**: Bloom passes and post-processing are clamped. 
- **Offline States**: Every data fetch handles `ErrorState` cleanly via `CacheManager` fallbacks.

## 7. Extension Points & Limitations
- **Multiplayer Ready**: Because all state changes (movement, interaction) route through the `EventBus`, it is highly extensible for WebSockets (mirroring events over the wire).
- **Limitations**: The AI Guide NPC dialogue is currently deterministic (Decision Tree). A future extension point exists to hook the Dialogue Manager to a streaming LLM endpoint for organic conversations.
