import React from 'react';
import { MarketPotentialData } from '../types';
import { Users, Target, MapPin, Trophy, TrendingUp, ExternalLink, Instagram } from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, AreaChart, Area
} from 'recharts';

interface ResultsViewProps {
  data: MarketPotentialData;
}

const ResultsView: React.FC<ResultsViewProps> = ({ data }) => {
  
  const chartData = [
    { name: 'Target (5-17)', value: data.targetDemographicCount, color: '#a3ff00' }, // Neon Green
    { name: 'Other', value: data.totalPopulation - data.targetDemographicCount, color: '#1e293b' }, // Dark Slate
  ];

  // Calculate 5-year projection
  const projectionData = [];
  let currentStudents = data.potentialStudents;
  for (let i = 0; i < 5; i++) {
    projectionData.push({
      year: `Year ${i + 1}`,
      students: Math.round(currentStudents),
      revenue: Math.round(currentStudents * 1500) 
    });
    currentStudents = currentStudents * (1 + data.projectedGrowthRate);
  }

  const formatNumber = (num: number) => new Intl.NumberFormat('pt-BR').format(num);

  return (
    <div className="w-full max-w-4xl mx-auto pb-24 px-2 sm:px-0">
      
      {/* City Header */}
      <div className="text-center mb-8 opacity-0 animate-slide-up">
        <div className="inline-flex items-center gap-2 text-cyan-400 bg-cyan-950/30 border border-cyan-500/20 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest mb-3">
            <MapPin size={12} />
            Target Identified
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tighter mb-3">
            {data.cityName}
        </h2>
        <p className="text-gray-400 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {data.cityDescription}
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Card 1: TAM */}
            <div 
                className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden group opacity-0 animate-slide-up"
                style={{ animationDelay: '100ms' }}
            >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
                
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-cyan-400 font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-1">Total Youth Market</h3>
                        <p className="text-gray-500 text-[10px]">Ages 5-17</p>
                    </div>
                    <Users className="text-cyan-400/50" size={24} />
                </div>

                <div className="mt-4">
                    <span className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight">
                        {formatNumber(data.targetDemographicCount)}
                    </span>
                </div>
                
                <div className="mt-6 flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5">
                    <div className="h-12 w-12 relative flex-shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    innerRadius={15}
                                    outerRadius={22}
                                    dataKey="value"
                                    stroke="none"
                                    startAngle={90}
                                    endAngle={-270}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center text-xs mb-1">
                            <span className="text-gray-400">Demographic Share</span>
                            <span className="text-white font-bold">{Math.round((data.targetDemographicCount / data.totalPopulation) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1">
                            <div className="bg-neon-400 h-1 rounded-full" style={{ width: `${(data.targetDemographicCount / data.totalPopulation) * 100}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card 2: The 1% Opportunity */}
            <div 
                className="bg-gradient-to-br from-neon-900/20 to-dark-900 border border-neon-500/20 p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between opacity-0 animate-slide-up shadow-[0_0_40px_rgba(163,255,0,0.05)]"
                style={{ animationDelay: '200ms' }}
            >
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-1.5 bg-neon-400/20 rounded-md border border-neon-400/50 text-neon-400">
                            <Target size={18} />
                        </div>
                        <span className="font-display font-bold text-white text-sm uppercase tracking-wider">Acquisition Target</span>
                    </div>
                    
                    <div className="relative">
                        <div className="text-5xl sm:text-6xl font-display font-black text-white mb-1 text-neon drop-shadow-lg">
                            {formatNumber(data.potentialStudents)}
                        </div>
                        <div className="text-gray-400 font-medium text-xs sm:text-sm uppercase tracking-widest">
                            New Students (1%)
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-xs text-neon-400 leading-relaxed font-mono">
                        "This is your actionable Minimum Viable Audience."
                    </p>
                </div>
            </div>
        </div>

        {/* Card 3: 5-Year Projection */}
        <div 
            className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden border border-white/10 opacity-0 animate-slide-up"
            style={{ animationDelay: '300ms' }}
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400 border border-purple-500/30">
                        <TrendingUp size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-display font-bold text-sm sm:text-base tracking-wider">Growth Trajectory</h3>
                        <p className="text-gray-400 text-[10px] font-mono">{(data.projectedGrowthRate * 100).toFixed(1)}% YoY Expansion</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-gray-500 text-[9px] sm:text-[10px] font-mono mb-1 uppercase">Year 5 Forecast</div>
                    <div className="text-purple-400 font-display font-bold text-xl sm:text-2xl">
                        {formatNumber(projectionData[4].students)}
                    </div>
                </div>
            </div>
            
            <div className="h-48 sm:h-56 w-full -ml-2">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis 
                            dataKey="year" 
                            stroke="#64748b" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false} 
                            dy={10}
                        />
                        <YAxis 
                            stroke="#64748b" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                        />
                        <RechartsTooltip 
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                            itemStyle={{ color: '#a855f7' }}
                            cursor={{ stroke: '#a855f7', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="students" 
                            stroke="#a855f7" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorStudents)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Insight Banner */}
        <div 
            className="glass-panel rounded-2xl p-6 sm:p-8 border-l-4 border-l-neon-400 flex flex-col items-start gap-4 shadow-lg opacity-0 animate-slide-up"
            style={{ animationDelay: '500ms' }}
        >
            <div className="flex items-center gap-3 w-full">
                <div className="bg-neon-400/10 p-2 rounded-full border border-neon-400/20">
                    <Trophy size={20} className="text-neon-400" />
                </div>
                <h4 className="text-neon-400 font-display font-bold text-sm uppercase tracking-wide">Strategic Assessment</h4>
            </div>
            <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-light italic">
                "{data.insight}"
            </p>
        </div>
      
        {/* CTA Section */}
        <div 
            className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-slide-up"
            style={{ animationDelay: '700ms' }}
        >
            {/* Website Button */}
            <a 
                href="https://remakingagency.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-gray-200 text-black font-display font-bold text-sm tracking-wider uppercase rounded-2xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:-translate-y-1 active:scale-95"
            >
                <span>Partner with Us</span>
                <ExternalLink size={16} />
            </a>

            {/* Instagram Button */}
            <a 
                href="https://www.instagram.com/remakingagency/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-3 px-8 py-4 bg-[#1e293b] border border-white/10 hover:border-pink-500/50 hover:bg-[#2d1b36] text-white font-display font-bold text-sm tracking-wider uppercase rounded-2xl transition-all group hover:-translate-y-1 active:scale-95"
            >
                <span>Follow</span>
                <Instagram size={16} className="text-pink-500 group-hover:text-pink-400" />
            </a>
        </div>
        
        <div className="text-center pt-4 opacity-0 animate-slide-up" style={{ animationDelay: '800ms' }}>
            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                System Status: Ready for Deployment
            </p>
        </div>
      </div>

    </div>
  );
};

export default ResultsView;