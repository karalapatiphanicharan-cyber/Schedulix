const multiCoreScheduler = require('./algorithms/multiCoreScheduler');

const processes = [
    { id: 'P1', arrivalTime: 0, burstTime: 10, priority: 1, color: '#ff0000' },
    { id: 'P2', arrivalTime: 0, burstTime: 5, priority: 2, color: '#00ff00' },
];

console.log("Testing FCFS 2 Cores...");
const fcfsResult = multiCoreScheduler(processes, 'FCFS', 2, 2);
console.log("Total Time:", fcfsResult.metrics.totalTime);
console.log("Results:", fcfsResult.results.map(r => ({ id: r.id, end: r.endTime })));

console.log("\nTesting RR 1 Core (Quantum 2)...");
const rrResult = multiCoreScheduler(processes, 'RR', 2, 1);
console.log("Total Time:", rrResult.metrics.totalTime);
// P2 arrives at 0, P1 arrives at 0. Ready queue: [P1, P2]
// Tick 0-2: P1 (rem 8)
// Tick 2-4: P2 (rem 3)
// Tick 4-6: P1 (rem 6)
// Tick 6-8: P2 (rem 1)
// Tick 8-10: P1 (rem 4)
// Tick 10-11: P2 (rem 0) -> P2 finish at 11
// Tick 11-15: P1 (rem 0) -> P1 finish at 15
console.log("Results:", rrResult.results.map(r => ({ id: r.id, end: r.endTime })));
