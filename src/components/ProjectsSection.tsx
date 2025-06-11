import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
}

const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  const projects: Project[] = [
    {
      id: 1,
      title: 'Nomitto!（のみっと！）',
      description: '「のみっと！」は、友達と遊びたいけど誘うのが面倒な時に、飲み会や食事のイベントを自動提案するWebアプリです。ユーザーが設定した条件に合うイベントを自動で提案します。',
      image: '/images/projects/nomitto.png',
      tags: ['React','JavaScript', 'Node.js', 'Firebase'],
      liveUrl: 'https://nomitto-app.vercel.app/',
      githubUrl: 'https://github.com/Team-Futsukayoi/Nomikai-Setting-App'
    },
    {
      id: 2,
      title: 'minitask',
      description: 'タスク管理アプリ。逆境モードでタスクをこなすことで、自分の意志力を鍛えるユニークな機能があります。',
      image: '/images/projects/minitask.jpg',
      tags: ['React', 'TypeScript', 'MongoDB'],
      liveUrl: 'https://lambent-lolly-5e5cdb.netlify.app',
      githubUrl: 'https://github.com/yasut0ra/mini-task'
    },
    {
      id: 3,
      title: 'ai-stream',
      description: 'AIがカメラ映像やPC画面、音声からコメントを自動生成するアプリ。AIを活用したインタラクティブな擬似視聴者システム。',
      image: '/images/projects/ai-stream.jpg',
      tags: ['React', 'TypeScript', 'OpenAI', 'Next.js','FastAPI'],
      liveUrl: 'https://github.com/Appetite-For-Destruction/ai-stream-companion2',
      githubUrl: 'https://github.com/Appetite-For-Destruction/ai-stream-companion2'
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'このポートフォリオサイトです。',
      image: '/images/projects/portfolio.jpg',
      tags: ['React', 'Tailwind'],
      liveUrl: 'https://yasut0ra.github.io/portfolio_v2/',
      githubUrl: 'https://github.com/yasut0ra/portfolio_v2'
    },
    {
      id: 5,
      title: 'Recomate',
      description: 'AIがユーザーの性格や特徴を分析し、それに合わせたオススメを提案する会話アプリです。',
      image: '/images/projects/recomate.jpg',
      tags: ['React', 'TypeScript', 'Python', 'Electron','OpenAI'],
      liveUrl: 'https://recomate-landing.netlify.app/',
      githubUrl: 'https://github.com/yasut0ra/recomate'
    },
    {
      id: 6,
      title: 'Muu',
      description: '最初は匿名状態から始まり、他人の評価によって性格や特徴が形作られるSNSです。',
      image: '/images/projects/muu.jpg',
      tags: ['ReactNative', 'TypeScript', 'Expo', 'Supabase'],
      liveUrl: 'https://github.com/Team-Futsukayoi/zero-start-sns',
      githubUrl: 'https://github.com/Team-Futsukayoi/zero-start-sns'
    }
  ];

  const filters = ['all', 'React', 'TypeScript', 'Node.js', 'Python', 'Electron', 'ReactNative', 'Expo', 'Supabase', 'OpenAI', 'Next.js', 'FastAPI'];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter));

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            My <span className="text-blue-600 dark:text-blue-400">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
          私がこれまでに開発・公開してきたプロジェクトです。
          技術習得や実世界の課題解決を目的に取り組んできました。
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div 
              key={project.id} 
              className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
            >
              <Link to={`/project/${project.id}`} className="block">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </Link>
              
              <div className="p-6">
                <Link to={`/project/${project.id}`}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                </Link>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Live Demo
                  </a>
                  
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:underline"
                  >
                    <Github className="h-4 w-4 mr-1" />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;