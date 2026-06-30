/**
 * @file src/core/apps/app.types.ts
 * @description Application contract interfaces.
 */

export interface PortfolioApp {
  id: string;
  title: string;
  icon?: string;
  load: () => Promise<void>;
  mount: (container: HTMLElement) => void;
  unmount: (container: HTMLElement) => void;
  dispose: () => void;
  
  // Lifecycle hooks
  beforeOpen?: () => Promise<void>;
  onOpen?: () => Promise<void>;
  onFocus?: () => Promise<void>;
  onBlur?: () => Promise<void>;
  beforeClose?: () => Promise<void>;
  onClose?: () => Promise<void>;
}

export interface AppManagerState {
  activeAppId: string | null;
  isOpen: boolean;
  isLoading: boolean;
}
