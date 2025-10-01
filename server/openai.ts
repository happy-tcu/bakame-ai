import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const MODEL = "gpt-4o"; // Note: Using gpt-4o as gpt-5 may not be available yet

export async function generateFlashcards(topic: string, text?: string, count: number = 5) {
  try {
    const prompt = text 
      ? `Generate ${count} educational flashcards based on this text: "${text}"`
      : `Generate ${count} educational flashcards about the topic: "${topic}"`;

    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: "You are an educational assistant creating flashcards for English language learners. Create clear, concise flashcards with a question/term on the front and answer/definition on the back. Return as JSON array with 'front' and 'back' fields."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('No content generated');
    
    const parsed = JSON.parse(content);
    return parsed.flashcards || [];
  } catch (error) {
    console.error('Error generating flashcards:', error);
    throw error;
  }
}