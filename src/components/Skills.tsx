import React from 'react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Frontend Technologies',
      skills: [
        { name: 'JavaScript', level: 90 },
        { name: 'React', level: 85 },
        { name: 'HTML5', level: 95 },
        { name: 'CSS3', level: 90 },
        { name: 'Tailwind CSS', level: 85 },
        { name: 'Bootstrap', level: 80 }
      ]
    },
    {
      title: 'Backend Technologies',
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'PHP', level: 85 },
        { name: 'Express.js', level: 75 },
        { name: 'Laravel', level: 70 },
        { name: 'REST APIs', level: 85 },
        { name: 'GraphQL', level: 65 }
      ]
    },
    {
      title: 'Database & Tools',
      skills: [
        { name: 'MySQL', level: 85 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'MongoDB', level: 70 },
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 65 },
        { name: 'AWS', level: 60 }
      ]
    },
    {
      title: 'Design & Others',
      skills: [
        { name: 'Figma', level: 75 },
        { name: 'Adobe XD', level: 70 },
        { name: 'Responsive Design', level: 90 },
        { name: 'UI/UX Design', level: 80 },
        { name: 'Testing', level: 75 },
        { name: 'Agile/Scrum', level: 80 }
      ]
    }
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
                        <span className="text-gray-400 text-sm">{skill.level}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg group-hover:shadow-blue-500/50"
                          style={{ width: `${skill.level}%` }}
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