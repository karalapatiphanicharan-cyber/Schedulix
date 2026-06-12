import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const GanttChart = ({ segments, currentTime, totalTime }) => {
  const containerRef = useRef(null);

  // Auto-scroll as simulation progresses
  useEffect(() => {
    if (containerRef.current && currentTime > 0) {
      const containerWidth = containerRef.current.offsetWidth;
      const totalWidth = (totalTime || currentTime) * 60; // 60px per unit
      const currentPos = currentTime * 60;

      if (currentPos > containerWidth / 2) {
        containerRef.current.scrollLeft = currentPos - containerWidth / 2;
      }
    }
  }, [currentTime, totalTime]);

  if (!segments || segments.length === 0) {
    return (
      <div className="glass p-6 min-h-[200px]">
        <h3 className="text-lg font-bold mb-6">Gantt Chart</h3>
        <div className="w-full h-24 bg-white/5 rounded-lg border border-dashed border-white/10 flex items-center justify-center">
          <p className="text-brand-gray text-sm italic">Gantt chart visualization will appear here in Phase 3.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass p-6 min-h-[200px] overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Gantt Chart</h3>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-brand-gray uppercase tracking-widest">Time</span>
          <span className="text-lg font-mono font-bold text-brand-cyan">{currentTime.toFixed(1)}</span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="w-full overflow-x-auto pb-4 custom-scrollbar scroll-smooth"
      >
        <div className="relative h-24 flex items-end min-w-max pr-12">
          {segments.map((segment, index) => {
            const isVisible = segment.startTime <= currentTime;
            if (!isVisible) return null;

            const duration = Math.min(segment.endTime, currentTime) - segment.startTime;
            const width = duration * 60; // 60px per time unit
            const fullWidth = (segment.endTime - segment.startTime) * 60;

            return (
              <div
                key={index}
                className="relative h-16 flex flex-col items-center justify-center transition-all"
                style={{ width: `${fullWidth}px` }}
              >
                {/* Segment Box */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  originX={0}
                  className={`absolute inset-y-0 left-0 rounded-md border border-white/10 flex items-center justify-center overflow-hidden ${
                    segment.isIdle ? 'bg-white/5 border-dashed' : ''
                  }`}
                  style={{
                    width: `${width}px`,
                    backgroundColor: segment.isIdle ? undefined : segment.color + '40',
                    borderColor: segment.isIdle ? undefined : segment.color
                  }}
                >
                  <span className={`text-[10px] font-bold ${segment.isIdle ? 'text-brand-gray' : 'text-white'}`}>
                    {segment.processId}
                  </span>
                </motion.div>

                {/* Time Markers */}
                <div className="absolute top-full mt-2 left-0 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-[1px] h-1 bg-white/20" />
                  <span className="text-[9px] font-mono text-brand-gray mt-1">{segment.startTime}</span>
                </div>

                {index === segments.length - 1 && currentTime >= segment.endTime && (
                   <div className="absolute top-full mt-2 right-0 translate-x-1/2 flex flex-col items-center">
                    <div className="w-[1px] h-1 bg-white/20" />
                    <span className="text-[9px] font-mono text-brand-gray mt-1">{segment.endTime}</span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Current Time Indicator */}
          <div
            className="absolute top-0 bottom-6 w-[2px] bg-brand-cyan shadow-[0_0_10px_rgba(34,211,238,0.5)] z-10 transition-all pointer-events-none"
            style={{ left: `${currentTime * 60}px` }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-brand-cyan" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
