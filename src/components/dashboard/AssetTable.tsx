import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Asset, SortConfig } from '../../types';
import { cn } from '../../lib/utils';

interface AssetTableProps {
  assets: Asset[];
}

export function AssetTable({ assets }: AssetTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'marketCap',
    direction: 'desc'
  });

  const sortedAssets = [...assets].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: keyof Asset) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const SortIcon = ({ columnKey }: { columnKey: keyof Asset }) => {
    if (sortConfig.key !== columnKey) return <ChevronDown size={14} className="opacity-50" />;
    return sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  return (
    <div className="rounded-xl bg-[#0f0f0f] overflow-hidden h-full">
      <div className="p-4 border-b border-[#ffffff1a]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Assets</h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-400">
              <th className="px-4 py-3 font-medium">
                <button 
                  className="flex items-center gap-1 hover:text-gray-300"
                  onClick={() => handleSort('name')}
                >
                  Asset <SortIcon columnKey="name" />
                </button>
              </th>
              <th className="px-4 py-3 font-medium">
                <button 
                  className="flex items-center gap-1 hover:text-gray-300"
                  onClick={() => handleSort('amount')}
                >
                  Amount <SortIcon columnKey="amount" />
                </button>
              </th>
              <th className="px-4 py-3 font-medium">
                <button 
                  className="flex items-center gap-1 hover:text-gray-300"
                  onClick={() => handleSort('avgBuyPrice')}
                >
                  Avg Buy <SortIcon columnKey="avgBuyPrice" />
                </button>
              </th>
              <th className="px-4 py-3 font-medium">
                <button 
                  className="flex items-center gap-1 hover:text-gray-300"
                  onClick={() => handleSort('currentPrice')}
                >
                  Current Price <SortIcon columnKey="currentPrice" />
                </button>
              </th>
              <th className="px-4 py-3 font-medium">
                <button 
                  className="flex items-center gap-1 hover:text-gray-300"
                  onClick={() => handleSort('change24h')}
                >
                  24h Change <SortIcon columnKey="change24h" />
                </button>
              </th>
              <th className="px-4 py-3 font-medium">
                <button 
                  className="flex items-center gap-1 hover:text-gray-300"
                  onClick={() => handleSort('change7d')}
                >
                  7d Change <SortIcon columnKey="change7d" />
                </button>
              </th>
              <th className="px-4 py-3 font-medium">
                <button 
                  className="flex items-center gap-1 hover:text-gray-300"
                  onClick={() => handleSort('marketCap')}
                >
                  Market Cap <SortIcon columnKey="marketCap" />
                </button>
              </th>
              <th className="px-4 py-3 font-medium">
                <button 
                  className="flex items-center gap-1 hover:text-gray-300"
                  onClick={() => handleSort('totalUsd')}
                >
                  Total USD <SortIcon columnKey="totalUsd" />
                </button>
              </th>
              <th className="px-4 py-3 font-medium">
                <button 
                  className="flex items-center gap-1 hover:text-gray-300"
                  onClick={() => handleSort('unrealizedProfitPercent')}
                >
                  P/L % <SortIcon columnKey="unrealizedProfitPercent" />
                </button>
              </th>
              <th className="px-4 py-3 font-medium">
                <button 
                  className="flex items-center gap-1 hover:text-gray-300"
                  onClick={() => handleSort('sentimentScore')}
                >
                  Sentiment <SortIcon columnKey="sentimentScore" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedAssets.map((asset) => (
              <tr key={asset.id} className="border-t border-[#ffffff0a] hover:bg-[#ffffff0a]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#7CFF6B] flex items-center justify-center text-black font-medium">
                      {asset.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-xs text-gray-400">{asset.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{asset.amount.toFixed(8)}</td>
                <td className="px-4 py-3">${asset.avgBuyPrice.toFixed(2)}</td>
                <td className="px-4 py-3">${asset.currentPrice.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={cn(
                    'flex items-center',
                    asset.change24h >= 0 ? 'text-[#7CFF6B]' : 'text-red-500'
                  )}>
                    {asset.change24h >= 0 ? '↑' : '↓'} {Math.abs(asset.change24h).toFixed(2)}%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={cn(
                    'flex items-center',
                    asset.change7d >= 0% ? 'text-[#7CFF6B]' : 'text-red-500'
                  )}>
                    {asset.change7d >= 0% ? '↑' : '↓'} {Math.abs(asset.change7d).toFixed(2)}%
                  </span>
                </td>
                <td className="px-4 py-3">${(asset.marketCap / 1e6).toFixed(2)}M</td>
                <td className="px-4 py-3">${asset.totalUsd.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={cn(
                    'flex items-center',
                    asset.unrealizedProfitPercent >= 0.0 ? 'text-[#7CFF6B]' : 'text-red-500'
                    asset.unrealizedProfitPercent >= 0.0 ? '↑' : '↓'} {Math.abs(asset.unrealizedProfitPercent).toFixed(2)}%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className={cn(
                    'px-2 py-1 rounded text-xs inline-block',
                    asset.sentimentScore >= 70 ? 'bg-green-500/20 text-green-500' :
                    asset.sentimentScore >= 40 ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-red-500/20 text-red-500'
                  )}>
                    {asset.sentimentScore.toFixed(2)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}