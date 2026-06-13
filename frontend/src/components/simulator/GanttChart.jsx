import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GanttChart = ({ segments = [], currentTime = 0, totalTime = 0, processes = [] }) => {
  const containerRef = useRef(null);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const safeProcesses = Array.isArray(processes) ? processes.filter(Boolean) : [];

  useEffect(() => {
    if (containerRef.current && currentTime > 0) {
      const containerWidth = containerRef.current.offsetWidth;
      const currentPos = currentTime * 60;

      if (currentPos > containerWidth / 2) {
        containerRef.current.scrollTo({
          left: currentPos - containerWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [currentTime]);

  if (!Array.isArray(segments) || segments.length === 0) {
    return (
      <div className="glass p-6 min-h-[220px]">
        <h3 className="text-lg font-bold mb-6">Gantt Chart</h3>
        <div className="w-full h-24 bg-white/5 rounded-lg border border-dashed border-white/10 flex items-center justify-center">
          <p className="text-brand-gray text-sm italic">Gantt chart visualization will appear here during simulation.</p>
        </div>
      </div>
    );
  }

  const maxTime = Math.max(totalTime || 0, currentTime, 10);

  const tickMarkers = [];
  for (let i = 0; i <= Math.ceil(maxTime) * 2; i++) {
    tickMarkers.push(i * 0.5);
  }

  const isMultiCore = Array.isArray(segments) && Array.isArray(segments[0]);
  const lanes = isMultiCore ? segments : [segments];

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
        className="w-full overflow-x-auto pb-8 custom-scrollbar relative"
      >
        <div className="relative min-w-max pr-12 pt-10">
          <div className="absolute top-0 left-0 w-full h-10 flex items-start pointer-events-none">
            {tickMarkers.map(m => (
              <div key={m} className="absolute flex flex-col items-center" style={{ left: `${m * 60}px` }}>
                <div className={`w-[1px] ${m % 1 === 0 ? 'h-4 bg-white/40' : 'h-2 bg-white/20'}`} />
                {m % 1 === 0 && (
                  <span className="text-[10px] font-mono font-bold text-brand-gray mt-1">{m}s</span>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {lanes.map((lane, laneIndex) => (
              <div key={laneIndex} className="relative h-14 flex items-center">
                {isMultiCore && (
                  <div className="absolute -left-12 top-1/2 -translate-y-1/2 text-[10px] font-black text-white/20 uppercase tracking-tighter rotate-180 [writing-mode:vertical-lr]">
                    Core {laneIndex + 1}
                  </div>
                )}

                {lane.filter(Boolean).map((segment, index) => {
                  const isVisible = (segment.startTime ?? Infinity) <= currentTime;
                  if (!isVisible) return null;

                  const duration = Math.min(segment.endTime || 0, currentTime) - (segment.startTime || 0);
                  const width = Math.max(0, duration * 60);
                  const fullWidth = Math.max(0, ((segment.endTime || 0) - (segment.startTime || 0)) * 60);
                  const originalProcess = safeProcesses.find(p => p && p.id === segment.processId);

                  return (
                    <div
                      key={index}
                      className="absolute h-12 transition-all"
                      style={{
                        left: `${segment.startTime * 60}px`,
                        width: `${fullWidth}px`
                      }}
                      onMouseEnter={() => setHoveredSegment({ ...segment, originalProcess })}
                      onMouseLeave={() => setHoveredSegment(null)}
                    >
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
                        <span className={`text-[10px] font-bold ${segment.isIdle ? 'text-brand-gray/30' : 'text-white'}`}>
                          {segment.processId === 'IDLE' ? '' : segment.processId}
                        </span>
                        {!segment.isIdle && (
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-30 pointer-events-none" />
                        )}
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div
            className="absolute top-0 bottom-0 w-[2px] bg-brand-cyan shadow-[0_0_15px_rgba(34,211,238,0.6)] z-10 transition-all pointer-events-none"
            style={{ left: `${currentTime * 60}px` }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-cyan border-2 border-brand-navy shadow-lg" />
          </div>
        </div>
      </div>

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
              {!hoveredSegment.isIdle && (
                <div className="flex flex-col">
                  <span className="text-[9px] text-brand-gray uppercase">Remaining</span>
                  <span className="text-xs font-mono">{Math.max(0, hoveredSegment.endTime - Math.max(hoveredSegment.startTime, currentTime)).toFixed(1)}s</span>
                </div>
              )}
              {!hoveredSegment.isIdle && hoveredSegment.originalProcess && (
                <div className="flex flex-col">
                  <span className="text-[9px] text-brand-gray uppercase">Arrival</span>
                  <span className="text-xs font-mono">{hoveredSegment.originalProcess.arrivalTime}s</span>
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-[9px] text-brand-gray uppercase">Status</span>
                <span className="text-[10px] font-bold text-brand-blue uppercase">
                  {hoveredSegment.endTime <= currentTime ? 'Finished' : hoveredSegment.startTime <= currentTime ? 'Running' : 'Scheduled'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GanttChart;
