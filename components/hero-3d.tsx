'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Icosahedron, Torus } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const icosaRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      torusRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
    if (icosaRef.current) {
      icosaRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      icosaRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <>
      {/* Main sphere with distortion - deeper blue for contrast with white text */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
          <MeshDistortMaterial
            color="#0284c7"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
        {/* Outer glow */}
        <Sphere args={[1.2, 32, 32]} scale={1.5}>
          <meshBasicMaterial
            color="#22d3ee"
            transparent
            opacity={0.1}
          />
        </Sphere>
      </Float>

      {/* Orbiting torus */}
      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        <Torus ref={torusRef} args={[2.5, 0.05, 16, 100]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </Torus>
      </Float>

      {/* Second orbiting torus */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <Torus args={[2.8, 0.03, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={0.3}
            transparent
            opacity={0.4}
          />
        </Torus>
      </Float>

      {/* Small floating icosahedrons */}
      <Float speed={4} rotationIntensity={3} floatIntensity={2}>
        <Icosahedron ref={icosaRef} args={[0.3]} position={[2, 1, 0]}>
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </Icosahedron>
      </Float>

      <Float speed={3.5} rotationIntensity={2} floatIntensity={3}>
        <Icosahedron args={[0.2]} position={[-2, -1, 0.5]}>
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.1}
          />
        </Icosahedron>
      </Float>

      <Float speed={2.8} rotationIntensity={2.5} floatIntensity={2}>
        <Icosahedron args={[0.15]} position={[1.5, -1.5, -0.5]}>
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.1}
          />
        </Icosahedron>
      </Float>
    </>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#22d3ee"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// CSS Fallback component for when Three.js fails
const CSSFallback = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Animated orbs using CSS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-3xl animate-pulse" />
      <div className="absolute top-1/3 left-1/3 w-48 h-48 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
      <div className="absolute bottom-1/3 right-1/3 w-56 h-56 rounded-full bg-gradient-to-r from-blue-500/25 to-cyan-500/25 blur-3xl animate-float" style={{ animationDelay: '-4s' }} />
      
      {/* Rotating ring effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-cyan-500/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-blue-500/10 rounded-full animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
    </div>
  );
};

const Hero3D = () => {
  const [hasError, setHasError] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <CSSFallback />;
  }

  if (hasError) {
    return <CSSFallback />;
  }

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        onCreated={() => {
          // Canvas created successfully
        }}
        onError={() => {
          setHasError(true);
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[10, -10, 5]} intensity={0.5} color="#06b6d4" />
        
        <FloatingGeometry />
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default Hero3D;
