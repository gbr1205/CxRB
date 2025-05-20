import React from 'react';
import { AssetTable } from '../dashboard/AssetTable';
import type { Asset } from '../../types';

interface PortfolioProps {
  assets: Asset[];
}

export function Portfolio({ assets }: PortfolioProps) {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Your Assets</h1>
        <p className="text-gray-400">Track and manage your cryptocurrency portfolio</p>
      </div>
      <AssetTable assets={assets} />
    </div>
  );
}