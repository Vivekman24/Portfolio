'use client';

import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TiltCard from '@/components/tilt-card';

const Experience = () => {
  const experiences = [
    {
      title: 'Full-Stack Developer Intern',
      company: 'Gogentic AI',
      location: 'Houston, TX | Remote',
      period: 'July 2025 – August 2025',
      description: [
        'Developed NeuroVault, an AI memory system that turns audio and thoughts into structured intelligence, building the frontend with React, TypeScript, and Tailwind CSS. Optimized performance with Vite, reducing load times by 30% while increasing user engagement',
        'Engineered the backend with FastAPI and Python, designing RESTful endpoints for audio/PDF processing and integrating SQLite/Neo4j for local-first storage, significantly reducing cloud costs while achieving sub-200ms latency',
        'Implemented RAG pipelines using ChromaDB, OpenAI embeddings, and LangChain, enabling semantic search across 10K+ documents and boosting query accuracy by 25%',
        'Streamlined deployment with Docker (40% faster) and collaborated in Agile sprints to ensure timely feature rollouts'
      ]
    },
    {
      title: 'Software Developer Intern',
      company: 'Aroopa, Inc',
      location: 'Monroe Township, NJ',
      period: 'June 2025 – August 2025',
      description: [
        'Built a production-ready MERN stack (React + Node.js/Express) that scaled to support 8K+ monthly users',
        'Created and implemented responsive UI components using HTML, Tailwind CSS, and React, boosting user engagement by 15% and improving overall user experience',
        'Architected MongoDB schemas and REST APIs using Postman, achieving higher reliability, and 40% faster data retrieval through query optimization',
        'Conducted unit and integration testing, resolving 10+ functional issues ensuring a scalable application'
      ]
    },
    {
      title: 'Software Engineering Intern',
      company: 'Memorial Sloan Kettering Cancer Center',
      location: 'New York, NY | Hybrid',
      period: 'June 2024 – August 2024',
      description: [
        'Engineered a Conditional GAN model that generates synthetic clinical data for testing, reducing manual data creation by 30% while maintaining data privacy and high fidelity to real patient data',
        'Optimized machine learning pipelines using TensorFlow, Keras, and Scikit-learn, improving computational efficiency by 25% by integrating OneHotEncoder for complex datasets and ensuring machine-readable formats',
        'Automated data preprocessing workflows with Pandas and Scikit-learn, significantly reducing ETL process runtime and enhancing data transformation accuracy',
        'Containerized the development environment using Docker and integrated it into a CI/CD pipeline, ensuring faster deployments, reproducibility, and reduced configuration discrepancies'
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 relative bg-slate-900/80 md:bg-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            My professional journey across various companies, showcasing my growth in software development and AI integration.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 hidden md:block" />
          
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 top-8 w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 border-4 border-slate-900 z-10 hidden md:flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </div>
                
                {/* Card with left margin for timeline */}
                <div className="md:ml-16">
                  <TiltCard tiltStrength={5} glareEnable={true}>
                  <Card className="glass dark:glass-dark border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
                              <Briefcase className="text-cyan-400" size={20} />
                            </div>
                        <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      </div>
                          <h4 className="text-lg font-semibold text-cyan-400">{exp.company}</h4>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0">
                        <div className="flex items-center space-x-2 text-gray-400">
                          <MapPin size={16} />
                          <span className="text-sm">{exp.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <Calendar size={16} />
                          <span className="text-sm">{exp.period}</span>
                        </div>
                      </div>
                    </div>
                        <Badge variant="secondary" className="w-fit">
                      {exp.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {exp.description.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                            <span className="text-cyan-400 mt-1.5 text-sm">▹</span>
                        <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
                  </TiltCard>
                </div>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 