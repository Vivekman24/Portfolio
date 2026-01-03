'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SmoothScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  parallaxStrength?: number;
  fadeIn?: boolean;
}

const SmoothScrollSection = ({ 
  children, 
  className = '',
  parallaxStrength = 50,
  fadeIn = true
}: SmoothScrollSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [parallaxStrength, -parallaxStrength]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return (
    <motion.div
      ref={sectionRef}
      className={className}
      style={{
        y: fadeIn ? y : 0,
        opacity: fadeIn ? opacity : 1,
        scale: fadeIn ? scale : 1,
      }}
    >
      {children}
    </motion.div>
  );
};

export default SmoothScrollSection;

