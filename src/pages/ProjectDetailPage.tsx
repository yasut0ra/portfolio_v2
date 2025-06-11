import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Calendar, Tag, Users, Code, Target, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { getProjectById } from '../data/projects';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = id ? parseInt(id, 10) : 0;
  const project = getProjectById(projectId);

  if (!project) {
    return (
      <main className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            プロジェクトが見つかりません
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            指定されたプロジェクトは存在しないか、削除された可能性があります。
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            プロジェクト一覧に戻る
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        <Link 
          to="/#projects" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          プロジェクト一覧に戻る
        </Link>

        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
          {/* Project Header */}
          <div className="relative h-96 lg:h-[28rem] overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 flex items-end">
              <div className="p-8 lg:p-12 w-full">
                <div className="flex flex-wrap gap-3 mb-6">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{project.title}</h1>
                <p className="text-gray-200 text-lg lg:text-xl max-w-3xl leading-relaxed">{project.description}</p>
              </div>
            </div>
          </div>

          {/* Project Info */}
          <div className="p-8 lg:p-12">
            {/* Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">開発期間</p>
                  <p className="text-gray-800 dark:text-gray-200 font-semibold">{project.date}</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">チーム構成</p>
                  <p className="text-gray-800 dark:text-gray-200 font-semibold">{project.team.join(', ')}</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200/50 dark:border-emerald-700/50">
                <Tag className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">技術スタック</p>
                  <p className="text-gray-800 dark:text-gray-200 font-semibold">{project.tags.length} technologies</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                <ExternalLink className="h-5 w-5 mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                Live Demo
              </a>
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-semibold py-4 px-8 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                <Github className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                View Code
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-12">
                {/* Project Overview */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Target className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                    プロジェクト概要
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {project.longDescription}
                    </p>
                  </div>
                </section>

                {/* Key Features */}
                <section>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                    主要機能
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-start p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Challenges */}
                <section>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400 mr-3" />
                    技術的課題
                  </h3>
                  <div className="space-y-4">
                    {project.challenges.map((challenge, index) => (
                      <div key={index} className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200/50 dark:border-orange-700/50">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{challenge}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <div className="space-y-12">
                {/* Technologies Used */}
                <section>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Code className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3" />
                    使用技術
                  </h3>
                  <div className="space-y-4">
                    {project.technologies.map((tech, index) => (
                      <div key={index} className="flex items-start p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
                        <Code className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{tech}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Outcomes */}
                <section>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400 mr-3" />
                    成果・学び
                  </h3>
                  <div className="space-y-4">
                    {project.outcomes.map((outcome, index) => (
                      <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{outcome}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Screenshots */}
                <section>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    スクリーンショット
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {project.screenshots.map((screenshot, index) => (
                      <div key={index} className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                        <img 
                          src={screenshot} 
                          alt={`${project.title} Screenshot ${index + 1}`} 
                          className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetailPage;