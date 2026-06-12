import { useState } from 'react';

export const useProcessManager = () => {
  const [processes, setProcesses] = useState([]);

  const addProcess = (process) => {
    setProcesses((prev) => [...prev, process]);
  };

  const clearProcesses = () => {
    setProcesses([]);
  };

  return {
    processes,
    addProcess,
    clearProcesses,
    sampleDatasets: ["Simple Example", "Priority Heavy", "Round Robin Demo"]
  };
};
