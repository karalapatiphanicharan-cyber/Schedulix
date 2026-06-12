import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const CompletedProcesses = ({ currentTime, schedule }) => {
  const completedResults = schedule?.results
    .filter(r => r.endTime <= currentTime)
    .sort((a, b) => a.endTime - b.endTime) || [];

  return (
    <div className="glass p-6 min-h-[180px]">
      <h3 className="text-sm font-bold mb-4 text-brand-gray uppercase tracking-wider">Completed</h3>

      <div className="space-y-2 max-h-[120px] overflow-y-auto custom-scrollbar pr-2">
        <AnimatePresence>
          {completedResults.length > 0 ? (
            completedResults.map((result) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: result.color }} />
                  <span className="text-xs font-bold">{result.id}</span>
                </div>
                <div className="flex items-center space-x-2 text-[10px] text-brand-gray">
                  <span>Finished at</span>
                  <span className="text-white font-mono">{result.endTime}s</span>
                  <CheckCircle2 size={12} className="text-green-500" />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-4 border border-dashed border-white/20 rounded">
              <p className="text-brand-gray text-[10px]">No processes finished</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CompletedProcesses;
