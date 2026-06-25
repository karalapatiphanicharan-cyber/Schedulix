import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import {
  Cpu,
  Target,
  Layers,
  Zap,
  BarChart,
  Globe,
  GraduationCap,
  HelpCircle,
  Rocket,
  CheckCircle2,
  AlertCircle,
  Clock,
  Activity,
  Timer,
  ArrowRightLeft,
  ArrowUpNarrowWide
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Information = () => {
  const objectives = [
    { title: "Maximize CPU Utilization", desc: "Keep the CPU as busy as possible to get the most work done per unit of time." },
    { title: "Minimize Waiting Time", desc: "Reduce the total amount of time a process spends waiting in the ready queue." },
    { title: "Minimize Turnaround Time", desc: "Minimize the time taken from the submission of a process to its completion." },
    { title: "Minimize Response Time", desc: "Lower the time from submission until the first response is produced." },
    { title: "Improve Throughput", desc: "Increase the number of processes that complete their execution per time unit." },
    { title: "Ensure Fairness", desc: "Give each process a fair share of the CPU and avoid starvation." }
  ];

  const algorithms = [
    {
      name: "First Come First Served (FCFS)",
      icon: Clock,
      color: "text-blue-400",
      definition: "Executes processes in the order they arrive in the ready queue (FIFO).",
      advantages: ["Simple to understand and implement.", "Fair in terms of arrival order.", "No starvation."],
      disadvantages: ["Convoy Effect: Short processes wait behind long ones.", "High average waiting time.", "Non-preemptive."]
    },
    {
      name: "Shortest Job First (SJF)",
      icon: Timer,
      color: "text-cyan-400",
      definition: "Selects the process with the smallest execution time (burst time) next.",
      advantages: ["Proven to be optimal for minimizing average waiting time.", "Efficient for batch systems."],
      disadvantages: ["Difficult to know the length of the next CPU burst.", "Can lead to starvation for long processes.", "Non-preemptive."]
    },
    {
      name: "Shortest Remaining Time First (SRTF)",
      icon: Activity,
      color: "text-emerald-400",
      definition: "Preemptive version of SJF. Switches to a process with a shorter remaining time.",
      advantages: ["Very low average waiting time.", "Highly responsive for short tasks."],
      disadvantages: ["Requires frequent context switching.", "Potential for starvation of long-running tasks.", "Overhead for monitoring remaining time."]
    },
    {
      name: "Round Robin (RR)",
      icon: ArrowRightLeft,
      color: "text-purple-400",
      definition: "Each process gets a small unit of CPU time (time quantum) in a cyclic order.",
      advantages: ["Excellent for time-sharing systems.", "Ensures fair CPU allocation.", "No starvation."],
      disadvantages: ["Performance highly dependent on the time quantum.", "High context-switching overhead if quantum is too small.", "Poor performance for similar length processes."]
    },
    {
      name: "Priority Scheduling",
      icon: ArrowUpNarrowWide,
      color: "text-amber-400",
      definition: "Allocates the CPU to the process with the highest priority level.",
      advantages: ["Critical tasks can be executed immediately.", "Flexible for different system requirements."],
      disadvantages: ["Can lead to starvation for low-priority processes.", "Requires 'aging' to solve starvation issues.", "Complexity in assigning priorities."]
    }
  ];

  const metrics = [
    { name: "Waiting Time", desc: "The sum of the periods spent waiting in the ready queue." },
    { name: "Turnaround Time", desc: "The interval from the time of submission of a process to the time of completion." },
    { name: "Response Time", desc: "The time from submission until the first response is produced." },
    { name: "Throughput", desc: "The number of processes that are completed per unit time." },
    { name: "CPU Utilization", desc: "The percentage of time the CPU is busy executing tasks." },
    { name: "Context Switches", desc: "The process of storing and restoring the state of a CPU so that execution can be resumed from the same point at a later time." }
  ];

  const faqs = [
    { q: "Which scheduling algorithm is best?", a: "There is no single 'best' algorithm. FCFS is simple, SJF is optimal for waiting time, Round Robin is best for time-sharing, and Priority is best for mission-critical systems." },
    { q: "What is starvation?", a: "Starvation occurs when low-priority or long processes wait indefinitely because higher-priority or shorter processes keep entering the queue." },
    { q: "What is aging?", a: "Aging is a technique used to gradually increase the priority of processes that wait in the system for a long time, preventing starvation." },
    { q: "Why is Round Robin widely used?", a: "Because it provides a fair and predictable response time for all users in a multi-user or multi-tasking environment." },
    { q: "What is a time quantum?", a: "A small unit of time (usually 10-100ms) assigned to a process in Round Robin scheduling before it is preempted." },
    { q: "Why are Gantt Charts useful?", a: "They provide a clear, chronological visualization of process execution and context switches over time." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block p-3 rounded-2xl bg-brand-blue/10 mb-6"
        >
          <Cpu size={48} className="text-brand-blue" />
        </motion.div>
        <SectionTitle
          title="CPU Scheduling Information"
          subtitle="A comprehensive guide to understanding the brain of the operating system."
        />
      </div>

      {/* Section 1: What is CPU Scheduling? */}
      <section className="mb-24">
        <div className="glass p-8 md:p-12">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue">
              <Layers size={28} />
            </div>
            <h2 className="text-3xl font-bold">What is CPU Scheduling?</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="text-brand-gray space-y-6 leading-relaxed">
              <p>
                CPU Scheduling is a process that allows one process to use the CPU while the execution of another process is on hold (in waiting state) due to unavailability of any resource like I/O etc., thereby making full use of CPU.
              </p>
              <p>
                In a multi-programming system, many processes may be in the ready queue at the same time. The operating system must decide which of these processes will be allocated the CPU for execution. This decision-making process is handled by the CPU Scheduler.
              </p>
              <p>
                Efficient scheduling improves system performance by maximizing throughput and minimizing the latency of tasks.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-center">
              <h4 className="text-white font-bold mb-4">Why is it important?</h4>
              <ul className="space-y-3">
                {[
                  "Enables multi-tasking and concurrency",
                  "Ensures fair distribution of CPU time",
                  "Maximizes system performance and throughput",
                  "Provides responsive user experience"
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-sm text-brand-gray">
                    <CheckCircle2 size={16} className="text-brand-blue" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Objectives */}
      <section className="mb-24">
        <SectionTitle
          title="Objectives of CPU Scheduling"
          subtitle="The core goals every scheduling strategy strives to achieve."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectives.map((obj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 hover:border-brand-blue/30 transition-colors"
            >
              <h3 className="text-lg font-bold mb-3 text-white">{obj.title}</h3>
              <p className="text-brand-gray text-sm leading-relaxed">{obj.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 3: Types of Scheduling */}
      <section className="mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass p-8 border-l-4 border-l-brand-cyan">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Zap size={24} className="text-brand-cyan mr-3" />
              Non-Preemptive
            </h3>
            <p className="text-brand-gray mb-6 leading-relaxed">
              In this type, once a process starts executing, it cannot be interrupted until it either terminates or moves to a waiting state (e.g., for I/O). The CPU remains allocated to that process for its entire burst.
            </p>
            <div className="bg-white/5 p-4 rounded-lg mb-4">
              <span className="text-xs font-bold uppercase text-brand-cyan">Characteristics</span>
              <p className="text-sm text-brand-gray mt-2">Rigid, predictable for single tasks, but can cause long waits for others.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["FCFS", "SJF (Standard)"].map(tag => (
                <span key={tag} className="px-3 py-1 bg-brand-cyan/10 text-brand-cyan text-xs font-bold rounded-full">{tag}</span>
              ))}
            </div>
          </div>
          <div className="glass p-8 border-l-4 border-l-brand-blue">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Zap size={24} className="text-brand-blue mr-3" />
              Preemptive
            </h3>
            <p className="text-brand-gray mb-6 leading-relaxed">
              The OS can interrupt a running process and reassign the CPU to another process. Preemption usually happens when a higher-priority process arrives or a time slice expires.
            </p>
            <div className="bg-white/5 p-4 rounded-lg mb-4">
              <span className="text-xs font-bold uppercase text-brand-blue">Characteristics</span>
              <p className="text-sm text-brand-gray mt-2">Flexible, highly responsive, but requires context switching overhead.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Round Robin", "SRTF", "Priority (Preemptive)"].map(tag => (
                <span key={tag} className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-bold rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Supported Algorithms */}
      <section className="mb-24">
        <SectionTitle
          title="Supported Algorithms"
          subtitle="A detailed look at the scheduling strategies implemented in Schedulix."
        />
        <div className="space-y-8">
          {algorithms.map((algo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 bg-white/5 rounded-xl ${algo.color}`}>
                    <algo.icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold">{algo.name}</h3>
                </div>
              </div>
              <p className="text-brand-gray mb-8 leading-relaxed italic border-l-2 border-white/10 pl-4">
                "{algo.definition}"
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-emerald-400 font-bold mb-4 flex items-center text-sm uppercase tracking-wider">
                    <CheckCircle2 size={16} className="mr-2" /> Advantages
                  </h4>
                  <ul className="space-y-3">
                    {algo.advantages.map((adv, j) => (
                      <li key={j} className="text-sm text-brand-gray flex items-start">
                        <span className="mr-2 mt-1 w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                        {adv}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-rose-400 font-bold mb-4 flex items-center text-sm uppercase tracking-wider">
                    <AlertCircle size={16} className="mr-2" /> Disadvantages
                  </h4>
                  <ul className="space-y-3">
                    {algo.disadvantages.map((dis, j) => (
                      <li key={j} className="text-sm text-brand-gray flex items-start">
                        <span className="mr-2 mt-1 w-1 h-1 rounded-full bg-rose-400 shrink-0" />
                        {dis}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 5: Metrics */}
      <section className="mb-24">
        <SectionTitle
          title="Performance Metrics"
          subtitle="How we measure and analyze the efficiency of a scheduling strategy."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, i) => (
            <div key={i} className="glass p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-4">
                <BarChart size={20} />
              </div>
              <h4 className="font-bold mb-2 text-white">{metric.name}</h4>
              <p className="text-xs text-brand-gray leading-relaxed">{metric.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: Gantt Charts */}
      <section className="mb-24">
        <div className="glass p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Activity size={120} className="text-brand-blue" />
          </div>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Understanding Gantt Charts</h2>
            <p className="text-brand-gray mb-6 leading-relaxed">
              A Gantt Chart is a type of bar chart that illustrates a project schedule. In CPU scheduling, it is used to show which process was executing at any given point in time.
            </p>
            <p className="text-brand-gray mb-8 leading-relaxed">
              It provides a clear, chronological visualization of process execution and context switches over time. By looking at a Gantt chart, you can easily see which processes were running, which were waiting, and when the CPU was idle.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: Real World Applications */}
      <section className="mb-24">
        <div className="glass p-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Globe size={24} className="text-brand-cyan mr-3" />
            Real World Applications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Operating Systems", desc: "Linux uses CFS (Completely Fair Scheduler), while Windows uses a multi-level feedback queue." },
              { title: "Cloud Computing", desc: "Scheduling resources among virtual machines to ensure high utilization and performance." },
              { title: "Servers", desc: "Web and database servers use scheduling to handle thousands of concurrent requests efficiently." },
              { title: "Embedded Systems", desc: "Real-time operating systems (RTOS) use priority-based scheduling for time-critical tasks." },
              { title: "Mobile OS", desc: "Android and iOS optimize scheduling to balance performance with battery life." },
              { title: "Data Centers", desc: "Orchestrating massive workloads across thousands of physical and virtual nodes." }
            ].map((app, i) => (
              <div key={i} className="bg-white/5 p-4 rounded-xl">
                <h4 className="font-bold text-white mb-2">{app.title}</h4>
                <p className="text-sm text-brand-gray">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: FAQ */}
      <section className="mb-24">
        <div className="flex items-center space-x-4 mb-10">
          <div className="p-2 bg-yellow-400/10 rounded-lg text-yellow-400">
            <HelpCircle size={24} />
          </div>
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="glass p-6">
              <h4 className="font-bold text-white mb-3 flex items-start">
                <span className="text-brand-blue mr-2">Q:</span>
                {faq.q}
              </h4>
              <p className="text-sm text-brand-gray leading-relaxed flex items-start">
                <span className="text-brand-cyan mr-2 font-bold italic">A:</span>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 9: Learn with Schedulix */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center glass p-12 bg-gradient-to-b from-white/5 to-brand-blue/5 border-brand-blue/20"
      >
        <Rocket size={48} className="mx-auto mb-6 text-brand-blue" />
        <h2 className="text-3xl font-bold mb-6 text-white">Learn with Schedulix</h2>
        <p className="text-brand-gray mb-10 max-w-3xl mx-auto text-lg leading-relaxed">
          "Seeing is believing. Reading theory is essential, but seeing algorithms execute visually makes learning much easier. Use our tools to bridge the gap between theory and practice."
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <Link
            to="/simulator"
            className="inline-block bg-brand-blue hover:bg-blue-600 text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg shadow-brand-blue/20 text-center"
          >
            Open the Simulator
          </Link>
          <Link
            to="/compare"
            className="inline-block bg-white/5 hover:bg-white/10 text-white px-10 py-4 rounded-full font-bold transition-all border border-white/10 text-center"
          >
            Compare Strategies
          </Link>
        </div>
        <p className="mt-8 text-brand-gray text-sm italic">
          Try different algorithms, adjust time quantums, and learn visually through experimentation.
        </p>
      </motion.div>
    </div>
  );
};

export default Information;
