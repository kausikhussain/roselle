"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { ProceduralLipstick } from "@/lib/proceduralLipstick";
import { ProceduralRibbonSwirl } from "@/lib/proceduralSwirl";
import { ROSELLE_SHADES } from "@/data/shades";

interface LipstickCanvasProps {
  activeSection?: string;
  scrollProgress?: number;
  selectedShadeId?: string;
  insideChapter?: number; // 1 to 4
  className?: string;
  enableMouseParallax?: boolean;
}

export default function LipstickCanvas({
  activeSection = "sale",
  scrollProgress = 0,
  selectedShadeId = "01",
  insideChapter = 1,
  className = "",
  enableMouseParallax = true,
}: LipstickCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // References to keep across re-renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const lipstickRef = useRef<ProceduralLipstick | null>(null);
  const swirlRef = useRef<ProceduralRibbonSwirl | null>(null);
  const pedestalRef = useRef<THREE.Group | null>(null);

  // Smooth interpolation target states
  const targetPos = useRef(new THREE.Vector3(0, -1.8, 0));
  const targetRot = useRef(new THREE.Euler(0.1, 0, 0));
  const targetOpen = useRef(0.85);
  const targetTwist = useRef(0.75);
  const targetSwirlProgress = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });

  // 1. Initialize Three.js scene once
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Lighting Studio
    const ambientLight = new THREE.AmbientLight(0xfff5f5, 0.9);
    scene.add(ambientLight);

    const keySpot = new THREE.SpotLight(0xfffaed, 2.8, 25, Math.PI / 4, 0.4);
    keySpot.position.set(4, 9, 7);
    keySpot.castShadow = true;
    keySpot.shadow.bias = -0.001;
    keySpot.shadow.mapSize.width = 1024;
    keySpot.shadow.mapSize.height = 1024;
    scene.add(keySpot);

    const rimLight = new THREE.DirectionalLight(0xe5a995, 2.2);
    rimLight.position.set(-6, 3, -4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
    fillLight.position.set(0, -5, 5);
    scene.add(fillLight);

    // Pedestal Group
    const pedestalGroup = new THREE.Group();
    // Rose-gold rim tier 1
    const p1Geom = new THREE.CylinderGeometry(2.2, 2.3, 0.35, 64);
    const p1Mat = new THREE.MeshPhysicalMaterial({
      color: 0xe5a995,
      metalness: 0.95,
      roughness: 0.2,
      clearcoat: 0.5,
    });
    const p1 = new THREE.Mesh(p1Geom, p1Mat);
    p1.position.y = -2.4;
    p1.receiveShadow = true;
    pedestalGroup.add(p1);

    // Wine lacquer tier 2
    const p2Geom = new THREE.CylinderGeometry(1.8, 1.8, 0.3, 64);
    const p2Mat = new THREE.MeshPhysicalMaterial({
      color: 0x42050e,
      roughness: 0.2,
      metalness: 0.3,
      clearcoat: 1.0,
    });
    const p2 = new THREE.Mesh(p2Geom, p2Mat);
    p2.position.y = -2.1;
    p2.receiveShadow = true;
    pedestalGroup.add(p2);

    scene.add(pedestalGroup);
    pedestalRef.current = pedestalGroup;

    // Procedural Lipstick
    const activeShade = ROSELLE_SHADES.find((s) => s.id === selectedShadeId) || ROSELLE_SHADES[0];
    const lipstick = new ProceduralLipstick({
      shadeHex: activeShade.hex,
      finish: activeShade.finish,
    });
    lipstick.group.position.set(0, -1.8, 0);
    lipstick.setOpen(0.85);
    lipstick.setTwist(0.75);
    scene.add(lipstick.group);
    lipstickRef.current = lipstick;

    // Procedural Ribbon Swirl
    const swirl = new ProceduralRibbonSwirl();
    swirl.group.position.set(0, 0, 0);
    swirl.group.visible = false;
    scene.add(swirl.group);
    swirlRef.current = swirl;

    // Mouse move listener for subtle parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (!enableMouseParallax) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePos.current = { x: x * 0.15, y: y * 0.1 };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Resize listener
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", handleResize);

    // Animation Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (lipstickRef.current) {
        // Smooth lerp lipstick transforms
        const grp = lipstickRef.current.group;
        grp.position.lerp(targetPos.current, 0.08);

        // Apply base rotation + mouse parallax
        const finalRotX = targetRot.current.x + mousePos.current.y * 0.5;
        const finalRotY = targetRot.current.y + mousePos.current.x * 0.6;
        grp.rotation.x += (finalRotX - grp.rotation.x) * 0.08;
        grp.rotation.y += (finalRotY - grp.rotation.y) * 0.08;
        grp.rotation.z += (targetRot.current.z - grp.rotation.z) * 0.08;

        // Smooth lerp open and twist values
        const curOpen = lipstickRef.current.getOpen();
        const nextOpen = THREE.MathUtils.lerp(curOpen, targetOpen.current, 0.1);
        lipstickRef.current.setOpen(nextOpen);

        const curTwist = lipstickRef.current.getTwist();
        const nextTwist = THREE.MathUtils.lerp(curTwist, targetTwist.current, 0.1);
        lipstickRef.current.setTwist(nextTwist);
      }

      if (swirlRef.current && swirlRef.current.group.visible) {
        swirlRef.current.update(delta);
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      lipstick.dispose();
      swirl.dispose();
      renderer.dispose();
    };
  }, []);

  // 2. Update Shade in Real-Time when changed
  useEffect(() => {
    if (!lipstickRef.current) return;
    const shade = ROSELLE_SHADES.find((s) => s.id === selectedShadeId);
    if (shade) {
      lipstickRef.current.setShade(shade.hex, shade.finish);
    }
  }, [selectedShadeId]);

  // 3. React to Active Section and Scroll Poses
  useEffect(() => {
    if (!lipstickRef.current || !pedestalRef.current || !swirlRef.current) return;

    if (activeSection === "sale") {
      // Sale Hero: On pedestal, uncapped, bullet raised, slight tilt
      targetPos.current.set(0, -1.8, 0);
      targetRot.current.set(0.1, 0, 0);
      targetOpen.current = 0.85;
      targetTwist.current = 0.8;
      pedestalRef.current.visible = true;
      swirlRef.current.group.visible = false;
    } else if (activeSection === "inside") {
      pedestalRef.current.visible = false;
      swirlRef.current.group.visible = false;

      // Inside: Shifted to the left side so editorial text sits on the right
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const xPos = isMobile ? 0 : -2.6;

      if (insideChapter === 1) {
        // Chapter 01: The Case (closed, angled, showing weighted base & lacquer)
        targetPos.current.set(xPos, -0.6, 1.2);
        targetRot.current.set(0.2, 0.4, -0.15);
        targetOpen.current = 0.0;
        targetTwist.current = 0.0;
      } else if (insideChapter === 2) {
        // Chapter 02: The Twist (cap lifted slightly, bullet twisting up)
        targetPos.current.set(xPos, -0.8, 1.5);
        targetRot.current.set(0.15, 0.8, -0.05);
        targetOpen.current = 0.45;
        targetTwist.current = 0.65;
      } else if (insideChapter === 3) {
        // Chapter 03: The Formula (cap floating high, bullet fully up, facing camera)
        targetPos.current.set(xPos, -1.0, 1.8);
        targetRot.current.set(0.1, 0.1, 0);
        targetOpen.current = 0.95;
        targetTwist.current = 1.0;
      } else {
        // Chapter 04: The Finish (macro zoom into bevel)
        targetPos.current.set(xPos, -0.7, 2.2);
        targetRot.current.set(0.25, -0.2, 0.05);
        targetOpen.current = 1.0;
        targetTwist.current = 1.0;
      }
    } else if (activeSection === "swirl") {
      // Swirl: Center, cap closed, ribbon wraps around, petals swirl
      targetPos.current.set(0, 0, 0);
      targetRot.current.set(0.15, Math.PI * 0.25, 0.1);
      targetOpen.current = 0.0;
      targetTwist.current = 0.0;
      pedestalRef.current.visible = false;
      swirlRef.current.group.visible = true;

      // Ribbon draw range tied to scroll progress
      const swirlProgress = Math.min(1, Math.max(0, scrollProgress));
      swirlRef.current.setProgress(swirlProgress);
    } else if (activeSection === "the-edit" || activeSection === "edit") {
      // The Edit: Upright on center pedestal
      targetPos.current.set(0, -1.2, 0);
      targetRot.current.set(0.05, 0, 0);
      targetOpen.current = 0.85;
      targetTwist.current = 0.75;
      pedestalRef.current.visible = true;
      swirlRef.current.group.visible = false;
    } else {
      // Other sections (Shop, Reels, Muses, Finder)
      // Keep subtle background presence or park off-screen smoothly
      targetPos.current.set(3.5, -2.5, -2);
      targetRot.current.set(0.1, 0.3, 0);
      targetOpen.current = 0.2;
      pedestalRef.current.visible = false;
      swirlRef.current.group.visible = false;
    }
  }, [activeSection, insideChapter, scrollProgress]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-10 transition-opacity duration-700 ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
