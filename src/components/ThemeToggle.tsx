
import React from 'react';
import { Sun, Moon, Clock } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme, setAutoMode, isAutoMode } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setAutoMode(!isAutoMode)}
        className={`p-2 ${isAutoMode ? 'bg-blue-500/20 text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
        title="Auto theme (day/night)"
      >
        <Clock className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTheme}
        className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    </div>
  );
};
