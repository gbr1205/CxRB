import React from 'react';
import { Search, Settings } from 'lucide-react';

export function TopBar() {
  return (
    <div className="h-16 border-b border-[#ffffff0f] flex items-center px-4 pt-[20px]">
      <div className="flex items-center gap-3">
        <span className="text-xl font-medium">Portfolio Overview</span>
      </div>
      
      <div className="flex items-center gap-3 ml-auto">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search assets..."
            className="w-64 h-9 bg-[#ffffff0a] rounded-lg pl-4 pr-9 text-sm text-gray-300 placeholder-gray-500
              focus:outline-none focus:ring-1 focus:ring-[#00FF94]"
          />
        </div>
        
        <button className="p-2 hover:bg-[#ffffff0a] rounded-lg transition-colors duration-200">
          <Settings className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}