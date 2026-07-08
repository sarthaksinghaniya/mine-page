import { DistrictScene } from '@/features/world/components/DistrictScene';

export default function SkillsLabScene() {
  return (
    <DistrictScene id="skills-lab">
      {/* Server Racks */}
      <group position={[0, 3, 0]}>
        {([[-5, -5], [5, -5], [-5, 5], [5, 5]] as [number, number][]).map(([x, z], i) => (
          <mesh key={i} position={[x, 0, z]} castShadow>
            <boxGeometry args={[3, 6, 3]} />
            <meshStandardMaterial color="#1a1a24" roughness={0.6} metalness={0.5} />
          </mesh>
        ))}
      </group>

      {/* Circuit Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#00ff66" emissive="#00ff66" emissiveIntensity={0.2} wireframe />
      </mesh>
      
      {/* Lab Central Glow */}
      <pointLight position={[0, 5, 0]} color="#00ff66" intensity={2} distance={20} />
    </DistrictScene>
  );
}
