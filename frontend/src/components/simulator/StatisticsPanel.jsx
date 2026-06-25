import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Clock, Activity, Zap, Layers, HelpCircle, MousePointer2 } from 'lucide-react';
import {
  calculateAverages,
  calculateThroughput,
  calculateUtilization,
  getContextSwitches,
  getTotalTime
} from '../../utils/metrics';

const AnimatedNumber = ({ value }) => {
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (current) => current.toFixed(2));

  useEffect(() => {
    spring.set(parseFloat(value) || 0);
  }, [value, spring]);

  return <motion.span className="animate-number">{display}</motion.span>;
};

const StatCard = ({ label, value, unit, icon: Icon, description, isPlaceholder, className = "p-6" }) => (
  <div className={`bg-white/[0.03] ${className} rounded-2xl border border-white/5 relative overflow-hidden group hover:bg-white/[0.05] transition-all`}>
    <div className="absolute -top-2 -right-2 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none">
      <Icon size={56} />
    </div>

    <div className="flex items-center space-x-2 mb-4">
      <div className="p-2 bg-brand-blue/10 rounded-lg text-brand-blue">
        <Icon size={16} />
      </div>
      <p className="text-brand-gray text-xs font-black uppercase tracking-widest leading-none">{label}</p>
    </div>

    <div className="flex items-baseline space-x-1">
      {isPlaceholder ? (
        <span className="text-base font-bold text-brand-gray/30 italic">{value}</span>
      ) : (
        <>
          <span className="text-3xl font-black text-white tracking-tight">
            <AnimatedNumber value={value} />
          </span>
          {unit && <span className="text-[11px] font-bold text-brand-gray/50 ml-1">{unit}</span>}
        </>
      )}
    </div>

    <div className="mt-4 flex items-center text-[10px] text-brand-gray/40 group-hover:text-brand-gray/60 transition-colors">
      <HelpCircle size={12} className="mr-1.5" />
      <span className="italic leading-tight">{description}</span>
    </div>
  </div>
);

const StatisticsPanel = ({
  results = [],
  metrics = null,
  playbackState = 'idle',
  gridClassName = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6",
  cardClassName = "p-6"
}) => {
  const isSimulationStarted = playbackState !== 'idle';
  const isFinished = playbackState === 'finished';

  const [stats, setStats] = useState([
    { label: "Avg. Waiting", value: "—", unit: "ms", icon: Clock, description: "Average time in ready queue" },
    { label: "Avg. Turnaround", value: "—", unit: "ms", icon: Layers, description: "Time from arrival to finish" },
    { label: "Avg. Response", value: "—", unit: "ms", icon: MousePointer2, description: "Time to first execution" },
    { label: "Throughput", value: "—", unit: "p/s", icon: Zap, description: "Processes finished per second" },
    { label: "Utilization", value: "Run simulation", unit: "%", icon: Activity, description: "CPU active time percentage" }
  ]);

  useEffect(() => {
    if (isSimulationStarted && Array.isArray(results) && results.length > 0 && metrics && getTotalTime(metrics) > 0) {
      const { avgWaiting, avgTurnaround, avgResponse } = calculateAverages(results);
      const throughput = calculateThroughput(results.length, getTotalTime(metrics));
      const utilization = calculateUtilization(getTotalTime(metrics), metrics.idleTime);

      setStats(prev => [
        { ...prev[0], value: avgWaiting },
        { ...prev[1], value: avgTurnaround },
        { ...prev[2], value: avgResponse },
        { ...prev[3], value: throughput },
        { ...prev[4], value: utilization }
      ]);
    } else {
        setStats([
            { label: "Avg. Waiting", value: "—", unit: "ms", icon: Clock, description: "Average time in ready queue" },
            { label: "Avg. Turnaround", value: "—", unit: "ms", icon: Layers, description: "Time from arrival to finish" },
            { label: "Avg. Response", value: "—", unit: "ms", icon: MousePointer2, description: "Time to first execution" },
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

      <div className={gridClassName}>
        {stats.map((stat, i) => (
          <StatCard
            key={i}
            {...stat}
            className={cardClassName}
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
                    <span className="text-xl font-mono font-bold text-white">{getContextSwitches(metrics)}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[9px] text-brand-gray/40 font-black uppercase tracking-widest mb-1">Total Simulation Time</span>
                    <span className="text-xl font-mono font-bold text-brand-cyan">{getTotalTime(metrics).toFixed(1)}s</span>
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
