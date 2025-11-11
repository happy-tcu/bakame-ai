import { Router } from 'express';
import { storage } from './storage';
import { generateFlashcards } from './openai';
import { conversationWithVoice, textToSpeech } from './elevenlabs';
import { authMiddleware, AuthRequest } from './middleware/auth';
import { insertFlashcardSchema, insertSessionSchema, insertUserSchema } from '../shared/schema';
import { z } from 'zod';

const router = Router();

// Create a new user and initialize their progress
router.post('/api/users', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const validatedData = insertUserSchema.parse(req.body);
    
    // Check if user already exists
    const existingUser = await storage.getUserByEmail(validatedData.email);
    if (existingUser) {
      // User already exists, just initialize their progress if needed
      const progress = await storage.getProgress(existingUser.id);
      if (!progress) {
        await storage.updateProgress(existingUser.id, {
          total_xp: 0,
          streak_days: 0,
          total_practice_time: 0,
          last_practice_date: new Date()
        });
      }
      res.json({ user: existingUser });
      return;
    }
    
    // Create new user
    const user = await storage.createUser({
      email: validatedData.email,
      name: validatedData.name,
      role: 'student'
    });
    
    // Initialize user progress
    await storage.updateProgress(user.id, {
      total_xp: 0,
      streak_days: 0,
      total_practice_time: 0,
      last_practice_date: new Date()
    });
    
    res.json({ user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  }
});

// Generate flashcards with AI
router.post('/api/flashcards/generate', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { topic, text, count } = req.body;
    const flashcards = await generateFlashcards(topic, text, count);
    
    // Save generated flashcards
    const savedCards: any[] = [];
    for (const card of flashcards) {
      const saved = await storage.createFlashcard({
        user_id: req.user!.id,
        topic,
        front: card.front,
        back: card.back,
        difficulty: 'medium'
      });
      savedCards.push(saved);
    }
    
    res.json({ flashcards: savedCards });
  } catch (error) {
    console.error('Error generating flashcards:', error);
    res.status(500).json({ error: 'Failed to generate flashcards' });
  }
});

// Get user's flashcards
router.get('/api/flashcards', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const flashcards = await storage.getFlashcardsByUser(req.user!.id);
    res.json({ flashcards });
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    res.status(500).json({ error: 'Failed to fetch flashcards' });
  }
});

// Save a flashcard
router.post('/api/flashcards', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const validatedData = insertFlashcardSchema.parse({
      ...req.body,
      user_id: req.user!.id
    });
    // Cast to InsertFlashcard since drizzle-zod v0.8 has type inference issues
    const flashcard = await storage.createFlashcard({
      user_id: req.user!.id,
      topic: req.body.topic,
      front: req.body.front,
      back: req.body.back,
      difficulty: req.body.difficulty || 'medium'
    });
    res.json({ flashcard });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      console.error('Error creating flashcard:', error);
      res.status(500).json({ error: 'Failed to create flashcard' });
    }
  }
});

// Record learning session
router.post('/api/sessions', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const validatedData = insertSessionSchema.parse({
      ...req.body,
      user_id: req.user!.id
    });
    // Cast to InsertSession since drizzle-zod v0.8 has type inference issues
    const sessionData = {
      user_id: req.user!.id,
      session_type: req.body.session_type,
      duration_seconds: req.body.duration_seconds,
      score: req.body.score
    };
    const session = await storage.createSession(sessionData);
    
    // Update user progress
    const progress = await storage.getProgress(req.user!.id);
    const newTotalTime = (progress?.total_practice_time || 0) + (sessionData.duration_seconds || 0);
    
    // Award XP based on session performance (10 base + score bonus)
    const earnedXP = 10 + Math.round((sessionData.score || 0) * 0.5);
    const newTotalXP = (progress?.total_xp || 0) + earnedXP;
    const newLevel = Math.floor(newTotalXP / 100) + 1;
    
    // Calculate streak
    const lastPractice = progress?.last_practice_date;
    let newStreak = 1;
    if (lastPractice) {
      const lastDate = new Date(lastPractice);
      const today = new Date();
      const daysDiff = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff === 1) {
        newStreak = (progress?.streak_days || 0) + 1;
      } else if (daysDiff === 0) {
        newStreak = progress?.streak_days || 1;
      }
    }
    
    await storage.updateProgress(req.user!.id, {
      total_xp: newTotalXP,
      current_level: newLevel,
      total_practice_time: newTotalTime,
      streak_days: newStreak,
      last_practice_date: new Date()
    });
    
    res.json({ session });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      console.error('Error creating session:', error);
      res.status(500).json({ error: 'Failed to create session' });
    }
  }
});

// Get user progress
router.get('/api/progress', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const progress = await storage.getProgress(req.user!.id);
    res.json({ progress });
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
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

// Mock pronunciation check endpoint
router.post('/api/pronunciation/check', authMiddleware, async (req: AuthRequest, res) => {
  try {
    // Mock response for now
    const score = Math.random() * 100;
    const feedback = score > 70 ? 'Great pronunciation!' : 'Keep practicing!';
    res.json({ score, feedback });
  } catch (error) {
    console.error('Error checking pronunciation:', error);
    res.status(500).json({ error: 'Failed to check pronunciation' });
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

export default router;