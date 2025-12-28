import React, { useState } from 'react';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import ResultsView from './components/ResultsView';
import { calculateMarketPotential } from './services/geminiService';
import { MarketPotentialData, LoadingState } from './types';
import { AlertCircle, Hexagon } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [data, setData] = useState<MarketPotentialData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (city: string) => {
    setStatus(LoadingState.LOADING);
    setError(null);
    try {
      const result = await calculateMarketPotential(city);
      setData(result);
      setStatus(LoadingState.SUCCESS);
    } catch (err) {
      console.error(err);
      setError("Unable to retrieve sector data. Neural link failed. Please retry.");
      setStatus(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-neon-400 selection:text-black overflow-x-hidden bg-dark-900">
      {/* Background Grid Effect */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-grid-pattern bg-[length:30px_30px] opacity-[0.03] pointer-events-none z-0"></div>
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-neon-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <Header />
      
      <main className="flex-grow pt-24 pb-8 px-4 sm:px-6 relative z-10 flex flex-col">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center flex-grow">
          
          <SearchInput 
            onSearch={handleSearch} 
            isLoading={status === LoadingState.LOADING}
            hasResults={status === LoadingState.SUCCESS} 
          />

          {status === LoadingState.IDLE && (
            <div className="mt-12 sm:mt-16 opacity-30 animate-pulse-slow hidden sm:block">
              <Hexagon size={80} strokeWidth={0.5} className="mx-auto text-cyan-500 mb-4" />
              <p className="text-sm font-display tracking-[0.2em] text-cyan-500/50 uppercase text-center">System Standby</p>
            </div>
          )}

          {status === LoadingState.ERROR && (
            <div className="mt-8 w-full max-w-md bg-red-950/30 border border-red-500/30 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 text-red-400 animate-fade-in">
              <AlertCircle size={20} className="flex-shrink-0" />
              <p className="font-mono text-xs sm:text-sm">{error}</p>
            </div>
          )}

          <div className="w-full mt-8 sm:mt-12">
            {status === LoadingState.SUCCESS && data && (
              <ResultsView data={data} />
            )}
          </div>

        </div>
      </main>

      <footer className="py-6 text-center border-t border-white/5 relative z-10 bg-dark-900/50 backdrop-blur-lg">
        <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
          Remaking Agency System v2.1 • Secure Connection
        </p>
      </footer>
    </div>
  );
};

export default App;