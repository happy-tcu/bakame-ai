import { fetchConversations, ElevenLabsConversation } from './elevenlabs';
import { storage } from './storage';
import { analyzeConversation } from './ai-analysis';
import dotenv from 'dotenv';

dotenv.config();

const SYNC_INTERVAL_MS = 30000; // 30 seconds

class ElevenLabsSync {
  private syncInProgress = false;
  private lastSyncedConversations = new Set<string>();
  private syncCount = 0;

  async syncConversations() {
    if (this.syncInProgress) {
      console.log('⏭️  Sync already in progress, skipping...');
      return;
    }

    this.syncInProgress = true;
    this.syncCount++;
    
    try {
      console.log(`\n🔄 [Sync #${this.syncCount}] Fetching conversations from Eleven Labs...`);
      const conversations = await fetchConversations();
      
      if (conversations.length === 0) {
        console.log('📭 No conversations found');
        this.syncInProgress = false;
        return;
      }

      console.log(`📥 Found ${conversations.length} total conversations`);

      // Filter out conversations we've already synced
      const newConversations = conversations.filter(
        conv => !this.lastSyncedConversations.has(conv.conversation_id)
      );

      if (newConversations.length === 0) {
        console.log('✅ No new conversations to sync');
        this.syncInProgress = false;
        return;
      }

      console.log(`🆕 Processing ${newConversations.length} new conversations`);

      for (const conv of newConversations) {
        try {
          await this.processConversation(conv);
          this.lastSyncedConversations.add(conv.conversation_id);
        } catch (error: any) {
          console.error(`❌ Failed to process conversation ${conv.conversation_id}:`, error.message);
          // Continue with next conversation even if one fails
        }
      }

      console.log(`✅ Sync complete! Processed ${newConversations.length} conversations`);
    } catch (error: any) {
      console.error('❌ Sync error:', error.message);
    } finally {
      this.syncInProgress = false;
    }
  }

  async processConversation(conv: ElevenLabsConversation) {
    console.log(`  📝 Processing conversation: ${conv.conversation_id}`);

    // Check if conversation already exists in database
    const existing = await storage.getConversationById(conv.conversation_id);
    if (existing) {
      console.log(`  ⏭️  Already in database, skipping`);
      return;
    }

    // AI analysis if transcript exists
    let aiAnalysis: any = null;
    if (conv.transcript && Array.isArray(conv.transcript) && conv.transcript.length > 0) {
      try {
        console.log(`  🤖 Running AI analysis...`);
        aiAnalysis = await analyzeConversation(conv.transcript);
        console.log(`  ✅ AI analysis complete`);
      } catch (error: any) {
        console.error(`  ⚠️  AI analysis failed:`, error.message);
        // Continue storing conversation even if analysis fails
      }
    }

    // Combine ElevenLabs analysis with AI analysis
    const combinedAnalysis = {
      ...(conv.analysis || {}),
      ai: aiAnalysis
    };

    // Store in database
    await storage.createConversation({
      conversation_id: conv.conversation_id,
      agent_id: conv.agent_id,
      user_id: conv.user_id || null,
      status: conv.status || null,
      start_time: conv.metadata?.start_time_unix_secs 
        ? new Date(conv.metadata.start_time_unix_secs * 1000) 
        : null,
      call_duration_seconds: conv.metadata?.call_duration_secs || null,
      cost: conv.metadata?.cost?.toString() || null,
      transcript: conv.transcript || null,
      analysis: combinedAnalysis,
      metadata: conv.metadata || null,
      conversation_initiation_data: conv.conversation_initiation_client_data || null,
    });

    console.log(`  💾 Stored in database`);
  }

  start() {
    console.log('🚀 Starting Eleven Labs sync service...');
    console.log(`⏱️  Sync interval: ${SYNC_INTERVAL_MS / 1000} seconds`);
    
    // Initial sync
    this.syncConversations();

    // Set up recurring sync
    setInterval(() => {
      this.syncConversations();
    }, SYNC_INTERVAL_MS);

    console.log('✅ Sync service started successfully!');
  }
}

// Create and export singleton instance
export const elevenLabsSync = new ElevenLabsSync();

// Auto-start if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  elevenLabsSync.start();
  
  // Keep the process alive
  process.on('SIGINT', () => {
    console.log('\n👋 Shutting down sync service...');
    process.exit(0);
  });
}
