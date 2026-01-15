import React from 'react';
import { PanelConfig } from '../types';

interface PanelCardProps {
  panel: PanelConfig;
  onUpdate: (id: number, field: keyof PanelConfig, value: string) => void;
  isActive: boolean;
  onClick: () => void;
}

export const PanelCard: React.FC<PanelCardProps> = ({ panel, isActive, onClick }) => {
  return (
    <div 
      className={`relative group border transition-all duration-500 cursor-pointer overflow-hidden flex flex-col
        ${isActive 
          ? 'active border-cinematic-accent bg-cinematic-800 scale-[1.03] z-10 animate-pulse-accent' 
          : 'border-cinematic-800 bg-cinematic-900 hover:border-cinematic-600'
        }
      `}
      onClick={onClick}
      style={{ aspectRatio: '1/1' }}
    >
      {/* Viewfinder Brackets */}
      <div className={`viewfinder-corner top-0 left-0 border-t-2 border-l-2 ${isActive ? 'translate-x-1 translate-y-1' : '-translate-x-2 -translate-y-2'}`} />
      <div className={`viewfinder-corner top-0 right-0 border-t-2 border-r-2 ${isActive ? '-translate-x-1 translate-y-1' : 'translate-x-2 -translate-y-2'}`} />
      <div className={`viewfinder-corner bottom-0 left-0 border-b-2 border-l-2 ${isActive ? 'translate-x-1 -translate-y-1' : '-translate-x-2 translate-y-2'}`} />
      <div className={`viewfinder-corner bottom-0 right-0 border-b-2 border-r-2 ${isActive ? '-translate-x-1 -translate-y-1' : 'translate-x-2 translate-y-2'}`} />

      {/* Label Badge */}
      <div className="absolute top-2 left-2 z-10">
         <span className={`text-[9px] font-black font-mono px-2 py-0.5 rounded transition-colors duration-300
            ${isActive ? 'bg-cinematic-accent text-cinematic-900 shadow-lg' : 'bg-black/60 text-cinematic-muted'}
         `}>
           {panel.id}
         </span>
      </div>

      {/* Main Visual Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-3 text-center space-y-1 transition-transform duration-500 group-hover:scale-105">
        <div className={`text-4xl font-black tracking-tighter uppercase transition-colors duration-300 ${isActive ? 'text-white' : 'text-cinematic-600'}`}>
          {panel.shot}
        </div>
        
        <div className="flex flex-col items-center gap-0.5 w-full">
            <span className={`text-[10px] uppercase font-bold tracking-widest truncate transition-colors duration-300 ${isActive ? 'text-cinematic-accent' : 'text-cinematic-700'}`}>
                {panel.angle}
            </span>
            <span className={`text-[9px] uppercase font-medium tracking-wider truncate transition-colors duration-300 ${isActive ? 'text-cinematic-muted' : 'text-cinematic-800'}`}>
                {panel.narrative}
            </span>
        </div>
      </div>
      
      {/* Scanning Line Effect (Optional visual flavor when active) */}
      {isActive && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
            <div className="w-full h-[1px] bg-cinematic-accent animate-[scan_3s_linear_infinite]" 
                 style={{ 
                    animation: 'scan 2s linear infinite',
                    backgroundImage: 'linear-gradient(to bottom, transparent, #eab308, transparent)'
                 }} 
            />
        </div>
      )}

      {/* Subtle selection bar */}
      <div className={`absolute bottom-0 w-full h-1 bg-cinematic-accent transform transition-transform duration-500 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'}`} />
      
      <style>{`
        @keyframes scan {
          from { transform: translateY(-100%); }
          to { transform: translateY(400%); }
        }
      `}</style>
    </div>
  );
};