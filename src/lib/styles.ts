import { MapStyle } from './types';

export const MAP_STYLES: MapStyle[] = [
  {
    id: 'classic-town',
    name: 'Classic Town',
    emoji: '🏘️',
    description: 'Bright primary colors, chunky buildings, wide cartoon roads with dashed center lines',
    prompt: `Transform this satellite map into a classic children's play mat illustration in the style of a traditional toy town carpet. Use bright primary colors (red, blue, yellow, green). Roads must be wide, smooth dark-gray strips with white dashed center lines and rounded corners. Buildings should be simple, chunky, colorful blocks with triangle roofs and square windows. Trees are round lollipop shapes in bright green. Parks are flat bright-green patches with tiny flowers. Water features are solid sky-blue with small wave patterns. Parking lots become small grid patterns. Every surface must have playful cartoon textures: tiny daisies on grass, pebble patterns on paths, simple cloud shapes scattered about.`,
    colors: ['#ef4444', '#3b82f6', '#22c55e', '#eab308'],
    previewBg: 'linear-gradient(135deg, #22c55e 0%, #3b82f6 50%, #ef4444 100%)',
  },
  {
    id: 'scandi-neutral',
    name: 'Scandi Neutral',
    emoji: '🌿',
    description: 'Muted pastels, minimalist Scandinavian design with gentle earth tones',
    prompt: `Transform this satellite map into a minimalist Scandinavian-style children's play mat. Use a muted palette of soft sage green, warm beige, dusty rose, cream white, and light gray. Roads should be smooth warm-gray paths with subtle dotted lines. Buildings are simplified geometric shapes in cream and soft pink with minimal detail. Trees are stylized abstract shapes in sage green and olive. Water is pale blue-gray with gentle ripple textures. Open spaces have subtle linen-like textures. The overall feel should be calm, modern, and elegant, like a premium nursery rug. Include tiny minimalist details: small birds, simple leaf patterns, geometric shapes.`,
    colors: ['#d4c5a9', '#a8b5a2', '#d4a5a5', '#e8dcc8'],
    previewBg: 'linear-gradient(135deg, #a8b5a2 0%, #e8dcc8 50%, #d4a5a5 100%)',
  },
  {
    id: '8bit-world',
    name: '8-Bit World',
    emoji: '👾',
    description: 'Retro pixel art style with blocky sprites and game-like elements',
    prompt: `Transform this satellite map into a retro 8-bit pixel art children's play mat. Every element must look like it belongs in a classic NES/SNES game. Roads are dark pixel strips with pixel-art lane markers. Buildings are blocky pixel structures with visible pixel grids, in bright retro colors (hot pink, electric blue, lime green, bright orange). Trees are pixel-art trees with distinct square leaves. Water is animated-looking pixel blue with pixel waves. Add pixel-art details everywhere: tiny pixel flowers, pixel mushrooms, pixel coins, pixel hearts, pixel stars. The color palette should be limited to about 16 vibrant retro colors. Everything should have that crisp, blocky, nostalgic video game look.`,
    colors: ['#ff0080', '#00ff41', '#0080ff', '#ff8000'],
    previewBg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  },
  {
    id: 'treasure-map',
    name: 'Treasure Map',
    emoji: '🗺️',
    description: 'Aged parchment style with compass roses, dotted trails, and X marks',
    prompt: `Transform this satellite map into an antique treasure map play mat for children. The base should look like aged parchment/vellum in warm sepia and tan tones. Roads become hand-drawn ink paths with dotted trail markers. Buildings are sketched in dark brown ink with cross-hatching. Trees are illustrated in an old cartographic style with small artistic tree symbols. Water features are rendered with classic map wave lines in dark blue ink. Add nautical and adventure elements: a compass rose, decorative borders with rope patterns, tiny sea monsters in water areas, small anchor symbols, scroll-work labels. Open areas should have subtle aged paper texture with coffee-stain-like marks. The overall look should feel like a hand-drawn pirate's treasure map.`,
    colors: ['#8B7355', '#D2B48C', '#654321', '#F5DEB3'],
    previewBg: 'linear-gradient(135deg, #D2B48C 0%, #F5DEB3 50%, #8B7355 100%)',
  },
  {
    id: 'space-colony',
    name: 'Space Colony',
    emoji: '🚀',
    description: 'Futuristic space base with neon paths, domes, and alien flora',
    prompt: `Transform this satellite map into a futuristic space colony play mat for children. The base terrain should be alien purple-gray moon surface with subtle crater textures. Roads become glowing neon light-trails in electric blue and cyan. Buildings transform into colorful geodesic domes, space habitats, and futuristic structures with rounded shapes and glowing windows. Trees become alien flora: bioluminescent plants in purple, teal, and magenta. Water features become pools of glowing alien liquid in bright teal. Parks become alien gardens with strange colorful vegetation. Add space details: small rockets, satellite dishes, rover vehicles, stars in dark areas, rings of light around buildings. The sky/open areas should show deep space purple with tiny stars.`,
    colors: ['#7c3aed', '#06b6d4', '#ec4899', '#10b981'],
    previewBg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #7c3aed 100%)',
  },
  {
    id: 'princess-kingdom',
    name: 'Princess Kingdom',
    emoji: '👑',
    description: 'Soft pinks and lavenders with enchanted forests and rainbow paths',
    prompt: `Transform this satellite map into an enchanted princess kingdom play mat for children. Use a soft pastel palette of pink, lavender, mint green, baby blue, and cream. Roads become smooth pastel pink paths with scalloped edges and small flower patterns along the sides. Buildings become charming storybook cottages with rounded shapes, pastel walls, and flower boxes (NOT castles or palaces unless a building is very large). Trees become enchanted trees with round pink and lavender canopies sprinkled with tiny flowers and butterflies. Water becomes dreamy light blue with small sparkle reflections and tiny swans. Parks become flower meadows full of daisies, tulips, and roses. Add magical details: small rainbows, butterflies, tiny birds, sparkle effects, heart shapes, and delicate vine patterns. Stone paths should have round cobblestones in cream and pink.`,
    colors: ['#f9a8d4', '#c4b5fd', '#a7f3d0', '#bae6fd'],
    previewBg: 'linear-gradient(135deg, #f9a8d4 0%, #c4b5fd 50%, #a7f3d0 100%)',
  },
  {
    id: 'f1-grand-prix',
    name: 'F1 Grand Prix',
    emoji: '🏎️',
    description: 'Racing circuit with checkered flags, tire marks, and grandstands',
    prompt: `Transform this satellite map into an F1 racing Grand Prix play mat for children. The main roads must become race track circuits with smooth dark asphalt, red and white rumble strips (kerbs) on corners, and checkered flag patterns at key intersections. Smaller roads become pit lanes in lighter gray. Buildings transform into racing grandstands with tiny spectator dots, pit garages with colorful team banners, and control towers. Trees become simplified racing-green shapes. Parks become grassy runoff areas with gravel traps (dotted patterns). Water stays blue but with racing-themed borders. Add racing details: tire marks on corners, small race car illustrations on the track, sponsor-style banners, timing tower graphics, podium areas, flag marshal posts with different colored flags. Use a palette of racing red, white, dark gray, with accents of yellow and blue.`,
    colors: ['#dc2626', '#374151', '#ffffff', '#eab308'],
    previewBg: 'linear-gradient(135deg, #374151 0%, #dc2626 50%, #374151 100%)',
  },
  {
    id: '3d-adventure',
    name: '3D Adventure',
    emoji: '🏔️',
    description: 'Isometric 3D style with raised buildings, shadows, and depth',
    prompt: `Transform this satellite map into an isometric 3D adventure play mat for children. Every element must have a raised, three-dimensional isometric perspective as if viewed from a 45-degree angle. Roads should be flat gray surfaces with visible depth/thickness at edges. Buildings become colorful 3D blocks with visible tops and side faces, with shadows cast to the southeast. Trees become 3D cone and sphere shapes with visible dimension. Water features have 3D depth with layered blue tones showing depth. Hills and elevation changes should be clearly visible with stepped terrain. Add adventure details: 3D bridges over roads, tiny 3D characters, 3D vehicles on roads, 3D lamp posts, park benches with shadows. Use bright, saturated colors with consistent lighting from the northwest. Every object should feel like it pops up from the mat surface.`,
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
CRITICAL TRANSFORMATION RULES (MUST FOLLOW):
1. SPATIAL ACCURACY: Maintain the EXACT layout, position, and proportions of all roads, intersections, buildings, and geographic features from the satellite image. The map must remain geographically accurate and navigable.
2. FULL REPLACEMENT: Replace every single pixel of the satellite image with themed illustration. No photographic textures, satellite imagery, or real-world surfaces should remain visible anywhere.
3. NO RANDOM ADDITIONS: Do NOT add castles, palaces, towers, or any fictional buildings that do not correspond to actual building footprints in the satellite image. Only transform what exists.
4. UNIFORM TRANSFORMATION: Apply the same level of detail and artistic quality uniformly across the entire image. Do not emphasize the center or any area over others.
5. HIGH DENSITY DETAIL: Fill every surface with intricate micro-textures appropriate to the theme. Grass areas need individual flowers, tiny animals, texture patterns. Roads need lane markings, tiny details. No large empty flat-color areas.
6. CARPET/RUG TEXTURE: The entire output must have a subtle but visible woven fabric/carpet texture overlay, as if the illustration is printed on a thick woven rug. Show fiber texture, slight pile direction variations, and soft edges typical of tufted carpet.
7. CONSISTENT BUILDING SCALE: Buildings should be proportional to their actual footprint in the satellite image. Small buildings stay small; large buildings stay large.
8. IGNORE ALL TEXT AND LABELS from the original map. The only text/labels should be the ones specified in the POI list below.
`;
