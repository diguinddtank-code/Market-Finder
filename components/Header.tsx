import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="absolute inset-0 bg-dark-900/70 backdrop-blur-xl border-b border-white/5 shadow-lg"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="bg-white/5 p-1.5 rounded-xl border border-white/10 backdrop-blur-md">
            <img 
              src="https://i.imgur.com/kL00omR.png" 
              alt="Agency Logo" 
              className="h-6 sm:h-8 w-auto object-contain" 
            />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-display font-bold text-white tracking-widest uppercase leading-none">
              Market<span className="text-neon-400">Finder</span>
            </h1>
            <p className="text-[9px] sm:text-[10px] text-gray-400 font-mono tracking-widest uppercase hidden sm:block">
              Intelligence System
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-400/10 border border-neon-400/20">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-400 animate-pulse shadow-[0_0_8px_rgba(163,255,0,0.8)]"></div>
                <span className="text-neon-400 text-[10px] font-display font-bold tracking-wider">ONLINE</span>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;