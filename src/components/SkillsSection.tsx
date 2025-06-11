import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Skill {
  name: string;
  percentage: number;
  color: string;
  icon: string;
}

const SkillsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const technicalSkills: Skill[] = [
    {
      name: 'Python',
      percentage: 90,
      color: 'bg-green-600 dark:bg-green-500',
      icon: '🐍'
    },
    { 
      name: 'JavaScript/TypeScript',
      percentage: 80,
      color: 'bg-yellow-400 dark:bg-yellow-500',
      icon: '⚡'
    },
    { 
      name: 'React',
      percentage: 80,
      color: 'bg-blue-500 dark:bg-blue-400',
      icon: '⚛️'
    },
    { 
      name: 'Node.js',
      percentage: 80,
      color: 'bg-green-400 dark:bg-green-500',
      icon: '🚀'
    },
    { 
      name: 'HTML/CSS',
      percentage: 80,
      color: 'bg-orange-500 dark:bg-orange-400',
      icon: '🎨'
    },
    { 
      name: 'Database Design',
      percentage: 75,
      color: 'bg-purple-600 dark:bg-purple-500',
      icon: '🗄️'
    },
    { 
      name: 'UI/UX Design',
      percentage: 70,
      color: 'bg-pink-500 dark:bg-pink-400',
      icon: '✨'
    },
  ];

  const softSkills: Skill[] = [
    { 
      name: 'Problem Solving',
      percentage: 90,
      color: 'bg-indigo-600 dark:bg-indigo-500',
      icon: '🧩'
    },
    { 
      name: 'Communication',
      percentage: 70,
      color: 'bg-teal-600 dark:bg-teal-500',
      icon: '💬'
    },
    { 
      name: 'Team Collaboration',
      percentage: 80,
      color: 'bg-cyan-600 dark:bg-cyan-500',
      icon: '👥'
    },
    { 
      name: 'Project Management',
      percentage: 60,
      color: 'bg-rose-600 dark:bg-rose-500',
      icon: '📊'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            My <span className="text-blue-600 dark:text-blue-400">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
          これまでに習得してきたスキルと得意分野です。
フルスタック開発や研究プロジェクトを通じて実践的に磨いてきました。
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Technical Skills
            </h3>
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <motion.div key={index} variants={skillVariants}>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{skill.icon}</span>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">{skill.name}</span>
                    <span className="ml-auto text-gray-800 dark:text-gray-200">{skill.percentage}%</span>
                  </div>
                  <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${skill.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Soft Skills
            </h3>
            <div className="space-y-6">
              {softSkills.map((skill, index) => (
                <motion.div key={index} variants={skillVariants}>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{skill.icon}</span>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">{skill.name}</span>
                    <span className="ml-auto text-gray-800 dark:text-gray-200">{skill.percentage}%</span>
                  </div>
                  <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${skill.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          {['Python','JavaScript', 'TypeScript', 'React', 'Node.js', 'HTML5', 'CSS3', 'Git', 'MongoDB', 'GraphQL', 'AWS', 'Docker'].map((tech, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md flex items-center justify-center text-center transform hover:shadow-lg transition-all duration-300"
            >
              <span className="text-gray-800 dark:text-gray-200 font-medium">{tech}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;