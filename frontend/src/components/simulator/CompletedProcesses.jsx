import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, RotateCcw } from 'lucide-react';

const CompletedProcesses = ({ currentTime, schedule }) => {
  const completedResults = schedule?.results
    .filter(r => r.endTime <= currentTime)
    .sort((a, b) => a.endTime - b.endTime) || [];

  return (
    <div className="glass p-6 min-h-[180px] flex flex-col">
      <h3 className="text-sm font-bold mb-4 text-brand-gray uppercase tracking-widest flex items-center">
        <CheckCircle2 size={14} className="mr-2 text-green-500" />
        Completed
      </h3>

      <div className="flex-grow space-y-3 overflow-y-auto custom-scrollbar pr-2 h-[100px]">
        <AnimatePresence initial={false}>
          {completedResults.length > 0 ? (
            completedResults.map((result) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                className="p-3 bg-white/[0.03] rounded-xl border border-white/5 group hover:bg-white/[0.05] transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: result.color }} />
                    <span className="text-xs font-black">{result.id}</span>
                  </div>
                  <div className="flex items-center space-x-1 px-1.5 py-0.5 bg-green-500/10 rounded-md">
                    <span className="text-[8px] font-mono font-bold text-green-400">{result.endTime.toFixed(1)}s</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-white/5 rounded-md px-1.5 py-1 flex flex-col items-center">
                    <span className="text-[7px] uppercase font-bold text-brand-gray/50">Wait</span>
                    <span className="text-[10px] font-mono font-bold text-brand-cyan">{result.waitingTime.toFixed(1)}</span>
                  </div>
                  <div className="flex-1 bg-white/5 rounded-md px-1.5 py-1 flex flex-col items-center">
                    <span className="text-[7px] uppercase font-bold text-brand-gray/50">TAT</span>
                    <span className="text-[10px] font-mono font-bold text-brand-blue">{result.turnaroundTime.toFixed(1)}</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl opacity-30">
               <RotateCcw size={24} className="mb-2 opacity-50" />
               <p className="text-[10px] font-bold uppercase tracking-widest">Waiting to finish</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CompletedProcesses;
