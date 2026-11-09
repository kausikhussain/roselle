import * as THREE from "three";

/**
 * Procedural Luxury Studio HDRI Environment Generator
 * Generates an ultra-soft photographic studio lighting environment for Three.js
 * without requiring multi-megabyte .hdr file downloads.
 */
export function createStudioEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x1a0205); // Deep ambient wine

  // 1. Overhead Main Diffused Softbox (Warm Cream)
  const ceilingBox = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 12),
    new THREE.MeshBasicMaterial({ color: 0xfff6ed, side: THREE.DoubleSide })
  );
  ceilingBox.position.set(0, 8, 2);
  ceilingBox.rotation.x = Math.PI / 2;
  envScene.add(ceilingBox);

  // 2. Key Studio Light Panel (Right High)
  const keySoftbox = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 14),
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
  );
  keySoftbox.position.set(7, 3, 4);
  keySoftbox.rotation.y = -Math.PI / 3;
  envScene.add(keySoftbox);

  // 3. Fill Rose-Gold Light Strip (Left)
  const fillSoftbox = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 16),
    new THREE.MeshBasicMaterial({ color: 0xe5a995, side: THREE.DoubleSide })
  );
  fillSoftbox.position.set(-8, 2, -2);
  fillSoftbox.rotation.y = Math.PI / 3;
  envScene.add(fillSoftbox);

  // 4. Rim Backlight (Cool White Accent)
  const rimLight = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 8),
    new THREE.MeshBasicMaterial({ color: 0xffeedd, side: THREE.DoubleSide })
  );
  rimLight.position.set(0, 4, -8);
  envScene.add(rimLight);

  // 5. Floor Reflection Plane (Rich Velvet Wine)
  const floorPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshBasicMaterial({ color: 0x30040a, side: THREE.DoubleSide })
  );
  floorPlane.position.set(0, -6, 0);
  floorPlane.rotation.x = -Math.PI / 2;
  envScene.add(floorPlane);

  const renderTarget = pmremGenerator.fromScene(envScene, 0.04);

  // Clean up temporary environment scene geometries
  ceilingBox.geometry.dispose();
  keySoftbox.geometry.dispose();
  fillSoftbox.geometry.dispose();
  rimLight.geometry.dispose();
  floorPlane.geometry.dispose();
  pmremGenerator.dispose();

  return renderTarget.texture;
}

