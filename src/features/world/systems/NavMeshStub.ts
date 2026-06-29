/**
 * @file src/features/world/systems/NavMeshStub.ts
 * @description Static navigation mesh path finder stub, laying groundwork for NPC path finding.
 */

export interface NavNode {
  id: string;
  position: { x: number; y: number; z: number };
  neighbors: string[];
}

class NavMeshStubClass {
  private readonly nodes = new Map<string, NavNode>();

  constructor() {
    this.generateDefaultGraph();
  }

  private generateDefaultGraph(): void {
    // Basic nodes centered around key zones
    this.addNode({
      id: 'spawn',
      position: { x: 0, y: 0, z: 0 },
      neighbors: ['ai', 'hack', 'hq', 'museum'],
    });
    this.addNode({ id: 'ai', position: { x: 400, y: 0, z: 0 }, neighbors: ['spawn', 'spaceport'] });
    this.addNode({ id: 'hack', position: { x: -400, y: 0, z: 0 }, neighbors: ['spawn'] });
    this.addNode({ id: 'hq', position: { x: 0, y: 0, z: 400 }, neighbors: ['spawn', 'spaceport'] });
    this.addNode({ id: 'museum', position: { x: 0, y: 0, z: -400 }, neighbors: ['spawn'] });
    this.addNode({ id: 'spaceport', position: { x: 400, y: 0, z: 400 }, neighbors: ['ai', 'hq'] });
  }

  private addNode(node: NavNode): void {
    this.nodes.set(node.id, node);
  }

  /**
   * Performs basic pathfinding between two zone nodes (BFS traversal)
   */
  findPath(startId: string, endId: string): { x: number; y: number; z: number }[] {
    const startNode = this.nodes.get(startId);
    const endNode = this.nodes.get(endId);
    if (!startNode || !endNode) return [];

    const queue: string[][] = [[startId]];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const path = queue.shift()!;
      const lastNodeId = path[path.length - 1]!;

      if (lastNodeId === endId) {
        return path
          .map((id) => this.nodes.get(id)?.position)
          .filter((pos): pos is { x: number; y: number; z: number } => !!pos);
      }

      if (!visited.has(lastNodeId)) {
        visited.add(lastNodeId);
        const node = this.nodes.get(lastNodeId);
        if (node) {
          node.neighbors.forEach((nId) => {
            queue.push([...path, nId]);
          });
        }
      }
    }

    return [];
  }
}

export const NavMeshStub = new NavMeshStubClass();
