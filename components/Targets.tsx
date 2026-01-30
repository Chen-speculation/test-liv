import React from 'react';
import { Plus, Heart, MessageCircle } from 'lucide-react';
import { Character } from '../App';

interface TargetsProps {
  characters: Character[];
}

export const Targets: React.FC<TargetsProps> = ({ characters }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif italic text-white mb-2">攻略对象</h2>
          <p className="text-slate-400 font-light">管理你的人际关系网络与好感度数据。</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-rose-500/20">
          <Plus className="w-4 h-4" />
          添加角色
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((char) => (
          <div key={char.id} className="glass-panel rounded-2xl p-6 relative group hover:bg-white/[0.04] transition-all border border-white/5 hover:border-rose-500/30">
            <div className="absolute top-6 right-6 flex items-center gap-1 text-rose-400">
               <Heart className="w-4 h-4 fill-current" />
               <span className="text-sm font-mono">{char.affinity}%</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-full ${char.avatar} shadow-lg flex items-center justify-center text-xl font-bold text-white`}>
                {char.name[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{char.name}</h3>
                <div className="text-xs text-slate-500 mt-1">上次互动: {char.lastInteracted}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {char.tags.map(tag => (
                <span key={tag} className="px-2 py-1 rounded-md bg-white/5 text-xs text-slate-300 border border-white/5">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Affinity Bar */}
            <div className="space-y-2">
               <div className="flex justify-between text-xs text-slate-500">
                  <span>关系阶段</span>
                  <span>暧昧中</span>
               </div>
               <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-rose-500 to-violet-500" 
                    style={{ width: `${char.affinity}%` }} 
                  />
               </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 flex gap-2">
                <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white transition-colors">
                    查看档案
                </button>
                 <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white transition-colors flex items-center justify-center gap-2">
                    <MessageCircle className="w-3 h-3" />
                    历史对话
                </button>
            </div>
          </div>
        ))}
        
        {/* Add New Placeholder */}
        <div className="border border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[280px] text-slate-500 hover:text-slate-300 hover:border-white/20 hover:bg-white/[0.02] transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium">录入新角色</span>
        </div>
      </div>
    </div>
  );
};