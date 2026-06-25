import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, AlertCircle, CheckCircle2, Zap, Activity, Clock, Layers, MousePointer2 } from 'lucide-react';
import {
  calculateAverages,
  calculateThroughput,
  calculateUtilization,
  getContextSwitches,
  getTotalTime
} from '../../utils/metrics';

const ComparisonSummary = ({ algoA, algoB, metricsA, metricsB, resultsA, resultsB }) => {
  if (!metricsA || !metricsB || !resultsA || !resultsB) return null;

  const avgsA = calculateAverages(resultsA);
  const avgsB = calculateAverages(resultsB);

  const stats = [
    {
      label: 'Avg. Waiting Time',
      valA: avgsA.avgWaiting,
      valB: avgsB.avgWaiting,
      unit: 'ms',
      lowerIsBetter: true,
      icon: Clock,
    },
    {
      label: 'Avg. Turnaround Time',
      valA: avgsA.avgTurnaround,
      valB: avgsB.avgTurnaround,
      unit: 'ms',
      lowerIsBetter: true,
      icon: Layers,
    },
    {
      label: 'Avg. Response Time',
      valA: avgsA.avgResponse,
      valB: avgsB.avgResponse,
      unit: 'ms',
      lowerIsBetter: true,
      icon: MousePointer2,
    },
    {
      label: 'CPU Utilization',
      valA: calculateUtilization(getTotalTime(metricsA), metricsA.idleTime),
      valB: calculateUtilization(getTotalTime(metricsB), metricsB.idleTime),
      unit: '%',
      lowerIsBetter: false,
      icon: Activity,
    },
    {
      label: 'Throughput',
      valA: calculateThroughput(resultsA.length, getTotalTime(metricsA)),
      valB: calculateThroughput(resultsB.length, getTotalTime(metricsB)),
      unit: 'p/s',
      lowerIsBetter: false,
      icon: Zap,
    },
    {
      label: 'Context Switches',
      valA: getContextSwitches(metricsA),
      valB: getContextSwitches(metricsB),
      unit: '',
      lowerIsBetter: true,
      icon: Layers,
    },
    {
      label: 'Total Simulation Time',
      valA: getTotalTime(metricsA),
      valB: getTotalTime(metricsB),
      unit: 's',
      lowerIsBetter: true,
      icon: Clock,
    }
  ];

  const getWinner = (stat) => {
    // Add small epsilon for floating point comparison
    const diff = stat.valA - stat.valB;
    if (Math.abs(diff) < 0.0001) return 'tie';

    if (stat.lowerIsBetter) {
      return diff < 0 ? 'A' : 'B';
    }
    return diff > 0 ? 'A' : 'B';
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
      className="glass p-8 border-t-4 border-brand-blue relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
        <Trophy size={200} />
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6 relative z-10">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="p-2 bg-brand-blue/10 rounded-lg text-brand-blue">
                <Trophy size={20} />
            </div>
            <h3 className="text-2xl font-black text-white">Comparison Summary</h3>
          </div>
          <p className="text-brand-gray text-sm italic">Direct performance breakdown based on simulation results.</p>
        </div>

        <div className="flex flex-col items-start md:items-end">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-gray mb-2">Overall Performance Winner</span>
          <div className="flex items-center space-x-3 bg-gradient-to-r from-brand-blue/20 to-brand-cyan/20 px-6 py-3 rounded-2xl border border-white/10 shadow-xl backdrop-blur-md">
            <Trophy size={24} className={overallWinner === 'Tie' ? "text-brand-gray" : "text-yellow-400"} />
            <span className="text-xl font-black text-white tracking-tight">
                {overallWinner === 'Tie' ? "It's a Draw" : overallWinner}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {stats.map((stat, index) => {
          const winner = getWinner(stat);
          return (
            <div key={index} className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.06] transition-all group">
              <div className="flex items-center space-x-2 mb-5">
                <stat.icon size={14} className="text-brand-gray group-hover:text-brand-blue transition-colors" />
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-gray">{stat.label}</p>
              </div>

              <div className="space-y-3">
                {/* Algo A Row */}
                <div className={`flex items-center justify-between p-4 rounded-xl transition-all ${winner === 'A' ? 'bg-green-500/10 border border-green-500/20 ring-1 ring-green-500/10' : 'bg-white/5 border border-transparent opacity-60'}`}>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-brand-gray font-bold uppercase tracking-tighter mb-0.5">{algoA}</span>
                    <span className="text-xl font-mono font-black text-white">{stat.valA.toFixed(2)}<span className="text-[10px] ml-0.5 opacity-50">{stat.unit}</span></span>
                  </div>
                  {winner === 'A' && (
                    <div className="bg-green-500/20 p-1.5 rounded-full">
                        <CheckCircle2 size={16} className="text-green-400" />
                    </div>
                  )}
                </div>

                {/* Algo B Row */}
                <div className={`flex items-center justify-between p-4 rounded-xl transition-all ${winner === 'B' ? 'bg-green-500/10 border border-green-500/20 ring-1 ring-green-500/10' : 'bg-white/5 border border-transparent opacity-60'}`}>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-brand-gray font-bold uppercase tracking-tighter mb-0.5">{algoB}</span>
                    <span className="text-xl font-mono font-black text-white">{stat.valB.toFixed(2)}<span className="text-[10px] ml-0.5 opacity-50">{stat.unit}</span></span>
                  </div>
                  {winner === 'B' && (
                    <div className="bg-green-500/20 p-1.5 rounded-full">
                        <CheckCircle2 size={16} className="text-green-400" />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/5">
                {winner === 'tie' ? (
                  <div className="flex items-center space-x-2 text-[10px] text-brand-gray/50 italic">
                    <AlertCircle size={12} />
                    <span>Identical Performance</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-[10px] text-green-400 font-black uppercase tracking-widest">
                        <Zap size={12} className="fill-current" />
                        <span>{winner === 'A' ? algoA : algoB} Leading</span>
                    </div>
                    <span className="text-[9px] text-brand-gray font-bold italic">
                        {stat.lowerIsBetter ? 'Lower is better' : 'Higher is better'}
                    </span>
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
