import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { BarChart3, Info, GitCompare, Play, RotateCcw, Cpu, Trash2, Trophy, FileJson, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProcessManager } from '../hooks/useProcessManager';
import ComparisonCharts from '../components/simulator/ComparisonCharts';
import { recommender } from '../utils/recommender';

const Compare = () => {
  const { processes, sampleDatasets, loadSampleDataset } = useProcessManager();
  const [selectedAlgorithms, setSelectedAlgorithms] = useState(['FCFS', 'SJF', 'SRTF', 'RR', 'Priority']);
  const [numCores, setNumCores] = useState(1);
  const [quantum, setQuantum] = useState(2);
  const [comparisonResults, setComparisonResults] = useState(null);
  const [isComparing, setIsComparing] = useState(false);

  const handleAlgorithmToggle = (algo) => {
    setSelectedAlgorithms(prev =>
      prev.includes(algo)
        ? prev.filter(a => a !== algo)
        : [...prev, algo]
    );
  };

  const runComparison = async () => {
    if (processes.length === 0) return;
    setIsComparing(true);
    const results = {};

    try {
      for (const algo of selectedAlgorithms) {
        const response = await fetch('http://localhost:5000/api/simulate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            processes,
            algorithm: algo,
            quantum,
            numCores
          })
        });
        const data = await response.json();
        results[algo] = {
          metrics: data.metrics,
          avgWaiting: data.results.reduce((acc, r) => acc + r.waitingTime, 0) / data.results.length,
          avgTurnaround: data.results.reduce((acc, r) => acc + r.turnaroundTime, 0) / data.results.length,
          avgResponse: data.results.reduce((acc, r) => acc + r.responseTime, 0) / data.results.length,
          throughput: data.results.length / data.metrics.totalTime,
          utilization: data.metrics.overallUtilization || (((data.metrics.totalTime - data.metrics.idleTime) / data.metrics.totalTime) * 100),
          contextSwitches: data.metrics.contextSwitches,
          completionTime: data.metrics.totalTime
        };
      }
      setComparisonResults(results);
    } catch (error) {
      console.error('Comparison error:', error);
    } finally {
      setIsComparing(false);
    }
  };

  const clearResults = () => {
    setComparisonResults(null);
  };

  const bestAlgorithm = comparisonResults ? recommender.getBest(comparisonResults) : null;

  const exportComparisonCSV = () => {
    if (!comparisonResults) return;
    const headers = ['Algorithm', 'Avg Waiting', 'Avg Turnaround', 'Avg Response', 'Utilization', 'Context Switches', 'Throughput'];
    const rows = Object.entries(comparisonResults).map(([algo, m]) => [
      algo,
      m.avgWaiting.toFixed(2),
      m.avgTurnaround.toFixed(2),
      m.avgResponse.toFixed(2),
      m.utilization.toFixed(2) + '%',
      m.contextSwitches,
      m.throughput.toFixed(2)
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `schedulix_comparison.csv`;
    link.click();
  };

  const exportComparisonJSON = () => {
    if (!comparisonResults) return;
    const blob = new Blob([JSON.stringify(comparisonResults, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `schedulix_comparison.json`;
    link.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <SectionTitle
        title="Algorithm Comparison"
        subtitle="Analyze and compare performance across different scheduling strategies."
        centered={false}
      />

      <div className="space-y-8">
        <div className="glass p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4">
            <h3 className="text-lg font-bold mb-2 flex items-center space-x-2">
              <GitCompare className="text-brand-blue" />
              <span>Comparison Settings</span>
            </h3>
            <p className="text-brand-gray text-[10px] uppercase tracking-widest font-black opacity-50">
              {processes.length} Processes loaded
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-wrap gap-4 items-center">
            <div className="flex flex-col space-y-2">
              <span className="text-[10px] font-black text-brand-gray uppercase tracking-widest">Select Algorithms</span>
              <div className="flex flex-wrap gap-2">
                {['FCFS', 'SJF', 'SRTF', 'RR', 'Priority'].map(algo => (
                  <button
                    key={algo}
                    onClick={() => handleAlgorithmToggle(algo)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                      selectedAlgorithms.includes(algo)
                        ? 'bg-brand-blue/20 border-brand-blue text-brand-blue'
                        : 'bg-white/5 border-white/5 text-brand-gray hover:border-white/20'
                    }`}
                  >
                    {algo}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <span className="text-[10px] font-black text-brand-gray uppercase tracking-widest">CPU Cores</span>
              <div className="flex items-center space-x-1">
                {[1, 2, 4, 8].map(count => (
                  <button
                    key={count}
                    onClick={() => setNumCores(count)}
                    className={`w-8 h-8 rounded-lg text-[10px] font-bold transition-all ${
                      numCores === count
                        ? 'bg-brand-cyan text-brand-navy shadow-lg shadow-brand-cyan/20'
                        : 'bg-white/5 text-brand-gray hover:bg-white/10'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            {selectedAlgorithms.includes('RR') && (
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-black text-brand-gray uppercase tracking-widest">RR Quantum</span>
                <input
                  type="number"
                  value={quantum}
                  onChange={(e) => setQuantum(parseInt(e.target.value) || 1)}
                  className="w-16 bg-brand-navy border border-white/10 rounded-lg px-2 py-1.5 text-xs font-mono focus:ring-1 focus:ring-brand-blue"
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-3 flex space-x-2">
            <button
              onClick={runComparison}
              disabled={isComparing || processes.length === 0}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-black uppercase tracking-widest transition-all ${
                isComparing || processes.length === 0
                  ? 'bg-white/5 text-brand-gray cursor-not-allowed'
                  : 'bg-brand-blue hover:bg-blue-600 text-white shadow-lg shadow-brand-blue/20'
              }`}
            >
              {isComparing ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Play size={16} />
              )}
              <span>{isComparing ? 'Running...' : 'Compare'}</span>
            </button>
            {comparisonResults && (
              <button
                onClick={clearResults}
                className="p-3 glass hover:bg-red-500/10 text-brand-gray hover:text-red-400 rounded-xl transition-all"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {comparisonResults ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {bestAlgorithm && (
                <div className="glass p-6 border-l-4 border-yellow-400 bg-yellow-400/5">
                  <div className="flex items-center space-x-2 mb-2 text-yellow-400">
                    <Trophy size={18} />
                    <h4 className="font-black uppercase tracking-widest text-xs text-yellow-500">Best Performing Algorithm</h4>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className="text-2xl font-black text-white">{bestAlgorithm.name}</span>
                      <p className="text-sm text-brand-gray mt-1">{bestAlgorithm.reason}</p>
                    </div>
                  </div>
                </div>
              )}

              <ComparisonCharts results={comparisonResults} />

              <div className="glass overflow-hidden">
                <div className="p-6 border-b border-white/10 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 size={18} className="text-brand-blue" />
                    <h3 className="font-bold">Detailed Metrics Comparison</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={exportComparisonCSV} className="flex items-center space-x-1 px-3 py-1.5 glass hover:bg-white/10 rounded-lg text-[10px] font-bold text-brand-gray transition-all">
                      <FileText size={12} />
                      <span>CSV</span>
                    </button>
                    <button onClick={exportComparisonJSON} className="flex items-center space-x-1 px-3 py-1.5 glass hover:bg-white/10 rounded-lg text-[10px] font-bold text-brand-gray transition-all">
                      <FileJson size={12} />
                      <span>JSON</span>
                    </button>
                    <div className="w-[1px] h-4 bg-white/10 mx-2" />
                    <span className="text-[10px] text-brand-gray font-bold uppercase tracking-widest opacity-50">
                      Lower is better for WT/TAT/RT
                    </span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] text-brand-gray font-black uppercase tracking-widest">
                      <tr>
                        <th className="px-6 py-5">Algorithm</th>
                        <th className="px-6 py-5">Avg. Waiting</th>
                        <th className="px-6 py-5">Avg. Turnaround</th>
                        <th className="px-6 py-5">Avg. Response</th>
                        <th className="px-6 py-5">CPU Utilization</th>
                        <th className="px-6 py-5">Context Switches</th>
                        <th className="px-6 py-5">Throughput</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {Object.entries(comparisonResults).map(([algo, metrics]) => (
                        <tr key={algo} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-6 py-4">
                            <span className="text-sm font-black text-white flex items-center space-x-2">
                              {algo === bestAlgorithm?.name && <Trophy size={12} className="text-yellow-400" />}
                              <span>{algo}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 font-mono text-xs">{metrics.avgWaiting.toFixed(2)}s</td>
                          <td className="px-6 py-4 font-mono text-xs">{metrics.avgTurnaround.toFixed(2)}s</td>
                          <td className="px-6 py-4 font-mono text-xs">{metrics.avgResponse.toFixed(2)}s</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-blue" style={{ width: `${metrics.utilization}%` }} />
                              </div>
                              <span className="text-xs font-mono font-bold text-brand-gray">{metrics.utilization.toFixed(1)}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-mono text-xs">{metrics.contextSwitches}</td>
                          <td className="px-6 py-4 font-mono text-xs">{metrics.throughput.toFixed(2)} p/s</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="glass p-20 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center">
                <GitCompare size={32} className="text-brand-gray/20" />
              </div>
              <div className="max-w-xs">
                <h4 className="text-lg font-bold mb-2">Ready to Compare?</h4>
                <p className="text-sm text-brand-gray">
                  {processes.length === 0
                    ? "Add some processes first using the Interactive Simulator or load a sample dataset below."
                    : "Select your desired algorithms and core count, then hit the compare button to see the results."
                  }
                </p>
              </div>
              {processes.length === 0 && (
                <div className="flex flex-wrap gap-2 justify-center pt-4">
                  {sampleDatasets.map(name => (
                    <button
                      key={name}
                      onClick={() => loadSampleDataset(name)}
                      className="px-4 py-2 glass hover:bg-white/10 rounded-full text-[10px] font-bold text-brand-gray transition-all"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Compare;
