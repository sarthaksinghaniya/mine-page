/**
 * @file src/ui/hud/InteractionPrompt.tsx
 * @description HUD overlay displaying contextual prompts for focused interactable targets.
 */

import React, { useEffect, useState } from 'react';
import { eventBus } from '@core/events/EventBus';
import { InteractionManager } from '@core/interaction/InteractionManager';
import type { InteractableConfig } from '@core/interaction/interactable.types';
import { Card, Badge } from '@/ui/system';

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
        bottom: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        pointerEvents: 'none',
      }}
    >
      <Card 
        variant="glow" 
        padding="none" 
        className="!rounded-full px-6 py-3 flex items-center gap-3 border-[var(--color-primary-300)] shadow-[0_8px_32px_rgba(0,229,240,0.3)] animate-in fade-in slide-in-from-bottom-5 duration-300"
      >
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary-500)] text-[#050508] font-bold text-sm shadow-[0_0_15px_var(--color-primary-500)]">
          E
        </span>
        <span className="tracking-widest uppercase text-sm font-semibold text-[var(--color-text-primary)]">
          {activeItem.promptText ?? `Interact with ${activeItem.name}`}
        </span>
      </Card>
    </div>
  );
}
export default InteractionPrompt;
