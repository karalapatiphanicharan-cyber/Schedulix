import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Trash2, Wand2, Database, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ControlBar = ({
  playbackState,
  currentTime,
  playbackSpeed,
  setPlaybackSpeed,
  seekTo,
  totalTime,
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isIdle = playbackState === 'idle';
  const isRunning = playbackState === 'running';
  const isPaused = playbackState === 'paused';
  const isFinished = playbackState === 'finished';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const ControlButton = ({ icon: Icon, label, onClick, disabled, primary, danger, title, ariaLabel }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel || label}
      className={`flex flex-col items-center justify-center space-y-1 px-4 py-3 rounded-xl transition-all active:scale-95 min-w-[80px] group focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:outline-none ${
        disabled
          ? 'opacity-30 cursor-not-allowed grayscale'
          : primary
            ? 'bg-brand-blue text-white hover:bg-blue-600 shadow-lg shadow-brand-blue/20'
            : danger
              ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'
              : 'glass hover:bg-white/10 text-brand-gray hover:text-white'
      }`}
    >
      <Icon size={20} className={primary ? 'fill-current' : ''} />
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );

  const speedOptions = [0.25, 0.5, 1, 2, 4];

  return (
    <div className="glass p-6">
      <div className="flex flex-col space-y-8">
        {/* Playback Progress */}
        {!isIdle && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-brand-gray">
              <span>Timeline</span>
              <span className="text-brand-cyan font-mono">{currentTime.toFixed(1)}s / {totalTime.toFixed(1)}s</span>
            </div>
            <input
              type="range"
              min="0"
              max={totalTime}
              step="0.1"
              value={currentTime}
              onChange={(e) => seekTo(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan/50"
              aria-label="Simulation timeline scrubber"
            />
          </div>
        )}

        {/* Main Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {isPaused ? (
            <ControlButton
              icon={Play}
              label="Resume"
              onClick={onResume}
              primary
              title="Continue the simulation"
            />
          ) : (
            <ControlButton
              icon={Play}
              label="Run"
              onClick={onRun}
              disabled={isRunning || !hasProcesses || isFinished}
              primary
              title="Start simulation"
            />
          )}

          <ControlButton
            icon={Pause}
            label="Pause"
            onClick={onPause}
            disabled={!isRunning}
            title="Temporarily stop playback"
          />

          <ControlButton
            icon={RotateCcw}
            label="Reset"
            onClick={onReset}
            disabled={isIdle && !isFinished}
            title={isIdle && !isFinished ? "Simulation has not started" : "Return to start position"}
          />

          <div className="w-[1px] h-10 bg-white/10 mx-1 hidden sm:block" />

          {/* Speed Selector */}
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            {speedOptions.map(speed => (
              <button
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                className={`px-2 py-2 rounded-lg text-[10px] font-black transition-all ${
                  playbackSpeed === speed
                    ? 'bg-brand-blue text-white shadow-lg'
                    : 'text-brand-gray hover:text-white'
                }`}
                title={`Set speed to ${speed}x`}
                aria-label={`Set playback speed to ${speed} times`}
              >
                {speed}x
              </button>
            ))}
          </div>

          <div className="w-[1px] h-10 bg-white/10 mx-1 hidden sm:block" />

          <ControlButton
            icon={Trash2}
            label="Clear"
            onClick={onClearAll}
            disabled={!hasProcesses || !isIdle}
            danger
            title={!hasProcesses ? "No processes to clear" : !isIdle ? "Reset simulation to clear processes" : "Remove all processes"}
          />
        </div>

        {/* Bulk Data Actions */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/5 transition-all ${!isIdle ? 'opacity-40 pointer-events-none' : ''}`}>
          <button
            onClick={onGenerateSample}
            disabled={!isIdle}
            className="flex items-center justify-center space-x-3 glass hover:bg-white/5 py-3 rounded-xl text-xs font-bold text-brand-cyan transition-all border border-brand-cyan/20 active:scale-[0.98]"
          >
            <Wand2 size={16} />
            <span>Generate Random Data</span>
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => isIdle && setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 glass hover:bg-white/5 rounded-xl text-xs font-bold text-brand-blue transition-all border border-brand-blue/20 active:scale-[0.98] ${isDropdownOpen ? 'bg-white/5 ring-1 ring-brand-blue/50' : ''}`}
            >
              <div className="flex items-center space-x-3">
                <Database size={16} />
                <span>Load Dataset</span>
              </div>
              <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-full mb-3 left-0 w-full glass bg-brand-navy/95 border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 backdrop-blur-xl"
                >
                  <div className="p-2 space-y-1">
                    <p className="px-3 py-2 text-[10px] uppercase tracking-widest text-brand-gray font-bold opacity-50">Select Scenario</p>
                    {sampleDatasets.map((dataset) => (
                      <button
                        key={dataset}
                        onClick={() => {
                          onLoadDataset(dataset);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2.5 text-xs hover:bg-brand-blue/20 text-brand-gray hover:text-white transition-all rounded-lg group"
                      >
                        <div className="flex items-center justify-between mb-0.5">
                            <span className="font-bold">{dataset}</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-[9px] opacity-50 group-hover:opacity-80 transition-opacity line-clamp-1 italic">
                            {/* Note: This assumes useProcessManager provides getDatasetDescription, but we'll use a safe fallback or pass it as prop if needed */}
                            {dataset}
                        </p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;
