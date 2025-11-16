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
    console.log('Getting signed URL from ElevenLabs...');
    console.log('Agent ID:', ELEVENLABS_AGENT_ID);
    
    // GET request with agent_id as query parameter (as per documentation)
    const response = await axios.get(
      `${ELEVENLABS_API_URL}/convai/conversation/get-signed-url`,
      {
        params: {
          agent_id: ELEVENLABS_AGENT_ID
        },
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY
        }
      }
    );

    console.log('ElevenLabs response received');
    console.log('Response data:', response.data);
    
    // Validate that we received a signed URL
    if (!response.data?.signed_url || typeof response.data.signed_url !== 'string') {
      throw new Error('ElevenLabs did not provide a valid signed URL');
    }
    
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

export interface ElevenLabsConversation {
  conversation_id: string;
  agent_id: string;
  user_id?: string;
  status?: string;
  // Top-level fields from API response
  start_time_unix_secs?: number;
  call_duration_secs?: number;
  call_summary_title?: string;
  transcript?: any[];
  analysis?: any;
  metadata?: {
    [key: string]: any;
  };
  conversation_initiation_client_data?: any;
  [key: string]: any;
}

export async function fetchConversations(agentId?: string): Promise<ElevenLabsConversation[]> {
  if (!ELEVENLABS_API_KEY) {
    throw new Error('ELEVENLABS_API_KEY is not configured');
  }

  try {
    const params: any = {};
    if (agentId) {
      params.agent_id = agentId;
    }

    const response = await axios.get(
      `${ELEVENLABS_API_URL}/convai/conversations`,
      {
        params,
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY
        }
      }
    );

    // ElevenLabs returns conversations in different formats depending on the API version
    // Handle both array and paginated responses
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data.conversations && Array.isArray(response.data.conversations)) {
      return response.data.conversations;
    } else if (response.data.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }

    return [];
  } catch (error: any) {
    console.error('ElevenLabs fetch conversations error:');
    console.error('Status:', error.response?.status);
    console.error('Response data:', JSON.stringify(error.response?.data, null, 2));
    console.error('Error message:', error.message);
    
    throw new Error('Failed to fetch conversations from ElevenLabs');
  }
}

export async function fetchConversationById(conversationId: string): Promise<ElevenLabsConversation | null> {
  if (!ELEVENLABS_API_KEY) {
    throw new Error('ELEVENLABS_API_KEY is not configured');
  }

  try {
    const response = await axios.get(
      `${ELEVENLABS_API_URL}/convai/conversations/${conversationId}`,
      {
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY
        }
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null;
    }
    
    console.error('ElevenLabs fetch conversation error:');
    console.error('Status:', error.response?.status);
    console.error('Response data:', JSON.stringify(error.response?.data, null, 2));
    console.error('Error message:', error.message);
    
    throw new Error('Failed to fetch conversation from ElevenLabs');
  }
}
