import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { BarChart3, Info, GitCompare } from 'lucide-react';

const Compare = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionTitle
        title="Algorithm Comparison"
        subtitle="Analyze and compare performance across different scheduling strategies."
        centered={false}
      />

      <div className="space-y-8">
        {/* Selection & Info */}
        <div className="glass p-8 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="max-w-md">
            <h3 className="text-xl font-bold mb-2 flex items-center space-x-2">
              <GitCompare className="text-brand-blue" />
              <span>Side-by-Side Analysis</span>
            </h3>
            <p className="text-brand-gray text-sm">
              Select multiple algorithms to run against the same process workload.
              Visualize efficiency gaps and performance trade-offs in real-time.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {['FCFS', 'SJF', 'SRTF', 'RR', 'Priority'].map(algo => (
              <label key={algo} className="flex items-center space-x-2 glass px-4 py-2 rounded-full cursor-pointer hover:bg-white/5 transition-colors">
                <input type="checkbox" className="accent-brand-blue" />
                <span className="text-sm">{algo}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Waiting Time", metric: "Lower is better", color: "text-brand-blue" },
            { title: "Turnaround Time", metric: "Lower is better", color: "text-brand-cyan" },
            { title: "CPU Utilization", metric: "Higher is better", color: "text-green-400" }
          ].map((card, i) => (
            <div key={i} className="glass p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold">{card.title}</h4>
                <Info size={14} className="text-brand-gray" />
              </div>
              <div className="h-32 flex items-center justify-center border border-dashed border-white/10 rounded-lg">
                <p className="text-brand-gray text-xs">Comparison Chart</p>
              </div>
              <p className={`text-[10px] uppercase tracking-widest mt-4 ${card.color} font-bold`}>{card.metric}</p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="glass overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center space-x-2">
            <BarChart3 size={18} className="text-brand-blue" />
            <h3 className="font-bold">Metrics Summary Table</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-xs text-brand-gray uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Algorithm</th>
                  <th className="px-6 py-4">Avg. Waiting</th>
                  <th className="px-6 py-4">Avg. Turnaround</th>
                  <th className="px-6 py-4">Throughput</th>
                  <th className="px-6 py-4">Efficiency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[1, 2, 3].map(i => (
                  <tr key={i} className="hover:bg-white/[0.02]">
                    <td className="px-6 py-4 text-brand-gray italic">---</td>
                    <td className="px-6 py-4 text-brand-gray italic">---</td>
                    <td className="px-6 py-4 text-brand-gray italic">---</td>
                    <td className="px-6 py-4 text-brand-gray italic">---</td>
                    <td className="px-6 py-4 text-brand-gray italic">---</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-12 text-center text-brand-gray text-sm">
            Run a comparison to see detailed results.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;
