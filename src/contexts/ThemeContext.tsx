
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setAutoMode: (auto: boolean) => void;
  isAutoMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAutoMode, setIsAutoMode] = useState(true);

  // Check if it's night time (6 PM to 6 AM)
  const isNightTime = () => {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
  };

  useEffect(() => {
    // Load saved preferences
    const savedMode = localStorage.getItem('theme-mode');
    const savedAuto = localStorage.getItem('auto-theme');
    
    if (savedAuto === 'false') {
      setIsAutoMode(false);
      setIsDarkMode(savedMode === 'dark');
    } else {
      setIsAutoMode(true);
      setIsDarkMode(isNightTime());
    }
  }, []);

  useEffect(() => {
    // Auto-update theme based on time if auto mode is enabled
    if (isAutoMode) {
      const interval = setInterval(() => {
        setIsDarkMode(isNightTime());
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [isAutoMode]);

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsAutoMode(false);
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme-mode', newMode ? 'dark' : 'light');
    localStorage.setItem('auto-theme', 'false');
  };

  const setAutoMode = (auto: boolean) => {
    setIsAutoMode(auto);
    localStorage.setItem('auto-theme', auto.toString());
    if (auto) {
      setIsDarkMode(isNightTime());
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, setAutoMode, isAutoMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
