import { useState, useEffect, useRef, useCallback } from 'react';

const HISTORY_STORAGE_KEY = 'schedulix_simulation_history';

export const useSimulation = () => {
  const [playbackState, setPlaybackState] = useState('idle'); // idle, running, paused, finished
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [schedule, setSchedule] = useState(null);
  const [results, setResults] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);
  const [numCores, setNumCores] = useState(1);
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const requestRef = useRef();
  const previousTimeRef = useRef();

  const stopSimulation = useCallback(() => {
    setPlaybackState('idle');
    setCurrentTime(0);
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    previousTimeRef.current = undefined;
  }, []);

  const resetSimulation = useCallback(() => {
    stopSimulation();
    setSchedule(null);
    setResults(null);
    setMetrics(null);
    setError(null);
  }, [stopSimulation]);

  const animate = useCallback((time) => {
    if (playbackState !== 'running') return;

    if (previousTimeRef.current !== undefined) {
      const deltaTime = (time - previousTimeRef.current) / 1000;
      const nextTime = currentTime + deltaTime * playbackSpeed;

      const totalTime = schedule?.metrics?.totalTime ?? 0;
      if (nextTime >= totalTime) {
        setCurrentTime(totalTime);
        setPlaybackState('finished');
        return;
      }

      setCurrentTime(nextTime);
    }

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [playbackState, currentTime, schedule, playbackSpeed]);

  useEffect(() => {
    if (playbackState === 'running') {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current);
      previousTimeRef.current = undefined;
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [playbackState, animate]);

  useEffect(() => {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const runSimulation = async (processes, algorithm, quantum, cores = numCores) => {
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ processes, algorithm, quantum, numCores: cores })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch simulation');
      }

      const data = await response.json();
      setSchedule(data);
      setResults(data.results);
      setMetrics(data.metrics);
      setCurrentTime(0);
      setPlaybackState('running');

      const historyEntry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        algorithm,
        numCores: cores,
        processCount: processes.length,
        metrics: data.metrics,
        processes: processes,
        quantum
      };
      setHistory(prev => [historyEntry, ...prev].slice(0, 20));
    } catch (err) {
      setError(err.message);
      setPlaybackState('idle');
    }
  };

  const pauseSimulation = () => {
    if (playbackState === 'running') {
      setPlaybackState('paused');
    }
  };

  const resumeSimulation = () => {
    if (playbackState === 'paused') {
      setPlaybackState('running');
    }
  };

  const seekTo = (time) => {
    const totalTime = schedule?.metrics?.totalTime ?? 0;
    const targetTime = Math.max(0, Math.min(time, totalTime));
    setCurrentTime(targetTime);

    if (playbackState === 'finished' && targetTime < totalTime) {
      setPlaybackState('paused');
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    playbackState,
    currentTime,
    playbackSpeed,
    schedule,
    results,
    metrics,
    error,
    numCores,
    setNumCores,
    history,
    clearHistory,
    runSimulation,
    pauseSimulation,
    resumeSimulation,
    resetSimulation,
    setPlaybackSpeed,
    seekTo
  };
};
