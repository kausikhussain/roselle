import * as THREE from 'three';

/**
 * Procedural Instanced Rose Petal Swarm
 * 120 velvet petals orbiting in dynamic vortex trajectories.
 */
export function createPetalStorm(count = 120) {
  const group = new THREE.Group();

  // Create curved petal geometry
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.15, 0.25, 0.25, 0.55, 0, 0.85);
  shape.bezierCurveTo(-0.25, 0.55, -0.15, 0.25, 0, 0);

  const extrudeSettings = {
    steps: 1,
    depth: 0.02,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 3
  };

  const petalGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  // Curve the petal
  const pos = petalGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const z = pos.getZ(i);
    pos.setZ(i, z + Math.sin(y * Math.PI) * 0.08);
  }
  petalGeo.computeVertexNormals();
  petalGeo.scale(0.85, 0.85, 0.85);

  const petalMat = new THREE.MeshPhysicalMaterial({
    color: 0x930D25,
    roughness: 0.45,
    metalness: 0.05,
    clearcoat: 0.25,
    sheen: 0.7,
    sheenColor: 0xDD2A4A,
    side: THREE.DoubleSide
  });

  const instancedMesh = new THREE.InstancedMesh(petalGeo, petalMat, count);
  instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  group.add(instancedMesh);

  // Store individual petal orbits
  const dummy = new THREE.Object3D();
  const petalData = [];

  for (let i = 0; i < count; i++) {
    petalData.push({
      baseRadius: 1.5 + Math.random() * 2.2,
      baseY: (Math.random() - 0.5) * 8.0,
      angle: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.8,
      spinX: Math.random() * Math.PI * 2,
      spinY: Math.random() * Math.PI * 2,
      spinZ: Math.random() * Math.PI * 2,
      rotSpeedX: (Math.random() - 0.5) * 2,
      rotSpeedY: (Math.random() - 0.5) * 3,
      scale: 0.5 + Math.random() * 0.7
    });
  }

  let intensity = 1;

  function update(time = 0) {
    for (let i = 0; i < count; i++) {
      const p = petalData[i];
      const theta = p.angle + time * p.speed * intensity;
      const r = p.baseRadius * (0.8 + 0.3 * Math.sin(time + i));
      const y = ((p.baseY + time * 0.5 * intensity + 4) % 8) - 4;

      dummy.position.set(
        Math.cos(theta) * r,
        y,
        Math.sin(theta) * r
      );

      dummy.rotation.set(
        p.spinX + time * p.rotSpeedX,
        p.spinY + time * p.rotSpeedY,
        p.spinZ + theta
      );

      const s = p.scale * Math.min(1, intensity * 1.5);
      dummy.scale.set(s, s, s);

      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
    }
    instancedMesh.instanceMatrix.needsUpdate = true;
  }

  return {
    group,
    update,
    setIntensity(val) {
      intensity = Math.max(0, Math.min(2, val));
    },
    setVisible(v) {
      group.visible = v;
    }
  };
}

