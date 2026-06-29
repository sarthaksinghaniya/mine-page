/**
 * @file src/shared/hooks/usePointerLock.ts
 * @description Pointer lock API hook for first-person / FPS-style mouse capture.
 *
 * Handles:
 *  - Requesting pointer lock on an element
 *  - Releasing pointer lock
 *  - Tracking lock state reactively
 *  - Cross-browser vendor prefix fallbacks
 */

import { useCallback, useEffect, useRef, useState } from 'react';

export interface PointerLockControls {
  /** Whether the pointer is currently locked */
  isLocked: boolean;
  /** Request pointer lock on the target element */
  lock: () => void;
  /** Release the pointer lock */
  unlock: () => void;
  /** The element to attach the pointer lock to */
  targetRef: React.RefObject<HTMLElement | null>;
}

export function usePointerLock(): PointerLockControls {
  const targetRef = useRef<HTMLElement | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const lock = useCallback(() => {
    const element = targetRef.current ?? document.documentElement;
    void element.requestPointerLock();
  }, []);

  const unlock = useCallback(() => {
    document.exitPointerLock();
  }, []);

  useEffect(() => {
    const onLockChange = (): void => {
      setIsLocked(!!document.pointerLockElement);
    };

    const onLockError = (e: Event): void => {
      console.error('[usePointerLock] Failed to acquire pointer lock:', e);
      setIsLocked(false);
    };

    document.addEventListener('pointerlockchange', onLockChange);
    document.addEventListener('pointerlockerror', onLockError);

    return () => {
      document.removeEventListener('pointerlockchange', onLockChange);
      document.removeEventListener('pointerlockerror', onLockError);
    };
  }, []);

  return { isLocked, lock, unlock, targetRef };
}
