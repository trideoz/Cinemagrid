
export type ShotType = 
  // Contextuals (Row 1)
  | 'ELS' | 'VLS' | 'LS' | 'WS' | 'ES'
  // Core/Medium (Row 2)
  | 'MLS' | 'MS' | 'MCU' | 'CU' | 'TS' | '3S' | 'GS'
  // Details (Row 3)
  | 'BCU' | 'ECU' | 'MACRO' | 'INS';

export type AngleType = 
  | 'High Angle' 
  | 'Bird’s Eye View' 
  | 'Low Angle' 
  | 'Worm’s Eye View' 
  | 'Dutch Tilt' 
  | 'Front Angle' 
  | '3/4 Angle' 
  | 'Side Angle' 
  | 'Back Angle' 
  | 'Over-The-Shoulder';

export type NarrativeType = 
  // Contexto / Inicio
  | 'Establishing' 
  | 'Character Intro' 
  | 'Key Object Intro'
  // Desarrollo / Acción
  | 'Action Beat' 
  | 'Progression Shot' 
  | 'Confrontation'
  // Reacciones / Emoción
  | 'Reaction Shot' 
  | 'Internal Beat'
  // Información / Detalle
  | 'Descriptive Shot' 
  | 'Narrative Insert' 
  | 'Clue Shot' 
  | 'Visual Context'
  // Transiciones / Flujo
  | 'Transition'
  // Momentos Finales
  | 'Resolution' 
  | 'Closing Shot' 
  | 'Wind-down' 
  | 'Cliffhanger'
  // Fallback/Legacy
  | 'Context' | 'Detail' | 'Emotion' | 'Tension' | 'Isolation' | 'Power' | 'Vulnerability'; 

export interface PanelConfig {
  id: number;
  shot: ShotType;
  angle: AngleType;
  narrative: NarrativeType;
}

export interface GridConfiguration {
  theme: string;
  panels: PanelConfig[];
}

export type GridPanelIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
