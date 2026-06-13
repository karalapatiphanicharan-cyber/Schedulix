import { useState, useEffect, useRef, useCallback } from 'react';

export const useSimulation = () => {
  const [playbackState, setPlaybackState] = useState('idle'); // idle, running, paused, finished
  const [currentTime, setCurrentTime] = useState(0);
  const [schedule, setSchedule] = useState(null);
  const [results, setResults] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);

  const requestRef = useRef();
  const previousTimeRef = useRef();
  const speedRef = useRef(1); // steps per second

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
      const nextTime = currentTime + deltaTime * speedRef.current;

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
  }, [playbackState, currentTime, schedule]);

  useEffect(() => {
    if (playbackState === 'running') {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current);
      previousTimeRef.current = undefined;
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [playbackState, animate]);

  const runSimulation = async (processes, algorithm, quantum) => {
    setError(null);
    try {
      const { simulate } = await import('../services/api');
      const data = await simulate(processes, algorithm, quantum);
      setSchedule(data);
      setResults(data.results);
      setMetrics(data.metrics);
      setCurrentTime(0);
      setPlaybackState('running');
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

  return {
    playbackState,
    currentTime,
    schedule,
    results,
    metrics,
    error,
    runSimulation,
    pauseSimulation,
    resumeSimulation,
    resetSimulation,
    setSpeed: (speed) => { speedRef.current = speed; }
  };
};
