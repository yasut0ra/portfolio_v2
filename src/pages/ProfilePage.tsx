import React from 'react';
import { Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Award } from 'lucide-react';

const ProfilePage: React.FC = () => {
  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {/* Header/Cover Image */}
          <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          
          {/* Profile Section */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="relative -mt-20 w-40 h-40">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                  alt="Profile"
                  className="w-full h-full rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-lg"
                />
              </div>
              <div className="mt-6 sm:mt-0 sm:ml-6 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Yasut0ra</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">フルスタック開発者 / AI研究者志望</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="px-6 py-6 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">yastar.tkm83@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">非公開</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">北海道, 日本</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="px-6 py-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">自己紹介</h2>
            <p className="text-gray-700 dark:text-gray-300">
            北海道大学の情報科学部に所属し、推薦システム×バンディットアルゴリズムを研究。<br/>
            React / Node.js を中心としたフルスタック開発や、会話AIアシスタントの実装などにも取り組んでいます。<br/>
            知識の吸収と実装の両輪で、現実の問題にアプローチするのが得意です。
            </p>
          </div>

          {/* Experience */}
          <div className="px-6 py-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">経験</h2>
            <div className="space-y-6">
              <div className="flex">
                <Briefcase className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">インターン</h3>
                  <p className="text-gray-600 dark:text-gray-400">株式会社I（2024/08）</p>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                  テスター
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">株式会社J（2024/11）</p>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                  新規事業立案/プレゼン資料作成
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">株式会社M（2025/01）</p>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                  フルスタック開発
                  </p>
                </div>
              </div>
              <div className="flex">
                <Briefcase className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">研究活動（推薦システム×バンディットアルゴリズム）</h3>
                  <p className="text-gray-600 dark:text-gray-400">アルゴリズム研究室（2025 - 現在）</p>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                  探索と活用のバランスを重視したアルゴリズムの設計・評価<br/>
                  学術論文の輪読、スライド作成、Pythonによる実装と検証
                  </p>
                </div>
              </div>
              <div className="flex">
                <Briefcase className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">対話AIプロジェクト</h3>
                  <p className="text-gray-600 dark:text-gray-400">個人開発（2025）</p>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                  音声認識、感情分析、LLM、バンディット制御を組み合わせた会話AI<br/>
                  Electron×ReactでUI構築、VOICEVOXで音声合成
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="px-6 py-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">学歴</h2>
            <div className="flex">
              <GraduationCap className="h-5 w-5 text-blue-500 mr-3 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  北海道大学 工学部 情報エレクトロニクス学科
                </h3>
                <p className="text-gray-600 dark:text-gray-400">2022 - 2026（予定）</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  北海道大学 情報科学院
                </h3>
                <p className="text-gray-600 dark:text-gray-400">2026 - 2028（予定）</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="px-6 py-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">資格</h2>
            <div className="space-y-4">
              <div className="flex">
                <Award className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    基本情報技術者試験
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">2025</p>
                </div>
              </div>
              <div className="flex">
                <Award className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    TOEIC 780点
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;