import React from 'react';
import SectionTitle from '../components/SectionTitle';
import {
  Play,
  RotateCcw,
  StepForward,
  Settings,
  Plus,
  Download,
  Upload
} from 'lucide-react';

const Simulator = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionTitle
        title="Interactive Simulator"
        subtitle="Configure your processes and watch the scheduling algorithm in action."
        centered={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Configuration & Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* Algorithm Selection */}
          <div className="glass p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
              <Settings size={18} className="text-brand-blue" />
              <span>Algorithm</span>
            </h3>
            <div className="space-y-3">
              <select className="w-full bg-brand-navy border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-brand-blue">
                <option>First-Come, First-Served (FCFS)</option>
                <option>Shortest Job First (SJF)</option>
                <option>Shortest Remaining Time First (SRTF)</option>
                <option>Round Robin (RR)</option>
                <option>Priority Scheduling</option>
              </select>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-brand-gray">Quantum (for RR only)</p>
                <input type="number" defaultValue={2} className="w-full bg-transparent border-b border-white/10 py-1 text-sm focus:outline-none focus:border-brand-blue" />
              </div>
            </div>
          </div>

          {/* Process Input */}
          <div className="glass p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Processes</h3>
              <button className="p-1.5 bg-brand-blue/20 hover:bg-brand-blue/40 rounded-lg text-brand-blue transition-colors">
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              <div className="text-xs text-brand-gray text-center py-8">
                Add processes to begin the simulation.
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button className="flex items-center justify-center space-x-2 glass hover:bg-white/5 py-2 rounded-lg text-xs transition-colors">
                <Upload size={14} />
                <span>Import</span>
              </button>
              <button className="flex items-center justify-center space-x-2 glass hover:bg-white/5 py-2 rounded-lg text-xs transition-colors">
                <Download size={14} />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Simulation Controls */}
          <div className="glass p-6">
            <h3 className="text-lg font-bold mb-4">Controls</h3>
            <div className="flex items-center justify-between mb-4">
              <button className="p-3 bg-brand-blue hover:bg-blue-600 rounded-full text-white transition-all transform hover:scale-110">
                <Play size={20} fill="currentColor" />
              </button>
              <button className="p-3 glass hover:bg-white/10 rounded-full text-white transition-all">
                <StepForward size={20} />
              </button>
              <button className="p-3 glass hover:bg-white/10 rounded-full text-white transition-all">
                <RotateCcw size={20} />
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-brand-gray">Simulation Speed</span>
                <span>1.0x</span>
              </div>
              <input type="range" className="w-full accent-brand-blue" />
            </div>
          </div>
        </div>

        {/* Right Column - Visualizations */}
        <div className="lg:col-span-8 space-y-6">
          {/* Gantt Chart */}
          <div className="glass p-6 min-h-[200px]">
            <h3 className="text-lg font-bold mb-6">Gantt Chart</h3>
            <div className="w-full h-24 bg-white/5 rounded-lg border border-dashed border-white/10 flex items-center justify-center">
              <p className="text-brand-gray text-sm">Gantt chart visualization will appear here.</p>
            </div>
          </div>

          {/* Queues and CPU */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-6 min-h-[180px]">
              <h3 className="text-sm font-bold mb-4 text-brand-gray uppercase tracking-wider">Ready Queue</h3>
              <div className="flex space-x-2">
                <div className="w-10 h-10 border border-dashed border-white/20 rounded flex items-center justify-center text-brand-gray text-[10px]">Empty</div>
              </div>
            </div>
            <div className="glass p-6 min-h-[180px]">
              <h3 className="text-sm font-bold mb-4 text-brand-gray uppercase tracking-wider">Running Process</h3>
              <div className="h-20 flex items-center justify-center border border-dashed border-white/20 rounded">
                <p className="text-brand-gray text-xs">CPU Idle</p>
              </div>
            </div>
            <div className="glass p-6 min-h-[180px]">
              <h3 className="text-sm font-bold mb-4 text-brand-gray uppercase tracking-wider">Completed</h3>
              <div className="space-y-2">
                <div className="text-center py-4 border border-dashed border-white/20 rounded">
                  <p className="text-brand-gray text-[10px]">No processes finished</p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="glass p-6">
            <h3 className="text-lg font-bold mb-6">Simulation Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Avg. Waiting", value: "0.00ms" },
                { label: "Avg. Turnaround", value: "0.00ms" },
                { label: "Throughput", value: "0.0/s" },
                { label: "Utilization", value: "0%" }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <p className="text-brand-gray text-xs mb-1">{stat.label}</p>
                  <p className="text-xl font-bold text-brand-cyan">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
