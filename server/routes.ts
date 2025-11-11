import { Router } from 'express';
import { conversationWithVoice, textToSpeech, startConversationalAgent } from './elevenlabs';
import { authMiddleware, AuthRequest } from './middleware/auth';

const router = Router();

// Get current user
router.get('/api/user/me', authMiddleware, async (req: AuthRequest, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// ElevenLabs conversation endpoint (no auth required for demo)
router.post('/api/elevenlabs/conversation', async (req, res) => {
  try {
    const { messages, voiceId } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: 'Messages array is required' });
      return;
    }

    const result = await conversationWithVoice(messages, voiceId);
    
    // Convert audio buffer to base64 for easy transmission
    const audioBase64 = result.audio.toString('base64');
    
    res.json({
      text: result.text,
      audio: audioBase64,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Conversation error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to process conversation',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// ElevenLabs text-to-speech endpoint (no auth required for demo)
router.post('/api/elevenlabs/tts', async (req, res) => {
  try {
    const { text, voiceId } = req.body;
    
    if (!text) {
      res.status(400).json({ error: 'Text is required' });
      return;
    }

    const audioBuffer = await textToSpeech(text, voiceId);
    
    // Set proper headers for audio response
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioBuffer.length
    });
    
    res.send(audioBuffer);
  } catch (error: any) {
    console.error('TTS error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to generate speech',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Start ElevenLabs Conversational Agent (no auth required for demo)
router.post('/api/elevenlabs/start-conversation', async (req, res) => {
  try {
    const result = await startConversationalAgent();
    res.json(result);
  } catch (error: any) {
    console.error('Start conversation error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to start conversation',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

export default router;
