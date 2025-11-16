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
  call_summary: text('call_summary'), // Call summary from ElevenLabs
  cost: decimal('cost', { precision: 10, scale: 6 }),
  transcript: jsonb('transcript'), // Array of conversation turns
  analysis: jsonb('analysis'), // Analysis results and summary
  metadata: jsonb('metadata'), // Full metadata from webhook
  conversation_initiation_data: jsonb('conversation_initiation_data'), // Config and variables
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
};
