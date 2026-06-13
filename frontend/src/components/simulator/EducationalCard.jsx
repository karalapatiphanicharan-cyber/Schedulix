import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, BookOpen, Zap, X, Lightbulb, Clock, Layers, Star, AlertTriangle, Terminal, CheckCircle2 } from 'lucide-react';

const ALGO_DETAILS = {
  FCFS: {
    description: "Executes processes in the order they arrive. It's the simplest scheduling algorithm.",
    preemptive: "No",
    advantages: ["Easy to implement", "No starvation", "Zero overhead"],
    disadvantages: ["Convoy effect", "High average waiting time", "Not suitable for interactive systems"],
    useCase: "Batch systems where execution time doesn't matter much.",
    complexity: { time: "O(n)", space: "O(n)" },
    starvationRisk: "Low/None",
    osUsage: "Modern OS use it as part of more complex schedulers.",
    details: "First-Come, First-Served (FCFS) follows the 'first in, first out' (FIFO) principle. While fair in terms of arrival, it can lead to the 'convoy effect' where short processes wait behind a very long one."
  },
  SJF: {
    description: "Selects the process with the smallest burst time next. Non-preemptive.",
    preemptive: "No",
    advantages: ["Optimal average waiting time", "Minimal response time for short jobs"],
    disadvantages: ["Starvation possible for long processes", "Burst time must be known in advance"],
    useCase: "Short-job priority systems and background batch processing.",
    complexity: { time: "O(n log n)", space: "O(n)" },
    starvationRisk: "High",
    osUsage: "Used in batch environments where jobs are well-defined.",
    details: "Shortest Job First (SJF) is provably optimal for minimizing average waiting time. However, it requires knowing the future (CPU burst length), which is often estimated using exponential averaging."
  },
  SRTF: {
    description: "Preemptive version of SJF. Current process is preempted if a new one arrives with shorter remaining time.",
    preemptive: "Yes",
    advantages: ["Lowest average waiting time", "Very efficient for mixed workloads"],
    disadvantages: ["High context switching overhead", "Starvation risk for long processes"],
    useCase: "Highly interactive systems and time-sharing environments.",
    complexity: { time: "O(n log n)", space: "O(n)" },
    starvationRisk: "High",
    osUsage: "Found in many real-time and interactive system designs.",
    details: "Shortest Remaining Time First (SRTF) ensures that the CPU always works on the job that can finish soonest, providing excellent responsiveness at the cost of more frequent context switches."
  },
  RR: {
    description: "Each process gets a small fixed unit of time (quantum) before being switched.",
    preemptive: "Yes",
    advantages: ["Fairness", "Excellent response time", "No starvation"],
    disadvantages: ["Sensitive to quantum size", "High context switching if quantum is too small"],
    useCase: "General-purpose time-sharing systems.",
    complexity: { time: "O(n)", space: "O(n)" },
    starvationRisk: "None",
    osUsage: "The basis for most modern general-purpose OS schedulers.",
    details: "Round Robin (RR) cycles through all ready processes. If a process doesn't finish within its 'time slice' (quantum), it's moved to the back of the queue, ensuring all processes get regular CPU access."
  },
  Priority: {
    description: "Executes processes based on assigned priority values. Lower values mean higher priority.",
    preemptive: "No (Can be implemented as preemptive)",
    advantages: ["Critical tasks run first", "Highly flexible", "Supports real-time requirements"],
    disadvantages: ["Starvation for low priority processes", "Indefinite blocking"],
    useCase: "Real-time systems and server environments with tiered services.",
    complexity: { time: "O(n log n)", space: "O(n)" },
    starvationRisk: "Very High",
    osUsage: "Used extensively in real-time operating systems (RTOS).",
    details: "Priority Scheduling allows the system designer to define which tasks are most important. To prevent starvation, techniques like 'aging' are used to gradually increase the priority of long-waiting processes."
  }
};

const EducationalCard = ({ algorithm }) => {
  const data = ALGO_DETAILS[algorithm];
  if (!data) return null;

  return (
    <div className="space-y-6">
      <motion.div
        key={algorithm}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 border-l-4 border-brand-blue relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
          <BookOpen size={160} />
        </div>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
            <Layers size={20} />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">{algorithm} Laboratory</h3>
            <p className="text-[10px] text-brand-gray font-black uppercase tracking-[0.2em]">Operating Systems Theory</p>
          </div>
        </div>

        <p className="text-sm text-brand-gray mb-8 leading-relaxed max-w-2xl italic">
          "{data.details}"
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center space-x-2 mb-2 text-brand-cyan">
              <Zap size={14} />
              <span className="text-[9px] font-black uppercase tracking-widest leading-none">Preemptive</span>
            </div>
            <span className="text-sm font-bold text-white">{data.preemptive}</span>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center space-x-2 mb-2 text-brand-blue">
              <Clock size={14} />
              <span className="text-[9px] font-black uppercase tracking-widest leading-none">Complexity</span>
            </div>
            <span className="text-sm font-bold text-white">{data.complexity.time}</span>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center space-x-2 mb-2 text-red-400">
              <AlertTriangle size={14} />
              <span className="text-[9px] font-black uppercase tracking-widest leading-none">Starvation</span>
            </div>
            <span className="text-sm font-bold text-white">{data.starvationRisk}</span>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center space-x-2 mb-2 text-green-400">
              <Terminal size={14} />
              <span className="text-[9px] font-black uppercase tracking-widest leading-none">Typical Usage</span>
            </div>
            <span className="text-xs font-bold text-white">{data.osUsage}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-green-400 uppercase tracking-widest flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span>Key Advantages</span>
            </h4>
            <ul className="space-y-3">
              {data.advantages.map((adv, i) => (
                <li key={i} className="flex items-start text-sm text-brand-gray group">
                   <div className="mr-3 mt-1 p-0.5 rounded-full bg-green-400/10 text-green-400">
                     <CheckCircle2 size={10} />
                   </div>
                   <span className="group-hover:text-white transition-colors">{adv}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-red-400 uppercase tracking-widest flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <span>Disadvantages</span>
            </h4>
            <ul className="space-y-3">
              {data.disadvantages.map((dis, i) => (
                <li key={i} className="flex items-start text-sm text-brand-gray group">
                   <div className="mr-3 mt-1 p-0.5 rounded-full bg-red-400/10 text-red-400">
                     <X size={10} />
                   </div>
                   <span className="group-hover:text-white transition-colors">{dis}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EducationalCard;
