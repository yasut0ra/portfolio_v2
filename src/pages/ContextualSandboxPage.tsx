import React, { useMemo, useState, useEffect } from 'react';
import { ArrowLeft, Filter, Activity, BarChart3, Target, Sparkles, ShieldCheck, Cpu, Radar, Layers, Gauge, Sigma } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ContextScenario {
  id: string;
  title: string;
  segment: string;
  description: string;
  features: { label: string; value: number; color: string }[];
  recommendation: string;
  uplift: string;
}

const scenarios: ContextScenario[] = [
  {
    id: 'student',
    title: '学習アプリ利用中の学生',
    segment: 'Student · Evening · Mobile',
    description: 'スマホで学習アプリを使っている大学生。夜間に集中力が落ちやすいユーザー。',
    features: [
      { label: 'セッション長', value: 78, color: 'from-blue-500 to-cyan-500' },
      { label: '最近の正答率', value: 62, color: 'from-purple-500 to-pink-500' },
      { label: '行動多様性', value: 45, color: 'from-emerald-500 to-teal-500' },
    ],
    recommendation: '短時間で終わる復習クイズ',
    uplift: '+12.4% CTR',
  },
  {
    id: 'commuter',
    title: '通勤電車でニュースを読む社会人',
    segment: 'Worker · Morning · Mobile',
    description: '通勤中にニュースアプリを開くユーザー。興味の幅が広く、短時間で情報収集したいタイプ。',
    features: [
      { label: 'スクロール速度', value: 64, color: 'from-orange-500 to-rose-500' },
      { label: 'クリック深度', value: 40, color: 'from-sky-500 to-indigo-500' },
      { label: 'ジャンル多様性', value: 82, color: 'from-green-500 to-lime-500' },
    ],
    recommendation: '要約付きレコメンドニュース',
    uplift: '+9.1% CTR',
  },
  {
    id: 'music',
    title: '夜のプレイリストを探すユーザー',
    segment: 'Creator · Night · Desktop',
    description: '作業BGMを探すクリエイター。過去再生履歴が多く、即時反応が見られるユーザー。',
    features: [
      { label: 'お気に入り密度', value: 88, color: 'from-fuchsia-500 to-violet-500' },
      { label: 'スキップ率', value: 25, color: 'from-cyan-500 to-blue-500' },
      { label: '再訪頻度', value: 91, color: 'from-amber-500 to-orange-500' },
    ],
    recommendation: '類似アーティスト × 新曲探索プレイリスト',
    uplift: '+15.7% CTR',
  },
];

const contextualModels = [
  {
    name: 'LinUCB',
    advantage: '+12% on cold-start',
    description: '線形モデルで即座に特徴量の貢献度を推定。',
    icon: <Target className="h-5 w-5 text-blue-500" />,
  },
  {
    name: 'Neural Bandit',
    advantage: '+18% personalization',
    description: '埋め込み表現を取り入れたディープバンディット。',
    icon: <Sparkles className="h-5 w-5 text-purple-500" />,
  },
  {
    name: 'Hybrid Thompson',
    advantage: 'Stable exploration',
    description: '探索度合いをコンテキストごとに自動調整。',
    icon: <ShieldCheck className="h-5 w-5 text-emerald-500" />,
  },
];

const actionCandidates = [
  {
    id: 'focus',
    label: '集中型レコメンド',
    base: 0.2,
    weights: [0.6, 0.2, 0.1],
  },
  {
    id: 'diversity',
    label: '多様性重視フィード',
    base: 0.15,
    weights: [0.1, 0.5, 0.6],
  },
  {
    id: 'deep-dive',
    label: '深掘りリコメンド',
    base: 0.25,
    weights: [0.4, 0.4, 0.2],
  },
  {
    id: 'explore',
    label: '探索枠を強化',
    base: 0.18,
    weights: [0.2, 0.1, 0.7],
  },
];

const modelCalibration = {
  LinUCB: { exploration: 0.12, variance: 0.08 },
  'Neural Bandit': { exploration: 0.08, variance: 0.12 },
  'Hybrid Thompson': { exploration: 0.18, variance: 0.1 },
};

const ContextualSandboxPage: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<ContextScenario>(scenarios[0]);
  const [selectedModel, setSelectedModel] = useState(contextualModels[0].name);
  const [featureAdjustments, setFeatureAdjustments] = useState<number[]>(
    scenarios[0].features.map(() => 0)
  );

  useEffect(() => {
    setFeatureAdjustments(selectedScenario.features.map(() => 0));
  }, [selectedScenario]);

  const adjustedFeatures = useMemo(() => {
    return selectedScenario.features.map((feature, index) => {
      const adjustedValue = Math.max(0, Math.min(100, feature.value + featureAdjustments[index]));
      return {
        ...feature,
        adjustedValue,
      };
    });
  }, [selectedScenario, featureAdjustments]);

  const featureInsights = useMemo(() => {
    return adjustedFeatures.map(feature => ({
      ...feature,
      explanation: `${feature.label} が高いほど推奨順位が上がる傾向`,
    }));
  }, [adjustedFeatures]);

  const modelSummary = useMemo(() => contextualModels.find(model => model.name === selectedModel), [selectedModel]);

  const featureVector = useMemo(() => adjustedFeatures.map(feature => feature.adjustedValue / 100), [adjustedFeatures]);

  const policyRanking = useMemo(() => {
    const scored = actionCandidates.map(candidate => {
      const signal = candidate.weights.reduce((sum, weight, index) => sum + weight * (featureVector[index] ?? 0), 0);
      const score = candidate.base + signal;
      return { ...candidate, score };
    });
    const maxScore = Math.max(...scored.map(item => item.score));
    const expScores = scored.map(item => Math.exp((item.score - maxScore) * 2));
    const total = expScores.reduce((sum, value) => sum + value, 0) || 1;
    return scored
      .map((item, index) => ({
        ...item,
        probability: expScores[index] / total,
        expectedReward: Math.min(0.9, 0.2 + item.score * 0.6),
      }))
      .sort((a, b) => b.expectedReward - a.expectedReward);
  }, [featureVector]);

  const evaluationMetrics = useMemo(() => {
    const calibration = modelCalibration[selectedModel as keyof typeof modelCalibration] ?? modelCalibration.LinUCB;
    const averageSignal = featureVector.reduce((sum, value) => sum + value, 0) / Math.max(1, featureVector.length);
    const expectedReward = 0.18 + averageSignal * 0.6;
    const ips = expectedReward * (1 - calibration.exploration * 0.35);
    const snips = ips * (1 - 0.03);
    const dr = (ips + expectedReward) / 2 + (0.02 - calibration.variance * 0.05);
    const ess = Math.round(1400 * (1 - calibration.exploration * 0.3));
    const ci = calibration.variance * 0.22;
    return {
      expectedReward,
      ips,
      snips,
      dr,
      ess,
      ci,
    };
  }, [featureVector, selectedModel]);

  const topPolicy = policyRanking[0];

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex items-center gap-3 text-sm text-blue-600 dark:text-blue-400 font-semibold">
          <Link to="/research" className="inline-flex items-center gap-2 hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Research
          </Link>
          <span>/</span>
          <span>Contextual Sandbox</span>
        </div>

        <section className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-1 space-y-4">
              <span className="inline-flex items-center px-3 py-1 text-sm font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-900/40 rounded-full">
                <Filter className="h-4 w-4 mr-1" />
                Contextual Bandit Demo
              </span>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Contextual Recommender Sandbox</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                行動ログから特徴量を抽出し、コンテキストに応じて最適なアームを選択するバンディットを可視化する簡易デモです。
                リアルタイムにセグメントを切り替えて、推論結果と特徴量の寄与度を確認できます。
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl p-6 shadow-lg w-full md:w-80">
              <div className="text-sm uppercase tracking-widest mb-2 opacity-80">Current model</div>
              <div className="text-3xl font-semibold mb-4">{modelSummary?.name}</div>
              <p className="text-white/90 mb-6">{modelSummary?.description}</p>
              <div className="flex items-center gap-3 text-sm font-semibold">
                <Target className="h-5 w-5" />
                {modelSummary?.advantage}
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {scenarios.map(scenario => (
            <button
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario)}
              className={`text-left p-6 rounded-2xl border transition-all duration-300 ${
                selectedScenario.id === scenario.id
                  ? 'bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-blue-500/40 shadow-lg'
                  : 'bg-white/80 dark:bg-gray-800/80 border-gray-200/60 dark:border-gray-700/60 hover:shadow-lg'
              }`}
            >
              <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">{scenario.segment}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{scenario.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{scenario.description}</p>
            </button>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Feature Attribution</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">SHAP-like importance (normalized)</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
            <div className="space-y-4">
              {featureInsights.map(feature => (
                <div key={feature.label}>
                  <div className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <span>{feature.label}</span>
                    <span>{feature.adjustedValue}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${feature.color}`}
                      style={{ width: `${feature.adjustedValue}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{feature.explanation}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-widest">
                  Perturbation Controls
                </h3>
                <button
                  onClick={() => setFeatureAdjustments(selectedScenario.features.map(() => 0))}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-300 hover:underline"
                >
                  Reset
                </button>
              </div>
              <div className="space-y-4">
                {selectedScenario.features.map((feature, index) => {
                  const adjustedValue = adjustedFeatures[index]?.adjustedValue ?? feature.value;
                  const delta = adjustedValue - feature.value;
                  return (
                    <div key={feature.label} className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span>{feature.label}</span>
                        <span>
                          {adjustedValue}% <span className="text-gray-400">({delta >= 0 ? '+' : ''}{delta})</span>
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={adjustedValue}
                        onChange={(event) => {
                          const nextValue = Number(event.target.value);
                          setFeatureAdjustments(prev => prev.map((current, idx) => (
                            idx === index ? nextValue - feature.value : current
                          )));
                        }}
                        className="w-full accent-blue-500"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{topPolicy?.label}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Bandit policy output</p>
              </div>
              <span className="px-4 py-1 rounded-full text-sm font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200">
                +{((topPolicy?.expectedReward ?? 0) * 100).toFixed(1)}% CTR
              </span>
            </div>
            <div className="space-y-3">
              {policyRanking.slice(0, 3).map(candidate => (
                <div key={candidate.id} className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center justify-between text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <span>{candidate.label}</span>
                    <span>{(candidate.expectedReward * 100).toFixed(1)}%</span>
                  </div>
                  <div className="mt-2 w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{ width: `${Math.min(100, candidate.probability * 100)}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Policy weight {(candidate.probability * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contextualModels.map(model => (
                <button
                  key={model.name}
                  onClick={() => setSelectedModel(model.name)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedModel === model.name
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-100'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {model.icon}
                    <span className="font-semibold">{model.name}</span>
                  </div>
                  <p className="text-sm">{model.description}</p>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Exploration rate</div>
                <div className="text-2xl font-semibold text-gray-900 dark:text-white">{modelCalibration[selectedModel as keyof typeof modelCalibration]?.exploration.toFixed(2) ?? '0.10'}</div>
                <p className="text-xs mt-1">モデルごとに探索率が変化</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Latency</div>
                <div className="text-2xl font-semibold text-gray-900 dark:text-white">32 ms</div>
                <p className="text-xs mt-1">サーバーサイド推論 + キャッシュ</p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Counterfactual Evaluation</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">IPS / SNIPS / Doubly Robust</p>
              </div>
              <Gauge className="h-8 w-8 text-emerald-500" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/70 dark:border-emerald-700/40">
                <div className="text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-300 mb-2">IPS</div>
                <div className="text-2xl font-semibold text-emerald-800 dark:text-emerald-100">
                  {evaluationMetrics.ips.toFixed(3)}
                </div>
                <div className="text-xs text-emerald-700/70 dark:text-emerald-200/70">±{evaluationMetrics.ci.toFixed(3)}</div>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200/70 dark:border-blue-700/40">
                <div className="text-xs uppercase tracking-widest text-blue-700 dark:text-blue-300 mb-2">SNIPS</div>
                <div className="text-2xl font-semibold text-blue-800 dark:text-blue-100">
                  {evaluationMetrics.snips.toFixed(3)}
                </div>
                <div className="text-xs text-blue-700/70 dark:text-blue-200/70">ESS {evaluationMetrics.ess}</div>
              </div>
              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200/70 dark:border-purple-700/40">
                <div className="text-xs uppercase tracking-widest text-purple-700 dark:text-purple-300 mb-2">Doubly Robust</div>
                <div className="text-2xl font-semibold text-purple-800 dark:text-purple-100">
                  {evaluationMetrics.dr.toFixed(3)}
                </div>
                <div className="text-xs text-purple-700/70 dark:text-purple-200/70">bias corrected</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Expected Reward</div>
                <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {evaluationMetrics.expectedReward.toFixed(3)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">model-based estimate</div>
              </div>
            </div>
            <div className="rounded-xl bg-gray-50 dark:bg-gray-700 p-4 text-xs font-mono text-gray-700 dark:text-gray-200">
              w_i = 1 / p(a_i | x_i) <br />
              IPS = (1/N) sum w_i r_i <br />
              DR = IPS + (μ̂(x_i) - w_i μ̂(a_i, x_i))
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <Sigma className="h-4 w-4" />
              Offline replay on {selectedScenario.segment}
            </div>
          </div>
        </section>

        <section className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Cpu className="h-6 w-6 text-blue-500" />
                技術スタック
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  { label: 'Feature Store', value: 'Feast + BigQuery', icon: <Layers className="h-4 w-4" /> },
                  { label: 'Serving', value: 'FastAPI + Redis Cache', icon: <Activity className="h-4 w-4" /> },
                  { label: 'Monitoring', value: 'OpenTelemetry + Grafana', icon: <Radar className="h-4 w-4" /> },
                  { label: 'Evaluation', value: 'Offline Replay + IPS', icon: <BarChart3 className="h-4 w-4" /> },
                ].map(item => (
                  <div key={item.label} className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center gap-3">
                    <div className="text-blue-500 dark:text-blue-300">{item.icon}</div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">{item.label}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-72 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/70 mb-2">Access</div>
                <h3 className="text-2xl font-bold mb-4">Public Sandbox</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  追加データセットや API 連携の相談はお気軽にご連絡ください。
                </p>
              </div>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-white text-gray-900 font-semibold py-3 hover:bg-gray-100 transition-colors"
              >
                コラボレーション相談
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ContextualSandboxPage;
