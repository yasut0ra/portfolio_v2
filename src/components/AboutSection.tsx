import React from 'react';
import { FileText, Award, Code, Heart, Sparkles } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Who I Am</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            情熱と技術で未来を創造する開発者
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Column */}
          <div className="lg:w-1/2">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-full h-96 sm:h-[28rem] bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/profile.png"
                  alt="Portrait"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl flex flex-col items-center justify-center transform rotate-6 shadow-xl group-hover:rotate-12 transition-transform duration-300 border-none">
                <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">3+</span>
                <span className="text-gray-600 dark:text-gray-300 text-xs font-medium text-center leading-tight mt-1">Years<br />Experience</span>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:w-1/2 space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-6 flex items-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                  Passionate Developer
                </span>
              </h3>
              <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                <p>
                  私は北海道大学の情報系学生であり、
                  <span className="font-semibold text-primary-600 dark:text-primary-400">フルスタック開発</span>と
                  <span className="font-semibold text-secondary-600 dark:text-secondary-400">AIの応用</span>
                  （特に推薦システムとバンディットアルゴリズム）に情熱を注いでいます。
                </p>
                <p>
                  美しく、機能的で、ユーザーにやさしいアプリケーションを作ることが好きで、
                  フロントエンドとバックエンドの両方の知識を活かして、企画から実装・運用まで一貫した開発が可能です。
                </p>
                <p>
                  最近は特に、<span className="font-semibold text-emerald-600 dark:text-emerald-400">能動的に会話できるAIアシスタント</span>などのプロジェクトに取り組んでいます。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Code, label: "Name", value: "Yasut0ra", color: "text-blue-500" },
                { icon: FileText, label: "Email", value: "yastar.tkm83@gmail.com", color: "text-purple-500" },
                { icon: Award, label: "Location", value: "Hokkaido, Japan", color: "text-emerald-500" },
                { icon: Heart, label: "Status", value: "Open to Work", color: "text-rose-500" }
              ].map((item, index) => (
                <div key={index} className="glass-card p-4 rounded-xl flex items-center space-x-4 group hover:-translate-y-1">
                  <div className={`p-2 rounded-lg bg-gray-50 dark:bg-white/5 ${item.color} group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
