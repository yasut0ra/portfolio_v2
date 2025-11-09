import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface TechItem {
  name: string;
  icon: string;
}

interface TechCategory {
  key: string;
  title: string;
  description: string;
  accent: string;
  color: string;
  items: TechItem[];
}

const categories: TechCategory[] = [
  {
    key: 'frontend',
    title: 'Frontend & UI',
    description: 'モダンな SPA/SSR 開発や高速な UI プロトタイピングが得意です。',
    accent: 'from-blue-500 to-purple-500',
    color: 'text-blue-600 dark:text-blue-400',
    items: [
      { name: 'React', icon: '⚛️' },
      { name: 'Next.js', icon: '⛓️' },
      { name: 'TypeScript', icon: '📘' },
      { name: 'Tailwind CSS', icon: '💨' },
      { name: 'Framer Motion', icon: '🎞️' },
      { name: 'Vite', icon: '⚡' },
    ],
  },
  {
    key: 'backend',
    title: 'Backend & APIs',
    description: 'Web API、バッチ処理、データベース設計まで幅広く対応します。',
    accent: 'from-green-500 to-emerald-500',
    color: 'text-green-600 dark:text-green-400',
    items: [
      { name: 'Node.js', icon: '🚀' },
      { name: 'Express', icon: '🌐' },
      { name: 'FastAPI', icon: '⚡' },
      { name: 'Python', icon: '🐍' },
      { name: 'MongoDB', icon: '🍃' },
      { name: 'PostgreSQL', icon: '🐘' },
    ],
  },
  {
    key: 'ai',
    title: 'AI / Data Science',
    description: '研究でも実務でも ML/バンディット・推薦システムを扱っています。',
    accent: 'from-purple-500 to-pink-500',
    color: 'text-purple-600 dark:text-purple-400',
    items: [
      { name: 'PyTorch', icon: '🔥' },
      { name: 'TensorFlow', icon: '🤖' },
      { name: 'scikit-learn', icon: '📊' },
      { name: 'Bandit Algos', icon: '🎰' },
      { name: 'OpenAI API', icon: '🧠' },
      { name: 'LangChain', icon: '⛓️' },
    ],
  },
  {
    key: 'tools',
    title: 'Tools & Ops',
    description: '開発フローやコラボレーションを支えるツール群も日常的に使用しています。',
    accent: 'from-amber-500 to-orange-500',
    color: 'text-amber-600 dark:text-amber-400',
    items: [
      { name: 'GitHub', icon: '🐙' },
      { name: 'Docker', icon: '🐳' },
      { name: 'Supabase', icon: '🪄' },
      { name: 'AWS', icon: '☁️' },
      { name: 'Figma', icon: '🎨' },
      { name: 'Notion', icon: '🗂️' },
    ],
  },
];

const SkillsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

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
            よく使う技術スタックをカテゴリ別にまとめました。<br />
            プロジェクトの内容に応じてこのツールボックスから組み合わせて開発しています。
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {categories.map((category) => (
            <motion.div
              key={category.key}
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <h3 className={`text-2xl font-bold ${category.color} flex items-center`}>
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.accent} mr-3`}></div>
                  {category.title}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">{category.items.length} techs</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-8">{category.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {category.items.map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={skillVariants}
                    className="group bg-white/90 dark:bg-gray-700/70 border border-gray-200/50 dark:border-gray-600/50 rounded-xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300"
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    <span className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
