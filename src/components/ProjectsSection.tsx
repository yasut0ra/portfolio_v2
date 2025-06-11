import React, { useState } from 'react';
import { ExternalLink, Github, Calendar, Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured?: boolean;
  stats?: {
    stars?: number;
    views?: number;
  };
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
      githubUrl: 'https://github.com/Team-Futsukayoi/Nomikai-Setting-App',
      featured: true,
      stats: { stars: 12, views: 245 }
    },
    {
      id: 2,
      title: 'minitask',
      description: 'タスク管理アプリ。逆境モードでタスクをこなすことで、自分の意志力を鍛えるユニークな機能があります。',
      image: '/images/projects/minitask.png',
      tags: ['React', 'TypeScript', 'MongoDB'],
      liveUrl: 'https://lambent-lolly-5e5cdb.netlify.app',
      githubUrl: 'https://github.com/yasut0ra/mini-task',
      stats: { stars: 8, views: 156 }
    },
    {
      id: 3,
      title: 'ai-stream',
      description: 'AIがカメラ映像やPC画面、音声からコメントを自動生成するアプリ。AIを活用したインタラクティブな擬似視聴者システム。',
      image: '/images/projects/ai-stream.png',
      tags: ['React', 'TypeScript', 'OpenAI', 'Next.js','FastAPI'],
      liveUrl: 'https://github.com/Appetite-For-Destruction/ai-stream-companion2',
      githubUrl: 'https://github.com/Appetite-For-Destruction/ai-stream-companion2',
      featured: true,
      stats: { stars: 15, views: 320 }
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'このポートフォリオサイトです。',
      image: '/images/projects/portfolio.png',
      tags: ['React', 'Tailwind'],
      liveUrl: 'https://yasut0ra.github.io/portfolio_v2/',
      githubUrl: 'https://github.com/yasut0ra/portfolio_v2',
      stats: { stars: 5, views: 89 }
    },
    {
      id: 5,
      title: 'Recomate',
      description: 'AIがユーザーの性格や特徴を分析し、それに合わせたオススメを提案する会話アプリです。',
      image: '/images/projects/recomate.png',
      tags: ['React', 'TypeScript', 'Python', 'Electron','OpenAI'],
      liveUrl: 'https://recomate-landing.netlify.app/',
      githubUrl: 'https://github.com/yasut0ra/recomate',
      featured: true,
      stats: { stars: 18, views: 412 }
    },
    {
      id: 6,
      title: 'Muu',
      description: '最初は匿名状態から始まり、他人の評価によって性格や特徴が形作られるSNSです。',
      image: '/images/projects/muu.png',
      tags: ['ReactNative', 'TypeScript', 'Expo', 'Supabase'],
      liveUrl: 'https://github.com/Team-Futsukayoi/zero-start-sns',
      githubUrl: 'https://github.com/Team-Futsukayoi/zero-start-sns',
      stats: { stars: 22, views: 567 }
    }
  ];

  const filters = ['all', 'React', 'TypeScript', 'Node.js', 'Python', 'Electron', 'ReactNative', 'Expo', 'Supabase', 'OpenAI', 'Next.js', 'FastAPI'];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter));

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Projects</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-6 text-lg max-w-3xl mx-auto">
            私がこれまでに開発・公開してきたプロジェクトです。<br />
            技術習得や実世界の課題解決を目的に取り組んできました。
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
            <Star className="h-6 w-6 text-yellow-500 mr-2" />
            Featured Projects
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredProjects.map(project => (
              <div 
                key={project.id} 
                className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50"
              >
                <Link to={`/project/${project.id}`} className="block">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </div>
                  </div>
                </Link>
                
                <div className="p-6">
                  <Link to={`/project/${project.id}`}>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map(tag => (
                      <span 
                        key={tag} 
                        className="text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full border border-blue-200/50 dark:border-blue-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {project.stats && (
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        {project.stats.stars}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {project.stats.views}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group"
                    >
                      <ExternalLink className="h-4 w-4 mr-1 group-hover:translate-x-1 transition-transform duration-300" />
                      Live Demo
                    </a>
                    
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors group"
                    >
                      <Github className="h-4 w-4 mr-1 group-hover:rotate-12 transition-transform duration-300" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200/50 dark:border-gray-700/50'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
        
        {/* All Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div 
              key={project.id} 
              className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50"
            >
              <Link to={`/project/${project.id}`} className="block">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </Link>
              
              <div className="p-6">
                <Link to={`/project/${project.id}`}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map(tag => (
                    <span 
                      key={tag} 
                      className="text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full border border-blue-200/50 dark:border-blue-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group"
                  >
                    <ExternalLink className="h-4 w-4 mr-1 group-hover:translate-x-1 transition-transform duration-300" />
                    Live Demo
                  </a>
                  
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors group"
                  >
                    <Github className="h-4 w-4 mr-1 group-hover:rotate-12 transition-transform duration-300" />
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