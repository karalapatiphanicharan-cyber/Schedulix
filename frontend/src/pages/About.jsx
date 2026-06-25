import React from 'react';
import SectionTitle from '../components/SectionTitle';
import {
  BookOpen,
  Target,
  Lightbulb,
  Rocket,
  CheckCircle2,
  Cpu,
  BarChart,
  Users,
  Layers,
  Zap,
  Globe,
  Layout,
  FileText,
  GraduationCap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  const introSections = [
    {
      title: "What is CPU Scheduling?",
      content: "CPU scheduling is the fundamental process that allows one process to use the CPU while another is waiting, maximizing resource utilization. It's the brain of the operating system's multi-tasking capabilities, ensuring system efficiency, speed, and fairness.",
      icon: BookOpen,
      color: "text-brand-blue"
    },
    {
      title: "Why Schedulix?",
      content: "We created Schedulix to bridge the gap between abstract theoretical concepts and practical understanding. Our high-fidelity visual simulator allows students and developers to see exactly how different strategies impact system performance in real-time.",
      icon: Target,
      color: "text-brand-cyan"
    },
    {
      title: "Educational Benefits",
      content: "By experimenting with arrival times, burst times, and priorities, users gain intuitive insights into complex topics like preemption and time-slicing. Schedulix transforms dry textbook theory into an engaging, interactive learning journey.",
      icon: Lightbulb,
      color: "text-yellow-400"
    }
  ];

  const features = [
    { title: "Interactive Simulator", icon: Cpu, desc: "A powerful playground to configure and run CPU processes dynamically." },
    { title: "Real-Time Gantt Charts", icon: BarChart, desc: "Visualize process execution and context switches with precision." },
    { title: "Dual Comparison", icon: Layers, desc: "Run and compare two different algorithms side-by-side." },
    { title: "Live Metrics", icon: Zap, desc: "Instant calculation of Waiting, Turnaround, and Response times." },
    { title: "Random Generation", icon: Globe, desc: "Quickly test scenarios with automatically generated process datasets." },
    { title: "Educational UX", icon: GraduationCap, desc: "Designed specifically for learning, with expert tips and explanations." },
    { title: "Responsive Design", icon: Layout, desc: "A seamless experience across desktop, tablet, and mobile devices." },
    { title: "Exportable Reports", icon: FileText, desc: "Download your simulation results in PDF, JSON, or CSV formats." }
  ];

  const algorithms = [
    { name: "FCFS", full: "First Come First Served", desc: "Executes processes in the exact order they arrive in the ready queue." },
    { name: "SJF", full: "Shortest Job First", desc: "Selects the process with the smallest burst time next to minimize waiting time." },
    { name: "SRTF", full: "Shortest Remaining Time First", desc: "Preemptive SJF that switches to processes with shorter remaining execution time." },
    { name: "RR", full: "Round Robin", desc: "Assigns a fixed time quantum to each process in a cyclic, fair rotation." },
    { name: "Priority", full: "Priority Scheduling", desc: "Allocates the CPU based on assigned priority levels to ensure critical tasks run first." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <SectionTitle
        title="About Schedulix"
        subtitle="Empowering learners through interactive CPU scheduling visualization."
      />

      {/* Intro Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {introSections.map((section, index) => (
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

      {/* Key Features */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold mb-10 text-center">Key Features of Schedulix</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass p-6 border-white/5 hover:border-brand-blue/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon size={24} className="text-brand-blue" />
              </div>
              <h4 className="font-bold mb-2">{feature.title}</h4>
              <p className="text-xs text-brand-gray leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Supported Algorithms */}
      <div className="mb-24 glass p-8 md:p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
          <Cpu size={200} />
        </div>
        <h2 className="text-3xl font-bold mb-10">Supported Scheduling Algorithms</h2>
        <div className="space-y-6">
          {algorithms.map((algo, index) => (
            <div key={index} className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
              <div className="flex-shrink-0 w-24">
                <span className="text-lg font-black text-brand-cyan">{algo.name}</span>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-1">{algo.full}</h4>
                <p className="text-brand-gray text-sm">{algo.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        {/* Who Should Use */}
        <div className="glass p-8 border-l-4 border-brand-blue">
          <div className="flex items-center space-x-3 mb-6">
            <Users className="text-brand-blue" />
            <h2 className="text-2xl font-bold">Who Should Use Schedulix?</h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "CS Students",
              "OS Learners",
              "College Faculty",
              "Interview Prep",
              "Self-Learners",
              "OS Enthusiasts"
            ].map((item, i) => (
              <li key={i} className="flex items-center space-x-2 text-sm text-brand-gray">
                <CheckCircle2 size={16} className="text-brand-blue" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What Users Can Learn */}
        <div className="glass p-8 border-l-4 border-brand-cyan">
          <div className="flex items-center space-x-3 mb-6">
            <GraduationCap className="text-brand-cyan" />
            <h2 className="text-2xl font-bold">What Users Can Learn</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "Waiting Time",
              "Turnaround Time",
              "Response Time",
              "Throughput",
              "CPU Utilization",
              "Context Switching",
              "Gantt Charts",
              "Strategy Comparison"
            ].map((item, i) => (
              <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-xs text-brand-gray border border-white/10">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center glass p-12 border-brand-blue/20 bg-gradient-to-b from-transparent to-brand-blue/5"
      >
        <Rocket size={48} className="mx-auto mb-6 text-brand-blue" />
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="text-brand-gray mb-10 max-w-2xl mx-auto text-lg leading-relaxed italic">
          "Schedulix aims to simplify Operating System scheduling concepts through interactive visualization, helping learners bridge the gap between theory and practical understanding."
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/simulator"
            className="w-full sm:w-auto bg-brand-blue hover:bg-blue-600 text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg shadow-brand-blue/20"
          >
            Launch Simulator
          </Link>
          <Link
            to="/compare"
            className="w-full sm:w-auto glass hover:bg-white/10 text-white px-10 py-4 rounded-full font-bold transition-all"
          >
            Compare Algorithms
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
