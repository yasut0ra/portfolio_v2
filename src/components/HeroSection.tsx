import React from 'react';
import { Github as GitHub, Linkedin, Mail, ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-teal-200 dark:bg-teal-900/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            <span className="block">Hello, I'm</span>
            <span className="block mt-2 text-blue-600 dark:text-blue-400">Your Name</span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-8">
            <span className="typing-text">Full Stack Developer</span>
          </h2>
          
          <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-400 text-lg mb-10">
            Passionate about creating beautiful, functional, and user-friendly applications that solve real-world problems.
          </p>
          
          <div className="flex justify-center space-x-4 mb-12">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <GitHub className="h-6 w-6 text-gray-800 dark:text-white" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <Linkedin className="h-6 w-6 text-gray-800 dark:text-white" />
            </a>
            <a href="mailto:your-email@example.com" className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <Mail className="h-6 w-6 text-gray-800 dark:text-white" />
            </a>
          </div>
          
          <button 
            onClick={scrollToNextSection} 
            className="animate-bounce bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:shadow-lg"
          >
            <ArrowDown className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;