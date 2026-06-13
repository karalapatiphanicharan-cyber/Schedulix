import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Simulator', path: '/simulator' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass bg-brand-navy/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <img src="/schedulix-logo.png" alt="Schedulix Logo" className="h-10 w-auto transition-transform group-hover:scale-110" />
              <span className="text-2xl font-bold tracking-tight text-white hidden sm:block">
                Schedulix
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-grow justify-center">
            <div className="flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-brand-blue ${
                    isActive(link.path) ? 'text-brand-blue' : 'text-brand-gray'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/simulator"
              className="flex items-center space-x-2 bg-brand-blue hover:bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 shadow-lg shadow-brand-blue/20"
            >
              <Rocket size={16} />
              <span>Launch Simulator</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-gray hover:text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white border-opacity-10 bg-brand-navy">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path) ? 'bg-white bg-opacity-10 text-brand-blue' : 'text-brand-gray hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/simulator"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-brand-blue text-white"
            >
              Launch Simulator
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
