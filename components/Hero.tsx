import React from 'react';
import { Mic, ArrowRight, Zap, Shield, Play } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 pt-10">
      <div className="flex-1 space-y-8 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono uppercase tracking-wider mb-4 animate-float">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
          Gemini 2.5 驱动
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
          驾驭 <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 font-serif italic pr-2">
            沟通的艺术
          </span>
        </h1>
        
        <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
          你的实时 AI 僚机。LiveGal 实时分析语音语调与上下文，即刻提供完美回复建议。不仅仅是聊天，更是心与心的连接。
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
          <button 
            onClick={onStart}
            className="group relative px-8 py-4 bg-white text-slate-950 rounded-full font-semibold text-sm tracking-wide overflow-hidden transition-all hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rose-200 via-teal-200 to-violet-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative flex items-center gap-2">
              <Mic className="w-4 h-4" />
              开启会话
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button className="px-8 py-4 rounded-full text-sm font-medium text-slate-400 hover:text-white border border-transparent hover:border-white/10 hover:bg-white/5 transition-all flex items-center gap-2">
            <Play className="w-4 h-4 fill-current" />
            观看演示
          </button>
        </div>

        <div className="pt-12 grid grid-cols-3 gap-8 border-t border-white/5">
          <Stat label="低延迟" value="<200ms" />
          <Stat label="上下文记忆" value="4k Tokens" />
          <Stat label="情感分析" value="实时" />
        </div>
      </div>

      <div className="flex-1 w-full relative">
        {/* Abstract Interface Graphic */}
        <div className="relative z-10 w-full aspect-square max-w-lg mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-violet-500/20 rounded-full blur-[60px]" />
            
            <div className="glass-panel w-full h-full rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-2xl">
               {/* Decorative header */}
               <div className="flex justify-between items-center mb-6 opacity-50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="text-[10px] font-mono tracking-widest">LIVE_ANALYSIS_V2</div>
               </div>

               {/* Mock Chat Items */}
               <div className="space-y-4 flex-1">
                  <ChatBubble side="left" text="有时候我真的不知道你想要什么。" />
                  <div className="flex items-center gap-2 my-2 opacity-50">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent"></div>
                    <span className="text-[10px] text-rose-400 font-mono">情感识别: 沮丧/受挫</span>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent"></div>
                  </div>
                  <ChatBubble side="right" text="我理解你的感受。我只是想试着去..." isTyping />
                  
                  {/* AI Suggestion Floating Card */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-slate-900/90 border border-rose-500/30 rounded-xl p-4 shadow-lg backdrop-blur-md animate-float">
                        <div className="flex items-center gap-2 mb-2 text-rose-400">
                            <Zap className="w-3 h-3 fill-current" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">推荐回复</span>
                        </div>
                        <p className="text-sm text-slate-200">
                           "抱歉让你觉得被忽视了。我们能重新开始吗？我很在乎你的想法。"
                        </p>
                    </div>
                  </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value }: { label: string, value: string }) => (
  <div>
    <div className="text-2xl font-light text-white font-mono">{value}</div>
    <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">{label}</div>
  </div>
);

const ChatBubble = ({ side, text, isTyping }: { side: 'left' | 'right', text: string, isTyping?: boolean }) => (
  <div className={`flex ${side === 'right' ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
      side === 'right' 
        ? 'bg-white/10 text-white rounded-br-sm' 
        : 'bg-black/30 text-slate-300 rounded-bl-sm border border-white/5'
    }`}>
      {text}
      {isTyping && <span className="inline-block w-1 h-4 ml-1 bg-rose-400 animate-pulse align-middle" />}
    </div>
  </div>
);