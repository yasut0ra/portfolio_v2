import React, { useState } from 'react';
import { ExternalLink, BookOpen, Calendar, Search, Filter, Tag, Clock, Heart, Eye, MessageCircle, ArrowRight, TrendingUp, Star } from 'lucide-react';

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
}

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'React Performance Optimization: 実践的なテクニック集',
      description: 'Reactアプリケーションのパフォーマンスを劇的に改善する実践的な手法を詳しく解説します。',
      content: 'Reactアプリケーションのパフォーマンス最適化について...',
      date: '2024-12-15',
      platform: 'Zenn',
      url: 'https://zenn.dev/your-username/articles/react-performance',
      likes: 245,
      views: 1850,
      comments: 23,
      readTime: 8,
      tags: ['React', 'Performance', 'JavaScript', 'Optimization'],
      category: 'Frontend',
      featured: true,
      image: '/images/blog/react-performance.jpg'
    },
    {
      id: 2,
      title: 'TypeScript完全ガイド：JavaScript開発者のための実践入門',
      description: 'JavaScript開発者がTypeScriptを効率的に習得するための包括的なガイドです。',
      content: 'TypeScriptの基礎から応用まで...',
      date: '2024-12-10',
      platform: 'Qiita',
      url: 'https://qiita.com/your-username/items/typescript-guide',
      likes: 189,
      views: 2340,
      comments: 31,
      readTime: 12,
      tags: ['TypeScript', 'JavaScript', 'Web Development'],
      category: 'Frontend',
      image: '/images/blog/typescript-guide.jpg'
    },
    {
      id: 3,
      title: 'バンディットアルゴリズムの実装と推薦システムへの応用',
      description: '推薦システムにおけるバンディットアルゴリズムの理論と実装について詳しく解説します。',
      content: 'バンディットアルゴリズムの基礎理論から...',
      date: '2024-12-05',
      platform: 'Personal',
      url: '#',
      likes: 156,
      views: 980,
      comments: 18,
      readTime: 15,
      tags: ['Machine Learning', 'Bandit Algorithm', 'Recommendation System', 'Python'],
      category: 'AI/ML',
      featured: true,
      image: '/images/blog/bandit-algorithm.jpg'
    },
    {
      id: 4,
      title: 'Modern CSS Grid & Flexbox: レスポンシブレイアウトの新常識',
      description: 'CSS GridとFlexboxを使った現代的なレスポンシブレイアウトの設計手法を学びます。',
      content: 'CSS GridとFlexboxの使い分けについて...',
      date: '2024-11-28',
      platform: 'Zenn',
      url: 'https://zenn.dev/your-username/articles/modern-css',
      likes: 298,
      views: 3120,
      comments: 42,
      readTime: 10,
      tags: ['CSS', 'Grid', 'Flexbox', 'Responsive Design'],
      category: 'Frontend',
      image: '/images/blog/modern-css.jpg'
    },
    {
      id: 5,
      title: 'Node.js + FastAPI: フルスタック開発のベストプラクティス',
      description: 'Node.jsとFastAPIを組み合わせたフルスタック開発の実践的なアプローチを紹介します。',
      content: 'フルスタック開発における技術選択について...',
      date: '2024-11-20',
      platform: 'Qiita',
      url: 'https://qiita.com/your-username/items/fullstack-best-practices',
      likes: 234,
      views: 1890,
      comments: 28,
      readTime: 14,
      tags: ['Node.js', 'FastAPI', 'Full Stack', 'API Design'],
      category: 'Backend',
      image: '/images/blog/fullstack-dev.jpg'
    },
    {
      id: 6,
      title: '大学生エンジニアが語る：技術習得の効率的な方法論',
      description: '限られた時間の中で効率的に技術を習得するための方法論と体験談を共有します。',
      content: '大学生活と技術学習の両立について...',
      date: '2024-11-15',
      platform: 'Personal',
      url: '#',
      likes: 167,
      views: 1450,
      comments: 35,
      readTime: 7,
      tags: ['Career', 'Learning', 'Student Life', 'Programming'],
      category: 'Opinion',
      image: '/images/blog/learning-methods.jpg'
    }
  ];

  const categories = ['all', 'Frontend', 'Backend', 'AI/ML', 'Tutorial', 'Opinion'];
  const platforms = ['all', 'Zenn', 'Qiita', 'Personal'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesPlatform = selectedPlatform === 'all' || post.platform === selectedPlatform;
    
    return matchesSearch && matchesCategory && matchesPlatform;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const totalViews = blogPosts.reduce((sum, post) => sum + post.views, 0);
  const totalLikes = blogPosts.reduce((sum, post) => sum + post.likes, 0);

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Zenn':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 border-blue-200/50 dark:border-blue-700/50';
      case 'Qiita':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 border-green-200/50 dark:border-green-700/50';
      case 'Personal':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200 border-purple-200/50 dark:border-purple-700/50';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200 border-gray-200/50 dark:border-gray-700/50';
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
            そして学習過程での気づきや体験談を発信しています。
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: '総記事数', value: blogPosts.length.toString(), icon: <BookOpen className="h-6 w-6" />, color: 'from-blue-500 to-cyan-500' },
            { label: '総ビュー数', value: `${(totalViews / 1000).toFixed(1)}k`, icon: <Eye className="h-6 w-6" />, color: 'from-purple-500 to-pink-500' },
            { label: '総いいね数', value: totalLikes.toString(), icon: <Heart className="h-6 w-6" />, color: 'from-emerald-500 to-teal-500' },
            { label: '注目記事', value: featuredPosts.length.toString(), icon: <Star className="h-6 w-6" />, color: 'from-orange-500 to-red-500' }
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

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <Star className="h-6 w-6 text-yellow-500 mr-2" />
              注目記事
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map(post => (
                <article key={post.id} className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="relative h-48 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPlatformColor(post.platform)}`}>
                        {post.platform}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.date).toLocaleDateString('ja-JP')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}分
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                      {post.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1 text-red-500" />
                          {post.likes}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1 text-blue-500" />
                          {post.views}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1 text-green-500" />
                          {post.comments}
                        </div>
                      </div>
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group"
                      >
                        読む
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Search and Filters */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 mb-12">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="記事を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white backdrop-blur-sm transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-12 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white backdrop-blur-sm transition-all duration-300 appearance-none bg-white dark:bg-gray-700"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'すべてのカテゴリ' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Platform Filter */}
            <div className="relative">
              <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="pl-12 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white backdrop-blur-sm transition-all duration-300 appearance-none bg-white dark:bg-gray-700"
              >
                {platforms.map(platform => (
                  <option key={platform} value={platform}>
                    {platform === 'all' ? 'すべてのプラットフォーム' : platform}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              すべての記事 ({filteredPosts.length})
            </h2>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <TrendingUp className="h-5 w-5 mr-2" />
              最新順
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <article key={post.id} className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50">
                <div className="relative h-48 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPlatformColor(post.platform)}`}>
                      {post.platform}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.date).toLocaleDateString('ja-JP')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}分
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed text-sm">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1">
                        +{post.tags.length - 2}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1 text-red-500" />
                        {post.likes}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1 text-blue-500" />
                        {post.views}
                      </div>
                    </div>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group"
                    >
                      読む
                      <ExternalLink className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                記事が見つかりませんでした
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                検索条件を変更してもう一度お試しください。
              </p>
            </div>
          )}
        </section>

        {/* External Links */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            他のプラットフォームでも発信中
          </h3>
          <div className="flex justify-center space-x-6">
            <a
              href="https://zenn.dev/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="mr-3 text-lg font-semibold">Zenn でフォロー</span>
              <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="https://qiita.com/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="mr-3 text-lg font-semibold">Qiita でフォロー</span>
              <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogPage;