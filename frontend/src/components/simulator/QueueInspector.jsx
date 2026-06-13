import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ListFilter, ChevronDown, ChevronUp, Play, CheckCircle2, Clock } from 'lucide-react';

const QueueItem = ({ process, status }) => (
  <motion.div
    layout
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 10 }}
    className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 group hover:bg-white/10 transition-all"
  >
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs" style={{ backgroundColor: `${process.color}20`, color: process.color }}>
        {process.id}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-white uppercase">{process.id}</span>
        <span className="text-[8px] text-brand-gray font-bold uppercase tracking-widest">
          {status === 'running' ? 'Active' : status === 'ready' ? `Arrived @ ${process.arrivalTime}s` : `Finished @ ${process.endTime}s`}
        </span>
      </div>
    </div>
    <div className="text-right">
      <span className="text-[10px] font-mono text-brand-gray">Burst: {process.burstTime}s</span>
    </div>
  </motion.div>
);

const QueueSection = ({ title, icon: Icon, processes, status, color }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="space-y-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 glass hover:bg-white/5 transition-all rounded-xl"
      >
        <div className="flex items-center space-x-3">
          <div className={`p-1.5 rounded-lg ${color} bg-opacity-10 text-opacity-100`}>
            <Icon size={14} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">{title}</span>
          <span className="px-2 py-0.5 bg-white/5 rounded-full text-[8px] font-bold text-brand-gray">
            {processes.length}
          </span>
        </div>
        {isOpen ? <ChevronUp size={14} className="text-brand-gray" /> : <ChevronDown size={14} className="text-brand-gray" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-2 px-1"
          >
            {processes.length > 0 ? (
              processes.map(p => <QueueItem key={p.id} process={p} status={status} />)
            ) : (
              <p className="text-[10px] text-brand-gray/30 italic text-center py-4 uppercase tracking-widest font-black">Queue is empty</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const QueueInspector = ({ processes = [], currentTime = 0, schedule = null }) => {
  const isMultiCore = Array.isArray(schedule?.segments) && Array.isArray(schedule?.segments[0]);
  const allSegments = isMultiCore ? schedule.segments.flat() : (schedule?.segments || []);

  const runningIds = new Set(
    allSegments
      .filter(s => s && s.startTime <= currentTime && s.endTime > currentTime && !s.isIdle)
      .map(s => s.processId)
  );

  const completedIds = new Set(
    schedule?.results
      ?.filter(r => (r.endTime ?? Infinity) <= currentTime)
      .map(r => r.id) || []
  );

  const readyProcesses = processes.filter(p =>
    p.arrivalTime <= currentTime &&
    !runningIds.has(p.id) &&
    !completedIds.has(p.id)
  );

  const runningProcesses = processes.filter(p => runningIds.has(p.id));

  const completedProcesses = schedule?.results
    ?.filter(r => completedIds.has(r.id))
    .sort((a, b) => b.endTime - a.endTime) || [];

  return (
    <div className="glass p-6 space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold flex items-center space-x-2">
          <ListFilter size={18} className="text-brand-blue" />
          <span>Queue Inspector</span>
        </h3>
      </div>

      <div className="space-y-4">
        <QueueSection
          title="Running Queue"
          icon={Play}
          processes={runningProcesses}
          status="running"
          color="text-brand-blue bg-brand-blue"
        />
        <QueueSection
          title="Ready Queue"
          icon={Clock}
          processes={readyProcesses}
          status="ready"
          color="text-brand-cyan bg-brand-cyan"
        />
        <QueueSection
          title="Completed Queue"
          icon={CheckCircle2}
          processes={completedProcesses}
          status="completed"
          color="text-green-500 bg-green-500"
        />
      </div>
    </div>
  );
};

export default QueueInspector;
