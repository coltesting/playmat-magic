import { MapStyle } from './types';

export const MAP_STYLES: MapStyle[] = [
  {
    id: 'classic-town',
    name: 'Classic Town',
    emoji: '🏘️',
    description: 'Bright primary colors, chunky buildings, wide cartoon roads with dashed center lines',
    prompt: `You are re-illustrating a real satellite photo as a classic children's play mat / toy town carpet. TRACE the actual geography: every real road becomes a smooth dark-gray strip with white dashed center lines, following the EXACT same path and curvature as in the photo. Every real building becomes a chunky colorful block (red, blue, yellow, or green walls) with a triangle roof and square windows, placed at the EXACT position and matching the real footprint shape and size. Real trees become round lollipop shapes in bright green, placed where trees actually are. Real water bodies become solid sky-blue with small wave patterns, matching the real shoreline exactly. Real parking lots become neat grid patterns. Real grass/open areas become bright green with tiny daisies and flowers. The result should look like someone carefully traced the real map layout and re-drew everything in a bright, chunky, primary-color toy town style.`,
    colors: ['#ef4444', '#3b82f6', '#22c55e', '#eab308'],
    previewBg: 'linear-gradient(135deg, #22c55e 0%, #3b82f6 50%, #ef4444 100%)',
  },
  {
    id: 'scandi-neutral',
    name: 'Scandi Neutral',
    emoji: '🌿',
    description: 'Muted pastels, minimalist Scandinavian design with gentle earth tones',
    prompt: `You are re-illustrating a real satellite photo as a minimalist Scandinavian-style children's play mat. TRACE the actual geography: every real road becomes a smooth warm-gray path with subtle dotted center lines, following the EXACT same path and curvature as in the photo. Every real building becomes a simplified geometric shape in cream, soft pink, or warm beige, placed at the EXACT position and matching the real footprint. Real trees become stylized abstract shapes in sage green and olive, placed where trees actually are. Real water bodies become pale blue-gray with gentle ripple textures, matching the real shoreline exactly. Open spaces have subtle linen-like textures. The result should look like someone carefully traced the real map and re-drew everything in a calm, modern Scandinavian style with muted pastels.`,
    colors: ['#d4c5a9', '#a8b5a2', '#d4a5a5', '#e8dcc8'],
    previewBg: 'linear-gradient(135deg, #a8b5a2 0%, #e8dcc8 50%, #d4a5a5 100%)',
  },
  {
    id: '8bit-world',
    name: '8-Bit World',
    emoji: '👾',
    description: 'Retro pixel art style with blocky sprites and game-like elements',
    prompt: `You are re-illustrating a real satellite photo as a retro 8-bit pixel art children's play mat. TRACE the actual geography: every real road becomes a dark pixel strip with pixel-art lane markers, following the EXACT same path and curvature as in the photo. Every real building becomes a blocky pixel structure in bright retro colors (hot pink, electric blue, lime green, bright orange), placed at the EXACT position and matching the real footprint. Real trees become pixel-art trees with square leaves, placed where trees actually are. Real water bodies become pixel blue with pixel waves, matching the real shoreline exactly. Use a limited palette of about 16 vibrant retro colors. The result should look like someone traced the real map and re-drew everything in crisp, blocky NES/SNES pixel art style.`,
    colors: ['#ff0080', '#00ff41', '#0080ff', '#ff8000'],
    previewBg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  },
  {
    id: 'treasure-map',
    name: 'Treasure Map',
    emoji: '🗺️',
    description: 'Aged parchment style with compass roses, dotted trails, and X marks',
    prompt: `You are re-illustrating a real satellite photo as an antique treasure map play mat for children. TRACE the actual geography: every real road becomes a hand-drawn ink path with dotted trail markers, following the EXACT same path and curvature as in the photo. Every real building becomes a sketched structure in dark brown ink with cross-hatching, placed at the EXACT position and matching the real footprint. Real trees become old cartographic tree symbols placed where trees actually are. Real water bodies become classic map wave-line illustrations in dark blue ink, matching the real shoreline exactly. The base is aged parchment in warm sepia and tan tones. Add a compass rose and subtle adventure elements. The result should look like someone traced the real map and re-drew everything as a hand-drawn pirate's treasure map.`,
    colors: ['#8B7355', '#D2B48C', '#654321', '#F5DEB3'],
    previewBg: 'linear-gradient(135deg, #D2B48C 0%, #F5DEB3 50%, #8B7355 100%)',
  },
  {
    id: 'space-colony',
    name: 'Space Colony',
    emoji: '🚀',
    description: 'Futuristic space base with neon paths, domes, and alien flora',
    prompt: `You are re-illustrating a real satellite photo as a futuristic space colony play mat for children. TRACE the actual geography: every real road becomes a glowing neon light-trail in electric blue and cyan, following the EXACT same path and curvature as in the photo. Every real building becomes a colorful geodesic dome or futuristic habitat, placed at the EXACT position and matching the real footprint size. Real trees become bioluminescent alien plants in purple, teal, and magenta, placed where trees actually are. Real water bodies become pools of glowing teal alien liquid, matching the real shoreline exactly. The base terrain is alien purple-gray moon surface. The result should look like someone traced the real map and re-drew everything as a futuristic space colony.`,
    colors: ['#7c3aed', '#06b6d4', '#ec4899', '#10b981'],
    previewBg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #7c3aed 100%)',
  },
  {
    id: 'princess-kingdom',
    name: 'Princess Kingdom',
    emoji: '👑',
    description: 'Soft pinks and lavenders with enchanted forests and rainbow paths',
    prompt: `You are re-illustrating a real satellite photo as an enchanted princess kingdom play mat for children. TRACE the actual geography: every real road becomes a smooth pastel pink path with scalloped edges and flower patterns, following the EXACT same path and curvature as in the photo. Every real building becomes a charming storybook cottage with pastel walls and flower boxes (NOT castles), placed at the EXACT position and matching the real footprint. Real trees become enchanted trees with round pink and lavender canopies, placed where trees actually are. Real water bodies become dreamy light blue with sparkle reflections, matching the real shoreline exactly. Open areas become flower meadows. The result should look like someone traced the real map and re-drew everything in soft pastels with magical details like butterflies and tiny birds.`,
    colors: ['#f9a8d4', '#c4b5fd', '#a7f3d0', '#bae6fd'],
    previewBg: 'linear-gradient(135deg, #f9a8d4 0%, #c4b5fd 50%, #a7f3d0 100%)',
  },
  {
    id: 'f1-grand-prix',
    name: 'F1 Grand Prix',
    emoji: '🏎️',
    description: 'Racing circuit with checkered flags, tire marks, and grandstands',
    prompt: `You are re-illustrating a real satellite photo as an F1 racing Grand Prix play mat for children. TRACE the actual geography: every real road becomes a race track circuit with smooth dark asphalt, red and white rumble strips on corners, following the EXACT same path and curvature as in the photo. Every real building becomes a racing grandstand, pit garage, or control tower, placed at the EXACT position and matching the real footprint. Real trees become simplified racing-green shapes placed where trees actually are. Real water bodies stay blue with racing-themed borders, matching the real shoreline exactly. Open areas become grassy runoff with gravel traps. Add small race cars on the tracks, tire marks on corners, and checkered patterns at intersections. The result should look like someone traced the real map and re-drew everything as a racing circuit.`,
    colors: ['#dc2626', '#374151', '#ffffff', '#eab308'],
    previewBg: 'linear-gradient(135deg, #374151 0%, #dc2626 50%, #374151 100%)',
  },
  {
    id: '3d-adventure',
    name: '3D Adventure',
    emoji: '🏔️',
    description: 'Isometric 3D style with raised buildings, shadows, and depth',
    prompt: `You are re-illustrating a real satellite photo as an isometric 3D adventure play mat for children. TRACE the actual geography: every real road becomes a flat gray surface with visible depth at edges, following the EXACT same path and curvature as in the photo. Every real building becomes a colorful 3D block with visible top and side faces and shadows, placed at the EXACT position and matching the real footprint. Real trees become 3D cone and sphere shapes placed where trees actually are. Real water bodies have 3D depth with layered blue tones, matching the real shoreline exactly. Use bright saturated colors with consistent northwest lighting. The result should look like someone traced the real map and re-drew everything as raised 3D isometric objects that pop up from the mat surface.`,
    colors: ['#f97316', '#8b5cf6', '#06b6d4', '#22c55e'],
    previewBg: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #f97316 100%)',
  },
];

export const CUSTOM_STYLE: MapStyle = {
  id: 'custom-magic',
  name: 'Custom Magic',
  emoji: '✨',
  description: 'Describe your own magical world and let AI bring it to life!',
  prompt: '',
  colors: ['#f472b6', '#a78bfa', '#38bdf8', '#34d399'],
  previewBg: 'linear-gradient(135deg, #f472b6 0%, #a78bfa 33%, #38bdf8 66%, #34d399 100%)',
};

export const BASE_TRANSFORM_RULES = `
CRITICAL TRANSFORMATION RULES — YOU MUST FOLLOW ALL OF THESE:

RULE #1 — TRACE THE REAL GEOGRAPHY (MOST IMPORTANT):
You are looking at a real satellite photo. Your job is to TRACE over it, not invent a new scene.
- Every road in the satellite image must appear in your output at the EXACT same position, angle, width, and curvature. Do NOT straighten, simplify, or move any road.
- Every building footprint visible in the satellite image must appear in your output at the EXACT same position, size, and shape. Re-draw each building as an illustrated version of itself — same roof shape, same footprint outline — just in the cartoon style.
- Water bodies (lakes, rivers, ponds) must match the EXACT shoreline shape from the satellite image.
- Parking lots, driveways, sidewalks, and open fields must remain in their real positions.
- Trees and vegetation clusters should appear where they actually are in the satellite photo, not in random decorative positions.
- Think of it as placing tracing paper over the satellite image and re-drawing every feature in an illustrated style.

RULE #2 — FULL ILLUSTRATED REPLACEMENT:
Replace every pixel of the photo with illustrated artwork. No photographic textures or real-world surfaces should remain visible anywhere. Every surface must be hand-illustrated.

RULE #3 — NO INVENTED FEATURES:
Do NOT add buildings, landmarks, castles, towers, or structures that do not exist in the satellite image. Only illustrate what is actually there. The number of buildings in your output must match the satellite photo.

RULE #4 — UNIFORM QUALITY:
Apply the same level of detail uniformly across the entire image. Do not emphasize the center or neglect edges/corners.

RULE #5 — RICH SURFACE DETAIL:
Fill every surface with appropriate micro-textures. Grass areas get individual blades, small flowers, and texture. Roads get lane markings and surface detail. Rooftops get shingle or material patterns. No large flat-color areas.

RULE #6 — CARPET/RUG TEXTURE:
The entire output must have a subtle woven fabric/carpet texture, as if printed on a thick play mat rug. Show fiber texture and soft edges typical of tufted carpet.

RULE #7 — CORRECT SCALE:
Buildings must be proportional to their real footprint. Small houses stay small. Large commercial buildings stay large. Do not make all buildings the same cartoon size.

RULE #8 — NO TEXT:
Ignore all text/labels from the original image. Only add text if specified in the POI list below.
`;
