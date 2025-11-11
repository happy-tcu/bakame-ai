import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  role: varchar('role', { length: 50 }).default('student'),
  created_at: timestamp('created_at').defaultNow()
});

// Create insert schemas and types
export const insertUserSchema = createInsertSchema(users).omit({ id: true, created_at: true });

// Select types using Drizzle's type inference
export type User = typeof users.$inferSelect;

// Insert types
export type InsertUser = {
  email: string;
  name?: string | null;
  role?: string | null;
};
