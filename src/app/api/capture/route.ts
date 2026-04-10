import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { center, zoom, width, height } = await request.json();
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Google Maps API key not configured' }, { status: 500 });
    }

    // Use Google Static Maps API to capture satellite image
    // Max free size is 640x640, with scale=2 gives 1280x1280
    const staticWidth = Math.min(width || 640, 640);
    const staticHeight = Math.min(height || 640, 640);

    const url = `https://maps.googleapis.com/maps/api/staticmap?center=${center.lat},${center.lng}&zoom=${zoom}&size=${staticWidth}x${staticHeight}&scale=2&maptype=satellite&style=feature:all|element:labels|visibility:off&key=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      console.error('Static Maps API error:', text);
      return NextResponse.json(
        { error: `Failed to capture map: ${response.status}` },
        { status: 500 }
      );
    }

    const imageBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString('base64');

    return NextResponse.json({
      imageBase64: base64,
      actualWidth: staticWidth * 2,
      actualHeight: staticHeight * 2,
    });
  } catch (error: unknown) {
    console.error('Capture error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
