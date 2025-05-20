export interface Asset {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  avgBuyPrice: number;
  purchaseDate: Date;
  currentPrice: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  totalUsd: number;
  unrealizedProfitUsd: number;
  unrealizedProfitPercent: number;
  sentimentScore: number;
}

export interface SortConfig {
  key: keyof Asset;
  direction: 'asc' | 'desc';
}