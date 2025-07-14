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

    console.log('Creating OpenAI Realtime session...');

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
- Feel free to code-switch naturally as Rwandans do`
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${errorText}`);
    }

    const data = await response.json();
    console.log("Session created successfully:", data.id);

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