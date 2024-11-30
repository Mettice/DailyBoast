import openai, { openaiConfig } from '../config/openai';

export class OpenAIService {
  static async generateCompliment(category: string, mood?: string): Promise<string | null> {
    const prompt = `Generate a heartfelt, authentic compliment for the category "${category}"${
      mood ? ` with a ${mood} mood` : ''
    }. Make it personal and specific, under 100 characters, without emojis or exclamation marks.`;

    const completion = await openai.chat.completions.create({
      model: openaiConfig.model,
      messages: [
        { 
          role: "system", 
          content: openaiConfig.systemPrompt
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      temperature: openaiConfig.temperature,
      max_tokens: openaiConfig.max_tokens
    });

    return completion.choices[0].message.content?.trim() ?? null;
  }
}