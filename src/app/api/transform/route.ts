import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { buildTransformPrompt } from '@/lib/prompts';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const maxDuration = 120; // Allow up to 2 minutes for image generation

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { satelliteImageBase64, style, pois, paths, zoom, customPrompt } = body;

    if (!satelliteImageBase64) {
      return NextResponse.json({ error: 'No satellite image provided' }, { status: 400 });
    }

    if (!style) {
      return NextResponse.json({ error: 'No style selected' }, { status: 400 });
    }

    const transformPrompt = buildTransformPrompt(style, pois || [], paths || [], zoom || 17, customPrompt);

    console.log('Sending transformation request to OpenAI...');
    console.log('Prompt length:', transformPrompt.length);

    // Use GPT-4o image generation via the responses API
    const response = await openai.responses.create({
      model: 'gpt-4o',
      input: [
        {
          role: 'user',
          content: [
            {
              type: 'input_image',
              image_url: `data:image/png;base64,${satelliteImageBase64}`,
              detail: 'high',
            },
            {
              type: 'input_text',
              text: transformPrompt,
            },
          ],
        },
      ],
      tools: [{ type: 'image_generation', quality: 'high', size: '1536x1024' }],
    });

    // Extract the generated image from the response
    let generatedImageB64: string | null = null;

    for (const item of response.output) {
      if (item.type === 'image_generation_call') {
        generatedImageB64 = (item as unknown as { result: string }).result;
        break;
      }
    }

    if (!generatedImageB64) {
      console.error('No image generated in response. Output:', JSON.stringify(response.output, null, 2));
      return NextResponse.json(
        { error: 'AI did not generate an image. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      imageBase64: generatedImageB64,
    });
  } catch (error: unknown) {
    console.error('Transform error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: `Transformation failed: ${message}` },
      { status: 500 }
    );
  }
}
