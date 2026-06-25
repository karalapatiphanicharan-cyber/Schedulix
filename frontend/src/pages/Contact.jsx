import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, MessageSquare, MapPin, Send, Globe, Cpu, AlertCircle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const Contact = () => {
  const contactInfo = [
    {
      title: "GitHub Repository",
      value: "View Source Code",
      link: "https://github.com/karalapatiphanicharan-cyber/Schedulix",
      icon: Github,
      color: "text-white"
    },
    {
      title: "Email Support",
      value: "support@schedulix.edu",
      link: "mailto:support@schedulix.edu",
      icon: Mail,
      color: "text-brand-blue"
    },
    {
      title: "Community",
      value: "Join Discussions",
      link: "https://github.com/karalapatiphanicharan-cyber/Schedulix/discussions",
      icon: MessageSquare,
      color: "text-brand-cyan"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <SectionTitle
        title="Contact Us"
        subtitle="Have questions or feedback about Schedulix? We'd love to hear from you."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info Cards */}
        <div className="lg:col-span-1 space-y-6">
          {contactInfo.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 flex items-center space-x-4 hover:border-brand-blue/50 transition-all group"
            >
              <div className="p-3 rounded-xl bg-white/5 group-hover:scale-110 transition-transform">
                <item.icon size={24} className={item.color} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-brand-gray uppercase tracking-wider">{item.title}</h4>
                <p className="text-lg font-bold text-white">{item.value}</p>
              </div>
            </motion.a>
          ))}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass p-8 border-t-4 border-brand-blue"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Globe size={20} className="text-brand-blue mr-2" />
              Global Access
            </h3>
            <p className="text-brand-gray text-sm leading-relaxed">
              Schedulix is an open-source project accessible to students and educators worldwide. We welcome contributions and feedback from the global CS community.
            </p>
          </motion.div>
        </div>

        {/* Contact Form Placeholder / Message */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 h-full flex flex-col justify-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
              <Cpu size={300} />
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <p className="text-brand-gray mb-10 leading-relaxed max-w-xl">
                The best way to get in touch with us is through our GitHub repository. You can open an issue for bug reports, start a discussion for feature requests, or submit a pull request with your own improvements.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="https://github.com/karalapatiphanicharan-cyber/Schedulix/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-brand-blue hover:bg-blue-600 text-white px-6 py-4 rounded-xl font-bold transition-all"
                >
                  <AlertCircle size={20} />
                  <span>Report an Issue</span>
                </a>
                <a
                  href="https://github.com/karalapatiphanicharan-cyber/Schedulix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 glass hover:bg-white/10 text-white px-6 py-4 rounded-xl font-bold transition-all"
                >
                  <Github size={20} />
                  <span>Project Repo</span>
                </a>
              </div>

              <div className="mt-12 pt-12 border-t border-white/5">
                <div className="flex items-center space-x-3 text-brand-gray">
                  <MapPin size={18} className="text-brand-cyan" />
                  <span className="text-sm">Educational Open Source Project</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};


export default Contact;
