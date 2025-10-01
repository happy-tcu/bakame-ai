import { Router } from 'express';
import { storage } from './storage';
import { generateFlashcards } from './openai';
import { authMiddleware, AuthRequest } from './middleware/auth';
import { insertFlashcardSchema, insertSessionSchema } from '../shared/schema';
import { z } from 'zod';

const router = Router();

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
    await storage.updateProgress(req.user!.id, {
      total_practice_time: newTotalTime,
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

export default router;