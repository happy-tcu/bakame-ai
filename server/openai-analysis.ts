import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface ConversationAnalysis {
  cefr_level: string;
  topic_complexity: string;
  grammar_score: number;
  vocabulary_score: number;
  fluency_score: number;
  coherence_score: number;
  key_insights: string[];
}

export async function analyzeConversation(transcript: any): Promise<ConversationAnalysis> {
  if (!transcript || !Array.isArray(transcript) || transcript.length === 0) {
    return {
      cefr_level: "Unknown",
      topic_complexity: "Unknown",
      grammar_score: 0,
      vocabulary_score: 0,
      fluency_score: 0,
      coherence_score: 0,
      key_insights: ["Insufficient conversation data for analysis"]
    };
  }

  // Extract conversation text
  const conversationText = transcript
    .map((turn: any) => `${turn.role}: ${turn.message}`)
    .join("\n");

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: `You are an expert English language assessor. Analyze the student's conversation and provide:

1. CEFR Level (A1, A2, B1, B2, C1, C2) - Based on grammar complexity, vocabulary range, and fluency
2. Topic Complexity (Basic, Intermediate, Advanced) - Based on subject matter depth
3. Grammar Score (0-10) - Accuracy of grammar usage
4. Vocabulary Score (0-10) - Range and appropriateness of vocabulary
5. Fluency Score (0-10) - Natural flow and coherence
6. Coherence Score (0-10) - Logical connection of ideas
7. Key Insights (array of 2-4 strings) - Specific observations about strengths, weaknesses, and recommendations

Respond with JSON in this exact format:
{
  "cefr_level": "A1|A2|B1|B2|C1|C2",
  "topic_complexity": "Basic|Intermediate|Advanced",
  "grammar_score": 0-10,
  "vocabulary_score": 0-10,
  "fluency_score": 0-10,
  "coherence_score": 0-10,
  "key_insights": ["insight 1", "insight 2", ...]
}`
        },
        {
          role: "user",
          content: `Analyze this English learning conversation:\n\n${conversationText}`
        }
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 1024
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    return {
      cefr_level: result.cefr_level || "Unknown",
      topic_complexity: result.topic_complexity || "Unknown",
      grammar_score: Math.max(0, Math.min(10, result.grammar_score || 0)),
      vocabulary_score: Math.max(0, Math.min(10, result.vocabulary_score || 0)),
      fluency_score: Math.max(0, Math.min(10, result.fluency_score || 0)),
      coherence_score: Math.max(0, Math.min(10, result.coherence_score || 0)),
      key_insights: Array.isArray(result.key_insights) ? result.key_insights : []
    };
  } catch (error) {
    console.error("OpenAI analysis failed:", error);
    return {
      cefr_level: "Unknown",
      topic_complexity: "Unknown",
      grammar_score: 0,
      vocabulary_score: 0,
      fluency_score: 0,
      coherence_score: 0,
      key_insights: [`Analysis failed: ${error.message}`]
    };
  }
}
