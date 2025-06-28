import React from 'react';
import { Code, Database, Server, Zap } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    {
      icon: <Code size={24} />,
      title: 'Frontend Development',
      description: 'Building responsive and interactive user interfaces with modern frameworks'
    },
    {
      icon: <Database size={24} />,
      title: 'Backend Development',
      description: 'Creating robust server-side applications and APIs'
    },
    {
      icon: <Server size={24} />,
      title: 'Full-Stack Solutions',
      description: 'End-to-end web application development and deployment'
    },
    {
      icon: <Zap size={24} />,
      title: 'Performance',
      description: 'Optimizing applications for speed and user experience'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            About <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Me</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate backend web developer with experience in building scalable, efficient, and secure web applications. I specialize in designing robust APIs, managing databases, and implementing server-side logic with a strong emphasis on performance and clean architecture.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                While my core expertise lies in backend development, I also have experience in frontend technologies, enabling me to collaborate effectively across the full stack and ensure seamless integration between frontend and backend components. I enjoy solving complex challenges and building systems that are both powerful and maintainable.
              </p>
              
              <div className="flex flex-wrap gap-3 mt-6">
                {['JavaScript', 'React', 'Node.js', 'PHP', 'MySQL', 'Git'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors duration-300 group"
                >
                  <div className="text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;