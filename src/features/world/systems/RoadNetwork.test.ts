/**
 * @file src/features/world/systems/RoadNetwork.test.ts
 * @description Unit tests for road networks and waypoint interpolation.
 */

import { describe, it, expect } from 'vitest';
import { RoadNetwork } from './RoadNetwork';

describe('RoadNetwork', () => {
  it('correctly maps 6 intersection nodes', () => {
    const nodes = RoadNetwork.getIntersections();
    expect(nodes.length).toBe(6);
  });

  it('correctly returns waypoints between nodes', () => {
    const waypoints = RoadNetwork.getWaypoints('spawn-plaza-node', 'tech-hq-node');
    expect(waypoints.length).toBe(3);
    expect(waypoints[0]?.x).toBe(0);
    expect(waypoints[2]?.z).toBe(400); // tech-hq position Z coordinate
  });
});
