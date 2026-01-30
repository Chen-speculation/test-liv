import React, { useState } from 'react';
import { ArrowLeft, Mic, UserPlus } from 'lucide-react';
import { Character } from '../App';

interface SessionSetupProps {
  characters: Character[];
  onStart: (character: Character | null) => void;
  onBack: () => void;
}

export const SessionSetup: React.FC<SessionSetupProps> = ({ characters, onStart, onBack }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleStart = () => {
    const char = characters.find(c => c.id === selectedId) || null;
    onStart(char);
  };

  return (
    <div className="max-w-2xl mx-auto pt-8 animate-fade-in">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            返回首页
        </button>

        <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-rose-500 to-violet-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-rose-500/20">
                <Mic className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">配置实时助手</h2>
            <p className="text-slate-400">系统已就绪。请选择当前对话的攻略对象，以便 AI 提供更有针对性的性格分析。</p>
        </div>

        <div className="glass-panel rounded-2xl p-8 border border-white/10">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-medium">选择角色</h3>
                <span className="text-xs text-slate-500">或选择"未知角色"用于通用场景</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div 
                    onClick={() => setSelectedId(null)}
                    className={`cursor-pointer rounded-xl border p-4 flex flex-col items-center gap-3 transition-all ${
                        selectedId === null 
                        ? 'bg-rose-500/20 border-rose-500 shadow-[0_0_15px_-5px_rgba(244,63,94,0.5)]' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10'
                    }`}
                >
                    <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-slate-400">?</div>
                    <span className={`text-sm ${selectedId === null ? 'text-white' : 'text-slate-400'}`}>未知角色</span>
                </div>

                {characters.map(char => (
                    <div 
                        key={char.id}
                        onClick={() => setSelectedId(char.id)}
                        className={`cursor-pointer rounded-xl border p-4 flex flex-col items-center gap-3 transition-all ${
                            selectedId === char.id 
                            ? 'bg-rose-500/20 border-rose-500 shadow-[0_0_15px_-5px_rgba(244,63,94,0.5)]' 
                            : 'bg-white/5 border-white/5 hover:bg-white/10'
                        }`}
                    >
                        <div className={`w-12 h-12 rounded-full ${char.avatar} flex items-center justify-center text-white font-bold`}>
                            {char.name[0]}
                        </div>
                        <span className={`text-sm ${selectedId === char.id ? 'text-white' : 'text-slate-400'}`}>{char.name}</span>
                    </div>
                ))}

                <div className="rounded-xl border border-dashed border-white/10 p-4 flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-white hover:bg-white/5 cursor-pointer transition-colors">
                    <UserPlus className="w-6 h-6" />
                    <span className="text-xs">添加</span>
                </div>
            </div>

            <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 rounded-lg bg-black/20 border border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <div className="flex flex-col">
                            <span className="text-sm text-white font-medium">语音识别服务 (ASR)</span>
                            <span className="text-xs text-slate-500">已连接 • 低延迟模式</span>
                        </div>
                    </div>
                 </div>
                 <div className="flex items-center justify-between p-4 rounded-lg bg-black/20 border border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <div className="flex flex-col">
                            <span className="text-sm text-white font-medium">AI 建议服务 (LLM)</span>
                            <span className="text-xs text-slate-500">Gemini 2.5 Flash • 情感模块加载完毕</span>
                        </div>
                    </div>
                 </div>
            </div>

            <button 
                onClick={handleStart}
                className="w-full mt-8 py-4 bg-gradient-to-r from-rose-500 to-violet-600 rounded-xl text-white font-bold tracking-wide hover:shadow-lg hover:shadow-rose-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
                开始实时对话
            </button>
        </div>
    </div>
  );
};