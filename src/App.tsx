import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Portfolio } from './components/screens/Portfolio';
import { AIAnalysis } from './components/screens/AIAnalysis';
import { getMarketData } from './services/api';
import { BottomNav } from './components/layout/BottomNav';

const queryClient = new QueryClient();

function AppContent() {
  const [activeScreen, setActiveScreen] = React.useState('portfolio');
  
  const { data: assets = [], isLoading } = useQuery({
    queryKey: ['marketData'],
    queryFn: getMarketData,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text-primary pb-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScreen}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {activeScreen === 'portfolio' && <Portfolio assets={assets} />}
          {activeScreen === 'ai' && <AIAnalysis assets={assets} />}
        </motion.div>
      </AnimatePresence>
      
      <BottomNav activeScreen={activeScreen} onScreenChange={setActiveScreen} />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;