import React from 'react';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import SectionTitle from '../components/SectionTitle';
import {
  Zap,
  BarChart3,
  Clock,
  Layers,
  Activity,
  Cpu,
  Layout,
  LineChart,
  Repeat
} from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const features = [
    {
      title: "FCFS Scheduling",
      description: "First-Come, First-Served scheduling. Simple, non-preemptive algorithm that executes processes in order of arrival.",
      icon: Zap
    },
    {
      title: "Shortest Job First (SJF)",
      description: "Optimizes throughput by selecting the process with the smallest execution time next.",
      icon: Clock
    },
    {
      title: "Shortest Remaining Time First (SRTF)",
      description: "Preemptive version of SJF that always prioritizes the process closest to completion.",
      icon: Activity
    },
    {
      title: "Round Robin",
      description: "Ensures fairness using time quantums, perfect for time-sharing systems.",
      icon: Repeat
    },
    {
      title: "Priority Scheduling",
      description: "Executes processes based on assigned priority levels, supporting both preemptive and non-preemptive modes.",
      icon: BarChart3
    },
    {
      title: "Animated Gantt Charts",
      description: "Real-time visualization of process execution over time with smooth, logical transitions.",
      icon: Layout
    },
    {
      title: "Ready Queue Visualization",
      description: "Monitor the state of the ready queue as processes move in and out of the CPU.",
      icon: Layers
    },
    {
      title: "Performance Analytics",
      description: "Detailed metrics including waiting time, turnaround time, and CPU utilization.",
      icon: LineChart
    },
    {
      title: "Multi-Core Simulation",
      description: "Advanced simulation of modern multi-core processors, supporting up to 8 cores.",
      icon: Cpu
    }
  ];

  return (
    <div className="pb-20">
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-24 md:py-32 bg-white bg-opacity-[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Comprehensive Scheduling Suite"
            subtitle="Deep dive into a wide range of industry-standard algorithms and high-fidelity visualization tools."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                delay={index * 0.05}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Powerful Visualization"
            subtitle="Get a glimpse of the interactive simulator interface and its analytics capabilities."
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            {/* Mock Header */}
            <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="text-xs text-brand-gray font-mono">Simulator Preview</div>
              <div className="w-10" />
            </div>

            {/* Mock Content */}
            <div className="p-6 lg:p-10 space-y-8">
              {/* Top Panels */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass bg-white/5 p-4 rounded-xl h-48 flex items-center justify-center border border-white/5">
                  <div className="text-center">
                    <Layout className="mx-auto mb-2 text-brand-blue opacity-50" size={32} />
                    <p className="text-brand-gray text-xs">Gantt Chart Placeholder</p>
                  </div>
                </div>
                <div className="glass bg-white/5 p-4 rounded-xl h-48 flex items-center justify-center border border-white/5">
                  <div className="text-center">
                    <LineChart className="mx-auto mb-2 text-brand-cyan opacity-50" size={32} />
                    <p className="text-brand-gray text-xs">Metrics Panel Placeholder</p>
                  </div>
                </div>
              </div>

              {/* Bottom Panels */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="glass bg-white/5 p-4 rounded-xl h-32 flex items-center justify-center border border-white/5">
                  <p className="text-brand-gray text-xs">Process Table</p>
                </div>
                <div className="glass bg-white/5 p-4 rounded-xl h-32 flex items-center justify-center border border-white/5">
                  <p className="text-brand-gray text-xs">Ready Queue</p>
                </div>
                <div className="glass bg-white/5 p-4 rounded-xl h-32 flex items-center justify-center border border-white/5">
                  <p className="text-brand-gray text-xs">CPU Status</p>
                </div>
                <div className="glass bg-white/5 p-4 rounded-xl h-32 flex items-center justify-center border border-white/5">
                  <p className="text-brand-gray text-xs">Controls</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
