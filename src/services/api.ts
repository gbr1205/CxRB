import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

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
  sparkline_in_7d: {
    price: number[];
  };
}

export const getTopCoins = async (): Promise<CoinData[]> => {
  const response = await axios.get(`${COINGECKO_API}/coins/markets`, {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 10,
      page: 1,
      sparkline: true,
      price_change_percentage: '24h'
    }
  });
  return response.data;
};

export const transformCoinData = (coin: CoinData) => ({
  id: coin.id,
  name: `${coin.name} (${coin.symbol.toUpperCase()})`,
  symbol: coin.symbol.toUpperCase(),
  price: coin.current_price,
  change24h: coin.price_change_percentage_24h,
  volume: coin.total_volume,
  marketCap: coin.market_cap,
  chart: coin.sparkline_in_7d.price,
  rewardRate: Math.random() * 30 + 10, // Mock reward rate since it's not available in the API
});