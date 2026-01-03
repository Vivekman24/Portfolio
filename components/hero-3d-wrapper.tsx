'use client';

import { useState, useEffect, Component, ReactNode } from 'react';
import dynamic from 'next/dynamic';

// CSS Fallback component for when Three.js fails or is loading
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
      
      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 blur-2xl animate-glow" />
    </div>
  );
};

// Error boundary for catching Three.js errors
interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('3D component failed to load, using CSS fallback:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Dynamically import the pure Three.js component (no @react-three/fiber)
const Hero3DCanvas = dynamic(() => import('./hero-3d-canvas'), {
  ssr: false,
  loading: () => <CSSFallback />,
});

const Hero3DWrapper = () => {
  const [mounted, setMounted] = useState(false);
  const [use3D, setUse3D] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    // Check if WebGL is supported
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setUse3D(false);
      }
    } catch (e) {
      setUse3D(false);
    }
  }, []);

  if (!mounted) {
    return <CSSFallback />;
  }

  if (!use3D) {
    return <CSSFallback />;
  }

  return (
    <ErrorBoundary fallback={<CSSFallback />}>
      <Hero3DCanvas />
    </ErrorBoundary>
  );
};

export default Hero3DWrapper;
