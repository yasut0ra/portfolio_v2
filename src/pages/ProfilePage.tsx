import React from 'react';
import { Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Award, User, Code, Heart, Star, Trophy, Target, Shield } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const experiences = [
    {
      type: 'internship',
      title: 'インターン経験',
      items: [
        {
          company: '株式会社I',
          period: '2024年8月',
          role: 'テスター',
          description: 'ソフトウェアテスト業務に従事',
          color: 'from-blue-500 to-cyan-500'
        },
        {
          company: '株式会社J',
          period: '2024年11月',
          role: '新規事業立案/プレゼン資料作成',
          description: '新規事業の企画立案とプレゼンテーション資料の作成',
          color: 'from-purple-500 to-pink-500'
        },
        {
          company: '株式会社M',
          period: '2025年1月',
          role: 'フルスタック開発',
          description: 'フロントエンドからバックエンドまでの包括的な開発業務',
          color: 'from-emerald-500 to-teal-500'
        }
      ]
    },
    {
      type: 'research',
      title: '研究活動',
      items: [
        {
          company: 'アルゴリズム研究室',
          period: '2025年 - 現在',
          role: '推薦システム×バンディットアルゴリズム',
          description: '探索と活用のバランスを重視したアルゴリズムの設計・評価。学術論文の輪読、スライド作成、Pythonによる実装と検証',
          color: 'from-indigo-500 to-purple-500'
        }
      ]
    },
    {
      type: 'project',
      title: 'プロジェクト',
      items: [
        {
          company: '個人開発',
          period: '2025年',
          role: '対話AIプロジェクト',
          description: '音声認識、感情分析、LLM、バンディット制御を組み合わせた会話AI。Electron×ReactでUI構築、VOICEVOXで音声合成',
          color: 'from-orange-500 to-red-500'
        }
      ]
    }
  ];

  const certifications = [
    {
      name: '基本情報技術者試験',
      year: '2025',
      icon: <Trophy className="h-6 w-6" />,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      name: 'TOEIC 780点',
      year: '2025',
      icon: <Star className="h-6 w-6" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Basic SecCap 7',
      year: '2025',
      icon: <Shield className="h-6 w-6" />,
      color: 'from-red-500 to-pink-500'
    }
  ];

  const personalInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: 'メールアドレス',
      value: 'yastar.tkm83@gmail.com',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: '電話番号',
      value: '非公開',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: '住所',
      value: '北海道, 日本',
      color: 'text-purple-600 dark:text-purple-400'
    }
  ];

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 mb-8">
          {/* Cover Section */}
          <div className="relative h-64 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30"></div>
            
            {/* Floating elements */}
            <div className="absolute top-8 left-8 w-16 h-16 bg-white/20 rounded-full animate-float"></div>
            <div className="absolute top-16 right-16 w-12 h-12 bg-white/15 rounded-full animate-float animation-delay-2000"></div>
            <div className="absolute bottom-8 left-1/3 w-20 h-20 bg-white/10 rounded-full animate-float animation-delay-4000"></div>
          </div>
          
          {/* Profile Content */}
          <div className="relative px-8 pb-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-end">
              {/* Profile Image */}
              <div className="relative -mt-20 mb-6 lg:mb-0">
                <div className="w-40 h-40 rounded-full border-4 border-white dark:border-gray-800 shadow-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                  <img
                    src="/images/profile.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-800">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* Profile Info */}
              <div className="lg:ml-8 text-center lg:text-left flex-1">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  Yasut0ra
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                  フルスタック開発者 / AI研究者志望
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium border border-blue-200/50 dark:border-blue-700/50">
                    Full Stack Developer
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium border border-purple-200/50 dark:border-purple-700/50">
                    AI Researcher
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 text-emerald-800 dark:text-emerald-200 rounded-full text-sm font-medium border border-emerald-200/50 dark:border-emerald-700/50">
                    Student
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Info */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <User className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                連絡先
              </h2>
              <div className="space-y-4">
                {personalInfo.map((info, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50/80 dark:bg-gray-700/50 rounded-xl">
                    <div className={`${info.color} mr-3`}>
                      {info.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{info.label}</p>
                      <p className="text-gray-800 dark:text-gray-200 font-medium break-words">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-2" />
                学歴
              </h2>
              <div className="space-y-6">
                <div className="relative pl-6 border-l-2 border-purple-200 dark:border-purple-700">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    北海道大学 工学部 情報エレクトロニクス学科
                  </h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">2022 - 2026（予定）</p>
                </div>
                <div className="relative pl-6 border-l-2 border-purple-200 dark:border-purple-700">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-400 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    北海道大学 情報科学院
                  </h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">2026 - 2028（予定）</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-2" />
                資格
              </h2>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                    <div className={`w-12 h-12 bg-gradient-to-r ${cert.color} rounded-xl flex items-center justify-center text-white mr-4`}>
                      {cert.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {cert.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">{cert.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Heart className="h-7 w-7 text-red-500 mr-3" />
                自己紹介
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  北海道大学の情報科学部に所属し、<span className="font-semibold text-blue-600 dark:text-blue-400">推薦システム×バンディットアルゴリズム</span>を研究。
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  <span className="font-semibold text-purple-600 dark:text-purple-400">React / Node.js</span> を中心としたフルスタック開発や、<span className="font-semibold text-emerald-600 dark:text-emerald-400">会話AIアシスタント</span>の実装などにも取り組んでいます。
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  知識の吸収と実装の両輪で、現実の問題にアプローチするのが得意です。
                </p>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                <Briefcase className="h-7 w-7 text-blue-600 dark:text-blue-400 mr-3" />
                経験
              </h2>
              <div className="space-y-8">
                {experiences.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                      {section.type === 'internship' && <Target className="h-5 w-5 text-blue-500 mr-2" />}
                      {section.type === 'research' && <Code className="h-5 w-5 text-purple-500 mr-2" />}
                      {section.type === 'project' && <Star className="h-5 w-5 text-orange-500 mr-2" />}
                      {section.title}
                    </h3>
                    <div className="space-y-6">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700 last:border-l-0">
                          <div className={`absolute -left-3 top-0 w-6 h-6 bg-gradient-to-r ${item.color} rounded-full border-2 border-white dark:border-gray-800`}></div>
                          <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                              <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                {item.role}
                              </h4>
                              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                                {item.period}
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">{item.company}</p>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;