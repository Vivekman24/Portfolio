'use client';

import { motion } from 'framer-motion';
import { Brain, Code2, Rocket, Users, MessageSquare, Lightbulb, Clock, Target, Handshake, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import TiltCard from '@/components/tilt-card';

const About = () => {
  const skills = [
    {
      icon: Code2,
      title: 'Full-Stack Development',
      description: 'Expert in React, TypeScript, Node.js, FastAPI, and modern web technologies',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Specialized in TensorFlow, PyTorch, Keras, Scikit-learn, and building intelligent applications',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Rocket,
      title: 'Cloud & DevOps',
      description: 'Experience with AWS, Docker, Kubernetes, and CI/CD pipelines for scalable deployments',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Data Science',
      description: 'Strong background in statistical analysis, data visualization, and machine learning principles',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const softSkills = [
    { icon: Handshake, title: 'Team Collaboration', description: 'Cross-functional teamwork & communication' },
    { icon: Lightbulb, title: 'Problem Solving', description: 'Creative solutions to complex challenges' },
    { icon: Zap, title: 'Quick Learner', description: 'Rapidly adapting to new technologies' },
    { icon: Clock, title: 'Time Management', description: 'Meeting deadlines & prioritizing tasks' },
    { icon: Target, title: 'Goal-Oriented', description: 'Focused on delivering results' },
    { icon: MessageSquare, title: 'Communication', description: 'Clear technical & non-technical communication' }
  ];

  return (
    <section id="about" className="py-20 px-4 relative bg-slate-900/80 md:bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          I&apos;m a passionate developer and AI enthusiast with a B.S. in Computer Science and Data Science from Rutgers University, currently pursuing my M.S. in Computer Science with a concentration in AI/ML. My work blends software engineering and AI to build practical solutions that improve how people interact with software.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Personal Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="glass dark:glass-dark border-white/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">My Journey</h3>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Currently pursuing my Master&apos;s in Computer Science at Rutgers University, I&apos;ve developed a strong foundation in both 
                    theoretical and practical aspects of software engineering/development and artificial intelligence.
                  </p>
                  <p>
                    My experience spans from not only my academic work, but also the previous internships that I have completed. I specialize in creating intelligent applications that can understand, 
                    learn, and adapt to user needs.
                  </p>
                  <p>
                    When I&apos;m not coding, you&apos;ll find me exploring the latest AI research papers, contributing to open-source projects, 
                    or working on personal projects that combine my passion for technology and innovation. I also enjoy staying active 
                    by working out, playing sports; and also relax by watching TV or playing video games.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <TiltCard tiltStrength={12} glareEnable={true}>
                    <Card className="glass dark:glass-dark border-white/10 h-full transition-all duration-300 group-hover:border-cyan-500/30 group-hover:shadow-lg group-hover:shadow-cyan-500/10">
                      <CardContent className="p-6 text-center">
                        <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${skill.color} mx-auto mb-4`}>
                          <Icon size={24} className="text-white" />
                        </div>
                        <h4 className="text-lg font-semibold text-white mb-2">{skill.title}</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">{skill.description}</p>
                      </CardContent>
                    </Card>
                  </TiltCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-center mb-8">
            <span className="gradient-text">Soft Skills</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {softSkills.map((skill, index) => {
              const Icon = skill.icon;
            return (
              <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
              >
                  <Card className="glass dark:glass-dark border-white/10 h-full transition-all duration-300 group-hover:border-cyan-500/50 group-hover:shadow-lg group-hover:shadow-cyan-500/20">
                    <CardContent className="p-4 text-center">
                      <div className="inline-flex p-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 mx-auto mb-2 group-hover:from-cyan-500/40 group-hover:to-blue-500/40 transition-all duration-300">
                        <Icon size={20} className="text-cyan-400 group-hover:text-cyan-300" />
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1">{skill.title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">{skill.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;