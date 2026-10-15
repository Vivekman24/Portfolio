import { z } from 'zod';
import { portfolio } from './portfolio-data';

export const MAX_MESSAGE_LENGTH = 1200;
export const MAX_HISTORY = 12;
export const chatRequestSchema = z.object({
  message: z.string().trim().min(1).max(MAX_MESSAGE_LENGTH),
  history: z.array(z.object({ role: z.enum(['user', 'assistant']), content: z.string().trim().min(1).max(10000) }).strict()).max(MAX_HISTORY).default([]),
}).strict().refine(value => value.history.reduce((sum, turn) => sum + turn.content.length, 0) <= 24000, 'Conversation is too long');
export type ChatTurn = { role: 'user' | 'assistant'; content: string };
export type ChatLink = { label: string; href: string };
export type ChatAnswer = { response: string; links: ChatLink[]; mode: 'ai' | 'portfolio'; context: string };

type Topic = 'experience' | 'projects' | 'education' | 'skills' | 'leadership' | 'certifications' | 'interests' | 'contact' | 'resume' | 'overview' | 'strengths';
const sectionLinks: Record<Topic, ChatLink> = {
  experience: { label: 'Experience', href: '#experience' }, projects: { label: 'Personal projects', href: '#projects' },
  education: { label: 'Education', href: '#resume' }, skills: { label: 'Engineering toolkit', href: '#resume' },
  leadership: { label: 'Volunteering', href: '#leadership' }, certifications: { label: 'Certifications', href: '#resume' },
  interests: { label: 'Beyond the code', href: '#interests' }, contact: { label: 'Contact Vivek', href: '#contact' },
  resume: { label: 'View résumé', href: portfolio.personal.resume }, overview: { label: 'About Vivek', href: '#about' }, strengths: { label: 'Experience', href: '#experience' },
};
const aliases = [
  { pattern: /\b(regeneron|filepilot|draftpilot|ssu|clinical study start[ -]?up)\b/i, kind: 'experience', index: 0 },
  { pattern: /\b(gogentic|neurovault|ai memory)\b/i, kind: 'experience', index: 1 },
  { pattern: /\b(aroopa)\b/i, kind: 'experience', index: 2 },
  { pattern: /\b(msk|memorial|sloan kettering)\b/i, kind: 'experience', index: 3 },
  { pattern: /\b(auction|bidding)\b/i, kind: 'projects', index: 0 },
  { pattern: /\b(caf[eé]|bliss)\b/i, kind: 'projects', index: 1 },
] as const;
const skillList = Array.from(new Set(Object.values(portfolio.skills).flatMap(group => Object.values(group).flat())));
const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const matchingSkills = (text: string) => skillList.filter(skill => new RegExp(`(^|[^a-z0-9])${escapeRegex(skill)}(?=$|[^a-z0-9+])`, 'i').test(text));
const matchingEntities = (text: string) => aliases.filter(alias => alias.pattern.test(text));

function topicsFor(text: string): Topic[] {
  const topics: Topic[] = [];
  if (/\b(why hire|why should|strengths?|stand out|good fit|suitable|what makes)\b/i.test(text)) topics.push('strengths');
  if (/\b(personal projects?|projects?|built|builds?|applications?)\b/i.test(text)) topics.push('projects');
  if (/\b(education|courses?|coursework|degrees?|study|studies|studying|rutgers|graduate|graduation|school|masters?|bachelors?|m\.s|b\.s)\b/i.test(text)) topics.push('education');
  if (/\b(skills?|toolkit|technolog(?:y|ies)|languages?|frameworks?|frontend|backend|devops|cloud|databases?|ai\/ml|machine learning)\b/i.test(text)) topics.push('skills');
  if (/\b(experience|internships?|companies|work history|jobs?|career)\b/i.test(text)) topics.push('experience');
  if (/\b(volunteer(?:ing)?|leadership|library|temple|community)\b/i.test(text)) topics.push('leadership');
  if (/\b(certifications?|certificates?|context engineering)\b/i.test(text)) topics.push('certifications');
  if (/\b(hobb(?:y|ies)|interests|fun|free time|outside|basketball|coffee|fitness|gaming)\b/i.test(text)) topics.push('interests');
  if (/\b(contact|email|phone|reach|linkedin|github|location|based|live)\b/i.test(text)) topics.push('contact');
  if (/\b(resume|résumé|cv)\b/i.test(text)) topics.push('resume');
  if (/\b(who is vivek|about vivek|introduce vivek|background|overview|tell me about him)\b/i.test(text)) topics.push('overview');
  return topics;
}

export function buildLocalAnswer(message: string, history: ChatTurn[] = []): ChatAnswer {
  const answer = (response: string, topics: Topic[], context = response): ChatAnswer => ({ response, mode: 'portfolio', links: Array.from(new Map(topics.map(topic => [sectionLinks[topic].href, sectionLinks[topic]])).values()), context });
  if (/\b(salary|compensation|age|birthday|favorite|favourite|gpa|visa|sponsorship|citizenship|married|availability|available|start date)\b/i.test(message)) {
    return answer("That information isn’t listed in Vivek’s portfolio, so I can’t confirm it. You can ask him directly at " + portfolio.personal.email + '.', ['contact']);
  }
  if (/\b(ignore (?:all |previous )?instructions|system prompt|api key|secret|pretend|make up|invent)\b/i.test(message)) return answer('I can help with the public information in Vivek’s portfolio: his experience, personal projects, education, skills, and volunteering.', ['overview']);
  if (/\b(who are you|what are you|introduce yourself)\b/i.test(message)) return answer('I’m Vivek’s portfolio assistant. I answer questions using his listed experience, projects, skills, education, and volunteering.', ['overview']);
  if (/^(hi|hello|hey|yo|thanks|thank you|bye)[\s!.?]*$/i.test(message.trim())) return answer('Hi! Ask me about Vivek’s internships, personal projects, skills, education, or volunteering.', []);

  let entities = matchingEntities(message);
  let skillMatches = matchingSkills(message);
  let topics = topicsFor(message);
  const followUp = /\b(there|that|those|it|them|this|he|his)\b/i.test(message) || /^(what about|and |more|tell me more|shorter|summari[sz]e|compare)/i.test(message.trim());
  if (followUp && entities.length === 0 && skillMatches.length === 0) {
    for (const turn of history.slice().reverse()) {
      if (turn.role !== 'user') continue;
      const previousEntities = matchingEntities(turn.content);
      const previousSkills = matchingSkills(turn.content);
      const previousTopics = topicsFor(turn.content);
      if (previousEntities.length) { entities = previousEntities; break; }
      if (previousSkills.length) { skillMatches = previousSkills; break; }
      if (previousTopics.length) {
        if (previousTopics.includes('experience') && /\b(latest|recent|last)\b/i.test(turn.content)) entities = [aliases[0]];
        else if (!topics.length || /\b(there|that|it|them|more)\b/i.test(message)) topics = previousTopics;
        break;
      }
    }
  }
  if (entities.length) {
    const responses = entities.map(entity => {
      if (entity.kind === 'experience') {
        const exp = portfolio.experience[entity.index];
        const prefix = entity.index === 1 && /neurovault|personal/i.test(message) ? 'NeuroVault was internship work at Gogentic AI, not a personal project.\n\n' : '';
        let bullets = exp.description;
        if (/shorter|summari[sz]e|brief/i.test(message)) bullets = bullets.slice(0, 1);
        if (/\b(technolog(?:y|ies)|tools?|stack|languages?)\b/i.test(message)) {
          const tools = matchingSkills(exp.description.join(' '));
          if (entity.index === 0) tools.unshift('Microsoft Copilot Studio', 'Power Automate Agent Flows', 'M365', 'Jira', 'SharePoint');
          return `${prefix}${exp.company} — ${exp.title}\n${exp.period} · ${exp.location}\n\nTools mentioned in this internship: ${tools.join(', ')}.`;
        }
        return `${prefix}${exp.company} — ${exp.title}\n${exp.period} · ${exp.location}\n\n${bullets.map(text => '• ' + text).join('\n\n')}`;
      }
      const project = portfolio.projects[entity.index];
      return `${project.title} is a personal project. ${project.description}\n\nTechnologies: ${project.technologies.join(', ')}.\n\n${project.results.map(text => '• ' + text).join('\n')}`;
    });
    const entityTopics = entities.map(entity => entity.kind as Topic);
    const result = answer(responses.join('\n\n'), entityTopics);
    entities.filter(entity => entity.kind === 'projects').forEach(entity => { const project = portfolio.projects[entity.index]; if (project.github) result.links.push({ label: project.title + ' source', href: project.github }); });
    return result;
  }
  if (skillMatches.length) {
    const evidence = [...portfolio.experience.map(exp => ({ name: exp.company, text: exp.description.join(' ') })), ...portfolio.projects.map(project => ({ name: project.title, text: project.technologies.join(' ') }))];
    const text = skillMatches.map(skill => {
      const references = evidence.filter(item => matchingSkills(item.text).includes(skill)).map(item => item.name);
      return `${skill} is listed in Vivek’s toolkit.${references.length ? ' It appears in his work at/on ' + references.join(', ') + '.' : ''}`;
    }).join('\n\n');
    return answer(text, ['skills']);
  }
  if (/\b(latest|most recent|last|first|earliest)\b/i.test(message) && /internship|experience|job/i.test(message)) return buildLocalAnswer(/first|earliest/i.test(message) ? 'Tell me about MSK' : 'Tell me about Regeneron');
  if (/\b(how many|number of)\b/i.test(message) && /internship/i.test(message)) return answer(`Vivek lists ${portfolio.experience.length} internships: ${portfolio.experience.map(exp => exp.company).join(', ')}.`, ['experience']);
  if (/\b(why hire|why should|strengths?|good fit|stand out)\b/i.test(message)) topics = ['strengths'];
  if (!topics.length) return answer('I don’t have that information in the portfolio. I can help with Vivek’s experience, personal projects, education, skills, certifications, or volunteering. What would you like to explore?', ['overview']);

  const responses = topics.map(topic => {
    switch (topic) {
      case 'experience': return portfolio.experience.map(exp => `${exp.company}: ${exp.title} (${exp.period}), ${exp.location}.`).join('\n\n');
      case 'projects': return 'Vivek lists two personal projects:\n\n' + portfolio.projects.map(project => `• ${project.title}: ${project.description}\n  Technologies: ${project.technologies.join(', ')}`).join('\n\n') + '\n\nNeuroVault belongs to his Gogentic AI internship, rather than his personal projects.';
      case 'education': {
        const degrees = /\b(master|masters|graduate|m\.s|ms)\b/i.test(message) ? portfolio.education.slice(0, 1) : /\b(bachelor|bachelors|undergraduate|b\.s|bs)\b/i.test(message) ? portfolio.education.slice(1) : portfolio.education;
        return degrees.map(edu => `${edu.degree} — ${edu.school}\n${edu.period}\n\nCoursework: ${edu.focus}.`).join('\n\n');
      }
      case 'skills': {
        if (/\b(ai|ml|machine learning|llm|nlp)\b/i.test(message)) return Object.entries(portfolio.skills['AI & Machine Learning']).map(([label,list]) => label + ': ' + list.join(', ')).join('\n\n');
        if (/\b(frontend|front-end|front end)\b/i.test(message)) return 'Frontend: ' + portfolio.skills['Frameworks & Libraries'].Frontend.join(', ') + '.';
        if (/\b(backend|back-end|back end)\b/i.test(message)) return 'Backend: ' + portfolio.skills['Frameworks & Libraries'].Backend.join(', ') + '.';
        return Object.entries(portfolio.skills).map(([category, groups]) => category + ': ' + Object.values(groups).flat().join(', ')).join('\n\n');
      }
      case 'leadership': return portfolio.leadership.map(exp => `${exp.organization} — ${exp.title}\n${exp.period} · ${exp.location}\n${exp.description.map(text => '• ' + text).join('\n')}`).join('\n\n');
      case 'certifications': return portfolio.certifications.map(cert => `${cert.title} — ${cert.issuer}. You can view the certificate in Credentials.`).join('\n');
      case 'interests': return 'Outside coding, Vivek lists: ' + portfolio.interests.map(item => item.title + ' (' + item.description + ')').join('; ') + '.';
      case 'contact': return `${portfolio.personal.email}\n${portfolio.personal.phone}\n${portfolio.personal.location}\n\nLinkedIn: ${portfolio.personal.linkedin}\nGitHub: ${portfolio.personal.github}`;
      case 'resume': return 'Use the View résumé link to open Vivek’s résumé PDF. The portfolio sections contain his latest listed experience and coursework.';
      case 'strengths': return `Vivek combines software engineering with applied AI. His listed experience spans ${portfolio.experience.map(exp => exp.company).join(', ')}. At Regeneron, FilePilot saved 5+ hours daily, site intelligence report preparation time fell by 50%, and PQ DraftPilot accelerated script generation by 75%. His personal projects add full-stack and Android development experience. For availability or hiring details, contact him directly.`;
      default: return portfolio.personal.summary + '\n\nHis internships include ' + portfolio.experience.map(exp => exp.company).join(', ') + '. His personal projects are ' + portfolio.projects.map(project => project.title).join(' and ') + '.';
    }
  });
  const result = answer(responses.join('\n\n'), topics);
  if (topics.includes('contact')) result.links.push({label:'Email Vivek',href:'mailto:' + portfolio.personal.email},{label:'GitHub',href:portfolio.personal.github},{label:'LinkedIn',href:portfolio.personal.linkedin});
  if (topics.includes('certifications')) portfolio.certifications.forEach(cert => result.links.push({label:'View certificate',href:cert.file}));
  return result;
}
