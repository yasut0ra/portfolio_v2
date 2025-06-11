import React from 'react';
import { Github as GitHub, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">
              <span className="text-blue-400">Yasut0ra's</span>Portfolio
            </h2>
            <p className="text-gray-400 mt-2 max-w-md">
            美しく、機能的で、ユーザーに優しいアプリケーションを開発し、現実世界の課題を解決します。
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a href="https://github.com/yasut0ra" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300">
                <GitHub className="h-5 w-5 text-white" />
              </a>
              <a href="https://x.com/YaSut0ra94970" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300">
                <X className="h-5 w-5 text-white" />
              </a>
              <a href="https://www.linkedin.com/in/takuma-yasuda-7a332533b/" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300">
                <Linkedin className="h-5 w-5 text-white" />
              </a>
              <a href="mailto:yastar.tkm83@gmail.com" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300">
                <Mail className="h-5 w-5 text-white" />
              </a>
            </div>
            
            <button 
              onClick={scrollToTop} 
              className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Yasut0ra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;