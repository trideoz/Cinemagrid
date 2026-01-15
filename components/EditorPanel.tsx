
import React, { useState } from 'react';
import { PanelConfig, ShotType, AngleType, NarrativeType } from '../types';
import { 
    ANGLE_TYPES, 
    NARRATIVE_TYPES,
    SHOT_DESCRIPTIONS, 
    ANGLE_DESCRIPTIONS, 
    NARRATIVE_DESCRIPTIONS, 
    getShotRuleForPanel, 
    TOP_NARRATIVES, 
    NARRATIVE_CATEGORIES 
} from '../constants';
import { IconChevronDown, IconChevronUp, IconX, IconFilm, IconEye, IconWand, IconCopy, IconCheck, IconDice } from './Icons';

interface EditorPanelProps {
  panel: PanelConfig | null;
  onUpdate: (id: number, field: keyof PanelConfig, value: string) => void;
  onClose: () => void;
}

type AccordionSection = 'shot' | 'angle' | 'narrative' | 'extraction';

export const EditorPanel: React.FC<EditorPanelProps> = ({ panel, onUpdate, onClose }) => {
  const [openSection, setOpenSection] = useState<AccordionSection>('shot');
  const [showAllNarratives, setShowAllNarratives] = useState(false);
  const [showAllShots, setShowAllShots] = useState(false);
  const [isExtractedCopied, setIsExtractedCopied] = useState(false);
  const [isRandomizing, setIsRandomizing] = useState(false);

  if (!panel) return null;

  const shotRules = getShotRuleForPanel(panel.id);
  const extractionPrompt = `Extract and enhance only panel "${panel.id} — ${panel.shot}" with the same visual style, composition, shape, colors. No label.`;

  const copyExtractionPrompt = () => {
    navigator.clipboard.writeText(extractionPrompt);
    setIsExtractedCopied(true);
    setTimeout(() => setIsExtractedCopied(false), 2000);
  };

  const randomizeCurrentPanel = () => {
    setIsRandomizing(true);
    const allowedShots = [...shotRules.favorites, ...shotRules.expanded];
    const randomShot = allowedShots[Math.floor(Math.random() * allowedShots.length)];
    const randomAngle = ANGLE_TYPES[Math.floor(Math.random() * ANGLE_TYPES.length)];
    const randomNarrative = NARRATIVE_TYPES[Math.floor(Math.random() * NARRATIVE_TYPES.length)];
    
    onUpdate(panel.id, 'shot', randomShot);
    onUpdate(panel.id, 'angle', randomAngle);
    onUpdate(panel.id, 'narrative', randomNarrative);
    
    setTimeout(() => setIsRandomizing(false), 500);
  };

  const toggleSection = (section: AccordionSection) => {
    setOpenSection(section);
  };

  return (
    <div className="h-full flex flex-col bg-cinematic-950 border-l border-cinematic-800 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex-none px-6 py-6 border-b border-cinematic-800 flex items-center justify-between bg-cinematic-900/95 backdrop-blur z-30">
        <div>
           <div className="flex items-center gap-2 mb-1">
             <span className="text-[10px] uppercase font-black text-cinematic-accent tracking-[0.2em]">Parameter Editor</span>
           </div>
           <h2 className="text-3xl font-black text-white tracking-tighter flex items-center gap-3">
            PANEL <span className="bg-cinematic-accent text-cinematic-950 px-3 py-0.5 rounded italic">#{panel.id}</span>
           </h2>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={randomizeCurrentPanel}
            className={`flex items-center gap-2 p-2 px-3 rounded-lg text-cinematic-muted transition-all group
              ${isRandomizing ? 'bg-cinematic-accent text-cinematic-900' : 'hover:bg-cinematic-800 hover:text-cinematic-accent'}
            `}
            title="Randomize this panel"
          >
            <IconDice className={`w-5 h-5 transition-transform duration-500 ${isRandomizing ? 'rotate-[360deg]' : 'group-hover:rotate-180'}`} />
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Randomize</span>
          </button>
          
          <button 
            onClick={onClose}
            className="p-2 hover:bg-cinematic-800 rounded-full text-cinematic-muted hover:text-white transition-all transform hover:rotate-90"
          >
            <IconX className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth cinegrid-scrollbar bg-cinematic-950/50">
        
        {/* ---------------- SECTION 1: SHOT SIZE ---------------- */}
        <section className={`rounded-xl border transition-all duration-300 overflow-hidden ${openSection === 'shot' ? 'border-cyan-500 bg-cyan-950/10' : 'border-cinematic-800 bg-cinematic-900/40 hover:border-cinematic-700'}`}>
          <button 
            onClick={() => toggleSection('shot')}
            className="w-full px-5 py-4 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg transition-colors ${openSection === 'shot' ? 'bg-cyan-500 text-cyan-950' : 'bg-cinematic-800 text-cyan-500'}`}>
                <IconFilm className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-xs font-black uppercase tracking-widest text-white">Shot Size</h3>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[11px] font-black px-1.5 py-0.5 rounded ${openSection === 'shot' ? 'bg-cyan-500 text-cyan-950' : 'bg-cinematic-800 text-cyan-400'}`}>
                        {panel.shot}
                    </span>
                    <span className="text-[10px] font-bold text-cinematic-600 truncate max-w-[150px]">
                        — Coverage
                    </span>
                </div>
              </div>
            </div>
            <IconChevronDown className={`w-5 h-5 text-cinematic-600 transition-transform duration-300 ${openSection === 'shot' ? 'rotate-180 text-cyan-500' : 'group-hover:text-cyan-600'}`} />
          </button>

          {openSection === 'shot' && (
            <div className="px-5 pb-6 animate-fade-in">
              <div className="bg-cyan-500/10 border-l-4 border-cyan-500 rounded-r-lg p-4 mb-5 shadow-lg">
                <p className="text-xs text-cyan-50/90 leading-relaxed font-medium">
                  {SHOT_DESCRIPTIONS[panel.shot]}
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {shotRules.favorites.map((shot) => (
                  <button
                    key={shot}
                    onClick={() => onUpdate(panel.id, 'shot', shot)}
                    className={`px-3 py-3 rounded-lg border text-[11px] font-black transition-all duration-200 uppercase tracking-wider
                    ${panel.shot === shot 
                        ? 'bg-cyan-600 text-white border-cyan-400 shadow-[0_0_20px_rgba(8,145,178,0.4)] scale-[1.02]' 
                        : 'bg-cinematic-900/80 text-cyan-100/40 border-cinematic-700 hover:border-cyan-700 hover:text-white'}
                    `}
                  >
                    {shot}
                  </button>
                ))}
              </div>

              {shotRules.expanded.length > 0 && (
                <div className="mt-5">
                  {showAllShots ? (
                    <div className="space-y-3 pt-2">
                       <div className="grid grid-cols-3 gap-2">
                          {shotRules.expanded.map((shot) => (
                            <button
                                key={shot}
                                onClick={() => onUpdate(panel.id, 'shot', shot)}
                                className={`px-2 py-2.5 rounded border text-[10px] font-bold transition-all uppercase
                                ${panel.shot === shot 
                                    ? 'bg-cyan-700 text-white border-cyan-400' 
                                    : 'bg-cinematic-900/50 text-cyan-100/30 border-cinematic-800 hover:border-cyan-800 hover:text-white'}
                                `}
                            >
                                {shot}
                            </button>
                          ))}
                        </div>
                        <button 
                          onClick={() => setShowAllShots(false)}
                          className="w-full flex items-center justify-center gap-2 py-3 text-[10px] font-black text-cyan-700 hover:text-cyan-400 uppercase tracking-[0.2em] transition-colors"
                        >
                          <IconChevronUp className="w-3 h-3" /> Show Favorites
                        </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setShowAllShots(true)}
                      className="w-full flex items-center justify-center gap-2 py-4 border border-dashed border-cyan-900/50 rounded-xl hover:bg-cyan-500/5 text-[10px] font-black text-cyan-600 hover:text-cyan-400 uppercase tracking-[0.2em] transition-all"
                    >
                      <IconChevronDown className="w-3 h-3" /> All Variations
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </section>

        {/* ---------------- SECTION 2: CAMERA ANGLE ---------------- */}
        <section className={`rounded-xl border transition-all duration-300 overflow-hidden ${openSection === 'angle' ? 'border-violet-500 bg-violet-950/10' : 'border-cinematic-800 bg-cinematic-900/40 hover:border-cinematic-700'}`}>
          <button 
            onClick={() => toggleSection('angle')}
            className="w-full px-5 py-4 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg transition-colors ${openSection === 'angle' ? 'bg-violet-500 text-violet-950' : 'bg-cinematic-800 text-violet-500'}`}>
                <IconEye className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-xs font-black uppercase tracking-widest text-white">Camera Angle</h3>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${openSection === 'angle' ? 'bg-violet-500 text-violet-950' : 'bg-cinematic-800 text-violet-400'}`}>
                        {panel.angle}
                    </span>
                </div>
              </div>
            </div>
            <IconChevronDown className={`w-5 h-5 text-cinematic-600 transition-transform duration-300 ${openSection === 'angle' ? 'rotate-180 text-violet-500' : 'group-hover:text-violet-600'}`} />
          </button>

          {openSection === 'angle' && (
            <div className="px-5 pb-6 animate-fade-in">
              <div className="bg-violet-500/10 border-l-4 border-violet-500 rounded-r-lg p-4 mb-5 shadow-lg">
                <p className="text-xs text-violet-50/90 leading-relaxed font-medium">
                  {ANGLE_DESCRIPTIONS[panel.angle]}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-2.5">
                {ANGLE_TYPES.map((angle) => (
                  <button
                    key={angle}
                    onClick={() => onUpdate(panel.id, 'angle', angle)}
                    className={`px-3 py-3 rounded-lg border text-[11px] font-black transition-all duration-200 leading-tight uppercase tracking-tight
                    ${panel.angle === angle 
                        ? 'bg-violet-600 text-white border-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.3)] scale-[1.02]' 
                        : 'bg-cinematic-900/80 text-violet-100/40 border-cinematic-700 hover:border-violet-600 hover:text-white'}
                    `}
                  >
                    {angle}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ---------------- SECTION 3: NARRATIVE INTENT ---------------- */}
        <section className={`rounded-xl border transition-all duration-300 overflow-hidden ${openSection === 'narrative' ? 'border-amber-500 bg-amber-950/10' : 'border-cinematic-800 bg-cinematic-900/40 hover:border-cinematic-700'}`}>
          <button 
            onClick={() => toggleSection('narrative')}
            className="w-full px-5 py-4 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg transition-colors ${openSection === 'narrative' ? 'bg-amber-500 text-amber-950' : 'bg-cinematic-800 text-amber-500'}`}>
                <IconWand className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-xs font-black uppercase tracking-widest text-white">Narrative Intent</h3>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${openSection === 'narrative' ? 'bg-amber-500 text-amber-950' : 'bg-cinematic-800 text-amber-400'}`}>
                        {panel.narrative}
                    </span>
                </div>
              </div>
            </div>
            <IconChevronDown className={`w-5 h-5 text-cinematic-600 transition-transform duration-300 ${openSection === 'narrative' ? 'rotate-180 text-amber-500' : 'group-hover:text-amber-600'}`} />
          </button>

          {openSection === 'narrative' && (
            <div className="px-5 pb-6 animate-fade-in">
              <div className="bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg p-4 mb-5 shadow-lg">
                <p className="text-xs text-amber-50/90 leading-relaxed font-medium italic">
                  {NARRATIVE_DESCRIPTIONS[panel.narrative] || 'Defines the cinematic purpose of the frame.'}
                </p>
              </div>

              {!showAllNarratives ? (
                <div className="grid grid-cols-2 gap-2.5">
                  {TOP_NARRATIVES.map((narrative) => (
                    <button
                        key={narrative}
                        onClick={() => onUpdate(panel.id, 'narrative', narrative)}
                        className={`py-3.5 px-2 rounded-lg border text-[11px] font-black transition-all uppercase tracking-tight
                        ${panel.narrative === narrative
                            ? 'bg-amber-600 text-white border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                            : 'bg-cinematic-900/80 text-amber-100/40 border-cinematic-700 hover:border-amber-600 hover:text-amber-100'}
                        `}
                    >
                        {narrative}
                    </button>
                  ))}
                  <button 
                    onClick={() => setShowAllNarratives(true)}
                    className="col-span-2 py-4 mt-2 flex items-center justify-center gap-2 text-[10px] uppercase font-black tracking-[0.2em] text-amber-700 hover:text-amber-500 transition-colors border border-dashed border-amber-900/50 hover:border-amber-600 rounded-xl"
                  >
                    <IconChevronDown className="w-3 h-3" /> All Categories
                  </button>
                </div>
              ) : (
                <div className="space-y-6 animate-fade-in max-h-[450px] overflow-y-auto pr-2 cinegrid-scrollbar">
                  {Object.entries(NARRATIVE_CATEGORIES).map(([category, items]) => (
                    <div key={category} className="space-y-2">
                        <h4 className="text-[9px] font-black text-amber-500/50 border-b border-amber-900/30 pb-1.5 mb-2 tracking-[0.3em] uppercase">{category}</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {items.map((narrative) => (
                            <button
                                key={narrative}
                                onClick={() => onUpdate(panel.id, 'narrative', narrative)}
                                className={`py-3 px-2 rounded border text-[10px] font-bold transition-all text-center truncate uppercase tracking-tighter
                                ${panel.narrative === narrative
                                    ? 'border-amber-400 text-white bg-amber-600 shadow-lg'
                                    : 'bg-cinematic-900/60 text-amber-100/30 border-cinematic-800 hover:bg-amber-900/40 hover:text-white hover:border-amber-700'}
                                `}
                            >
                                {narrative}
                            </button>
                          ))}
                        </div>
                    </div>
                  ))}
                  <button 
                    onClick={() => setShowAllNarratives(false)}
                    className="w-full py-4 mt-4 flex items-center justify-center gap-2 text-[10px] uppercase font-black tracking-[0.2em] text-amber-700 hover:text-amber-500 transition-colors border border-dashed border-amber-900/50 hover:border-amber-600 rounded-xl"
                  >
                    <IconChevronUp className="w-3 h-3" /> Back to Essentials
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ---------------- SECTION 4: FRAME EXTRACTION ---------------- */}
        <section className={`rounded-xl border transition-all duration-300 overflow-hidden mb-8 ${openSection === 'extraction' ? 'border-slate-500 bg-slate-900/10' : 'border-cinematic-800 bg-cinematic-900/40 hover:border-cinematic-700'}`}>
          <button 
            onClick={() => toggleSection('extraction')}
            className="w-full px-5 py-4 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg transition-colors ${openSection === 'extraction' ? 'bg-slate-500 text-slate-950' : 'bg-cinematic-800 text-slate-500'}`}>
                <IconCopy className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-xs font-black uppercase tracking-widest text-white">Frame Extraction</h3>
                <p className={`text-[10px] font-bold ${openSection === 'extraction' ? 'text-slate-400' : 'text-cinematic-500'}`}>
                  Single Frame Prompt
                </p>
              </div>
            </div>
            <IconChevronDown className={`w-5 h-5 text-cinematic-600 transition-transform duration-300 ${openSection === 'extraction' ? 'rotate-180 text-slate-500' : 'group-hover:text-slate-600'}`} />
          </button>

          {openSection === 'extraction' && (
            <div className="px-5 pb-6 animate-fade-in">
              <div className="relative mb-5 group">
                <div className="bg-black/60 rounded-xl p-4 border border-slate-800 font-mono text-[10px] text-slate-400 leading-relaxed shadow-inner pr-12 min-h-[80px]">
                    {extractionPrompt}
                </div>
                <div className="absolute top-2 right-2">
                   <button 
                    onClick={copyExtractionPrompt}
                    className={`
                        flex items-center justify-center p-2.5 rounded-lg transition-all shadow-xl
                        ${isExtractedCopied 
                            ? 'bg-green-600 text-white' 
                            : 'bg-slate-700 text-white hover:bg-slate-600 hover:scale-110'}
                    `}
                    title="Copy frame prompt"
                  >
                    {isExtractedCopied ? <IconCheck className="w-4 h-4" /> : <IconCopy className="w-4 h-4" />}
                  </button>
                </div>
                {isExtractedCopied && (
                    <div className="absolute inset-0 bg-green-900/10 border border-green-500/30 rounded-xl pointer-events-none flex items-center justify-center animate-pulse">
                        <span className="text-green-400 font-black uppercase text-[10px] tracking-widest">Prompt Copied to Clipboard</span>
                    </div>
                )}
              </div>
              
              <div className="flex items-start gap-3 px-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-700 mt-1.5 shrink-0" />
                 <p className="text-[10px] text-slate-600 font-medium leading-relaxed italic">
                    Use this instruction to isolate, refine, or upscale this specific panel independently from the 3x3 grid while maintaining continuity.
                 </p>
              </div>
            </div>
          )}
        </section>

      </div>
      
      {/* Selection Summary (Sticky at bottom) */}
      <div className="flex-none p-5 bg-cinematic-900/95 backdrop-blur-xl border-t border-cinematic-800 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-cinematic-950 rounded-xl flex items-center justify-center border border-cinematic-800 shadow-inner group">
            <span className="text-2xl font-black text-cinematic-accent group-hover:scale-110 transition-transform">{panel.id}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white uppercase tracking-wider">{panel.shot}</span>
              <span className="w-1.5 h-1.5 bg-cinematic-700 rounded-full"></span>
              <span className="text-[11px] font-bold text-cinematic-muted truncate max-w-[200px]">{panel.angle}</span>
            </div>
            <div className="text-[10px] text-cinematic-600 font-black uppercase tracking-[0.1em] mt-0.5 truncate border-t border-cinematic-800/50 pt-1">
              {panel.narrative}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
