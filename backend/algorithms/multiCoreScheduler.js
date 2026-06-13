/**
 * Multi-Core CPU Scheduler
 * Distributes processes across multiple cores based on the selected algorithm.
 */

const multiCoreScheduler = (processes, algorithm, quantum, numCores) => {
  let currentTime = 0;
  const coreSegments = Array.from({ length: numCores }, () => []);
  const results = [];
  let contextSwitches = 0;

  // Initialize processes
  let remainingProcesses = processes.map(p => ({
    ...p,
    remainingTime: p.burstTime,
    startTime: -1,
    endTime: -1,
    lastCore: -1
  }));

  const readyQueue = [];
  const activeProcesses = Array(numCores).fill(null); // Which process is on which core

  // Helper to get available cores
  const getAvailableCores = () => {
    const available = [];
    for (let i = 0; i < numCores; i++) {
      if (!activeProcesses[i]) available.push(i);
    }
    return available;
  };

  // Main simulation loop
  while (remainingProcesses.some(p => p.remainingTime > 0) || readyQueue.length > 0 || activeProcesses.some(p => p !== null)) {
    // 1. Add arriving processes to ready queue
    const arrived = remainingProcesses.filter(p => p.arrivalTime === currentTime && p.remainingTime === p.burstTime && !readyQueue.find(rq => rq.id === p.id));
    arrived.sort((a, b) => a.id.localeCompare(b.id)); // Stable tie-break
    arrived.forEach(p => readyQueue.push(p));

    // 2. Preemption Logic
    if (algorithm === 'SRTF' || (algorithm === 'Priority' && processes.some(p => p.preemptive))) {
        // Preemption check: see if top of ready queue is better than any running process
        // For multi-core, we might need to preempt multiple processes

        let needsReassign = false;
        for (let i = 0; i < numCores; i++) {
            if (activeProcesses[i]) {
                const running = activeProcesses[i];

                // Sort ready queue for comparison
                if (algorithm === 'SRTF') {
                    readyQueue.sort((a, b) => a.remainingTime - b.remainingTime || a.arrivalTime - b.arrivalTime);
                } else {
                    readyQueue.sort((a, b) => a.priority - b.priority || a.arrivalTime - b.arrivalTime);
                }

                if (readyQueue.length > 0) {
                    const candidate = readyQueue[0];
                    const isBetter = algorithm === 'SRTF'
                        ? candidate.remainingTime < running.remainingTime
                        : candidate.priority < running.priority;

                    if (isBetter) {
                        const preempted = { ...running };
                        delete preempted.currentRunStartTime;
                        delete preempted.quantumUsed;
                        readyQueue.push(preempted);
                        activeProcesses[i] = null;
                        contextSwitches++;
                        needsReassign = true;
                    }
                }
            }
        }
    }

    // 3. Assign processes to available cores
    let availableCores = getAvailableCores();

    // Sort ready queue based on algorithm if not already sorted by preemption
    if (algorithm === 'SJF' || algorithm === 'SRTF') {
      readyQueue.sort((a, b) => a.remainingTime - b.remainingTime || a.arrivalTime - b.arrivalTime);
    } else if (algorithm === 'Priority') {
      readyQueue.sort((a, b) => a.priority - b.priority || a.arrivalTime - b.arrivalTime);
    } else {
      // FCFS or RR - DO NOT SORT by arrival time every tick!
      // New arrivals were already pushed to the end of the queue.
    }

    while (availableCores.length > 0 && readyQueue.length > 0) {
      const coreIndex = availableCores.shift();
      const process = readyQueue.shift();

      if (process.startTime === -1) {
        process.startTime = currentTime;
      }

      if (process.lastCore !== -1 && process.lastCore !== coreIndex) {
          contextSwitches++;
      } else if (activeProcesses[coreIndex] === null && coreSegments[coreIndex].length > 0) {
          const lastSeg = coreSegments[coreIndex][coreSegments[coreIndex].length - 1];
          if (lastSeg.processId !== process.id && !lastSeg.isIdle) {
              contextSwitches++;
          }
      }

      activeProcesses[coreIndex] = {
          ...process,
          currentRunStartTime: currentTime,
          quantumUsed: 0
      };

      coreSegments[coreIndex].push({
        processId: process.id,
        startTime: currentTime,
        endTime: currentTime, // Will be updated
        color: process.color
      });
    }

    // 4. Handle Idle segments
    for (let i = 0; i < numCores; i++) {
        if (activeProcesses[i] === null) {
            if (coreSegments[i].length === 0 || !coreSegments[i][coreSegments[i].length - 1].isIdle) {
                coreSegments[i].push({
                    processId: 'IDLE',
                    startTime: currentTime,
                    endTime: currentTime + 1,
                    isIdle: true
                });
            } else {
                coreSegments[i][coreSegments[i].length - 1].endTime = currentTime + 1;
            }
        }
    }

    // 5. Advance time by 1 tick
    currentTime++;

    // 6. Update active processes
    for (let i = 0; i < numCores; i++) {
      if (activeProcesses[i]) {
        const p = activeProcesses[i];
        p.remainingTime--;
        p.quantumUsed++;

        coreSegments[i][coreSegments[i].length - 1].endTime = currentTime;

        if (p.remainingTime === 0) {
          const originalProcess = remainingProcesses.find(rp => rp.id === p.id);
          originalProcess.remainingTime = 0;
          originalProcess.endTime = currentTime;

          const turnaroundTime = originalProcess.endTime - originalProcess.arrivalTime;
          const waitingTime = turnaroundTime - originalProcess.burstTime;
          const responseTime = originalProcess.startTime - originalProcess.arrivalTime;

          results.push({
            ...originalProcess,
            turnaroundTime,
            waitingTime,
            responseTime
          });

          activeProcesses[i] = null;
        } else if (algorithm === 'RR' && p.quantumUsed >= quantum) {
          const originalProcess = remainingProcesses.find(rp => rp.id === p.id);
          originalProcess.remainingTime = p.remainingTime;
          originalProcess.startTime = p.startTime;
          originalProcess.lastCore = i;

          // Move to back of ready queue
          readyQueue.push(originalProcess);
          activeProcesses[i] = null;
          contextSwitches++;
        } else {
            const originalProcess = remainingProcesses.find(rp => rp.id === p.id);
            originalProcess.remainingTime = p.remainingTime;
            originalProcess.startTime = p.startTime;
            originalProcess.lastCore = i;
        }
      }
    }

    if (currentTime > 10000) break;
  }

  const totalIdleTime = coreSegments.reduce((acc, segments) => {
    return acc + segments.filter(s => s.isIdle).reduce((sAcc, s) => sAcc + (s.endTime - s.startTime), 0);
  }, 0);

  const coreUtilization = coreSegments.map(segments => {
    const idleTime = segments.filter(s => s.isIdle).reduce((acc, s) => acc + (s.endTime - s.startTime), 0);
    return ((currentTime - idleTime) / currentTime) * 100;
  });

  return {
    segments: coreSegments,
    results,
    metrics: {
      totalTime: currentTime,
      idleTime: totalIdleTime,
      contextSwitches,
      coreUtilization,
      overallUtilization: coreUtilization.reduce((a, b) => a + b, 0) / numCores
    }
  };
};

module.exports = multiCoreScheduler;
