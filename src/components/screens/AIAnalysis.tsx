import React from 'react';
import { AIAnalyzer } from '../dashboard/AIAnalyzer';
import type { Asset } from '../../types';

interface AIAnalysisProps {
  assets: Asset[];
}

export function AIAnalysis({ assets }: AIAnalysisProps) {
  return (
    <div className="p-6">
      <AIAnalyzer assets={assets} />
    </div>
  );
}