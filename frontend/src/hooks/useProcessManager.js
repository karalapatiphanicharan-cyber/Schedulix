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
  'Simple Example': {
    description: 'Basic introduction to sequential process arrival and execution.',
    data: [
      { id: 'P1', arrivalTime: 0, burstTime: 4, priority: 1, color: PREDEFINED_COLORS[0] },
      { id: 'P2', arrivalTime: 1, burstTime: 3, priority: 2, color: PREDEFINED_COLORS[1] },
      { id: 'P3', arrivalTime: 2, burstTime: 1, priority: 3, color: PREDEFINED_COLORS[2] },
    ]
  },
  'Mixed Arrival Times': {
    description: 'Processes arriving at different intervals, testing queue management.',
    data: [
      { id: 'P1', arrivalTime: 0, burstTime: 8, priority: 1, color: PREDEFINED_COLORS[0] },
      { id: 'P2', arrivalTime: 5, burstTime: 2, priority: 2, color: PREDEFINED_COLORS[1] },
      { id: 'P3', arrivalTime: 1, burstTime: 6, priority: 3, color: PREDEFINED_COLORS[2] },
      { id: 'P4', arrivalTime: 6, burstTime: 4, priority: 4, color: PREDEFINED_COLORS[3] },
    ]
  },
  'Priority Heavy': {
    description: 'Processes with varying importance levels to demonstrate priority-based preemption.',
    data: [
      { id: 'P1', arrivalTime: 0, burstTime: 5, priority: 10, color: PREDEFINED_COLORS[0] },
      { id: 'P2', arrivalTime: 0, burstTime: 4, priority: 1, color: PREDEFINED_COLORS[1] },
      { id: 'P3', arrivalTime: 0, burstTime: 2, priority: 5, color: PREDEFINED_COLORS[2] },
      { id: 'P4', arrivalTime: 0, burstTime: 1, priority: 8, color: PREDEFINED_COLORS[3] },
    ]
  },
  'Round Robin Demo': {
    description: 'Perfectly balanced burst times to show clean time-slicing cycles.',
    data: [
      { id: 'P1', arrivalTime: 0, burstTime: 5, priority: 1, color: PREDEFINED_COLORS[0] },
      { id: 'P2', arrivalTime: 1, burstTime: 4, priority: 1, color: PREDEFINED_COLORS[1] },
      { id: 'P3', arrivalTime: 2, burstTime: 2, priority: 1, color: PREDEFINED_COLORS[2] },
      { id: 'P4', arrivalTime: 3, burstTime: 1, priority: 1, color: PREDEFINED_COLORS[3] },
    ]
  },
  'Multi-Core Demo': {
    description: 'High volume of processes designed for parallel execution across 2-8 cores.',
    data: [
      { id: 'P1', arrivalTime: 0, burstTime: 10, priority: 1, color: PREDEFINED_COLORS[0] },
      { id: 'P2', arrivalTime: 0, burstTime: 8, priority: 2, color: PREDEFINED_COLORS[1] },
      { id: 'P3', arrivalTime: 1, burstTime: 6, priority: 3, color: PREDEFINED_COLORS[2] },
      { id: 'P4', arrivalTime: 1, burstTime: 4, priority: 4, color: PREDEFINED_COLORS[3] },
      { id: 'P5', arrivalTime: 2, burstTime: 7, priority: 1, color: PREDEFINED_COLORS[4] },
      { id: 'P6', arrivalTime: 2, burstTime: 5, priority: 2, color: PREDEFINED_COLORS[5] },
    ]
  },
  'CPU Idle Demo': {
    description: 'Large gaps between process arrivals to demonstrate CPU inactivity.',
    data: [
      { id: 'P1', arrivalTime: 0, burstTime: 3, priority: 1, color: PREDEFINED_COLORS[0] },
      { id: 'P2', arrivalTime: 8, burstTime: 4, priority: 1, color: PREDEFINED_COLORS[1] },
    ]
  },
  'Heavy Load Demo': {
    description: 'Stress test with many overlapping processes to compare algorithm efficiency under pressure.',
    data: [
      { id: 'P1', arrivalTime: 0, burstTime: 15, priority: 1, color: PREDEFINED_COLORS[0] },
      { id: 'P2', arrivalTime: 1, burstTime: 12, priority: 1, color: PREDEFINED_COLORS[1] },
      { id: 'P3', arrivalTime: 2, burstTime: 10, priority: 1, color: PREDEFINED_COLORS[2] },
      { id: 'P4', arrivalTime: 3, burstTime: 8, priority: 1, color: PREDEFINED_COLORS[3] },
      { id: 'P5', arrivalTime: 4, burstTime: 6, priority: 1, color: PREDEFINED_COLORS[4] },
      { id: 'P6', arrivalTime: 5, burstTime: 4, priority: 1, color: PREDEFINED_COLORS[5] },
      { id: 'P7', arrivalTime: 6, burstTime: 2, priority: 1, color: PREDEFINED_COLORS[6] },
      { id: 'P8', arrivalTime: 7, burstTime: 1, priority: 1, color: PREDEFINED_COLORS[7] },
    ]
  },
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
    const entry = SAMPLE_DATASETS[name];
    if (entry && entry.data && Array.isArray(entry.data)) {
      const validDataset = entry.data.filter(validateProcess);
      setProcesses(validDataset);
    }
  };

  const getDatasetDescription = (name) => {
    return SAMPLE_DATASETS[name]?.description || '';
  };

  const saveWorkspace = (name, config) => {
    const workspaces = JSON.parse(localStorage.getItem('schedulix_workspaces') || '{}');
    workspaces[name] = {
      processes,
      config,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('schedulix_workspaces', JSON.stringify(workspaces));
  };

  const loadWorkspace = (name) => {
    const workspaces = JSON.parse(localStorage.getItem('schedulix_workspaces') || '{}');
    const workspace = workspaces[name];
    if (workspace) {
      setProcesses(workspace.processes);
      return workspace.config;
    }
    return null;
  };

  const getSavedWorkspaces = () => {
    return JSON.parse(localStorage.getItem('schedulix_workspaces') || '{}');
  };

  return {
    processes,
    setProcesses,
    addProcess,
    updateProcess,
    deleteProcess,
    clearProcesses,
    generateRandomProcesses,
    loadSampleDataset,
    saveWorkspace,
    loadWorkspace,
    getSavedWorkspaces,
    getDatasetDescription,
    sampleDatasets: Object.keys(SAMPLE_DATASETS),
  };
};
