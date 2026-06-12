/**
 * First Come First Served (FCFS) Scheduling Algorithm
 */
const solveFCFS = (processes) => {
  // Sort processes by arrival time
  const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);

  let currentTime = 0;
  const segments = [];
  const results = [];
  let totalIdleTime = 0;
  let contextSwitches = 0;

  sortedProcesses.forEach((process, index) => {
    // If CPU is idle before this process arrives
    if (currentTime < process.arrivalTime) {
      totalIdleTime += (process.arrivalTime - currentTime);
      segments.push({
        processId: 'IDLE',
        startTime: currentTime,
        endTime: process.arrivalTime,
        isIdle: true
      });
      currentTime = process.arrivalTime;
    }

    const startTime = currentTime;
    const endTime = startTime + process.burstTime;

    // Add segment to timeline
    segments.push({
      processId: process.id,
      startTime: startTime,
      endTime: endTime,
      color: process.color
    });

    // Calculate metrics
    const turnaroundTime = endTime - process.arrivalTime;
    const waitingTime = turnaroundTime - process.burstTime;
    const responseTime = startTime - process.arrivalTime;

    results.push({
      ...process,
      startTime,
      endTime,
      turnaroundTime,
      waitingTime,
      responseTime
    });

    currentTime = endTime;

    // Context switch happens if there's another process after this one
    if (index < sortedProcesses.length - 1) {
      contextSwitches++;
    }
  });

  return {
    segments,
    results,
    metrics: {
      totalTime: currentTime,
      idleTime: totalIdleTime,
      contextSwitches
    }
  };
};

module.exports = solveFCFS;
