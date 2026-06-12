import React from 'react';
import { Layout, PlusCircle, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

const EmptyState = ({ onGenerate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-12 text-center"
    >
      <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Layout className="text-brand-blue" size={40} />
      </div>

      <h3 className="text-xl font-bold mb-2">No Processes Found</h3>
      <p className="text-brand-gray text-sm max-w-xs mx-auto mb-8">
        Start by adding processes manually or generate a sample dataset to visualize the scheduling.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2 text-brand-gray text-sm italic">
          <PlusCircle size={16} />
          <span>Use the form on the left</span>
        </div>
        <span className="hidden sm:inline text-white/10">|</span>
        <button
          onClick={onGenerate}
          className="flex items-center space-x-2 text-brand-cyan hover:text-brand-cyan/80 transition-colors text-sm font-medium"
        >
          <Wand2 size={16} />
          <span>Generate Random Data</span>
        </button>
      </div>
    </motion.div>
  );
};

export default EmptyState;
