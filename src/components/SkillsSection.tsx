import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Skill {
  name: string;
  percentage: number;
  color: string;
  icon: string;
  category: 'frontend' | 'backend' | 'ai' | 'tools';
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

  const skills: Skill[] = [
    // Frontend
    { name: 'React/Next.js', percentage: 85, color: 'from-blue-500 to-cyan-500', icon: '⚛️', category: 'frontend' },
    { name: 'TypeScript', percentage: 80, color: 'from-blue-600 to-blue-400', icon: '📘', category: 'frontend' },
    { name: 'HTML/CSS', percentage: 85, color: 'from-orange-500 to-red-500', icon: '🎨', category: 'frontend' },
    { name: 'Tailwind CSS', percentage: 80, color: 'from-teal-500 to-cyan-500', icon: '💨', category: 'frontend' },
    
    // Backend
    { name: 'Python', percentage: 90, color: 'from-green-500 to-emerald-500', icon: '🐍', category: 'backend' },
    { name: 'Node.js', percentage: 75, color: 'from-green-600 to-green-400', icon: '🚀', category: 'backend' },
    { name: 'FastAPI', percentage: 70, color: 'from-teal-600 to-green-500', icon: '⚡', category: 'backend' },
    { name: 'Database Design', percentage: 75, color: 'from-purple-600 to-purple-400', icon: '🗄️', category: 'backend' },
    
    // AI/ML
    { name: 'Machine Learning', percentage: 80, color: 'from-purple-500 to-pink-500', icon: '🤖', category: 'ai' },
    { name: 'Deep Learning', percentage: 75, color: 'from-indigo-500 to-purple-500', icon: '🧠', category: 'ai' },
    { name: 'Recommendation Systems', percentage: 85, color: 'from-pink-500 to-rose-500', icon: '🎯', category: 'ai' },
    { name: 'Bandit Algorithms', percentage: 80, color: 'from-violet-500 to-purple-500', icon: '🎰', category: 'ai' },
    
    // Tools
    { name: 'Git/GitHub', percentage: 85, color: 'from-gray-700 to-gray-500', icon: '📚', category: 'tools' },
    { name: 'Docker', percentage: 70, color: 'from-blue-600 to-blue-400', icon: '🐳', category: 'tools' },
    { name: 'UI/UX Design', percentage: 75, color: 'from-pink-500 to-rose-400', icon: '✨', category: 'tools' },
    { name: 'Project Management', percentage: 70, color: 'from-amber-500 to-orange-500', icon: '📊', category: 'tools' }
  ];

  const categories = {
    frontend: { title: 'Frontend Development', color: 'text-blue-600 dark:text-blue-400' },
    backend: { title: 'Backend Development', color: 'text-green-600 dark:text-green-400' },
    ai: { title: 'AI & Machine Learning', color: 'text-purple-600 dark:text-purple-400' },
    tools: { title: 'Tools & Others', color: 'text-orange-600 dark:text-orange-400' }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
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
    <section id="skills" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Skills</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-6 text-lg max-w-3xl mx-auto">
            これまでに習得してきたスキルと得意分野です。<br />
            フルスタック開発や研究プロジェクトを通じて実践的に磨いてきました。
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {Object.entries(categories).map(([categoryKey, categoryInfo]) => (
            <motion.div
              key={categoryKey}
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
            >
              <h3 className={`text-2xl font-bold ${categoryInfo.color} mb-8 flex items-center`}>
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-3"></div>
                {categoryInfo.title}
              </h3>
              <div className="space-y-8">
                {skills.filter(skill => skill.category === categoryKey).map((skill, index) => (
                  <motion.div key={index} variants={skillVariants} className="group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-300">{skill.icon}</span>
                        <span className="text-gray-800 dark:text-gray-200 font-semibold text-lg">{skill.name}</span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 font-medium">{skill.percentage}%</span>
                    </div>
                    <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.percentage}%` }}
                        transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Technologies I Work With
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {['Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'HTML5', 'CSS3', 'Git', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker'].map((tech, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center text-center transform transition-all duration-300"
              >
                <span className="text-gray-800 dark:text-gray-200 font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{tech}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;