import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Clock, Zap } from 'lucide-react';

const RunningProcess = ({ currentTime = 0, schedule = null, processes = [] }) => {
  const safeProcesses = Array.isArray(processes) ? processes.filter(Boolean) : [];

  const isMultiCore = Array.isArray(schedule?.segments) && Array.isArray(schedule?.segments[0]);
  const lanes = isMultiCore ? schedule.segments : [schedule?.segments].filter(Boolean);

  const getRunningData = (lane) => {
    const segment = lane?.find(
      s => s && s.startTime <= currentTime && s.endTime > currentTime
    );

    const isIdle = !segment || segment.isIdle;
    const processData = isIdle ? null : safeProcesses.find(p => p && p.id === segment?.processId);

    let remainingBurst = 0;
    let elapsedExecution = 0;
    let progress = 0;

    if (processData) {
      const allSegments = isMultiCore ? schedule.segments.flat() : (schedule?.segments || []);
      elapsedExecution = allSegments
        .filter(s => s && s.processId === processData.id && s.startTime < currentTime)
        .reduce((acc, s) => acc + (Math.min(s.endTime, currentTime) - s.startTime), 0);

      const totalBurst = processData.burstTime || 1;
      remainingBurst = Math.max(0, (processData.burstTime || 0) - elapsedExecution);
      progress = Math.min(100, (elapsedExecution / totalBurst) * 100);
    }

    return { isIdle, processData, remainingBurst, elapsedExecution, progress };
  };

  return (
    <div className="glass p-6 min-h-[180px] flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
        <Activity size={64} className={lanes.some(l => !getRunningData(l).isIdle) ? 'animate-pulse text-brand-blue' : ''} />
      </div>

      <h3 className="text-sm font-bold mb-4 text-brand-gray uppercase tracking-widest flex items-center">
        <Activity size={14} className={`mr-2 ${lanes.some(l => !getRunningData(l).isIdle) ? 'text-brand-blue animate-pulse' : 'text-brand-gray/30'}`} />
        CPU Status
      </h3>

      <div className="flex-grow space-y-6 overflow-y-auto custom-scrollbar max-h-[300px] pr-2">
        {lanes.map((lane, i) => {
          const { isIdle, processData, remainingBurst, elapsedExecution, progress } = getRunningData(lane);

          return (
            <div key={i} className={`relative p-4 rounded-xl border transition-all ${!isIdle ? 'bg-white/5 border-white/10 shadow-lg' : 'border-dashed border-white/5 opacity-50'}`}>
              {isMultiCore && (
                <div className="absolute -top-2 left-3 px-2 py-0.5 bg-brand-navy border border-white/10 rounded text-[8px] font-black text-brand-gray uppercase tracking-widest z-10">
                  Core {i + 1}
                </div>
              )}

              <AnimatePresence mode="wait">
                {!isIdle && processData ? (
                  <motion.div
                    key={processData.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="w-full"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-brand-gray uppercase tracking-widest opacity-50 leading-none mb-1">Process</span>
                        <span className="text-xl font-black" style={{ color: processData.color || '#3b82f6' }}>
                          {processData.id}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-mono font-bold text-white leading-none">
                          {progress.toFixed(0)}%
                        </div>
                        <span className="text-[8px] text-brand-gray uppercase font-black opacity-50 tracking-widest">Progress</span>
                      </div>
                    </div>

                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-4 border border-white/5 p-[1px]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: processData.color || '#3b82f6' }}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[7px] text-brand-gray font-black uppercase tracking-tighter mb-0.5 opacity-50">Remaining</span>
                        <span className="text-[10px] font-mono font-bold text-white">{remainingBurst.toFixed(1)}s</span>
                      </div>
                      <div className="flex flex-col text-center">
                        <span className="text-[7px] text-brand-gray font-black uppercase tracking-tighter mb-0.5 opacity-50">Priority</span>
                        <span className="text-[10px] font-mono font-bold text-white">{processData.priority}</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-[7px] text-brand-gray font-black uppercase tracking-tighter mb-0.5 opacity-50">Arrival</span>
                        <span className="text-[10px] font-mono font-bold text-white">{processData.arrivalTime}s</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-4 text-center"
                  >
                    <p className="text-brand-gray/30 text-[9px] font-black uppercase tracking-[0.2em]">CPU IDLE</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RunningProcess;
