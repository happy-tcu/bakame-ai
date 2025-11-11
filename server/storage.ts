import { db } from './db';
import { users } from '../shared/schema';
import { eq } from 'drizzle-orm';
import type { User, InsertUser } from '../shared/schema';

export interface IStorage {
  // User operations
  createUser(data: InsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: number): Promise<User | null>;
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
}

export const storage: IStorage = new PostgresStorage();
