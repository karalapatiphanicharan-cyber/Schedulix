import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
      aria-label="Toggle Theme"
    >
      {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-brand-blue" />}
    </button>
  );
};

export default ThemeToggle;
