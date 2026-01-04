import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Mic,
  Smile,
  Activity,
  Sparkles,
  Waves,
  Radio,
  Heart,
  Brain,
  Sliders,
  Target,
  Gauge,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
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
  signals: EmotionSignals;
}

type SignalKey = 'valence' | 'arousal' | 'load' | 'urgency';

interface EmotionSignals {
  valence: number;
  arousal: number;
  load: number;
  urgency: number;
}

interface DecisionLogEntry {
  id: number;
  type: 'route' | 'reward';
  personaName: string;
  emotionLabel: string;
  probability?: number;
  reward?: number;
  mode?: 'auto' | 'manual';
}

const signalDefinitions: { id: SignalKey; label: string; description: string; color: string }[] = [
  {
    id: 'valence',
    label: 'Valence',
    description: 'ポジティブ/ネガティブの傾向',
    color: 'from-emerald-500 to-lime-500',
  },
  {
    id: 'arousal',
    label: 'Arousal',
    description: 'エネルギー/覚醒度',
    color: 'from-sky-500 to-blue-500',
  },
  {
    id: 'load',
    label: 'Cognitive Load',
    description: '認知負荷の高さ',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'urgency',
    label: 'Urgency',
    description: '締切・緊急度',
    color: 'from-rose-500 to-red-500',
  },
];

const personaPolicies: Record<Persona['id'], { base: number; weights: Record<SignalKey, number> }> = {
  focus: {
    base: 0.22,
    weights: { valence: 0.08, arousal: -0.05, load: 0.42, urgency: 0.35 },
  },
  uplift: {
    base: 0.18,
    weights: { valence: 0.4, arousal: 0.28, load: -0.12, urgency: 0.05 },
  },
  researcher: {
    base: 0.2,
    weights: { valence: 0.15, arousal: -0.08, load: 0.3, urgency: -0.05 },
  },
};
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
    signals: {
      valence: 22,
      arousal: 72,
      load: 86,
      urgency: 68,
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
    signals: {
      valence: 34,
      arousal: 22,
      load: 55,
      urgency: 78,
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
    signals: {
      valence: 78,
      arousal: 82,
      load: 46,
      urgency: 52,
    },
  },
];

const ConversationalAgentPage: React.FC = () => {
  const [persona, setPersona] = useState<Persona>(personas[0]);
  const [emotion, setEmotion] = useState<EmotionScenario>(emotionalScenarios[0]);
  const [contextSignals, setContextSignals] = useState<EmotionSignals>(emotionalScenarios[0].signals);
  const [autoRouting, setAutoRouting] = useState(true);
  const [temperature, setTemperature] = useState(0.8);
  const [personaStats, setPersonaStats] = useState<Record<string, { wins: number; trials: number }>>(() =>
    personas.reduce((acc, item) => {
      acc[item.id] = { wins: 0, trials: 0 };
      return acc;
    }, {} as Record<string, { wins: number; trials: number }>)
  );
  const [decisionLog, setDecisionLog] = useState<DecisionLogEntry[]>([]);
  const logIdRef = useRef(1);

  useEffect(() => {
    setContextSignals(emotion.signals);
  }, [emotion]);

  const normalizedSignals = useMemo(
    () => ({
      valence: contextSignals.valence / 100,
      arousal: contextSignals.arousal / 100,
      load: contextSignals.load / 100,
      urgency: contextSignals.urgency / 100,
    }),
    [contextSignals]
  );

  const policyRanking = useMemo(() => {
    const scores = personas.map(option => {
      const config = personaPolicies[option.id];
      const score =
        config.base +
        config.weights.valence * normalizedSignals.valence +
        config.weights.arousal * normalizedSignals.arousal +
        config.weights.load * normalizedSignals.load +
        config.weights.urgency * normalizedSignals.urgency;
      const stats = personaStats[option.id];
      const posterior = (stats.wins + 1) / (stats.trials + 2);
      return { persona: option, score, posterior };
    });

    const maxScore = Math.max(...scores.map(item => item.score));
    const safeTemperature = Number.isFinite(temperature) ? temperature : 0.8;
    const temp = Math.max(0.2, safeTemperature);
    const expScores = scores.map(item => Math.exp((item.score - maxScore) / temp));
    const total = expScores.reduce((sum, value) => sum + value, 0) || 1;

    return scores
      .map((item, index) => ({
        ...item,
        probability: expScores[index] / total,
      }))
      .sort((a, b) => b.probability - a.probability);
  }, [normalizedSignals, personaStats, temperature]);

  const personaResponse = useMemo(() => emotion.agentResponse[persona.id], [emotion, persona]);
  const activeStats = personaStats[persona.id];
  const activePosterior = (activeStats.wins + 1) / (activeStats.trials + 2);
  const contextIndicators = useMemo(
    () => [
      {
        label: 'Sentiment',
        value: contextSignals.valence >= 60 ? 'Positive' : contextSignals.valence <= 40 ? 'Negative' : 'Neutral',
      },
      {
        label: 'Energy',
        value: contextSignals.arousal >= 60 ? 'High' : contextSignals.arousal <= 35 ? 'Low' : 'Medium',
      },
      {
        label: 'Load',
        value: contextSignals.load >= 70 ? 'Heavy' : contextSignals.load <= 40 ? 'Light' : 'Medium',
      },
      {
        label: 'Urgency',
        value: contextSignals.urgency >= 70 ? 'Critical' : contextSignals.urgency <= 40 ? 'Low' : 'Normal',
      },
    ],
    [contextSignals]
  );

  const signalContributions = useMemo(() => {
    const config = personaPolicies[persona.id];
    const contributions = signalDefinitions.map(definition => {
      const weight = config.weights[definition.id];
      const contribution = weight * normalizedSignals[definition.id];
      return {
        ...definition,
        weight,
        contribution,
      };
    });
    const maxAbs = Math.max(...contributions.map(item => Math.abs(item.contribution)), 0);
    return contributions.map(item => ({
      ...item,
      magnitude: maxAbs > 0 ? (Math.abs(item.contribution) / maxAbs) * 100 : 0,
    }));
  }, [normalizedSignals, persona]);

  const addLogEntry = useCallback((entry: Omit<DecisionLogEntry, 'id'>) => {
    setDecisionLog(prev => {
      const next = [{ id: logIdRef.current++, ...entry }, ...prev];
      return next.slice(0, 6);
    });
  }, []);

  const routeDecision = useCallback(
    (mode: 'auto' | 'manual') => {
      if (!policyRanking.length) return;
      const selector = Math.random();
      let cumulative = 0;
      let selected = policyRanking[0];

      for (const candidate of policyRanking) {
        cumulative += candidate.probability;
        if (selector <= cumulative) {
          selected = candidate;
          break;
        }
      }

      if (mode === 'auto') {
        selected = policyRanking[0];
      }

      if (mode === 'manual') {
        setAutoRouting(false);
      }

      setPersona(selected.persona);
      addLogEntry({
        type: 'route',
        personaName: selected.persona.name,
        emotionLabel: emotion.label,
        probability: selected.probability,
        mode,
      });
    },
    [addLogEntry, emotion.label, policyRanking]
  );

  const recordFeedback = useCallback(
    (reward: 0 | 1) => {
      setPersonaStats(prev => {
        const current = prev[persona.id];
        return {
          ...prev,
          [persona.id]: {
            wins: current.wins + reward,
            trials: current.trials + 1,
          },
        };
      });

      addLogEntry({
        type: 'reward',
        personaName: persona.name,
        emotionLabel: emotion.label,
        reward,
      });
    },
    [addLogEntry, emotion.label, persona.id, persona.name]
  );

  useEffect(() => {
    if (!autoRouting || !policyRanking.length) {
      return;
    }
    const recommended = policyRanking[0].persona;
    if (recommended.id !== persona.id) {
      setPersona(recommended);
      addLogEntry({
        type: 'route',
        personaName: recommended.name,
        emotionLabel: emotion.label,
        probability: policyRanking[0].probability,
        mode: 'auto',
      });
    }
  }, [addLogEntry, autoRouting, emotion.label, persona.id, policyRanking]);

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

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

          <div className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-2xl shadow border border-gray-200/60 dark:border-gray-700/60">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Sliders className="h-5 w-5 text-blue-500" />
                Context Signals
              </h2>
              <button
                onClick={() => setContextSignals(emotion.signals)}
                className="text-xs font-semibold text-blue-600 dark:text-blue-300 hover:underline"
              >
                Reset
              </button>
            </div>
            <div className="space-y-4">
              {signalDefinitions.map(definition => {
                const value = contextSignals[definition.id];
                return (
                  <div key={definition.id}>
                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
                      <div>
                        <div className="font-semibold">{definition.label}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{definition.description}</div>
                      </div>
                      <span className="font-semibold">{value}</span>
                    </div>
                    <div className="mt-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(event) =>
                          setContextSignals(prev => ({
                            ...prev,
                            [definition.id]: Number(event.target.value),
                          }))
                        }
                        className="w-full accent-blue-500"
                      />
                      <div className="mt-2 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${definition.color}`}
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-gray-600 dark:text-gray-300">
              {contextIndicators.map(indicator => (
                <div
                  key={indicator.label}
                  className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700"
                >
                  <div className="uppercase tracking-wider text-gray-500 dark:text-gray-400">{indicator.label}</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{indicator.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-2xl shadow border border-gray-200/60 dark:border-gray-700/60">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-500" />
                Bandit Router
              </h2>
              <button
                onClick={() => setAutoRouting(prev => !prev)}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  autoRouting
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-900/40 dark:text-gray-300'
                }`}
              >
                Auto {autoRouting ? 'On' : 'Off'}
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Policy Temperature
                </label>
                <input
                  type="number"
                  min="0.3"
                  max="1.6"
                  step="0.1"
                  value={temperature}
                  onChange={(event) => {
                    const nextValue = Number(event.target.value);
                    if (Number.isNaN(nextValue)) {
                      setTemperature(0.8);
                      return;
                    }
                    setTemperature(Math.min(1.6, Math.max(0.3, nextValue)));
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <button
                onClick={() => routeDecision('manual')}
                className="w-full inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
              >
                Route Now
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {policyRanking.map(option => {
                const isActive = persona.id === option.persona.id;
                return (
                  <button
                    key={option.persona.id}
                    onClick={() => {
                      setAutoRouting(false);
                      setPersona(option.persona);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isActive
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-900 dark:text-purple-50 shadow'
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{option.persona.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {(option.probability * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {option.persona.tone} · {option.persona.bandit}
                    </div>
                    <div className="flex flex-wrap gap-2 text-[11px] text-gray-500 dark:text-gray-400 mb-2">
                      {option.persona.traits.map(trait => (
                        <span key={trait} className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                          {trait}
                        </span>
                      ))}
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                        style={{ width: `${option.probability * 100}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                        score {option.score.toFixed(2)}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                        posterior {(option.posterior * 100).toFixed(1)}%
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl border border-gray-200/60 dark:border-gray-700/60">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
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
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span className="uppercase tracking-widest">Feedback</span>
                  <button
                    onClick={() => recordFeedback(1)}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-200 font-semibold"
                  >
                    <ThumbsUp className="h-3 w-3" />
                    Helpful
                  </button>
                  <button
                    onClick={() => recordFeedback(0)}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-200 font-semibold"
                  >
                    <ThumbsDown className="h-3 w-3" />
                    Not Helpful
                  </button>
                  <span className="text-gray-400">
                    Posterior {(activePosterior * 100).toFixed(1)}% · {activeStats.wins} / {activeStats.trials}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-300">
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
                    label: 'Posterior satisfaction',
                    value: `${(activePosterior * 100).toFixed(1)}%`,
                    icon: <Heart className="h-4 w-4 text-rose-500" />,
                  },
                  {
                    label: 'Exposure count',
                    value: `${activeStats.trials} turns`,
                    icon: <Gauge className="h-4 w-4 text-emerald-500" />,
                  },
                ].map(item => (
                  <div
                    key={item.label}
                    className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 flex items-center gap-3"
                  >
                    <div>{item.icon}</div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">{item.label}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-widest mb-4">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  Routing Rationale
                </div>
                <div className="space-y-3">
                  {signalContributions.map(item => (
                    <div key={item.id}>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                        <span>{item.label}</span>
                        <span>{item.weight >= 0 ? '+' : ''}{item.weight.toFixed(2)}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.contribution >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                          style={{ width: `${item.magnitude}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/90 dark:bg-gray-800/90 border border-gray-200/60 dark:border-gray-700/60 shadow">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-widest mb-4">
                  <Smile className="h-4 w-4 text-blue-500" />
                  Decision Log
                </div>
                <div className="space-y-2 text-sm">
                  {decisionLog.length === 0 && (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-4">ログはまだ空です</div>
                  )}
                  {decisionLog.map(entry => (
                    <div
                      key={entry.id}
                      className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center justify-between text-gray-700 dark:text-gray-200">
                        <span className="font-semibold">
                          {entry.type === 'route' ? entry.personaName : `${entry.personaName} feedback`}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {entry.type === 'route'
                            ? `${((entry.probability ?? 0) * 100).toFixed(1)}%`
                            : entry.reward === 1
                              ? '+1'
                              : '0'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {entry.type === 'route'
                          ? `${entry.mode === 'auto' ? 'Auto' : 'Manual'} · ${entry.emotionLabel}`
                          : `Reward update · ${entry.emotionLabel}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ConversationalAgentPage;
