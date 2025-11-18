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
  getAnalytics(): Promise<{
    cefrDistribution: Array<{ level: string; count: number }>;
    topicComplexityDistribution: Array<{ complexity: string; count: number }>;
    averageScores: {
      grammar: number;
      vocabulary: number;
      fluency: number;
      coherence: number;
    };
    topInsights: string[];
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
    // Upsert to handle duplicate webhook deliveries
    const [conversation] = await db
      .insert(conversations)
      .values(data)
      .onConflictDoUpdate({
        target: conversations.conversation_id,
        set: {
          status: data.status,
          start_time: data.start_time,
          call_duration_seconds: data.call_duration_seconds,
          call_summary: data.call_summary,
          cost: data.cost,
          transcript: data.transcript,
          analysis: data.analysis,
          metadata: data.metadata,
          conversation_initiation_data: data.conversation_initiation_data,
          cefr_level: data.cefr_level,
          topic_complexity: data.topic_complexity,
          grammar_score: data.grammar_score,
          vocabulary_score: data.vocabulary_score,
          fluency_score: data.fluency_score,
          coherence_score: data.coherence_score,
          key_insights: data.key_insights,
        },
      })
      .returning();
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
    if (filters?.minCost) {
      conditions.push(sql`CAST(${conversations.cost} as decimal) >= ${filters.minCost}`);
    }
    if (filters?.maxCost) {
      conditions.push(sql`CAST(${conversations.cost} as decimal) <= ${filters.maxCost}`);
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

  async getAnalytics(): Promise<{
    cefrDistribution: Array<{ level: string; count: number }>;
    topicComplexityDistribution: Array<{ complexity: string; count: number }>;
    averageScores: {
      grammar: number;
      vocabulary: number;
      fluency: number;
      coherence: number;
    };
    topInsights: string[];
  }> {
    const cefrResult = await db
      .select({
        level: conversations.cefr_level,
        count: sql<number>`count(*)::int`,
      })
      .from(conversations)
      .where(sql`${conversations.cefr_level} IS NOT NULL`)
      .groupBy(conversations.cefr_level)
      .orderBy(conversations.cefr_level);

    const complexityResult = await db
      .select({
        complexity: conversations.topic_complexity,
        count: sql<number>`count(*)::int`,
      })
      .from(conversations)
      .where(sql`${conversations.topic_complexity} IS NOT NULL`)
      .groupBy(conversations.topic_complexity)
      .orderBy(conversations.topic_complexity);

    const scoresResult = await db
      .select({
        avgGrammar: sql<number>`COALESCE(AVG(CAST(${conversations.grammar_score} as decimal)), 0)::float`,
        avgVocabulary: sql<number>`COALESCE(AVG(CAST(${conversations.vocabulary_score} as decimal)), 0)::float`,
        avgFluency: sql<number>`COALESCE(AVG(CAST(${conversations.fluency_score} as decimal)), 0)::float`,
        avgCoherence: sql<number>`COALESCE(AVG(CAST(${conversations.coherence_score} as decimal)), 0)::float`,
      })
      .from(conversations);

    const insightsResult = await db
      .select({
        insights: conversations.key_insights,
      })
      .from(conversations)
      .where(sql`${conversations.key_insights} IS NOT NULL`)
      .limit(10);

    const allInsights = insightsResult
      .flatMap(row => Array.isArray(row.insights) ? row.insights : [])
      .filter(insight => typeof insight === 'string' && insight.length > 0)
      .slice(0, 10);

    return {
      cefrDistribution: cefrResult.map(r => ({ level: r.level || 'Unknown', count: r.count })),
      topicComplexityDistribution: complexityResult.map(r => ({ complexity: r.complexity || 'Unknown', count: r.count })),
      averageScores: {
        grammar: Math.round((scoresResult[0]?.avgGrammar || 0) * 10) / 10,
        vocabulary: Math.round((scoresResult[0]?.avgVocabulary || 0) * 10) / 10,
        fluency: Math.round((scoresResult[0]?.avgFluency || 0) * 10) / 10,
        coherence: Math.round((scoresResult[0]?.avgCoherence || 0) * 10) / 10,
      },
      topInsights: allInsights,
    };
  }
}

export const storage: IStorage = new PostgresStorage();
