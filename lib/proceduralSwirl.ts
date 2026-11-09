import * as THREE from "three";

export class ProceduralRibbonSwirl {
  public group: THREE.Group;
  public ribbonMesh: THREE.Mesh;
  public ribbonGeometry: THREE.BufferGeometry;
  public ribbonMaterial: THREE.MeshPhysicalMaterial;
  public petals: THREE.InstancedMesh;
  private petalCount = 140;
  private petalData: {
    orbitRadius: number;
    angle: number;
    speed: number;
    yBase: number;
    verticalDrift: number;
    rotationSpeed: THREE.Vector3;
    currentRotation: THREE.Euler;
    scale: number;
  }[] = [];

  private totalRibbonIndices = 0;

  constructor() {
    this.group = new THREE.Group();

    // 1. Create S-Curve Spiral Spline Path for the Ribbon
    const points: THREE.Vector3[] = [];
    const turns = 2.4;
    const height = 9.0;
    const sampleCount = 180;

    for (let i = 0; i <= sampleCount; i++) {
      const t = i / sampleCount;
      const angle = t * Math.PI * 2 * turns;
      // Variable radius creating an elegant hourglass flare
      const radius = 1.8 + Math.sin(t * Math.PI) * 0.9;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const y = (0.5 - t) * height;
      points.push(new THREE.Vector3(x, y, z));
    }

    const curve = new THREE.CatmullRomCurve3(points);

    // 2. Generate Ribbon Geometry
    const tubularSegments = 240;
    const radialSegments = 8;
    const tubeRadius = 0.35;
    const rawTube = new THREE.TubeGeometry(curve, tubularSegments, tubeRadius, radialSegments, false);

    // Flatten vertices along normal to create flat silk tape / ribbon profile
    const pos = rawTube.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      // Squash radial thickness
      pos.setX(i, x * 1.05);
      pos.setZ(i, z * 1.05);
    }
    rawTube.computeVertexNormals();

    this.ribbonGeometry = rawTube;
    this.totalRibbonIndices = this.ribbonGeometry.index
      ? this.ribbonGeometry.index.count
      : pos.count;

    this.ribbonMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xb21d3b), // Crimson silk
      emissive: new THREE.Color(0x38040a),
      roughness: 0.15,
      metalness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.9,
      side: THREE.DoubleSide,
    });

    this.ribbonMesh = new THREE.Mesh(this.ribbonGeometry, this.ribbonMaterial);
    this.ribbonMesh.castShadow = true;
    this.group.add(this.ribbonMesh);

    // Start with ribbon hidden (drawRange 0)
    this.ribbonGeometry.setDrawRange(0, 0);

    // 3. Create Instanced Rose Petals
    const petalGeom = this.createPetalGeometry();
    const petalMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xd95b72),
      roughness: 0.5,
      metalness: 0.05,
      sheen: 0.8,
      sheenColor: new THREE.Color(0xffffff),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });

    this.petals = new THREE.InstancedMesh(petalGeom, petalMat, this.petalCount);
    this.petals.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    // Initialize random petal orbit data
    const dummy = new THREE.Object3D();
    for (let i = 0; i < this.petalCount; i++) {
      const orbitRadius = 1.2 + Math.random() * 3.5;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.4 + Math.random() * 0.8;
      const yBase = (Math.random() - 0.5) * 8.0;
      const verticalDrift = 0.5 + Math.random() * 1.0;
      const scale = 0.18 + Math.random() * 0.22;

      this.petalData.push({
        orbitRadius,
        angle,
        speed,
        yBase,
        verticalDrift,
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ),
        currentRotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
        scale,
      });

      dummy.position.set(
        Math.cos(angle) * orbitRadius,
        yBase,
        Math.sin(angle) * orbitRadius
      );
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      this.petals.setMatrixAt(i, dummy.matrix);
    }
    this.petals.instanceMatrix.needsUpdate = true;
    this.group.add(this.petals);
  }

  private createPetalGeometry(): THREE.BufferGeometry {
    // Curved teardrop petal mesh
    const geom = new THREE.PlaneGeometry(0.8, 1.2, 8, 8);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Curl petal edges
      const curve = (x * x + y * y) * 0.35;
      pos.setZ(i, curve);
    }
    geom.computeVertexNormals();
    return geom;
  }

  // Set ribbon reveal progress (0 = hidden, 1 = fully poured)
  public setProgress(progress: number) {
    const clamped = THREE.MathUtils.clamp(progress, 0, 1);
    const count = Math.floor(this.totalRibbonIndices * clamped);
    this.ribbonGeometry.setDrawRange(0, count);
  }

  // Update petal vortex in animation loop
  public update(delta: number, intensity = 1.0) {
    const dummy = new THREE.Object3D();

    for (let i = 0; i < this.petalCount; i++) {
      const p = this.petalData[i];
      p.angle += p.speed * delta * intensity;
      p.currentRotation.x += p.rotationSpeed.x * delta;
      p.currentRotation.y += p.rotationSpeed.y * delta;
      p.currentRotation.z += p.rotationSpeed.z * delta;

      // Gentle vertical sine drift
      const currentY = p.yBase + Math.sin(p.angle * 2) * p.verticalDrift;
      const currentX = Math.cos(p.angle) * p.orbitRadius;
      const currentZ = Math.sin(p.angle) * p.orbitRadius;

      dummy.position.set(currentX, currentY, currentZ);
      dummy.rotation.copy(p.currentRotation);
      dummy.scale.setScalar(p.scale * intensity);
      dummy.updateMatrix();

      this.petals.setMatrixAt(i, dummy.matrix);
    }

    this.petals.instanceMatrix.needsUpdate = true;
  }

  public dispose() {
    this.ribbonGeometry.dispose();
    this.ribbonMaterial.dispose();
    this.petals.geometry.dispose();
    if (Array.isArray(this.petals.material)) {
      this.petals.material.forEach((m) => m.dispose());
    } else {
      this.petals.material.dispose();
    }
  }
}
