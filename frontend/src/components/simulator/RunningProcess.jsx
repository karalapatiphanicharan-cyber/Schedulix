import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RunningProcess = ({ currentTime, schedule, processes }) => {
  const currentSegment = schedule?.segments.find(
    s => s.startTime <= currentTime && s.endTime > currentTime
  );

  const processData = currentSegment?.isIdle
    ? null
    : processes.find(p => p.id === currentSegment?.processId);

  // For remaining time, we need to know how much total burst time this process has left across all segments
  // This is simpler: totalBurst - executedBurst
  let remainingBurst = 0;
  if (processData) {
    const executedBurst = schedule.segments
      .filter(s => s.processId === processData.id && s.startTime < currentTime)
      .reduce((acc, s) => acc + (Math.min(s.endTime, currentTime) - s.startTime), 0);
    remainingBurst = Math.max(0, processData.burstTime - executedBurst);
  }

  return (
    <div className="glass p-6 min-h-[180px] flex flex-col">
      <h3 className="text-sm font-bold mb-4 text-brand-gray uppercase tracking-wider">Running Process</h3>

      <div className="flex-grow flex items-center justify-center">
        <AnimatePresence mode="wait">
          {processData ? (
            <motion.div
              key={processData.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full text-center"
            >
              <div className="text-3xl font-bold mb-1" style={{ color: processData.color }}>
                {processData.id}
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] text-brand-gray mt-4">
                <div className="text-left border-r border-white/10 pr-2">
                  <p className="uppercase opacity-50">Remaining</p>
                  <p className="text-white font-mono text-sm">{remainingBurst.toFixed(1)}s</p>
                </div>
                <div className="text-left pl-2">
                  <p className="uppercase opacity-50">Arrival</p>
                  <p className="text-white font-mono text-sm">{processData.arrivalTime}s</p>
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
              <div className="h-12 w-12 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center mx-auto mb-2">
                <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />
              </div>
              <p className="text-brand-gray text-xs">CPU Idle</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RunningProcess;
