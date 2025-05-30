import React from 'react';
import { FileText } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            About <span className="text-blue-600 dark:text-blue-400">Me</span>
          </h2>
          <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="w-full h-80 sm:h-96 bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden">
                {/* Replace with your actual image */}
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Portrait" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center transform rotate-12 shadow-lg">
                <span className="text-white font-bold text-xl transform -rotate-12">5+</span>
                <span className="text-white text-xs transform -rotate-12 mt-4">Years<br/>Exp.</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Who am I?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              I'm a passionate Full Stack Developer with over 5 years of experience in creating beautiful, functional, and user-friendly applications. I specialize in JavaScript, React, Node.js, and modern web technologies.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              I enjoy solving complex problems and turning ideas into reality through elegant code. My background in both front-end and back-end development allows me to build complete solutions from concept to deployment.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></div>
                <span className="text-gray-800 dark:text-gray-200">Name: Your Name</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></div>
                <span className="text-gray-800 dark:text-gray-200">Email: your@email.com</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></div>
                <span className="text-gray-800 dark:text-gray-200">Location: Your City, Country</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></div>
                <span className="text-gray-800 dark:text-gray-200">Availability: Available</span>
              </div>
            </div>
            
            <a 
              href="#" 
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <FileText className="mr-2 h-5 w-5" />
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;