/**
 * @file src/shared/constants/index.ts
 * @description Project-wide constants — world scale, physics, input, and performance.
 *
 * ALL magic numbers in the codebase must be defined here.
 * Never use a raw number literal for a world/physics value in feature code.
 */

// ── World ─────────────────────────────────────────────────────────────────────

/** Base unit: 1 world unit = 1 meter */
export const WORLD_SCALE = 1;

/** Size of a single zone cell in world units */
export const ZONE_SIZE = 200;

/** Maximum distance from origin the world extends */
export const WORLD_RADIUS = 1000;

/** Y coordinate of the ground plane */
export const GROUND_Y = 0;

// ── Player ────────────────────────────────────────────────────────────────────

export const PLAYER_WALK_SPEED   = 5;    // m/s
export const PLAYER_RUN_SPEED    = 12;   // m/s
export const PLAYER_JUMP_FORCE   = 8;    // Newtons (Rapier)
export const PLAYER_HEIGHT       = 1.8;  // meters
export const PLAYER_RADIUS       = 0.4;  // capsule radius
export const PLAYER_MASS         = 70;   // kg

/** Distance at which the player can interact with objects */
export const INTERACTION_RADIUS  = 3;    // world units

// ── Camera ────────────────────────────────────────────────────────────────────

export const CAMERA_FOV          = 75;   // degrees
export const CAMERA_NEAR         = 0.1;
export const CAMERA_FAR          = 2000;
export const CAMERA_THIRD_DISTANCE = 6; // units behind player

// ── Physics ───────────────────────────────────────────────────────────────────

export const GRAVITY = -20;             // m/s² (stronger than real for game feel)

// ── Day-Night ─────────────────────────────────────────────────────────────────

/** Real seconds per full in-game day */
export const GAME_DAY_REAL_SECONDS = 24 * 60; // 24 real minutes

// ── Frame Budget (milliseconds) ───────────────────────────────────────────────

/** Max ms per frame before perf warning is logged */
export const FRAME_BUDGET_MS = 16.67; // 60 FPS target

// ── Layers (Three.js object layers for raycasting) ────────────────────────────

export const LAYER_DEFAULT     = 0;
export const LAYER_PLAYER      = 1;
export const LAYER_NPC         = 2;
export const LAYER_BUILDING    = 3;
export const LAYER_VEHICLE     = 4;
export const LAYER_TRIGGER     = 5;
export const LAYER_INVISIBLE   = 6;

// ── Z-index (2D UI) ───────────────────────────────────────────────────────────

export const Z_CANVAS   = 0;
export const Z_HUD      = 10;
export const Z_OVERLAY  = 20;
export const Z_MENU     = 30;
export const Z_MODAL    = 40;
export const Z_TOAST    = 50;
