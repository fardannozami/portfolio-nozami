import React from 'react';
import { ArrowDown, Github, Linkedin, Mail, Youtube } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              Fardan Nozami
            </span>
            <br />
            <span className="text-white">Ajitama</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
           Web Developer specializing in backend development, scalable system design, and API architecture — with additional experience in modern frontend technologies to support seamless full-stack solutions.
          </p>
          
          <div className="flex justify-center space-x-6 mt-8">
            <a
              href="mailto:fardan.nozami@example.com"
              className="p-3 bg-gray-800 hover:bg-gray-700  rounded-full transition-colors duration-300 group"
              target='blank'
            >
              <Mail size={24} className="group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a
              href="https://github.com/fardannozami"
              className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors duration-300 group"
              target='blank'
            >
              <Github size={24} className="group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a
              href="https://www.linkedin.com/in/cah-bantul"
              className="p-3 bg-gray-800 hover:bg-gray-700  rounded-full transition-colors duration-300 group"
              target='blank'
            >
              <Linkedin size={24} className="group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a
              href="http://youtube.com/@programmertelo"
              className="p-3 bg-gray-800 hover:bg-gray-700  rounded-full transition-colors duration-300 group"
              target='blank'
            >
              <Youtube size={24} className="group-hover:scale-110 transition-transform duration-300" />
            </a>
          </div>
          
          <button
            onClick={scrollToAbout}
            className="mt-12 animate-bounce inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300"
          >
            <ArrowDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;