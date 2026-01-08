
import { ShotType, AngleType, NarrativeType, PanelConfig } from './types';

// Full list of shots
export const SHOT_TYPES: ShotType[] = [
  'ELS', 'VLS', 'LS', 'WS', 'ES',
  'MLS', 'MS', 'MCU', 'CU', 'TS', '3S', 'GS',
  'BCU', 'ECU', 'MACRO', 'INS'
];

export const ANGLE_TYPES: AngleType[] = [
  'High Angle',
  'Bird’s Eye View',
  'Low Angle',
  'Worm’s Eye View',
  'Dutch Tilt',
  'Front Angle',
  '3/4 Angle',
  'Side Angle',
  'Back Angle',
  'Over-The-Shoulder'
];

export const NARRATIVE_TYPES: NarrativeType[] = [
  'Establishing', 'Character Intro', 'Key Object Intro',
  'Action Beat', 'Progression Shot', 'Confrontation',
  'Reaction Shot', 'Internal Beat',
  'Descriptive Shot', 'Narrative Insert', 'Clue Shot', 'Visual Context',
  'Transition',
  'Resolution', 'Closing Shot', 'Wind-down', 'Cliffhanger'
];

// --- Configuration for Row-Based Shot Constraints ---

interface RowShotRule {
    favorites: ShotType[];
    expanded: ShotType[];
}

export const ROW_SHOT_RULES: Record<'top' | 'middle' | 'bottom', RowShotRule> = {
    top: { // Panels 1, 2, 3
        favorites: ['ELS', 'LS'],
        expanded: ['VLS', 'WS', 'ES']
    },
    middle: { // Panels 4, 5, 6
        favorites: ['MS', 'MCU', 'CU'],
        expanded: ['MLS', 'TS', '3S', 'GS']
    },
    bottom: { // Panels 7, 8, 9
        favorites: ['ECU', 'INS', 'MACRO'],
        expanded: ['BCU']
    }
};

// Helper to determine valid shots based on Panel ID (1-based)
export const getAllowedShotsForPanel = (id: number): ShotType[] => {
  let rule: RowShotRule;
  if (id <= 3) rule = ROW_SHOT_RULES.top;
  else if (id <= 6) rule = ROW_SHOT_RULES.middle;
  else rule = ROW_SHOT_RULES.bottom;

  return [...rule.favorites, ...rule.expanded];
};

export const getShotRuleForPanel = (id: number): RowShotRule => {
    if (id <= 3) return ROW_SHOT_RULES.top;
    if (id <= 6) return ROW_SHOT_RULES.middle;
    return ROW_SHOT_RULES.bottom;
};

export const DEFAULT_PANELS: PanelConfig[] = Array.from({ length: 9 }, (_, i) => {
  const id = i + 1;
  const rule = getShotRuleForPanel(id);
  // Default to first favorite
  const defaultShot = rule.favorites[0]; 
  
  return {
    id,
    shot: defaultShot,
    angle: 'Front Angle',
    narrative: 'Establishing'
  };
});

// --- Descriptions ---

export const SHOT_DESCRIPTIONS: Record<ShotType, string> = {
  // Wide
  ELS: 'Extreme Long Shot — Gran plano general',
  LS: 'Long Shot — Plano general completo',
  VLS: 'Very Long Shot — Muy amplio, sujeto pequeño',
  WS: 'Wide Shot — Plano amplio narrativo',
  ES: 'Establishing Shot — Plano que presenta el lugar',
  
  // Medium
  MLS: 'Medium Long Shot — Plano americano / 3/4',
  MS: 'Medium Shot — Plano medio (cintura)',
  MCU: 'Medium Close-Up — Plano medio–corto (pecho)',
  CU: 'Close-Up — Primer plano (rostro)',
  TS: 'Two Shot — Dos personajes',
  '3S': 'Three Shot — Tres personajes',
  GS: 'Group Shot — Más de tres personajes',
  
  // Detail
  BCU: 'Big Close-Up — Cara completa muy cerrada',
  ECU: 'Extreme Close-Up — Detalle extremo',
  INS: 'Insert Shot — Detalle narrativo',
  MACRO: 'Macro Close-Up — Macro técnico'
};

export const ANGLE_DESCRIPTIONS: Record<AngleType, string> = {
  'High Angle': 'Cámara desde arriba, mirando hacia abajo.',
  'Bird’s Eye View': 'Cenital total, vista completamente superior.',
  'Low Angle': 'Cámara desde abajo, apuntando hacia arriba.',
  'Worm’s Eye View': 'Ángulo ultra bajo, casi desde el suelo.',
  'Dutch Tilt': 'Ángulo inclinado, sensación de tensión o dinamismo.',
  'Front Angle': 'Vista frontal directa del sujeto.',
  '3/4 Angle': 'Frontal ligeramente girado, el ángulo más cinematográfico.',
  'Side Angle': 'Vista lateral exacta (perfil).',
  'Back Angle': 'Vista desde atrás del sujeto.',
  'Over-The-Shoulder': 'Ángulo sobre el hombro, típico de escenas narrativas.'
};

export const NARRATIVE_DESCRIPTIONS: Partial<Record<NarrativeType, string>> = {
  'Establishing': 'Presenta el entorno o contexto.',
  'Character Intro': 'Presenta al personaje.',
  'Key Object Intro': 'Presenta un objeto importante.',
  'Action Beat': 'Muestra la acción principal.',
  'Progression Shot': 'Muestra avance o desarrollo.',
  'Confrontation': 'Enmarca tensión o conflicto.',
  'Reaction Shot': 'Captura la respuesta emocional.',
  'Internal Beat': 'Sugiere reflexión o duda.',
  'Descriptive Shot': 'Destaca un detalle relevante.',
  'Narrative Insert': 'Enfatiza un objeto dramático.',
  'Clue Shot': 'Señala un detalle revelador.',
  'Visual Context': 'Muestra un elemento que define al personaje.',
  'Transition': 'Indica un cambio de lugar o tiempo.',
  'Resolution': 'Muestra la consecuencia o cierre.',
  'Closing Shot': 'Cierra visualmente la escena.',
  'Wind-down': 'Reduce ritmo hacia el final.',
  'Cliffhanger': 'Deja tensión o pregunta abierta.',
  
  // Legacy
  'Context': 'Presenta el entorno o contexto.',
  'Detail': 'Destaca un detalle relevante.',
  'Emotion': 'Captura la respuesta emocional.',
  'Tension': 'Enmarca tensión o conflicto.'
};

export const TOP_NARRATIVES: NarrativeType[] = [
  'Establishing',
  'Action Beat',
  'Reaction Shot',
  'Descriptive Shot',
  'Transition',
  'Resolution'
];

export const NARRATIVE_CATEGORIES = {
  'Contexto / Inicio': ['Establishing', 'Character Intro', 'Key Object Intro'] as NarrativeType[],
  'Desarrollo / Acción': ['Action Beat', 'Progression Shot', 'Confrontation'] as NarrativeType[],
  'Reacciones / Emoción': ['Reaction Shot', 'Internal Beat'] as NarrativeType[],
  'Información / Detalle': ['Descriptive Shot', 'Narrative Insert', 'Clue Shot', 'Visual Context'] as NarrativeType[],
  'Transiciones / Flujo': ['Transition'] as NarrativeType[],
  'Momentos Finales': ['Resolution', 'Closing Shot', 'Wind-down', 'Cliffhanger'] as NarrativeType[]
};


export const PROMPT_TEMPLATE = `
<instruction>
Generate a cohesive 3x3 grid "Cinematic Contact Sheet" containing 9 distinct camera shots of the same subject, all within the same environment, with strict consistency of lighting, clothing, textures, and overall scene continuity.

Use the exact shot type, camera angle, and narrative intention provided for each of the 9 panels.
Do not reinterpret, modify, infer, or adapt the shot types — use them exactly as specified.

Each panel must be independently framed according to the chosen options, maintaining stylistic consistency with the reference, cinematic color grading, appropriate depth of field, and natural bokeh in close-up shots.

The final output must be a professional 3×3 cinematic storyboard grid (not nine separate images).

Each panel must include an overlaid label showing:
• The panel number (1–9)
• The selected shot type acronym (ELS, LS, MLS, MS, MCU, CU, ECU, etc.)

Label format:
“[PANEL_NUMBER] — [SHOT_ACRONYM]”

Panel Assignments:
Row 1 (Establishing Context)
Panel 1: Shot Type → [SHOT_1], Angle → [ANGLE_1], Narrative → [NARRATIVE_1]
Label: "1 — [SHOT_1]"

Panel 2: Shot Type → [SHOT_2], Angle → [ANGLE_2], Narrative → [NARRATIVE_2]
Label: "2 — [SHOT_2]"

Panel 3: Shot Type → [SHOT_3], Angle → [ANGLE_3], Narrative → [NARRATIVE_3]
Label: "3 — [SHOT_3]"

Row 2 (Core Coverage)
Panel 4: Shot Type → [SHOT_4], Angle → [ANGLE_4], Narrative → [NARRATIVE_4]
Label: "4 — [SHOT_4]"

Panel 5: Shot Type → [SHOT_5], Angle → [ANGLE_5], Narrative → [NARRATIVE_5]
Label: "5 — [SHOT_5]"

Panel 6: Shot Type → [SHOT_6], Angle → [ANGLE_6], Narrative → [NARRATIVE_6]
Label: "6 — [SHOT_6]"

Row 3 (Details & Angles)
Panel 7: Shot Type → [SHOT_7], Angle → [ANGLE_7], Narrative → [NARRATIVE_7]
Label: "7 — [SHOT_7]"

Panel 8: Shot Type → [SHOT_8], Angle → [ANGLE_8], Narrative → [NARRATIVE_8]
Label: "8 — [SHOT_8]"

Panel 9: Shot Type → [SHOT_9], Angle → [ANGLE_9], Narrative → [NARRATIVE_9]
Label: "9 — [SHOT_9]"

All panels must share:
Strictly preserve the same visual style as the reference, including rendering technique, dimensionality (2D / 3D), line quality, shading method, and overall aesthetic. Do not convert or reinterpret the style into photorealistic or 3D if the reference is illustrated or 2D.
Consistent cinematic color grading
Unified lighting
Accurate shot scaling
Appropriate depth of field for each focal length
Clean professional layout with visible frame labels
</instruction>

A professional 3×3 cinematic storyboard grid containing 9 panels.
The grid showcases the subject using the exact focal lengths, angles, and narrative intentions provided.
Top Row: Wide contextual framing.
Middle Row: Core subject framing.
Bottom Row: Close details and cinematic angles.
All frames are labeled with "[PANEL_NUMBER] — [SHOT_ACRONYM]", consistent, and stylistically unified.
`;
