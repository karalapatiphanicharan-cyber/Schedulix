import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Clock, Zap } from 'lucide-react';

const RunningProcess = ({ currentTime = 0, schedule = null, processes = [] }) => {
  const safeProcesses = Array.isArray(processes) ? processes.filter(Boolean) : [];

  const currentSegment = schedule?.segments?.find(
    s => s && s.startTime <= currentTime && s.endTime > currentTime
  );

  const isIdle = !currentSegment || currentSegment.isIdle;
  const processData = isIdle ? null : safeProcesses.find(p => p && p.id === currentSegment?.processId);

  let remainingBurst = 0;
  let elapsedExecution = 0;
  let progress = 0;

  if (processData) {
    const segments = schedule?.segments || [];
    elapsedExecution = segments
      .filter(s => s && s.processId === processData.id && s.startTime < currentTime)
      .reduce((acc, s) => acc + (Math.min(s.endTime, currentTime) - s.startTime), 0);

    const totalBurst = processData.burstTime || 1; // Avoid division by zero
    remainingBurst = Math.max(0, (processData.burstTime || 0) - elapsedExecution);
    progress = Math.min(100, (elapsedExecution / totalBurst) * 100);
  }

  return (
    <div className="glass p-6 min-h-[180px] flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
        <Activity size={64} className={!isIdle ? 'animate-pulse text-brand-blue' : ''} />
      </div>

      <h3 className="text-sm font-bold mb-4 text-brand-gray uppercase tracking-widest flex items-center">
        <Activity size={14} className={`mr-2 ${!isIdle ? 'text-brand-blue animate-pulse' : 'text-brand-gray/30'}`} />
        CPU Status
      </h3>

      <div className="flex-grow flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isIdle && processData ? (
            <motion.div
              key={processData.id}
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              className="w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-brand-gray uppercase tracking-tighter opacity-50 leading-none">Running</span>
                  <span className="text-4xl font-black" style={{ color: processData.color || '#3b82f6' }}>
                    {processData.id || 'N/A'}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-mono font-bold text-white leading-none">
                    {progress.toFixed(0)}%
                  </div>
                  <span className="text-[10px] text-brand-gray uppercase font-bold opacity-50">Progress</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-6 border border-white/5 p-[1px]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                    style={{ backgroundColor: processData.color || '#3b82f6' }}
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col">
                  <div className="flex items-center text-[8px] text-brand-gray font-black uppercase mb-0.5">
                    <Clock size={8} className="mr-1" /> Remaining
                  </div>
                  <span className="text-xs font-mono font-bold text-white">{remainingBurst.toFixed(1)}s</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center text-[8px] text-brand-gray font-black uppercase mb-0.5">
                    <Zap size={8} className="mr-1" /> Priority
                  </div>
                  <span className="text-xs font-mono font-bold text-white">{processData.priority ?? 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center text-[8px] text-brand-gray font-black uppercase mb-0.5">
                    <Activity size={8} className="mr-1" /> Elapsed
                  </div>
                  <span className="text-xs font-mono font-bold text-white">{elapsedExecution.toFixed(1)}s</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="h-16 w-16 rounded-3xl border-2 border-dashed border-white/10 flex items-center justify-center mx-auto mb-3 relative overflow-hidden">
                 <div className="absolute inset-0 bg-white/[0.02] animate-pulse" />
                 <div className="w-2 h-2 rounded-full bg-brand-gray/30 animate-ping" />
              </div>
              <p className="text-brand-gray/40 text-[10px] font-black uppercase tracking-widest">CPU is idle.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RunningProcess;
