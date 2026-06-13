/**
 * Algorithm Recommender Utility
 * Analyzes simulation results and recommends the best algorithm.
 */

export const recommender = {
  getBest: (results) => {
    if (!results || Object.keys(results).length === 0) return null;

    const algos = Object.keys(results);

    const scores = algos.map(algo => {
      const m = results[algo];
      return {
        name: algo,
        waitingScore: m.avgWaiting,
        turnaroundScore: m.avgTurnaround,
        utilScore: 100 - m.utilization,
        throughputScore: 1 / (m.throughput || 0.1)
      };
    });

    const maxWaiting = Math.max(...scores.map(s => s.waitingScore), 1);
    const maxTurnaround = Math.max(...scores.map(s => s.turnaroundScore), 1);
    const maxUtilScore = Math.max(...scores.map(s => s.utilScore), 1);
    const maxThroughputScore = Math.max(...scores.map(s => s.throughputScore), 1);

    const finalScores = scores.map(s => {
      const normalized = (s.waitingScore / maxWaiting) * 0.4 +
                         (s.turnaroundScore / maxTurnaround) * 0.3 +
                         (s.utilScore / maxUtilScore) * 0.2 +
                         (s.throughputScore / maxThroughputScore) * 0.1;
      return { name: s.name, score: normalized };
    });

    finalScores.sort((a, b) => a.score - b.score);
    const best = finalScores[0];
    const bestMetrics = results[best.name];

    let reason = "";
    if (best.name === 'SRTF' || best.name === 'SJF') {
      reason = `Recommended due to its optimal average waiting time of ${bestMetrics.avgWaiting.toFixed(2)}s and high efficiency.`;
    } else if (best.name === 'RR') {
      reason = `Recommended for its fairness and balanced response times, making it ideal for interactive workloads.`;
    } else if (best.name === 'FCFS') {
      reason = `Recommended for its simplicity and zero overhead, performing well for this specific workload.`;
    } else if (best.name === 'Priority') {
      reason = `Recommended as it successfully prioritized critical tasks while maintaining a waiting time of ${bestMetrics.avgWaiting.toFixed(2)}s.`;
    }

    return {
      name: best.name,
      reason
    };
  }
};
