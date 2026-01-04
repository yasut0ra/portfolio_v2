import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Play,
  Pause,
  RefreshCw,
  BarChart3,
  ListOrdered,
  Sparkles,
  Gauge,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CarouselItem {
  id: string;
  title: string;
  category: string;
  color: string;
  baseCtr: number;
  trueCtr: number;
  examined: number;
  clicks: number;
}

interface ImpressionLog {
  id: number;
  clickedItem: string | null;
  position: number | null;
  reward: number;
  expectedClick: number;
}

const datasetPresets = [
  {
    id: 'news',
    label: 'News Carousel',
    description: 'Short-session mix of policy, research, and daily news',
    items: [
      { id: 'ai-policy', title: 'AI Policy Brief', category: 'Policy', color: 'from-blue-500 to-cyan-500', baseCtr: 0.32 },
      { id: 'health', title: 'Health Insight', category: 'Wellness', color: 'from-emerald-500 to-teal-500', baseCtr: 0.28 },
      { id: 'startup', title: 'Startup Radar', category: 'Business', color: 'from-purple-500 to-pink-500', baseCtr: 0.22 },
      { id: 'campus', title: 'Campus Research', category: 'Academia', color: 'from-amber-500 to-orange-500', baseCtr: 0.26 },
      { id: 'climate', title: 'Climate Update', category: 'Science', color: 'from-sky-500 to-indigo-500', baseCtr: 0.2 },
      { id: 'culture', title: 'Culture Map', category: 'Society', color: 'from-rose-500 to-red-500', baseCtr: 0.18 },
    ],
  },
  {
    id: 'commerce',
    label: 'Commerce Carousel',
    description: 'High-intent commerce carousel scenario',
    items: [
      { id: 'headphones', title: 'Spatial Audio', category: 'Audio', color: 'from-indigo-500 to-violet-500', baseCtr: 0.3 },
      { id: 'smartwatch', title: 'Fitness Watch', category: 'Wearable', color: 'from-emerald-500 to-lime-500', baseCtr: 0.27 },
      { id: 'desk', title: 'Standing Desk', category: 'Workspace', color: 'from-orange-500 to-amber-500', baseCtr: 0.23 },
      { id: 'camera', title: 'Mirrorless Pro', category: 'Camera', color: 'from-blue-500 to-sky-500', baseCtr: 0.25 },
      { id: 'lamp', title: 'Ambient Light', category: 'Lifestyle', color: 'from-rose-500 to-pink-500', baseCtr: 0.19 },
      { id: 'keyboard', title: 'Mechanical Keys', category: 'Gadgets', color: 'from-slate-500 to-gray-600', baseCtr: 0.21 },
    ],
  },
  {
    id: 'streaming',
    label: 'Streaming Carousel',
    description: 'Retention-focused streaming ranking',
    items: [
      { id: 'documentary', title: 'Deep Documentary', category: 'Non-Fiction', color: 'from-teal-500 to-emerald-500', baseCtr: 0.29 },
      { id: 'drama', title: 'Midnight Drama', category: 'Series', color: 'from-purple-500 to-fuchsia-500', baseCtr: 0.24 },
      { id: 'live', title: 'Live Stage', category: 'Music', color: 'from-orange-500 to-rose-500', baseCtr: 0.2 },
      { id: 'anime', title: 'New Anime', category: 'Animation', color: 'from-blue-500 to-indigo-500', baseCtr: 0.26 },
      { id: 'shorts', title: 'Short Cuts', category: 'Shorts', color: 'from-amber-500 to-yellow-500', baseCtr: 0.18 },
      { id: 'sports', title: 'Sports Highlights', category: 'Sports', color: 'from-lime-500 to-green-500', baseCtr: 0.22 },
    ],
  },
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const sampleBeta = (alpha: number, beta: number) => {
  const x = Math.random();
  const y = Math.random();
  const u = Math.pow(x, 1 / alpha);
  const v = Math.pow(y, 1 / beta);
  return u / (u + v);
};

const shuffle = (values: number[]) => {
  const next = [...values];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
};

const computeExpectedClick = (ranking: number[], items: CarouselItem[], positionDecay: number) => {
  let noClickProb = 1;
  ranking.forEach((index, position) => {
    const effectiveCtr = clamp(items[index].trueCtr * (1 - positionDecay * position), 0.02, 0.95);
    noClickProb *= 1 - effectiveCtr;
  });
  return 1 - noClickProb;
};

const RankingBanditCarouselPage: React.FC = () => {
  const [items, setItems] = useState<CarouselItem[]>([]);
  const [ranking, setRanking] = useState<number[]>([]);
  const [presetId, setPresetId] = useState(datasetPresets[0].id);
  const [algorithm, setAlgorithm] = useState<'cascade-ucb' | 'cascade-ts' | 'epsilon-greedy'>('cascade-ucb');
  const [epsilon, setEpsilon] = useState(0.12);
  const [slotCount, setSlotCount] = useState(4);
  const [positionDecay, setPositionDecay] = useState(0.08);
  const [speed, setSpeed] = useState(700);
  const [isRunning, setIsRunning] = useState(false);
  const [totalImpressions, setTotalImpressions] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [regret, setRegret] = useState(0);
  const [showOracle, setShowOracle] = useState(false);
  const [impressionLog, setImpressionLog] = useState<ImpressionLog[]>([]);
  const [lastClicked, setLastClicked] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetSimulation = useCallback(() => {
    const preset = datasetPresets.find(entry => entry.id === presetId) ?? datasetPresets[0];
    const nextItems = preset.items.map(item => ({
      ...item,
      trueCtr: clamp(item.baseCtr + (Math.random() - 0.5) * 0.06, 0.05, 0.6),
      examined: 0,
      clicks: 0,
    }));

    setItems(nextItems);
    setRanking(shuffle(nextItems.map((_, index) => index)).slice(0, slotCount));
    setTotalImpressions(0);
    setTotalClicks(0);
    setRegret(0);
    setImpressionLog([]);
    setLastClicked(null);
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [presetId, slotCount]);

  useEffect(() => {
    resetSimulation();
  }, [resetSimulation]);

  const buildRanking = useCallback(() => {
    if (!items.length) return [];
    const indices = items.map((_, index) => index);

    if (algorithm === 'epsilon-greedy' && Math.random() < epsilon) {
      return shuffle(indices).slice(0, slotCount);
    }

    const scored = items.map((item, index) => {
      const mean = item.examined === 0 ? 0 : item.clicks / item.examined;
      let score = mean;
      if (algorithm === 'cascade-ucb') {
        const bonus = Math.sqrt((2 * Math.log(totalImpressions + 1)) / Math.max(1, item.examined));
        score = mean + bonus;
      }
      if (algorithm === 'cascade-ts') {
        score = sampleBeta(item.clicks + 1, item.examined - item.clicks + 1);
      }
      return { index, score, oracle: item.trueCtr };
    });

    return scored
      .sort((a, b) => b.score - a.score || b.oracle - a.oracle)
      .map(entry => entry.index)
      .slice(0, slotCount);
  }, [algorithm, epsilon, items, slotCount, totalImpressions]);

  const previewRanking = useMemo(() => {
    if (!items.length) return [];
    const scored = items.map((item, index) => ({
      index,
      score: (item.clicks + 1) / (item.examined + 2),
      oracle: item.trueCtr,
    }));
    return scored
      .sort((a, b) => b.score - a.score || b.oracle - a.oracle)
      .map(entry => entry.index)
      .slice(0, slotCount);
  }, [items, slotCount]);

  const simulateImpression = useCallback(() => {
    if (!items.length) return;
    const nextRanking = buildRanking();
    const optimalRanking = [...items]
      .map((item, index) => ({ index, score: item.trueCtr }))
      .sort((a, b) => b.score - a.score)
      .map(entry => entry.index)
      .slice(0, slotCount);

    const expectedClick = computeExpectedClick(nextRanking, items, positionDecay);
    const optimalExpected = computeExpectedClick(optimalRanking, items, positionDecay);

    let clickedId: string | null = null;
    let clickedPosition: number | null = null;
    let reward = 0;

    const nextItems = items.map(item => ({ ...item }));
    nextRanking.forEach((index, position) => {
      if (clickedId) {
        return;
      }
      const item = nextItems[index];
      const effectiveCtr = clamp(item.trueCtr * (1 - positionDecay * position), 0.02, 0.95);
      item.examined += 1;
      const didClick = Math.random() < effectiveCtr;
      if (didClick) {
        item.clicks += 1;
        clickedId = item.id;
        clickedPosition = position;
        reward = 1;
      }
    });

    setItems(nextItems);
    setRanking(nextRanking);
    setTotalImpressions(prev => prev + 1);
    setTotalClicks(prev => prev + reward);
    setRegret(prev => prev + (optimalExpected - expectedClick));
    setLastClicked(clickedId);
    setImpressionLog(prev => [
      {
        id: prev.length + 1,
        clickedItem: clickedId ? items.find(item => item.id === clickedId)?.title ?? clickedId : null,
        position: clickedPosition,
        reward,
        expectedClick,
      },
      ...prev,
    ].slice(0, 8));
  }, [buildRanking, items, positionDecay, slotCount]);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      simulateImpression();
    }, speed);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, simulateImpression, speed]);

  const activeRanking = useMemo(() => {
    if (!items.length) return [];
    const base = ranking.length ? ranking : previewRanking;
    if (base.length >= slotCount) {
      return base.slice(0, slotCount);
    }
    const remaining = items.map((_, index) => index).filter(index => !base.includes(index));
    return [...base, ...remaining].slice(0, slotCount);
  }, [items, previewRanking, ranking, slotCount]);
  const coverageRate = items.length ? items.filter(item => item.examined > 0).length / items.length : 0;
  const clickRate = totalImpressions > 0 ? totalClicks / totalImpressions : 0;
  const preset = datasetPresets.find(entry => entry.id === presetId);

  const algorithmDescription = useMemo(() => {
    switch (algorithm) {
      case 'cascade-ucb':
        return 'Cascade UCB: uses confidence bounds per slot to rank candidates.';
      case 'cascade-ts':
        return 'Cascade Thompson: samples from posteriors to choose the ranking.';
      case 'epsilon-greedy':
        return `Epsilon-Greedy Ranking: ${(epsilon * 100).toFixed(0)}% random exploration.`;
      default:
        return '';
    }
  }, [algorithm, epsilon]);

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex items-center gap-3 text-sm text-blue-600 dark:text-blue-400 font-semibold">
          <Link to="/research" className="inline-flex items-center gap-2 hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Research
          </Link>
          <span>/</span>
          <span>Ranking Bandit Carousel</span>
        </div>

        <section className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex-1 space-y-4">
              <span className="inline-flex items-center px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-200 bg-blue-100/70 dark:bg-blue-900/40 rounded-full">
                <ListOrdered className="h-4 w-4 mr-1" />
                Ranking Bandit Demo
              </span>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Carousel Ranking Sandbox
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Ranking bandit for a carousel UI. Tune position bias and exploration
                to observe changes in CTR and regret.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl p-6 shadow-lg w-full lg:w-80">
              <div className="text-sm uppercase tracking-widest mb-2 opacity-80">Current policy</div>
              <div className="text-2xl font-semibold mb-3">{algorithm.replace('-', ' ').toUpperCase()}</div>
              <p className="text-white/90 text-sm">{algorithmDescription}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-white/80">
                <Sparkles className="h-4 w-4" />
                {preset?.label}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center mb-6">
            <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Simulation Settings</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dataset
              </label>
              <select
                value={presetId}
                onChange={(event) => setPresetId(event.target.value)}
                disabled={isRunning}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                {datasetPresets.map(entry => (
                  <option key={entry.id} value={entry.id}>
                    {entry.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ranking Algorithm
              </label>
              <select
                value={algorithm}
                onChange={(event) => setAlgorithm(event.target.value as 'cascade-ucb' | 'cascade-ts' | 'epsilon-greedy')}
                disabled={isRunning}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="cascade-ucb">Cascade UCB</option>
                <option value="cascade-ts">Cascade Thompson</option>
                <option value="epsilon-greedy">Epsilon-Greedy Ranking</option>
              </select>
            </div>

            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slots
              </label>
              <input
                type="number"
                value={slotCount}
                onChange={(event) => setSlotCount(Math.round(clamp(Number(event.target.value), 3, 6)))}
                disabled={isRunning}
                min="3"
                max="6"
                step="1"
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Speed (ms)
              </label>
              <input
                type="number"
                value={speed}
                onChange={(event) => setSpeed(Number(event.target.value))}
                disabled={isRunning}
                min="200"
                max="2000"
                step="50"
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Position Bias
              </label>
              <input
                type="number"
                value={positionDecay}
                onChange={(event) => setPositionDecay(clamp(Number(event.target.value), 0, 0.2))}
                disabled={isRunning}
                min="0"
                max="0.2"
                step="0.01"
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {algorithm === 'epsilon-greedy' && (
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Epsilon (exploration)
                </label>
                <input
                  type="number"
                  value={epsilon}
                  onChange={(event) => setEpsilon(clamp(Number(event.target.value), 0, 0.4))}
                  disabled={isRunning}
                  min="0"
                  max="0.4"
                  step="0.02"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            )}

            <div className="lg:col-span-2 flex items-end">
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setIsRunning(prev => !prev)}
                  className={`flex-1 inline-flex items-center justify-center px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
                    isRunning
                      ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                  }`}
                >
                  {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isRunning ? 'Stop' : 'Start'}
                </button>
                <button
                  onClick={simulateImpression}
                  disabled={isRunning}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                  Run Once
                </button>
                <button
                  onClick={resetSimulation}
                  disabled={isRunning}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-600 dark:text-gray-400">
            <span>{preset?.description}</span>
            <button
              onClick={() => setShowOracle(prev => !prev)}
              className="text-blue-600 dark:text-blue-300 font-semibold hover:underline"
            >
              {showOracle ? 'Hide Oracle CTR' : 'Show Oracle CTR'}
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <ListOrdered className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  Carousel Ranking
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Impression #{totalImpressions + 1}
                </div>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {activeRanking.map((index, position) => {
                  const item = items[index];
                  const observedCtr = item.examined ? item.clicks / item.examined : 0;
                  const isClicked = lastClicked === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`min-w-[220px] max-w-[220px] rounded-2xl p-4 border shadow-md transition-all duration-300 ${
                        isClicked
                          ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30'
                          : 'border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90'
                      }`}
                    >
                      <div className={`h-24 rounded-xl bg-gradient-to-br ${item.color} mb-4 relative`}>
                        <div className="absolute top-2 left-2 text-xs font-semibold text-white bg-black/30 px-2 py-1 rounded-full">
                          #{position + 1}
                        </div>
                        {isClicked && (
                          <div className="absolute bottom-2 right-2 text-xs font-semibold text-white bg-emerald-600/80 px-2 py-1 rounded-full">
                            Clicked
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{item.category}</div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Posterior CTR: {(observedCtr * 100).toFixed(1)}%
                      </div>
                      {showOracle && (
                        <div className="text-xs text-amber-600 dark:text-amber-300 mt-1">
                          Oracle CTR: {(item.trueCtr * 100).toFixed(1)}%
                        </div>
                      )}
                      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                        Observed {item.clicks} / {item.examined}
                      </div>
                    </div>
                  );
                })}
                {!activeRanking.length && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">Waiting for ranking</div>
                )}
              </div>
            </div>

            <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Protocol Notes</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700">
                  <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Cascade Model</div>
                  User scans from the first slot and stops at the first click.
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700">
                  <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Position Bias</div>
                  Click probability decays by position.
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700">
                  <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Feedback</div>
                  Only slots before the click are updated as negatives.
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Gauge className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                Metrics
              </h3>
              <div className="space-y-4 text-sm">
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/70 dark:border-emerald-700/40">
                  <div className="text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-300 mb-2">CTR</div>
                  <div className="text-2xl font-semibold text-emerald-800 dark:text-emerald-100">
                    {(clickRate * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-emerald-700/70 dark:text-emerald-200/70">
                    {totalClicks} clicks / {totalImpressions} impressions
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200/70 dark:border-blue-700/40">
                  <div className="text-xs uppercase tracking-widest text-blue-700 dark:text-blue-300 mb-2">Coverage</div>
                  <div className="text-2xl font-semibold text-blue-800 dark:text-blue-100">
                    {(coverageRate * 100).toFixed(0)}%
                  </div>
                  <div className="text-xs text-blue-700/70 dark:text-blue-200/70">
                    {items.filter(item => item.examined > 0).length} / {items.length} items observed
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200/70 dark:border-orange-700/40">
                  <div className="text-xs uppercase tracking-widest text-orange-700 dark:text-orange-300 mb-2">Regret</div>
                  <div className="text-2xl font-semibold text-orange-800 dark:text-orange-100">
                    {regret.toFixed(2)}
                  </div>
                  <div className="text-xs text-orange-700/70 dark:text-orange-200/70">
                    Difference from optimal ranking
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                Recent Impressions
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {impressionLog.length === 0 && (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-6 text-sm">
                    No impressions yet
                  </div>
                )}
                {impressionLog.map(entry => (
                  <div key={entry.id} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-sm">
                    <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
                      <span>
                        {entry.clickedItem ? entry.clickedItem : 'No Click'}
                        {entry.position !== null ? ` (#${entry.position + 1})` : ''}
                      </span>
                      <span className={entry.reward ? 'text-emerald-600 dark:text-emerald-300' : 'text-gray-400'}>
                        {entry.reward ? 'Click' : 'Skip'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Expected CTR {(entry.expectedClick * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default RankingBanditCarouselPage;
