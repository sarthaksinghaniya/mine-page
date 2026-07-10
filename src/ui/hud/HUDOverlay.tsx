/**
 * @file src/ui/hud/HUDOverlay.tsx
 * @description Master HUD container positioning the modular AAA UI components.
 */

import React, { useState, useEffect } from 'react';
import { eventBus } from '@core/events/EventBus';
import { PlayerProfile } from './components/PlayerProfile';
import { CompassBar } from './components/CompassBar';
import { TopRightStats } from './components/TopRightStats';
import { QuestTracker } from './components/QuestTracker';
import { SideMenu } from './components/SideMenu';
import { MinimapOverlay } from './components/MinimapOverlay';
import { BottomHotbar } from './components/BottomHotbar';
import { ControlsHelp } from './components/ControlsHelp';
import { WorldTitleBanner } from './components/WorldTitleBanner';
import { DialogueOverlay } from './components/DialogueOverlay';

export function HUDOverlay(): React.ReactElement {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const unsub = eventBus.on('ui:hudVisibility', (payload) => {
      setIsVisible(payload.visible);
    });
    return () => unsub();
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden transition-opacity duration-500 ease-in-out"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className="absolute inset-0 p-6 sm:p-8">
        {/* Top row */}
        <div className="absolute left-6 top-6 right-16 flex items-start justify-between gap-6">
          <PlayerProfile />
          <div className="flex flex-col items-center gap-4 pt-4">
            <CompassBar />
            <WorldTitleBanner />
          </div>
          <TopRightStats />
        </div>

        {/* Left navigation */}
        <div className="absolute left-6 top-[160px] bottom-[120px] flex items-center">
          <SideMenu />
        </div>

        {/* Quest */}
        <div className="absolute right-6 top-[270px]">
          <QuestTracker />
        </div>

        {/* Bottom left */}
        <div className="absolute left-6 bottom-2">
          <MinimapOverlay />
        </div>

        {/* Bottom center */}
        <div className="absolute left-1/2 bottom-5 -translate-x-1/2">
          <BottomHotbar />
        </div>

        {/* Bottom right */}
        <div className="absolute right-6 bottom-7">
          <ControlsHelp />
        </div>

        {/* Dialogue Overlay */}
        <DialogueOverlay />
      </div>
    </div>
  );
}
