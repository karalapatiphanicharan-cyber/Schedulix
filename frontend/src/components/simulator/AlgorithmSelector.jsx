import React from 'react';
import { Settings, Clock } from 'lucide-react';

const AlgorithmSelector = ({ selectedAlgorithm, onSelect, quantum, onQuantumChange }) => {
  const algorithms = [
    { id: 'FCFS', name: 'First-Come, First-Served (FCFS)' },
    { id: 'SJF', name: 'Shortest Job First (SJF)' },
    { id: 'SRTF', name: 'Shortest Remaining Time First (SRTF)' },
    { id: 'RR', name: 'Round Robin (RR)' },
    { id: 'Priority', name: 'Priority Scheduling' },
  ];

  return (
    <div className="glass p-6">
      <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
        <Settings size={18} className="text-brand-blue" />
        <span>Algorithm</span>
      </h3>

      <div className="space-y-4">
        <div className="relative">
          <select
            value={selectedAlgorithm}
            onChange={(e) => onSelect(e.target.value)}
            className="w-full bg-brand-navy border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-blue appearance-none"
          >
            {algorithms.map((algo) => (
              <option key={algo.id} value={algo.id}>
                {algo.name}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-gray">
            <Settings size={14} />
          </div>
        </div>

        {selectedAlgorithm === 'RR' && (
          <div className="p-4 bg-white/5 rounded-xl border border-brand-blue/20 animate-in fade-in slide-in-from-top-1">
            <div className="flex items-center space-x-2 mb-2 text-brand-blue">
              <Clock size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">Time Quantum</span>
            </div>
            <input
              type="number"
              min="1"
              value={quantum}
              onChange={(e) => onQuantumChange(parseInt(e.target.value) || 1)}
              className="w-full bg-transparent border-b border-white/10 py-1 text-sm focus:outline-none focus:border-brand-blue"
            />
            <p className="text-[10px] text-brand-gray mt-2">
              The time period for which a process is allowed to run in a preemptive round-robin system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlgorithmSelector;
