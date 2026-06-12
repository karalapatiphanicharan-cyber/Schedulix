import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", type = "danger" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md glass bg-brand-navy border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className={`p-2 rounded-lg ${type === 'danger' ? 'bg-red-500/20 text-red-400' : 'bg-brand-blue/20 text-brand-blue'}`}>
                  <AlertCircle size={24} />
                </div>
                <button
                  onClick={onCancel}
                  className="text-brand-gray hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-brand-gray text-sm leading-relaxed mb-8">
                {message}
              </p>

              <div className="flex items-center space-x-3">
                <button
                  onClick={onCancel}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium glass hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white shadow-lg transition-all active:scale-95 ${
                    type === 'danger' ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-brand-blue hover:bg-brand-blue/80 shadow-brand-blue/20'
                  }`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;
