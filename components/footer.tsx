'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Code2 } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Credentials', id: 'resume' },
    { label: 'Contact', id: 'contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Vivekman24', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/vivek-sai-manthri', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:manthrivivek@gmail.com', label: 'Email' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 72;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="relative py-16 px-4 border-t border-cyan-500/20 bg-slate-950 isolate">
      {/* Solid dark background to block gradient mesh */}
      <div className="absolute inset-0 bg-slate-950 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/95 to-slate-900 -z-10" />
      
      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500">
                <Code2 size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">Vivek Sai Manthri</span>
            </div>
            <p className="text-white/80 md:text-gray-400 text-sm leading-relaxed">
              Full-Stack Developer & AI Enthusiast building innovative solutions 
              that blend cutting-edge technology with practical applications.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-2 rounded-lg bg-white/5 text-white/80 md:text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-white/80 md:text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center space-x-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all duration-300" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">Get In Touch</h3>
            <div className="space-y-3 text-sm text-white/80 md:text-gray-400">
              <p>📍 South Brunswick, NJ</p>
              <p>📧 manthrivivek@gmail.com</p>
              <p>📱 +1 (248) 759-7187</p>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                Open to Opportunities
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10 flex items-center justify-center"
        >
          <p className="text-white/70 md:text-gray-400 text-sm">
            © {currentYear} Vivek Sai Manthri. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

