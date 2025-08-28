import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const Experience: React.FC = () => {
  const experiences = [
    {
      title: 'Backend Developer',
      company: 'PT Digdaya Companies',
      location: 'Remote',
      period: '2023 - Present',
      description: 'At PT Digdaya Companies, I played a key role in developing and maintaining high-performance web applications as a Backend Developer. My expertise lies in Golang, Postgres database, and containerization using Docker. I was responsible for building scalable solutions, optimizing database performance, and ensuring seamless deployment of applications on AWS EC2 instances, contributing to efficient and reliable system operations. Additionally, I implemented CI/CD pipelines using GitHub Actions to automate testing and deployment, ensuring smooth and efficient software delivery.',
      achievements: [
        'Built and maintained scalable backend services using Golang',
        'Optimized Postgres queries and database structure for performance',
        'Containerized applications using Docker for consistency and portability',
        'Deployed and managed applications on AWS EC2 instances',
        'Implemented CI/CD pipelines with GitHub Actions for automated testing and deployment'
      ]
    },
    {
      title: 'Backend Developer',
      company: 'PT Inosoft',
      location: 'Remote',
      period: 'Aug 2022 - Aug 2023',
      description: 'I was responsible for developing and maintaining the backend of web applications using Laravel and MySQL. My role included designing and optimizing database structures, developing RESTful APIs for seamless integration with third-party services, and ensuring application performance and security. Additionally, I implemented bug fixes, added new features, and used Git for version control to manage code efficiently.',
      achievements: [
        'Developed and maintained backend systems using Laravel and MySQL',
        'Designed and optimized database schemas for performance and scalability',
        'Built RESTful APIs to integrate with third-party services',
        'Improved application performance and security through best practices',
        'Collaborated with team using Git for efficient version control and code management'
      ]
    },
    {
      title: 'Node.js Developer',
      company: 'PT Sambung Digital Indonesia',
      location: 'Remote',
      period: 'Jan 2022 - Dec 2022',
      description: 'I worked as a Node.js Developer, responsible for developing backend applications using Node.js with Express.js, PostgreSQL, and EJS for templating. I designed REST APIs for web services and managed the deployment of applications on AWS EC2 instances. Additionally, I provided technical support to the development team and assisted in debugging issues faced during product rollout.',
      achievements: [
        'Developed backend applications using Node.js, Express.js, PostgreSQL, and EJS',
        'Designed and implemented REST APIs for scalable web services',
        'Managed application deployment on AWS EC2 instances',
        'Provided technical support and debugging during product rollout',
        'Enhanced expertise in backend development and cloud deployment practices'
      ]
    },


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