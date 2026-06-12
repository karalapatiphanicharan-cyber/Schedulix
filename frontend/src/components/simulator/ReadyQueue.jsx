import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ReadyQueue = ({ processes = [], currentTime = 0, schedule = null }) => {
  const safeProcesses = Array.isArray(processes) ? processes.filter(Boolean) : [];

  const currentSegment = schedule?.segments?.find(s => s.startTime <= currentTime && s.endTime > currentTime);
  const runningId = currentSegment?.processId;

  const readyProcesses = safeProcesses.filter(p => {
    if (!p || typeof p !== 'object') return false;
    const hasArrived = (p.arrivalTime ?? Infinity) <= currentTime;
    const result = schedule?.results?.find(r => r.id === p.id);
    const hasFinished = result && result.endTime <= currentTime;
    const isRunning = runningId === p.id;
    return hasArrived && !hasFinished && !isRunning;
  });

  return (
    <div className="glass p-6 min-h-[180px] relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
        <div className="text-4xl font-black">RQ</div>
      </div>

      <h3 className="text-sm font-bold mb-6 text-brand-gray uppercase tracking-widest flex items-center">
        <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan mr-2 animate-pulse" />
        Ready Queue
      </h3>

      <div className="flex flex-wrap gap-3">
        <AnimatePresence mode="popLayout">
          {readyProcesses.length > 0 ? (
            readyProcesses.map((process) => {
              if (!process?.id) return null;

              // Calculate remaining burst for the chip
              const segments = schedule?.segments || [];
              const executedBurst = segments
                .filter(s => s && s.processId === process.id && s.startTime < currentTime)
                .reduce((acc, s) => acc + (Math.min(s.endTime, currentTime) - s.startTime), 0);
              const remaining = Math.max(0, (process.burstTime || 0) - executedBurst);

              return (
                <motion.div
                  key={process.id}
                  layout
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: -10 }}
                  className="relative group"
                >
                  <div
                    className="px-3 py-2 border rounded-xl flex flex-col items-center justify-center min-w-[50px] shadow-lg transition-all group-hover:-translate-y-1"
                    style={{
                      backgroundColor: (process.color || '#3b82f6') + '15',
                      borderColor: (process.color || '#3b82f6') + '50',
                      boxShadow: `0 4px 12px ${(process.color || '#3b82f6')}20`
                    }}
                  >
                    <span className="text-xs font-black mb-0.5" style={{ color: process.color || '#3b82f6' }}>{process.id}</span>
                    <span className="text-[8px] font-mono opacity-60 text-white">{remaining.toFixed(1)}s</span>
                  </div>

                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 glass px-2 py-1 text-[8px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
                    Priority: {process.priority ?? 'N/A'}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-16 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-brand-gray/40 text-[10px] uppercase tracking-widest font-bold"
            >
              No waiting processes.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReadyQueue;
