'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hero3DCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationRef = useRef<number>(0);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const torus1Ref = useRef<THREE.Mesh | null>(null);
  const torus2Ref = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x3b82f6, 0.5);
    pointLight1.position.set(-10, -10, -5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 0.5);
    pointLight2.position.set(10, -10, 5);
    scene.add(pointLight2);

    // Small glowing core - deeper blue color for better contrast with white text
    const coreGeometry = new THREE.SphereGeometry(0.08, 32, 32);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x0891b2,
      emissive: 0x0284c7,
      emissiveIntensity: 1.2,
      transparent: true,
      opacity: 0.95,
    });
    const sphere = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(sphere);
    sphereRef.current = sphere;
    
    // Add outer glow sphere - smaller
    const glowGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.15,
    });
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowSphere);

    // Torus 1 - elegant thin ring
    const torus1Geometry = new THREE.TorusGeometry(1.2, 0.015, 16, 100);
    const torus1Material = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.6,
    });
    const torus1 = new THREE.Mesh(torus1Geometry, torus1Material);
    scene.add(torus1);
    torus1Ref.current = torus1;

    // Torus 2 - second elegant ring
    const torus2Geometry = new THREE.TorusGeometry(1.5, 0.012, 16, 100);
    const torus2Material = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x22d3ee,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.4,
    });
    const torus2 = new THREE.Mesh(torus2Geometry, torus2Material);
    torus2.rotation.x = Math.PI / 3;
    scene.add(torus2);
    torus2Ref.current = torus2;

    // Small floating dots instead of icosahedrons
    const dotGeometry = new THREE.SphereGeometry(0.04, 16, 16);
    
    const dot1Material = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0xa855f7,
      emissiveIntensity: 0.8,
    });
    const ico1 = new THREE.Mesh(dotGeometry, dot1Material);
    ico1.position.set(1.8, 0.5, 0);
    scene.add(ico1);

    const dot2Material = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.8,
    });
    const ico2 = new THREE.Mesh(new THREE.SphereGeometry(0.03, 16, 16), dot2Material);
    ico2.position.set(-1.6, -0.4, 0.3);
    scene.add(ico2);

    const dot3Material = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.8,
    });
    const ico3 = new THREE.Mesh(new THREE.SphereGeometry(0.025, 16, 16), dot3Material);
    ico3.position.set(1.4, -0.8, -0.3);
    scene.add(ico3);

    // Particles
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Animate core - subtle pulsing with glow
      if (sphereRef.current) {
        const scale = 1 + Math.sin(elapsedTime * 2) * 0.1;
        sphereRef.current.scale.set(scale, scale, scale);
        
        // Animate glow sphere (it's the next sibling in the scene)
        const glowScale = 1 + Math.sin(elapsedTime * 1.5) * 0.15;
        if (scene.children[5]) { // glow sphere is added after sphere
          scene.children[5].scale.set(glowScale, glowScale, glowScale);
        }
      }

      // Animate torus 1
      if (torus1Ref.current) {
        torus1Ref.current.rotation.x = elapsedTime * 0.4;
        torus1Ref.current.rotation.z = elapsedTime * 0.2;
      }

      // Animate torus 2
      if (torus2Ref.current) {
        torus2Ref.current.rotation.y = elapsedTime * 0.3;
        torus2Ref.current.rotation.z = elapsedTime * 0.1;
      }

      // Animate particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.05;
        particlesRef.current.rotation.x = elapsedTime * 0.03;
      }

      // Animate icosahedrons
      ico1.rotation.y = elapsedTime * 0.5;
      ico1.position.y = 0.7 + Math.sin(elapsedTime * 2) * 0.2;

      ico2.rotation.x = elapsedTime * 0.7;
      ico2.position.y = -0.6 + Math.sin(elapsedTime * 1.5 + 1) * 0.15;

      ico3.rotation.z = elapsedTime * 0.6;
      ico3.position.y = -1.0 + Math.sin(elapsedTime * 1.8 + 2) * 0.12;

      // Camera slight movement based on mouse
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    const container = containerRef.current;
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
      
      if (rendererRef.current && container) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default Hero3DCanvas;

