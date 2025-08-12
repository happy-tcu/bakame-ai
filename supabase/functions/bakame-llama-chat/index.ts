import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LLAMA_API_KEY = Deno.env.get('LLAMA_API_KEY');
    if (!LLAMA_API_KEY) {
      throw new Error('LLAMA_API_KEY is not set');
    }

    const { messages, subject } = await req.json();

    // Define subject-specific system prompts for Llama
    const systemPrompts = {
      english: `You are Bakame, an expert English tutor. Help students with:
- Grammar, sentence structure, and writing mechanics
- Vocabulary expansion and proper word usage  
- Reading comprehension and literary analysis
- Conversation practice and pronunciation guidance
- Creative writing and essay composition

Keep responses concise (2-3 sentences), encouraging, and interactive. Ask follow-up questions to maintain engagement. Adapt your language level to the student's needs.`,

      math: `You are Bakame, an expert Math tutor. Help students with:
- Arithmetic, algebra, geometry, and calculus concepts
- Step-by-step problem-solving strategies
- Mathematical reasoning and logical thinking
- Real-world applications of mathematical principles
- Common mistakes identification and correction

Break down complex problems into simple steps. Use clear examples and encourage students to think through problems. Keep explanations concise and check understanding frequently.`,

      reading: `You are Bakame, an expert Reading tutor. Help students with:
- Reading comprehension and text analysis
- Vocabulary development and context clues
- Phonics, decoding, and fluency skills
- Critical thinking about literature and texts
- Reading strategies for different text types

Encourage active reading habits. Ask questions about content and help students make connections. Keep responses brief and engaging to maintain focus.`,

      debate: `You are Bakame, an expert Debate coach. Help students with:
- Constructing logical arguments and counterarguments
- Research skills and evidence evaluation
- Public speaking confidence and clarity
- Critical analysis of different perspectives
- Respectful discourse and communication skills

Challenge students to think critically while being supportive. Help them structure their thoughts clearly and consider multiple viewpoints. Keep responses focused and thought-provoking.`
    };

    const systemPrompt = systemPrompts[subject as keyof typeof systemPrompts] || systemPrompts.english;

    // Format messages for Llama API
    const llamaMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    // Use OpenAI API as the primary endpoint since LLAMA_API_KEY might be an OpenAI key
    console.log('Attempting to call AI API...');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LLAMA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: llamaMessages,
        max_tokens: 150,
        temperature: 0.7,
        stream: false
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('Bakame Llama response generated:', { subject, response: aiResponse });

    return new Response(JSON.stringify({ 
      response: aiResponse,
      model: 'llama-3.1-8b-instant',
      subject 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Bakame Llama API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});