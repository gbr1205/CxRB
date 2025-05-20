import React from 'react';
import { AssetTable } from '../dashboard/AssetTable';
import type { Asset } from '../../types';

interface PortfolioProps {
  assets: Asset[];
}

export function Portfolio({ assets }: PortfolioProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="h-[380px]">
      </div>
      <div className="flex-1">
        <AssetTable assets={assets} />
      </div>
    </div>
  );
}