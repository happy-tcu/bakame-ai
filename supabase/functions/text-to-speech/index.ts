import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ElevenLabs voices optimized for Rwandan/African accent
const VOICE_IDS = {
  // These voices work better with African pronunciation patterns
  'rwandan_male': 'VR6AewLTigWG4xSOukaG', // Arnold - deeper, warmer tone
  'rwandan_female': 'EXAVITQu4vr4xnSDxMaL', // Sarah - clear, friendly
  'professional': 'pNInz6obpgDQGcFmaJgB', // Adam - neutral professional
  'warm': 'TX3LPaxmHKxFdv7VOQHJ', // Liam - warm, approachable
  'default': 'VR6AewLTigWG4xSOukaG' // Use Arnold as default for Rwandan feel
};

// Detect if text contains Kinyarwanda by checking for common Kinyarwanda words/patterns
function detectLanguage(text: string): 'kinyarwanda' | 'english' | 'mixed' {
  const kinyarwandaWords = [
    'murakoze', 'muraho', 'amakuru', 'ni gute', 'ndashaka', 'nigute', 'ariko',
    'kwiga', 'icyongereza', 'kaminuza', 'irembo', 'amategeko', 'umuhanda',
    'serivisi', 'leta', 'ubumenyi', 'igihugu', 'muri', 'kuri', 'mu', 'ku',
    'gusaba', 'gukora', 'gutanga', 'bigire', 'mpigire', 'nitangire'
  ];
  
  const lowerText = text.toLowerCase();
  const kinyarwandaMatches = kinyarwandaWords.filter(word => lowerText.includes(word)).length;
  const totalWords = text.split(' ').length;
  
  if (kinyarwandaMatches > totalWords * 0.3) return 'kinyarwanda';
  if (kinyarwandaMatches > 0) return 'mixed';
  return 'english';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { text, voice = 'default' } = await req.json();

    if (!text) {
      throw new Error('Text is required');
    }

    const elevenlabsApiKey = Deno.env.get('ELEVENLABS_API_KEY');
    if (!elevenlabsApiKey) {
      throw new Error('ElevenLabs API key not configured');
    }

    console.log('Generating speech for text:', text.substring(0, 100) + '...');
    
    // Detect language and choose appropriate voice settings
    const detectedLang = detectLanguage(text);
    console.log('Detected language:', detectedLang);
    
    // Select voice ID - prioritize user custom voice if provided
    const voiceId = voice && VOICE_IDS[voice as keyof typeof VOICE_IDS] 
      ? VOICE_IDS[voice as keyof typeof VOICE_IDS] 
      : VOICE_IDS.default;
    
    // ElevenLabs API call with multilingual model
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': elevenlabsApiKey,
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2', // Best model for multiple languages
        voice_settings: {
          // Settings optimized for Rwandan/African pronunciation
          stability: 0.6, // Slightly higher for consistent Rwandan accent
          similarity_boost: 0.8, // Higher for more authentic voice character
          style: 0.2, // Add some natural speaking style
          use_speaker_boost: true
        },
        // Remove language_code as it's not supported by eleven_multilingual_v2
        pronunciation_dictionary_locators: [], // Can add custom Kinyarwanda pronunciations later
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API error:', errorText);
      throw new Error(`ElevenLabs API error: ${errorText}`);
    }

    // Convert audio buffer to base64
    const arrayBuffer = await response.arrayBuffer();
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    );

    console.log('ElevenLabs speech generation successful');

    return new Response(
      JSON.stringify({ 
        audioContent: base64Audio,
        detectedLanguage: detectedLang,
        voiceUsed: voiceId
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