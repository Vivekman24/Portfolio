'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/magnetic-button';
import Hero3DWrapper from '@/components/hero-3d-wrapper';

const Hero = () => {
  const titles = useMemo(() => [
    'Full-Stack Developer',
    'AI Enthusiast',
    'Problem Solver',
    'Tech Innovator',
    'ML Engineer'
  ], []);
  
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTitleIndex, titles]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDYsIDE4MiwgMjEyLCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
      </div>

      {/* 3D Background - More subtle */}
      <Hero3DWrapper />
      
      {/* Dark overlay for better text readability on mobile */}
      <div className="absolute inset-0 bg-slate-900/60 md:bg-slate-900/20 z-[5] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 p-1 animate-glow">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <Code size={48} className="text-cyan-400" />
                </div>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full border border-cyan-500/30"
              />
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-white">Hi, I&apos;m</span>
                <span className="block gradient-text mt-4 md:mt-6">Vivek Sai Manthri!</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-4"
            >
              <p className="text-xl md:text-2xl font-medium h-8">
                <span className="text-cyan-400">{displayText}</span>
                <span className="animate-pulse text-white">|</span>
              </p>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                I enjoy turning complex ideas into practical solutions that create real-world impact.
              </p>
            </motion.div>

            {/* Social Links with Magnetic Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex items-center justify-center gap-4 pt-6"
            >
              <div className="flex items-center space-x-4">
                <MagneticButton strength={0.4}>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-gray-300 hover:text-white hover:bg-white/10 rounded-full p-3 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                    onClick={() => window.open('https://github.com/Vivekman24', '_blank')}
                  >
                    <Github size={24} />
                  </Button>
                </MagneticButton>
                <MagneticButton strength={0.4}>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-gray-300 hover:text-white hover:bg-white/10 rounded-full p-3 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                    onClick={() => window.open('https://linkedin.com/in/vivek-sai-manthri', '_blank')}
                  >
                    <Linkedin size={24} />
                  </Button>
                </MagneticButton>
                <MagneticButton strength={0.4}>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-gray-300 hover:text-white hover:bg-white/10 rounded-full p-3 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <Mail size={24} />
                  </Button>
                </MagneticButton>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;