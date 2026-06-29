/**
 * @file src/ui/hud/InteractionPrompt.tsx
 * @description HUD overlay displaying contextual prompts for focused interactable targets.
 */

import React, { useEffect, useState } from 'react';
import { eventBus } from '@core/events/EventBus';
import { InteractionManager } from '@core/interaction/InteractionManager';
import type { InteractableConfig } from '@core/interaction/interactable.types';

export function InteractionPrompt(): React.ReactElement | null {
  const [activeItem, setActiveItem] = useState<InteractableConfig | null>(null);

  useEffect(() => {
    // Listen to menu open/close events used by InteractionManager for focus notification
    const unsubOpen = eventBus.on('ui:menuOpened', (payload) => {
      if (payload.menuId.startsWith('prompt-')) {
        setActiveItem(InteractionManager.getFocused());
      }
    });

    const unsubClose = eventBus.on('ui:menuClosed', (payload) => {
      if (payload.menuId.startsWith('prompt-')) {
        setActiveItem(null);
      }
    });

    return () => {
      unsubOpen();
      unsubClose();
    };
  }, []);

  if (!activeItem) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '25%',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(10, 10, 18, 0.85)',
        border: '1px solid #00e5f0',
        padding: '12px 24px',
        color: '#f0f0ff',
        fontFamily: 'sans-serif',
        fontSize: '14px',
        borderRadius: '4px',
        boxShadow: '0 0 15px rgba(0, 229, 240, 0.4)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 20, // Z_OVERLAY from constants
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      <span
        style={{
          backgroundColor: '#00e5f0',
          color: '#050508',
          padding: '2px 8px',
          fontWeight: 'bold',
          borderRadius: '3px',
          fontFamily: 'monospace',
        }}
      >
        E
      </span>
      <span style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>
        {activeItem.promptText ?? `Interact with ${activeItem.name}`}
      </span>
    </div>
  );
}
export default InteractionPrompt;
