import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Clock, Activity, Zap, Layers, HelpCircle } from 'lucide-react';

const AnimatedNumber = ({ value }) => {
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (current) => current.toFixed(2));

  useEffect(() => {
    spring.set(parseFloat(value) || 0);
  }, [value, spring]);

  return <motion.span className="animate-number">{display}</motion.span>;
};

const StatCard = ({ label, value, unit, icon: Icon, description, isPlaceholder }) => (
  <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5 relative overflow-hidden group hover:bg-white/[0.05] transition-all">
    <div className="absolute -top-2 -right-2 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none">
      <Icon size={48} />
    </div>

    <div className="flex items-center space-x-2 mb-3">
      <div className="p-1.5 bg-brand-blue/10 rounded-lg text-brand-blue">
        <Icon size={14} />
      </div>
      <p className="text-brand-gray text-[10px] font-black uppercase tracking-widest leading-none">{label}</p>
    </div>

    <div className="flex items-baseline space-x-1">
      {isPlaceholder ? (
        <span className="text-sm font-bold text-brand-gray/30 italic">{value}</span>
      ) : (
        <>
          <span className="text-2xl font-black text-white">
            <AnimatedNumber value={value} />
          </span>
          {unit && <span className="text-[10px] font-bold text-brand-gray/50">{unit}</span>}
        </>
      )}
    </div>

    <div className="mt-3 flex items-center text-[9px] text-brand-gray/40 group-hover:text-brand-gray/60 transition-colors">
      <HelpCircle size={10} className="mr-1" />
      <span className="italic">{description}</span>
    </div>
  </div>
);

const StatisticsPanel = ({ results = [], metrics = null, playbackState = 'idle' }) => {
  const isSimulationStarted = playbackState !== 'idle';
  const isFinished = playbackState === 'finished';

  const [stats, setStats] = useState([
    { label: "Avg. Waiting", value: "—", unit: "ms", icon: Clock, description: "Average time in ready queue" },
    { label: "Avg. Turnaround", value: "—", unit: "ms", icon: Layers, description: "Time from arrival to finish" },
    { label: "Throughput", value: "—", unit: "p/s", icon: Zap, description: "Processes finished per second" },
    { label: "Utilization", value: "Run simulation", unit: "%", icon: Activity, description: "CPU active time percentage" }
  ]);

  useEffect(() => {
    if (isSimulationStarted && Array.isArray(results) && results.length > 0 && metrics && metrics.totalTime > 0) {
      const avgWaiting = results.reduce((acc, r) => acc + (r.waitingTime || 0), 0) / results.length;
      const avgTurnaround = results.reduce((acc, r) => acc + (r.turnaroundTime || 0), 0) / results.length;
      const throughput = results.length / metrics.totalTime;
      const utilization = Math.max(0, Math.min(100, ((metrics.totalTime - (metrics.idleTime || 0)) / metrics.totalTime) * 100));

      setStats(prev => [
        { ...prev[0], value: avgWaiting },
        { ...prev[1], value: avgTurnaround },
        { ...prev[2], value: throughput },
        { ...prev[3], value: utilization }
      ]);
    } else {
        setStats([
            { label: "Avg. Waiting", value: "—", unit: "ms", icon: Clock, description: "Average time in ready queue" },
            { label: "Avg. Turnaround", value: "—", unit: "ms", icon: Layers, description: "Time from arrival to finish" },
            { label: "Throughput", value: "—", unit: "p/s", icon: Zap, description: "Processes finished per second" },
            { label: "Utilization", value: "Run simulation", unit: "%", icon: Activity, description: "CPU active time percentage" }
        ]);
    }
  }, [results, metrics, isSimulationStarted]);

  return (
    <div className="glass p-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold">Simulation Statistics</h3>
        <AnimatePresence>
            {isFinished && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-black text-green-400 uppercase tracking-widest"
                >
                    Simulation Complete
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard
            key={i}
            {...stat}
            isPlaceholder={stat.value === '—' || stat.value === 'Run simulation'}
          />
        ))}
      </div>

      <AnimatePresence>
        {isSimulationStarted && metrics && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex items-center space-x-6">
                <div className="flex flex-col">
                    <span className="text-[9px] text-brand-gray/40 font-black uppercase tracking-widest mb-1">Context Switches</span>
                    <span className="text-xl font-mono font-bold text-white">{metrics.contextSwitches ?? 0}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[9px] text-brand-gray/40 font-black uppercase tracking-widest mb-1">Total Simulation Time</span>
                    <span className="text-xl font-mono font-bold text-brand-cyan">{(metrics.totalTime || 0).toFixed(1)}s</span>
                </div>
            </div>

            <div className="flex items-center space-x-2 text-[10px] text-brand-gray italic bg-white/[0.02] px-4 py-2 rounded-xl">
                <Activity size={12} className="text-brand-blue" />
                <span>Results rounded to 2 decimal places</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatisticsPanel;
