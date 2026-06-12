import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ title, description, icon: Icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass-card p-6 flex flex-col h-full"
    >
      <div className="bg-brand-blue bg-opacity-10 p-3 rounded-lg w-fit mb-4">
        {Icon && <Icon size={24} className="text-brand-blue" />}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-brand-gray text-sm leading-relaxed flex-grow">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
