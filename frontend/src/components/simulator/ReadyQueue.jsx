import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ReadyQueue = ({ processes, currentTime, schedule }) => {
  // Determine which processes are in the ready queue at currentTime
  // This is tricky because we don't have the internal state of the queue at every tick from the backend.
  // For Phase 3, we can derive it: a process is in ready queue if arrivalTime <= currentTime AND it has not finished.
  // And it is NOT the currently running process.

  const currentSegment = schedule?.segments.find(s => s.startTime <= currentTime && s.endTime > currentTime);
  const runningId = currentSegment?.processId;

  const readyProcesses = processes.filter(p => {
    // Has arrived
    const hasArrived = p.arrivalTime <= currentTime;
    // Has not finished (look in results for endTime)
    const result = schedule?.results.find(r => r.id === p.id);
    const hasFinished = result && result.endTime <= currentTime;
    // Is not running
    const isRunning = runningId === p.id;

    return hasArrived && !hasFinished && !isRunning;
  });

  return (
    <div className="glass p-6 min-h-[180px]">
      <h3 className="text-sm font-bold mb-4 text-brand-gray uppercase tracking-wider">Ready Queue</h3>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {readyProcesses.length > 0 ? (
            readyProcesses.map((process) => (
              <motion.div
                key={process.id}
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 10 }}
                className="w-10 h-10 border border-white/10 rounded flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: process.color + '20',
                  borderColor: process.color,
                  color: process.color
                }}
              >
                {process.id}
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-10 h-10 border border-dashed border-white/20 rounded flex items-center justify-center text-brand-gray text-[10px]"
            >
              Empty
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReadyQueue;
