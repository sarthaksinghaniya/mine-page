import { useFrame } from '@react-three/fiber';
import { useGameplayStore } from '../gameplay.store';
import { usePlayerStore } from '@/features/player/player.store';
import { DISTRICTS_LIST } from '@/features/buildings/district.types';

export function QuestManager(): null {
  const visitDistrict = useGameplayStore((s) => s.visitDistrict);
  const playerPos = usePlayerStore((s) => s.position);
  
  useFrame(() => {
    for (const district of DISTRICTS_LIST) {
      for (const lot of district.lots) {
        const dx = playerPos.x - lot.position.x;
        const dz = playerPos.z - lot.position.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        // If within 150 units of any building in the district, count as visited
        if (dist < 150) {
          visitDistrict(district.id);
          break;
        }
      }
    }
  });
  return null;
}
