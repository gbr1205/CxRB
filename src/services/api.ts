import axios from 'axios';
import type { Asset } from '../types';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const COINGECKO_API_KEY = 'CG-x9D5twKxerKevp8MCpsHUgV4';

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  sparkline_in_7d: {
    price: number[];
  };
}

export const getTopCoins = async (): Promise<CoinData[]> => {
  const response = await axios.get(`${COINGECKO_API}/coins/markets`, {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 100,
      page: 1,
      sparkline: true,
      price_change_percentage: '24h,7d',
      x_cg_demo_api_key: COINGECKO_API_KEY
    }
  });

  // Mock data for testing
  const mockData = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      amount: 0.02755452,
      avgBuyPrice: 40210.02,
      purchaseDate: new Date('2024-01-15'),
      currentPrice: 106592.11,
      change24h: 1.47,
      change7d: 4.07,
      marketCap: 2117323900078.546,
      totalUsd: 2937.09,
      unrealizedProfitUsd: 1799.68,
      unrealizedProfitPercent: 8.96,
      sentimentScore: 75.5
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      amount: 0.55794014,
      avgBuyPrice: 2990.37,
      purchaseDate: new Date('2024-02-01'),
      currentPrice: 2547.61,
      change24h: 4.86,
      change7d: 3.74,
      marketCap: 307464962332.2355,
      totalUsd: 1421.41,
      unrealizedProfitUsd: 31.96,
      unrealizedProfitPercent: 2.30,
      sentimentScore: 68.2
    }
  ];

  return mockData;
};

export const transformCoinData = (coin: CoinData): Asset => ({
  id: coin.id,
  name: coin.name,
  symbol: coin.symbol.toUpperCase(),
  amount: 0,
  avgBuyPrice: 0,
  purchaseDate: new Date(),
  currentPrice: coin.current_price,
  change24h: coin.price_change_percentage_24h,
  change7d: coin.price_change_percentage_7d_in_currency,
  marketCap: coin.market_cap,
  totalUsd: 0,
  unrealizedProfitUsd: 0,
  unrealizedProfitPercent: 0,
  sentimentScore: Math.random() * 100
});