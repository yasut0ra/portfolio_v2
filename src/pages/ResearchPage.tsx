import React from 'react';
import { BookOpen, Users, Calendar, FileText, ExternalLink, Play, Brain, Target, Zap, Lightbulb, TrendingUp, Database, Cpu, FlaskConical, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Publication {
  id: number;
  title: string;
  authors: string[];
  conference: string;
  year: string;
  abstract: string;
  doi: string;
  pdf?: string;
  citations: number;
  status: 'published' | 'in-progress' | 'submitted';
}

interface ResearchInterest {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  details: string[];
}

interface ResearchDemo {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  status: 'live' | 'beta' | 'coming-soon';
  highlight: string;
  gradient: string;
  link?: string;
  linkType?: 'internal' | 'external';
}

const ResearchPage: React.FC = () => {
  const publications: Publication[] = [
    {
      id: 1,
      title: "推薦システムにおけるバンディットアルゴリズムの最適化手法（仮）",
      authors: ["Yasut0ra", "指導教員"],
      conference: "学部研究",
      year: "2025",
      abstract: "推薦システムにおける探索と活用のバランスを最適化するバンディットアルゴリズムの新しい手法を提案。ユーザの多様性と満足度を同時に考慮した推薦手法の研究を進行中。",
      doi: "",
      pdf: "",
      citations: 0,
      status: 'in-progress'
    },
  ];

  const researchInterests: ResearchInterest[] = [
    {
      title: "推薦システム",
      description: "ユーザの多様性や満足度を考慮した次世代推薦手法",
      icon: <Target className="h-8 w-8" />,
      color: 'from-blue-500 to-cyan-500',
      details: [
        "多様性を考慮した推薦アルゴリズム",
        "ユーザ満足度の最適化",
        "コールドスタート問題の解決",
        "リアルタイム推薦システム"
      ]
    },
    {
      title: "バンディットアルゴリズム",
      description: "探索と活用のバランスを最適化する学習手法",
      icon: <Brain className="h-8 w-8" />,
      color: 'from-purple-500 to-pink-500',
      details: [
        "セミバンディット問題",
        "ランキングバンディット",
        "コンテキスチュアルバンディット",
        "パーソナライズ手法の設計"
      ]
    },
    {
      title: "深層学習",
      description: "大規模モデルによるユーザモデリングと最適化",
      icon: <Zap className="h-8 w-8" />,
      color: 'from-emerald-500 to-teal-500',
      details: [
        "ニューラル推薦システム",
        "転移学習の応用",
        "埋め込み表現学習",
        "大規模データ処理"
      ]
    }
  ];

  const researchDemos: ResearchDemo[] = [
    {
      id: 'bandit-playground',
      title: 'Multi-Armed Bandit Playground',
      description: 'バンディットアルゴリズムのリアルタイムシミュレーション環境。ε-GreedyやUCB1などを可視化しながら比較できます。',
      tags: ['ε-Greedy', 'UCB1', 'Thompson Sampling'],
      icon: <Play className="h-16 w-16 text-white group-hover:scale-110 transition-transform duration-300" />,
      status: 'live',
      highlight: 'Live Demo',
      gradient: 'from-blue-600 to-purple-600',
      link: '/bandit-playground',
      linkType: 'internal'
    },
    {
      id: 'contextual-sandbox',
      title: 'Contextual Recommender Sandbox',
      description: 'ログデータを再生しながら、特徴量ごとのアーム選択や報酬を解析できる可視化ツール。セグメント別の寄与度を確認できます。',
      tags: ['Contextual', 'Offline RL', 'Visualization'],
      icon: <Cpu className="h-14 w-14 text-white" />,
      status: 'live',
      highlight: 'Sandbox',
      gradient: 'from-emerald-500 to-teal-500',
      link: '/research/contextual-sandbox',
      linkType: 'internal'
    },
    {
      id: 'offline-evaluator',
      title: 'Offline Policy Evaluator',
      description: 'IPSやDoubly Robust法を用いたオフライン政策評価パイプライン。安全指標と分散を即時チェックできます。',
      tags: ['IPS', 'DR', 'Counterfactual'],
      icon: <FlaskConical className="h-14 w-14 text-white" />,
      status: 'beta',
      highlight: 'Evaluator',
      gradient: 'from-slate-700 to-gray-900',
      link: '/research/offline-evaluator',
      linkType: 'internal'
    },
    {
      id: 'conversational-agent',
      title: 'Conversational Bandit Agent',
      description: '音声・感情解析とバンディット制御を組み合わせた対話型エージェント。ペルソナ切り替えをシミュレーションできます。',
      tags: ['Speech', 'Emotion', 'Bandit'],
      icon: <Sparkles className="h-14 w-14 text-white" />,
      status: 'beta',
      highlight: 'Prototype',
      gradient: 'from-rose-500 to-orange-500',
      link: '/research/conversational-agent',
      linkType: 'internal'
    }
  ];

  const statusStyles: Record<ResearchDemo['status'], { label: string; classes: string }> = {
    live: {
      label: 'Live',
      classes: 'bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-200'
    },
    beta: {
      label: 'Beta',
      classes: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200'
    },
    'coming-soon': {
      label: 'Coming Soon',
      classes: 'bg-gray-200 text-gray-700 dark:bg-gray-700/70 dark:text-gray-200'
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 rounded-full text-sm font-medium">Published</span>;
      case 'in-progress':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200 rounded-full text-sm font-medium">In Progress</span>;
      case 'submitted':
        return <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 rounded-full text-sm font-medium">Submitted</span>;
      default:
        return null;
    }
  };

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Research <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Activities</span>
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-6 text-lg max-w-3xl mx-auto">
            推薦システムと機械学習のフロンティアを探究し、<br />
            現実世界の課題解決に向けた革新的なアルゴリズムを研究しています。
          </p>
        </div>

        {/* Research Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: '研究分野', value: '3+', icon: <Lightbulb className="h-6 w-6" />, color: 'from-blue-500 to-cyan-500' },
            { label: '進行中プロジェクト', value: '2', icon: <TrendingUp className="h-6 w-6" />, color: 'from-purple-500 to-pink-500' },
            { label: '実装アルゴリズム', value: '5+', icon: <Database className="h-6 w-6" />, color: 'from-emerald-500 to-teal-500' },
            { label: '研究期間', value: '0.5+', icon: <Calendar className="h-6 w-6" />, color: 'from-orange-500 to-red-500' }
          ].map((stat, index) => (
            <div key={index} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 text-center group hover:shadow-2xl transition-all duration-300">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Interactive Demos Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            インタラクティブ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">デモ</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {researchDemos.map(demo => {
              const status = statusStyles[demo.status];

              const cardContent = (
                <>
                  <div className={`relative h-48 bg-gradient-to-br ${demo.gradient} overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
                      {demo.icon}
                      <span className="mt-3 text-sm font-semibold tracking-wide">{demo.highlight}</span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
                      {status.label}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {demo.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      {demo.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {demo.tags.map(tag => (
                        <span key={tag} className="text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              );

              const baseClass =
                'group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50';

              if (demo.link) {
                if (demo.linkType === 'external') {
                  return (
                    <a
                      key={demo.id}
                      href={demo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={baseClass}
                    >
                      {cardContent}
                    </a>
                  );
                }

                return (
                  <Link key={demo.id} to={demo.link} className={baseClass}>
                    {cardContent}
                  </Link>
                );
              }

              return (
                <div key={demo.id} className={`${baseClass} cursor-default`}>
                  {cardContent}
                </div>
              );
            })}
          </div>
        </section>

        {/* Research Interests */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            研究関心 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">領域</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {researchInterests.map((interest, index) => (
              <div key={index} className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50">
                <div className={`w-16 h-16 bg-gradient-to-r ${interest.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {interest.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {interest.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {interest.description}
                </p>
                <div className="space-y-2">
                  {interest.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></div>
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            研究成果・ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">論文</span>
          </h2>
          <div className="space-y-8">
            {publications.map(pub => (
              <article key={pub.id} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {pub.title}
                      </h3>
                      {getStatusBadge(pub.status)}
                    </div>
                    
                    <div className="flex flex-wrap gap-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-blue-500" />
                        {pub.authors.join(", ")}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                        {pub.year}
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-emerald-500" />
                        {pub.citations} citations
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium border border-blue-200/50 dark:border-blue-700/50">
                        {pub.conference}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {pub.abstract}
                </p>

                <div className="flex flex-wrap gap-4">
                  {pub.doi && (
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group"
                    >
                      <ExternalLink className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      DOI
                    </a>
                  )}
                  {pub.pdf && (
                    <a
                      href={pub.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors group"
                    >
                      <FileText className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                      PDF
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ResearchPage;
