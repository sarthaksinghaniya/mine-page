/**
 * @file src/features/world/systems/RoadNetwork.ts
 * @description Coordinates intersection nodes, sidewalk paths, and waypoint systems.
 */

export interface RoadIntersection {
  id: string;
  position: { x: number; y: number; z: number };
  type: 'cross' | 't-junction' | 'dead-end';
}

export interface RoadSegment {
  id: string;
  fromNode: string;
  toNode: string;
  lanes: number;
  sidewalk: boolean;
}

class RoadNetworkClass {
  private readonly intersections = new Map<string, RoadIntersection>();
  private readonly segments: RoadSegment[] = [];

  constructor() {
    this.generateNetworkGrid();
  }

  private generateNetworkGrid(): void {
    // Generate intersection nodes for the six districts
    this.addIntersection({ id: 'spawn-plaza-node', position: { x: 0, y: 0, z: 0 }, type: 'cross' });
    this.addIntersection({
      id: 'ai-district-node',
      position: { x: 400, y: 0, z: 0 },
      type: 't-junction',
    });
    this.addIntersection({
      id: 'hackathon-node',
      position: { x: -400, y: 0, z: 0 },
      type: 'dead-end',
    });
    this.addIntersection({
      id: 'tech-hq-node',
      position: { x: 0, y: 0, z: 400 },
      type: 't-junction',
    });
    this.addIntersection({
      id: 'museum-node',
      position: { x: 0, y: 0, z: -400 },
      type: 'dead-end',
    });
    this.addIntersection({
      id: 'spaceport-node',
      position: { x: 400, y: 0, z: 400 },
      type: 'cross',
    });

    // Link nodes together with segments (lanes/sidewalks)
    this.addSegment('seg-spawn-to-ai', 'spawn-plaza-node', 'ai-district-node', 2, true);
    this.addSegment('seg-spawn-to-hack', 'spawn-plaza-node', 'hackathon-node', 2, true);
    this.addSegment('seg-spawn-to-hq', 'spawn-plaza-node', 'tech-hq-node', 4, true);
    this.addSegment('seg-spawn-to-museum', 'spawn-plaza-node', 'museum-node', 2, true);
    this.addSegment('seg-ai-to-spaceport', 'ai-district-node', 'spaceport-node', 2, false);
    this.addSegment('seg-hq-to-spaceport', 'tech-hq-node', 'spaceport-node', 2, true);
  }

  private addIntersection(node: RoadIntersection): void {
    this.intersections.set(node.id, node);
  }

  private addSegment(id: string, from: string, to: string, lanes: number, sidewalk: boolean): void {
    this.segments.push({ id, fromNode: from, toNode: to, lanes, sidewalk });
  }

  getIntersections(): RoadIntersection[] {
    return Array.from(this.intersections.values());
  }

  getSegments(): RoadSegment[] {
    return [...this.segments];
  }

  /**
   * Resolves waypoint sequences for a vehicle driving between two intersections.
   */
  getWaypoints(fromId: string, toId: string): { x: number; y: number; z: number }[] {
    const from = this.intersections.get(fromId);
    const to = this.intersections.get(toId);
    if (!from || !to) return [];

    // Yields simple linear segment interpolation paths
    return [
      { x: from.position.x, y: 0.1, z: from.position.z },
      {
        x: (from.position.x + to.position.x) / 2,
        y: 0.1,
        z: (from.position.z + to.position.z) / 2,
      },
      { x: to.position.x, y: 0.1, z: to.position.z },
    ];
  }
}

export const RoadNetwork = new RoadNetworkClass();
