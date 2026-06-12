import React, { useState, useEffect } from 'react';
import { Plus, RotateCcw } from 'lucide-react';

const ProcessForm = ({ onAdd, nextId, existingIds }) => {
  const [formData, setFormData] = useState({
    id: `P${nextId}`,
    arrivalTime: 0,
    burstTime: 1,
    priority: 0,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    setFormData((prev) => ({ ...prev, id: `P${nextId}` }));
  }, [nextId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'id' ? value : parseInt(value) || 0,
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.id.trim()) {
      setError('Process ID is required');
      return;
    }
    if (existingIds.includes(formData.id)) {
      setError('Process ID already exists');
      return;
    }
    if (formData.arrivalTime < 0) {
      setError('Arrival time cannot be negative');
      return;
    }
    if (formData.burstTime <= 0) {
      setError('Burst time must be greater than 0');
      return;
    }
    if (formData.priority < 0) {
      setError('Priority cannot be negative');
      return;
    }

    onAdd(formData);
    setFormData({
      id: `P${nextId + 1}`,
      arrivalTime: 0,
      burstTime: 1,
      priority: 0,
    });
    setError('');
  };

  const handleReset = () => {
    setFormData({
      id: `P${nextId}`,
      arrivalTime: 0,
      burstTime: 1,
      priority: 0,
    });
    setError('');
  };

  return (
    <div className="glass p-5 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Add Process</h3>
        <button
          onClick={handleReset}
          className="p-1.5 hover:bg-white/5 rounded-lg text-brand-gray transition-colors"
          title="Reset Form"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-brand-gray uppercase tracking-wider">Process ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full h-10 bg-brand-navy border border-white/10 rounded-lg px-3 text-sm focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-brand-gray uppercase tracking-wider">Arrival Time</label>
            <input
              type="number"
              name="arrivalTime"
              min="0"
              value={formData.arrivalTime}
              onChange={handleChange}
              className="w-full h-10 bg-brand-navy border border-white/10 rounded-lg px-3 text-sm focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-brand-gray uppercase tracking-wider">Burst Time</label>
            <input
              type="number"
              name="burstTime"
              min="1"
              value={formData.burstTime}
              onChange={handleChange}
              className="w-full h-10 bg-brand-navy border border-white/10 rounded-lg px-3 text-sm focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-brand-gray uppercase tracking-wider">Priority</label>
            <input
              type="number"
              name="priority"
              min="0"
              value={formData.priority}
              onChange={handleChange}
              className="w-full h-10 bg-brand-navy border border-white/10 rounded-lg px-3 text-sm focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-xs mt-1">{error}</p>
        )}

        <button
          type="submit"
          className="w-full h-11 flex items-center justify-center space-x-2 bg-brand-blue hover:bg-blue-600 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-brand-blue/20 active:scale-[0.98]"
        >
          <Plus size={18} />
          <span>Add Process</span>
        </button>
      </form>
    </div>
  );
};

export default ProcessForm;
