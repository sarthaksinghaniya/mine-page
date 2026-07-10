import { useFrame } from '@react-three/fiber';
import { useGameplayStore } from '../gameplay.store';
import { usePlayerStore } from '@/features/player/player.store';
import { useWorldStore } from '@/features/world/world.store';
import { DISTRICTS_LIST } from '@/features/buildings/district.types';
import type { ZoneId } from '@/features/world/world.types';

export function QuestManager(): null {
  const visitDistrict = useGameplayStore((s) => s.visitDistrict);
  const playerPos = usePlayerStore((s) => s.position);
  const setFocusedZone = useWorldStore((s) => s.setFocusedZone);
  
  useFrame(() => {
    let closestDistrict: ZoneId | null = null;
    let minDistance = Infinity;

    for (const district of DISTRICTS_LIST) {
      for (const lot of district.lots) {
        const dx = playerPos.x - lot.position.x;
        const dz = playerPos.z - lot.position.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        
        if (dist < minDistance) {
          minDistance = dist;
          if (dist < 150) {
            closestDistrict = district.id as ZoneId;
          }
        }
      }
    }

    setFocusedZone(closestDistrict);
    
    if (closestDistrict) {
      visitDistrict(closestDistrict);
    }
  });
  return null;
}
