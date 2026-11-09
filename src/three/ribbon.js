import * as THREE from 'three';

/**
 * Procedural Glossy S-Curve Ribbon
 * Built as an extruded flattened spiral curve with dynamic drawRange
 * allowing it to gracefully "pour" from top down as scrubbed by scroll.
 */
export function createRibbon() {
  const group = new THREE.Group();

  // Create an S-shaped 3D helical spiral curve
  const points = [];
  const totalPoints = 320;
  const turns = 2.8;
  const height = 9.0;
  const radius = 1.85;

  for (let i = 0; i <= totalPoints; i++) {
    const t = i / totalPoints;
    const angle = t * Math.PI * 2 * turns;
    const currentRadius = radius * (1 + 0.35 * Math.sin(t * Math.PI));
    const x = Math.cos(angle) * currentRadius;
    const z = Math.sin(angle) * currentRadius * 0.95;
    const y = (0.5 - t) * height;
    points.push(new THREE.Vector3(x, y, z));
  }

  const curve = new THREE.CatmullRomCurve3(points);
  const tubularSegments = 400;
  const tubeRadius = 0.28;
  const radialSegments = 16;
  const closed = false;

  const tubeGeo = new THREE.TubeGeometry(curve, tubularSegments, tubeRadius, radialSegments, closed);

  // Flatten the tube vertices into an ultra-luxurious silky satin ribbon band
  const pos = tubeGeo.attributes.position;
  const normal = tubeGeo.attributes.normal;
  for (let i = 0; i < pos.count; i++) {
    // Compress along Y/orthogonal to give tape profile
    const nx = normal.getX(i);
    const ny = normal.getY(i);
    const nz = normal.getZ(i);
    pos.setX(i, pos.getX(i) + nx * 0.08);
    pos.setY(i, pos.getY(i) * 0.98 + ny * 0.02);
    pos.setZ(i, pos.getZ(i) + nz * 0.08);
  }
  tubeGeo.computeVertexNormals();

  // Material: Luscious Carmine / Ruby Silk Ribbon
  const ribbonMat = new THREE.MeshPhysicalMaterial({
    color: 0x930D25,
    roughness: 0.22,
    metalness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    side: THREE.DoubleSide,
    reflectivity: 0.9,
    sheen: 0.9,
    sheenColor: 0xDD3355
  });

  const ribbonMesh = new THREE.Mesh(tubeGeo, ribbonMat);
  group.add(ribbonMesh);

  // Total indices in geometry
  const indexCount = tubeGeo.index ? tubeGeo.index.count : 0;
  tubeGeo.setDrawRange(0, 0); // Initially hidden

  let currentProgress = 0;

  return {
    group,
    mesh: ribbonMesh,
    setProgress(val) {
      currentProgress = Math.max(0, Math.min(1, val));
      const drawCount = Math.floor(currentProgress * indexCount);
      tubeGeo.setDrawRange(0, drawCount);
      ribbonMesh.rotation.y = currentProgress * Math.PI * 0.6;
    },
    getProgress() {
      return currentProgress;
    },
    dispose() {
      tubeGeo.dispose();
      ribbonMat.dispose();
    }
  };
}

