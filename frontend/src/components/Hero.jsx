import React from 'react';
import { motion } from 'framer-motion';
import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-16 md:pt-24 pb-20 md:pb-32">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-blue opacity-[0.05] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-cyan opacity-[0.05] blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <img
            src="/schedulix-logo.png"
            alt="Schedulix Logo"
            className="mx-auto h-20 md:h-24 lg:h-28 w-auto object-contain drop-shadow-2xl"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1]"
        >
          Visualize CPU Scheduling <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
            With Precision & Elegance
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-brand-gray max-w-2xl mx-auto mb-10 leading-relaxed opacity-90"
        >
          Master Operating System concepts through high-fidelity interactive simulations,
          real-time execution timelines, and deep performance analytics.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Link
            to="/simulator"
            className="w-full sm:w-auto h-14 flex items-center justify-center space-x-2 bg-brand-blue hover:bg-blue-600 text-white px-8 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-brand-blue/20"
          >
            <Play size={18} fill="currentColor" />
            <span>Launch Simulator</span>
          </Link>
          <button
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto h-14 flex items-center justify-center space-x-2 glass hover:bg-white/10 text-white px-8 rounded-full font-bold transition-all border border-white/10 transform hover:scale-105"
          >
            <Info size={18} />
            <span>Explore Features</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
