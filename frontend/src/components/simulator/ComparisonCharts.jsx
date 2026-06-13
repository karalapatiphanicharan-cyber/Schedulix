import React from 'react';
import { motion } from 'framer-motion';

const ChartBar = ({ label, value, maxValue, color, unit }) => {
  const percentage = Math.max(5, (value / (maxValue || 1)) * 100);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center px-1">
        <span className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">{label}</span>
        <span className="text-[10px] font-mono font-bold text-white">{value.toFixed(2)}{unit}</span>
      </div>
      <div className="h-4 bg-white/5 rounded-md overflow-hidden border border-white/5 p-[2px]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className={`h-full rounded-[3px] shadow-lg shadow-${color}/10`}
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
};

const ComparisonCharts = ({ results }) => {
  if (!results) return null;

  const algos = Object.keys(results);
  const metrics = [
    { key: 'avgWaiting', label: 'Average Waiting Time', unit: 's', color: '#3b82f6' },
    { key: 'avgTurnaround', label: 'Average Turnaround Time', unit: 's', color: '#06b6d4' },
    { key: 'utilization', label: 'CPU Utilization', unit: '%', color: '#10b981' },
    { key: 'throughput', label: 'Throughput', unit: ' p/s', color: '#f59e0b' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {metrics.map(metric => {
        const maxValue = Math.max(...algos.map(a => results[a][metric.key]), 1);

        return (
          <div key={metric.key} className="glass p-6">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: metric.color }} />
              <span>{metric.label}</span>
            </h4>
            <div className="space-y-4">
              {algos.map(algo => (
                <ChartBar
                  key={algo}
                  label={algo}
                  value={results[algo][metric.key]}
                  maxValue={maxValue}
                  color={metric.color}
                  unit={metric.unit}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ComparisonCharts;
