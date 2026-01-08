
import React, { useState } from 'react';
import { PanelConfig, ShotType, AngleType, NarrativeType } from '../types';
import { 
    ANGLE_TYPES, 
    SHOT_DESCRIPTIONS, 
    ANGLE_DESCRIPTIONS, 
    NARRATIVE_DESCRIPTIONS, 
    getShotRuleForPanel, 
    TOP_NARRATIVES, 
    NARRATIVE_CATEGORIES 
} from '../constants';
import { IconChevronDown, IconChevronUp, IconX, IconFilm, IconEye, IconWand } from './Icons';

interface EditorPanelProps {
  panel: PanelConfig | null;
  onUpdate: (id: number, field: keyof PanelConfig, value: string) => void;
  onClose: () => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({ panel, onUpdate, onClose }) => {
  const [showAllNarratives, setShowAllNarratives] = useState(false);
  const [showAllShots, setShowAllShots] = useState(false);

  if (!panel) return null;

  const shotRules = getShotRuleForPanel(panel.id);

  return (
    <div className="h-full flex flex-col bg-cinematic-900 border-l border-cinematic-800 shadow-2xl">
      {/* Header */}
      <div className="flex-none px-6 py-5 border-b border-cinematic-800 flex items-center justify-between bg-cinematic-900/95 backdrop-blur z-20">
        <div>
           <div className="flex items-center gap-2 mb-1">
             <span className="text-[10px] uppercase font-bold text-cinematic-muted tracking-wider">Currently Editing</span>
           </div>
           <h2 className="text-2xl font-black text-cinematic-text tracking-tighter flex items-center gap-2">
            PANEL <span className="text-cinematic-accent text-3xl">#{panel.id}</span>
           </h2>
        </div>
        
        <button 
          onClick={onClose}
          className="p-2 hover:bg-cinematic-800 rounded-full text-cinematic-muted hover:text-white transition-colors"
        >
          <IconX className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            
            {/* ---------------- SECTION 1: SHOT SIZE (Cyan/Teal Theme) ---------------- */}
            <div className="rounded-xl border border-cyan-900/50 bg-gradient-to-br from-cyan-950/30 to-transparent p-5 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <IconFilm className="w-24 h-24 text-cyan-500" />
                 </div>

                 {/* Dynamic Description */}
                 <div className="relative mb-4 min-h-[40px] flex items-center">
                    <p className="text-xs text-cyan-200/80 italic">
                        <span className="text-cyan-500 font-bold not-italic mr-2 uppercase tracking-wider text-[10px]">Shot Size:</span>
                        {SHOT_DESCRIPTIONS[panel.shot]}
                    </p>
                 </div>

                <div className="relative space-y-3">
                    <h3 className="text-[10px] font-bold text-cyan-600 uppercase tracking-[0.2em] border-b border-cyan-900/50 pb-2">
                        Framing
                    </h3>
                    
                    {/* Favorites Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {shotRules.favorites.map((shot) => (
                        <button
                            key={shot}
                            onClick={() => onUpdate(panel.id, 'shot', shot)}
                            className={`px-3 py-3 rounded border text-sm font-bold transition-all duration-200 relative overflow-hidden
                            ${panel.shot === shot 
                                ? 'bg-cyan-600 text-white border-cyan-400 shadow-[0_0_15px_rgba(8,145,178,0.4)]' 
                                : 'bg-cinematic-900/80 text-cyan-100/60 border-cyan-900/50 hover:border-cyan-700 hover:text-white'}
                            `}
                        >
                            {shot}
                        </button>
                        ))}
                    </div>

                    {/* Expandable Extended Grid */}
                    {shotRules.expanded.length > 0 && (
                        <div className="mt-2">
                            {showAllShots ? (
                                <div className="animate-fade-in space-y-2 mt-2">
                                     <div className="grid grid-cols-3 gap-2">
                                        {shotRules.expanded.map((shot) => (
                                            <button
                                                key={shot}
                                                onClick={() => onUpdate(panel.id, 'shot', shot)}
                                                className={`px-2 py-2 rounded border text-xs font-bold transition-all duration-200
                                                ${panel.shot === shot 
                                                    ? 'bg-cyan-600 text-white border-cyan-400' 
                                                    : 'bg-cinematic-900/50 text-cyan-100/50 border-cyan-900/30 hover:border-cyan-700 hover:text-white'}
                                                `}
                                            >
                                                {shot}
                                            </button>
                                        ))}
                                    </div>
                                    <button 
                                        onClick={() => setShowAllShots(false)}
                                        className="w-full flex items-center justify-center gap-2 py-2 text-[10px] font-bold text-cyan-700 hover:text-cyan-400 uppercase tracking-wider transition-colors"
                                    >
                                        <IconChevronUp className="w-3 h-3" /> Show Less
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => setShowAllShots(true)}
                                    className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-cyan-900/50 rounded hover:bg-cyan-950/30 text-[10px] font-bold text-cyan-700 hover:text-cyan-400 uppercase tracking-wider transition-all mt-2"
                                >
                                    <IconChevronDown className="w-3 h-3" /> More Shot Options
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>


            {/* ---------------- SECTION 2: CAMERA ANGLE (Violet/Purple Theme) ---------------- */}
            <div className="rounded-xl border border-violet-900/50 bg-gradient-to-br from-violet-950/30 to-transparent p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <IconEye className="w-24 h-24 text-violet-500" />
                 </div>

                 {/* Dynamic Description */}
                 <div className="relative mb-4 min-h-[40px] flex items-center">
                    <p className="text-xs text-violet-200/80 italic">
                        <span className="text-violet-500 font-bold not-italic mr-2 uppercase tracking-wider text-[10px]">Angle:</span>
                        {ANGLE_DESCRIPTIONS[panel.angle] || 'Select an angle'}
                    </p>
                 </div>

                <div className="relative space-y-3">
                    <h3 className="text-[10px] font-bold text-violet-600 uppercase tracking-[0.2em] border-b border-violet-900/50 pb-2">
                        Perspective
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                        {ANGLE_TYPES.map((angle) => (
                            <button
                                key={angle}
                                onClick={() => onUpdate(panel.id, 'angle', angle)}
                                className={`px-2 py-2 rounded border text-[10px] font-bold transition-all text-center h-full flex items-center justify-center leading-tight
                                ${panel.angle === angle 
                                    ? 'bg-violet-700 text-white border-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.3)]' 
                                    : 'bg-cinematic-900/80 text-violet-100/60 border-violet-900/50 hover:border-violet-600 hover:text-white'}
                                `}
                            >
                            {angle}
                            </button>
                        ))}
                    </div>
                </div>
            </div>


            {/* ---------------- SECTION 3: NARRATIVE INTENT (Amber/Gold Theme) ---------------- */}
            <div className="rounded-xl border border-amber-900/50 bg-gradient-to-br from-amber-950/30 to-transparent p-5 relative overflow-hidden group mb-12">
                 <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <IconWand className="w-24 h-24 text-amber-500" />
                 </div>

                {/* Dynamic Description */}
                <div className="relative mb-4 min-h-[40px] flex items-center">
                    <p className="text-xs text-amber-100/80 italic">
                         <span className="text-amber-500 font-bold not-italic mr-2 uppercase tracking-wider text-[10px]">Narrative:</span>
                         {NARRATIVE_DESCRIPTIONS[panel.narrative] || 'Select narrative intent'}
                    </p>
                </div>

                <div className="relative space-y-3">
                    <h3 className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.2em] flex items-center justify-between border-b border-amber-900/50 pb-2">
                        Storytelling
                    </h3>

                    {/* View Toggle */}
                    {!showAllNarratives ? (
                        /* Top 6 Favorites View */
                        <div className="grid grid-cols-2 gap-2">
                            {TOP_NARRATIVES.map((narrative) => (
                                <button
                                    key={narrative}
                                    onClick={() => onUpdate(panel.id, 'narrative', narrative)}
                                    className={`py-3 px-2 rounded border text-xs font-bold transition-all
                                    ${panel.narrative === narrative
                                        ? 'border-amber-500 text-amber-100 bg-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                                        : 'bg-cinematic-900/80 text-amber-100/50 border-amber-900/50 hover:border-amber-600 hover:text-amber-100'}
                                    `}
                                >
                                    {narrative}
                                </button>
                            ))}
                            <button 
                                onClick={() => setShowAllNarratives(true)}
                                className="col-span-2 py-2 mt-2 flex items-center justify-center gap-2 text-[10px] uppercase font-bold tracking-widest text-amber-700 hover:text-amber-500 transition-colors border border-dashed border-amber-900/50 hover:border-amber-600 rounded"
                            >
                                <IconChevronDown className="w-3 h-3" /> Expanded Narratives
                            </button>
                        </div>
                    ) : (
                        /* Full Categorized View */
                        <div className="space-y-6 animate-fade-in">
                            {Object.entries(NARRATIVE_CATEGORIES).map(([category, items]) => (
                                <div key={category} className="space-y-2">
                                    <h4 className="text-[10px] font-mono text-amber-500/70 border-b border-amber-900/30 pb-1 mb-2">{category}</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {items.map((narrative) => (
                                            <button
                                                key={narrative}
                                                onClick={() => onUpdate(panel.id, 'narrative', narrative)}
                                                className={`py-2 px-2 rounded border text-[11px] font-medium transition-all text-center truncate
                                                ${panel.narrative === narrative
                                                    ? 'border-amber-500 text-amber-100 bg-amber-600'
                                                    : 'bg-cinematic-900/60 text-amber-100/40 border-amber-900/30 hover:bg-amber-900/40 hover:text-amber-100 hover:border-amber-700'}
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
                                className="w-full py-2 mt-4 flex items-center justify-center gap-2 text-[10px] uppercase font-bold tracking-widest text-amber-700 hover:text-amber-500 transition-colors border border-dashed border-amber-900/50 hover:border-amber-600 rounded"
                            >
                                <IconChevronUp className="w-3 h-3" /> Back to Favorites
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};
