import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { useProcessManager } from '../hooks/useProcessManager';
import { useSimulation } from '../hooks/useSimulation';
import ErrorBoundary from '../components/ErrorBoundary';
import { History, Save, FolderOpen } from 'lucide-react';

import ProcessForm from '../components/simulator/ProcessForm';
import ProcessTable from '../components/simulator/ProcessTable';
import ControlBar from '../components/simulator/ControlBar';
import AlgorithmSelector from '../components/simulator/AlgorithmSelector';
import EmptyState from '../components/simulator/EmptyState';
import ConfirmDialog from '../components/simulator/ConfirmDialog';
import GanttChart from '../components/simulator/GanttChart';
import ReadyQueue from '../components/simulator/ReadyQueue';
import RunningProcess from '../components/simulator/RunningProcess';
import QueueInspector from '../components/simulator/QueueInspector';
import StatisticsPanel from '../components/simulator/StatisticsPanel';
import SimulationSummary from '../components/simulator/SimulationSummary';
import EducationalCard from '../components/simulator/EducationalCard';
import { workloadAnalyzer } from '../utils/workloadAnalyzer';

const Simulator = () => {
  const [lastProcessId, setLastProcessId] = useState(null);
  const [contextSwitchNotify, setContextSwitchNotify] = useState(null);

  const {
    processes,
    addProcess,
    updateProcess,
    deleteProcess,
    clearProcesses,
    generateRandomProcesses,
    loadSampleDataset,
    saveWorkspace,
    loadWorkspace,
    getSavedWorkspaces,
    sampleDatasets,
  } = useProcessManager();

  const {
    playbackState,
    currentTime,
    playbackSpeed,
    schedule,
    results,
    metrics,
    error: simError,
    runSimulation,
    pauseSimulation,
    resumeSimulation,
    resetSimulation,
    setPlaybackSpeed,
    seekTo,
    numCores,
    setNumCores,
    history,
    clearHistory
  } = useSimulation();

  useEffect(() => {
    if (playbackState === 'running' && schedule?.segments) {
      const isMultiCore = Array.isArray(schedule.segments) && Array.isArray(schedule.segments[0]);
      const allSegments = isMultiCore ? schedule.segments.flat() : schedule.segments;

      const currentSegment = allSegments.find(s => s && s.startTime <= currentTime && s.endTime > currentTime);
      if (currentSegment && !currentSegment.isIdle) {
        if (lastProcessId && lastProcessId !== currentSegment.processId) {
          setContextSwitchNotify({
            from: lastProcessId,
            to: currentSegment.processId
          });
          setTimeout(() => setContextSwitchNotify(null), 2000);
        }
        setLastProcessId(currentSegment.processId);
      } else if (currentSegment?.isIdle) {
        setLastProcessId(null);
      }
    } else if (playbackState === 'idle' || playbackState === 'finished') {
      setLastProcessId(null);
    }
  }, [currentTime, playbackState, schedule, lastProcessId]);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState('FCFS');
  const [quantum, setQuantum] = useState(2);
  const [isConfirmClearOpen, setIsConfirmClearOpen] = useState(false);
  const [processToDelete, setProcessToDelete] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showWorkspaces, setShowWorkspaces] = useState(false);

  const isIdle = playbackState === 'idle';
  const workload = processes.length > 0 ? workloadAnalyzer.analyze(processes) : null;

  const handleRunSimulation = () => {
    if (processes.length === 0) return;
    setLastProcessId(null);
    runSimulation(processes, selectedAlgorithm, quantum, numCores);
  };

  const handleSaveWorkspace = () => {
    const name = prompt("Enter workspace name:");
    if (name) {
      saveWorkspace(name, { selectedAlgorithm, quantum, numCores });
      alert("Workspace saved!");
    }
  };

  const handleLoadWorkspace = (name) => {
    const config = loadWorkspace(name);
    if (config) {
      setSelectedAlgorithm(config.selectedAlgorithm);
      setQuantum(config.quantum);
      setNumCores(config.numCores);
      setShowWorkspaces(false);
      resetSimulation();
    }
  };

  const handleAlgorithmChange = (algo) => {
    setSelectedAlgorithm(algo);
    resetSimulation();
  };

  const handleDeleteProcess = (id) => {
    if (!isIdle) return;
    setProcessToDelete(id);
  };

  const confirmDeleteProcess = () => {
    if (processToDelete) {
      deleteProcess(processToDelete);
      setProcessToDelete(null);
    }
  };

  return (
    <ErrorBoundary>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <SectionTitle
        title="Interactive Simulator"
        subtitle="Configure your processes and watch the scheduling algorithm in action."
        centered={false}
      />

      <AnimatePresence>
        {contextSwitchNotify && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-24 left-1/2 z-50 px-6 py-3 bg-brand-blue/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex items-center space-x-4"
          >
            <div className="p-2 bg-white/10 rounded-lg">
              <Zap size={16} className="text-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-white/60 uppercase tracking-widest leading-none mb-1">Context Switch</span>
              <span className="text-sm font-bold text-white">{contextSwitchNotify.from} → {contextSwitchNotify.to}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {simError && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center justify-between">
          <span>{simError}</span>
          <button onClick={resetSimulation} className="font-bold hover:underline">Dismiss</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${showHistory ? 'bg-brand-blue text-white' : 'glass text-brand-gray hover:text-white'}`}
            >
              <History size={14} />
              <span>History</span>
            </button>
            <button
              onClick={() => setShowWorkspaces(!showWorkspaces)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${showWorkspaces ? 'bg-brand-blue text-white' : 'glass text-brand-gray hover:text-white'}`}
            >
              <FolderOpen size={14} />
              <span>Workspaces</span>
            </button>
          </div>

          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className="glass p-4 border-l-4 border-brand-cyan">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-cyan">Recent Simulations</h4>
                    <button onClick={clearHistory} className="text-[9px] font-bold text-red-400 hover:underline">Clear All</button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {history && history.length > 0 ? history.map((entry) => (
                      <div key={entry.id} className="p-3 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors group">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white">{entry.algorithm}</span>
                          <span className="text-[9px] font-mono text-brand-gray">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-brand-gray">
                          <span>{entry.processCount} processes • {entry.numCores} core(s)</span>
                          <button
                            onClick={() => {
                              // Reload history entry
                              clearProcesses();
                              entry.processes.forEach(p => addProcess(p));
                              setSelectedAlgorithm(entry.algorithm);
                              setQuantum(entry.quantum || 2);
                              setNumCores(entry.numCores);
                              setShowHistory(false);
                            }}
                            className="text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity font-bold"
                          >
                            Restore
                          </button>
                        </div>
                      </div>
                    )) : (
                      <p className="text-center py-4 text-xs text-brand-gray italic">No history yet.</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showWorkspaces && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className="glass p-4 border-l-4 border-brand-blue">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-blue">Saved Workspaces</h4>
                    <button onClick={handleSaveWorkspace} className="flex items-center space-x-1 text-[10px] font-bold text-brand-blue hover:underline">
                      <Save size={12} />
                      <span>Save Current</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {Object.keys(getSavedWorkspaces()).length > 0 ? Object.entries(getSavedWorkspaces()).map(([name, ws]) => (
                      <button
                        key={name}
                        onClick={() => handleLoadWorkspace(name)}
                        className="w-full p-3 bg-white/5 rounded-lg border border-white/5 hover:border-brand-blue/30 text-left transition-all group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white group-hover:text-brand-blue transition-colors">{name}</span>
                          <span className="text-[9px] font-mono text-brand-gray">{new Date(ws.timestamp).toLocaleDateString()}</span>
                        </div>
                        <p className="text-[10px] text-brand-gray">{ws.processes.length} processes • {ws.config.selectedAlgorithm}</p>
                      </button>
                    )) : (
                      <div className="text-center py-4 space-y-3">
                        <p className="text-xs text-brand-gray italic">No workspaces saved.</p>
                        <button onClick={handleSaveWorkspace} className="px-4 py-2 bg-brand-blue/10 text-brand-blue text-[10px] font-black uppercase tracking-widest rounded-lg border border-brand-blue/20">
                          Create First Workspace
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={!isIdle ? 'opacity-50 pointer-events-none transition-opacity' : ''}>
            <AlgorithmSelector
              selectedAlgorithm={selectedAlgorithm}
              onSelect={handleAlgorithmChange}
              quantum={quantum}
              onQuantumChange={setQuantum}
              onLoadRecommended={loadSampleDataset}
              numCores={numCores}
              onCoresChange={setNumCores}
            />
          </div>

          <div className={!isIdle ? 'opacity-50 pointer-events-none transition-opacity' : ''}>
            <ProcessForm
              onAdd={(p) => addProcess(p)}
              nextId={processes.length + 1}
              existingIds={processes.map(p => p.id)}
            />
          </div>

          <ControlBar
            playbackState={playbackState}
            currentTime={currentTime}
            playbackSpeed={playbackSpeed}
            setPlaybackSpeed={setPlaybackSpeed}
            seekTo={seekTo}
            totalTime={metrics?.totalTime || 0}
            onRun={handleRunSimulation}
            onPause={pauseSimulation}
            onResume={resumeSimulation}
            onReset={resetSimulation}
            onClearAll={() => setIsConfirmClearOpen(true)}
            onGenerateSample={generateRandomProcesses}
            onLoadDataset={loadSampleDataset}
            sampleDatasets={sampleDatasets}
            hasProcesses={processes.length > 0}
          />
        </div>

        <div className="lg:col-span-8 space-y-6">
          <GanttChart
            segments={schedule?.segments}
            currentTime={currentTime}
            totalTime={metrics?.totalTime}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ReadyQueue
              processes={processes}
              currentTime={currentTime}
              schedule={schedule}
            />
            <RunningProcess
              currentTime={currentTime}
              schedule={schedule}
              processes={processes}
            />
            <QueueInspector
              processes={processes}
              currentTime={currentTime}
              schedule={schedule}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Process List</h3>
              <span className="text-xs font-medium px-2 py-1 bg-white/5 rounded text-brand-gray">
                {processes.length} Processes
              </span>
            </div>

            {processes.length > 0 ? (
              <ProcessTable
                processes={processes}
                onUpdate={updateProcess}
                onDelete={handleDeleteProcess}
                currentTime={currentTime}
                schedule={schedule}
                playbackState={playbackState}
              />
            ) : (
              <EmptyState onGenerate={generateRandomProcesses} />
            )}
          </div>

          {workload && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 border-l-4 border-yellow-500 bg-yellow-500/5"
            >
              <div className="flex items-center space-x-2 mb-4 text-yellow-500">
                <Zap size={18} />
                <h4 className="font-bold uppercase tracking-widest text-xs">Workload Analysis</h4>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {workload.characteristics.map((char, i) => (
                  <span key={i} className="px-2 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded text-[10px] font-bold text-yellow-600 uppercase">
                    {char}
                  </span>
                ))}
              </div>
              <p className="text-sm text-brand-gray">
                <span className="font-bold text-white">Recommendation:</span> {workload.recommendation}
              </p>
            </motion.div>
          )}

          <StatisticsPanel
            results={results}
            metrics={metrics}
            playbackState={playbackState}
            currentTime={currentTime}
          />

          <EducationalCard algorithm={selectedAlgorithm} />

          {playbackState === 'finished' && (
            <SimulationSummary
              results={results}
              metrics={metrics}
              algorithm={selectedAlgorithm}
              processes={processes}
              onRunAgain={handleRunSimulation}
              onReset={resetSimulation}
            />
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={isConfirmClearOpen}
        title="Clear All Processes?"
        message="This will remove all processes from the list. This action cannot be undone."
        onConfirm={() => {
          clearProcesses();
          setIsConfirmClearOpen(false);
          resetSimulation();
        }}
        onCancel={() => setIsConfirmClearOpen(false)}
        confirmText="Clear All"
      />

      <ConfirmDialog
        isOpen={!!processToDelete}
        title="Delete Process?"
        message={`Are you sure you want to delete process ${processToDelete}? This action cannot be undone.`}
        onConfirm={confirmDeleteProcess}
        onCancel={() => setProcessToDelete(null)}
        confirmText="Delete"
      />
      </div>
    </ErrorBoundary>
  );
};

export default Simulator;
