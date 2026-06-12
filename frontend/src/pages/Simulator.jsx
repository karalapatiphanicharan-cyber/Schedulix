import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { useProcessManager } from '../hooks/useProcessManager';
import { useSimulation } from '../hooks/useSimulation';
import ErrorBoundary from '../components/ErrorBoundary';

// Simulator Components
import ProcessForm from '../components/simulator/ProcessForm';
import ProcessTable from '../components/simulator/ProcessTable';
import ControlBar from '../components/simulator/ControlBar';
import AlgorithmSelector from '../components/simulator/AlgorithmSelector';
import EmptyState from '../components/simulator/EmptyState';
import ConfirmDialog from '../components/simulator/ConfirmDialog';
import GanttChart from '../components/simulator/GanttChart';
import ReadyQueue from '../components/simulator/ReadyQueue';
import RunningProcess from '../components/simulator/RunningProcess';
import CompletedProcesses from '../components/simulator/CompletedProcesses';
import StatisticsPanel from '../components/simulator/StatisticsPanel';

const Simulator = () => {
  const {
    processes,
    addProcess,
    updateProcess,
    deleteProcess,
    clearProcesses,
    generateRandomProcesses,
    loadSampleDataset,
    sampleDatasets,
  } = useProcessManager();

  const {
    playbackState,
    currentTime,
    schedule,
    results,
    metrics,
    error: simError,
    runSimulation,
    pauseSimulation,
    resumeSimulation,
    resetSimulation
  } = useSimulation();

  const [selectedAlgorithm, setSelectedAlgorithm] = useState('FCFS');
  const [quantum, setQuantum] = useState(2);
  const [isConfirmClearOpen, setIsConfirmClearOpen] = useState(false);
  const [processToDelete, setProcessToDelete] = useState(null);

  const isIdle = playbackState === 'idle';

  const handleRunSimulation = () => {
    if (processes.length === 0) return;
    runSimulation(processes, selectedAlgorithm, quantum);
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

      {simError && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center justify-between">
          <span>{simError}</span>
          <button onClick={resetSimulation} className="font-bold hover:underline">Dismiss</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Configuration & Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* Algorithm Selection */}
          <div className={!isIdle ? 'opacity-50 pointer-events-none transition-opacity' : ''}>
            <AlgorithmSelector
              selectedAlgorithm={selectedAlgorithm}
              onSelect={handleAlgorithmChange}
              quantum={quantum}
              onQuantumChange={setQuantum}
              onLoadRecommended={loadSampleDataset}
            />
          </div>

          {/* Process Input */}
          <div className={!isIdle ? 'opacity-50 pointer-events-none transition-opacity' : ''}>
            <ProcessForm
              onAdd={(p) => addProcess(p)}
              nextId={processes.length + 1}
              existingIds={processes.map(p => p.id)}
            />
          </div>

          {/* Simulation Controls */}
          <ControlBar
            playbackState={playbackState}
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

        {/* Right Column - Visualizations & Table */}
        <div className="lg:col-span-8 space-y-6">
          {/* Gantt Chart */}
          <GanttChart
            segments={schedule?.segments}
            currentTime={currentTime}
            totalTime={metrics?.totalTime}
          />

          {/* Queues and CPU */}
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
            <CompletedProcesses
              currentTime={currentTime}
              schedule={schedule}
            />
          </div>

          {/* Process Table or Empty State */}
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

          {/* Statistics */}
          <StatisticsPanel
            results={results}
            metrics={metrics}
            playbackState={playbackState}
          />
        </div>
      </div>

      {/* Confirmation Dialogs */}
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
