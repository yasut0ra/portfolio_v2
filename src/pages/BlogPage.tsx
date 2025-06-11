import React, { useState } from 'react';
import { ExternalLink, BookOpen, Calendar, Search, Filter, Tag, Clock, Heart, Eye, MessageCircle, ArrowRight, TrendingUp, Star, PenTool, Target, Lightbulb, Code, Brain, Rocket } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  description: string;
  content: string;
  date: string;
  platform: 'Zenn' | 'Qiita' | 'Personal';
  url: string;
  likes: number;
  views: number;
  comments: number;
  readTime: number;
  tags: string[];
  category: 'Frontend' | 'Backend' | 'AI/ML' | 'Tutorial' | 'Opinion';
  featured?: boolean;
  image?: string;
  status: 'published' | 'draft' | 'planned';
}

interface BlogIdea {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  tags: string[];
}

const BlogPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ideas' | 'drafts' | 'published'>('ideas');

  // 今後書く予定の記事アイデア
  const blogIdeas: BlogIdea[] = [
    {
      id: 1,
      title: 'React Performance Optimization: 実践的なテクニック集',
      description: 'Reactアプリケーションのパフォーマンスを劇的に改善する実践的な手法を詳しく解説。useMemo、useCallback、React.memoの使い分けから、バンドルサイズの最適化まで。',
      category: 'Frontend',
      priority: 'high',
      estimatedTime: '2週間',
      tags: ['React', 'Performance', 'JavaScript', 'Optimization']
    },
    {
      id: 2,
      title: 'バンディットアルゴリズムの実装と推薦システムへの応用',
      description: '推薦システムにおけるバンディットアルゴリズムの理論と実装について詳しく解説。ε-GreedyからUCB1、Thompson Samplingまでの比較検証。',
      category: 'AI/ML',
      priority: 'high',
      estimatedTime: '3週間',
      tags: ['Machine Learning', 'Bandit Algorithm', 'Recommendation System', 'Python']
    },
    {
      id: 3,
      title: 'TypeScript完全ガイド：JavaScript開発者のための実践入門',
      description: 'JavaScript開発者がTypeScriptを効率的に習得するための包括的なガイド。型定義から高度な型操作まで実例とともに解説。',
      category: 'Frontend',
      priority: 'medium',
      estimatedTime: '2週間',
      tags: ['TypeScript', 'JavaScript', 'Web Development']
    },
    {
      id: 4,
      title: 'フルスタック開発者への道のり：大学生の技術習得記録',
      description: '大学生がフルスタック開発者を目指す過程での学習方法、失敗談、成功体験を赤裸々に記録。効率的な学習法も紹介。',
      category: 'Opinion',
      priority: 'medium',
      estimatedTime: '1週間',
      tags: ['Career', 'Learning', 'Student Life', 'Full Stack']
    },
    {
      id: 5,
      title: 'Modern CSS Grid & Flexbox: レスポンシブレイアウトの新常識',
      description: 'CSS GridとFlexboxを使った現代的なレスポンシブレイアウトの設計手法。実際のプロジェクトでの使い分けも解説。',
      category: 'Frontend',
      priority: 'low',
      estimatedTime: '1週間',
      tags: ['CSS', 'Grid', 'Flexbox', 'Responsive Design']
    },
    {
      id: 6,
      title: 'Node.js + FastAPI: フルスタック開発のベストプラクティス',
      description: 'Node.jsとFastAPIを組み合わせたフルスタック開発の実践的なアプローチ。API設計からデプロイまでの完全ガイド。',
      category: 'Backend',
      priority: 'medium',
      estimatedTime: '2週間',
      tags: ['Node.js', 'FastAPI', 'Full Stack', 'API Design']
    }
  ];

  // 下書き記事（現在は空）
  const draftPosts: BlogPost[] = [];

  // 公開済み記事（現在は空）
  const publishedPosts: BlogPost[] = [];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200 border-red-200/50 dark:border-red-700/50';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200 border-yellow-200/50 dark:border-yellow-700/50';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 border-green-200/50 dark:border-green-700/50';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200 border-gray-200/50 dark:border-gray-700/50';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend':
        return <Code className="h-5 w-5" />;
      case 'Backend':
        return <Target className="h-5 w-5" />;
      case 'AI/ML':
        return <Brain className="h-5 w-5" />;
      case 'Opinion':
        return <Heart className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Blog</span>
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-6 text-lg max-w-3xl mx-auto">
            Web開発、プログラミング、AI・機械学習に関する技術記事やチュートリアル、<br />
            そして学習過程での気づきや体験談を発信予定です。
          </p>
        </div>

        {/* Current Status */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-16 border border-blue-200/50 dark:border-blue-700/50">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white mr-6">
              <PenTool className="h-8 w-8" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                ブログ執筆準備中
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                現在、質の高い技術記事を執筆するための準備を進めています
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl">
              <Lightbulb className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">アイデア収集</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">実践的で価値のある記事テーマを厳選</p>
            </div>
            <div className="text-center p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl">
              <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">技術検証</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">記事内容の正確性と実用性を確保</p>
            </div>
            <div className="text-center p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl">
              <Rocket className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">公開準備</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">読みやすく分かりやすい記事を目指して</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex space-x-2">
              {[
                { id: 'ideas', label: '記事アイデア', count: blogIdeas.length },
                { id: 'drafts', label: '下書き', count: draftPosts.length },
                { id: 'published', label: '公開済み', count: publishedPosts.length }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'ideas' && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <Lightbulb className="h-6 w-6 text-yellow-500 mr-2" />
                記事アイデア ({blogIdeas.length})
              </h2>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                優先度順に表示
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {blogIdeas.map(idea => (
                <div key={idea.id} className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mr-3">
                        {getCategoryIcon(idea.category)}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{idea.category}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(idea.priority)}`}>
                            {idea.priority === 'high' ? '高優先度' : idea.priority === 'medium' ? '中優先度' : '低優先度'}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                            {idea.estimatedTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {idea.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed text-sm">
                    {idea.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {idea.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      執筆予定
                    </div>
                    <button className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group">
                      詳細を見る
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'drafts' && (
          <section>
            <div className="text-center py-16">
              <PenTool className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                下書きはまだありません
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                現在、記事の執筆準備を進めています。<br />
                近日中に最初の記事の執筆を開始予定です。
              </p>
              <div className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium">
                <Clock className="h-4 w-4 mr-2" />
                執筆開始まであと少し...
              </div>
            </div>
          </section>
        )}

        {activeTab === 'published' && (
          <section>
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                公開済み記事はまだありません
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                質の高い技術記事を執筆中です。<br />
                最初の記事をお楽しみに！
              </p>
              <div className="inline-flex items-center text-purple-600 dark:text-purple-400 font-medium">
                <Star className="h-4 w-4 mr-2" />
                Coming Soon...
              </div>
            </div>
          </section>
        )}

        {/* Future Plans */}
        <div className="mt-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            今後の発信予定
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
              <Code className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">技術記事</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                実践的なプログラミング技術や開発手法について詳しく解説
              </p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
              <Brain className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">研究記録</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                バンディットアルゴリズムや推薦システムの研究過程を共有
              </p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200/50 dark:border-emerald-700/50">
              <Heart className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">学習体験</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                大学生エンジニアとしての学習過程や失敗談、成功体験
              </p>
            </div>
          </div>
        </div>

        {/* External Links */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            記事公開予定プラットフォーム
          </h3>
          <div className="flex justify-center space-x-6">
            <a
              href="https://zenn.dev/yasut0ra"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="mr-3 text-lg font-semibold">Zenn</span>
              <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="https://qiita.com/yasut0ra"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="mr-3 text-lg font-semibold">Qiita</span>
              <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
            質の高い技術記事を継続的に発信していく予定です
          </p>
        </div>
      </div>
    </main>
  );
};

export default BlogPage;