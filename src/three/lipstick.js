import * as THREE from 'three';

/**
 * Procedural Luxury 3D Lipstick
 * Engineered with lathed profiles, physical clearcoat materials,
 * dynamic cap opening, bullet twisting, and shade switching.
 */
export function createLipstick(options = {}) {
  const group = new THREE.Group();

  const caseColor = options.caseColor || 0x2E040B; // Deep Roselle Wine Lacquer
  const goldColor = options.goldColor || 0xE8AC97; // Spun Rose Gold
  const initialShade = options.shadeColor || 0xB21D3B; // Default Cherry Kiss

  // Materials
  const lacquerMaterial = new THREE.MeshPhysicalMaterial({
    color: caseColor,
    roughness: 0.12,
    metalness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    reflectivity: 0.9
  });

  const roseGoldMaterial = new THREE.MeshPhysicalMaterial({
    color: goldColor,
    roughness: 0.18,
    metalness: 0.95,
    clearcoat: 0.3,
    reflectivity: 1.0
  });

  const innerGoldMaterial = new THREE.MeshStandardMaterial({
    color: 0xF3C29D,
    roughness: 0.25,
    metalness: 0.9
  });

  const bulletMaterial = new THREE.MeshPhysicalMaterial({
    color: initialShade,
    roughness: 0.48,
    metalness: 0.05,
    clearcoat: 0.3,
    clearcoatRoughness: 0.2,
    sheen: 0.8,
    sheenColor: new THREE.Color(initialShade).multiplyScalar(1.2)
  });

  // Dimensions
  const baseRadius = 0.55;
  const baseHeight = 1.35;
  const ringHeight = 0.22;
  const sleeveHeight = 0.95;
  const bulletRadius = 0.38;
  const bulletHeight = 1.25;
  const capHeight = 2.1;

  // 1. Lower Case Body
  const caseGeo = new THREE.CylinderGeometry(baseRadius, baseRadius * 0.98, baseHeight, 48, 1);
  const caseMesh = new THREE.Mesh(caseGeo, lacquerMaterial);
  caseMesh.position.y = baseHeight / 2;
  caseMesh.castShadow = true;
  caseMesh.receiveShadow = true;
  group.add(caseMesh);

  // Case bottom trim ring
  const baseTrimGeo = new THREE.CylinderGeometry(baseRadius * 0.99, baseRadius * 0.98, 0.08, 48);
  const baseTrim = new THREE.Mesh(baseTrimGeo, roseGoldMaterial);
  baseTrim.position.y = 0.04;
  group.add(baseTrim);

  // 2. Middle Rose Gold Accent Band
  const ringGeo = new THREE.CylinderGeometry(baseRadius * 0.96, baseRadius * 0.97, ringHeight, 48);
  const ringMesh = new THREE.Mesh(ringGeo, roseGoldMaterial);
  ringMesh.position.y = baseHeight + ringHeight / 2;
  ringMesh.castShadow = true;
  group.add(ringMesh);

  // 3. Inner Mechanism Sleeve
  const sleeveGeo = new THREE.CylinderGeometry(bulletRadius * 1.12, bulletRadius * 1.12, sleeveHeight, 48, 1, true);
  const sleeveMesh = new THREE.Mesh(sleeveGeo, innerGoldMaterial);
  sleeveMesh.position.y = baseHeight + ringHeight + sleeveHeight / 2 - 0.1;
  group.add(sleeveMesh);

  // 4. Lipstick Bullet (Angled 30° teardrop cut geometry)
  const bulletGroup = new THREE.Group();
  bulletGroup.position.y = baseHeight + ringHeight;

  // Procedural bullet profile
  const bulletSegments = 48;
  const bulletGeo = new THREE.CylinderGeometry(bulletRadius, bulletRadius, bulletHeight, bulletSegments, 32);
  
  // Cut top of bullet at 30 degree angle to form iconic ergonomic teardrop facet
  const posAttr = bulletGeo.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const y = posAttr.getY(i);
    const z = posAttr.getZ(i);
    const x = posAttr.getX(i);

    // If near the top
    if (y > bulletHeight * 0.15) {
      // Slant cut along Z-axis
      const cutPlane = (z / bulletRadius) * 0.45;
      if (y > bulletHeight * 0.25 + cutPlane) {
        const factor = (y - (bulletHeight * 0.25 + cutPlane)) * 0.4;
        posAttr.setY(i, y - factor);
        // Taper tip slightly
        posAttr.setX(i, x * (1 - factor * 0.3));
        posAttr.setZ(i, z * (1 - factor * 0.2));
      }
    }
  }
  bulletGeo.computeVertexNormals();

  const bulletMesh = new THREE.Mesh(bulletGeo, bulletMaterial);
  bulletMesh.position.y = bulletHeight / 2;
  bulletMesh.castShadow = true;
  bulletMesh.receiveShadow = true;
  bulletGroup.add(bulletMesh);

  // Bullet holder collar
  const bulletCollarGeo = new THREE.CylinderGeometry(bulletRadius * 1.05, bulletRadius * 1.05, 0.2, 48);
  const bulletCollar = new THREE.Mesh(bulletCollarGeo, roseGoldMaterial);
  bulletCollar.position.y = 0.1;
  bulletGroup.add(bulletCollar);

  group.add(bulletGroup);

  // 5. Cap Assembly
  const capGroup = new THREE.Group();
  capGroup.position.y = baseHeight + ringHeight;

  const capGeo = new THREE.CylinderGeometry(baseRadius * 0.99, baseRadius * 0.97, capHeight, 48);
  const capMesh = new THREE.Mesh(capGeo, lacquerMaterial);
  capMesh.position.y = capHeight / 2;
  capMesh.castShadow = true;
  capMesh.receiveShadow = true;
  capGroup.add(capMesh);

  // Cap top rose gold dome inlay
  const capTopGeo = new THREE.CylinderGeometry(baseRadius * 0.96, baseRadius * 0.98, 0.08, 48);
  const capTopMesh = new THREE.Mesh(capTopGeo, roseGoldMaterial);
  capTopMesh.position.y = capHeight;
  capGroup.add(capTopMesh);

  // Cap bottom rim
  const capRimGeo = new THREE.CylinderGeometry(baseRadius * 0.97, baseRadius * 0.96, 0.06, 48);
  const capRimMesh = new THREE.Mesh(capRimGeo, roseGoldMaterial);
  capRimMesh.position.y = 0.03;
  capGroup.add(capRimMesh);

  group.add(capGroup);

  // State variables
  let openProgress = 0; // 0 (closed) -> 1 (open lifted)
  let twistProgress = 0; // 0 (retracted) -> 1 (raised out)

  function update() {
    // Cap open animation: lifts straight up, tilts slightly outwards
    const capMaxLift = 3.6;
    capGroup.position.y = (baseHeight + ringHeight) + openProgress * capMaxLift;
    capGroup.rotation.z = -openProgress * 0.22;
    capGroup.rotation.x = openProgress * 0.12;
    capGroup.position.x = -openProgress * 0.8;

    // Bullet twist animation: rises up and twists
    const bulletMaxTravel = 0.75;
    bulletGroup.position.y = (baseHeight + ringHeight - 0.6) + twistProgress * bulletMaxTravel;
    bulletGroup.rotation.y = twistProgress * Math.PI * 1.5;
  }

  // Set initial state
  update();

  return {
    group,
    setOpen(val) {
      openProgress = Math.max(0, Math.min(1, val));
      update();
    },
    setTwist(val) {
      twistProgress = Math.max(0, Math.min(1, val));
      update();
    },
    setColor(colorHexOrNumber, finish = 'Velvet') {
      const col = new THREE.Color(colorHexOrNumber);
      bulletMaterial.color = col;
      bulletMaterial.sheenColor = col.clone().multiplyScalar(1.2);

      // Adjust finish characteristics
      if (finish === 'Gloss') {
        bulletMaterial.roughness = 0.12;
        bulletMaterial.clearcoat = 1.0;
        bulletMaterial.clearcoatRoughness = 0.05;
      } else if (finish === 'Matte') {
        bulletMaterial.roughness = 0.75;
        bulletMaterial.clearcoat = 0.05;
      } else if (finish === 'Satin') {
        bulletMaterial.roughness = 0.35;
        bulletMaterial.clearcoat = 0.4;
      } else if (finish === 'Cream') {
        bulletMaterial.roughness = 0.4;
        bulletMaterial.clearcoat = 0.5;
      } else { // Velvet
        bulletMaterial.roughness = 0.52;
        bulletMaterial.clearcoat = 0.25;
      }
    },
    getOpen() { return openProgress; },
    getTwist() { return twistProgress; }
  };
}

