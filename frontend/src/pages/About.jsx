import React from 'react';
import SectionTitle from '../components/SectionTitle';
import {
  BookOpen,
  Target,
  Lightbulb,
  Rocket,
  Map,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  const logoUrl = "/schedulix-logo.png";
  const sections = [
    {
      title: "What is CPU Scheduling?",
      content: "CPU scheduling is the process that allows one process to use the CPU while the execution of another process is on hold due to unavailability of any resource like I/O etc., thereby making full use of CPU. The aim of CPU scheduling is to make the system efficient, fast, and fair.",
      icon: BookOpen,
      color: "text-brand-blue"
    },
    {
      title: "Why Schedulix?",
      content: "Schedulix was created to bridge the gap between theoretical operating system concepts and practical understanding. By providing a high-fidelity visual simulator, we help students and enthusiasts grasp the nuances of different scheduling strategies through interactive experimentation.",
      icon: Target,
      color: "text-brand-cyan"
    },
    {
      title: "Educational Benefits",
      content: "Users can observe how change in arrival times, burst times, and priorities affects overall system performance. The real-time Gantt charts and metrics provide instant feedback, making complex concepts like preemption and time quantums easy to visualize.",
      icon: Lightbulb,
      color: "text-yellow-400"
    }
  ];

  const roadmap = [
    { phase: "Phase 1", title: "Foundation & UI", status: "Completed", items: ["Responsive Layout", "Glassmorphism UI", "Branding Integration", "Vite + Express Setup"] },
    { phase: "Phase 2", title: "Core Algorithms", status: "Planned", items: ["FCFS & SJF Implementation", "Preemptive Algorithms (SRTF)", "Round Robin Logic", "Interactive Gantt Charts"] },
    { phase: "Phase 3", title: "Advanced Analysis", status: "Planned", items: ["Algorithm Comparison Engine", "Exportable Metrics", "Process Import/Export", "Step-by-step Playback"] },
    { phase: "Phase 4", title: "The Multi-Core Era", status: "Planned", items: ["Multi-core CPU Simulation", "Load Balancing Algorithms", "Power Efficiency Metrics", "Advanced Analytics"] }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center mb-12"
      >
        <img src={logoUrl} alt="Schedulix Logo" className="h-16 mb-8" />
        <SectionTitle
          title="About Schedulix"
          subtitle="The mission to make operating system concepts accessible and beautiful."
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass p-8"
          >
            <section.icon size={32} className={`${section.color} mb-6`} />
            <h3 className="text-xl font-bold mb-4">{section.title}</h3>
            <p className="text-brand-gray text-sm leading-relaxed">{section.content}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass p-8 md:p-12">
        <div className="flex items-center space-x-3 mb-10">
          <Map className="text-brand-blue" />
          <h2 className="text-2xl font-bold">Project Roadmap</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {roadmap.map((stage, index) => (
            <div key={index} className="relative">
              {index < roadmap.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-full h-[2px] bg-white/5 -z-10" />
              )}
              <div className="flex items-center space-x-2 mb-4">
                <div className={`w-3 h-3 rounded-full ${stage.status === 'Completed' ? 'bg-green-500' : 'bg-brand-blue/30'}`} />
                <span className="text-xs font-bold uppercase tracking-widest text-brand-gray">{stage.phase}</span>
              </div>
              <h4 className="font-bold mb-4 text-white">{stage.title}</h4>
              <ul className="space-y-2">
                {stage.items.map((item, i) => (
                  <li key={i} className="flex items-start space-x-2 text-xs text-brand-gray">
                    <CheckCircle2 size={12} className={stage.status === 'Completed' ? 'text-green-500' : 'text-brand-gray/30'} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 text-center glass p-12 border-brand-blue/20"
      >
        <Rocket size={48} className="mx-auto mb-6 text-brand-blue" />
        <h2 className="text-2xl font-bold mb-4">Ready to start exploring?</h2>
        <p className="text-brand-gray mb-8 max-w-xl mx-auto">
          Join us in visualizing the core of operating systems. Schedulix is open for exploration and learning.
        </p>
        <Link
          to="/simulator"
          className="inline-block bg-brand-blue hover:bg-blue-600 text-white px-8 py-3 rounded-full font-bold transition-all"
        >
          Go to Simulator
        </Link>
      </motion.div>
    </div>
  );
};

export default About;
