'use client';

import { useEffect, useRef } from 'react';

interface GradientOrb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const GradientMeshBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef<GradientOrb[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Detect if mobile for adjusted opacity - much more subtle on mobile
    const isMobile = window.innerWidth < 768;
    // Reduce desktop orb opacity so background hues remain subtle on large screens
    const opacityMultiplier = isMobile ? 0.08 : 0.12;

    const colors = [
      `rgba(15, 23, 42, ${opacityMultiplier})`,    // Dark navy
      `rgba(30, 41, 59, ${opacityMultiplier})`,   // Dark slate
      `rgba(59, 130, 246, ${opacityMultiplier * 0.6})`,   // Muted blue
      `rgba(34, 211, 238, ${opacityMultiplier * 0.5})`,   // Muted cyan
      `rgba(99, 102, 241, ${opacityMultiplier * 0.5})`,   // Muted indigo
    ];

    const createOrbs = () => {
      orbsRef.current = [];
      const orbCount = isMobile ? 3 : 5; // Fewer orbs on mobile
      const baseRadius = isMobile ? 150 : 300; // Smaller orbs on mobile
      
      for (let i = 0; i < orbCount; i++) {
        orbsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * baseRadius + (isMobile ? 100 : 200),
          color: colors[i % colors.length]
        });
      }
    };

    const drawOrbs = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, 'rgba(2, 6, 23, 1)');
      bgGradient.addColorStop(0.5, 'rgba(15, 20, 40, 1)');
      bgGradient.addColorStop(1, 'rgba(2, 6, 23, 1)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw orbs
      orbsRef.current.forEach((orb, index) => {
        // Mouse interaction - subtle attraction
        const dx = mouseRef.current.x - orb.x;
        const dy = mouseRef.current.y - orb.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 400) {
          const force = (400 - distance) / 400 * 0.01;
          orb.vx += (dx / distance) * force;
          orb.vy += (dy / distance) * force;
        }

        // Apply velocity with friction
        orb.x += orb.vx;
        orb.y += orb.vy;
        orb.vx *= 0.99;
        orb.vy *= 0.99;

        // Bounce off edges with padding
        const padding = orb.radius * 0.5;
        if (orb.x < -padding || orb.x > canvas.width + padding) orb.vx *= -1;
        if (orb.y < -padding || orb.y > canvas.height + padding) orb.vy *= -1;

        // Keep in bounds
        orb.x = Math.max(-padding, Math.min(canvas.width + padding, orb.x));
        orb.y = Math.max(-padding, Math.min(canvas.height + padding, orb.y));

        // Draw radial gradient orb
        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.radius
        );
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(orb.x - orb.radius, orb.y - orb.radius, orb.radius * 2, orb.radius * 2);
      });

      // Add subtle noise/grain effect
      ctx.globalAlpha = 0.02;
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.fillStyle = Math.random() > 0.5 ? '#fff' : '#000';
        ctx.fillRect(x, y, 1, 1);
      }
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(drawOrbs);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resizeCanvas();
    createOrbs();
    drawOrbs();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createOrbs();
    });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-60 md:opacity-30"
    />
  );
};

export default GradientMeshBackground;

