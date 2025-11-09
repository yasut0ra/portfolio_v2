import React, { useMemo, useState } from 'react';
import { ArrowLeft, Mic, Smile, Activity, Sparkles, Waves, Radio, MessageSquare, Heart, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Persona {
  id: string;
  name: string;
  tone: string;
  traits: string[];
  bandit: string;
  exploration: string;
}

interface EmotionScenario {
  id: string;
  label: string;
  userUtterance: string;
  agentResponse: {
    [personaId: string]: string;
  };
}

const personas: Persona[] = [
  {
    id: 'focus',
    name: 'Focus Guide',
    tone: '落ち着いたコーチング',
    traits: ['低音声', '安定したペース', '明確なタスク分解'],
    bandit: 'Contextual Thompson',
    exploration: '0.25',
  },
  {
    id: 'uplift',
    name: 'Uplift Buddy',
    tone: 'ポジティブで親しみやすい',
    traits: ['ハイテンション', '共感重視', '即応答'],
    bandit: 'Softmax UCB',
    exploration: '0.42',
  },
  {
    id: 'researcher',
    name: 'Research Mentor',
    tone: '洞察的で知的',
    traits: ['長文応答', '背景説明', '引用リンク'],
    bandit: 'Hybrid LinUCB',
    exploration: '0.31',
  },
];

const emotionalScenarios: EmotionScenario[] = [
  {
    id: 'frustrated',
    label: 'Frustrated',
    userUtterance: '正直、タスクが多すぎて何から手を付ければいいか分からない…',
    agentResponse: {
      focus:
        '今のタスクを 3 分割して、最初の 5 分だけ一緒に取り組もう。必要なら進捗をライブでモニターするよ。',
      uplift:
        'よく頑張ってる！一緒にミニゲーム化して乗り切ろう。最初のステップだけ決めれば勢いが出るはず。',
      researcher:
        '脳のワーキングメモリ容量を超えている兆候だね。まずはタスクを可視化して負荷を外部化しよう。',
    },
  },
  {
    id: 'sleepy',
    label: 'Sleepy',
    userUtterance: '眠気がすごい…。でも締切は今日中なんだ。',
    agentResponse: {
      focus:
        '短い立ち作業＋呼吸リセットを提案するよ。5 分後に集中し直せるようアラートも送るね。',
      uplift:
        'ねむねむの気持ち、わかる…！リズム良く起きるために、お気に入りの音楽で一緒にテンション上げよう。',
      researcher:
        '眠気は集中資源の低下だから、刺激よりも負荷配分の最適化が重要。重要タスクだけ先に片付けよう。',
    },
  },
  {
    id: 'excited',
    label: 'Excited',
    userUtterance: '新しいアイデアが浮かんだ！でもちゃんとまとめられるか不安。',
    agentResponse: {
      focus:
        '過去の類似ログからテンプレートを引っ張っておいたよ。3 ステップで整理してみよう。',
      uplift:
        '最高！勢いがある今のうちに一緒に構成を固めちゃお。アイデアの種を全部受け止めるよ！',
      researcher:
        'そのアイデア、既存研究との位置付けも確認すると説得力が増すよ。関連論文を 2 件共有するね。',
    },
  },
];

const ConversationalAgentPage: React.FC = () => {
  const [persona, setPersona] = useState<Persona>(personas[0]);
  const [emotion, setEmotion] = useState<EmotionScenario>(emotionalScenarios[0]);

  const personaResponse = useMemo(() => emotion.agentResponse[persona.id], [emotion, persona]);

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex items-center gap-3 text-sm text-blue-600 dark:text-blue-400 font-semibold">
          <Link to="/research" className="inline-flex items-center gap-2 hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Research
          </Link>
          <span>/</span>
          <span>Conversational Agent</span>
        </div>

        <section className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 space-y-6">
          <span className="inline-flex items-center px-3 py-1 text-sm font-semibold text-purple-700 dark:text-purple-300 bg-purple-100/70 dark:bg-purple-900/40 rounded-full">
            <Mic className="h-4 w-4 mr-2" />
            Conversational Bandit Agent
          </span>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Conversational Bandit Agent</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                音声・感情分析×バンディット制御で、ユーザーの状態に合わせてペルソナを切り替える対話エージェントのデモ。
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-6 w-full lg:w-80">
              <p className="text-sm uppercase tracking-widest mb-2 opacity-80">Routing policy</p>
              <div className="text-3xl font-semibold mb-4">{persona.bandit}</div>
              <p className="text-white/80 text-sm">Exploration rate: {persona.exploration}</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-2xl shadow border border-gray-200/60 dark:border-gray-700/60">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Smile className="h-5 w-5 text-blue-500" />
              ペルソナ切り替え
            </h2>
            <div className="space-y-3">
              {personas.map(option => (
                <button
                  key={option.id}
                  onClick={() => setPersona(option)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    persona.id === option.id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-900 dark:text-purple-50 shadow'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-400'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{option.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{option.tone}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                    {option.traits.map(trait => (
                      <span key={trait} className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                        {trait}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-2xl shadow border border-gray-200/60 dark:border-gray-700/60">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-rose-500" />
              感情シナリオ
            </h2>
            <div className="space-y-3">
              {emotionalScenarios.map(option => (
                <button
                  key={option.id}
                  onClick={() => setEmotion(option)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    emotion.id === option.id
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/30 text-rose-900 dark:text-rose-50 shadow'
                      : 'border-gray-200 dark:border-gray-700 hover:border-rose-400'
                  }`}
                >
                  <div className="font-semibold mb-1">{option.label}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{option.userUtterance}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl border border-gray-200/60 dark:border-gray-700/60 space-y-6">
          <div className="flex items-center gap-3 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
            <Radio className="h-4 w-4 text-blue-500" />
            Conversation Preview
          </div>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <Waves className="h-5 w-5 text-gray-500" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 flex-1">
                <p className="text-gray-900 dark:text-white">{emotion.userUtterance}</p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <div className="bg-blue-600 text-white rounded-2xl p-4 max-w-xl shadow-lg">
                {personaResponse}
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                AI
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
            {[
              {
                label: 'Emotion detection latency',
                value: '42 ms',
                icon: <Waves className="h-4 w-4 text-blue-500" />,
              },
              {
                label: 'Bandit decision time',
                value: '18 ms',
                icon: <Brain className="h-4 w-4 text-purple-500" />,
              },
              {
                label: 'User satisfaction gain',
                value: '+11% (offline)',
                icon: <Heart className="h-4 w-4 text-rose-500" />,
              },
            ].map(item => (
              <div key={item.label} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
                <div>{item.icon}</div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">{item.label}</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ConversationalAgentPage;
