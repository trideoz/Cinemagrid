
import React, { useState, useEffect, useCallback } from 'react';
import { PanelConfig } from './types';
import { DEFAULT_PANELS, PROMPT_TEMPLATE, ANGLE_TYPES, NARRATIVE_TYPES, getAllowedShotsForPanel } from './constants';
import { PanelCard } from './components/PanelCard';
import { EditorPanel } from './components/EditorPanel';
import { IconCamera, IconCopy, IconRefresh, IconCheck, IconGrid, IconDice } from './components/Icons';

function App() {
  const [panels, setPanels] = useState<PanelConfig[]>(DEFAULT_PANELS);
  const [activePanelId, setActivePanelId] = useState<number | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleUpdatePanel = useCallback((id: number, field: keyof PanelConfig, value: string) => {
    setPanels(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  }, []);

  const constructPrompt = useCallback(() => {
    let result = PROMPT_TEMPLATE;
    panels.forEach(p => {
      const shotRegex = new RegExp(`\\[SHOT_${p.id}\\]`, 'g');
      const angleRegex = new RegExp(`\\[ANGLE_${p.id}\\]`, 'g');
      const narrativeRegex = new RegExp(`\\[NARRATIVE_${p.id}\\]`, 'g');
      
      result = result.replace(shotRegex, p.shot)
                     .replace(angleRegex, p.angle)
                     .replace(narrativeRegex, p.narrative);
    });
    return result.trim();
  }, [panels]);

  useEffect(() => {
    setGeneratedPrompt(constructPrompt());
  }, [panels, constructPrompt]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const resetGrid = () => {
    setPanels(DEFAULT_PANELS);
    setActivePanelId(null);
  };

  const randomizeGrid = () => {
    const newPanels = panels.map(p => {
        const allowedShots = getAllowedShotsForPanel(p.id);
        const randomShot = allowedShots[Math.floor(Math.random() * allowedShots.length)];
        const randomAngle = ANGLE_TYPES[Math.floor(Math.random() * ANGLE_TYPES.length)];
        const randomNarrative = NARRATIVE_TYPES[Math.floor(Math.random() * NARRATIVE_TYPES.length)];
        return {
            ...p,
            shot: randomShot,
            angle: randomAngle,
            narrative: randomNarrative
        };
    });
    setPanels(newPanels);
  };

  const isEditorOpen = activePanelId !== null;

  return (
    <div className="min-h-screen bg-cinematic-950 text-cinematic-text font-sans flex flex-col selection:bg-cinematic-accent selection:text-cinematic-900">
      
      {/* Header */}
      <header className="flex-none flex items-center justify-between px-6 py-4 border-b border-cinematic-800 bg-cinematic-900 z-30 shadow-2xl relative">
        <div className="flex items-center gap-4">
            <h1 className="text-lg font-black tracking-tighter text-white flex items-center gap-2">
                <IconGrid className="text-cinematic-accent w-5 h-5" />
                CINEMA<span className="text-cinematic-accent">GRID</span>
            </h1>
        </div>
        
        <div className="flex items-center gap-3">
            <button 
                onClick={randomizeGrid}
                className="flex items-center gap-2 px-3 py-1.5 rounded bg-cinematic-800 text-cinematic-text hover:bg-cinematic-700 border border-cinematic-600 transition-all text-xs font-bold uppercase tracking-wider group"
                title="Randomize all panels"
            >
                <IconDice className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" /> 
                <span className="hidden sm:inline">Randomize</span>
            </button>
            <button 
                onClick={resetGrid}
                className="flex items-center gap-2 px-3 py-1.5 rounded bg-cinematic-900 text-cinematic-muted hover:text-white border border-cinematic-800 hover:border-cinematic-600 transition-all text-xs font-bold uppercase tracking-wider"
            >
                <IconRefresh className="w-4 h-4" /> Reset
            </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 relative flex overflow-hidden min-h-[600px]">
        
        {/* Left Side: The Grid Canvas */}
        <div 
            className={`
                flex-none flex flex-col items-center justify-center p-4 sm:p-8 transition-all duration-500 ease-in-out
                ${isEditorOpen ? 'w-full lg:w-[45%] opacity-0 lg:opacity-100 hidden lg:flex' : 'w-full'}
                bg-cinematic-950
            `}
        >
             <div className={`transition-all duration-500 ${isEditorOpen ? 'scale-90' : 'scale-100'}`}>
                <div className="flex items-center justify-between mb-4 w-full max-w-[450px]">
                    <div className="flex items-center gap-2 text-cinematic-muted">
                        <IconCamera className="w-4 h-4"/> 
                        <span className="text-xs font-bold uppercase tracking-widest">Contact Sheet</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 w-full max-w-[450px] aspect-square bg-black p-2 border border-cinematic-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    {panels.map((panel) => (
                        <PanelCard 
                            key={panel.id}
                            panel={panel}
                            isActive={activePanelId === panel.id}
                            onClick={() => setActivePanelId(panel.id)}
                            onUpdate={handleUpdatePanel}
                        />
                    ))}
                </div>

                 {!isEditorOpen && (
                    <div className="mt-8 text-center animate-fade-in">
                        <p className="text-sm text-cinematic-500 font-medium italic">Select a frame to begin editing shot parameters.</p>
                    </div>
                 )}
            </div>
        </div>

        {/* Right Side: Editor Panel (Slides In) */}
        <div 
            className={`
                absolute top-0 right-0 h-full bg-cinematic-900 border-l border-cinematic-800 shadow-2xl
                transition-all duration-500 ease-in-out z-20
                ${isEditorOpen ? 'translate-x-0 opacity-100 w-full lg:w-[55%]' : 'translate-x-full opacity-0 w-0'}
            `}
        >
             <EditorPanel 
                  panel={panels.find(p => p.id === activePanelId) || null}
                  onUpdate={handleUpdatePanel}
                  onClose={() => setActivePanelId(null)}
             />
        </div>

      </div>

      {/* Footer: Prompt Output */}
      <footer className="flex-none bg-cinematic-900 border-t border-cinematic-800 p-4 z-40">
         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-start gap-4">
             <div className="flex-1">
                 <div className="flex items-center justify-between mb-2">
                     <span className="text-[10px] font-bold text-cinematic-500 uppercase tracking-widest">
                         Final Prompt Preview
                     </span>
                 </div>
                 <div className="relative">
                    <div className="h-20 overflow-y-auto bg-cinematic-950 rounded border border-cinematic-800 p-3 text-[10px] font-mono text-cinematic-400 cinegrid-scrollbar">
                        {generatedPrompt}
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-cinematic-950 to-transparent pointer-events-none"/>
                 </div>
             </div>
             
             <button 
                onClick={copyToClipboard}
                className={`
                    flex items-center justify-center gap-2 px-6 py-4 sm:h-24 rounded font-bold uppercase tracking-wider transition-all
                    ${isCopied ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-cinematic-accent text-cinematic-900 hover:bg-cinematic-accentHover hover:shadow-[0_0_15px_rgba(234,179,8,0.4)]'}
                `}
             >
                {isCopied ? <IconCheck className="w-5 h-5" /> : <IconCopy className="w-5 h-5" />}
                <span className="text-xs">{isCopied ? 'Copied' : 'Copy Prompt'}</span>
             </button>
         </div>
      </footer>

    </div>
  );
}

export default App;