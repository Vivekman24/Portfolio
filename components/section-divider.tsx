'use client';

import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'wave' | 'diagonal' | 'dots';
  flip?: boolean;
  className?: string;
}

const SectionDivider = ({ variant = 'wave', flip = false, className = '' }: SectionDividerProps) => {
  if (variant === 'wave') {
    return (
      <div className={`relative w-full overflow-hidden ${flip ? 'rotate-180' : ''} ${className}`}>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 md:h-24"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.2)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0.2)" />
            </linearGradient>
          </defs>
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
            fill="url(#waveGradient)"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            d="M0,80 C200,40 400,100 600,80 C800,60 1000,100 1200,80 L1200,120 L0,120 Z"
            fill="rgba(6, 182, 212, 0.1)"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'diagonal') {
    return (
      <div className={`relative w-full overflow-hidden ${className}`}>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12 md:h-20"
        >
          <motion.polygon
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            points={flip ? "0,0 1200,120 1200,0" : "0,120 1200,0 1200,120"}
            fill="rgba(6, 182, 212, 0.1)"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={`relative w-full py-8 flex items-center justify-center ${className}`}>
        <div className="flex items-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 ${
                i === 2 ? 'w-3 h-3' : 'w-2 h-2 opacity-60'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default SectionDivider;

