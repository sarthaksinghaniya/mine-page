/**
 * @file src/ui/menus/MainMenu.tsx
 * @description Main menu placeholder component.
 */

import React from 'react';

export function MainMenu(): React.ReactElement {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#050508',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 30,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: '#00adc0', margin: '0 0 16px 0' }}>MAIN MENU</h1>
      </div>
    </div>
  );
}
