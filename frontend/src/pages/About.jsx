import React from 'react';
import SectionTitle from '../components/SectionTitle';
import {
  BookOpen,
  Target,
  Lightbulb,
  Rocket,
  Cpu,
  BarChart3,
  GitCompare,
  Zap,
  Users,
  Layout,
  Download,
  Dices,
  Clock,
  Timer,
  Activity,
  ArrowRightLeft,
  ArrowUpNarrowWide,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { motion } from 'framer-motion';
import FeatureCard from '../components/FeatureCard';
import { Link } from 'react-router-dom';

const About = () => {
  const sections = [
    {
      title: "What is CPU Scheduling?",
      content: "CPU scheduling is a fundamental operating system process that determines which process in the ready queue is allocated the CPU. By efficiently managing execution order, scheduling maximizes CPU utilization, ensures fairness, and minimizes latency, making it the backbone of multi-tasking systems.",
      icon: BookOpen,
      color: "text-brand-blue"
    },
    {
      title: "Why Schedulix?",
      content: "Understanding low-level OS concepts can be challenging through theory alone. Schedulix bridges this gap by offering a high-fidelity visual environment where students and developers can experiment with different algorithms, seeing exactly how they behave in real-time.",
      icon: Target,
      color: "text-brand-cyan"
    },
    {
      title: "Educational Benefits",
      content: "By visualizing preemption, time quantums, and priority handling, Schedulix turns abstract mathematical models into intuitive experiences. Users gain deep insights into performance trade-offs, helping them master the complexities of modern process management.",
      icon: Lightbulb,
      color: "text-yellow-400"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <SectionTitle
        title="About Schedulix"
        subtitle="Bridging the gap between Operating System theory and practical visualization."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
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

      <div className="mb-24">
        <SectionTitle
          title="Key Features"
          subtitle="Explore the powerful capabilities that make Schedulix the ultimate learning tool."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={Cpu}
            title="Interactive Simulator"
            description="Experience real-time execution of processes with adjustable speeds and step-by-step playback controls."
            delay={0.1}
          />
          <FeatureCard
            icon={BarChart3}
            title="Real-Time Gantt Charts"
            description="Visualize process scheduling and context switching through dynamic, auto-scrolling Gantt chart representations."
            delay={0.2}
          />
          <FeatureCard
            icon={GitCompare}
            title="Side-by-Side Comparison"
            description="Run two different algorithms simultaneously with the same process set to compare their efficiency directly."
            delay={0.3}
          />
          <FeatureCard
            icon={Zap}
            title="Live Performance Metrics"
            description="Monitor Waiting Time, Turnaround Time, CPU Utilization, and Throughput as the simulation progresses."
            delay={0.4}
          />
          <FeatureCard
            icon={Dices}
            title="Random Process Generation"
            description="Quickly populate your simulation with randomized workloads to test edge cases and algorithm robustness."
            delay={0.5}
          />
          <FeatureCard
            icon={BookOpen}
            title="Educational Experience"
            description="Learn through hands-on experimentation with a design optimized for clarity and conceptual understanding."
            delay={0.6}
          />
          <FeatureCard
            icon={Layout}
            title="Modern Interface"
            description="A sleek, responsive, glassmorphism-inspired UI designed for both desktop and mobile learning environments."
            delay={0.7}
          />
          <FeatureCard
            icon={Download}
            title="Exportable Reports"
            description="Save your simulation results and comparisons in PDF, JSON, or CSV formats for further academic analysis."
            delay={0.8}
          />
        </div>
      </div>

      <div className="mb-24">
        <SectionTitle
          title="Supported Algorithms"
          subtitle="A comprehensive suite of classic and modern CPU scheduling strategies."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "First Come First Served (FCFS)",
              desc: "The simplest scheduling algorithm that executes processes in the order they arrive in the ready queue.",
              icon: Clock,
              color: "text-blue-400"
            },
            {
              name: "Shortest Job First (SJF)",
              desc: "A non-preemptive strategy that selects the process with the smallest execution time to minimize average waiting time.",
              icon: Timer,
              color: "text-cyan-400"
            },
            {
              name: "Shortest Remaining Time First (SRTF)",
              desc: "The preemptive version of SJF that always switches to a process with a shorter remaining burst time.",
              icon: Activity,
              color: "text-emerald-400"
            },
            {
              name: "Round Robin (RR)",
              desc: "Designed for time-sharing systems, it assigns a fixed time quantum to each process in a cyclic order.",
              icon: ArrowRightLeft,
              color: "text-purple-400"
            },
            {
              name: "Priority Scheduling",
              desc: "Allocates the CPU based on assigned priority levels, where higher priority processes are executed first.",
              icon: ArrowUpNarrowWide,
              color: "text-amber-400"
            }
          ].map((algo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 border-l-4 border-l-brand-blue/50"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`p-2 rounded-lg bg-white/5 ${algo.color}`}>
                  <algo.icon size={20} />
                </div>
                <h4 className="font-bold text-white">{algo.name}</h4>
              </div>
              <p className="text-brand-gray text-sm leading-relaxed">{algo.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass p-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Users className="text-brand-blue" />
            <h3 className="text-2xl font-bold">Who Should Use Schedulix?</h3>
          </div>
          <ul className="space-y-4">
            {[
              "Computer Science students mastering OS internals",
              "Operating Systems learners exploring scheduling theory",
              "College faculty for classroom demonstrations",
              "Developers preparing for technical interviews",
              "Self-learning enthusiasts interested in system design",
              "Anyone wanting to visualize complex algorithms"
            ].map((item, i) => (
              <li key={i} className="flex items-center space-x-3 text-brand-gray">
                <CheckCircle2 size={18} className="text-brand-blue flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass p-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <GraduationCap className="text-brand-cyan" />
            <h3 className="text-2xl font-bold">What Users Can Learn</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Average Waiting Time",
              "Turnaround Time",
              "Response Time",
              "CPU Utilization",
              "System Throughput",
              "Context Switching",
              "Gantt Chart Interpretation",
              "Algorithm Trade-offs"
            ].map((concept, i) => (
              <div key={i} className="bg-white/5 p-3 rounded-lg border border-white/5 text-sm text-brand-gray text-center hover:bg-brand-blue/10 hover:border-brand-blue/20 transition-colors">
                {concept}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-24 text-center glass p-12 border-brand-blue/20 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-50" />
        <h3 className="text-2xl font-bold mb-6 italic text-white/90">Our Mission</h3>
        <p className="text-xl text-brand-gray max-w-4xl mx-auto leading-relaxed">
          "Schedulix aims to simplify Operating System scheduling concepts through interactive visualization, helping learners bridge the gap between theory and practical understanding."
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center glass p-12 border-brand-blue/20 bg-gradient-to-b from-white/5 to-brand-blue/5"
      >
        <Rocket size={48} className="mx-auto mb-6 text-brand-blue" />
        <h2 className="text-3xl font-bold mb-4">Ready to Master CPU Scheduling?</h2>
        <p className="text-brand-gray mb-8 max-w-xl mx-auto text-lg">
          Dive into the interactive world of Schedulix and see how algorithms shape system performance.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/simulator"
            className="w-full sm:w-auto inline-block bg-brand-blue hover:bg-blue-600 text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg shadow-brand-blue/20"
          >
            Launch Simulator
          </Link>
          <Link
            to="/compare"
            className="w-full sm:w-auto inline-block bg-white/5 hover:bg-white/10 text-white px-10 py-4 rounded-full font-bold transition-all border border-white/10"
          >
            Compare Algorithms
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
