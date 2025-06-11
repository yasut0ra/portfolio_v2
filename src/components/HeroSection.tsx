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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white to-purple-50/90 dark:from-gray-900/95 dark:via-gray-800/95 dark:to-blue-900/95 backdrop-blur-sm z-0"></div>
      
      {/* Enhanced animated background elements */}
      <div className="absolute top-32 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/60 to-cyan-200/60 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-80 animate-blob"></div>
      <div className="absolute top-52 right-10 w-80 h-80 bg-gradient-to-r from-purple-200/60 to-pink-200/60 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-80 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-8 left-20 w-80 h-80 bg-gradient-to-r from-pink-200/60 to-rose-200/60 dark:from-pink-900/30 dark:to-rose-900/30 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-80 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-52 right-20 w-72 h-72 bg-gradient-to-r from-teal-200/60 to-emerald-200/60 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-80 animate-blob animation-delay-6000"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
              <span className="block mb-2">Hello, I'm</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-300 animate-pulse">
                Yasut0ra
              </span>
            </h1>
            
            <div className="h-16 flex items-center justify-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-700 dark:text-gray-300 font-medium">
                <span className="typing-text">Full Stack Developer</span>
              </h2>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl leading-relaxed">
              現実の課題を解決する、<br className="sm:hidden" />
              <span className="font-semibold text-gray-800 dark:text-gray-200">美しく・機能的で・ユーザーフレンドリー</span>なアプリケーションを開発することに情熱を注いでいます。<br />
              現在は <span className="font-semibold text-blue-600 dark:text-blue-400">推薦システム × バンディットアルゴリズム</span> の研究に取り組んでおり、<br />
              将来は <span className="font-semibold text-purple-600 dark:text-purple-400">AI開発のリーダー</span> を目指しています。
            </p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-16">
            <a 
              href="https://github.com/yasut0ra" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
            >
              <GitHub className="h-7 w-7 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
            </a>
            <a 
              href="https://www.linkedin.com/in/takuma-yasuda-7a332533b/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
            >
              <Linkedin className="h-7 w-7 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
            </a>
            <a 
              href="mailto:yastar.tkm83@gmail.com" 
              className="group p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
            >
              <Mail className="h-7 w-7 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
            </a>
          </div>
          
          <button 
            onClick={scrollToNextSection} 
            className="group animate-bounce bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
          >
            <ArrowDown className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;