import React from 'react';
import { BookOpen, Users, Calendar, FileText, ExternalLink, Award, Play } from 'lucide-react';
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
}

interface ResearchInterest {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ResearchPage: React.FC = () => {
  const publications: Publication[] = [
    {
      id: 1,
      title: "現在、学部研究を進行中。今後投稿予定。",
      authors: ["Yasut0ra"],
      conference: "",
      year: "2025",
      abstract: "現在、学部研究を進行中。今後投稿予定。",
      doi: "",
      pdf: "",
      citations: 0
    },
  ];

  const researchInterests: ResearchInterest[] = [
    {
      title: "推薦システム",
      description: "ユーザの多様性や満足度を考慮した推薦手法。強化学習やバンディット問題の応用。",
      icon: <BookOpen className="h-8 w-8 text-blue-500" />
    },
    {
      title: "バンディットアルゴリズム",
      description: "セミバンディット / ランキングバンディット。探索と活用のバランス、パーソナライズ手法の設計。",
      icon: <Users className="h-8 w-8 text-blue-500" />
    },
    {
      title: "深層学習",
      description: "大規模モデルによるユーザモデリング。転移学習・埋め込み表現を用いた推薦最適化。",
      icon: <Award className="h-8 w-8 text-blue-500" />
    }
  ];

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            研究 <span className="text-blue-600 dark:text-blue-400">活動</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          推薦システムと機械学習のフロンティアを探究中。
          </p>
        </div>

        {/* Interactive Demos Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            インタラクティブデモ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/bandit-playground"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <Play className="h-8 w-8 text-blue-500 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  バンディットアルゴリズムのシミュレーション
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                バンディットアルゴリズムのシミュレーション環境で、様々なアルゴリズムを試すことができます。
              </p>
            </Link>
          </div>
        </section>

        {/* Research Interests */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            研究関心領域
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {researchInterests.map((interest, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="mb-4">{interest.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {interest.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {interest.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            論文
          </h2>
          <div className="space-y-6">
            {publications.map(pub => (
              <article key={pub.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {pub.title}
                </h3>
                
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {pub.authors.join(", ")}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {pub.year}
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {pub.citations} citations
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong className="text-gray-900 dark:text-white">Conference:</strong> {pub.conference}
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {pub.abstract}
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    DOI
                  </a>
                  {pub.pdf && (
                    <a
                      href={pub.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <FileText className="h-4 w-4 mr-1" />
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