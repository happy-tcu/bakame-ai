import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openAIApiKey) {
    return new Response(
      JSON.stringify({ error: 'OpenAI API key not configured' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }

  const url = new URL(req.url);

  // Check if this is a WebSocket upgrade request
  if (req.headers.get('upgrade') === 'websocket') {
    console.log('WebSocket connection requested');
    
    try {
      // Create WebSocket connection to OpenAI
      const openAIWS = new WebSocket(
        'wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01',
        {
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
            'OpenAI-Beta': 'realtime=v1'
          }
        }
      );

      // Upgrade the incoming request to WebSocket
      const { socket, response } = Deno.upgradeWebSocket(req);

      let sessionConfigured = false;

      // Handle OpenAI WebSocket messages
      openAIWS.onopen = () => {
        console.log('Connected to OpenAI Realtime API');
      };

      openAIWS.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('OpenAI message type:', data.type);
        
        // Configure session after receiving session.created
        if (data.type === 'session.created' && !sessionConfigured) {
          console.log('Session created, configuring...');
          sessionConfigured = true;
          
          const sessionConfig = {
            type: 'session.update',
            session: {
              modalities: ['text', 'audio'],
              instructions: `You are Bakame AI, an intelligent assistant specifically designed to help people in Rwanda. You are FULLY BILINGUAL in Kinyarwanda and English.

PRIMARY FOCUS AREAS:
1. **Kwiga Icyongereza (Learning English)** - Your #1 priority
   - Teach people new English words (Iga abantu amagambo mashya)
   - Help explain grammar and pronunciation
   - Prepare others for job interviews
   - Translate between Kinyarwanda and English
   - Give English lessons at different levels

2. **Serivisi za Irembo (Government Services)** - Your #2 priority
   - Guide people through irembo.gov.rw services
   - Explain how to apply for government documents
   - Help with business registration
   - Provide information about permits and laws

3. **Ubumenyi bw'Igihugu (Local Rwanda Knowledge)**
   - University of Rwanda (UR) applications and info
   - Traffic laws in Rwanda
   - History, culture, and current affairs of Rwanda
   - Business opportunities and requirements

RESPONSE STYLE:
- Be patient, peaceful, and encouraging like a good teacher
- Explain in simple ways using everyday examples
- Always give practical and easy-to-follow answers
- Understand Rwandan culture and be respectful
- Respond in the language the user prefers (Kinyarwanda or English)
- Feel free to code-switch naturally as Rwandans do`,
              voice: 'alloy',
              input_audio_format: 'pcm16',
              output_audio_format: 'pcm16',
              input_audio_transcription: {
                model: 'whisper-1'
              },
              turn_detection: {
                type: 'server_vad',
                threshold: 0.5,
                prefix_padding_ms: 300,
                silence_duration_ms: 1000
              },
              temperature: 0.8,
              max_response_output_tokens: 'inf'
            }
          };
          
          openAIWS.send(JSON.stringify(sessionConfig));
          console.log('Session configuration sent');
        }

        // Forward all messages to client
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(event.data);
        }
      };

      openAIWS.onerror = (error) => {
        console.error('OpenAI WebSocket error:', error);
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({
            type: 'error',
            error: 'OpenAI connection failed'
          }));
        }
      };

      openAIWS.onclose = () => {
        console.log('OpenAI WebSocket closed');
        if (socket.readyState === WebSocket.OPEN) {
          socket.close();
        }
      };

      // Handle client WebSocket messages
      socket.onopen = () => {
        console.log('Client WebSocket connected');
      };

      socket.onmessage = (event) => {
        // Forward client messages to OpenAI
        if (openAIWS.readyState === WebSocket.OPEN) {
          openAIWS.send(event.data);
        }
      };

      socket.onerror = (error) => {
        console.error('Client WebSocket error:', error);
      };

      socket.onclose = () => {
        console.log('Client WebSocket closed');
        if (openAIWS.readyState === WebSocket.OPEN) {
          openAIWS.close();
        }
      };

      return response;

    } catch (error) {
      console.error('WebSocket setup error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to establish WebSocket connection' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
  }

  // Regular HTTP request handling
  return new Response(
    JSON.stringify({ 
      message: 'OpenAI Realtime API Proxy',
      instructions: 'Connect via WebSocket for real-time conversation'
    }),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    }
  );
});