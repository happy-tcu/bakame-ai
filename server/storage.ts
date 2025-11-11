import { db } from './db';
import { users, conversations } from '../shared/schema';
import { eq, and, gte, lte, desc, sql } from 'drizzle-orm';
import type { User, InsertUser, Conversation, InsertConversation } from '../shared/schema';

export interface IStorage {
  // User operations
  createUser(data: InsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: number): Promise<User | null>;

  // Conversation operations
  createConversation(data: InsertConversation): Promise<Conversation>;
  getConversationById(conversationId: string): Promise<Conversation | null>;
  getAllConversations(filters?: {
    startDate?: Date;
    endDate?: Date;
    userId?: string;
    agentId?: string;
    minDuration?: number;
    maxDuration?: number;
    minCost?: number;
    maxCost?: number;
  }): Promise<Conversation[]>;
  getConversationStats(): Promise<{
    totalCalls: number;
    totalDuration: number;
    totalCost: number;
    uniqueUsers: number;
  }>;
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

  async createConversation(data: InsertConversation): Promise<Conversation> {
    const [conversation] = await db.insert(conversations).values(data).returning();
    return conversation;
  }

  async getConversationById(conversationId: string): Promise<Conversation | null> {
    const [conversation] = await db.select().from(conversations)
      .where(eq(conversations.conversation_id, conversationId));
    return conversation || null;
  }

  async getAllConversations(filters?: {
    startDate?: Date;
    endDate?: Date;
    userId?: string;
    agentId?: string;
    minDuration?: number;
    maxDuration?: number;
    minCost?: number;
    maxCost?: number;
  }): Promise<Conversation[]> {
    const conditions: any[] = [];
    
    if (filters?.startDate) {
      conditions.push(gte(conversations.start_time, filters.startDate));
    }
    if (filters?.endDate) {
      conditions.push(lte(conversations.start_time, filters.endDate));
    }
    if (filters?.userId) {
      conditions.push(eq(conversations.user_id, filters.userId));
    }
    if (filters?.agentId) {
      conditions.push(eq(conversations.agent_id, filters.agentId));
    }
    if (filters?.minDuration) {
      conditions.push(gte(conversations.call_duration_seconds, filters.minDuration));
    }
    if (filters?.maxDuration) {
      conditions.push(lte(conversations.call_duration_seconds, filters.maxDuration));
    }
    
    if (conditions.length > 0) {
      return db.select()
        .from(conversations)
        .where(and(...conditions))
        .orderBy(desc(conversations.created_at));
    }
    
    return db.select()
      .from(conversations)
      .orderBy(desc(conversations.created_at));
  }

  async getConversationStats(): Promise<{
    totalCalls: number;
    totalDuration: number;
    totalCost: number;
    uniqueUsers: number;
  }> {
    const result = await db
      .select({
        totalCalls: sql<number>`count(*)::int`,
        totalDuration: sql<number>`COALESCE(sum(${conversations.call_duration_seconds}), 0)::int`,
        totalCost: sql<number>`COALESCE(sum(CAST(${conversations.cost} as decimal)), 0)::float`,
        uniqueUsers: sql<number>`count(DISTINCT ${conversations.user_id})::int`,
      })
      .from(conversations);

    return result[0] || { totalCalls: 0, totalDuration: 0, totalCost: 0, uniqueUsers: 0 };
  }
}

export const storage: IStorage = new PostgresStorage();
