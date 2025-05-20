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
  return response.data;
};

export const transformCoinData = (coin: CoinData): Asset => ({
  id: coin.id,
  name: coin.name,
  symbol: coin.symbol.toUpperCase(),
  amount: 0, // This would come from portfolio data
  avgBuyPrice: 0, // This would come from portfolio data
  purchaseDate: new Date(), // This would come from portfolio data
  currentPrice: coin.current_price,
  change24h: coin.price_change_percentage_24h,
  change7d: coin.price_change_percentage_7d_in_currency,
  marketCap: coin.market_cap,
  totalUsd: 0, // This would be calculated from amount * currentPrice
  unrealizedProfitUsd: 0, // This would be calculated from (currentPrice - avgBuyPrice) * amount
  unrealizedProfitPercent: 0, // This would be calculated from (unrealizedProfitUsd / (avgBuyPrice * amount)) * 100
  sentimentScore: Math.random() * 100, // This would come from sentiment analysis
});