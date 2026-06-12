/**
 * Round Robin (RR) Scheduling Algorithm
 */
const solveRoundRobin = (processes, quantum) => {
  let currentTime = 0;
  const segments = [];
  const results = [];
  let totalIdleTime = 0;
  let contextSwitches = 0;

  let remainingProcesses = processes.map(p => ({
    ...p,
    remainingTime: p.burstTime,
    startTime: -1,
    endTime: -1,
    lastTime: -1 // when it last left the CPU
  })).sort((a, b) => a.arrivalTime - b.arrivalTime);

  const readyQueue = [];
  let lastProcessId = null;
  let processesInQueue = new Set();

  // Helper to add arrived processes to the queue
  const updateQueue = () => {
    remainingProcesses.forEach(p => {
      if (p.arrivalTime <= currentTime && p.remainingTime > 0 && !processesInQueue.has(p.id) && !readyQueue.find(qp => qp.id === p.id)) {
        readyQueue.push(p);
        processesInQueue.add(p.id);
      }
    });
  };

  while (remainingProcesses.some(p => p.remainingTime > 0)) {
    updateQueue();

    if (readyQueue.length === 0) {
      const nextArrival = Math.min(...remainingProcesses.filter(p => p.remainingTime > 0).map(p => p.arrivalTime));

      segments.push({
        processId: 'IDLE',
        startTime: currentTime,
        endTime: nextArrival,
        isIdle: true
      });

      totalIdleTime += (nextArrival - currentTime);
      currentTime = nextArrival;
      lastProcessId = 'IDLE';
      continue;
    }

    const process = readyQueue.shift();
    processesInQueue.delete(process.id);

    if (process.startTime === -1) {
      process.startTime = currentTime;
    }

    const runTime = Math.min(process.remainingTime, quantum);

    if (lastProcessId !== null && lastProcessId !== process.id && lastProcessId !== 'IDLE') {
      contextSwitches++;
    }

    segments.push({
      processId: process.id,
      startTime: currentTime,
      endTime: currentTime + runTime,
      color: process.color
    });

    currentTime += runTime;
    process.remainingTime -= runTime;
    lastProcessId = process.id;

    // Check for new arrivals while process was running
    // They should enter the queue BEFORE the current process re-enters (standard RR behavior)
    updateQueue();

    if (process.remainingTime > 0) {
      readyQueue.push(process);
      processesInQueue.add(process.id);
    } else {
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

module.exports = solveRoundRobin;
