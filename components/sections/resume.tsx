'use client';

import { certifications } from '@/lib/portfolio-data';


import { skills } from '@/lib/portfolio-data';


import { education } from '@/lib/portfolio-data';


import { Download, Award, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import EngineeringToolkit from '@/components/engineering-toolkit';

const Resume = () => {







  return (
    <section id="resume" className="concept-section concept-toolkit px-6"><div className="studio-container"><header className="concept-resume-header"><div><p className="studio-eyebrow mb-4">04 / EDUCATION & TOOLKIT</p><h2 className="studio-heading">Learning deeply.<br /><span className="studio-accent">Building meaningfully.</span></h2><p className="mt-5 text-sm text-slate-400">My resume, educational background, and technical skills.</p></div><a href="/Vivek_Sai_Manthri_Resume.pdf" target="_blank" rel="noopener noreferrer" className="studio-button studio-button-secondary"><Download size={17}/>View résumé</a></header>
      <div className="concept-subheading"><h3 className="text-2xl text-white">Education</h3><span className="studio-eyebrow">A STRONG FOUNDATION</span></div><div className="grid gap-5 md:grid-cols-2">{education.map((edu,index)=><article key={edu.degree} className="concept-panel concept-degree"><div className="degree-brand-row"><div className="rutgers-brand"><Image src="/images/brands/rutgers.png" alt="Rutgers — The State University of New Jersey" width={650} height={104}/></div><span className="text-xs text-slate-400">{edu.period}</span></div><p className="degree-level studio-eyebrow">{index === 0 ? 'GRADUATE STUDIES' : 'UNDERGRADUATE FOUNDATION'}</p><h4 className="text-2xl leading-tight text-white mt-3 mb-3">{edu.degree}</h4><p className="text-sm text-blue-300">{edu.school}</p><p className="studio-eyebrow mt-6 mb-3">COURSEWORK</p><div className="studio-tags">{edu.focus.split(', ').map(course=><span key={course}>{course}</span>)}</div></article>)}</div>
      <EngineeringToolkit skills={skills} />
      <div className="mt-8">{certifications.map(cert=><article key={cert.title} className="concept-panel concept-certificate"><div className="flex items-center gap-5"><Award size={30} strokeWidth={1.4} className="text-blue-300 shrink-0"/><div><p className="studio-eyebrow mb-2">CERTIFICATION</p><h3 className="text-lg text-white">{cert.title}</h3><p className="text-xs mt-2 text-slate-400">{cert.issuer}</p></div></div><a href={cert.file} target="_blank" rel="noopener noreferrer" className="studio-button studio-button-secondary">View certificate<ExternalLink size={16}/></a></article>)}</div>
    </div></section>
  );
};
export default Resume;
