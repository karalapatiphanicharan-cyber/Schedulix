/**
 * Priority Scheduling - Non-Preemptive
 */
const solvePriority = (processes) => {
  let currentTime = 0;
  const segments = [];
  const results = [];
  let totalIdleTime = 0;
  let contextSwitches = 0;

  let remainingProcesses = [...processes].map(p => ({ ...p }));

  while (remainingProcesses.length > 0) {
    const arrivedProcesses = remainingProcesses.filter(p => p.arrivalTime <= currentTime);

    if (arrivedProcesses.length === 0) {
      const nextArrivalTime = Math.min(...remainingProcesses.map(p => p.arrivalTime));
      totalIdleTime += (nextArrivalTime - currentTime);
      segments.push({
        processId: 'IDLE',
        startTime: currentTime,
        endTime: nextArrivalTime,
        isIdle: true
      });
      currentTime = nextArrivalTime;
      continue;
    }

    // Sort by priority (lower number = higher priority)
    // If priorities are equal, use FCFS (arrival time)
    arrivedProcesses.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      return a.arrivalTime - b.arrivalTime;
    });

    const process = arrivedProcesses[0];

    const startTime = currentTime;
    const endTime = startTime + process.burstTime;

    segments.push({
      processId: process.id,
      startTime: startTime,
      endTime: endTime,
      color: process.color
    });

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
    remainingProcesses = remainingProcesses.filter(p => p.id !== process.id);

    if (remainingProcesses.length > 0) {
      contextSwitches++;
    }
  }

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

module.exports = solvePriority;
