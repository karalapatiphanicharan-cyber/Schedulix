import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Info, Cpu, BookOpen, ExternalLink, ShieldAlert } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const Disclaimer = () => {
  const points = [
    {
      title: "Educational Purpose Only",
      content: "The content and tools provided by Schedulix are intended solely for educational and informational purposes. The platform aims to help students and developers visualize CPU scheduling algorithms, but it should not be used as a definitive performance benchmark for production systems.",
      icon: BookOpen,
      color: "text-brand-blue"
    },
    {
      title: "Simulation Accuracy",
      content: "While we strive for high fidelity in our simulations, Schedulix uses simplified models of process scheduling. Real-world Operating System kernels (like Linux or Windows) involve significantly more complexity, including interrupt handling, multi-level caches, and hardware-specific optimizations that are not modeled here.",
      icon: Cpu,
      color: "text-brand-cyan"
    },
    {
      title: "No Professional Advice",
      content: "The information on Schedulix is not intended to be and should not be taken as professional engineering or software development advice. Users should consult official Operating System documentation and academic textbooks for authoritative information on scheduling theory.",
      icon: Info,
      color: "text-yellow-400"
    },
    {
      title: "External Links",
      content: "Schedulix may contain links to external websites that are not provided or maintained by or in any way affiliated with us. Please note that Schedulix does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.",
      icon: ExternalLink,
      color: "text-green-400"
    },
    {
      title: "Limitation of Liability",
      content: "In no event shall Schedulix or its creators be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service.",
      icon: ShieldAlert,
      color: "text-red-400"
    },
    {
      title: "Use at Your Own Risk",
      content: "All information in the Service is provided \"as is\", with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied.",
      icon: AlertCircle,
      color: "text-purple-400"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <SectionTitle
        title="Disclaimer"
        subtitle="Important information regarding the scope and accuracy of Schedulix."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {points.map((point, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="glass p-6 hover:bg-white/10 transition-colors"
          >
            <point.icon size={32} className={`${point.color} mb-4`} />
            <h3 className="text-lg font-bold mb-3">{point.title}</h3>
            <p className="text-brand-gray text-xs leading-relaxed">{point.content}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="glass p-8 border-l-4 border-yellow-400 bg-yellow-400/5"
      >
        <div className="flex items-start space-x-4">
          <AlertCircle className="text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-white mb-2">Final Note</h4>
            <p className="text-brand-gray text-sm leading-relaxed">
              Schedulix is an open-source project created to make learning about OS concepts easier and more engaging. We encourage users to verify results with academic sources and use the tool as a starting point for their journey into scheduling theory.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Disclaimer;
