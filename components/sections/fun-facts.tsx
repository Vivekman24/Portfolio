'use client';

import { motion } from 'framer-motion';
import { Coffee, Gamepad2, Dumbbell, BookOpen, Music, Code2, Rocket, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FunFacts = () => {
  const facts = [
    {
      icon: Coffee,
      emoji: '☕',
      title: 'Coffee Enthusiast',
      description: 'Fueled by caffeine and curiosity',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: Dumbbell,
      emoji: '🏋️',
      title: 'Fitness Focused',
      description: 'Gym sessions keep me sharp',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Gamepad2,
      emoji: '🎮',
      title: 'Gamer',
      description: 'Relaxing with video games',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: BookOpen,
      emoji: '📚',
      title: 'AI Research Reader',
      description: 'Always exploring new papers',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Rocket,
      emoji: '🏀',
      title: 'Basketball Player',
      description: 'Love hitting the court',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Code2,
      emoji: '💡',
      title: 'Side Project Addict',
      description: 'Always building something new',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 px-4 relative bg-slate-900/80 md:bg-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Beyond The Code</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            When I&apos;m not coding, here&apos;s what keeps me going!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {facts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <motion.div
                key={fact.title}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.08, 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                className="group cursor-default"
              >
                <Card className="glass dark:glass-dark border-white/10 h-full transition-all duration-300 group-hover:border-cyan-500/50 group-hover:shadow-xl group-hover:shadow-cyan-500/20 overflow-hidden">
                  <CardContent className="p-4 text-center relative">
                    {/* Animated background gradient on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${fact.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    {/* Emoji that pops on hover */}
                    <motion.div
                      className="text-3xl mb-2"
                      whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      {fact.emoji}
                    </motion.div>
                    
                    <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                      {fact.title}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {fact.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Fun tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            <Heart size={14} className="text-red-400" />
            <span>Work hard, play hard - that&apos;s my motto!</span>
            <Heart size={14} className="text-red-400" />
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FunFacts;

