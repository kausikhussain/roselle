import * as THREE from 'three';
import { createLipstick } from './lipstick.js';
import { createRibbon } from './ribbon.js';
import { createPetalStorm } from './petals.js';
import { SHADES } from '../data/shades.js';

export function initThreeScene(canvas) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x130206); // Deepest Roselle Noir Red

  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.2, 7.5);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Studio Lighting
  const ambientLight = new THREE.AmbientLight(0xFFE8E5, 0.9);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xFFF3EB, 2.2);
  keyLight.position.set(4, 8, 5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 2048;
  keyLight.shadow.mapSize.height = 2048;
  keyLight.shadow.bias = -0.0001;
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xE59EAE, 1.6);
  fillLight.position.set(-5, 4, 3);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xE0A38D, 2.0);
  rimLight.position.set(0, 6, -6);
  scene.add(rimLight);

  // Pedestal Studio Floor
  const floorGeo = new THREE.PlaneGeometry(30, 30);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x180308,
    roughness: 0.35,
    metalness: 0.1
  });
  const floorMesh = new THREE.Mesh(floorGeo, floorMat);
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.y = -1.5;
  floorMesh.receiveShadow = true;
  scene.add(floorMesh);

  // Pedestal Stacks (for Sale Hero)
  const pedestalGroup = new THREE.Group();
  const pedMat = new THREE.MeshStandardMaterial({
    color: 0x30060E,
    roughness: 0.3,
    metalness: 0.2
  });
  const goldTrimMat = new THREE.MeshStandardMaterial({
    color: 0xE8AC97,
    roughness: 0.2,
    metalness: 0.9
  });

  const pedBase = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.5, 0.6, 64), pedMat);
  pedBase.position.y = -1.2;
  pedBase.receiveShadow = true;
  pedestalGroup.add(pedBase);

  const pedMid = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.7, 0.5, 64), pedMat);
  pedMid.position.y = -0.65;
  pedMid.receiveShadow = true;
  pedestalGroup.add(pedMid);

  const pedTop = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.05, 0.4, 64), pedMat);
  pedTop.position.y = -0.2;
  pedTop.receiveShadow = true;
  pedestalGroup.add(pedTop);

  const pedRing = new THREE.Mesh(new THREE.CylinderGeometry(1.06, 1.06, 0.04, 64), goldTrimMat);
  pedRing.position.y = 0.0;
  pedestalGroup.add(pedRing);

  scene.add(pedestalGroup);

  // Main Hero Lipstick
  const heroLipstick = createLipstick({
    shadeColor: SHADES[0].threeColor
  });
  heroLipstick.group.position.set(0, 0, 0);
  scene.add(heroLipstick.group);

  // Fanned Side Lipsticks for Sale Hero
  const fannedLipsticks = [];
  const fanCount = 6;
  for (let i = 0; i < fanCount; i++) {
    const isLeft = i < 3;
    const offset = (i % 3) + 1;
    const xDist = (isLeft ? -1 : 1) * (1.1 + offset * 0.75);
    const zDist = -0.5 - offset * 0.45;
    const rotZ = (isLeft ? 1 : -1) * (0.08 + offset * 0.05);

    const shadeIndex = (i + 1) % SHADES.length;
    const stick = createLipstick({
      shadeColor: SHADES[shadeIndex].threeColor
    });
    stick.group.position.set(xDist, -0.2 - offset * 0.1, zDist);
    stick.group.rotation.set(0.1, (isLeft ? 0.35 : -0.35) * offset, rotZ);
    stick.setOpen(0);
    stick.setTwist(0);
    scene.add(stick.group);
    fannedLipsticks.push(stick);
  }

  // Rose Gold Arch (Frame for Chapter section)
  const archGroup = new THREE.Group();
  const archShape = new THREE.TorusGeometry(2.3, 0.04, 24, 80, Math.PI);
  const archMesh = new THREE.Mesh(archShape, goldTrimMat);
  archMesh.position.set(-1.4, 0.8, -0.4);
  archMesh.rotation.z = 0;
  archGroup.add(archMesh);

  // Inner halo glow light
  const archLight = new THREE.PointLight(0xF2B9A6, 1.5, 6);
  archLight.position.set(-1.4, 2.0, -0.2);
  archGroup.add(archLight);
  archGroup.visible = false;
  scene.add(archGroup);

  // Floating Formula Ingredient Nodes (Chapter 3)
  const formulaGroup = new THREE.Group();
  const ingredientData = [
    { name: 'Rosehip', color: 0xF24E1E, pos: [-1.2, 2.2, 0.6], radius: 0.18 },
    { name: 'Pigment', color: 0x930D25, pos: [0.8, 1.8, 0.8], radius: 0.22 },
    { name: 'Shea', color: 0xFFEDD5, pos: [-0.9, 0.4, 0.7], radius: 0.16 }
  ];

  const ingredientMeshes = [];
  ingredientData.forEach((ing) => {
    const orbGeo = new THREE.SphereGeometry(ing.radius, 32, 32);
    const orbMat = new THREE.MeshPhysicalMaterial({
      color: ing.color,
      roughness: 0.15,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transmission: 0.4,
      ior: 1.45
    });
    const mesh = new THREE.Mesh(orbGeo, orbMat);
    mesh.position.set(ing.pos[0], ing.pos[1], ing.pos[2]);

    // Ring around ingredient
    const ringGeo = new THREE.TorusGeometry(ing.radius * 1.6, 0.012, 16, 48);
    const ringMesh = new THREE.Mesh(ringGeo, goldTrimMat);
    ringMesh.rotation.x = Math.PI / 3;
    mesh.add(ringMesh);

    formulaGroup.add(mesh);
    ingredientMeshes.push(mesh);
  });
  formulaGroup.visible = false;
  scene.add(formulaGroup);

  // Ribbon Swirl & Petal Storm
  const ribbon = createRibbon();
  ribbon.group.position.set(0, 0.5, 0);
  ribbon.group.visible = false;
  scene.add(ribbon.group);

  const petalStorm = createPetalStorm(100);
  petalStorm.group.visible = false;
  scene.add(petalStorm.group);

  // Scene state scrub variables
  const sceneState = {
    section: 'hero', // 'hero', 'chapters', 'swirl', 'hidden'
    heroFanOut: 1,
    chapterIndex: 0,
    chapterProgress: 0,
    swirlProgress: 0,
    activeShadeIndex: 0
  };

  // Resize handler
  function handleResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
  window.addEventListener('resize', handleResize);

  // Project 3D vector to 2D screen percentage (for hotspot lines)
  const projVec = new THREE.Vector3();
  function projectToScreen(x, y, z) {
    projVec.set(x, y, z);
    // Apply hero lipstick transform
    projVec.applyMatrix4(heroLipstick.group.matrixWorld);
    projVec.project(camera);
    const screenX = ((projVec.x + 1) / 2) * window.innerWidth;
    const screenY = ((-projVec.y + 1) / 2) * window.innerHeight;
    return { x: screenX, y: screenY, visible: projVec.z < 1 };
  }

  // Animation Loop
  let clock = new THREE.Clock();
  let animId = null;

  function animate() {
    animId = requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Idle subtle breathing motion
    if (sceneState.section === 'hero') {
      heroLipstick.group.rotation.y = Math.sin(time * 0.8) * 0.15;
      pedestalGroup.position.y = Math.sin(time * 0.5) * 0.02;

      // Animate fanned lipsticks gentle hover
      fannedLipsticks.forEach((stick, idx) => {
        stick.group.position.y = -0.2 - ((idx % 3) + 1) * 0.1 + Math.sin(time * 0.8 + idx) * 0.03;
      });
    } else if (sceneState.section === 'chapters') {
      // Gentle orbital drift
      archMesh.rotation.z = Math.sin(time * 0.3) * 0.03;
      ingredientMeshes.forEach((mesh, idx) => {
        mesh.position.y += Math.sin(time * 1.5 + idx) * 0.002;
        mesh.rotation.y = time * 0.8 + idx;
      });
    } else if (sceneState.section === 'swirl') {
      heroLipstick.group.rotation.y = time * 1.8;
      petalStorm.update(time);
    }

    renderer.render(scene, camera);
  }
  animate();

  return {
    scene,
    camera,
    renderer,
    heroLipstick,
    ribbon,
    petalStorm,
    sceneState,
    projectToScreen,
    setSection(name) {
      sceneState.section = name;
      if (name === 'hero') {
        pedestalGroup.visible = true;
        archGroup.visible = false;
        formulaGroup.visible = false;
        ribbon.group.visible = false;
        petalStorm.group.visible = false;
        fannedLipsticks.forEach(s => s.group.visible = true);

        // Hero pose: centered, cap slightly open, twist slightly up
        heroLipstick.group.position.set(0, 0.1, 0);
        heroLipstick.group.scale.set(1.15, 1.15, 1.15);
        heroLipstick.group.rotation.set(0.08, 0, 0);
        heroLipstick.setOpen(0.85);
        heroLipstick.setTwist(0.7);
        camera.position.set(0, 1.2, 7.5);
        camera.lookAt(0, 0.8, 0);
      } else if (name === 'chapters') {
        pedestalGroup.visible = false;
        archGroup.visible = true;
        ribbon.group.visible = false;
        petalStorm.group.visible = false;
        fannedLipsticks.forEach(s => s.group.visible = false);

        // Move to left side for chapters
        const isMobile = window.innerWidth < 768;
        heroLipstick.group.position.set(isMobile ? 0 : -1.4, 0.6, 0);
        heroLipstick.group.scale.set(1.1, 1.1, 1.1);
        camera.position.set(0, 1.0, 7.0);
        camera.lookAt(0, 0.8, 0);
      } else if (name === 'swirl') {
        pedestalGroup.visible = false;
        archGroup.visible = false;
        formulaGroup.visible = false;
        ribbon.group.visible = true;
        petalStorm.group.visible = true;
        fannedLipsticks.forEach(s => s.group.visible = false);

        // Centered closed lipstick spinning inside spiral ribbon
        heroLipstick.group.position.set(0, 0.5, 0);
        heroLipstick.group.scale.set(1.2, 1.2, 1.2);
        heroLipstick.setOpen(0);
        heroLipstick.setTwist(0);
        camera.position.set(0, 0.8, 8.2);
        camera.lookAt(0, 0.5, 0);
      } else if (name === 'hidden') {
        pedestalGroup.visible = false;
        archGroup.visible = false;
        formulaGroup.visible = false;
        ribbon.group.visible = false;
        petalStorm.group.visible = false;
        fannedLipsticks.forEach(s => s.group.visible = false);
      }
    },
    setChapterPose(chapterIndex, progress = 0) {
      sceneState.chapterIndex = chapterIndex;
      sceneState.chapterProgress = progress;

      // Chapters:
      // 01 The Case: cap lifting off
      // 02 The Twist: bullet raising out
      // 03 The Formula: exploded ingredients floating
      // 04 The Finish: close up on 30 degree bevel
      formulaGroup.visible = chapterIndex === 2;

      if (chapterIndex === 0) {
        // The Case: showcase cap lifting
        heroLipstick.setOpen(0.2 + progress * 0.8);
        heroLipstick.setTwist(0.1);
        heroLipstick.group.rotation.set(0.1, -0.2 + progress * 0.4, 0.05);
      } else if (chapterIndex === 1) {
        // The Twist: bullet extends smoothly
        heroLipstick.setOpen(1.0);
        heroLipstick.setTwist(0.2 + progress * 0.8);
        heroLipstick.group.rotation.set(0.15, progress * 0.6, -0.02);
      } else if (chapterIndex === 2) {
        // The Formula: ingredients visible & orbiting
        heroLipstick.setOpen(1.0);
        heroLipstick.setTwist(0.9);
        heroLipstick.group.rotation.set(0.05, 0.4 + progress * 0.3, 0);
      } else if (chapterIndex === 3) {
        // The Finish: zoom slightly into the tip
        heroLipstick.setOpen(1.0);
        heroLipstick.setTwist(1.0);
        heroLipstick.group.rotation.set(0.25, 0.8 - progress * 0.4, 0.1);
      }
    },
    setSwirlScrub(progress) {
      sceneState.swirlProgress = progress;
      ribbon.setProgress(progress);
      petalStorm.setIntensity(progress * 1.5);
    },
    setHeroShade(index) {
      if (index >= 0 && index < SHADES.length) {
        sceneState.activeShadeIndex = index;
        const shade = SHADES[index];
        heroLipstick.setColor(shade.threeColor, shade.finish);
      }
    },
    destroy() {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    }
  };
}

