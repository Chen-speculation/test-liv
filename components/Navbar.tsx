import React from 'react';
import { Settings, User, History as HistoryIcon, Sparkles, LayoutGrid } from 'lucide-react';
import { ViewState } from '../App';

interface NavbarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-black/10 backdrop-blur-md border-b border-white/5 transition-all duration-500">
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => onViewChange('dashboard')}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-500 to-violet-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center border border-white/10">
            <Sparkles className="w-5 h-5 text-rose-400" />
          </div>
        </div>
        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          LiveGal
        </span>
      </div>

      <div className="hidden md:flex items-center gap-1">
        <NavButton 
          icon={<LayoutGrid className="w-4 h-4" />} 
          label="总览" 
          active={currentView === 'dashboard'}
          onClick={() => onViewChange('dashboard')}
        />
        <NavButton 
          icon={<User className="w-4 h-4" />} 
          label="攻略对象" 
          active={currentView === 'targets'}
          onClick={() => onViewChange('targets')}
        />
        <NavButton 
          icon={<HistoryIcon className="w-4 h-4" />} 
          label="历史复盘" 
          active={currentView === 'history'}
          onClick={() => onViewChange('history')}
        />
        <div className="w-px h-6 bg-white/10 mx-2"></div>
        <NavButton 
          icon={<Settings className="w-4 h-4" />} 
          label="设置" 
          active={false}
          onClick={() => {}} 
        />
      </div>
    </nav>
  );
};

const NavButton = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${active ? 'bg-white/10 text-white shadow-[0_0_15px_-3px_rgba(255,255,255,0.1)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);