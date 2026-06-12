import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { GitCompare, BarChart3, Activity, Layers, Download, Play, Trophy } from 'lucide-react';

const Compare = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <SectionTitle
        title="Algorithm Comparison"
        subtitle="Benchmark multiple scheduling strategies against the same workload. (Static Preview)"
        centered={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Configuration Placeholder */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
              <GitCompare size={18} className="text-brand-blue" />
              <span>Setup Comparison</span>
            </h3>

            <div className="space-y-6 opacity-50 pointer-events-none">
              <div>
                <p className="text-[10px] font-black text-brand-gray uppercase tracking-widest mb-3">Select Algorithms</p>
                <div className="grid grid-cols-2 gap-2">
                   {['FCFS', 'SJF', 'SRTF', 'RR'].map(algo => (
                     <div key={algo} className="p-2 border border-white/10 rounded-lg text-xs font-bold text-brand-gray">
                        {algo}
                     </div>
                   ))}
                </div>
              </div>
              <button className="w-full py-4 bg-brand-blue/20 text-brand-blue font-black uppercase tracking-widest text-xs rounded-xl">
                 Execute Comparison
              </button>
            </div>
          </div>

          <div className="glass p-6 border-dashed border-white/10">
             <div className="flex flex-col items-center justify-center py-8 text-center">
                <Layers className="text-brand-gray/20 mb-3" size={32} />
                <p className="text-xs text-brand-gray">Comparison presets will be available in Phase 3.</p>
             </div>
          </div>
        </div>

        {/* Right: Results Placeholder */}
        <div className="lg:col-span-8 space-y-8">
           {/* Static Recommendation Placeholder */}
           <div className="glass border-l-4 border-brand-blue/30 p-6 bg-brand-blue/5">
              <div className="flex items-start space-x-4">
                 <div className="p-3 bg-brand-blue/20 rounded-2xl text-brand-blue">
                    <Trophy size={24} />
                 </div>
                 <div>
                    <h4 className="text-lg font-bold text-white mb-1">Performance Leaderboard</h4>
                    <p className="text-xs text-brand-gray leading-relaxed">
                       Once algorithms are executed, this section will highlight the most efficient strategy for your specific workload based on waiting time and throughput.
                    </p>
                 </div>
              </div>
           </div>

           {/* Metrics Table Placeholder */}
           <div className="glass overflow-hidden">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BarChart3 size={18} className="text-brand-blue" />
                  <h3 className="font-bold">Comparative Metrics</h3>
                </div>
              </div>
              <div className="p-12 text-center bg-white/[0.02]">
                 <Activity size={40} className="mx-auto mb-4 text-brand-gray/10" />
                 <p className="text-sm text-brand-gray">Execute a comparison to see data analytics.</p>
              </div>
           </div>

           {/* Chart Placeholders */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass p-6 h-48 flex items-center justify-center border-dashed border-white/10">
                 <span className="text-[10px] font-black text-brand-gray uppercase tracking-widest opacity-30">Avg. Waiting Time Chart</span>
              </div>
              <div className="glass p-6 h-48 flex items-center justify-center border-dashed border-white/10">
                 <span className="text-[10px] font-black text-brand-gray uppercase tracking-widest opacity-30">CPU Utilization Chart</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;
