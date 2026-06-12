import React, { useState } from 'react';
import { Edit2, Trash2, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProcessTable = ({ processes, onUpdate, onDelete, currentTime, schedule, playbackState }) => {
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [error, setError] = useState('');

  const isIdle = playbackState === 'idle';

  const handleEditClick = (process) => {
    if (!isIdle) return;
    setEditingId(process.id);
    setEditFormData(process);
    setError('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
    setError('');
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  };

  const handleSaveEdit = () => {
    if (editFormData.arrivalTime < 0) {
      setError('Arrival < 0');
      return;
    }
    if (editFormData.burstTime <= 0) {
      setError('Burst <= 0');
      return;
    }
    if (editFormData.priority < 0) {
      setError('Priority < 0');
      return;
    }
    onUpdate(editFormData);
    setEditingId(null);
    setError('');
  };

  const getProcessState = (processId) => {
    if (isIdle) return 'neutral';

    const result = schedule?.results.find(r => r.id === processId);
    if (result && result.endTime <= currentTime) return 'completed';

    const currentSegment = schedule?.segments.find(s => s.startTime <= currentTime && s.endTime > currentTime);
    if (currentSegment && currentSegment.processId === processId) return 'running';

    if (processes.find(p => p.id === processId)?.arrivalTime <= currentTime) return 'waiting';

    return 'neutral';
  };

  const getStateStyles = (state) => {
    switch (state) {
      case 'running': return 'bg-brand-blue/20 text-brand-blue border-l-4 border-brand-blue';
      case 'completed': return 'bg-green-500/10 text-green-400 opacity-60 grayscale-[0.5]';
      case 'waiting': return 'bg-brand-cyan/10 text-brand-cyan';
      default: return '';
    }
  };

  if (processes.length === 0) return null;

  return (
    <div className="glass overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar max-h-[500px]">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-20 bg-[#162a4a] backdrop-blur-md">
            <tr className="text-brand-gray text-[10px] uppercase font-black tracking-widest border-b border-white/10">
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5">ID</th>
              <th className="px-6 py-5">Arrival</th>
              <th className="px-6 py-5">Burst</th>
              <th className="px-6 py-5">Priority</th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <AnimatePresence initial={false}>
              {processes.map((process) => {
                const state = getProcessState(process.id);
                const stateClass = getStateStyles(state);

                return (
                  <motion.tr
                    key={process.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`transition-all duration-300 group ${stateClass} ${state === 'neutral' ? 'hover:bg-white/[0.03]' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-3 h-3 rounded-full shadow-lg relative"
                          style={{ backgroundColor: process.color, boxShadow: `0 0 12px ${process.color}50` }}
                        >
                           {state === 'running' && (
                             <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-40" />
                           )}
                        </div>
                        {state !== 'neutral' && !isIdle && (
                          <motion.span
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-[8px] uppercase px-2 py-0.5 rounded-full bg-white/10 font-black tracking-tighter"
                          >
                            {state}
                          </motion.span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-sm tracking-tight">{process.id}</td>
                    <td className="px-6 py-4">
                      {editingId === process.id ? (
                        <input
                          type="number"
                          name="arrivalTime"
                          min="0"
                          value={editFormData.arrivalTime}
                          onChange={handleEditChange}
                          className="w-20 bg-brand-navy border border-white/10 rounded px-2 py-1 text-xs focus:outline-none focus:border-brand-blue"
                        />
                      ) : (
                        <span className="font-mono text-xs opacity-80">{process.arrivalTime}s</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === process.id ? (
                        <input
                          type="number"
                          name="burstTime"
                          min="1"
                          value={editFormData.burstTime}
                          onChange={handleEditChange}
                          className="w-20 bg-brand-navy border border-white/10 rounded px-2 py-1 text-xs focus:outline-none focus:border-brand-blue"
                        />
                      ) : (
                        <span className="font-mono text-xs opacity-80">{process.burstTime}s</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === process.id ? (
                        <input
                          type="number"
                          name="priority"
                          min="0"
                          value={editFormData.priority}
                          onChange={handleEditChange}
                          className="w-20 bg-brand-navy border border-white/10 rounded px-2 py-1 text-xs focus:outline-none focus:border-brand-blue"
                        />
                      ) : (
                        <span className="font-mono text-xs opacity-80">{process.priority}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {editingId === process.id ? (
                          <>
                            {error && <span className="text-[10px] text-red-400 mr-2 font-bold">{error}</span>}
                            <button
                              onClick={handleSaveEdit}
                              className="p-2 bg-green-500/20 hover:bg-green-500/40 rounded-lg text-green-500 transition-all"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg text-red-500 transition-all"
                            >
                              <X size={14} />
                            </button>
                          </>
                        ) : (
                          <div className={`flex items-center space-x-2 transition-all duration-300 ${isIdle ? 'opacity-0 group-hover:opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
                            <button
                              onClick={() => handleEditClick(process)}
                              className="p-2 bg-brand-blue/10 hover:bg-brand-blue/20 rounded-lg text-brand-blue transition-all"
                              title="Edit Process"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => onDelete(process.id)}
                              className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-all"
                              title="Delete Process"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcessTable;
