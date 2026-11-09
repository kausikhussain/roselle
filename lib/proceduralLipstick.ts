import * as THREE from "three";

export interface LipstickOptions {
  shadeHex?: string;
  finish?: "Velvet" | "Satin" | "Matte" | "Cream" | "Gloss";
  scale?: number;
}

export class ProceduralLipstick {
  public group: THREE.Group;
  public cap: THREE.Group;
  public baseCase: THREE.Mesh;
  public goldRing: THREE.Mesh;
  public innerSleeve: THREE.Mesh;
  public bullet: THREE.Mesh;
  public bulletMaterial: THREE.MeshPhysicalMaterial;
  public caseMaterial: THREE.MeshPhysicalMaterial;
  public goldMaterial: THREE.MeshPhysicalMaterial;

  private currentOpen = 0; // 0 = closed, 1 = fully lifted
  private currentTwist = 0; // 0 = retracted, 1 = fully raised

  constructor(options: LipstickOptions = {}) {
    const shadeHex = options.shadeHex || "#B21D3B";
    const finish = options.finish || "Velvet";

    this.group = new THREE.Group();

    // 1. Materials
    this.caseMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(shadeHex),
      roughness: 0.18,
      metalness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });

    this.goldMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xe5a995), // Rose gold
      roughness: 0.22,
      metalness: 0.92,
      reflectivity: 1.0,
      clearcoat: 0.3,
    });

    this.bulletMaterial = this.createBulletMaterial(shadeHex, finish);

    // 2. Base Case (lower body)
    // Height: 3.2, Radius: 0.8
    const baseGeom = new THREE.CylinderGeometry(0.8, 0.8, 3.2, 48);
    this.baseCase = new THREE.Mesh(baseGeom, this.caseMaterial);
    this.baseCase.position.y = 1.6;
    this.baseCase.castShadow = true;
    this.baseCase.receiveShadow = true;
    this.group.add(this.baseCase);

    // 2b. Solid zinc base trim ring
    const baseTrimGeom = new THREE.CylinderGeometry(0.82, 0.82, 0.25, 48);
    const baseTrim = new THREE.Mesh(baseTrimGeom, this.goldMaterial);
    baseTrim.position.y = 0.15;
    baseTrim.castShadow = true;
    this.group.add(baseTrim);

    // 3. Middle Rose Gold Ring (Collar)
    const ringGeom = new THREE.CylinderGeometry(0.81, 0.81, 0.5, 48);
    this.goldRing = new THREE.Mesh(ringGeom, this.goldMaterial);
    this.goldRing.position.y = 3.35;
    this.goldRing.castShadow = true;
    this.group.add(this.goldRing);

    // 4. Inner Mechanism / Swivel Sleeve
    const innerGeom = new THREE.CylinderGeometry(0.68, 0.68, 2.2, 48);
    this.innerSleeve = new THREE.Mesh(innerGeom, this.goldMaterial);
    this.innerSleeve.position.y = 4.2;
    this.group.add(this.innerSleeve);

    // 5. Lipstick Bullet
    // Ergonomic slanted teardrop bullet
    this.bullet = this.createBulletMesh();
    this.bullet.position.y = 4.0;
    this.bullet.castShadow = true;
    this.group.add(this.bullet);

    // 6. Removable Upper Cap (Group for lifting & tilting)
    this.cap = new THREE.Group();
    const capBodyGeom = new THREE.CylinderGeometry(0.82, 0.82, 3.4, 48);
    const capBody = new THREE.Mesh(capBodyGeom, this.caseMaterial);
    capBody.position.y = 1.7;
    capBody.castShadow = true;
    this.cap.add(capBody);

    // Cap inner rim gold detail
    const capRimGeom = new THREE.CylinderGeometry(0.83, 0.83, 0.15, 48);
    const capRim = new THREE.Mesh(capRimGeom, this.goldMaterial);
    capRim.position.y = 0.08;
    this.cap.add(capRim);

    // Position cap over the top of the base when closed
    this.cap.position.y = 3.45;
    this.group.add(this.cap);

    if (options.scale) {
      this.group.scale.setScalar(options.scale);
    }
  }

  private createBulletMaterial(
    hex: string,
    finish: "Velvet" | "Satin" | "Matte" | "Cream" | "Gloss"
  ): THREE.MeshPhysicalMaterial {
    const color = new THREE.Color(hex);
    switch (finish) {
      case "Velvet":
        return new THREE.MeshPhysicalMaterial({
          color,
          roughness: 0.65,
          metalness: 0.05,
          sheen: 1.0,
          sheenColor: new THREE.Color(0xffffff),
          sheenRoughness: 0.4,
          clearcoat: 0.1,
        });
      case "Matte":
        return new THREE.MeshPhysicalMaterial({
          color,
          roughness: 0.85,
          metalness: 0.0,
          sheen: 0.5,
          sheenColor: new THREE.Color(hex).offsetHSL(0, 0, 0.1),
        });
      case "Gloss":
        return new THREE.MeshPhysicalMaterial({
          color,
          roughness: 0.08,
          metalness: 0.1,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          reflectivity: 0.95,
          transmission: 0.15,
        });
      case "Cream":
        return new THREE.MeshPhysicalMaterial({
          color,
          roughness: 0.35,
          metalness: 0.08,
          clearcoat: 0.4,
          clearcoatRoughness: 0.2,
        });
      case "Satin":
      default:
        return new THREE.MeshPhysicalMaterial({
          color,
          roughness: 0.28,
          metalness: 0.1,
          clearcoat: 0.6,
          clearcoatRoughness: 0.15,
          reflectivity: 0.8,
        });
    }
  }

  private createBulletMesh(): THREE.Mesh {
    // Generate curved teardrop profile bullet geometry
    const radialSegments = 48;
    const heightSegments = 32;
    const radius = 0.62;
    const height = 1.9;

    const geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      height,
      radialSegments,
      heightSegments,
      false
    );

    // Deform vertices to create the iconic 30° slanted teardrop cut
    const position = geometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
      const y = position.getY(i);
      const x = position.getX(i);
      const z = position.getZ(i);

      if (y > 0.2) {
        // Slanted cut plane angle
        const slantCut = 0.55 * (z / radius);
        const newY = y - slantCut;
        if (newY > height * 0.45) {
          position.setY(i, height * 0.45 - (slantCut * 0.3));
          position.setX(i, x * 0.92);
          position.setZ(i, z * 0.92);
        }
      }
    }
    geometry.computeVertexNormals();

    const mesh = new THREE.Mesh(geometry, this.bulletMaterial);
    return mesh;
  }

  public setShade(hex: string, finish: "Velvet" | "Satin" | "Matte" | "Cream" | "Gloss" = "Velvet") {
    this.caseMaterial.color.set(hex);
    this.bulletMaterial.dispose();
    this.bulletMaterial = this.createBulletMaterial(hex, finish);
    this.bullet.material = this.bulletMaterial;
  }

  // open: 0 = closed, 1 = floating high above
  public setOpen(amount: number) {
    this.currentOpen = THREE.MathUtils.clamp(amount, 0, 1);
    // Cap lifts from y=3.45 to y=6.2, and tilts slightly
    this.cap.position.y = 3.45 + this.currentOpen * 2.8;
    this.cap.rotation.z = this.currentOpen * 0.12;
    this.cap.rotation.x = this.currentOpen * 0.08;
  }

  // twist: 0 = retracted inside, 1 = raised out
  public setTwist(amount: number) {
    this.currentTwist = THREE.MathUtils.clamp(amount, 0, 1);
    // Bullet rises from y=3.2 to y=4.4, rotating as it swivels up
    this.bullet.position.y = 3.2 + this.currentTwist * 1.2;
    this.bullet.rotation.y = this.currentTwist * Math.PI * 1.5;
  }

  public getOpen() {
    return this.currentOpen;
  }

  public getTwist() {
    return this.currentTwist;
  }

  public dispose() {
    this.caseMaterial.dispose();
    this.goldMaterial.dispose();
    this.bulletMaterial.dispose();
    this.group.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
      }
    });
  }
}
