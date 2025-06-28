import React from 'react';
import { ExternalLink, Github, Server, Database, Shield } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'E-Commerce Web Application',
      description: 'Full-stack e-commerce platform with user authentication, product management, shopping cart, and payment integration. Built with modern web technologies.',
      technologies: ['React', 'Node.js', 'Express.js', 'MySQL', 'Stripe API', 'JWT'],
      features: ['User Authentication', 'Product Catalog', 'Shopping Cart', 'Payment Processing'],
      icon: <Server className="w-8 h-8" />,
      github: 'https://github.com/fardannozami',
      demo: 'https://ajitama.dev'
    },
    {
      title: 'Task Management System',
      description: 'Collaborative task management application with real-time updates, team collaboration features, and project tracking capabilities.',
      technologies: ['React', 'PHP', 'Laravel', 'MySQL', 'WebSocket', 'Bootstrap'],
      features: ['Real-time Updates', 'Team Collaboration', 'Project Tracking', 'File Sharing'],
      icon: <Database className="w-8 h-8" />,
      github: 'https://github.com/fardannozami',
      demo: 'https://ajitama.dev'
    },
    {
      title: 'Portfolio Website',
      description: 'Responsive portfolio website showcasing projects and skills with modern design, smooth animations, and optimized performance.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'],
      features: ['Responsive Design', 'Smooth Animations', 'SEO Optimized', 'Fast Loading'],
      icon: <Shield className="w-8 h-8" />,
      github: 'https://github.com/fardannozami',
      demo: 'https://ajitama.dev'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Featured <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          
          <div className="grid gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 overflow-hidden group"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-600/20 rounded-lg text-blue-400 group-hover:scale-110 transition-transform duration-300">
                        {project.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    </div>
                    
                    <div className="flex space-x-3">
                      <a
                        href={project.github}
                        className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-300 group"
                      >
                        <Github size={20} className="group-hover:scale-110 transition-transform duration-300" />
                      </a>
                      <a
                        href={project.demo}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-300 group"
                      >
                        <ExternalLink size={20} className="group-hover:scale-110 transition-transform duration-300" />
                      </a>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-blue-400 font-semibold mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm border border-gray-600"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-blue-400 font-semibold mb-3">Key Features</h4>
                      <ul className="space-y-1">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-gray-300 text-sm flex items-center">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;