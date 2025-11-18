import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ConversationAnalysis {
  englishLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  topicComplexity: 'beginner' | 'intermediate' | 'advanced';
  conversationQuality: number; // 1-10
  grammarAccuracy: number; // 1-10
  vocabularyRichness: number; // 1-10
  fluency: number; // 1-10
  comprehension: number; // 1-10
  topics: string[];
  learningOutcomes: string[];
  areasForImprovement: string[];
  strengths: string[];
  summary: string;
}

export async function analyzeConversation(transcript: any[]): Promise<ConversationAnalysis> {
  if (!transcript || transcript.length === 0) {
    throw new Error('Empty transcript provided');
  }

  // Format transcript for analysis
  const formattedTranscript = transcript
    .map((turn: any) => `${turn.role === 'user' ? 'Student' : 'AI Tutor'}: ${turn.message || turn.content}`)
    .join('\n');

  const prompt = `You are an expert English language teacher and assessor. Analyze the following conversation between an AI English tutor and a student.

Transcript:
${formattedTranscript}

Provide a comprehensive analysis in the following JSON format:
{
  "englishLevel": "A1|A2|B1|B2|C1|C2",
  "topicComplexity": "beginner|intermediate|advanced",
  "conversationQuality": 1-10,
  "grammarAccuracy": 1-10,
  "vocabularyRichness": 1-10,
  "fluency": 1-10,
  "comprehension": 1-10,
  "topics": ["topic1", "topic2"],
  "learningOutcomes": ["outcome1", "outcome2"],
  "areasForImprovement": ["area1", "area2"],
  "strengths": ["strength1", "strength2"],
  "summary": "brief summary of the conversation and student performance"
}

Criteria:
- englishLevel: CEFR level (A1=beginner, C2=proficient)
- topicComplexity: Difficulty of topics discussed
- conversationQuality: Overall engagement and coherence (1=poor, 10=excellent)
- grammarAccuracy: Correctness of student's grammar (1=many errors, 10=perfect)
- vocabularyRichness: Range and appropriateness of vocabulary (1=limited, 10=extensive)
- fluency: Natural flow of conversation (1=very hesitant, 10=smooth)
- comprehension: Student's understanding of the tutor (1=poor, 10=excellent)
- topics: Main subjects discussed
- learningOutcomes: What the student learned or practiced
- areasForImprovement: Specific areas to work on
- strengths: What the student did well
- summary: 2-3 sentence overview`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert English language assessor. Provide accurate, constructive analysis in valid JSON format only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' }
    });

    const analysis = JSON.parse(response.choices[0].message.content || '{}');
    
    // Validate and return analysis
    return {
      englishLevel: analysis.englishLevel || 'B1',
      topicComplexity: analysis.topicComplexity || 'intermediate',
      conversationQuality: analysis.conversationQuality || 5,
      grammarAccuracy: analysis.grammarAccuracy || 5,
      vocabularyRichness: analysis.vocabularyRichness || 5,
      fluency: analysis.fluency || 5,
      comprehension: analysis.comprehension || 5,
      topics: analysis.topics || [],
      learningOutcomes: analysis.learningOutcomes || [],
      areasForImprovement: analysis.areasForImprovement || [],
      strengths: analysis.strengths || [],
      summary: analysis.summary || 'Analysis completed'
    };
  } catch (error: any) {
    console.error('OpenAI analysis error:', error);
    throw new Error(`Failed to analyze conversation: ${error.message}`);
  }
}
