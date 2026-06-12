import React from 'react';
import { Play, Pause, RotateCcw, Trash2, Wand2, Database } from 'lucide-react';

const ControlBar = ({
  playbackState, // idle, running, paused, finished
  onRun,
  onPause,
  onResume,
  onReset,
  onClearAll,
  onGenerateSample,
  onLoadDataset,
  sampleDatasets,
  hasProcesses
}) => {
  const isIdle = playbackState === 'idle';
  const isRunning = playbackState === 'running';
  const isPaused = playbackState === 'paused';
  const isFinished = playbackState === 'finished';

  return (
    <div className="glass p-6">
      <div className="flex flex-col space-y-6">
        {/* Primary Simulation Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isPaused ? (
              <button
                onClick={onResume}
                className="p-3 bg-brand-cyan hover:bg-brand-cyan/80 rounded-full text-brand-navy transition-all active:scale-95"
                title="Resume Simulation"
              >
                <Play size={20} fill="currentColor" />
              </button>
            ) : (
              <button
                onClick={onRun}
                disabled={isRunning || !hasProcesses || isFinished}
                className={`p-3 rounded-full text-white transition-all active:scale-95 ${
                  isRunning || !hasProcesses || isFinished
                  ? 'bg-brand-blue/30 grayscale opacity-40 cursor-not-allowed'
                  : 'bg-brand-blue hover:bg-blue-600'
                }`}
                title="Run Simulation"
              >
                <Play size={20} fill="currentColor" />
              </button>
            )}

            <button
              onClick={onPause}
              disabled={!isRunning}
              className={`p-3 rounded-full transition-all active:scale-95 ${
                !isRunning
                ? 'glass grayscale opacity-40 cursor-not-allowed text-white/30'
                : 'glass hover:bg-white/10 text-white'
              }`}
              title="Pause Simulation"
            >
              <Pause size={20} fill={isRunning ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={onReset}
              className="p-3 glass hover:bg-white/10 rounded-full text-white transition-all active:scale-95"
              title="Reset Simulation"
            >
              <RotateCcw size={20} />
            </button>
          </div>

          <button
            onClick={onClearAll}
            disabled={!hasProcesses || !isIdle}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              hasProcesses
              ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400'
              : 'bg-white/5 text-brand-gray cursor-not-allowed'
            }`}
          >
            <Trash2 size={16} />
            <span>Clear All</span>
          </button>
        </div>

        {/* Bulk Data Actions */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/5 transition-opacity ${!isIdle ? 'opacity-50 pointer-events-none' : ''}`}>
          <button
            onClick={onGenerateSample}
            disabled={!isIdle}
            className="flex items-center justify-center space-x-2 glass hover:bg-white/5 py-2.5 rounded-lg text-xs font-medium text-brand-cyan transition-all"
          >
            <Wand2 size={14} />
            <span>Generate Sample Processes</span>
          </button>

          <div className="relative group">
            <div className="flex items-center justify-center space-x-2 glass hover:bg-white/5 py-2.5 rounded-lg text-xs font-medium text-brand-blue transition-all cursor-pointer">
              <Database size={14} />
              <span>Load Dataset</span>
            </div>
            <div className="absolute bottom-full mb-2 left-0 w-full glass bg-brand-navy border border-white/10 rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
              {sampleDatasets.map((dataset) => (
                <button
                  key={dataset}
                  onClick={() => isIdle && onLoadDataset(dataset)}
                  className="w-full text-left px-4 py-2 text-[10px] hover:bg-white/5 text-brand-gray hover:text-white transition-colors"
                >
                  {dataset}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;
