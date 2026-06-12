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
    <div className="glass p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Add Process</h3>
        <button
          onClick={handleReset}
          className="p-1.5 hover:bg-white/5 rounded-lg text-brand-gray transition-colors"
          title="Reset Form"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-brand-gray">Process ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full bg-brand-navy border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-brand-blue"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-brand-gray">Arrival Time</label>
            <input
              type="number"
              name="arrivalTime"
              min="0"
              value={formData.arrivalTime}
              onChange={handleChange}
              className="w-full bg-brand-navy border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-brand-blue"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-brand-gray">Burst Time</label>
            <input
              type="number"
              name="burstTime"
              min="1"
              value={formData.burstTime}
              onChange={handleChange}
              className="w-full bg-brand-navy border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-brand-blue"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-brand-gray">Priority</label>
            <input
              type="number"
              name="priority"
              min="0"
              value={formData.priority}
              onChange={handleChange}
              className="w-full bg-brand-navy border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-xs mt-1">{error}</p>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 bg-brand-blue hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition-all"
        >
          <Plus size={16} />
          <span>Add Process</span>
        </button>
      </form>
    </div>
  );
};

export default ProcessForm;
