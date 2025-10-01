import { db } from './db';
import { users, flashcards, learning_sessions, user_progress } from '../shared/schema';
import { eq, and } from 'drizzle-orm';
import type { 
  User, InsertUser, Flashcard, InsertFlashcard, 
  LearningSession, InsertSession, UserProgress, InsertProgress 
} from '../shared/schema';

export interface IStorage {
  // User operations
  createUser(data: InsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: number): Promise<User | null>;

  // Flashcard operations
  createFlashcard(data: InsertFlashcard): Promise<Flashcard>;
  getFlashcardsByUser(userId: number): Promise<Flashcard[]>;
  getFlashcardsByTopic(userId: number, topic: string): Promise<Flashcard[]>;

  // Session operations
  createSession(data: InsertSession): Promise<LearningSession>;
  getSessionsByUser(userId: number): Promise<LearningSession[]>;

  // Progress operations
  getProgress(userId: number): Promise<UserProgress | null>;
  updateProgress(userId: number, data: Partial<InsertProgress>): Promise<UserProgress>;
}

export class PostgresStorage implements IStorage {
  async createUser(data: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(data).returning();
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || null;
  }

  async getUserById(id: number): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || null;
  }

  async createFlashcard(data: InsertFlashcard): Promise<Flashcard> {
    const [flashcard] = await db.insert(flashcards).values(data).returning();
    return flashcard;
  }

  async getFlashcardsByUser(userId: number): Promise<Flashcard[]> {
    return db.select().from(flashcards).where(eq(flashcards.user_id, userId));
  }

  async getFlashcardsByTopic(userId: number, topic: string): Promise<Flashcard[]> {
    return db.select().from(flashcards)
      .where(and(eq(flashcards.user_id, userId), eq(flashcards.topic, topic)));
  }

  async createSession(data: InsertSession): Promise<LearningSession> {
    const [session] = await db.insert(learning_sessions).values(data).returning();
    return session;
  }

  async getSessionsByUser(userId: number): Promise<LearningSession[]> {
    return db.select().from(learning_sessions).where(eq(learning_sessions.user_id, userId));
  }

  async getProgress(userId: number): Promise<UserProgress | null> {
    const [progress] = await db.select().from(user_progress).where(eq(user_progress.user_id, userId));
    return progress || null;
  }

  async updateProgress(userId: number, data: Partial<InsertProgress>): Promise<UserProgress> {
    const existing = await this.getProgress(userId);
    if (existing) {
      const [updated] = await db.update(user_progress)
        .set(data)
        .where(eq(user_progress.user_id, userId))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(user_progress)
        .values({ ...data, user_id: userId })
        .returning();
      return created;
    }
  }
}

export const storage: IStorage = new PostgresStorage();