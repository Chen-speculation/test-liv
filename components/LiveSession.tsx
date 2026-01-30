import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X, Zap, Copy, RefreshCw, Volume2, Wand2, Heart } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Character } from '../App';

interface LiveSessionProps {
  onExit: () => void;
  character: Character | null;
}

export const LiveSession: React.FC<LiveSessionProps> = ({ onExit, character }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const generateSuggestions = async () => {
    if (!process.env.API_KEY) {
        // Fallback simulation based on character context
        setLoading(true);
        setTimeout(() => {
            const contextResponses = character 
                ? [
                    `针对${character.name}的性格，试着聊聊${character.tags[0]}的话题。`,
                    `她似乎对这个话题感兴趣，继续深入问细节。`,
                    `可以适当用幽默化解刚才的严肃气氛。`
                  ]
                : [
                    "这个角度很有趣，能多跟我讲讲吗？",
                    "我以前从没这么想过，你的视角真的很独特。",
                    "如果可以的话，我很想边喝咖啡边听你细聊这个想法。"
                  ];
            
            setSuggestions(contextResponses);
            setLoading(false);
        }, 1200);
        return;
    }

    try {
        setLoading(true);
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Build prompt with character context
        let prompt = `用户说: "${transcription || "沉默中..."}"。`;
        if (character) {
            prompt += ` 对方角色是${character.name}，性格标签：${character.tags.join(',')}。`;
        }
        prompt += ` 给我 3 个高情商、符合语境的回复建议。请直接返回一个 JSON 字符串数组。`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-latest',
            contents: prompt,
             config: {
                responseMimeType: "application/json"
             }
        });
        const json = JSON.parse(response.text || "[]");
        if (Array.isArray(json)) {
            setSuggestions(json);
        }
    } catch (e) {
        console.error("AI Error", e);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    // Canvas visualizer animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let t = 0;

    const draw = () => {
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        if (isListening) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(244, 63, 94, 0.6)'; // Rose color
            ctx.lineWidth = 2;

            for (let i = 0; i < width; i++) {
                const y = height / 2 + Math.sin(i * 0.05 + t) * Math.sin(i * 0.01 + t * 0.5) * 20;
                if (i === 0) ctx.moveTo(i, y);
                else ctx.lineTo(i, y);
            }
            ctx.stroke();
            
            // Second wave
             ctx.beginPath();
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)'; // Violet color
            ctx.lineWidth = 2;
             for (let i = 0; i < width; i++) {
                const y = height / 2 + Math.cos(i * 0.04 - t) * 15;
                if (i === 0) ctx.moveTo(i, y);
                else ctx.lineTo(i, y);
            }
            ctx.stroke();

            t += 0.2;
        } else {
             // Flat line when not listening
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.moveTo(0, height / 2);
            ctx.lineTo(width, height / 2);
            ctx.stroke();
        }
        animationId = requestAnimationFrame(draw);
    };
    
    // Set canvas size for retina
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [isListening]);

  return (
    <div className="max-w-6xl mx-auto animate-fade-in h-full flex flex-col justify-center">
        {/* Header Control */}
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
                <button 
                    onClick={onExit}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white border border-transparent hover:border-white/10"
                >
                    <X className="w-5 h-5" />
                </button>
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        {character ? `正在与 ${character.name} 对话` : '自由对话模式'}
                        {character && (
                             <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/20 flex items-center gap-1">
                                <Heart className="w-3 h-3 fill-current" /> {character.affinity}%
                             </span>
                        )}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${isListening ? 'bg-rose-500 animate-pulse' : 'bg-slate-600'}`}></span>
                        <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
                            {isListening ? 'LIVE AUDIO' : 'STANDBY'}
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                 <div className="px-3 py-1.5 rounded-full bg-black/20 border border-white/5 flex items-center gap-2">
                    <Volume2 className="w-3 h-3 text-slate-400" />
                    <span className="text-xs text-slate-300">环境噪音: 低</span>
                 </div>
            </div>
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
            
            {/* Left: Input/Transcription */}
            <div className="lg:col-span-7 flex flex-col gap-6 min-h-[400px]">
                <div className="glass-panel rounded-3xl p-8 flex-1 flex flex-col relative overflow-hidden group border border-white/10 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />
                    
                    {/* Character Avatar Watermark */}
                    {character && (
                        <div className={`absolute top-[-20px] right-[-20px] w-64 h-64 rounded-full ${character.avatar} opacity-[0.03] blur-3xl pointer-events-none`}></div>
                    )}

                    <div className="flex-1 text-2xl font-light leading-relaxed text-slate-200 flex items-center justify-center text-center p-4">
                        {transcription ? (
                            <span className="animate-fade-in">{transcription}</span>
                        ) : (
                            <div className="space-y-3 opacity-50">
                                <Mic className="w-8 h-8 mx-auto text-slate-600" />
                                <span className="text-slate-500 italic text-base">请点击下方按钮开始说话...</span>
                            </div>
                        )}
                    </div>

                    {/* Audio Visualizer Area */}
                    <div className="h-24 w-full relative mb-4">
                        <canvas ref={canvasRef} className="w-full h-full" />
                    </div>

                    <div className="flex justify-center relative z-10">
                         <button 
                            onClick={() => {
                                setIsListening(!isListening);
                                if (!isListening) {
                                    setTimeout(() => setTranscription(character ? "她问我周末有没有空，但我其实已经约了朋友打游戏，怎么拒绝才不会扣分？" : "对方看起来有点不耐烦，一直在看手机。"), 1000);
                                }
                            }}
                            className={`p-6 rounded-full transition-all duration-300 shadow-xl ${
                                isListening 
                                ? 'bg-rose-500 text-white shadow-rose-500/40 scale-110' 
                                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 hover:scale-105 border border-white/10'
                            }`}
                        >
                            {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Right: AI Suggestions */}
            <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="glass-panel p-6 rounded-2xl border border-white/10 flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
                            <Zap className="w-4 h-4 text-yellow-400 fill-current" />
                            战术建议
                        </h3>
                        <button 
                            onClick={generateSuggestions}
                            disabled={loading}
                            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 disabled:opacity-50 hover:bg-rose-500/10 px-2 py-1 rounded transition-colors"
                        >
                            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                            刷新策略
                        </button>
                    </div>

                    <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                         {suggestions.length === 0 && !loading && (
                            <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center p-4">
                                <Wand2 className="w-8 h-8 mb-3 opacity-30" />
                                <p className="text-sm">等待语音输入以生成实时建议...</p>
                                <button 
                                    onClick={generateSuggestions} 
                                    className="mt-4 text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors border border-white/5"
                                >
                                    模拟生成
                                </button>
                            </div>
                        )}

                        {loading && [1, 2, 3].map((i) => (
                             <div key={i} className="h-24 rounded-xl bg-white/5 animate-pulse border border-white/5"></div>
                        ))}

                        {!loading && suggestions.map((text, idx) => (
                            <div 
                                key={idx} 
                                className="group relative bg-black/40 hover:bg-slate-800/80 border border-white/10 hover:border-rose-500/50 rounded-xl p-5 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg"
                            >
                                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <p className="text-slate-200 text-sm leading-relaxed pr-6 font-medium">{text}</p>
                                
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Copy className="w-3 h-3 text-slate-400 hover:text-white" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Mini Context Panel */}
                <div className="glass-panel p-4 rounded-xl border border-white/10">
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">实时情绪监控</div>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                             <div className="w-[60%] h-full bg-emerald-500"></div>
                        </div>
                        <span className="text-xs text-emerald-400 font-bold">稳定</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};