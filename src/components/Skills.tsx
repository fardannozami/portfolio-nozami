import React from 'react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Backend Technologies',
      skills: [
        { name: 'Node.js', level: 'Intermediate' },
        { name: 'PHP', level: 'Intermediate' },
        { name: 'Express.js', level: 'Intermediate' },
        { name: 'Laravel', level: 'Intermediate' },
        { name: 'REST APIs', level: 'Expert' },
        { name: 'Python', level: 'Beginner' }
      ]
    },
    {
      title: 'Frontend Technologies',
      skills: [
        { name: 'JavaScript', level: 'Intermediate' },
        { name: 'React', level: 'Intermediate' },
        { name: 'TypeScript', level: 'Intermediate' },
        { name: 'Tailwind CSS', level: 'Beginner' }
      ]
    },
    {
      title: 'Database',
      skills: [
        { name: 'MySQL', level: 'Intermediate' },
        { name: 'PostgreSQL', level: 'Intermediate' },
        { name: 'MongoDB', level: 'Beginner' },
      ]
    },
    {
      title: 'DevOps',
      skills: [
        { name: 'Docker', level: 'Intermediate' },
        { name: 'Git', level: 'Expert' },
        { name: 'AWS', level: 'Intermediate' }
      ]
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Technical <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Skills</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-6">
                <h3 className="text-2xl font-semibold text-blue-400 mb-6">{category.title}</h3>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                          skill.level === 'Expert' ? 'bg-green-500/20 text-green-400' : 
                          skill.level === 'Intermediate' ? 'bg-blue-500/20 text-blue-400' : 
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>{skill.level}</span>
                      </div>
                      
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg ${
                            skill.level === 'Expert' ? 'bg-green-500 w-full group-hover:shadow-green-500/50' : 
                            skill.level === 'Intermediate' ? 'bg-blue-500 w-3/4 group-hover:shadow-blue-500/50' : 
                            'bg-yellow-500 w-1/2 group-hover:shadow-yellow-500/50'
                          }`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;