"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBg() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene, camera, renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020105, 0.012);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x020105, 1);
    containerRef.current.appendChild(renderer.domElement);

    // Particles Data
    const particleCount = 80;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];
    const basePositions: { x: number; y: number; z: number }[] = [];

    const areaWidth = 45;
    const areaHeight = 35;
    const areaDepth = 40;

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * areaWidth;
      const y = (Math.random() - 0.5) * areaHeight;
      const z = (Math.random() - 0.5) * areaDepth;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      basePositions.push({ x, y, z });

      velocities.push({
        x: (Math.random() - 0.5) * 0.008,
        y: (Math.random() - 0.5) * 0.008,
        z: (Math.random() - 0.5) * 0.008,
      });
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Particle Material (smaller, softer, cleaner)
    const pMaterial = new THREE.PointsMaterial({
      size: 0.18,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.2, 50);
    pointLight.position.set(0, 10, 15);
    scene.add(pointLight);

    // Mouse Interaction (subtle parallax)
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.015;
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.015;
    };

    // Scroll Interaction (subtle depth offset)
    let scrollY = 0;
    let targetScrollY = 0;

    const handleScroll = () => {
      targetScrollY = window.scrollY * 0.012;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Get Accent color from variables
    const getThemeColor = () => {
      if (typeof window === "undefined") {
        return new THREE.Color(0x00ff87);
      }
      const rootStyle = getComputedStyle(document.documentElement);
      const accentVal = rootStyle.getPropertyValue("--accent").trim() || "#00F0FF";
      return new THREE.Color(accentVal);
    };

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const accentColor = getThemeColor();

      // Smooth color transition
      pMaterial.color.lerp(accentColor, 0.05);

      // Smooth mouse camera parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      camera.position.x = mouseX;
      camera.position.y = -mouseY;

      // Smooth scroll depth offset
      scrollY += (targetScrollY - scrollY) * 0.08;
      camera.position.z = 30 - scrollY * 0.2;
      camera.rotation.y = scrollY * 0.008;

      // Slow scene rotation
      particles.rotation.y = elapsedTime * 0.01;

      // Update particle drift positions
      const positionsAttr = geometry.attributes.position as THREE.BufferAttribute;
      const positionsArr = positionsAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        basePositions[i].x += velocities[i].x;
        basePositions[i].y += velocities[i].y;
        basePositions[i].z += velocities[i].z;

        // Bounce borders
        if (Math.abs(basePositions[i].x) > areaWidth / 2) velocities[i].x *= -1;
        if (Math.abs(basePositions[i].y) > areaHeight / 2) velocities[i].y *= -1;
        if (Math.abs(basePositions[i].z) > areaDepth / 2) velocities[i].z *= -1;

        // Apply smooth positions
        positionsArr[i * 3] = basePositions[i].x + Math.sin(elapsedTime * 0.5 + i) * 0.15;
        positionsArr[i * 3 + 1] = basePositions[i].y + Math.cos(elapsedTime * 0.5 + i) * 0.15;
        positionsArr[i * 3 + 2] = basePositions[i].z;
      }
      positionsAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      geometry.dispose();
      pMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none overflow-hidden"
      style={{ background: "#030107" }}
    />
  );
}
