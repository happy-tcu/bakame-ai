import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, sessionId, context = {} } = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Processing IVR message:', message);

    // Check for custom IVR content first
    const { data: customContent } = await supabase
      .from('ivr_content')
      .select('*')
      .eq('is_active', true)
      .order('priority', { ascending: false });

    let systemPrompt = `You are an intelligent IVR (Interactive Voice Response) assistant for Bakame AI, a company specializing in offline IVR intelligence and communication solutions. 

Your role is to:
1. Help users understand Bakame AI's services and capabilities
2. Answer questions about offline IVR technology
3. Guide users to appropriate solutions (Enterprise, Education, Government)
4. Collect contact information when users want to learn more
5. Provide helpful, professional responses in a conversational tone

Key information about Bakame AI:
- Specializes in offline IVR intelligence solutions
- Offers Enterprise, Education, and Government solutions
- Provides revolutionary communication technology
- Focuses on AI-powered voice interactions without internet dependency

Keep responses concise and helpful. If you don't know something specific about Bakame AI, acknowledge it and offer to connect them with a specialist.`;

    // Add custom content context if available
    if (customContent && customContent.length > 0) {
      systemPrompt += `\n\nAdditional company information:\n${customContent.map(content => 
        `- ${content.title}: ${content.content}`
      ).join('\n')}`;
    }

    // Get conversation history for context
    let conversationHistory = [];
    if (sessionId) {
      const { data: session } = await supabase
        .from('ivr_sessions')
        .select('conversation_history')
        .eq('session_id', sessionId)
        .single();
      
      if (session?.conversation_history) {
        conversationHistory = session.conversation_history;
      }
    }

    // Prepare messages for ChatGPT
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: message }
    ];

    console.log('Sending request to ChatGPT...');

    // Send to ChatGPT
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`ChatGPT API error: ${errorText}`);
    }

    const result = await response.json();
    const aiResponse = result.choices[0].message.content;

    console.log('ChatGPT response received');

    // Update conversation history
    if (sessionId) {
      const updatedHistory = [
        ...conversationHistory.slice(-10),
        { role: 'user', content: message },
        { role: 'assistant', content: aiResponse }
      ];

      await supabase
        .from('ivr_sessions')
        .upsert({
          session_id: sessionId,
          conversation_history: updatedHistory,
          updated_at: new Date().toISOString()
        });
    }

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        sessionId: sessionId 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('IVR chat error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});