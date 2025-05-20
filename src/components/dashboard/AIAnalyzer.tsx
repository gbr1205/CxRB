import React from 'react';
import { Brain, TrendingUp, AlertTriangle } from 'lucide-react';
import type { Asset } from '../../types';

interface AIAnalyzerProps {
  assets: Asset[];
}

export function AIAnalyzer({ assets }: AIAnalyzerProps) {
  return (
    <div className="bg-[#1a1a1a] rounded-xl p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#7CFF6B] flex items-center justify-center">
          <Brain className="w-6 h-6 text-black" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">AI Analysis</h2>
          <p className="text-sm text-gray-400">Real-time market insights</p>
        </div>
      </div>

      <div className="space-y-6">
        {assets.slice(0, 3).map(asset => {
          const sentiment = asset.change24h > 0 ? 'Bullish' : 'Bearish';
          const sentimentColor = asset.change24h > 0 ? 'text-[#7CFF6B]' : 'text-red-500';
          
          return (
            <div key={asset.id} className="p-4 bg-[#0f0f0f] rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{asset.symbol}</span>
                <span className={`flex items-center gap-1 ${sentimentColor}`}>
                  {asset.change24h > 0 ? <TrendingUp size={16} /> : <AlertTriangle size={16} />}
                  {sentiment}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                {`${sentiment} momentum with ${Math.abs(asset.change24h).toFixed(2)}% ${
                  asset.change24h > 0 ? 'gain' : 'loss'
                } in 24h. Volume at $${(asset.volume / 1e6).toFixed(1)}M.`}
              </p>
              <div className="text-xs text-gray-500">
                Updated {new Date().toLocaleTimeString()}
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-6 py-3 bg-[#7CFF6B] text-black rounded-lg font-medium hover:bg-[#6be65c] transition-colors flex items-center justify-center gap-2">
        <Brain size={16} />
        Generate Full Analysis
      </button>
    </div>
  );
}