export const calculateAverages = (results) => {
  if (!results || results.length === 0) {
    return { avgWaiting: 0, avgTurnaround: 0, avgResponse: 0 };
  }
  const avgWaiting = results.reduce((acc, r) => acc + (r.waitingTime || 0), 0) / results.length;
  const avgTurnaround = results.reduce((acc, r) => acc + (r.turnaroundTime || 0), 0) / results.length;
  const avgResponse = results.reduce((acc, r) => acc + (r.responseTime || 0), 0) / results.length;
  return { avgWaiting, avgTurnaround, avgResponse };
};

export const calculateThroughput = (count, totalTime) => {
  if (!totalTime || totalTime <= 0) return 0;
  return count / totalTime;
};

export const calculateUtilization = (totalTime, idleTime) => {
  if (!totalTime || totalTime <= 0) return 0;
  return Math.max(0, Math.min(100, ((totalTime - (idleTime || 0)) / totalTime) * 100));
};

export const getContextSwitches = (metrics) => {
  return metrics?.contextSwitches || 0;
};

export const getTotalTime = (metrics) => {
  return metrics?.totalTime || 0;
};
