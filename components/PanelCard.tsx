import React from 'react';
import { PanelConfig, ShotType, AngleType, NarrativeType } from '../types';
import { SHOT_TYPES, ANGLE_TYPES, NARRATIVE_TYPES, SHOT_DESCRIPTIONS } from '../constants';

interface PanelCardProps {
  panel: PanelConfig;
  onUpdate: (id: number, field: keyof PanelConfig, value: string) => void;
  isActive: boolean;
  onClick: () => void;
}

export const PanelCard: React.FC<PanelCardProps> = ({ panel, onUpdate, isActive, onClick }) => {
  return (
    <div 
      className={`relative group border transition-all duration-200 cursor-pointer overflow-hidden flex flex-col
        ${isActive 
          ? 'border-cinematic-accent bg-cinematic-800 shadow-[0_0_15px_rgba(234,179,8,0.2)]' 
          : 'border-cinematic-600 bg-cinematic-700 hover:border-cinematic-muted'
        }
      `}
      onClick={onClick}
      style={{ aspectRatio: '1/1' }} // Enforce square aspect ratio
    >
      {/* Label Badge */}
      <div className="absolute top-2 left-2 z-10">
         <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded
            ${isActive ? 'bg-cinematic-accent text-cinematic-900' : 'bg-cinematic-900 text-cinematic-muted'}
         `}>
           PANEL {panel.id}
         </span>
      </div>

      {/* Main Visual Representation (Abstract) */}
      <div className="flex-1 flex flex-col items-center justify-center p-2 text-center space-y-2 opacity-90 group-hover:opacity-100">
        <div className="text-3xl font-black tracking-tighter text-cinematic-text uppercase">
          {panel.shot}
        </div>
        <div className="flex flex-col gap-1 w-full px-2">
            <span className="text-[10px] uppercase tracking-widest text-cinematic-accent opacity-80 truncate">
                {panel.angle}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-cinematic-muted opacity-60 truncate">
                {panel.narrative}
            </span>
        </div>
      </div>
      
      {/* Editor Overlay (Only visible if active for mobile, or handled externally on desktop? 
         Let's keep inputs hidden in the card to preserve the "grid" look and use a side/bottom panel for editing, 
         OR overlay dropdowns. A "Contact Sheet" should look clean. ) 
         
         Decision: This component is just the visual trigger. The controls are separate.
      */}
      
      <div className={`absolute bottom-0 w-full h-1 bg-cinematic-accent transform transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'}`} />
    </div>
  );
};