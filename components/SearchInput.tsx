import React, { useState } from 'react';
import { Search, Loader2, Zap, Globe } from 'lucide-react';

interface SearchInputProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
  hasResults?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, isLoading, hasResults = false }) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      // On mobile, blur input to hide keyboard after search
      if (window.innerWidth < 768) {
          (document.activeElement as HTMLElement)?.blur();
      }
    }
  };

  return (
    <div className={`w-full max-w-xl mx-auto transition-all duration-500 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Hide header text when results are shown to save space, or keep it if desired. keeping for now but compacted */}
      <div className={`text-center mb-8 sm:mb-12 px-4 transition-all duration-500 ${hasResults ? 'h-0 opacity-0 overflow-hidden mb-0 sm:mb-0' : 'opacity-100'}`}>
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 animate-fade-in">
            <Globe size={12} className="text-cyan-400" />
            <span className="text-[10px] uppercase tracking-widest text-gray-300 font-mono">Global Database Access</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4 tracking-tighter leading-tight">
          Analyze Your <br className="sm:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-400 to-cyan-400">Potential</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base font-light max-w-md mx-auto leading-relaxed">
          Instant demographic reconnaissance for soccer academies.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative px-2 sm:px-0 z-20">
        <div className={`absolute -inset-1 bg-gradient-to-r from-neon-400 via-cyan-400 to-neon-400 rounded-[20px] opacity-0 transition-opacity duration-500 blur-lg ${isFocused ? 'opacity-40' : 'opacity-0'}`}></div>
        
        <div className={`relative flex items-center bg-dark-800/80 backdrop-blur-xl rounded-[18px] border transition-all duration-300 overflow-hidden ${isFocused ? 'border-neon-400/50 shadow-[0_0_30px_rgba(0,0,0,0.5)]' : 'border-white/10 shadow-xl'}`}>
            <div className="pl-4 sm:pl-6 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300 ${isFocused ? 'text-neon-400' : 'text-gray-500'}`} />
            </div>
            
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={isLoading}
                className="block w-full px-3 sm:px-4 py-4 sm:py-5 bg-transparent text-white font-sans text-base sm:text-lg placeholder-gray-600 focus:outline-none"
                placeholder="Enter City (e.g. Rio de Janeiro)"
                autoComplete="off"
            />
            
            <div className="pr-1.5 sm:pr-2">
                <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="h-10 sm:h-12 px-4 sm:px-6 bg-white hover:bg-gray-200 text-black font-display font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 disabled:scale-100"
                >
                {isLoading ? (
                    <Loader2 className="animate-spin h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                    <>
                    <span className="hidden sm:inline">Scan</span>
                    <Zap className="h-4 w-4 fill-black" />
                    </>
                )}
                </button>
            </div>
        </div>
      </form>
      
      {/* Holographic Tactical Board - Only visible when NO results are present */}
      {!hasResults && (
        <div 
            className="mt-20 flex flex-col items-center justify-center opacity-0 animate-slide-up fill-forwards [perspective:800px] z-0"
            style={{ animationDelay: '300ms' }}
        >
            <div className="animate-float">
                <div className="relative w-72 h-48 sm:w-80 sm:h-56 group [transform:rotateX(40deg)] transition-transform duration-700">
                    
                    {/* 3D Thickness Shadow */}
                    <div className="absolute inset-0 top-2 rounded-xl bg-neon-400/20 blur-xl"></div>
                    
                    {/* Board Surface */}
                    <div className="absolute inset-0 bg-dark-900/90 rounded-lg border border-neon-400/30 shadow-[0_0_15px_rgba(163,255,0,0.1)] overflow-hidden backdrop-blur-sm tactical-grid">
                        
                        {/* Corner Markers */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-neon-400"></div>
                        <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-neon-400"></div>
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-neon-400"></div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-neon-400"></div>

                        {/* Field Markings Container (Centered) */}
                        <div className="absolute inset-4 border border-white/10 rounded-sm">
                            
                            {/* Center Line */}
                            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10"></div>
                            
                            {/* Center Circle */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white/10 rounded-full flex items-center justify-center">
                                <div className="w-1 h-1 bg-white/30 rounded-full"></div>
                            </div>

                            {/* Top Goal Area */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-8 border-x border-b border-white/10 bg-white/5"></div>
                            
                            {/* Bottom Goal Area */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-8 border-x border-t border-white/10 bg-white/5"></div>
                        </div>

                        {/* Detected "Targets" (Pulsing Dots) */}
                        <div className="absolute top-[30%] left-[25%]">
                            <div className="w-2 h-2 bg-neon-400 rounded-full animate-ping absolute opacity-75"></div>
                            <div className="w-2 h-2 bg-neon-400 rounded-full relative"></div>
                        </div>
                        
                        <div className="absolute top-[60%] right-[30%]">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping absolute opacity-75" style={{ animationDelay: '0.4s' }}></div>
                            <div className="w-2 h-2 bg-cyan-400 rounded-full relative"></div>
                        </div>
                        
                        <div className="absolute bottom-[25%] left-[45%]">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping absolute opacity-75" style={{ animationDelay: '0.8s' }}></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full relative"></div>
                        </div>

                        {/* Laser Scanner Beam */}
                        <div className="absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-neon-400/20 to-transparent blur-sm animate-scan-field pointer-events-none"></div>
                        <div className="absolute inset-x-0 h-px bg-neon-400/50 blur-[1px] animate-scan-field pointer-events-none"></div>
                    </div>

                </div>

                <div className="mt-8 text-center space-y-2">
                    <div className="inline-flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-neon-400 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-display uppercase tracking-[0.2em] text-neon-400 shadow-neon">
                            Satellite Link Active
                        </span>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;