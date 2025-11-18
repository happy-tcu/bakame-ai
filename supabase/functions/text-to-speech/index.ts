import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// OpenAI TTS voices optimized for different use cases
const VOICE_IDS = {
  // Professional and clear voices
  'professional': 'alloy', // Clear, neutral voice
  'warm': 'nova', // Warm, engaging voice
  'friendly': 'shimmer', // Bright, upbeat voice
  'deep': 'onyx', // Deep, authoritative voice
  'storyteller': 'fable', // Expressive storytelling voice
  'conversational': 'echo', // Natural conversational voice
  'default': 'alloy' // Default professional voice
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { text, voice = 'default' } = await req.json();

    if (!text) {
      throw new Error('Text is required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Generating speech for text:', text.substring(0, 100) + '...');
    
    // Select voice ID - handle both string voice IDs and predefined keys
    let voiceId = VOICE_IDS.default;
    
    if (voice) {
      // Check if it's a predefined voice key
      if (VOICE_IDS[voice as keyof typeof VOICE_IDS]) {
        voiceId = VOICE_IDS[voice as keyof typeof VOICE_IDS];
      } else {
        // Assume it's a direct OpenAI voice ID
        voiceId = voice;
      }
    }
    
    console.log('Using voice:', voiceId);
    
    // OpenAI TTS API call
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1', // Use tts-1 for speed, tts-1-hd for higher quality
        input: text,
        voice: voiceId,
        response_format: 'mp3',
        speed: 1.0
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI TTS API error:', errorText);
      console.error('Voice ID used:', voiceId);
      console.error('Request details:', {
        model: 'tts-1',
        voice: voiceId,
        textLength: text.length
      });
      throw new Error(`OpenAI TTS API error: ${errorText}`);
    }

    // Convert audio buffer to base64
    const arrayBuffer = await response.arrayBuffer();
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    );

    console.log('OpenAI TTS generation successful');

    return new Response(
      JSON.stringify({ 
        audioContent: base64Audio,
        voiceUsed: voiceId,
        provider: 'openai'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Text-to-speech error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});