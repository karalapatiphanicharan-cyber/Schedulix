import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Target,
  Layers,
  Cpu,
  BarChart3,
  Globe,
  HelpCircle,
  Rocket,
  CheckCircle2,
  AlertCircle,
  Clock,
  Zap,
  Activity,
  Server,
  Cloud,
  Smartphone,
  ShieldCheck
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { Link } from 'react-router-dom';

const Information = () => {
  const objectives = [
    { title: "Maximize CPU Utilization", desc: "Keep the CPU as busy as possible to ensure maximum work is done.", icon: Cpu, color: "text-brand-blue" },
    { title: "Minimize Waiting Time", desc: "Reduce the total time a process spends waiting in the ready queue.", icon: Clock, color: "text-brand-cyan" },
    { title: "Minimize Turnaround Time", desc: "Speed up the total time from process submission to completion.", icon: Zap, color: "text-yellow-400" },
    { title: "Minimize Response Time", desc: "Ensure the system responds quickly to user requests.", icon: Activity, color: "text-green-400" },
    { title: "Increase Throughput", desc: "Maximize the number of processes completed per unit of time.", icon: Layers, color: "text-purple-400" },
    { title: "Fair Allocation", desc: "Ensure every process gets a fair share of CPU time, preventing starvation.", icon: ShieldCheck, color: "text-red-400" }
  ];

  const algorithms = [
    {
      name: "FCFS",
      full: "First-Come, First-Served",
      desc: "The simplest algorithm where the process that requests the CPU first is allocated the CPU first.",
      advantages: ["Simple to implement", "Fair in terms of arrival order", "No starvation"],
      disadvantages: ["Convoy effect (long processes delay short ones)", "High average waiting time"]
    },
    {
      name: "SJF",
      full: "Shortest Job First",
      desc: "Assigns the CPU to the process with the smallest burst time. Can be non-preemptive.",
      advantages: ["Provably optimal for minimizing average waiting time", "High throughput"],
      disadvantages: ["Difficult to predict future burst times", "Potential for starvation of long processes"]
    },
    {
      name: "SRTF",
      full: "Shortest Remaining Time First",
      desc: "The preemptive version of SJF. If a new process arrives with a shorter remaining time, it preempts the current one.",
      advantages: ["Even lower average waiting time than SJF", "Highly responsive for short tasks"],
      disadvantages: ["High overhead due to frequent context switching", "Starvation for long processes"]
    },
    {
      name: "Round Robin",
      full: "Round Robin (RR)",
      desc: "Each process gets a small unit of CPU time (time quantum) and is moved to the back of the queue if not finished.",
      advantages: ["Fair allocation", "Excellent for time-sharing systems", "Predictable response time"],
      disadvantages: ["Performance depends heavily on time quantum size", "High context switching overhead"]
    },
    {
      name: "Priority",
      full: "Priority Scheduling",
      desc: "Each process is assigned a priority, and the CPU is allocated to the process with the highest priority.",
      advantages: ["Important tasks are executed first", "Flexible management"],
      disadvantages: ["Starvation of low-priority processes", "Complex to manage priority levels"]
    }
  ];

  const metrics = [
    { name: "Waiting Time", desc: "Total time a process spends waiting in the ready queue." },
    { name: "Turnaround Time", desc: "Interval from the time of submission of a process to the time of completion." },
    { name: "Response Time", desc: "Time from submission until the first response is produced." },
    { name: "Throughput", desc: "Number of processes completed per unit of time." },
    { name: "CPU Utilization", desc: "Percentage of time the CPU is actively performing work." },
    { name: "Context Switch", desc: "The process of storing the state of a process so it can be resumed later." }
  ];

  const faqs = [
    { q: "Which scheduling algorithm is best?", a: "There is no single 'best' algorithm. FCFS is simple, SJF is optimal for waiting time, and Round Robin is best for fairness and responsiveness. The choice depends on the system's goals." },
    { q: "What is starvation?", a: "Starvation occurs when a process is perpetually denied necessary resources (like CPU time) because other processes are constantly being prioritized over it." },
    { q: "What is aging?", a: "Aging is a technique used to prevent starvation by gradually increasing the priority of processes that wait in the system for a long time." },
    { q: "Why is Round Robin used?", a: "Round Robin is widely used in interactive systems because it ensures that all processes get a turn regularly, providing good response times for users." },
    { q: "What is a time quantum?", a: "A time quantum (or time slice) is a small, fixed amount of time allocated to each process in Round Robin scheduling." },
    { q: "Why are Gantt Charts useful?", a: "Gantt charts provide a clear visual timeline of when each process is executed, making it easy to see the order of execution and calculate performance metrics." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 text-white">
      <SectionTitle
        title="CPU Scheduling Information"
        subtitle="Deepen your understanding of how operating systems manage process execution."
      />

      {/* Section 1: What is CPU Scheduling? */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-24"
      >
        <div className="glass p-8 md:p-12 border-l-4 border-brand-blue">
          <div className="flex items-center space-x-4 mb-6">
            <BookOpen size={32} className="text-brand-blue" />
            <h2 className="text-3xl font-bold">What is CPU Scheduling?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-brand-gray leading-relaxed">
                CPU Scheduling is a process that allows one process to use the CPU while the execution of another process is on hold (in waiting state) due to the unavailability of any resource like I/O etc., thereby making full use of the CPU.
              </p>
              <p className="text-brand-gray leading-relaxed">
                In a single-processor system, only one process can run at a time; any others must wait until the CPU is free and can be rescheduled. The objective of multiprogramming is to have some process running at all times, to maximize CPU utilization.
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="font-bold mb-4 flex items-center">
                <CheckCircle2 size={18} className="text-brand-blue mr-2" />
                Why is it needed?
              </h4>
              <ul className="space-y-2 text-sm text-brand-gray">
                <li>• Prevents CPU from sitting idle during I/O operations</li>
                <li>• Enables multi-tasking in modern operating systems</li>
                <li>• Improves overall system throughput and efficiency</li>
                <li>• Provides a responsive experience for interactive users</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 2: Objectives */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold mb-10 text-center">Objectives of CPU Scheduling</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectives.map((obj, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass p-6 hover:border-brand-blue/30 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <obj.icon size={24} className={obj.color} />
              </div>
              <h4 className="font-bold mb-2">{obj.title}</h4>
              <p className="text-xs text-brand-gray leading-relaxed">{obj.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 3: Types of Scheduling */}
      <section className="mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 border-t-4 border-brand-cyan"
          >
            <h3 className="text-2xl font-bold mb-4 text-brand-cyan">Non-Preemptive Scheduling</h3>
            <p className="text-brand-gray text-sm leading-relaxed mb-4">
              In this type, once the CPU has been allocated to a process, the process keeps the CPU until it releases it either by terminating or by switching to the waiting state.
            </p>
            <div className="bg-brand-cyan/5 p-4 rounded-lg">
              <span className="text-xs font-bold uppercase text-brand-cyan">When it's used:</span>
              <p className="text-xs text-brand-gray mt-1">Simple systems where overhead must be minimized and once a task starts, it's efficient to let it finish.</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 border-t-4 border-brand-blue"
          >
            <h3 className="text-2xl font-bold mb-4 text-brand-blue">Preemptive Scheduling</h3>
            <p className="text-brand-gray text-sm leading-relaxed mb-4">
              The OS can interrupt a currently running process and allocate the CPU to another process. This is common in modern OS to ensure responsiveness.
            </p>
            <div className="bg-brand-blue/5 p-4 rounded-lg">
              <span className="text-xs font-bold uppercase text-brand-blue">When it's used:</span>
              <p className="text-xs text-brand-gray mt-1">Multi-tasking environments like Windows, Linux, and macOS where responsiveness is critical.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Supported Algorithms */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold mb-10 text-center">Supported Algorithms</h2>
        <div className="space-y-8">
          {algorithms.map((algo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-8 hover:bg-white/5 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="lg:w-1/4">
                  <span className="text-3xl font-black text-brand-blue block mb-2">{algo.name}</span>
                  <h4 className="text-lg font-bold text-white mb-2">{algo.full}</h4>
                  <p className="text-sm text-brand-gray leading-relaxed">{algo.desc}</p>
                </div>
                <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-green-400/5 border border-green-400/20 p-4 rounded-xl">
                    <h5 className="text-green-400 font-bold text-xs uppercase tracking-widest mb-3 flex items-center">
                      <CheckCircle2 size={14} className="mr-2" /> Advantages
                    </h5>
                    <ul className="space-y-2">
                      {algo.advantages.map((adv, i) => (
                        <li key={i} className="text-xs text-brand-gray flex items-start">
                          <span className="mr-2">•</span> {adv}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-400/5 border border-red-400/20 p-4 rounded-xl">
                    <h5 className="text-red-400 font-bold text-xs uppercase tracking-widest mb-3 flex items-center">
                      <AlertCircle size={14} className="mr-2" /> Disadvantages
                    </h5>
                    <ul className="space-y-2">
                      {algo.disadvantages.map((dis, i) => (
                        <li key={i} className="text-xs text-brand-gray flex items-start">
                          <span className="mr-2">•</span> {dis}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 5: Performance Metrics */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold mb-10">Performance Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="glass p-6 border-white/5 bg-white/2">
              <h4 className="font-bold text-brand-cyan mb-2">{metric.name}</h4>
              <p className="text-xs text-brand-gray leading-relaxed">{metric.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: Gantt Charts */}
      <section className="mb-24">
        <div className="glass p-8 md:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
            <BarChart3 size={200} />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">Understanding Gantt Charts</h2>
            <div className="max-w-3xl space-y-4">
              <p className="text-brand-gray leading-relaxed">
                A Gantt chart is a type of bar chart that illustrates a project schedule. In the context of CPU scheduling, it represents the timeline of process execution.
              </p>
              <p className="text-brand-gray leading-relaxed">
                Each bar in the chart corresponds to a process, and its length represents the duration of execution. The horizontal axis represents time, starting from zero.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <div className="w-3 h-3 bg-brand-blue rounded-full"></div>
                  <span className="text-xs text-brand-gray">Visual Timeline</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <div className="w-3 h-3 bg-brand-cyan rounded-full"></div>
                  <span className="text-xs text-brand-gray">Execution Order</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-xs text-brand-gray">Idle Time Identification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Real World Applications */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold mb-10 text-center">Real World Applications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "OS Kernels", desc: "Linux (CFS), Windows, and macOS use complex hybrid scheduling strategies.", icon: Server },
            { name: "Cloud Computing", desc: "AWS, Azure, and Google Cloud schedule virtual machine resources efficiently.", icon: Cloud },
            { name: "Web Servers", desc: "Handling thousands of concurrent requests using event-loop or thread scheduling.", icon: Globe },
            { name: "Embedded Systems", desc: "Real-time operating systems (RTOS) require deterministic scheduling for safety.", icon: Cpu },
            { name: "Mobile Devices", desc: "iOS and Android prioritize foreground app processes for smooth UI.", icon: Smartphone },
            { name: "Data Centers", desc: "Managing massive compute clusters to optimize energy and performance.", icon: Layers }
          ].map((app, index) => (
            <div key={index} className="glass p-6 flex flex-col items-center text-center group hover:bg-brand-blue/5 transition-colors">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <app.icon size={24} className="text-brand-blue" />
              </div>
              <h4 className="font-bold mb-2">{app.name}</h4>
              <p className="text-xs text-brand-gray leading-relaxed">{app.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 8: FAQ */}
      <section className="mb-24">
        <div className="flex items-center space-x-3 mb-10">
          <HelpCircle className="text-brand-cyan" size={32} />
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div key={index} className="glass p-6 border-white/5">
              <h4 className="font-bold mb-3 text-brand-blue">Q: {faq.q}</h4>
              <p className="text-sm text-brand-gray leading-relaxed">A: {faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 9: CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center glass p-12 border-brand-blue/20 bg-gradient-to-b from-transparent to-brand-blue/5"
      >
        <Rocket size={48} className="mx-auto mb-6 text-brand-blue" />
        <h2 className="text-3xl font-bold mb-6">Learn with Schedulix</h2>
        <p className="text-brand-gray mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
          Ready to see these theories in action? Use our interactive simulator to experiment with different algorithms and visualize how they perform in real-time.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/simulator"
            className="w-full sm:w-auto bg-brand-blue hover:bg-blue-600 text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg shadow-brand-blue/20"
          >
            Open Simulator
          </Link>
          <Link
            to="/compare"
            className="w-full sm:w-auto glass hover:bg-white/10 text-white px-10 py-4 rounded-full font-bold transition-all"
          >
            Compare Strategies
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Information;
