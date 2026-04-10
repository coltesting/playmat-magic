# PlayMat Magic - Setup & Deployment Guide

## Quick Start (Local Development)

```bash
# 1. Extract the project
tar -xzf playmat-magic.tar.gz -C playmat-magic
cd playmat-magic

# 2. Install dependencies
npm install

# 3. Create .env.local with your API keys
cat > .env.local << 'EOF'
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
OPENAI_API_KEY=your-openai-api-key
EOF

# 4. Start the dev server
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel (Make it Public)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Set environment variables on Vercel dashboard:
#    - NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
#    - GOOGLE_MAPS_API_KEY
#    - OPENAI_API_KEY
```

## Google Maps API Setup

Your API key needs these APIs enabled in Google Cloud Console:
- Maps JavaScript API
- Maps Static API
- Places API
- Directions API
- Geocoding API

## How to Use

1. **Search** for any location using the search bar
2. **Choose a style** from the left sidebar (8 presets + custom)
3. **Add spots** (POIs) by clicking "Add Special Spot" then clicking the map
4. **Draw paths** between spots using "Draw Cool Path"
5. **Transform!** Click the purple button to generate your play mat
6. **Export** as high-res PNG or Google Earth KML
