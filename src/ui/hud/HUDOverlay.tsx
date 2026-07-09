/**
 * @file src/ui/hud/HUDOverlay.tsx
 * @description Master HUD container positioning the modular AAA UI components.
 */

import React from 'react';
import { PlayerProfile } from './components/PlayerProfile';
import { CompassBar } from './components/CompassBar';
import { TopRightStats } from './components/TopRightStats';
import { QuestTracker } from './components/QuestTracker';
import { SideMenu } from './components/SideMenu';
import { MinimapOverlay } from './components/MinimapOverlay';
import { BottomHotbar } from './components/BottomHotbar';
import { ControlsHelp } from './components/ControlsHelp';

export function HUDOverlay(): React.ReactElement {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 p-6 flex flex-col justify-between overflow-hidden">
      
      {/* Top Row */}
      <div className="flex justify-between items-start">
        <PlayerProfile />
        <CompassBar />
        <TopRightStats />
      </div>

      {/* Middle Row */}
      <div className="flex justify-between items-start flex-1 -mt-16">
        <SideMenu />
        
        {/* Right side stack (Quest Tracker) */}
        <div className="flex flex-col items-end mt-24">
          <QuestTracker />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between items-end">
        <MinimapOverlay />
        <div className="mb-2">
          <BottomHotbar />
        </div>
        <ControlsHelp />
      </div>
      
    </div>
  );
}
