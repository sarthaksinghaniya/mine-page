/**
 * @file src/core/apps/app.types.ts
 * @description Application contract interfaces.
 */

export interface PortfolioApp {
  id: string;
  title: string;
  mount: () => React.ReactElement;
  dispose?: () => void;
}

export interface AppManagerState {
  activeAppId: string | null;
  isOpen: boolean;
}
