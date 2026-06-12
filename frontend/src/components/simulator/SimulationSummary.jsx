import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Download, RotateCcw, FileJson, FileText, CheckCircle2 } from 'lucide-react';

const SimulationSummary = ({
  results = [],
  metrics = null,
  algorithm = '',
  processes = [],
  onRunAgain,
  onReset
}) => {
  if (!metrics) return null;

  const exportToJSON = () => {
    const data = {
      summary: {
        algorithm,
        processCount: processes.length,
        totalTime: metrics.totalTime,
        avgWaiting: (results.reduce((acc, r) => acc + r.waitingTime, 0) / results.length).toFixed(2),
        avgTurnaround: (results.reduce((acc, r) => acc + r.turnaroundTime, 0) / results.length).toFixed(2),
        throughput: (results.length / metrics.totalTime).toFixed(2),
        utilization: (((metrics.totalTime - metrics.idleTime) / metrics.totalTime) * 100).toFixed(2) + '%',
        contextSwitches: metrics.contextSwitches
      },
      processes: results
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `schedulix_${algorithm}_results.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Arrival', 'Burst', 'Priority', 'Start', 'End', 'Wait', 'TAT'];
    const rows = results.map(r => [
      r.id,
      r.arrivalTime,
      r.burstTime,
      r.priority,
      r.startTime,
      r.endTime,
      r.waitingTime,
      r.turnaroundTime
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `schedulix_${algorithm}_results.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const stats = [
    { label: "Avg. Waiting", value: (results.reduce((acc, r) => acc + r.waitingTime, 0) / results.length).toFixed(2), unit: "s" },
    { label: "Avg. Turnaround", value: (results.reduce((acc, r) => acc + r.turnaroundTime, 0) / results.length).toFixed(2), unit: "s" },
    { label: "Throughput", value: (results.length / metrics.totalTime).toFixed(2), unit: "p/s" },
    { label: "Utilization", value: (((metrics.totalTime - metrics.idleTime) / metrics.totalTime) * 100).toFixed(2), unit: "%" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="glass p-8 border-t-4 border-green-500 relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
        <Trophy size={160} />
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-500">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">Simulation Summary</h3>
            <p className="text-xs text-brand-gray font-bold uppercase tracking-widest">{algorithm} Algorithm</p>
          </div>
        </div>

        <div className="flex space-x-2">
            <button
                onClick={exportToCSV}
                className="flex items-center space-x-2 px-4 py-2 glass hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                title="Download CSV"
            >
                <FileText size={14} className="text-brand-blue" />
                <span>CSV</span>
            </button>
            <button
                onClick={exportToJSON}
                className="flex items-center space-x-2 px-4 py-2 glass hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                title="Download JSON"
            >
                <FileJson size={14} className="text-brand-cyan" />
                <span>JSON</span>
            </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <p className="text-[10px] text-brand-gray font-black uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-black text-white">{stat.value}</span>
              <span className="text-[10px] font-bold text-brand-gray/40">{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 border-t border-white/5 pt-8">
        <div className="flex flex-col">
            <span className="text-[9px] text-brand-gray/40 font-black uppercase tracking-widest mb-1">Total Time</span>
            <span className="text-lg font-mono font-bold text-brand-cyan">{metrics.totalTime.toFixed(1)}s</span>
        </div>
        <div className="flex flex-col">
            <span className="text-[9px] text-brand-gray/40 font-black uppercase tracking-widest mb-1">Context Switches</span>
            <span className="text-lg font-mono font-bold text-white">{metrics.contextSwitches}</span>
        </div>
        <div className="flex flex-col">
            <span className="text-[9px] text-brand-gray/40 font-black uppercase tracking-widest mb-1">Processes</span>
            <span className="text-lg font-mono font-bold text-brand-blue">{processes.length}</span>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={onRunAgain}
          className="flex-1 flex items-center justify-center space-x-2 bg-brand-blue hover:bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-brand-blue/20"
        >
          <RotateCcw size={18} />
          <span>Run Again</span>
        </button>
        <button
          onClick={onReset}
          className="flex-1 flex items-center justify-center space-x-2 glass hover:bg-white/10 text-white py-4 rounded-2xl font-black uppercase tracking-widest transition-all"
        >
          <span>Reset Simulation</span>
        </button>
      </div>
    </motion.div>
  );
};

export default SimulationSummary;
