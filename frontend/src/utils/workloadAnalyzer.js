/**
 * Workload Analyzer Utility
 * Classifies process workloads and provides recommendations.
 */

export const workloadAnalyzer = {
  analyze: (processes) => {
    if (!processes || processes.length === 0) return null;

    const count = processes.length;
    const avgBurst = processes.reduce((acc, p) => acc + p.burstTime, 0) / count;
    const burstVariance = processes.reduce((acc, p) => acc + Math.pow(p.burstTime - avgBurst, 2), 0) / count;
    const avgArrivalInterval = count > 1
      ? (Math.max(...processes.map(p => p.arrivalTime)) - Math.min(...processes.map(p => p.arrivalTime))) / (count - 1)
      : 0;

    const maxBurst = Math.max(...processes.map(p => p.burstTime));

    const characteristics = [];
    let classification = "Mixed Workload";
    let recommendation = "Round Robin";

    if (avgBurst > 10) {
      characteristics.push("CPU-bound (Long Bursts)");
      classification = "Heavy Workload";
      recommendation = "SRTF or multi-core FCFS";
    } else if (avgBurst < 3) {
      characteristics.push("I/O-bound (Short Bursts)");
      classification = "Light/Interactive Workload";
      recommendation = "Round Robin or SJF";
    }

    if (burstVariance > 15) {
      characteristics.push("High Burst Variation");
      classification = "Diverse Workload";
      recommendation = "SRTF or Priority";
    } else if (count > 1 && burstVariance < 2) {
      characteristics.push("Uniform Bursts");
      recommendation = "FCFS or Round Robin";
    }

    if (avgArrivalInterval < 1 && count > 5) {
      characteristics.push("High Contention (Frequent Arrivals)");
    }

    if (maxBurst > avgBurst * 3) {
      characteristics.push("Contains very long jobs");
    }

    if (count > 10 && avgBurst > 5) {
      recommendation = "Multi-core SRTF or SJF for optimal throughput.";
    } else if (avgBurst < 4 && avgArrivalInterval < 2) {
      recommendation = "Round Robin with a small quantum (2-3s) for responsiveness.";
    } else if (burstVariance > 20) {
      recommendation = "SRTF to minimize average waiting time despite variance.";
    }

    return {
      classification,
      characteristics,
      recommendation,
      metrics: {
        avgBurst,
        burstVariance,
        avgArrivalInterval
      }
    };
  }
};
