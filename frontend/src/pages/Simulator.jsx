import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { useProcessManager } from '../hooks/useProcessManager';

// Simulator Components
import ProcessForm from '../components/simulator/ProcessForm';
import ProcessTable from '../components/simulator/ProcessTable';
import ControlBar from '../components/simulator/ControlBar';
import AlgorithmSelector from '../components/simulator/AlgorithmSelector';
import EmptyState from '../components/simulator/EmptyState';
import ConfirmDialog from '../components/simulator/ConfirmDialog';

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

  const [selectedAlgorithm, setSelectedAlgorithm] = useState('FCFS');
  const [quantum, setQuantum] = useState(2);
  const [isConfirmClearOpen, setIsConfirmClearOpen] = useState(false);
  const [processToDelete, setProcessToDelete] = useState(null);

  const handleResetSimulation = () => {
    // Phase 2: Just resets UI state if any, actual logic in Phase 3
    console.log('Reset simulation');
  };

  const handleDeleteProcess = (id) => {
    setProcessToDelete(id);
  };

  const confirmDeleteProcess = () => {
    if (processToDelete) {
      deleteProcess(processToDelete);
      setProcessToDelete(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <SectionTitle
        title="Interactive Simulator"
        subtitle="Configure your processes and watch the scheduling algorithm in action."
        centered={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Configuration & Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* Algorithm Selection */}
          <AlgorithmSelector
            selectedAlgorithm={selectedAlgorithm}
            onSelect={setSelectedAlgorithm}
            quantum={quantum}
            onQuantumChange={setQuantum}
          />

          {/* Process Input */}
          <ProcessForm
            onAdd={(p) => addProcess(p)}
            nextId={processes.length + 1}
            existingIds={processes.map(p => p.id)}
          />

          {/* Simulation Controls */}
          <ControlBar
            onReset={handleResetSimulation}
            onClearAll={() => setIsConfirmClearOpen(true)}
            onGenerateSample={generateRandomProcesses}
            onLoadDataset={loadSampleDataset}
            sampleDatasets={sampleDatasets}
            hasProcesses={processes.length > 0}
          />
        </div>

        {/* Right Column - Visualizations & Table */}
        <div className="lg:col-span-8 space-y-6">
          {/* Gantt Chart (Placeholder for now) */}
          <div className="glass p-6 min-h-[200px]">
            <h3 className="text-lg font-bold mb-6">Gantt Chart</h3>
            <div className="w-full h-24 bg-white/5 rounded-lg border border-dashed border-white/10 flex items-center justify-center">
              <p className="text-brand-gray text-sm italic">Gantt chart visualization will appear here in Phase 3.</p>
            </div>
          </div>

          {/* Queues and CPU (Placeholders for now) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-6 min-h-[180px]">
              <h3 className="text-sm font-bold mb-4 text-brand-gray uppercase tracking-wider">Ready Queue</h3>
              <div className="flex space-x-2">
                <div className="w-10 h-10 border border-dashed border-white/20 rounded flex items-center justify-center text-brand-gray text-[10px]">Empty</div>
              </div>
            </div>
            <div className="glass p-6 min-h-[180px]">
              <h3 className="text-sm font-bold mb-4 text-brand-gray uppercase tracking-wider">Running Process</h3>
              <div className="h-20 flex items-center justify-center border border-dashed border-white/20 rounded">
                <p className="text-brand-gray text-xs">CPU Idle</p>
              </div>
            </div>
            <div className="glass p-6 min-h-[180px]">
              <h3 className="text-sm font-bold mb-4 text-brand-gray uppercase tracking-wider">Completed</h3>
              <div className="space-y-2 text-center py-4 border border-dashed border-white/20 rounded">
                <p className="text-brand-gray text-[10px]">No processes finished</p>
              </div>
            </div>
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
              />
            ) : (
              <EmptyState onGenerate={generateRandomProcesses} />
            )}
          </div>

          {/* Statistics (Placeholder for now) */}
          <div className="glass p-6">
            <h3 className="text-lg font-bold mb-6">Simulation Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Avg. Waiting", value: "—" },
                { label: "Avg. Turnaround", value: "—" },
                { label: "Throughput", value: "—" },
                { label: "Utilization", value: "Run simulation" }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <p className="text-brand-gray text-xs mb-1">{stat.label}</p>
                  <p className={`font-bold text-brand-cyan ${stat.value === 'Run simulation' ? 'text-sm' : 'text-xl'}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
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
  );
};

export default Simulator;
