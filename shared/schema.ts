import { pgTable, serial, varchar, text, integer, timestamp, decimal } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  role: varchar('role', { length: 50 }).default('student'),
  created_at: timestamp('created_at').defaultNow()
});

// Flashcards table
export const flashcards = pgTable('flashcards', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id),
  topic: varchar('topic', { length: 255 }),
  front: text('front').notNull(),
  back: text('back').notNull(),
  difficulty: varchar('difficulty', { length: 50 }).default('medium'),
  created_at: timestamp('created_at').defaultNow()
});

// Learning sessions table
export const learning_sessions = pgTable('learning_sessions', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id),
  session_type: varchar('session_type', { length: 100 }),
  duration_seconds: integer('duration_seconds'),
  score: decimal('score', { precision: 5, scale: 2 }),
  created_at: timestamp('created_at').defaultNow()
});

// User progress table
export const user_progress = pgTable('user_progress', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id).unique(),
  total_xp: integer('total_xp').default(0),
  current_level: integer('current_level').default(1),
  total_practice_time: integer('total_practice_time').default(0),
  flashcards_completed: integer('flashcards_completed').default(0),
  pronunciation_score: decimal('pronunciation_score', { precision: 5, scale: 2 }),
  streak_days: integer('streak_days').default(0),
  last_practice_date: timestamp('last_practice_date')
});

// Create insert schemas and types
export const insertUserSchema = createInsertSchema(users).omit({ id: true, created_at: true });
export const insertFlashcardSchema = createInsertSchema(flashcards).omit({ id: true, created_at: true });
export const insertSessionSchema = createInsertSchema(learning_sessions).omit({ id: true, created_at: true });
export const insertProgressSchema = createInsertSchema(user_progress).omit({ id: true });

// Select types using Drizzle's type inference
export type User = typeof users.$inferSelect;
export type Flashcard = typeof flashcards.$inferSelect;
export type LearningSession = typeof learning_sessions.$inferSelect;
export type UserProgress = typeof user_progress.$inferSelect;

// Insert types defined manually due to drizzle-zod v0.8 type inference issues
export type InsertUser = {
  email: string;
  name?: string | null;
  role?: string | null;
};

export type InsertFlashcard = {
  user_id?: number | null;
  topic?: string | null;
  front: string;
  back: string;
  difficulty?: string | null;
};

export type InsertSession = {
  user_id?: number | null;
  session_type?: string | null;
  duration_seconds?: number | null;
  score?: string | null;
};

export type InsertProgress = {
  user_id?: number | null;
  total_xp?: number | null;
  current_level?: number | null;
  total_practice_time?: number | null;
  flashcards_completed?: number | null;
  pronunciation_score?: string | null;
  streak_days?: number | null;
  last_practice_date?: Date | null;
};