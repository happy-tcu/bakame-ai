import { pgTable, serial, varchar, timestamp, text, integer, decimal, jsonb } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  role: varchar('role', { length: 50 }).default('student'),
  created_at: timestamp('created_at').defaultNow()
});

// Conversations table - stores ElevenLabs call data
export const conversations = pgTable('conversations', {
  id: serial('id').primaryKey(),
  conversation_id: varchar('conversation_id', { length: 255 }).notNull().unique(),
  agent_id: varchar('agent_id', { length: 255 }).notNull(),
  user_id: varchar('user_id', { length: 255 }),
  status: varchar('status', { length: 50 }),
  start_time: timestamp('start_time'),
  call_duration_seconds: integer('call_duration_seconds'),
  call_summary: text('call_summary'),
  cost: decimal('cost', { precision: 10, scale: 6 }),
  transcript: jsonb('transcript'),
  analysis: jsonb('analysis'),
  metadata: jsonb('metadata'),
  conversation_initiation_data: jsonb('conversation_initiation_data'),
  cefr_level: varchar('cefr_level', { length: 10 }),
  topic_complexity: varchar('topic_complexity', { length: 50 }),
  grammar_score: decimal('grammar_score', { precision: 4, scale: 2 }),
  vocabulary_score: decimal('vocabulary_score', { precision: 4, scale: 2 }),
  fluency_score: decimal('fluency_score', { precision: 4, scale: 2 }),
  coherence_score: decimal('coherence_score', { precision: 4, scale: 2 }),
  key_insights: jsonb('key_insights'),
  created_at: timestamp('created_at').defaultNow()
});

// Create insert schemas and types
export const insertUserSchema = createInsertSchema(users).omit({ id: true, created_at: true });
export const insertConversationSchema = createInsertSchema(conversations).omit({ id: true, created_at: true });

// Select types using Drizzle's type inference
export type User = typeof users.$inferSelect;
export type Conversation = typeof conversations.$inferSelect;

// Insert types
export type InsertUser = {
  email: string;
  name?: string | null;
  role?: string | null;
};

export type InsertConversation = {
  conversation_id: string;
  agent_id: string;
  user_id?: string | null;
  status?: string | null;
  start_time?: Date | null;
  call_duration_seconds?: number | null;
  call_summary?: string | null;
  cost?: string | null;
  transcript?: any;
  analysis?: any;
  metadata?: any;
  conversation_initiation_data?: any;
  cefr_level?: string | null;
  topic_complexity?: string | null;
  grammar_score?: string | null;
  vocabulary_score?: string | null;
  fluency_score?: string | null;
  coherence_score?: string | null;
  key_insights?: any;
};
