import React from 'react';
import { FileText, Award, Code, Heart } from 'lucide-react';
import InteractiveCard from './InteractiveCard';
import MagneticButton from './MagneticButton';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Me</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
            情熱と技術で未来を創造する開発者
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <InteractiveCard intensity={0.8} className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-full h-96 sm:h-[28rem] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/profile.png" 
                  alt="Portrait" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex flex-col items-center justify-center transform rotate-6 shadow-xl group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white font-bold text-2xl transform -rotate-6">3+</span>
                <span className="text-white text-xs transform -rotate-6 text-center leading-tight">Years<br/>Experience</span>
              </div>
            </InteractiveCard>
          </div>
          
          <div className="lg:w-1/2 space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Heart className="h-8 w-8 text-red-500 mr-3" />
                私について
              </h3>
              <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p className="text-lg">
                  私は北海道大学の情報系学生であり、
                  <span className="font-semibold text-blue-600 dark:text-blue-400">フルスタック開発</span>と
                  <span className="font-semibold text-purple-600 dark:text-purple-400">AIの応用</span>
                  （特に推薦システムとバンディットアルゴリズム）に情熱を注いでいます。
                </p>
                <p className="text-lg">
                  美しく、機能的で、ユーザーにやさしいアプリケーションを作ることが好きで、
                  フロントエンドとバックエンドの両方の知識を活かして、企画から実装・運用まで一貫した開発が可能です。
                </p>
                <p className="text-lg">
                  最近は特に、<span className="font-semibold text-emerald-600 dark:text-emerald-400">能動的に会話できるAIアシスタント</span>などのプロジェクトに取り組んでいます。
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <Code className="h-5 w-5" />, label: "名前（ハンドルネーム）", value: "Yasut0ra", color: "text-blue-600 dark:text-blue-400" },
                { icon: <FileText className="h-5 w-5" />, label: "メールアドレス", value: "yastar.tkm83@gmail.com", color: "text-purple-600 dark:text-purple-400" },
                { icon: <Award className="h-5 w-5" />, label: "住所", value: "北海道, 日本", color: "text-emerald-600 dark:text-emerald-400" },
                { icon: <Heart className="h-5 w-5" />, label: "ステータス", value: "インターン・共同開発募集中", color: "text-rose-600 dark:text-rose-400" }
              ].map((item, index) => (
                <InteractiveCard 
                  key={index} 
                  className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50"
                  intensity={0.3}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`${item.color} mt-1 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
                      <p className="text-gray-800 dark:text-gray-200 font-medium break-words">{item.value}</p>
                    </div>
                  </div>
                </InteractiveCard>
              ))}
            </div>
            
            <div className="pt-4">
              <MagneticButton
                href="#"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300"
                magneticStrength={0.4}
              >
                <FileText className="mr-3 h-5 w-5 transition-transform duration-300" />
                Download CV
                <div className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  →
                </div>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;