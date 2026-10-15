'use client';

import { projects } from '@/lib/portfolio-data';
import ProjectWalkthrough from '@/components/project-walkthrough';


import { ArrowUpRight, Github } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';



function ProjectDetails({ project }: { project: typeof projects[number] }) {
  return <Dialog><DialogTrigger asChild><button className="studio-project-link" type="button">Explore project <ArrowUpRight size={17} /></button></DialogTrigger><DialogContent className="studio-dialog max-h-[85vh] w-[calc(100%_-_2rem)] max-w-2xl overflow-y-auto"><p className="studio-eyebrow">{project.category}</p><DialogTitle className="text-3xl text-stone-100">{project.title}</DialogTitle><DialogDescription className="text-slate-400">{project.description}</DialogDescription><ProjectWalkthrough kind={project.title === 'Online Auction System' ? 'auction' : 'cafe'} />{[['The problem', project.problem], ['The approach', project.approach]].map(([label, content]) => <div key={label} className="mt-3"><h3 className="mb-2 text-lg text-stone-100">{label}</h3><p className="text-sm leading-relaxed text-slate-400">{content}</p></div>)}<div className="mt-3"><h3 className="mb-3 text-lg text-stone-100">The result</h3><ul className="space-y-2 text-sm text-slate-300">{project.results.map(result => <li key={result}>→ {result}</li>)}</ul></div><div className="studio-tags mt-4">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>{project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="studio-project-link mt-4"><Github size={16} /> View source <ArrowUpRight size={16} /></a>}</DialogContent></Dialog>;
}

function Preview({ kind }: { kind: number }) {
  return <div className="soft-project-preview" style={{ backgroundImage: `url(/images/${kind === 1 ? 'auction' : 'cafe'}.png)` }} role="img" aria-label={kind === 1 ? 'Concept illustration of a blue auction gavel' : 'Concept illustration of a cafe ordering app'}><span className="soft-preview-caption">CONCEPT ILLUSTRATION / 0{kind}</span></div>;
}

export default function Projects() {
  return <section id="projects" className="studio-projects px-6 py-12 md:py-14"><div className="studio-container"><div className="text-center mb-12"><p className="studio-eyebrow mb-4">03 / PERSONAL PROJECTS</p><h2 className="studio-heading mb-6">Projects</h2></div><div className="mb-8 flex flex-wrap items-end justify-between gap-6"><div><h3 className="text-2xl md:text-3xl tracking-tight text-stone-100">Ideas made <span className="studio-accent">real.</span></h3></div><p className="max-w-sm text-sm leading-relaxed text-slate-400">Full-stack platforms and mobile experiences. A closer look at what I build and how I approach it.</p></div><div className="mt-6 grid gap-6 md:grid-cols-2">{projects.map((project, index) => <article key={project.title} className="studio-project flex flex-col"><Preview kind={index + 1} /><div className="studio-project-body flex flex-1 flex-col"><p className="studio-eyebrow">{project.category}</p><h3 className="mt-4 text-2xl text-stone-100">{project.title}</h3><p className="mb-5 mt-3 text-sm leading-relaxed text-slate-400">{project.description}</p><div className="studio-tags mb-6">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div><div className="mt-auto flex flex-wrap items-center justify-between gap-4"><ProjectDetails project={project} />{project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="studio-social text-sm text-slate-400"><Github size={16} /> Source <ArrowUpRight size={14} /></a>}</div></div></article>)}</div></div></section>;
}
