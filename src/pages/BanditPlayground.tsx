import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, RefreshCw, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Arm {
  id: number;
  realProbability: number;
  timesPlayed: number;
  wins: number;
}

const BanditPlayground: React.FC = () => {
  const [arms, setArms] = useState<Arm[]>([]);
  const [totalPlays, setTotalPlays] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [algorithm, setAlgorithm] = useState<'epsilon-greedy' | 'ucb1'>('epsilon-greedy');
  const [epsilon, setEpsilon] = useState(0.1);

  useEffect(() => {
    resetBandit();
  }, []);

  const resetBandit = () => {
    const newArms = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      realProbability: Math.random(),
      timesPlayed: 0,
      wins: 0,
    }));
    setArms(newArms);
    setTotalPlays(0);
    setIsRunning(false);
  };

  const calculateUCB = (arm: Arm) => {
    if (arm.timesPlayed === 0) return Infinity;
    const exploitation = arm.wins / arm.timesPlayed;
    const exploration = Math.sqrt((2 * Math.log(totalPlays)) / arm.timesPlayed);
    return exploitation + exploration;
  };

  const selectArm = () => {
    if (algorithm === 'epsilon-greedy') {
      if (Math.random() < epsilon) {
        return Math.floor(Math.random() * arms.length);
      }
      const bestArm = arms.reduce((best, current) => 
        (current.timesPlayed === 0) ? current :
        (current.wins / current.timesPlayed > best.wins / best.timesPlayed) ? current : best
      );
      return bestArm.id;
    } else {
      const ucbValues = arms.map(arm => ({
        id: arm.id,
        ucb: calculateUCB(arm)
      }));
      return ucbValues.reduce((best, current) => 
        current.ucb > best.ucb ? current : best
      ).id;
    }
  };

  const pullArm = (armId: number) => {
    setArms(prevArms => prevArms.map(arm => {
      if (arm.id === armId) {
        const win = Math.random() < arm.realProbability;
        return {
          ...arm,
          timesPlayed: arm.timesPlayed + 1,
          wins: arm.wins + (win ? 1 : 0)
        };
      }
      return arm;
    }));
    setTotalPlays(prev => prev + 1);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        const selectedArm = selectArm();
        pullArm(selectedArm);
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isRunning, arms, algorithm, epsilon, speed]);

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/research" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Research
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Multi-Armed Bandit Playground
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Algorithm
              </label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value as 'epsilon-greedy' | 'ucb1')}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="epsilon-greedy">ε-Greedy</option>
                <option value="ucb1">UCB1</option>
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
                  min="0"
                  max="1"
                  step="0.1"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Simulation Speed (ms)
              </label>
              <input
                type="number"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                min="100"
                max="2000"
                step="100"
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`inline-flex items-center px-4 py-2 rounded-md ${
                isRunning
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white transition-colors`}
            >
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? 'Stop' : 'Start'} Simulation
            </button>
            <button
              onClick={resetBandit}
              className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </button>
          </div>

          <div className="space-y-6">
            {arms.map(arm => {
              const winRate = arm.timesPlayed === 0 ? 0 : (arm.wins / arm.timesPlayed) * 100;
              return (
                <div key={arm.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-900 dark:text-white font-medium">
                      Arm {arm.id + 1}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      Plays: {arm.timesPlayed}
                    </span>
                  </div>
                  <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${winRate}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Win Rate: {winRate.toFixed(1)}%
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      Wins: {arm.wins}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Statistics
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-sm text-gray-600 dark:text-gray-400">
                  Total Plays
                </span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalPlays}
                </span>
              </div>
              <div>
                <span className="block text-sm text-gray-600 dark:text-gray-400">
                  Total Wins
                </span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {arms.reduce((sum, arm) => sum + arm.wins, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BanditPlayground;