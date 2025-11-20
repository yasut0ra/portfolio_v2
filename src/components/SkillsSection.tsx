import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  Atom,
  Clapperboard,
  Cloud,
  Code2,
  Cylinder,
  Database,
  DatabaseZap,
  Flame,
  Github,
  GitBranch,
  Infinity,
  Layers,
  Link2,
  NotebookPen,
  PenTool,
  ScatterChart,
  ServerCog,
  Ship,
  Sparkles,
  Target,
  Wind,
  Workflow,
  Zap,
} from 'lucide-react';

interface TechItem {
  name: string;
  Icon: LucideIcon;
  iconClass: string;
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
      { name: 'React', Icon: Atom, iconClass: 'text-blue-600 dark:text-blue-300' },
      { name: 'Next.js', Icon: Infinity, iconClass: 'text-slate-700 dark:text-gray-300' },
      { name: 'TypeScript', Icon: Code2, iconClass: 'text-sky-600 dark:text-sky-300' },
      { name: 'Tailwind CSS', Icon: Wind, iconClass: 'text-cyan-500 dark:text-cyan-300' },
      { name: 'Framer Motion', Icon: Clapperboard, iconClass: 'text-purple-500 dark:text-purple-300' },
      { name: 'Vite', Icon: Zap, iconClass: 'text-amber-500 dark:text-amber-300' },
    ],
  },
  {
    key: 'backend',
    title: 'Backend & APIs',
    description: 'Web API、バッチ処理、データベース設計まで幅広く対応します。',
    accent: 'from-green-500 to-emerald-500',
    color: 'text-green-600 dark:text-green-400',
    items: [
      { name: 'Node.js', Icon: ServerCog, iconClass: 'text-emerald-600 dark:text-emerald-300' },
      { name: 'Express', Icon: GitBranch, iconClass: 'text-gray-600 dark:text-gray-300' },
      { name: 'FastAPI', Icon: Activity, iconClass: 'text-teal-500 dark:text-teal-300' },
      { name: 'Python', Icon: Workflow, iconClass: 'text-yellow-500 dark:text-yellow-300' },
      { name: 'MongoDB', Icon: Database, iconClass: 'text-green-600 dark:text-green-300' },
      { name: 'PostgreSQL', Icon: Cylinder, iconClass: 'text-indigo-500 dark:text-indigo-300' },
    ],
  },
  {
    key: 'ai',
    title: 'AI / Data Science',
    description: '研究でも実務でも ML/バンディット・推薦システムを扱っています。',
    accent: 'from-purple-500 to-pink-500',
    color: 'text-purple-600 dark:text-purple-400',
    items: [
      { name: 'PyTorch', Icon: Flame, iconClass: 'text-orange-500 dark:text-orange-300' },
      { name: 'TensorFlow', Icon: Layers, iconClass: 'text-yellow-500 dark:text-yellow-300' },
      { name: 'scikit-learn', Icon: ScatterChart, iconClass: 'text-pink-500 dark:text-pink-300' },
      { name: 'Bandit Algos', Icon: Target, iconClass: 'text-rose-500 dark:text-rose-300' },
      { name: 'OpenAI API', Icon: Sparkles, iconClass: 'text-purple-500 dark:text-purple-300' },
      { name: 'LangChain', Icon: Link2, iconClass: 'text-blue-500 dark:text-blue-300' },
    ],
  },
  {
    key: 'tools',
    title: 'Tools & Ops',
    description: '開発フローやコラボレーションを支えるツール群も日常的に使用しています。',
    accent: 'from-amber-500 to-orange-500',
    color: 'text-amber-600 dark:text-amber-400',
    items: [
      { name: 'GitHub', Icon: Github, iconClass: 'text-gray-800 dark:text-gray-100' },
      { name: 'Docker', Icon: Ship, iconClass: 'text-sky-500 dark:text-sky-300' },
      { name: 'Supabase', Icon: DatabaseZap, iconClass: 'text-emerald-500 dark:text-emerald-300' },
      { name: 'AWS', Icon: Cloud, iconClass: 'text-amber-500 dark:text-amber-300' },
      { name: 'Figma', Icon: PenTool, iconClass: 'text-pink-500 dark:text-pink-300' },
      { name: 'Notion', Icon: NotebookPen, iconClass: 'text-slate-600 dark:text-slate-300' },
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="skills" className="py-24 relative" ref={sectionRef}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            <span>Tech Stack</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
            よく使う技術スタックをカテゴリ別にまとめました。<br />
            プロジェクトの内容に応じてこのツールボックスから組み合わせて開発しています。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.key}
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="glass-card p-8 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.accent} flex items-center justify-center shadow-lg`}>
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400">
                  {category.items.length} techs
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {category.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {category.items.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={skillVariants}
                    className="group p-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 flex flex-col items-center text-center gap-2"
                    whileHover={{ y: -2 }}
                  >
                    <item.Icon className={`h-6 w-6 ${item.iconClass} group-hover:scale-110 transition-transform duration-300`} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
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
