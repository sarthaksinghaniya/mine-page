/**
 * @file src/core/ecs/components.ts
 * @description All Entity-Component-System component type definitions.
 *
 * Components are pure data — no methods, no logic. They are attached to
 * entities via the Miniplex world and consumed by systems in useFrame loops.
 *
 * NAMING CONVENTION:
 *  - Component type names end in `Component` (e.g., `TransformComponent`)
 *  - All fields are optional at the type level; required at entity archetype level
 */

import type * as THREE from 'three';

// ── Spatial ───────────────────────────────────────────────────────────────────

/** 3D position, rotation, and scale — the base of all world entities */
export interface TransformComponent {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale:    THREE.Vector3;
}

/** Linear and angular velocity for physics-driven entities */
export interface VelocityComponent {
  linear:  THREE.Vector3;
  angular: THREE.Vector3;
}

// ── Identity ──────────────────────────────────────────────────────────────────

/** Unique runtime identifier and optional human-readable tag */
export interface IdentityComponent {
  id:  string;
  tag: string;
}

// ── Rendering ─────────────────────────────────────────────────────────────────

/** Reference to the Three.js Object3D that represents this entity visually */
export interface MeshRefComponent {
  ref: THREE.Object3D | null;
}

/** LOD level: 0 = full detail, 1 = medium, 2 = low, 3 = culled */
export interface LodComponent {
  level:          0 | 1 | 2 | 3;
  distances:      [number, number, number];
  distanceToCamera: number;
}

// ── Physics ───────────────────────────────────────────────────────────────────

/** Marks an entity as participating in Rapier physics simulation */
export interface RigidBodyComponent {
  type:   'dynamic' | 'fixed' | 'kinematicPosition' | 'kinematicVelocity';
  mass:   number;
  linearDamping:  number;
  angularDamping: number;
}

// ── AI / Behaviour ────────────────────────────────────────────────────────────

/** NPC behavioural state machine */
export interface NpcBrainComponent {
  state:      'idle' | 'walking' | 'talking' | 'fleeing';
  targetId:   string | null;
  alertLevel: number; // 0–1
}

/** Navigation path for NPC movement */
export interface NavigationComponent {
  path:          THREE.Vector3[];
  currentIndex:  number;
  speed:         number;
  arrivalRadius: number;
}

// ── Audio ─────────────────────────────────────────────────────────────────────

/** Spatial audio source attached to an entity */
export interface SpatialAudioComponent {
  soundId:    string;
  volume:     number;
  maxDistance: number;
  rolloffFactor: number;
  loop:       boolean;
  playing:    boolean;
}

// ── Zone ──────────────────────────────────────────────────────────────────────

/** Marks an entity as belonging to a specific world zone */
export interface ZoneComponent {
  zoneId:   string;
  zoneName: string;
}

// ── Portfolio ─────────────────────────────────────────────────────────────────

/** Associates a 3D entity (building, sign) with portfolio data */
export interface PortfolioNodeComponent {
  projectId:   string;
  interactable: boolean;
  activated:   boolean;
}

// ── Composite Entity Archetypes ───────────────────────────────────────────────

/**
 * A minimal world entity — every entity in the ECS world must satisfy this.
 */
export interface BaseEntity {
  id:        IdentityComponent;
  transform: TransformComponent;
}

/** A renderable entity with optional LOD */
export interface RenderableEntity extends BaseEntity {
  mesh: MeshRefComponent;
  lod?: LodComponent;
}

/** A physics-simulated entity */
export interface PhysicsEntity extends RenderableEntity {
  rigidBody: RigidBodyComponent;
  velocity:  VelocityComponent;
}

/** A full NPC entity */
export interface NpcEntity extends PhysicsEntity {
  brain:      NpcBrainComponent;
  navigation: NavigationComponent;
  audio?:     SpatialAudioComponent;
  zone?:      ZoneComponent;
}
