import React from 'react';

const StatisticsPanel = ({ results, metrics, playbackState }) => {
  const isSimulationStarted = playbackState !== 'idle';

  const stats = [
    { label: "Avg. Waiting", value: "—", unit: "ms" },
    { label: "Avg. Turnaround", value: "—", unit: "ms" },
    { label: "Throughput", value: "—", unit: "p/s" },
    { label: "Utilization", value: "Run simulation", unit: "%" }
  ];

  if (isSimulationStarted && results && metrics) {
    const avgWaiting = results.reduce((acc, r) => acc + r.waitingTime, 0) / results.length;
    const avgTurnaround = results.reduce((acc, r) => acc + r.turnaroundTime, 0) / results.length;
    const throughput = results.length / metrics.totalTime;
    const utilization = ((metrics.totalTime - metrics.idleTime) / metrics.totalTime) * 100;

    stats[0].value = avgWaiting.toFixed(2);
    stats[1].value = avgTurnaround.toFixed(2);
    stats[2].value = throughput.toFixed(2);
    stats[3].value = utilization.toFixed(2);
  }

  return (
    <div className="glass p-6">
      <h3 className="text-lg font-bold mb-6">Simulation Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5">
            <p className="text-brand-gray text-xs mb-1">{stat.label}</p>
            <p className={`font-bold text-brand-cyan ${stat.value === 'Run simulation' ? 'text-sm' : 'text-xl'}`}>
              {stat.value}
              {stat.unit && stat.value !== '—' && stat.value !== 'Run simulation' && (
                <span className="text-[10px] ml-1 opacity-50">{stat.unit}</span>
              )}
            </p>
          </div>
        ))}
      </div>

      {isSimulationStarted && metrics && (
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-brand-gray uppercase tracking-widest">
          <span>Context Switches: <span className="text-white font-bold">{metrics.contextSwitches}</span></span>
          <span>Total Time: <span className="text-white font-bold">{metrics.totalTime.toFixed(1)}s</span></span>
        </div>
      )}
    </div>
  );
};

export default StatisticsPanel;
