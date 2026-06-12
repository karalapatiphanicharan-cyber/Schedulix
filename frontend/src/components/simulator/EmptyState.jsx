import React from 'react';
import { Layout, PlusCircle, Wand2, ArrowRightCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const EmptyState = ({ onGenerate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-16 text-center border-dashed border-2 border-white/10 relative overflow-hidden"
    >
      {/* Decorative background element */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="w-24 h-24 bg-brand-blue/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
          <Layout className="text-brand-blue" size={48} />
        </div>

        <h3 className="text-2xl font-black mb-3 tracking-tight">Ready to simulate?</h3>
        <p className="text-brand-gray text-sm max-w-xs mx-auto mb-10 leading-relaxed opacity-70">
          The simulator is empty. You can manually add processes using the form on the left or quickly populate with random data.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="flex items-center space-x-2 text-brand-gray text-xs font-bold uppercase tracking-widest opacity-60">
            <PlusCircle size={14} className="text-brand-blue" />
            <span>Use manual form</span>
          </div>
          <span className="hidden sm:inline text-white/10">|</span>
          <button
            onClick={onGenerate}
            className="group flex items-center space-x-3 bg-brand-cyan/10 hover:bg-brand-cyan/20 border border-brand-cyan/30 px-6 py-3 rounded-xl text-brand-cyan transition-all active:scale-95"
          >
            <Wand2 size={18} className="group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Generate Random Data</span>
            <ArrowRightCircle size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyState;
