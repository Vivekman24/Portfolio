'use client';

import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const Experience = () => {
  const experiences = [
    {
      title: 'Clinical Study Start-Up Automation Intern',
      company: 'Regeneron',
      location: 'Warren, NJ | Onsite',
      period: 'June 2026 – August 2026',
      description: [
        'Developed production-ready enterprise AI agents in Microsoft Copilot Studio using Power Automate Agent Flows and M365 integrations to automate Clinical Study/Site Start-Up (SSU) processes and eliminate repetitive manual work',
        'Engineered SSU Data Steward FilePilot, an end-to-end automation solution that processes Jira ticket data, updates Excel workbooks using Python, JavaScript, and TypeScript scripts, and publishes files to SharePoint, saving 5+ hours daily',
        'Built AI-powered site/clinical operations solutions reducing site intelligence report preparation time by 50% and developed PQ DraftPilot, a multi-agent workflow accelerating Performance Qualification Script generation by 75%'
      ]
    },
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
    <section id="experience" className="studio-section relative px-6 py-16 md:py-20">
      <div className="studio-container">
        <div
          className="text-center mb-16"
        >
          <p className="studio-eyebrow mb-4">02 / PROFESSIONAL JOURNEY</p>
          <h2 className="studio-heading mb-6">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-base text-slate-400 max-w-3xl mx-auto leading-relaxed">
            My professional journey across various companies, showcasing my growth in software development and AI integration.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/60 via-blue-500/25 to-transparent hidden md:block" />
          
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 top-8 w-5 h-5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-500 border-4 border-slate-900 z-10 hidden md:flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-200" />
                </div>
                
                {/* Card with left margin for timeline */}
                <div className="md:ml-16">
                  <Card className="studio-experience-card">
                <CardHeader className="p-6 md:p-8 pb-5">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                    <div className="flex items-start gap-4 min-w-0">
                      <span className="studio-skill-icon shrink-0"><Briefcase size={22} strokeWidth={1.5} /></span>
                      <div className="min-w-0">
                        <h3 className="text-2xl md:text-3xl text-white leading-tight">{exp.company}</h3>
                        <h4 className="mt-2 text-base font-medium text-blue-300">{exp.title}</h4>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 text-sm text-slate-400 lg:items-end shrink-0">
                      <span className="flex items-center gap-2"><Calendar size={15} />{exp.period}</span>
                      <span className="flex items-center gap-2"><MapPin size={15} />{exp.location}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-6 pb-6 md:px-8 md:pb-8">
                  <ul className="space-y-4 border-t border-white/10 pt-5">
                    {exp.description.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                            <span className="text-blue-400 mt-1.5 text-sm">▹</span>
                        <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
                </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 