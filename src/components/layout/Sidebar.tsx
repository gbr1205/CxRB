import React from 'react';
import { Home, Brain, Activity, LineChart } from 'lucide-react';
import { Logo } from '../common/Logo';

const mainNavItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: Activity, label: 'Portfolio Analysis' },
  { icon: Brain, label: 'AI Research' },
  { icon: LineChart, label: 'Performance' },
];

export function Sidebar({ position }: { position: 'left' | 'right' }) {
  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-[#0A0A0A] border-r border-[#ffffff0f]">
      <div className="p-6 border-b border-[#ffffff0f]">
        <Logo />
      </div>
      
      <nav className="h-[calc(100vh-88px)] overflow-y-auto px-4 py-4">
        <ul className="space-y-1">
          {mainNavItems.map(({ icon: Icon, label, active }) => (
            <li key={label}>
              <a
                href="#"
                className={`flex items-center gap-3 px-3 py-2
                  text-gray-400 hover:text-[#00FF94]
                  ${active ? 'text-[#00FF94]' : ''}
                  transition-colors duration-200`}
              >
                <Icon size={18} />
                <span className="text-sm">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}