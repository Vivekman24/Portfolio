'use client';

import { Brain, Code2, Rocket, Users, MessageSquare, Lightbulb, Clock, Target, Handshake, Zap } from 'lucide-react';

const About = () => {
  const skills = [
    {
      icon: Code2,
      title: 'Full-Stack Development',
      description: 'Expert in React, TypeScript, Node.js, FastAPI, and modern web technologies',
      color: 'from-blue-500 to-blue-500'
    },
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Specialized in TensorFlow, PyTorch, Keras, Scikit-learn, and building intelligent applications',
      color: 'from-blue-500 to-blue-500'
    },
    {
      icon: Rocket,
      title: 'Cloud & DevOps',
      description: 'Experience with AWS, Docker, Kubernetes, and CI/CD pipelines for scalable deployments',
      color: 'from-blue-500 to-blue-500'
    },
    {
      icon: Users,
      title: 'Data Science',
      description: 'Strong background in statistical analysis, data visualization, and machine learning principles',
      color: 'from-blue-500 to-blue-500'
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
    <section id="about" className="concept-section concept-about px-6">
      <div className="studio-container">
        <p className="studio-eyebrow mb-5">01 / ABOUT</p>
        <div className="concept-about-layout">
          <div>
            <h2 className="studio-heading mb-8">The person<br /><span className="studio-accent">behind the code.</span></h2>
            <div className="concept-identity-panel about-identity"><span className="studio-eyebrow">THE PERSON BEHIND THE WORK</span><strong>Curiosity.<br />Craft.<br /><span>Connection.</span></strong><div className="about-identity-caption"><span>Vivek Sai Manthri</span><span>Rutgers · Computer Science</span></div></div>
          </div>
          <div className="concept-story">
            <p className="studio-eyebrow mb-5">CURIOSITY DRIVES BETTER SOLUTIONS</p>
            <p className="text-lg leading-relaxed text-slate-300">I&apos;m a passionate developer and AI enthusiast with a B.S. in Computer Science and Data Science from Rutgers University, currently pursuing my M.S. in Computer Science with a concentration in AI/ML. My work blends software engineering and AI to build practical solutions that improve how people interact with software.</p>
            <div className="concept-story-notes">
              <div><h3>My Journey</h3><p>Currently pursuing my Master&apos;s in Computer Science at Rutgers University, I&apos;ve developed a strong foundation in both theoretical and practical aspects of software engineering/development and artificial intelligence.</p></div>
              <div><h3>What I Build</h3><p>My experience spans from not only my academic work, but also the previous internships that I have completed. I specialize in creating intelligent applications that can understand, learn, and adapt to user needs.</p></div>
            </div>
            <p className="mt-7 text-sm leading-relaxed text-slate-400">When I&apos;m not coding, you&apos;ll find me exploring the latest AI research papers, contributing to open-source projects, or working on personal projects that combine my passion for technology and innovation. I also enjoy staying active by working out, playing sports; and also relax by watching TV or playing video games.</p>
          </div>
        </div>
        <div className="concept-subheading"><p className="studio-eyebrow">AREAS OF EXPERTISE</p><a href="#resume" className="studio-project-link text-xs">Explore my toolkit →</a></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{skills.map(skill=>{const Icon=skill.icon;return <article key={skill.title} className="concept-panel p-6"><Icon className="mb-5 text-blue-300" size={30} strokeWidth={1.4}/><h3 className="text-lg mb-3 text-white">{skill.title}</h3><p className="text-sm leading-relaxed text-slate-400">{skill.description}</p></article>;})}</div>
        <div className="concept-soft-skills"><span className="studio-eyebrow">HOW I WORK</span>{softSkills.map(skill=>{const Icon=skill.icon;return <div key={skill.title} title={skill.description}><Icon size={16}/><span>{skill.title}</span></div>;})}</div>
      </div>
    </section>
  );
};
export default About;
