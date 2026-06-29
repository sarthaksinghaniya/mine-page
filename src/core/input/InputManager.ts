/**
 * @file src/core/input/InputManager.ts
 * @description Translates keyboard/mouse inputs into a unified InputActionMap.
 */

export interface InputActionState {
  moveForward: boolean;
  moveBackward: boolean;
  moveLeft: boolean;
  moveRight: boolean;
  jump: boolean;
  sprint: boolean;
  interact: boolean;
}

class InputManagerClass {
  private readonly actions: InputActionState = {
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    sprint: false,
    interact: false,
  };

  private readonly keyMap: Record<string, keyof InputActionState> = {
    KeyW: 'moveForward',
    ArrowUp: 'moveForward',
    KeyS: 'moveBackward',
    ArrowDown: 'moveBackward',
    KeyA: 'moveLeft',
    ArrowLeft: 'moveLeft',
    KeyD: 'moveRight',
    ArrowRight: 'moveRight',
    Space: 'jump',
    ShiftLeft: 'sprint',
    ShiftRight: 'sprint',
    KeyE: 'interact',
  };

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('keyup', this.handleKeyUp);
      window.addEventListener('blur', this.handleBlur);
    }
  }

  private readonly handleKeyDown = (e: KeyboardEvent): void => {
    const action = this.keyMap[e.code];
    if (action) {
      this.actions[action] = true;
    }
  };

  private readonly handleKeyUp = (e: KeyboardEvent): void => {
    const action = this.keyMap[e.code];
    if (action) {
      this.actions[action] = false;
    }
  };

  private readonly handleBlur = (): void => {
    // Clear inputs on window focus loss to prevent stuck keys
    (Object.keys(this.actions) as (keyof InputActionState)[]).forEach((k) => {
      this.actions[k] = false;
    });
  };

  getActions(): InputActionState {
    return { ...this.actions };
  }

  dispose(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.handleKeyDown);
      window.removeEventListener('keyup', this.handleKeyUp);
      window.removeEventListener('blur', this.handleBlur);
    }
  }
}

export const InputManager = new InputManagerClass();
