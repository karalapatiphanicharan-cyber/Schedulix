/**
 * Shortest Remaining Time First (SRTF) - Preemptive SJF
 */
const solveSRTF = (processes) => {
  let currentTime = 0;
  const segments = [];
  const results = [];
  let totalIdleTime = 0;
  let contextSwitches = 0;

  let remainingProcesses = processes.map(p => ({
    ...p,
    remainingTime: p.burstTime,
    startTime: -1,
    endTime: -1
  }));

  let lastProcessId = null;

  while (remainingProcesses.some(p => p.remainingTime > 0)) {
    const arrivedProcesses = remainingProcesses.filter(
      p => p.arrivalTime <= currentTime && p.remainingTime > 0
    );

    if (arrivedProcesses.length === 0) {
      const nextArrival = Math.min(...remainingProcesses.filter(p => p.remainingTime > 0).map(p => p.arrivalTime));

      if (lastProcessId === 'IDLE') {
        segments[segments.length - 1].endTime = nextArrival;
      } else {
        segments.push({
          processId: 'IDLE',
          startTime: currentTime,
          endTime: nextArrival,
          isIdle: true
        });
      }

      totalIdleTime += (nextArrival - currentTime);
      currentTime = nextArrival;
      lastProcessId = 'IDLE';
      continue;
    }

    // Sort by remaining time
    arrivedProcesses.sort((a, b) => {
      if (a.remainingTime !== b.remainingTime) {
        return a.remainingTime - b.remainingTime;
      }
      return a.arrivalTime - b.arrivalTime;
    });

    const process = arrivedProcesses[0];

    // Set first start time if not set
    if (process.startTime === -1) {
      process.startTime = currentTime;
    }

    // Determine how long to run: until next arrival or until finished
    const otherProcesses = remainingProcesses.filter(p => p.id !== process.id && p.remainingTime > 0 && p.arrivalTime > currentTime);
    const nextArrival = otherProcesses.length > 0 ? Math.min(...otherProcesses.map(p => p.arrivalTime)) : Infinity;

    const runTime = Math.min(process.remainingTime, nextArrival - currentTime, 1); // Step by 1 for simplicity in preemptive logic

    if (lastProcessId === process.id) {
      segments[segments.length - 1].endTime += runTime;
    } else {
      if (lastProcessId !== null && lastProcessId !== 'IDLE') {
        contextSwitches++;
      }
      segments.push({
        processId: process.id,
        startTime: currentTime,
        endTime: currentTime + runTime,
        color: process.color
      });
    }

    process.remainingTime -= runTime;
    currentTime += runTime;
    lastProcessId = process.id;

    if (process.remainingTime === 0) {
      process.endTime = currentTime;

      const turnaroundTime = process.endTime - process.arrivalTime;
      const waitingTime = turnaroundTime - process.burstTime;
      const responseTime = process.startTime - process.arrivalTime;

      results.push({
        ...process,
        turnaroundTime,
        waitingTime,
        responseTime
      });
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

module.exports = solveSRTF;
