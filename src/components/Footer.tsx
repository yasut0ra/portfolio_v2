import React from 'react';
import { Github as GitHub, Linkedin, Mail, ArrowUp, X, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-xl">Y</span>
              </div>
              <h2 className="text-3xl font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Yasut0ra's</span>
                <span className="text-white ml-1">Portfolio</span>
              </h2>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed">
              美しく、機能的で、ユーザーに優しいアプリケーションを開発し、現実世界の課題を解決します。
            </p>
            <div className="flex items-center justify-center md:justify-start mt-4 text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 mx-2 animate-pulse" />
              <span>in Hokkaido, Japan</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-6">
              {[
                { href: "https://github.com/yasut0ra", icon: GitHub, label: "GitHub" },
                { href: "https://x.com/YaSut0ra94970", icon: X, label: "X (Twitter)" },
                { href: "https://www.linkedin.com/in/takuma-yasuda-7a332533b/", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:yastar.tkm83@gmail.com", icon: Mail, label: "Email" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl border border-gray-700/50 hover:border-transparent"
                  aria-label={social.label}
                >
                  <social.icon className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
            
            <button 
              onClick={scrollToTop} 
              className="group p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>
        </div>
        
        <div className="border-t border-gray-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Yasut0ra. All rights reserved.</p>
            <div className="flex items-center mt-4 md:mt-0 space-x-6">
              <span>Built with React & Tailwind CSS</span>
              <span className="hidden md:block">•</span>
              <span>Deployed on GitHub Pages</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;