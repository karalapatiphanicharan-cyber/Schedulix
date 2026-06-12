import React from 'react';
import { Settings, Clock, Info, BookOpen, Lightbulb, Zap, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ALGO_DETAILS = {
  FCFS: {
    description: "Executes processes in the order they arrive. It's the simplest scheduling algorithm.",
    advantages: ["Easy to implement", "No starvation"],
    disadvantages: ["Convoy effect", "High average waiting time"],
    useCase: "Batch systems where execution time doesn't matter much.",
    recommendedDataset: "Simple Example",
    recommendationReason: "Clearly demonstrates sequential first-come execution without complex preemptions."
  },
  SJF: {
    description: "Selects the process with the smallest burst time next. Non-preemptive.",
    advantages: ["Optimal average waiting time", "Minimal response time"],
    disadvantages: ["Starvation possible for long processes", "Burst time must be known"],
    useCase: "Short-job priority systems.",
    recommendedDataset: "Mixed Arrival Times",
    recommendationReason: "Highlights how shortest jobs jump to the front of the queue."
  },
  SRTF: {
    description: "Preemptive version of SJF. Current process is preempted if a new one arrives with shorter remaining time.",
    advantages: ["Lowest average waiting time", "Very efficient"],
    disadvantages: ["High context switching", "Starvation risk"],
    useCase: "Highly interactive systems.",
    recommendedDataset: "Mixed Arrival Times",
    recommendationReason: "Demonstrates mid-execution preemption when a shorter job arrives."
  },
  RR: {
    description: "Each process gets a small fixed unit of time (quantum) before being switched.",
    advantages: ["Fairness", "Good response time", "No starvation"],
    disadvantages: ["Sensitive to quantum size", "High context switching overhead"],
    useCase: "Time-sharing systems.",
    recommendedDataset: "Round Robin Demo",
    recommendationReason: "Perfectly illustrates time-slicing and process cycling."
  },
  Priority: {
    description: "Executes processes based on assigned priority values. Lower values usually mean higher priority.",
    advantages: ["Critical tasks run first", "Flexible"],
    disadvantages: ["Starvation for low priority processes"],
    useCase: "Real-time systems with critical tasks.",
    recommendedDataset: "Priority Heavy",
    recommendationReason: "Makes scheduling decisions obvious based on the priority column."
  }
};

const AlgorithmSelector = ({ selectedAlgorithm, onSelect, quantum, onQuantumChange, onLoadRecommended }) => {
  const algorithms = [
    { id: 'FCFS', name: 'First-Come, First-Served (FCFS)' },
    { id: 'SJF', name: 'Shortest Job First (SJF)' },
    { id: 'SRTF', name: 'Shortest Remaining Time First (SRTF)' },
    { id: 'RR', name: 'Round Robin (RR)' },
    { id: 'Priority', name: 'Priority Scheduling' },
  ];

  const details = ALGO_DETAILS[selectedAlgorithm];

  return (
    <div className="space-y-6">
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
              className="w-full bg-brand-navy border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-blue appearance-none font-bold text-white transition-all cursor-pointer hover:border-brand-blue/50"
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
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-brand-blue/5 rounded-xl border border-brand-blue/20"
            >
              <div className="flex items-center space-x-2 mb-2 text-brand-blue">
                <Clock size={14} />
                <span className="text-xs font-bold uppercase tracking-wider">Time Quantum</span>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  min="1"
                  value={quantum}
                  onChange={(e) => onQuantumChange(parseInt(e.target.value) || 1)}
                  className="w-20 bg-brand-navy border border-white/10 rounded px-2 py-1 text-sm font-mono focus:outline-none focus:border-brand-blue"
                />
                <span className="text-xs text-brand-gray italic">seconds per slice</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Educational Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedAlgorithm}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="glass p-6 border-l-4 border-brand-cyan relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
            <BookOpen size={120} />
          </div>

          <div className="flex items-center space-x-2 mb-4 text-brand-cyan">
            <Info size={18} />
            <h4 className="font-bold uppercase tracking-widest text-xs">How it works</h4>
          </div>

          <p className="text-sm text-brand-gray mb-6 leading-relaxed">
            {details.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider flex items-center space-x-1">
                <Zap size={10} /> <span>Advantages</span>
              </span>
              <ul className="text-xs space-y-1 text-brand-gray">
                {details.advantages.map((adv, i) => <li key={i} className="flex items-start">
                  <span className="mr-1.5">•</span> {adv}
                </li>)}
              </ul>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider flex items-center space-x-1">
                <X size={10} /> <span>Disadvantages</span>
              </span>
              <ul className="text-xs space-y-1 text-brand-gray">
                {details.disadvantages.map((dis, i) => <li key={i} className="flex items-start">
                  <span className="mr-1.5">•</span> {dis}
                </li>)}
              </ul>
            </div>
          </div>

          {/* Smart Recommendation */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/5 mt-4 group">
            <div className="flex items-center space-x-2 mb-2 text-yellow-400">
              <Lightbulb size={16} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Expert Recommendation</span>
            </div>
            <p className="text-[11px] text-brand-gray mb-3 leading-tight opacity-80">
              Try the <span className="text-white font-bold">{details.recommendedDataset}</span>. {details.recommendationReason}
            </p>
            <button
              onClick={() => onLoadRecommended(details.recommendedDataset)}
              className="w-full py-2 bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all border border-yellow-400/20"
            >
              Load Recommended Dataset
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AlgorithmSelector;
