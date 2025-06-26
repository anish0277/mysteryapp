// src/app/api/suggest-messages/route.ts
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const model = google('gemini-1.5-flash');

    const { text } = await generateText({
      model,
      prompt: `Create three completely unique and open-ended questions designed to spark conversation on an anonymous social messaging app. Avoid repeating any previous examples. Format your output as a single string with each question separated by '||'. Ensure the questions are diverse, engaging, and cover different themes. Seed: ${Math.random() * 1000000}, Session: ${Date.now()}`,
      temperature: 0.8,
    });

    let suggestions: string[];
    try {
      if (text.includes('||')) {
        suggestions = text.split('||').map(q => q.trim()).filter(q => q.length > 0);
      } else {
        suggestions = JSON.parse(text);
      }

      if (!Array.isArray(suggestions) || suggestions.length === 0) {
        throw new Error('Invalid response format');
      }

      suggestions = suggestions.slice(0, 3);
    } catch (parseError) {
      console.error('Parse error:', parseError);
      const fallbackQuestions = [
        "What's a hobby you've recently started or want to try?",
        "If you could have dinner with any historical figure, who would it be?",
        "What's a simple thing that never fails to make you happy?",
        "What's the most interesting place you've ever visited or want to visit?",
        "If you could learn any skill instantly, what would it be?",
        "What's your favorite way to spend a rainy day?",
        "What's a book or movie that changed your perspective on something?",
        "If you could time travel to any era, when would you go?",
        "What's something you've always wanted to try but haven't yet?",
        "What's the best piece of advice you've ever received?"
      ];
      suggestions = fallbackQuestions.sort(() => 0.5 - Math.random()).slice(0, 3);
    }

    return NextResponse.json({
      success: true,
      suggestions,
    });
  } catch (error) {
    console.error('Error generating suggestions:', error);

    const fallbackQuestions = [
      "What's something new you learned recently that surprised you?",
      "If you could have any superpower for just one day, what would it be?",
      "What's your go-to comfort food when you need cheering up?",
      "What's the most beautiful place you've ever seen?",
      "If you could master any musical instrument, which would you choose?",
      "What's a small act of kindness that made your day better?"
    ];

    const randomQuestions = fallbackQuestions.sort(() => 0.5 - Math.random()).slice(0, 3);

    return NextResponse.json({
      success: true,
      suggestions: randomQuestions,
    });
  }
}
