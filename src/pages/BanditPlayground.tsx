import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Pause, RefreshCw, BarChart, Info, Settings, TrendingUp, Target, Brain, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Arm {
  id: number;
  realProbability: number;
  timesPlayed: number;
  wins: number;
  estimatedValue: number;
  confidence: number;
  alpha: number; // For Thompson Sampling
  beta: number;  // For Thompson Sampling
}

interface AlgorithmStats {
  totalReward: number;
  optimalArmSelections: number;
  regret: number;
  averageReward: number;
}

const BanditPlayground: React.FC = () => {
  const [arms, setArms] = useState<Arm[]>([]);
  const [totalPlays, setTotalPlays] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [algorithm, setAlgorithm] = useState<'epsilon-greedy' | 'ucb1' | 'thompson-sampling'>('epsilon-greedy');
  const [epsilon, setEpsilon] = useState(0.1);
  const [c, setC] = useState(2); // UCB1 confidence parameter
  const [stats, setStats] = useState<AlgorithmStats>({
    totalReward: 0,
    optimalArmSelections: 0,
    regret: 0,
    averageReward: 0
  });
  const [rewardHistory, setRewardHistory] = useState<number[]>([]);
  const [selectedArmHistory, setSelectedArmHistory] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    resetBandit();
  }, []);

  const resetBandit = () => {
    const newArms = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      realProbability: Math.random(),
      timesPlayed: 0,
      wins: 0,
      estimatedValue: 0,
      confidence: 0,
      alpha: 1, // Prior for Thompson Sampling
      beta: 1   // Prior for Thompson Sampling
    }));
    setArms(newArms);
    setTotalPlays(0);
    setIsRunning(false);
    setStats({
      totalReward: 0,
      optimalArmSelections: 0,
      regret: 0,
      averageReward: 0
    });
    setRewardHistory([]);
    setSelectedArmHistory([]);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const calculateUCB = (arm: Arm) => {
    if (arm.timesPlayed === 0) return Infinity;
    const exploitation = arm.wins / arm.timesPlayed;
    const exploration = c * Math.sqrt((2 * Math.log(totalPlays)) / arm.timesPlayed);
    return exploitation + exploration;
  };

  const thompsonSample = (arm: Arm) => {
    // Beta distribution sampling approximation
    const alpha = arm.alpha + arm.wins;
    const beta = arm.beta + (arm.timesPlayed - arm.wins);
    
    // Simple beta distribution approximation
    const x1 = Math.random();
    const x2 = Math.random();
    const y1 = Math.pow(x1, 1/alpha);
    const y2 = Math.pow(x2, 1/beta);
    return y1 / (y1 + y2);
  };

  const selectArm = () => {
    if (algorithm === 'epsilon-greedy') {
      if (Math.random() < epsilon) {
        return Math.floor(Math.random() * arms.length);
      }
      const bestArm = arms.reduce((best, current) => {
        const bestValue = best.timesPlayed === 0 ? 0 : best.wins / best.timesPlayed;
        const currentValue = current.timesPlayed === 0 ? 0 : current.wins / current.timesPlayed;
        return currentValue > bestValue ? current : best;
      });
      return bestArm.id;
    } else if (algorithm === 'ucb1') {
      const ucbValues = arms.map(arm => ({
        id: arm.id,
        ucb: calculateUCB(arm)
      }));
      return ucbValues.reduce((best, current) => 
        current.ucb > best.ucb ? current : best
      ).id;
    } else { // thompson-sampling
      const samples = arms.map(arm => ({
        id: arm.id,
        sample: thompsonSample(arm)
      }));
      return samples.reduce((best, current) => 
        current.sample > best.sample ? current : best
      ).id;
    }
  };

  const pullArm = (armId: number) => {
    const win = Math.random() < arms[armId].realProbability;
    const optimalArm = arms.reduce((best, current) => 
      current.realProbability > best.realProbability ? current : best
    );
    
    setArms(prevArms => prevArms.map(arm => {
      if (arm.id === armId) {
        const newTimesPlayed = arm.timesPlayed + 1;
        const newWins = arm.wins + (win ? 1 : 0);
        return {
          ...arm,
          timesPlayed: newTimesPlayed,
          wins: newWins,
          estimatedValue: newWins / newTimesPlayed,
          confidence: Math.sqrt((2 * Math.log(totalPlays + 1)) / newTimesPlayed),
          alpha: arm.alpha + (win ? 1 : 0),
          beta: arm.beta + (win ? 0 : 1)
        };
      }
      return arm;
    }));

    setTotalPlays(prev => prev + 1);
    setRewardHistory(prev => [...prev, win ? 1 : 0]);
    setSelectedArmHistory(prev => [...prev, armId]);
    
    setStats(prevStats => {
      const newTotalReward = prevStats.totalReward + (win ? 1 : 0);
      const newOptimalSelections = prevStats.optimalArmSelections + (armId === optimalArm.id ? 1 : 0);
      const newRegret = (totalPlays + 1) * optimalArm.realProbability - newTotalReward;
      
      return {
        totalReward: newTotalReward,
        optimalArmSelections: newOptimalSelections,
        regret: newRegret,
        averageReward: newTotalReward / (totalPlays + 1)
      };
    });
  };

  const toggleSimulation = () => {
    if (isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setIsRunning(false);
    } else {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        const selectedArm = selectArm();
        pullArm(selectedArm);
      }, speed);
    }
  };

  useEffect(() => {
    if (isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(() => {
        const selectedArm = selectArm();
        pullArm(selectedArm);
      }, speed);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, arms, algorithm, epsilon, c, speed]);

  const getAlgorithmDescription = () => {
    switch (algorithm) {
      case 'epsilon-greedy':
        return `ε-Greedy: ${(epsilon * 100).toFixed(0)}%の確率でランダム探索、残りは最良アームを選択`;
      case 'ucb1':
        return `UCB1: 信頼上限を用いて探索と活用のバランスを自動調整（c=${c}）`;
      case 'thompson-sampling':
        return 'Thompson Sampling: ベイズ的アプローチで各アームの報酬分布をサンプリング';
      default:
        return '';
    }
  };

  const optimalArm = arms.length > 0 ? arms.reduce((best, current) => 
    current.realProbability > best.realProbability ? current : best
  ) : null;

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <Link 
          to="/research" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          研究ページに戻る
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Multi-Armed <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Bandit</span> Playground
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-6 text-lg max-w-3xl mx-auto">
            バンディットアルゴリズムのリアルタイムシミュレーション環境。<br />
            探索と活用のバランスを視覚的に理解し、異なるアルゴリズムの性能を比較できます。
          </p>
        </div>

        {/* Control Panel */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center mb-6">
            <Settings className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">シミュレーション設定</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                アルゴリズム
              </label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value as any)}
                disabled={isRunning}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="epsilon-greedy">ε-Greedy</option>
                <option value="ucb1">UCB1</option>
                <option value="thompson-sampling">Thompson Sampling</option>
              </select>
            </div>

            {algorithm === 'epsilon-greedy' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Epsilon (ε)
                </label>
                <input
                  type="number"
                  value={epsilon}
                  onChange={(e) => setEpsilon(Number(e.target.value))}
                  disabled={isRunning}
                  min="0"
                  max="1"
                  step="0.05"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            )}

            {algorithm === 'ucb1' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  信頼度パラメータ (c)
                </label>
                <input
                  type="number"
                  value={c}
                  onChange={(e) => setC(Number(e.target.value))}
                  disabled={isRunning}
                  min="0.1"
                  max="5"
                  step="0.1"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                シミュレーション速度 (ms)
              </label>
              <input
                type="number"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                min="50"
                max="2000"
                step="50"
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div className="flex items-end">
              <div className="flex gap-3 w-full">
                <button
                  onClick={toggleSimulation}
                  className={`flex-1 inline-flex items-center justify-center px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
                    isRunning
                      ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                  }`}
                >
                  {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isRunning ? '停止' : '開始'}
                </button>
                <button
                  onClick={resetBandit}
                  disabled={isRunning}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Algorithm Description */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {getAlgorithmDescription()}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Arms Visualization */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Target className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3" />
                  スロットマシン
                </h2>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  総試行回数: <span className="font-semibold text-gray-900 dark:text-white">{totalPlays}</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {arms.map(arm => {
                  const winRate = arm.timesPlayed === 0 ? 0 : (arm.wins / arm.timesPlayed) * 100;
                  const isOptimal = optimalArm && arm.id === optimalArm.id;
                  const recentlySelected = selectedArmHistory.length > 0 && selectedArmHistory[selectedArmHistory.length - 1] === arm.id;
                  
                  return (
                    <div key={arm.id} className={`p-6 rounded-xl transition-all duration-500 ${
                      recentlySelected 
                        ? 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border-2 border-blue-300 dark:border-blue-600 shadow-lg transform scale-105' 
                        : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4 ${
                            isOptimal 
                              ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
                              : 'bg-gradient-to-r from-gray-500 to-gray-600'
                          }`}>
                            {arm.id + 1}
                          </div>
                          <div>
                            <span className="text-gray-900 dark:text-white font-semibold text-lg">
                              アーム {arm.id + 1}
                              {isOptimal && <span className="ml-2 text-yellow-600 dark:text-yellow-400 text-sm">★ 最適</span>}
                            </span>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              真の確率: {(arm.realProbability * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600 dark:text-gray-400">試行回数</div>
                          <div className="text-xl font-bold text-gray-900 dark:text-white">{arm.timesPlayed}</div>
                        </div>
                      </div>
                      
                      <div className="relative w-full h-6 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mb-4">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-full transition-all duration-500 relative overflow-hidden"
                          style={{ width: `${Math.max(winRate, 2)}%` }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            {winRate.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-gray-600 dark:text-gray-400">勝利数</div>
                          <div className="font-semibold text-green-600 dark:text-green-400">{arm.wins}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-600 dark:text-gray-400">推定値</div>
                          <div className="font-semibold text-blue-600 dark:text-blue-400">
                            {arm.estimatedValue.toFixed(3)}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-600 dark:text-gray-400">信頼区間</div>
                          <div className="font-semibold text-purple-600 dark:text-purple-400">
                            ±{arm.confidence.toFixed(3)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Statistics Panel */}
          <div className="space-y-6">
            {/* Performance Stats */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <BarChart className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                パフォーマンス統計
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">累積報酬</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {stats.totalReward}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    / {totalPlays} 試行
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">平均報酬</div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {stats.averageReward.toFixed(3)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    理論最大: {optimalArm ? optimalArm.realProbability.toFixed(3) : '0.000'}
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">最適アーム選択率</div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {totalPlays > 0 ? ((stats.optimalArmSelections / totalPlays) * 100).toFixed(1) : '0.0'}%
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {stats.optimalArmSelections} / {totalPlays}
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200/50 dark:border-orange-700/50">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">累積リグレット</div>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {stats.regret.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    機会損失の累積
                  </div>
                </div>
              </div>
            </div>

            {/* Algorithm Info */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                アルゴリズム情報
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400">現在のアルゴリズム</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {algorithm === 'epsilon-greedy' ? 'ε-Greedy' : 
                     algorithm === 'ucb1' ? 'UCB1' : 'Thompson Sampling'}
                  </span>
                </div>
                
                {algorithm === 'epsilon-greedy' && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">探索確率 (ε)</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{(epsilon * 100).toFixed(0)}%</span>
                  </div>
                )}
                
                {algorithm === 'ucb1' && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">信頼度パラメータ (c)</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{c}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400">シミュレーション速度</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{speed}ms</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                最近の活動
              </h3>
              
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedArmHistory.slice(-10).reverse().map((armId, index) => {
                  const actualIndex = selectedArmHistory.length - 1 - index;
                  const reward = rewardHistory[actualIndex];
                  return (
                    <div key={actualIndex} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        試行 {actualIndex + 1}: アーム {armId + 1}
                      </span>
                      <span className={`font-semibold ${reward ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {reward ? '勝利' : '敗北'}
                      </span>
                    </div>
                  );
                })}
                {selectedArmHistory.length === 0 && (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                    まだ試行がありません
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BanditPlayground;