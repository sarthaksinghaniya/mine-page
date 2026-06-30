/**
 * @file src/features/debug/components/CinematicDebug.tsx
 * @description Sequence timeline monitor panel toggled with F5 key.
 */

import React, { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { CinematicDirector } from '@core/cinematic/CinematicDirector';
import { MetricRow } from './MetricRow';

export function CinematicDebug(): React.ReactElement | null {
  const [visible, setVisible] = useState(false);
  const [activeName, setActiveName] = useState<string>('None');
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queueSize, setQueueSize] = useState(0);

  // Hook into F5 key to toggle debug panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F5') {
        e.preventDefault();
        setVisible((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); };
  }, []);

  useFrame((_, delta) => {
    // Drive the CinematicDirector timeline ticking
    CinematicDirector.update(delta);

    if (!visible) return;

    const seq = CinematicDirector.getActiveSequence();
    if (seq) {
      setActiveName(seq.name);
      setDuration(seq.duration);
      setElapsed(CinematicDirector.getElapsedTime());
    } else {
      setActiveName('None');
      setDuration(0);
      setElapsed(0);
    }
    setQueueSize(CinematicDirector.getQueue().length);
  });

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        width: '240px',
        backgroundColor: 'rgba(10, 10, 18, 0.85)',
        border: '1px solid rgba(128, 0, 255, 0.4)',
        padding: '12px',
        color: '#f0f0ff',
        fontFamily: 'monospace',
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          fontSize: '12px',
          borderBottom: '1px solid rgba(128, 0, 255, 0.2)',
          paddingBottom: '6px',
          marginBottom: '8px',
          color: '#b55dff',
          fontWeight: 'bold',
        }}
      >
        CINEMATIC SEQUENCER (F5)
      </div>
      <MetricRow label="Active Sequence" value={activeName} />
      <MetricRow label="Duration" value={`${duration.toFixed(1)}s`} />
      <MetricRow label="Elapsed" value={`${elapsed.toFixed(1)}s`} />
      <MetricRow label="Queue Size" value={queueSize} />
      <MetricRow label="Player Locked" value={CinematicDirector.isPlayerFrozen() ? 'Yes' : 'No'} />
      <MetricRow label="Letterbox" value={CinematicDirector.isLetterboxActive() ? 'Yes' : 'No'} />
    </div>
  );
}
export default CinematicDebug;
