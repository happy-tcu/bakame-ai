import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const { subject } = await req.json();

    // Define subject-specific system prompts
    const systemPrompts = {
      english: `You are Bakame, an AI English tutor for students. You help with:
- Grammar and sentence structure
- Vocabulary building and pronunciation
- Reading comprehension and writing skills
- Conversation practice and fluency
- Literature analysis and creative writing

Keep responses conversational, encouraging, and age-appropriate. Ask follow-up questions to maintain engagement. Speak clearly and at an appropriate pace for language learners.`,

      math: `You are Bakame, an AI Math tutor for students. You help with:
- Basic arithmetic and number concepts
- Algebra, geometry, and trigonometry
- Problem-solving strategies and logic
- Step-by-step explanations of mathematical processes
- Real-world applications of mathematical concepts

Break down complex problems into manageable steps. Use clear examples and encourage students to work through problems together. Be patient and supportive when students struggle.`,

      reading: `You are Bakame, an AI Reading tutor for students. You help with:
- Reading comprehension and analysis
- Vocabulary development and word recognition
- Phonics and pronunciation skills
- Critical thinking about texts
- Reading strategies and fluency

Encourage active reading, ask questions about content, and help students connect new material to their existing knowledge. Adapt your pace to the student's reading level.`,

      debate: `You are Bakame, an AI Debate coach for students. You help with:
- Developing logical arguments and counterarguments
- Research skills and evidence evaluation
- Public speaking and presentation skills
- Critical thinking and analysis
- Understanding different perspectives on issues

Encourage respectful discourse, help students structure their thoughts clearly, and challenge them to consider multiple viewpoints. Focus on building confidence in expressing ideas.`
    };

    const prompt = systemPrompts[subject as keyof typeof systemPrompts] || systemPrompts.english;

    // Request an ephemeral token from OpenAI
    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview-2024-12-17",
        voice: "alloy",
        instructions: prompt,
        input_audio_format: "pcm16",
        output_audio_format: "pcm16",
        turn_detection: {
          type: "server_vad",
          threshold: 0.5,
          prefix_padding_ms: 300,
          silence_duration_ms: 500
        }
      }),
    });

    const data = await response.json();
    console.log("Bakame session created:", data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});