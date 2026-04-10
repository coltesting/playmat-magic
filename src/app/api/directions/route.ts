import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { origin, destination, travelMode } = await request.json();

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Google Maps API key not configured' }, { status: 500 });
    }

    const mode = (travelMode || 'WALKING').toLowerCase();
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&mode=${mode}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      return NextResponse.json(
        { error: `Directions API error: ${data.status}` },
        { status: 400 }
      );
    }

    // Decode the polyline to get path coordinates
    const route = data.routes[0];
    const overviewPolyline = route.overview_polyline.points;
    const path = decodePolyline(overviewPolyline);

    return NextResponse.json({
      path,
      distance: route.legs[0].distance.text,
      duration: route.legs[0].duration.text,
    });
  } catch (error: unknown) {
    console.error('Directions error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function decodePolyline(encoded: string): { lat: number; lng: number }[] {
  const points: { lat: number; lng: number }[] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let b: number;
    let shift = 0;
    let result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    points.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }

  return points;
}
