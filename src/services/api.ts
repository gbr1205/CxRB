import axios from 'axios';
import type { Asset } from '../types';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const COINGECKO_API_KEY = 'CG-x9D5twKxerKevp8MCpsHUgV4';
const CRYPTOPANIC_API = 'https://cryptopanic.com/api/v1';
const CRYPTOPANIC_API_KEY = '43019df33f6e79d7df81c9b942896d306bf59ae1';
const CMC_API = 'https://pro-api.coinmarketcap.com/v1';
const CMC_API_KEY = 'df196c19-7513-4ee2-8a63-ef5800c8ad14';

interface MarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
}

interface NewsData {
  title: string;
  published_at: string;
  url: string;
  currencies: Array<{ code: string; title: string }>;
  votes: { negative: number; positive: number; important: number };
}

interface FearGreedData {
  data: Array<{
    value: number;
    value_classification: string;
    timestamp: string;
  }>;
}

const calculateSentimentScore = (newsData: NewsData[], fearGreedIndex: number) => {
  // Weight the sentiment based on news votes and fear/greed index
  const newsScore = newsData.reduce((acc, item) => {
    const positiveScore = item.votes.positive * 2;
    const negativeScore = item.votes.negative * -2;
    const importantScore = item.votes.important * 1.5;
    return acc + positiveScore + negativeScore + importantScore;
  }, 0) / newsData.length;

  // Normalize news score to 0-100 range
  const normalizedNewsScore = ((newsScore + 10) / 20) * 100;
  
  // Combine with fear/greed index (50/50 weight)
  return (normalizedNewsScore + fearGreedIndex) / 2;
};

export const getMarketData = async (): Promise<Asset[]> => {
  try {
    // Fetch market data from CoinGecko
    const marketResponse = await axios.get(`${COINGECKO_API}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        sparkline: false,
        price_change_percentage: '24h,7d',
        x_cg_demo_api_key: COINGECKO_API_KEY
      }
    });

    // Fetch news data from CryptoPanic
    const newsResponse = await axios.get(`${CRYPTOPANIC_API}/posts`, {
      params: {
        auth_token: CRYPTOPANIC_API_KEY,
        filter: 'important'
      }
    });

    // Fetch fear/greed index from CoinMarketCap
    const fearGreedResponse = await axios.get(`${CMC_API}/fear-and-greed/latest`, {
      headers: {
        'X-CMC_PRO_API_KEY': CMC_API_KEY
      }
    });

    const marketData: MarketData[] = marketResponse.data;
    const newsData: NewsData[] = newsResponse.data.results;
    const fearGreedIndex: number = fearGreedResponse.data.data.value;

    return marketData.map(coin => {
      const coinNews = newsData.filter(news => 
        news.currencies?.some(cur => cur.code.toLowerCase() === coin.symbol.toLowerCase())
      );

      const sentimentScore = calculateSentimentScore(coinNews, fearGreedIndex);

      return {
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
        sentimentScore,
        volume: coin.total_volume
      };
    });
  } catch (error) {
    console.error('Error fetching market data:', error);
    return [];
  }
};