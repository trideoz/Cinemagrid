
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
  ELS: 'Extreme Long Shot — Shows the subject very small in a vast environment.',
  LS: 'Long Shot — Shows the full body of the subject within the environment.',
  VLS: 'Very Long Shot — Wide framing emphasizing the surroundings.',
  WS: 'Wide Shot — Standard wide framing for action and context.',
  ES: 'Establishing Shot — Specifically used to set the scene or location.',
  MLS: 'Medium Long Shot — Framing from the knees up (American Shot).',
  MS: 'Medium Shot — Standard framing from the waist up.',
  MCU: 'Medium Close-Up — Framing from the chest or shoulders up.',
  CU: 'Close-Up — Focuses primarily on the face or a specific feature.',
  TS: 'Two Shot — Frames two subjects together comfortably.',
  '3S': 'Three Shot — Frames three subjects in a unified composition.',
  GS: 'Group Shot — Frames a large group of people.',
  BCU: 'Big Close-Up — Frames the entire head with little space around it.',
  ECU: 'Extreme Close-Up — Focuses on a specific detail (e.g., eyes, lips).',
  INS: 'Insert Shot — A close-up of a relevant object in the scene.',
  MACRO: 'Macro Close-Up — Highly detailed close-up of very small elements.'
};

export const ANGLE_DESCRIPTIONS: Record<AngleType, string> = {
  'High Angle': 'Camera looks down on the subject, making them appear smaller or vulnerable.',
  'Bird’s Eye View': 'Direct overhead shot, looking straight down at the ground.',
  'Low Angle': 'Camera looks up at the subject, making them appear powerful or tall.',
  'Worm’s Eye View': 'Ultra-low angle, looking straight up from the ground level.',
  'Dutch Tilt': 'The camera is rotated horizontally, creating a sense of unease or dynamic energy.',
  'Front Angle': 'Direct eye-level view, straightforward and intimate.',
  '3/4 Angle': 'The classic "three-quarter" view, adding depth and dimension to the subject.',
  'Side Angle': 'A strict profile view of the subject.',
  'Back Angle': 'Viewing the subject from directly behind.',
  'Over-The-Shoulder': 'Looking past one subject’s shoulder at another, great for dialogue.'
};

export const NARRATIVE_DESCRIPTIONS: Record<NarrativeType, string> = {
  'Establishing': 'Used to introduce the world, location, or general mood of the scene.',
  'Character Intro': 'Focuses on revealing a character for the first time.',
  'Key Object Intro': 'Highlights an object that will be critical to the plot later.',
  'Action Beat': 'Captures a specific moment of physical movement or key activity.',
  'Progression Shot': 'Shows the character moving from point A to point B or evolving.',
  'Confrontation': 'Frames the moment of direct conflict or high tension between elements.',
  'Reaction Shot': 'Focuses on a character responding emotionally to an event.',
  'Internal Beat': 'Suggests the character is thinking, reflecting, or feeling internal doubt.',
  'Descriptive Shot': 'A general shot that adds texture or detail to the storytelling.',
  'Narrative Insert': 'A close-up "insert" that forces the viewer to notice a specific clue.',
  'Clue Shot': 'Directly points at something hidden or essential for solving a mystery.',
  'Visual Context': 'Shows a character’s tools or surroundings to define their personality.',
  'Transition': 'Acts as a bridge between two scenes or time periods.',
  'Resolution': 'Shows the outcome of an action or the closing of a dramatic beat.',
  'Closing Shot': 'The final image of the sequence, used for finality or impact.',
  'Wind-down': 'A slow-paced shot used to lower energy after a peak moment.',
  'Cliffhanger': 'An image that leaves the viewer with a question or unresolved tension.',
  'Context': 'General background or context for the scene.',
  'Detail': 'Specific detailed look at a subject.',
  'Emotion': 'Emotional weight or character focus.',
  'Tension': 'Suspenseful or high-pressure framing.',
  'Isolation': 'Subject shown alone and separated.',
  'Power': 'Subject shown in a position of authority.',
  'Vulnerability': 'Subject shown in a weak or exposed state.'
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
