import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { LiveSession } from './components/LiveSession';
import { Targets } from './components/Targets';
import { History } from './components/History';
import { SessionSetup } from './components/SessionSetup';

export type ViewState = 'dashboard' | 'targets' | 'history' | 'setup' | 'session';
export type Character = {
  id: string;
  name: string;
  avatar: string; // Color code or image url
  tags: string[];
  affinity: number; // 0-100
  lastInteracted: string;
};

// Mock data shared across components
const INITIAL_CHARACTERS: Character[] = [
  { id: '1', name: 'Anya', avatar: 'bg-rose-500', tags: ['艺术', '内向', '电影迷'], affinity: 45, lastInteracted: '2小时前' },
  { id: '2', name: 'Chloe', avatar: 'bg-violet-500', tags: ['职场', '强势', '咖啡'], affinity: 72, lastInteracted: '1天前' },
];

export default function App() {
  const [view, setView] = useState<ViewState>('dashboard');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [characters, setCharacters] = useState<Character[]>(INITIAL_CHARACTERS);

  const handleStartSession = (char: Character | null) => {
    setSelectedCharacter(char);
    setView('session');
  };

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard onNavigate={setView} />;
      case 'targets':
        return <Targets characters={characters} />;
      case 'history':
        return <History />;
      case 'setup':
        return <SessionSetup characters={characters} onStart={handleStartSession} onBack={() => setView('dashboard')} />;
      case 'session':
        return <LiveSession character={selectedCharacter} onExit={() => setView('dashboard')} />;
      default:
        return <Dashboard onNavigate={setView} />;
    }
  };

  return (
    <div className="min-h-screen relative selection:bg-rose-500/30 selection:text-rose-200">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-[-1] mesh-gradient opacity-80 pointer-events-none" />
      
      {/* Ambient Orbs - Dynamic positions based on view could be cool, keeping static for performance */}
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse-slow" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] bg-rose-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      {/* Hide Navbar in immersive session mode */}
      {view !== 'session' && <Navbar currentView={view} onViewChange={setView} />}
      
      <main className={`container mx-auto px-4 ${view !== 'session' ? 'pt-24 pb-12' : 'h-screen py-6'} relative z-10 transition-all duration-500`}>
        {renderView()}
      </main>
    </div>
  );
}