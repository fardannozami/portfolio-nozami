import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const Experience: React.FC = () => {
  const experiences = [
    {
      title: 'Web Developer',
      company: 'Freelance',
      location: 'Remote',
      period: '2023 - Present',
      description: 'Working as a freelance web developer, creating custom websites and web applications for various clients. Specializing in modern web technologies and responsive design.',
      achievements: [
        'Developed 15+ responsive websites for small to medium businesses',
        'Implemented modern UI/UX designs with high client satisfaction',
        'Optimized website performance resulting in 40% faster load times',
        'Integrated payment systems and e-commerce functionality'
      ]
    },
    {
      title: 'Frontend Developer',
      company: 'Tech Startup',
      location: 'Jakarta, Indonesia',
      period: '2022 - 2023',
      description: 'Contributed to the development of web applications using React and modern frontend technologies. Collaborated with design and backend teams to deliver high-quality user experiences.',
      achievements: [
        'Built responsive web applications using React and TypeScript',
        'Collaborated with UI/UX designers to implement pixel-perfect designs',
        'Improved application performance by 30% through code optimization',
        'Mentored junior developers and conducted code reviews'
      ]
    },
    {
      title: 'Junior Web Developer',
      company: 'Digital Agency',
      location: 'Bandung, Indonesia',
      period: '2021 - 2022',
      description: 'Started my professional journey as a junior web developer, learning modern web development practices and contributing to various client projects.',
      achievements: [
        'Developed and maintained client websites using HTML, CSS, and JavaScript',
        'Learned and implemented responsive design principles',
        'Collaborated with senior developers on larger projects',
        'Gained experience with version control and agile development practices'
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Work <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Experience</span>
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>
            
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-gray-950 z-10"></div>
                  
                  {/* Content */}
                  <div className="ml-20 bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group w-full">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                          {exp.title}
                        </h3>
                        <div className="flex items-center text-blue-400 font-semibold mb-2">
                          <Briefcase size={16} className="mr-2" />
                          {exp.company}
                        </div>
                      </div>
                      
                      <div className="flex flex-col lg:items-end space-y-1">
                        <div className="flex items-center text-gray-400">
                          <Calendar size={16} className="mr-2" />
                          {exp.period}
                        </div>
                        <div className="flex items-center text-gray-400">
                          <MapPin size={16} className="mr-2" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {exp.description}
                    </p>
                    
                    <div>
                      <h4 className="text-blue-400 font-semibold mb-3">Key Achievements</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="text-gray-300 flex items-start">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;