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
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-white dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-[2px] z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200/50 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200/50 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200/50 dark:bg-pink-900/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-40 right-20 w-64 h-64 bg-teal-200/50 dark:bg-teal-900/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-70 animate-blob animation-delay-6000"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            <span className="block">Hello, I'm</span>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Yasut0ra</span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-8">
            <span className="typing-text">Full Stack Developer</span>
          </h2>
          
          <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-400 text-lg mb-10 relative">
          現実の課題を解決する、<br/>
          美しく・機能的で・ユーザーフレンドリーなアプリケーションを開発することに情熱を注いでいます。<br/>
          現在は 推薦システム × バンディットアルゴリズム の研究に取り組んでおり、<br/>
          将来は AI開発のリーダー を目指しています。
          </p>
          
          <div className="flex justify-center space-x-4 mb-12">
            <a href="https://github.com/yasut0ra" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <GitHub className="h-6 w-6 text-gray-800 dark:text-white" />
            </a>
            <a href="https://www.linkedin.com/in/takuma-yasuda-7a332533b/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <Linkedin className="h-6 w-6 text-gray-800 dark:text-white" />
            </a>
            <a href="mailto:yastar.tkm83@gmail.com" className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <Mail className="h-6 w-6 text-gray-800 dark:text-white" />
            </a>
          </div>
          
          <button 
            onClick={scrollToNextSection} 
            className="animate-bounce bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:shadow-lg"
          >
            <ArrowDown className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;