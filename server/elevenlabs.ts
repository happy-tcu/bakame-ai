import axios from 'axios';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_AGENT_ID = process.env.ELEVENLABS_AGENT_ID;
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1';

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function textToSpeech(text: string, voiceId: string = 'pNInz6obpgDQGcFmaJgB'): Promise<Buffer> {
  if (!ELEVENLABS_API_KEY) {
    throw new Error('ELEVENLABS_API_KEY is not configured');
  }

  try {
    const response = await axios.post(
      `${ELEVENLABS_API_URL}/text-to-speech/${voiceId}`,
      {
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      },
      {
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg'
        },
        responseType: 'arraybuffer'
      }
    );

    return Buffer.from(response.data);
  } catch (error: any) {
    console.error('ElevenLabs TTS error:', error.response?.data || error.message);
    throw new Error('Failed to generate speech');
  }
}

export async function getConversationResponse(messages: ConversationMessage[]): Promise<string> {
  const lastUserMessage = messages.filter(m => m.role === 'user').pop();
  if (!lastUserMessage) {
    throw new Error('No user message found');
  }

  const openAIKey = process.env.OPENAI_API_KEY;
  if (!openAIKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  try {
    const systemPrompt = `You are an enthusiastic, encouraging AI English tutor. Your goal is to help students practice English speaking, pronunciation, vocabulary, and conversation skills.

Guidelines:
- Keep responses SHORT (1-2 sentences max) for conversational flow
- Be encouraging and positive
- Correct pronunciation gently without being discouraging
- Ask follow-up questions to keep the conversation going
- Focus on practical, everyday English
- If a student asks to practice pronunciation, give them specific words to say
- If asked about vocabulary, provide definitions and example sentences
- Make learning fun and engaging

Remember: You're having a CONVERSATION, not giving a lecture. Keep it natural and brief!`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map(m => ({ role: m.role, content: m.content }))
        ],
        max_tokens: 150,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${openAIKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error('OpenAI conversation error:', error.response?.data || error.message);
    throw new Error('Failed to generate conversation response');
  }
}

export async function conversationWithVoice(messages: ConversationMessage[], voiceId?: string): Promise<{ text: string; audio: Buffer }> {
  const responseText = await getConversationResponse(messages);
  const audioBuffer = await textToSpeech(responseText, voiceId);
  
  return {
    text: responseText,
    audio: audioBuffer
  };
}

export async function startConversationalAgent(): Promise<{ signedUrl: string }> {
  if (!ELEVENLABS_API_KEY) {
    throw new Error('ELEVENLABS_API_KEY is not configured');
  }
  
  if (!ELEVENLABS_AGENT_ID) {
    throw new Error('ELEVENLABS_AGENT_ID is not configured');
  }

  try {
    console.log('Creating ElevenLabs conversation...');
    console.log('Agent ID:', ELEVENLABS_AGENT_ID);
    
    // Try the agent-specific endpoint format
    const response = await axios.post(
      `${ELEVENLABS_API_URL}/convai/agents/${ELEVENLABS_AGENT_ID}/sessions`,
      {},
      {
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('ElevenLabs conversation created successfully');
    console.log('Response data:', response.data);
    
    return {
      signedUrl: response.data.signed_url
    };
  } catch (error: any) {
    console.error('ElevenLabs Conversational Agent error:');
    console.error('Status:', error.response?.status);
    console.error('Status Text:', error.response?.statusText);
    console.error('Response data:', JSON.stringify(error.response?.data, null, 2));
    console.error('Error message:', error.message);
    
    const errorMessage = error.response?.data?.detail?.message 
      || error.response?.data?.message 
      || error.response?.data?.error
      || error.message 
      || 'Failed to start conversational agent';
    
    throw new Error(errorMessage);
  }
}
