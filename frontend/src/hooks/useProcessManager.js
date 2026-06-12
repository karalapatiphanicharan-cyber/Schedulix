import { useState, useEffect } from 'react';

const STORAGE_KEY = 'schedulix_processes';

const PREDEFINED_COLORS = [
  '#3b82f6', // blue-500
  '#06b6d4', // cyan-500
  '#8b5cf6', // violet-500
  '#ec4899', // pink-500
  '#f59e0b', // amber-500
  '#10b981', // emerald-500
  '#f43f5e', // rose-500
  '#6366f1', // indigo-500
];

const SAMPLE_DATASETS = {
  'Simple Example': [
    { id: 'P1', arrivalTime: 0, burstTime: 4, priority: 1, color: PREDEFINED_COLORS[0] },
    { id: 'P2', arrivalTime: 1, burstTime: 3, priority: 2, color: PREDEFINED_COLORS[1] },
    { id: 'P3', arrivalTime: 2, burstTime: 1, priority: 3, color: PREDEFINED_COLORS[2] },
  ],
  'Mixed Arrival Times': [
    { id: 'P1', arrivalTime: 0, burstTime: 8, priority: 1, color: PREDEFINED_COLORS[0] },
    { id: 'P2', arrivalTime: 5, burstTime: 2, priority: 2, color: PREDEFINED_COLORS[1] },
    { id: 'P3', arrivalTime: 1, burstTime: 6, priority: 3, color: PREDEFINED_COLORS[2] },
    { id: 'P4', arrivalTime: 6, burstTime: 4, priority: 4, color: PREDEFINED_COLORS[3] },
  ],
  'Priority Heavy': [
    { id: 'P1', arrivalTime: 0, burstTime: 5, priority: 10, color: PREDEFINED_COLORS[0] },
    { id: 'P2', arrivalTime: 0, burstTime: 4, priority: 1, color: PREDEFINED_COLORS[1] },
    { id: 'P3', arrivalTime: 0, burstTime: 2, priority: 5, color: PREDEFINED_COLORS[2] },
    { id: 'P4', arrivalTime: 0, burstTime: 1, priority: 8, color: PREDEFINED_COLORS[3] },
  ],
  'Round Robin Demo': [
    { id: 'P1', arrivalTime: 0, burstTime: 5, priority: 1, color: PREDEFINED_COLORS[0] },
    { id: 'P2', arrivalTime: 1, burstTime: 4, priority: 1, color: PREDEFINED_COLORS[1] },
    { id: 'P3', arrivalTime: 2, burstTime: 2, priority: 1, color: PREDEFINED_COLORS[2] },
    { id: 'P4', arrivalTime: 3, burstTime: 1, priority: 1, color: PREDEFINED_COLORS[3] },
  ],
};

export const useProcessManager = () => {
  const [processes, setProcesses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading processes from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(processes));
  }, [processes]);

  const validateProcess = (p) => {
    if (!p.id || typeof p.id !== 'string') return false;
    if (typeof p.arrivalTime !== 'number' || p.arrivalTime < 0) return false;
    if (typeof p.burstTime !== 'number' || p.burstTime <= 0) return false;
    if (typeof p.priority !== 'number' || p.priority < 0) return false;
    return true;
  };

  const addProcess = (process) => {
    if (!validateProcess(process)) {
      return { success: false, error: 'Invalid process data' };
    }
    if (processes.some((p) => p && p.id === process.id)) {
      return { success: false, error: 'Duplicate Process ID' };
    }
    setProcesses((prev) => [...prev, { ...process, color: process.color || PREDEFINED_COLORS[prev.length % PREDEFINED_COLORS.length] }]);
    return { success: true };
  };

  const updateProcess = (updatedProcess) => {
    if (!validateProcess(updatedProcess)) return;
    setProcesses((prev) =>
      prev.map((p) => (p && p.id === updatedProcess.id ? updatedProcess : p))
    );
  };

  const deleteProcess = (id) => {
    setProcesses((prev) => prev.filter((p) => p.id !== id));
  };

  const clearProcesses = () => {
    setProcesses([]);
  };

  const generateRandomProcesses = () => {
    const count = Math.floor(Math.random() * 4) + 5; // 5 to 8
    const newProcesses = Array.from({ length: count }, (_, i) => ({
      id: `P${i + 1}`,
      arrivalTime: Math.floor(Math.random() * 10),
      burstTime: Math.floor(Math.random() * 10) + 1,
      priority: Math.floor(Math.random() * 10),
      color: PREDEFINED_COLORS[i % PREDEFINED_COLORS.length],
    }));
    setProcesses(newProcesses);
  };

  const loadSampleDataset = (name) => {
    const dataset = SAMPLE_DATASETS[name];
    if (dataset && Array.isArray(dataset)) {
      const validDataset = dataset.filter(validateProcess);
      setProcesses(validDataset);
    }
  };

  return {
    processes,
    addProcess,
    updateProcess,
    deleteProcess,
    clearProcesses,
    generateRandomProcesses,
    loadSampleDataset,
    sampleDatasets: Object.keys(SAMPLE_DATASETS),
  };
};
