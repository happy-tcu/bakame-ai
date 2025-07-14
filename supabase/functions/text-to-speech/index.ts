import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ElevenLabs multilingual voices that work well with African languages
const VOICE_IDS = {
  // Professional, clear voices that work well for both English and Kinyarwanda
  'multilingual': 'pNInz6obpgDQGcFmaJgB', // Adam - good for both languages
  'female': 'EXAVITQu4vr4xnSDxMaL', // Sarah - clear female voice
  'male': 'VR6AewLTigWG4xSOukaG', // Arnold - clear male voice
  'default': 'pNInz6obpgDQGcFmaJgB' // Adam as default
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
    
    // Select voice ID
    const voiceId = VOICE_IDS[voice as keyof typeof VOICE_IDS] || VOICE_IDS.default;
    
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
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.0,
          use_speaker_boost: true
        },
        // Optimize settings based on detected language
        language_code: detectedLang === 'kinyarwanda' ? 'rw' : 'en',
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