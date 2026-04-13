import { MapStyle, POI, CoolPath } from './types';
import { BASE_TRANSFORM_RULES } from './styles';

export function buildTransformPrompt(
  style: MapStyle,
  pois: POI[],
  paths: CoolPath[],
  zoom: number,
  customPrompt?: string,
): string {
  const stylePrompt = customPrompt && style.id === 'custom-magic'
    ? customPrompt
    : style.prompt;

  let poiSection = '';
  if (pois.length > 0) {
    poiSection = `\n\nPOINTS OF INTEREST (render these as themed landmarks with visible labels):
${pois.map((poi, i) => `${i + 1}. "${poi.label}" at approximate position in the image corresponding to coordinates (${poi.lat.toFixed(5)}, ${poi.lng.toFixed(5)}). Render this as a prominent themed landmark with a cute banner/sign showing the label "${poi.label}".`).join('\n')}`;
  }

  let pathSection = '';
  if (paths.length > 0) {
    pathSection = `\n\nSPECIAL PATHS (highlight these routes):
${paths.map((path, i) => `${i + 1}. Path "${path.label}" connecting two POIs. This route should be visually distinct from regular roads - use a special highlighted trail (like a dotted adventure path, glowing trail, or decorated pathway) that fits the theme. Add small decorative elements along this path.`).join('\n')}`;
  }

  const zoomNote = zoom <= 15
    ? 'The view is wide/zoomed out. Ensure buildings are still individually visible with distinct details, not just color blocks. Add extra micro-details to fill the space.'
    : zoom >= 18
    ? 'The view is very close/zoomed in. Show fine architectural details on buildings, individual bricks/textures, window details, and close-up textures.'
    : 'The view is at a medium zoom. Balance building detail with area coverage. Each building should be clearly identifiable.';

  return `${stylePrompt}

${BASE_TRANSFORM_RULES}

ZOOM LEVEL NOTE: ${zoomNote}
${poiSection}
${pathSection}

IMPORTANT: You are given a real satellite photograph. Your task is to TRACE over every geographic feature (roads, buildings, water, trees, open space) and re-draw them in the illustrated style described above. The output must preserve the real-world layout exactly while looking like a premium, hand-illustrated children's play mat/rug with visible woven carpet texture throughout. Do NOT invent a new scene — re-illustrate what is actually in the photo.`;
}

export function buildEnhancePrompt(userIdea: string): string {
  return `You are a creative director for a children's play mat company. A customer has described their dream play mat style in simple terms. Your job is to expand this into a rich, detailed visual description that an illustrator would use.

Customer's idea: "${userIdea}"

Expand this into a detailed visual prompt (3-4 sentences) describing:
- The specific color palette (name exact colors)
- How roads, buildings, trees, and water should look
- What small decorative details to include
- The overall mood and feel

Keep it fun and child-friendly. Be specific about colors and textures. Do NOT mention castles or palaces unless the user specifically asked for them. Respond with ONLY the expanded description, no preamble.`;
}
