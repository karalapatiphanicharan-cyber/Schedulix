import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import { useProcessManager } from '../hooks/useProcessManager';
import { useSimulation } from '../hooks/useSimulation';
import ErrorBoundary from '../components/ErrorBoundary';

// Simulator Components
import ProcessForm from '../components/simulator/ProcessForm';
import ProcessTable from '../components/simulator/ProcessTable';
import AlgorithmSelector from '../components/simulator/AlgorithmSelector';
import EmptyState from '../components/simulator/EmptyState';
import ConfirmDialog from '../components/simulator/ConfirmDialog';
import GanttChart from '../components/simulator/GanttChart';
import StatisticsPanel from '../components/simulator/StatisticsPanel';
import ComparisonSummary from '../components/simulator/ComparisonSummary';
import { Play, RotateCcw, Trash2, Wand2, FileDown } from 'lucide-react';
import { exportToPDF } from '../utils/pdfExport';

const Compare = () => {
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

  const simA = useSimulation();
  const simB = useSimulation();

  const [algoA, setAlgoA] = useState('FCFS');
  const [quantumA, setQuantumA] = useState(2);

  const [algoB, setAlgoB] = useState('SJF');
  const [quantumB, setQuantumB] = useState(2);

  const [isConfirmClearOpen, setIsConfirmClearOpen] = useState(false);
  const [processToDelete, setProcessToDelete] = useState(null);

  const isIdle = simA.playbackState === 'idle' && simB.playbackState === 'idle';
  const isFinished = simA.playbackState === 'finished' && simB.playbackState === 'finished';

  const handleRunComparison = () => {
    if (processes.length === 0) return;
    handleReset();
    const clonedProcesses = JSON.parse(JSON.stringify(processes));
    simA.runSimulation(clonedProcesses, algoA, quantumA);
    simB.runSimulation(clonedProcesses, algoB, quantumB);
  };

  const handleReset = () => {
    simA.resetSimulation();
    simB.resetSimulation();
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

  useEffect(() => {
    handleReset();
  }, [processes]);

  return (
    <ErrorBoundary>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <SectionTitle
            title="Algorithm Comparison"
            subtitle="Compare two scheduling algorithms side-by-side using the same process dataset."
            centered={false}
          />

          {(simA.results && simB.results) && (
            <button
              onClick={() => exportToPDF({
                algoA,
                algoB,
                processes,
                metricsA: simA.metrics,
                metricsB: simB.metrics,
                resultsA: simA.results,
                resultsB: simB.results
              })}
              className="flex items-center justify-center space-x-2 bg-brand-cyan hover:bg-cyan-600 text-brand-navy px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-brand-cyan/20 h-fit self-start md:self-center"
            >
              <FileDown size={18} />
              <span>Export Comparison PDF</span>
            </button>
          )}
        </div>

        {(simA.error || simB.error) && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center justify-between">
            <span>{simA.error || simB.error}</span>
            <button onClick={handleReset} className="font-bold hover:underline">Dismiss</button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Shared Process Configuration */}
          <div className="lg:col-span-4 space-y-6">
            <div className={`space-y-6 ${!isIdle ? 'opacity-50 pointer-events-none transition-opacity' : ''}`}>
              <ProcessForm
                onAdd={(p) => addProcess(p)}
                nextId={processes.length + 1}
                existingIds={processes.map(p => p.id)}
              />

              <div className="glass p-6 space-y-4">
                <h3 className="text-lg font-bold mb-4">Comparison Controls</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleRunComparison}
                    disabled={!isIdle || processes.length === 0}
                    className="flex flex-col items-center justify-center space-y-1 px-4 py-3 rounded-xl bg-brand-blue text-white hover:bg-blue-600 disabled:opacity-30 disabled:grayscale transition-all active:scale-95"
                  >
                    <Play size={20} className="fill-current" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Run Both</span>
                  </button>
                  <button
                    onClick={handleReset}
                    disabled={isIdle && !isFinished}
                    className="flex flex-col items-center justify-center space-y-1 px-4 py-3 rounded-xl glass hover:bg-white/10 text-brand-gray hover:text-white disabled:opacity-30 transition-all active:scale-95"
                  >
                    <RotateCcw size={20} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Reset Both</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-3">
                  <button
                    onClick={generateRandomProcesses}
                    disabled={!isIdle}
                    className="w-full flex items-center justify-center space-x-2 glass hover:bg-white/5 py-2.5 rounded-lg text-xs font-bold text-brand-cyan transition-all border border-brand-cyan/20 disabled:opacity-30"
                  >
                    <Wand2 size={14} />
                    <span>Generate Random</span>
                  </button>
                  <button
                    onClick={() => setIsConfirmClearOpen(true)}
                    disabled={processes.length === 0 || !isIdle}
                    className="w-full flex items-center justify-center space-x-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 py-2.5 rounded-lg text-xs font-bold border border-red-500/20 transition-all disabled:opacity-30"
                  >
                    <Trash2 size={14} />
                    <span>Clear All</span>
                  </button>
                </div>
              </div>
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
                  currentTime={Math.max(simA.currentTime, simB.currentTime)}
                  schedule={[simA.schedule, simB.schedule]}
                  playbackState={isIdle ? 'idle' : 'running'}
                />
              ) : (
                <EmptyState onGenerate={generateRandomProcesses} />
              )}
            </div>
          </div>

          {/* Right Column - Side by Side Comparison */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Algorithm A Column */}
              <div className="space-y-6">
                <div className={!isIdle ? 'opacity-50 pointer-events-none' : ''}>
                  <AlgorithmSelector
                    selectedAlgorithm={algoA}
                    onSelect={setAlgoA}
                    quantum={quantumA}
                    onQuantumChange={setQuantumA}
                    onLoadRecommended={loadSampleDataset}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-xs font-black uppercase tracking-widest text-brand-blue">Result: {algoA}</span>
                  </div>
                  <GanttChart
                    segments={simA.schedule?.segments}
                    currentTime={simA.currentTime}
                    totalTime={simA.metrics?.totalTime}
                  />
                  <StatisticsPanel
                    results={simA.results}
                    metrics={simA.metrics}
                    playbackState={simA.playbackState}
                    gridClassName="grid grid-cols-1 md:grid-cols-2 gap-8"
                    cardClassName="p-8"
                  />
                </div>
              </div>

              {/* Algorithm B Column */}
              <div className="space-y-6">
                <div className={!isIdle ? 'opacity-50 pointer-events-none' : ''}>
                  <AlgorithmSelector
                    selectedAlgorithm={algoB}
                    onSelect={setAlgoB}
                    quantum={quantumB}
                    onQuantumChange={setQuantumB}
                    onLoadRecommended={loadSampleDataset}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-xs font-black uppercase tracking-widest text-brand-cyan">Result: {algoB}</span>
                  </div>
                  <GanttChart
                    segments={simB.schedule?.segments}
                    currentTime={simB.currentTime}
                    totalTime={simB.metrics?.totalTime}
                  />
                  <StatisticsPanel
                    results={simB.results}
                    metrics={simB.metrics}
                    playbackState={simB.playbackState}
                    gridClassName="grid grid-cols-1 md:grid-cols-2 gap-8"
                    cardClassName="p-8"
                  />
                </div>
              </div>
            </div>

            {/* Overall Summary - Only show when both are finished or if we want it live?
                Let's show it when they have results. */}
            {(simA.results && simB.results) && (
              <ComparisonSummary
                algoA={algoA}
                algoB={algoB}
                metricsA={simA.metrics}
                metricsB={simB.metrics}
                resultsA={simA.results}
                resultsB={simB.results}
              />
            )}
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
            handleReset();
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

export default Compare;
