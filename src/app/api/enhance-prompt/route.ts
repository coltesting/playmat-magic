import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { buildEnhancePrompt } from '@/lib/prompts';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { userPrompt } = await request.json();

    if (!userPrompt || userPrompt.trim().length === 0) {
      return NextResponse.json({ error: 'No prompt provided' }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'user', content: buildEnhancePrompt(userPrompt) },
      ],
      max_tokens: 500,
      temperature: 0.8,
    });

    const enhanced = response.choices[0]?.message?.content?.trim() || '';

    return NextResponse.json({ enhanced });
  } catch (error: unknown) {
    console.error('Enhance prompt error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
