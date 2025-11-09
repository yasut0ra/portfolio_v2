import React, { useMemo, useState } from 'react';
import { ArrowLeft, RefreshCcw, Calculator, Activity, TrendingDown, Shield, Cpu, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogSample {
  id: number;
  reward: number;
  loggingProb: number;
  targetProb: number;
  modeledReward: number;
}

const generateLogs = (): LogSample[] =>
  Array.from({ length: 6 }).map((_, index) => ({
    id: index + 1,
    reward: Math.random() < 0.4 ? 1 : 0,
    loggingProb: parseFloat((0.2 + Math.random() * 0.6).toFixed(2)),
    targetProb: parseFloat((0.2 + Math.random() * 0.6).toFixed(2)),
    modeledReward: parseFloat((0.25 + Math.random() * 0.5).toFixed(2)),
  }));

const OfflineEvaluatorPage: React.FC = () => {
  const [logs, setLogs] = useState<LogSample[]>(generateLogs());
  const [riskTolerance, setRiskTolerance] = useState(0.6);

  const metrics = useMemo(() => {
    const ips =
      logs.reduce((sum, log) => sum + (log.reward * log.targetProb) / log.loggingProb, 0) / logs.length;

    const dr =
      logs.reduce(
        (sum, log) =>
          sum + log.modeledReward + (log.reward - log.modeledReward) * (log.targetProb / log.loggingProb),
        0
      ) / logs.length;

    const variance =
      logs.reduce(
        (sum, log) =>
          sum +
          Math.pow((log.reward * log.targetProb) / log.loggingProb - ips, 2),
        0
      ) / logs.length;

    return {
      ips: parseFloat(ips.toFixed(3)),
      dr: parseFloat(dr.toFixed(3)),
      variance: parseFloat(variance.toFixed(4)),
    };
  }, [logs]);

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex items-center gap-3 text-sm text-blue-600 dark:text-blue-400 font-semibold">
          <Link to="/research" className="inline-flex items-center gap-2 hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Research
          </Link>
          <span>/</span>
          <span>Offline Evaluator</span>
        </div>

        <section className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 space-y-6">
          <span className="inline-flex items-center px-3 py-1 text-sm font-semibold text-amber-700 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-900/40 rounded-full">
            <Calculator className="h-4 w-4 mr-2" />
            Offline Policy Evaluation
          </span>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Offline Policy Evaluator</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                既存ログのみで新しい推薦ポリシーを安全に評価するデモ。IPS・Doubly Robustなどの推定量を直感的に比較できます。
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl p-6 w-full lg:w-80">
              <p className="text-sm uppercase tracking-widest mb-1 opacity-80">Variance control</p>
              <div className="text-3xl font-semibold mb-4">{metrics.variance}</div>
              <p className="text-white/80 text-sm">
                リスク許容度に応じて各サンプルをリウェイトし、安全な改善を確認します。
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'IPS 推定値',
              value: metrics.ips,
              icon: <Activity className="h-5 w-5 text-blue-500" />,
              desc: '重要度サンプリングで推定した新ポリシーの期待報酬',
            },
            {
              title: 'DR 推定値',
              value: metrics.dr,
              icon: <Shield className="h-5 w-5 text-emerald-500" />,
              desc: 'モデル補正付きで分散を抑えた堅牢推定',
            },
            {
              title: 'リスクスコア',
              value: `${Math.round(riskTolerance * 100)}%`,
              icon: <TrendingDown className="h-5 w-5 text-amber-500" />,
              desc: '安全性を優先するほど探索度合いを抑制',
            },
          ].map(card => (
            <div key={card.title} className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 shadow">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                {card.icon}
                {card.title}
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{card.value}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{card.desc}</p>
            </div>
          ))}
        </section>

        <section className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 shadow-xl border border-gray-200/60 dark:border-gray-700/60">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BarChart className="h-5 w-5 text-blue-500" />
                ログサンプル
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">重要度重み付きで再評価します。</p>
            </div>
            <button
              onClick={() => setLogs(generateLogs())}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              <RefreshCcw className="h-4 w-4" />
              サンプルを入れ替える
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="py-2 pr-4">#</th>
                  <th className="py-2 pr-4">reward</th>
                  <th className="py-2 pr-4">logging π(a|x)</th>
                  <th className="py-2 pr-4">target π(a|x)</th>
                  <th className="py-2 pr-4">modeled r(x,a)</th>
                  <th className="py-2 pr-4">weight (target/logging)</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(sample => (
                  <tr key={sample.id} className="border-b border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300">
                    <td className="py-2 pr-4 font-semibold">{sample.id}</td>
                    <td className="py-2 pr-4">{sample.reward}</td>
                    <td className="py-2 pr-4">{sample.loggingProb}</td>
                    <td className="py-2 pr-4">{sample.targetProb}</td>
                    <td className="py-2 pr-4">{sample.modeledReward}</td>
                    <td className="py-2 pr-4 text-blue-600 dark:text-blue-300 font-semibold">
                      {(sample.targetProb / sample.loggingProb).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 shadow-xl border border-gray-200/60 dark:border-gray-700/60">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-purple-500" />
                Doubly Robust intuition
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                予測モデルの出力をベースラインとして用い、ログとの乖離のみ重要度で補正することで分散を抑えます。
                実世界での A/B テストの前に安全性をチェックする用途を想定しています。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-500" />
                リスク許容度
              </h3>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0.2"
                  max="0.9"
                  step="0.1"
                  value={riskTolerance}
                  onChange={e => setRiskTolerance(parseFloat(e.target.value))}
                  className="flex-1 accent-blue-600"
                />
                <span className="text-xl font-semibold text-gray-900 dark:text-white">
                  {riskTolerance.toFixed(1)}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                値が低いほど高リスクのポリシーを早期に除外します。
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default OfflineEvaluatorPage;
