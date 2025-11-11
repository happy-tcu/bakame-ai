import { Router, Request } from 'express';
import { conversationWithVoice, textToSpeech, startConversationalAgent } from './elevenlabs';
import { authMiddleware, AuthRequest } from './middleware/auth';
import { storage } from './storage';
import crypto from 'crypto';

const router = Router();

// Webhook validation middleware
function validateWebhookSignature(req: Request, secret: string): boolean {
  const signatureHeader = req.headers['elevenlabs-signature'] as string;
  
  if (!signatureHeader) {
    return false;
  }

  const headers = signatureHeader.split(',');
  const timestamp = headers.find((e) => e.startsWith('t='))?.substring(2);
  const signature = headers.find((e) => e.startsWith('v0='));

  if (!timestamp || !signature) {
    return false;
  }

  // Validate timestamp (30 minute tolerance)
  const reqTimestamp = Number(timestamp) * 1000;
  const tolerance = Date.now() - 30 * 60 * 1000;
  if (reqTimestamp < tolerance) {
    return false;
  }

  // Validate HMAC signature
  const message = `${timestamp}.${JSON.stringify(req.body)}`;
  const digest = 'v0=' + crypto.createHmac('sha256', secret).update(message).digest('hex');
  
  return signature === digest;
}

// ElevenLabs webhook endpoint
router.post('/api/webhooks/elevenlabs', async (req, res) => {
  try {
    const secret = process.env.ELEVENLABS_WEBHOOK_SECRET;
    
    // Validate signature if secret is configured
    if (secret && !validateWebhookSignature(req, secret)) {
      console.error('Invalid webhook signature');
      res.status(401).json({ error: 'Invalid signature' });
      return;
    }

    const { type, data, event_timestamp } = req.body;

    if (type === 'post_call_transcription') {
      // Extract data from webhook
      const {
        agent_id,
        conversation_id,
        status,
        user_id,
        transcript,
        metadata,
        analysis,
        conversation_initiation_client_data
      } = data;

      // Store conversation in database
      await storage.createConversation({
        conversation_id,
        agent_id,
        user_id: user_id || null,
        status: status || null,
        start_time: metadata?.start_time_unix_secs 
          ? new Date(metadata.start_time_unix_secs * 1000) 
          : null,
        call_duration_seconds: metadata?.call_duration_secs || null,
        cost: metadata?.cost?.toString() || null,
        transcript,
        analysis,
        metadata,
        conversation_initiation_data: conversation_initiation_client_data
      });

      console.log(`Stored conversation ${conversation_id}`);
    }

    res.status(200).json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to process webhook',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Get current user
router.get('/api/user/me', authMiddleware, async (req: AuthRequest, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Admin API endpoints - Get all conversations with filters
router.get('/api/admin/conversations', authMiddleware, async (req: AuthRequest, res) => {
  try {
    // Check if user is admin
    if (req.user?.role !== 'admin') {
      res.status(403).json({ error: 'Admin access required' });
      return;
    }

    const {
      startDate,
      endDate,
      userId,
      agentId,
      minDuration,
      maxDuration
    } = req.query;

    const filters: any = {};
    
    if (startDate) filters.startDate = new Date(startDate as string);
    if (endDate) filters.endDate = new Date(endDate as string);
    if (userId) filters.userId = userId as string;
    if (agentId) filters.agentId = agentId as string;
    if (minDuration) filters.minDuration = parseInt(minDuration as string);
    if (maxDuration) filters.maxDuration = parseInt(maxDuration as string);

    const conversations = await storage.getAllConversations(filters);
    res.json({ conversations });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
});

// Admin API - Get conversation statistics
router.get('/api/admin/stats', authMiddleware, async (req: AuthRequest, res) => {
  try {
    // Check if user is admin
    if (req.user?.role !== 'admin') {
      res.status(403).json({ error: 'Admin access required' });
      return;
    }

    const stats = await storage.getConversationStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Admin API - Get single conversation by ID
router.get('/api/admin/conversations/:id', authMiddleware, async (req: AuthRequest, res) => {
  try {
    // Check if user is admin
    if (req.user?.role !== 'admin') {
      res.status(403).json({ error: 'Admin access required' });
      return;
    }

    const conversation = await storage.getConversationById(req.params.id);
    if (!conversation) {
      res.status(404).json({ error: 'Conversation not found' });
      return;
    }

    res.json({ conversation });
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ error: 'Failed to fetch conversation' });
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
