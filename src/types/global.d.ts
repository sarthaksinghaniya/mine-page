/**
 * @file src/types/global.d.ts
 * @description Global ambient TypeScript declarations for the open-world portfolio.
 *
 * This file is auto-included by tsconfig.app.json. Add any global type augmentations
 * or module declarations that cannot be resolved through normal @types packages here.
 */

// ── Vite Environment Variables ────────────────────────────────────────────────

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_GITHUB_TOKEN: string;
  readonly VITE_GITHUB_USERNAME: string;
  readonly VITE_AI_ASSISTANT_URL: string;
  readonly VITE_ENABLE_PHYSICS: string;
  readonly VITE_ENABLE_AUDIO: string;
  readonly VITE_ENABLE_AI_ASSISTANT: string;
  readonly VITE_ENABLE_MULTIPLAYER: string;
  readonly VITE_PERFORMANCE_TIER: 'low' | 'medium' | 'high' | 'auto';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// ── Asset Module Declarations ─────────────────────────────────────────────────

declare module '*.gltf' {
  const url: string;
  export default url;
}

declare module '*.glb' {
  const url: string;
  export default url;
}

declare module '*.hdr' {
  const url: string;
  export default url;
}

declare module '*.ktx2' {
  const url: string;
  export default url;
}

declare module '*.mp3' {
  const url: string;
  export default url;
}

declare module '*.ogg' {
  const url: string;
  export default url;
}

declare module '*.wav' {
  const url: string;
  export default url;
}

declare module '*.webp' {
  const url: string;
  export default url;
}

declare module '*.svg' {
  import type React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

// ── Web Worker ────────────────────────────────────────────────────────────────

declare module '*?worker' {
  const WorkerFactory: new () => Worker;
  export default WorkerFactory;
}

declare module '*?url' {
  const url: string;
  export default url;
}
