import React from 'react';
import { PlayCircle, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';

export const History: React.FC = () => {
  const sessions = [
    { id: 1, target: 'Anya', date: '今天 14:30', score: 85, summary: '聊到了关于电影的共同话题，情感共鸣强烈。' },
    { id: 2, target: 'Unknown', date: '昨天 20:15', score: 40, summary: '开场白略显尴尬，未能成功破冰。' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div className="flex justify-between items-end">
            <div>
            <h2 className="text-3xl font-serif italic text-white mb-2">复盘分析</h2>
            <p className="text-slate-400 font-light">AI 辅助分析历史对话中的关键决策点。</p>
            </div>
        </div>

        <div className="space-y-4">
            {sessions.map(session => (
                <div key={session.id} className="glass-panel p-6 rounded-2xl flex items-center gap-6 group hover:border-white/10 transition-all cursor-pointer">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${session.score >= 80 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                        {session.score}
                    </div>
                    
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-white font-medium">与 {session.target} 的对话</h3>
                            <span className="text-xs text-slate-500 px-2 py-0.5 rounded-full border border-white/10">{session.date}</span>
                        </div>
                        <p className="text-slate-400 text-sm">{session.summary}</p>
                    </div>

                    <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-white flex items-center gap-2 transition-colors">
                        <PlayCircle className="w-4 h-4" />
                        生成复盘
                    </button>
                </div>
            ))}
        </div>

        {/* Example Replay UI Placeholder */}
        <div className="mt-12 pt-8 border-t border-white/5">
             <h3 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-6">关键决策点分析示例</h3>
             
             <div className="relative pl-8 border-l border-white/10 space-y-8">
                <div className="relative">
                    <div className="absolute -left-[37px] w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-600"></div>
                    <p className="text-slate-500 text-xs mb-1">00:45</p>
                    <div className="p-4 rounded-xl bg-slate-900 border border-white/5">
                        <p className="text-slate-300 text-sm">她问："你平时周末都干嘛？"</p>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -left-[37px] w-4 h-4 rounded-full bg-rose-500 border-4 border-black box-content shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
                    <p className="text-rose-400 text-xs mb-1 font-bold">关键失误</p>
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                        <p className="text-white text-sm mb-2">你说："就在家睡觉，没什么特别的。"</p>
                        <div className="flex items-start gap-2 text-xs text-rose-300 bg-black/20 p-2 rounded">
                            <AlertCircle className="w-3 h-3 mt-0.5" />
                            <span>AI 分析: 这种回答被称为"话题终结者"。错失了展示个人魅力和生活情趣的机会。</span>
                        </div>
                    </div>
                </div>

                <div className="relative">
                     <div className="absolute -left-[37px] w-4 h-4 rounded-full bg-emerald-500 border-2 border-black"></div>
                     <p className="text-emerald-400 text-xs mb-1">如果当时...</p>
                     <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 border-dashed">
                        <div className="flex items-center gap-2 mb-1">
                             <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                             <span className="text-xs font-bold text-emerald-400">推荐回复</span>
                        </div>
                        <p className="text-slate-200 text-sm">"最近在研究手冲咖啡，或者去附近那个新开的画展逛逛。你呢？感觉你是个很会享受周末的人。"</p>
                     </div>
                </div>
             </div>
        </div>
    </div>
  );
};