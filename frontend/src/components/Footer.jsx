import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Cpu } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-navy border-t border-white border-opacity-10 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <img src="/favicon.png" alt="Schedulix Logo" className="h-6 w-6" />
            <span className="text-lg font-bold">Schedulix</span>
          </div>

          <div className="flex space-x-6 text-brand-gray text-sm">
            <Link to="/" className="hover:text-brand-blue transition-colors">Home</Link>
            <Link to="/simulator" className="hover:text-brand-blue transition-colors">Simulator</Link>
            <Link to="/compare" className="hover:text-brand-blue transition-colors">Compare</Link>
            <Link to="/about" className="hover:text-brand-blue transition-colors">About</Link>
          </div>

          <div className="mt-4 md:mt-0">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gray hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
          </div>
        </div>

        <div className="border-t border-white border-opacity-5 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p className="text-brand-gray text-xs mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} Schedulix. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-brand-gray text-xs">
            <Cpu size={12} />
            <span>Built with React + Node.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
