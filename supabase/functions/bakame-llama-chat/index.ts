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
    console.log('Bakame Llama Chat function started');
    
    const GROQ_API_KEY = Deno.env.get('GROQ_API_KEY');
    console.log('GROQ_API_KEY status:', GROQ_API_KEY ? 'found' : 'missing');
    
    if (!GROQ_API_KEY) {
      console.error('GROQ_API_KEY environment variable is not set');
      throw new Error('GROQ API key is not configured. Please contact support.');
    }

    if (!GROQ_API_KEY.startsWith('gsk_')) {
      console.error('Invalid GROQ_API_KEY format');
      throw new Error('Invalid API key format. Please check your configuration.');
    }

    let requestBody;
    try {
      requestBody = await req.json();
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      throw new Error('Invalid request format. Please check your input.');
    }

    const { messages, subject } = requestBody;
    console.log('Request parsed successfully:', { messageCount: messages?.length, subject });

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

    // Use Groq API with Llama model
    console.log('Calling Groq API with Llama model...');
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: llamaMessages,
        max_tokens: 200,
        temperature: 0.7,
        stream: false
      }),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { error: { message: response.statusText } };
      }
      
      const errorMessage = errorData.error?.message || response.statusText || 'Unknown API error';
      console.error('Groq API error:', { status: response.status, error: errorMessage });
      
      if (response.status === 401) {
        throw new Error('Invalid or expired API key. Please check your GROQ configuration.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a few moments.');
      } else {
        throw new Error(`AI service error: ${errorMessage}`);
      }
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('Bakame Llama response generated:', { subject, response: aiResponse });

    return new Response(JSON.stringify({ 
      response: aiResponse,
      model: 'llama-3.1-8b-instant',
      subject,
      provider: 'groq'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Bakame Llama API Error:", error);
    
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    const statusCode = errorMessage.includes('API key') ? 401 : 
                      errorMessage.includes('Rate limit') ? 429 : 500;
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: error instanceof Error ? error.stack : undefined
    }), {
      status: statusCode,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});