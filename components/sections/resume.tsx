'use client';

import { motion } from 'framer-motion';
import { Download, Award, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TiltCard from '@/components/tilt-card';
import MagneticButton from '@/components/magnetic-button';

const Resume = () => {
  const certifications = [
    {
      title: 'Context Engineering Certification',
      issuer: 'Professional Certification',
      file: '/Context Engineering Certification.pdf'
    }
  ];

  const education = [
    {
      degree: 'M.S. in Computer Science',
      school: 'Rutgers University, New Brunswick, NJ',
      period: 'Fall 2025 – May 2027',
      focus: 'Brain-Inspired Computing, Data Structures and Algorithms, Introduction to AI'
    },
    {
      degree: 'B.S. in Computer Science and Data Science',
      school: 'Rutgers University, New Brunswick, NJ',
      period: 'Sep. 2022 – May 2025',
      focus: 'Algorithms, Data Structures, Computer Architecture, Software Methodology, Databases, Statistical Inference for Data Science, Data Management for Data Science, Applied Statistical Learning, Regression Methods, Machine Learning Principles, Information Visualization'
    }
  ];

  const skills = {
    'Languages': {
      'General Purpose': ['Java', 'Python', 'C', 'C++'],
      'Web Development': ['JavaScript', 'TypeScript', 'HTML/CSS'],
      'Query & Data': ['SQL', 'R']
    },
    'Frameworks & Libraries': {
      'Frontend': ['React', 'Redux', 'JavaFX', 'Three.js', 'React Three Fiber'],
      'Backend': ['Node.js', 'Express.js', 'Spring Boot', 'FastAPI', 'Flask', 'Django'],
      'Testing': ['JUnit']
    },
    'AI & Machine Learning': {
      'ML Frameworks': ['TensorFlow', 'PyTorch', 'Keras', 'Scikit-Learn'],
      'LLM & NLP': ['OpenAI', 'LangChain', 'Hugging Face', 'OpenAI Whisper', 'Tesseract.js'],
      'Data Processing': ['Pandas', 'NumPy'],
      'Vector & Graph DBs': ['ChromaDB', 'Neo4j']
    },
    'DevOps & Tools': {
      'Version Control': ['Git', 'GitHub'],
      'Containerization & CI/CD': ['Docker/Docker Compose', 'Kubernetes', 'Jenkins'],
      'IDEs & Editors': ['IntelliJ IDEA', 'Android Studio', 'VS Code', 'RStudio'],
      'API & Testing': ['Postman', 'REST APIs'],
      'Data Visualization': ['Tableau', 'Power BI'],
      'Other': ['MATLAB', 'Apache Tomcat']
    },
    'Cloud & Databases': {
      'Cloud Platforms': ['AWS', 'GCP', 'Azure'],
      'SQL Databases': ['MySQL', 'PostgreSQL', 'SQL Server', 'SQLite'],
      'NoSQL Databases': ['MongoDB', 'DynamoDB']
    }
  };

  return (
    <section id="resume" className="py-20 px-4 relative bg-slate-900/80 md:bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Credentials</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            My resume, educational background, and technical skills.
          </p>
          
          <MagneticButton strength={0.3}>
            <Button
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-3"
              onClick={() => {
                try {
                  const link = document.createElement('a');
                  link.href = '/Vivek_Sai_Manthri_Resume.pdf';
                  link.download = 'Vivek_Sai_Manthri_Resume.pdf';
                  link.target = '_blank';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                } catch (error) {
                  console.error('Download failed:', error);
                  // Fallback: open in new tab
                  window.open('/Vivek_Sai_Manthri_Resume.pdf', '_blank');
                }
              }}
            >
              <Download className="mr-2" size={20} />
              Download Resume
            </Button>
          </MagneticButton>
        </div>

        {/* Education Section */}
        <div className="mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            <span className="gradient-text">Education</span>
          </h3>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <Card key={index} className="glass dark:glass-dark border-white/10 w-full">
                <CardContent className="p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">{edu.degree}</h4>
                      <p className="text-purple-400 font-medium">{edu.school}</p>
                    </div>
                    <Badge variant="secondary" className="w-fit">{edu.period}</Badge>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{edu.focus}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            <span className="gradient-text">Technical Skills</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {Object.entries(skills).map(([category, subcategories], index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <TiltCard tiltStrength={8} glareEnable={true}>
                  <Card className="glass dark:glass-dark border-white/10 h-full hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
                    <CardHeader>
                      <h4 className="text-lg font-semibold text-white">{category}</h4>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(subcategories).map(([subCategory, skillList]) => (
                        <div key={subCategory}>
                          <p className="text-sm text-cyan-400 mb-2 font-medium">{subCategory}</p>
                          <div className="flex flex-wrap gap-2">
                            {skillList.map((skill) => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className="bg-white/10 text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors text-xs cursor-default"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            <span className="gradient-text">Certifications</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="glass dark:glass-dark border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-4">
                      <Award size={28} className="text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">{cert.title}</h4>
                    <p className="text-gray-400 text-sm mb-4">{cert.issuer}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20"
                      onClick={() => window.open(cert.file, '_blank')}
                    >
                      <ExternalLink size={14} className="mr-2" />
                      View Certificate
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;