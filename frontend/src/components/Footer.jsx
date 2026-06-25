import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Cpu, ExternalLink, Mail, Shield, FileText, Info, BarChart3, Layers, GraduationCap } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a192f] border-t border-white border-opacity-10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Section 1: About Schedulix */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img src="/schedulix-logo.png" alt="Schedulix Logo" className="h-10 w-10" />
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-brand-gray bg-clip-text text-transparent">
                Schedulix
              </span>
            </div>
            <p className="text-brand-gray text-sm leading-relaxed">
              Schedulix is an educational platform that helps students, educators, and developers understand CPU scheduling algorithms through interactive simulations, Gantt charts, performance metrics, and side-by-side algorithm comparisons.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/karalapatiphanicharan-cyber/Schedulix"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gray hover:text-white transition-colors p-2 bg-white/5 rounded-lg"
                title="GitHub Repository"
              >
                <Github size={20} />
              </a>
              <Link
                to="/contact"
                className="text-brand-gray hover:text-white transition-colors p-2 bg-white/5 rounded-lg"
                title="Contact Us"
              >
                <Mail size={20} />
              </Link>
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center">
              <span className="w-8 h-[2px] bg-brand-blue mr-3"></span>
              Quick Links
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-brand-gray hover:text-brand-blue transition-colors text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/simulator" className="text-brand-gray hover:text-brand-blue transition-colors text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Simulator
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-brand-gray hover:text-brand-blue transition-colors text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Compare
                </Link>
              </li>
              <li>
                <Link to="/information" className="text-brand-gray hover:text-brand-blue transition-colors text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Information
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-brand-gray hover:text-brand-blue transition-colors text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Resources */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center">
              <span className="w-8 h-[2px] bg-brand-cyan mr-3"></span>
              Resources
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/privacy" className="text-brand-gray hover:text-brand-cyan transition-colors text-sm flex items-center group">
                  <Shield size={14} className="mr-3 text-brand-cyan opacity-50 group-hover:opacity-100" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-brand-gray hover:text-brand-cyan transition-colors text-sm flex items-center group">
                  <FileText size={14} className="mr-3 text-brand-cyan opacity-50 group-hover:opacity-100" />
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-brand-gray hover:text-brand-cyan transition-colors text-sm flex items-center group">
                  <Info size={14} className="mr-3 text-brand-cyan opacity-50 group-hover:opacity-100" />
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-brand-gray hover:text-brand-cyan transition-colors text-sm flex items-center group">
                  <Mail size={14} className="mr-3 text-brand-cyan opacity-50 group-hover:opacity-100" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 4: Open Source & Project */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center">
              <span className="w-8 h-[2px] bg-yellow-400 mr-3"></span>
              Project
            </h4>
            <div className="space-y-6">
              <a
                href="https://github.com/karalapatiphanicharan-cyber/Schedulix"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-4 flex items-center justify-between group hover:border-brand-blue/50 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <Github size={20} className="text-white" />
                  <span className="text-sm font-bold">View Source Code</span>
                </div>
                <ExternalLink size={14} className="text-brand-gray group-hover:text-white transition-colors" />
              </a>
              <ul className="space-y-3">
                {[
                  { icon: Cpu, label: "Interactive Simulator" },
                  { icon: BarChart3, label: "Real-Time Gantt Charts" },
                  { icon: Layers, label: "Algorithm Comparison" },
                  { icon: BarChart3, label: "Performance Metrics" },
                  { icon: GraduationCap, label: "Educational Platform" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-xs text-brand-gray">
                    <item.icon size={12} className="mr-2 text-yellow-400" />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white border-opacity-5 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <p className="text-brand-gray text-xs">
              &copy; 2026 Schedulix. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-brand-gray text-[10px] uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
            <GraduationCap size={12} className="text-brand-blue" />
            <span>Built for learning and visualizing CPU scheduling algorithms through interactive simulations.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
