'use client';

import { motion } from 'framer-motion';
import { Github, Code, Database, Brain, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TiltCard from '@/components/tilt-card';
import MagneticButton from '@/components/magnetic-button';

const Projects = () => {
  const projects = [
    {
      title: 'Online Auction System',
      description: 'A secure web-based, full-stack auction platform featuring user authentication, real-time bidding, and automated alert notifications. Deployed on AWS cloud infrastructure with advanced search and filtering functionalities.',
      technologies: ['JavaScript', 'Java', 'MySQL', 'JSP', 'JDBC', 'HTML/CSS', 'AWS (EC2, RDS)', 'Apache Tomcat'],
      features: [
        'User authentication and real-time bidding system',
        'Advanced search and filtering functionalities',
        'Administrative tools for detailed sales reports',
        'AWS cloud deployment with 40% reduced latency',
        'Enhanced user experience by 25%'
      ],
      icon: Database,
      color: 'from-blue-500 to-cyan-500',
      github: 'https://github.com/Vivekman24/OnlineAuction',
      showGithub: true
    },
    {
      title: 'Cafe Bliss App',
      description: 'An Android application following the MVC design pattern for seamless menu browsing and order management. Features dynamic cart updates, custom quantities, and multi-screen navigation.',
      technologies: ['Java', 'JavaFX', 'Android Studio'],
      features: [
        'MVC design pattern implementation',
        'Dynamic cart updates and custom quantities',
        'Multi-screen navigation',
        'Modern UI components with RecyclerView',
        'Singleton Pattern for efficient data handling'
      ],
      icon: Smartphone,
      color: 'from-green-500 to-emerald-500',
      github: 'https://github.com/Vivekman24/CafeBlissApp',
      showGithub: true
    },
    {
      title: 'NeuroVault AI Memory System',
      description: 'An AI memory system that turns audio and thoughts into structured intelligence. Built with React frontend and FastAPI backend, featuring RAG pipelines and semantic search capabilities.',
      technologies: ['React', 'TypeScript', 'FastAPI', 'Python', 'ChromaDB', 'OpenAI', 'LangChain', 'Neo4j'],
      features: [
        'Audio and PDF processing capabilities',
        'RAG pipelines with semantic search',
        '33% reduced load times with Vite optimization',
        '40% cloud cost reduction with local-first storage',
        '37% improved query accuracy'
      ],
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      showGithub: false
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 relative bg-slate-900/80 md:bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work, demonstrating my skills in full-stack development, 
            AI integration, and modern web technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <TiltCard tiltStrength={8} glareEnable={true}>
                  <Card className="glass dark:glass-dark border-white/10 h-full transition-all duration-300 group-hover:border-cyan-500/30 group-hover:shadow-lg group-hover:shadow-cyan-500/10">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${project.color}`}>
                          <Icon size={24} className="text-white" />
                        </div>
                        {project.showGithub && (
                          <div className="flex space-x-2">
                            <MagneticButton strength={0.3}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-white hover:bg-white/10"
                                onClick={() => window.open(project.github, '_blank')}
                              >
                                <Github size={16} />
                              </Button>
                            </MagneticButton>
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {/* Technologies */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-white mb-2">Technologies</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="bg-white/10 text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Key Features</h4>
                        <ul className="space-y-1">
                          {project.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="text-gray-400 text-xs flex items-start">
                              <span className="text-cyan-400 mr-2">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="glass dark:glass-dark border-white/10 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Code size={48} className="text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Interested in Collaborating?</h3>
              <p className="text-gray-300 mb-6">
                I&apos;m always open to discussing new opportunities and exciting projects. 
                Let&apos;s create something amazing together!
              </p>
              <MagneticButton strength={0.2}>
                <Button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                >
                  Get In Touch
                </Button>
              </MagneticButton>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;