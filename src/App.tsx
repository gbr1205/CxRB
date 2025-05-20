import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { TopGainers } from './components/dashboard/TopGainers';
import { AssetTable } from './components/dashboard/AssetTable';
import { AIAnalyzer } from './components/dashboard/AIAnalyzer';
import { getTopCoins, transformCoinData } from './services/api';

const queryClient = new QueryClient();

function Dashboard() {
  const { data: assets = [], isLoading } = useQuery({
    queryKey: ['topCoins'],
    queryFn: async () => {
      const coins = await getTopCoins();
      return coins.map(transformCoinData);
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7CFF6B]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Sidebar position="left" />
      <div className="ml-64">
        <TopBar />
        <main className="p-6">
          <div className="max-w-[1600px] mx-auto grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <div className="grid grid-rows-[auto_1fr] gap-4 h-full">
                <div className="h-[380px]">
                  <TopGainers assets={assets} />
                </div>
                <div className="flex-1">
                  <AssetTable assets={assets} />
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <AIAnalyzer assets={assets} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}

export default App;