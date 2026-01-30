import React from 'react';
import { Mic, ArrowRight, Activity, Users, MessageSquare } from 'lucide-react';
import { ViewState } from '../App';

interface DashboardProps {
  onNavigate: (view: ViewState) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
      {/* Hero / Welcome Section */}
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          
          <h1 className="text-5xl font-semibold tracking-tight text-white leading-[1.1]">
            准备好开始
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 font-serif italic">
              下一场对话了吗？
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-lg font-light">
            LiveGal 已就绪。我们将实时分析语音语调，为您提供战术级的情感交互建议。
          </p>
          
          <div className="flex gap-4 pt-4">
             <button 
              onClick={() => onNavigate('setup')}
              className="group relative px-8 py-4 bg-white text-slate-950 rounded-full font-semibold text-sm tracking-wide overflow-hidden transition-all hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-rose-200 via-teal-200 to-violet-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center gap-2">
                <Mic className="w-4 h-4" />
                启动实时助手
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
        
        {/* Right Side Visuals (Abstract) */}
        <div className="flex-1 w-full flex justify-center lg:justify-end">
             <div className="relative w-full max-w-md aspect-[4/3]">
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-violet-500/20 rounded-full blur-[80px]" />
                <div className="glass-panel w-full h-full rounded-2xl border border-white/10 p-6 relative overflow-hidden flex items-center justify-center">
                    <div className="text-center space-y-2">
                         <div className="w-16 h-16 mx-auto bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-white/5 shadow-inner">
                            <Activity className="w-8 h-8 text-rose-500 animate-pulse" />
                         </div>
                         <div className="text-2xl font-mono text-white">等待指令</div>
                         <div className="text-xs text-slate-500 uppercase tracking-widest">Awaiting Audio Input</div>
                    </div>
                </div>
             </div>
        </div>
      </div>

      {/* Stats / Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard 
          icon={Users}
          color="violet"
          title="活跃攻略对象"
          value="2"
          subtext="平均好感度 58%"
          onClick={() => onNavigate('targets')}
        />
        <DashboardCard 
          icon={MessageSquare}
          color="emerald"
          title="历史对话"
          value="14"
          subtext="3 个待复盘关键点"
          onClick={() => onNavigate('history')}
        />
         <DashboardCard 
          icon={Activity}
          color="rose"
          title="今日表现"
          value="S"
          subtext="幽默感提升显著"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

interface DashboardCardProps {
    icon: React.ElementType;
    color: 'violet' | 'emerald' | 'rose';
    title: string;
    value: string;
    subtext: string;
    onClick: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon: Icon, color, title, value, subtext, onClick }) => {
  // Styles mapping based on color prop
  const styles = {
    violet: {
        icon: 'text-violet-400',
        glow: 'bg-violet-500/20 shadow-[0_0_20px_rgba(139,92,246,0.3)]',
        border: 'border-violet-500/20'
    },
    emerald: {
        icon: 'text-emerald-400',
        glow: 'bg-emerald-500/20 shadow-[0_0_20px_rgba(52,211,153,0.3)]',
        border: 'border-emerald-500/20'
    },
    rose: {
        icon: 'text-rose-400',
        glow: 'bg-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.3)]',
        border: 'border-rose-500/20'
    }
  };

  const currentStyle = styles[color];

  return (
    <div 
        onClick={onClick}
        className="glass-panel p-6 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group border border-white/5 hover:border-white/10 relative overflow-hidden"
    >
        {/* Subtle background gradient on hover */}
        <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[50px] transition-opacity duration-500 opacity-0 group-hover:opacity-10 bg-${color}-500 pointer-events-none`} />

        <div className="flex justify-between items-start mb-6 relative z-10">
        {/* New Icon Style: Floating Glass Effect */}
        <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center border backdrop-blur-md transition-transform duration-300 group-hover:scale-105 ${currentStyle.border} ${currentStyle.glow}`}>
            <Icon className={`w-6 h-6 ${currentStyle.icon}`} />
        </div>
        
        <div className="p-2 -mr-2 -mt-2 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
            <ArrowRight className="w-4 h-4 text-slate-400" />
        </div>
        </div>
        
        <div className="space-y-1 relative z-10">
            <div className="text-4xl font-light text-white tracking-tight">{value}</div>
            <div className="text-sm text-slate-400 font-medium">{title}</div>
            <div className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                <span className={`w-1 h-1 rounded-full ${currentStyle.icon.replace('text-', 'bg-')}`}></span>
                {subtext}
            </div>
        </div>
    </div>
  );
};