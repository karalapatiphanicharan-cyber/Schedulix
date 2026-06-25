import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, AlertCircle, CheckCircle2 } from 'lucide-react';

const ComparisonSummary = ({ algoA, algoB, metricsA, metricsB, resultsA, resultsB }) => {
  if (!metricsA || !metricsB || !resultsA || !resultsB) return null;

  const getAvg = (results, key) => {
    if (!results || results.length === 0) return 0;
    return results.reduce((acc, r) => acc + (r[key] || 0), 0) / results.length;
  };

  const stats = [
    {
      label: 'Avg. Waiting Time',
      valA: getAvg(resultsA, 'waitingTime'),
      valB: getAvg(resultsB, 'waitingTime'),
      unit: 'ms',
      lowerIsBetter: true,
    },
    {
      label: 'Avg. Turnaround Time',
      valA: getAvg(resultsA, 'turnaroundTime'),
      valB: getAvg(resultsB, 'turnaroundTime'),
      unit: 'ms',
      lowerIsBetter: true,
    },
    {
      label: 'Avg. Response Time',
      valA: getAvg(resultsA, 'responseTime'),
      valB: getAvg(resultsB, 'responseTime'),
      unit: 'ms',
      lowerIsBetter: true,
    },
    {
      label: 'Context Switches',
      valA: metricsA.contextSwitches || 0,
      valB: metricsB.contextSwitches || 0,
      unit: '',
      lowerIsBetter: true,
    },
    {
        label: 'Throughput',
        valA: resultsA.length / metricsA.totalTime,
        valB: resultsB.length / metricsB.totalTime,
        unit: 'p/s',
        lowerIsBetter: false,
    }
  ];

  const getWinner = (stat) => {
    if (stat.valA === stat.valB) return 'tie';
    if (stat.lowerIsBetter) {
      return stat.valA < stat.valB ? 'A' : 'B';
    }
    return stat.valA > stat.valB ? 'A' : 'B';
  };

  const winsA = stats.filter(s => getWinner(s) === 'A').length;
  const winsB = stats.filter(s => getWinner(s) === 'B').length;

  let overallWinner = 'Tie';
  if (winsA > winsB) overallWinner = algoA;
  else if (winsB > winsA) overallWinner = algoB;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-8 border-t-4 border-brand-blue"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-black text-white mb-2">Comparison Summary</h3>
          <p className="text-brand-gray text-sm italic">Direct performance breakdown between both algorithms.</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-gray mb-1">Overall Winner</span>
          <div className="flex items-center space-x-2 bg-brand-blue/10 px-4 py-2 rounded-xl border border-brand-blue/20">
            <Trophy size={16} className="text-yellow-400" />
            <span className="text-lg font-black text-white">{overallWinner}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const winner = getWinner(stat);
          return (
            <div key={index} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.04] transition-all">
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-gray mb-4">{stat.label}</p>

              <div className="space-y-4">
                <div className={`flex items-center justify-between p-3 rounded-xl ${winner === 'A' ? 'bg-green-500/10 border border-green-500/20' : 'bg-white/5 border border-transparent'}`}>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-brand-gray font-bold">{algoA}</span>
                    <span className="text-lg font-mono font-black text-white">{stat.valA.toFixed(2)}{stat.unit}</span>
                  </div>
                  {winner === 'A' && <CheckCircle2 size={18} className="text-green-400" />}
                </div>

                <div className={`flex items-center justify-between p-3 rounded-xl ${winner === 'B' ? 'bg-green-500/10 border border-green-500/20' : 'bg-white/5 border border-transparent'}`}>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-brand-gray font-bold">{algoB}</span>
                    <span className="text-lg font-mono font-black text-white">{stat.valB.toFixed(2)}{stat.unit}</span>
                  </div>
                  {winner === 'B' && <CheckCircle2 size={18} className="text-green-400" />}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5">
                {winner === 'tie' ? (
                  <div className="flex items-center space-x-2 text-[10px] text-brand-gray italic">
                    <AlertCircle size={12} />
                    <span>Algorithms performed equally</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-[10px] text-green-400 font-bold uppercase tracking-wider">
                    <Trophy size={12} />
                    <span>{winner === 'A' ? algoA : algoB} is {stat.lowerIsBetter ? 'faster' : 'more efficient'}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ComparisonSummary;
