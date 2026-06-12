import React, { useState } from 'react';
import { Edit2, Trash2, Check, X } from 'lucide-react';

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
      case 'running': return 'bg-brand-blue/20 text-brand-blue border-l-2 border-brand-blue';
      case 'completed': return 'bg-green-500/10 text-green-400 opacity-60';
      case 'waiting': return 'bg-brand-cyan/10 text-brand-cyan';
      default: return '';
    }
  };

  if (processes.length === 0) return null;

  return (
    <div className="glass overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-brand-gray text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">ID</th>
              <th className="px-6 py-4 font-semibold">Arrival</th>
              <th className="px-6 py-4 font-semibold">Burst</th>
              <th className="px-6 py-4 font-semibold">Priority</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {processes.map((process) => {
              const state = getProcessState(process.id);
              const stateClass = getStateStyles(state);

              return (
                <tr key={process.id} className={`transition-all group ${stateClass} ${state === 'neutral' ? 'hover:bg-white/[0.02]' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full shadow-lg"
                        style={{ backgroundColor: process.color, boxShadow: `0 0 8px ${process.color}40` }}
                      />
                      {state !== 'neutral' && !isIdle && (
                        <span className="text-[8px] uppercase px-1 rounded bg-white/10 font-bold">{state}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{process.id}</td>
                  <td className="px-6 py-4">
                    {editingId === process.id ? (
                      <input
                        type="number"
                        name="arrivalTime"
                        min="0"
                        value={editFormData.arrivalTime}
                        onChange={handleEditChange}
                        className="w-16 bg-brand-navy border border-white/10 rounded p-1 text-xs focus:outline-none focus:border-brand-blue"
                      />
                    ) : (
                      <span className="font-mono">{process.arrivalTime}</span>
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
                        className="w-16 bg-brand-navy border border-white/10 rounded p-1 text-xs focus:outline-none focus:border-brand-blue"
                      />
                    ) : (
                      <span className="font-mono">{process.burstTime}</span>
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
                        className="w-16 bg-brand-navy border border-white/10 rounded p-1 text-xs focus:outline-none focus:border-brand-blue"
                      />
                    ) : (
                      <span className="font-mono">{process.priority}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {editingId === process.id ? (
                        <>
                          {error && <span className="text-[10px] text-red-400 mr-2">{error}</span>}
                          <button
                            onClick={handleSaveEdit}
                            className="p-1.5 bg-green-500/20 hover:bg-green-500/40 rounded text-green-500 transition-colors"
                          >
                            <Check size={14} />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="p-1.5 bg-red-500/20 hover:bg-red-500/40 rounded text-red-500 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </>
                      ) : (
                        <div className={`flex items-center space-x-2 transition-opacity ${isIdle ? 'opacity-0 group-hover:opacity-100' : 'opacity-0 pointer-events-none'}`}>
                          <button
                            onClick={() => handleEditClick(process)}
                            className="p-1.5 bg-brand-blue/10 hover:bg-brand-blue/20 rounded text-brand-blue transition-colors"
                            title="Edit Process"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => onDelete(process.id)}
                            className="p-1.5 bg-red-500/10 hover:bg-red-500/20 rounded text-red-400 transition-colors"
                            title="Delete Process"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcessTable;
