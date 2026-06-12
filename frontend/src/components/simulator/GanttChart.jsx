import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GanttChart = ({ segments, currentTime, totalTime, processes }) => {
  const containerRef = useRef(null);
  const [hoveredSegment, setHoveredSegment] = useState(null);

  // Auto-scroll as simulation progresses
  useEffect(() => {
    if (containerRef.current && currentTime > 0) {
      const containerWidth = containerRef.current.offsetWidth;
      const currentPos = currentTime * 60;

      if (currentPos > containerWidth / 2) {
        containerRef.current.scrollLeft = currentPos - containerWidth / 2;
      }
    }
  }, [currentTime]);

  if (!segments || segments.length === 0) {
    return (
      <div className="glass p-6 min-h-[220px]">
        <h3 className="text-lg font-bold mb-6">Gantt Chart</h3>
        <div className="w-full h-24 bg-white/5 rounded-lg border border-dashed border-white/10 flex items-center justify-center">
          <p className="text-brand-gray text-sm italic">Gantt chart visualization will appear here during simulation.</p>
        </div>
      </div>
    );
  }

  // Create time markers
  const maxTime = Math.max(totalTime || 0, currentTime, 10);
  const timeMarkers = [];
  for (let i = 0; i <= Math.ceil(maxTime); i++) {
    timeMarkers.push(i);
  }

  return (
    <div className="glass p-6 min-h-[240px] overflow-hidden relative">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold">Gantt Chart</h3>
        <div className="flex items-center space-x-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-brand-gray uppercase tracking-widest leading-none">Time</span>
            <span className="text-xl font-mono font-bold text-brand-cyan">{currentTime.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="w-full overflow-x-auto pb-8 custom-scrollbar scroll-smooth relative"
      >
        <div className="relative h-32 min-w-max pr-12 pt-6">
          {/* Time Scale Markers (Top) */}
          <div className="absolute top-0 left-0 w-full h-4 flex items-start pointer-events-none">
            {timeMarkers.map(m => (
              <div key={m} className="absolute flex flex-col items-center" style={{ left: `${m * 60}px` }}>
                <div className="w-[1px] h-2 bg-white/20" />
                <span className="text-[9px] font-mono text-brand-gray mt-1">{m}</span>
              </div>
            ))}
          </div>

          {/* Segments Container */}
          <div className="flex items-end h-20">
            {segments.map((segment, index) => {
              const isVisible = segment.startTime <= currentTime;
              if (!isVisible) return null;

              const duration = Math.min(segment.endTime, currentTime) - segment.startTime;
              const width = duration * 60;
              const fullWidth = (segment.endTime - segment.startTime) * 60;
              const originalProcess = processes.find(p => p.id === segment.processId);

              return (
                <div
                  key={index}
                  className="relative h-16 transition-all"
                  style={{ width: `${fullWidth}px` }}
                  onMouseEnter={() => setHoveredSegment({ ...segment, originalProcess })}
                  onMouseLeave={() => setHoveredSegment(null)}
                >
                  {/* Segment Box */}
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    originX={0}
                    className={`absolute inset-y-0 left-0 rounded-lg border flex items-center justify-center overflow-hidden shadow-lg ${
                      segment.isIdle
                      ? 'bg-white/5 border-white/10 border-dashed'
                      : 'border-white/20'
                    }`}
                    style={{
                      width: `${width}px`,
                      background: segment.isIdle
                        ? undefined
                        : `linear-gradient(135deg, ${segment.color}40, ${segment.color}20)`,
                      borderColor: segment.isIdle ? undefined : `${segment.color}80`
                    }}
                  >
                    <span className={`text-xs font-bold ${segment.isIdle ? 'text-brand-gray/50' : 'text-white'}`}>
                      {segment.processId}
                    </span>

                    {/* Subtle Shine Effect */}
                    {!segment.isIdle && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-30 pointer-events-none" />
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Current Time Indicator */}
          <div
            className="absolute top-0 bottom-6 w-[2px] bg-brand-cyan shadow-[0_0_15px_rgba(34,211,238,0.6)] z-10 transition-all pointer-events-none"
            style={{ left: `${currentTime * 60}px` }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-cyan border-2 border-brand-navy shadow-lg" />
          </div>
        </div>
      </div>

      {/* Tooltip Overlay */}
      <AnimatePresence>
        {hoveredSegment && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 glass bg-brand-navy/90 p-3 z-50 border border-brand-blue/30 shadow-2xl min-w-[180px] pointer-events-none"
          >
            <div className="flex items-center space-x-2 mb-2 border-b border-white/10 pb-1">
              {!hoveredSegment.isIdle && (
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: hoveredSegment.color }} />
              )}
              <span className="font-bold text-sm">
                {hoveredSegment.isIdle ? 'CPU Idle' : `Process ${hoveredSegment.processId}`}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <div className="flex flex-col">
                <span className="text-[9px] text-brand-gray uppercase">Start</span>
                <span className="text-xs font-mono">{hoveredSegment.startTime}s</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-brand-gray uppercase">End</span>
                <span className="text-xs font-mono">{hoveredSegment.endTime}s</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-brand-gray uppercase">Duration</span>
                <span className="text-xs font-mono">{(hoveredSegment.endTime - hoveredSegment.startTime).toFixed(1)}s</span>
              </div>
              {!hoveredSegment.isIdle && hoveredSegment.originalProcess && (
                <div className="flex flex-col">
                  <span className="text-[9px] text-brand-gray uppercase">Arrival</span>
                  <span className="text-xs font-mono">{hoveredSegment.originalProcess.arrivalTime}s</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GanttChart;
