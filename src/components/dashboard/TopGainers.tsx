import React from 'react';
import { Diamond, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Asset } from '../../types';
import { MiniChart } from '../charts/MiniChart';

interface TopGainersProps {
  assets: Asset[];
}

export function TopGainers({ assets }: TopGainersProps) {
  return (
    <div className="rounded-xl bg-[#1a1a1a] p-4 space-y-4 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Top Gainers & Losers</h1>
          <p className="text-sm text-gray-500">Track, manage and forecast your assets</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-[#0f0f0f] rounded-lg text-sm text-gray-400 hover:bg-[#ffffff15] flex items-center gap-1">
            <Diamond size={14} />
            24H
          </button>
          <button className="px-3 py-1.5 bg-[#0f0f0f] rounded-lg text-sm text-gray-400 hover:bg-[#ffffff15] flex items-center gap-1">
            <Diamond size={14} />
            Gainers
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {assets.slice(0, 3).map((asset) => (
          <div key={asset.id} className="p-4 rounded-xl bg-[#0f0f0f] flex flex-col h-[280px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#7CFF6B] flex items-center justify-center text-black font-medium">
                  {asset.symbol.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{asset.name}</div>
                  <div className="text-sm text-gray-400">Price Chart</div>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-gray-400" />
            </div>

            <div className="mt-4">
              <div className="text-sm text-gray-400">Current Price</div>
              <div className="text-3xl font-semibold mt-1">${asset.currentPrice.toFixed(2)}</div>
              <div className={`text-sm ${asset.change24h >= 0 ? 'text-[#7CFF6B]' : 'text-red-500'}`}>
                {asset.change24h >= 0 ? (
                  <span className="flex items-center gap-1">
                    <ArrowUpRight size={16} />
                    {Math.abs(asset.change24h).toFixed(2)}%
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <ArrowDownRight size={16} />
                    {Math.abs(asset.change24h).toFixed(2)}%
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1 rounded-lg overflow-hidden relative mt-4">
              <div className="absolute inset-0 bg-[#7CFF6B] opacity-5" />
              <MiniChart
                data={[0, 1, 2, 3, 4, 5]} // Replace with actual price history data
                color="#7CFF6B"
                height={100}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}