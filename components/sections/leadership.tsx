'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Calendar, MapPin, BookOpen, Building } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Leadership = () => {
  const volunteerExperiences = [
    {
      title: 'Student Volunteer',
      organization: 'South Brunswick Public Library',
      location: 'South Brunswick, NJ',
      period: 'Jun 2020 – Sep 2021',
      duration: '1 yr 4 mos',
      category: 'Education',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      description: [
        'Assigned jobs to juniors and led/helped them with their work',
        'Organized 5+ community events and helped with several book sale events',
        'Shelved and rearranged books around the library'
      ]
    },
    {
      title: 'Volunteer Staff',
      organization: 'Durga Temple',
      location: 'South Brunswick, NJ',
      period: 'Jun 2019 – Sep 2021',
      duration: '2 yrs 4 mos',
      category: 'Arts and Culture',
      icon: Building,
      color: 'from-purple-500 to-pink-500',
      description: [
        'Helped with the preparation and distribution of food',
        'Assisted junior volunteers set up food donations for priests',
        'Cleaning and sanitization of the lobby',
        'Arranged special event halls and helped move temple equipment'
      ]
    }
  ];

  return (
    <section id="leadership" className="py-20 px-4 relative bg-slate-900/80 md:bg-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-6">
            <Heart size={18} className="text-pink-400" />
            <span className="text-sm text-purple-300 font-medium">Community Impact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Leadership & Volunteering</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Giving back to the community through leadership roles and volunteer work, 
            developing teamwork and organizational skills beyond the classroom.
          </p>
        </motion.div>

        {/* Volunteer Experiences */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {volunteerExperiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="glass dark:glass-dark border-white/10 h-full transition-all duration-300 group-hover:border-purple-500/30 group-hover:shadow-lg group-hover:shadow-purple-500/10">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${exp.color} shadow-lg`}>
                        <Icon size={24} className="text-white" />
                      </div>
                      <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                        {exp.category}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-lg font-semibold text-purple-400">{exp.organization}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-white/70 md:text-gray-400">
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          <span>{exp.duration}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3">
                      {exp.description.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 + itemIndex * 0.05 }}
                          viewport={{ once: true }}
                          className="flex items-start space-x-3"
                        >
                          <span className="text-purple-400 mt-1.5 text-sm">▹</span>
                          <span className="text-white/85 md:text-gray-300 text-sm leading-relaxed">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="glass dark:glass-dark border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-purple-500/5" />
            <CardContent className="relative p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { value: '3+', label: 'Years Volunteering' },
                  { value: '5+', label: 'Events Organized' },
                  { value: '2', label: 'Organizations' },
                  { value: '100+', label: 'Community Members Helped' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <p className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</p>
                    <p className="text-sm text-white/70 md:text-gray-400">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Leadership;

