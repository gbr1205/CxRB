import React from 'react';
import { Brain, LineChart } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BottomNavProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
}

export function BottomNav({ activeScreen, onScreenChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background-secondary border-t border-white/10 backdrop-blur-lg">
      <nav className="max-w-lg mx-auto px-6 h-20">
        <ul className="h-full flex items-center justify-around">
          <li>
            <button
              onClick={() => onScreenChange('portfolio')}
              className={cn(
                'flex flex-col items-center gap-1 p-2',
                activeScreen === 'portfolio' ? 'text-primary' : 'text-text-secondary'
              )}
            >
              <LineChart size={24} />
              <span className="text-xs font-medium">Portfolio</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => onScreenChange('ai')}
              className={cn(
                'flex flex-col items-center gap-1 p-2',
                activeScreen === 'ai' ? 'text-primary' : 'text-text-secondary'
              )}
            >
              <Brain size={24} />
              <span className="text-xs font-medium">AI Analysis</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}