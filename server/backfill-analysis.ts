import { db } from './db';
import { conversations } from '../shared/schema';
import { analyzeConversation } from './openai-analysis';
import { sql } from 'drizzle-orm';

async function backfillAnalysis() {
  console.log('🔄 Starting backfill of conversation analysis...');
  
  const conversationsToAnalyze = await db
    .select()
    .from(conversations)
    .where(sql`${conversations.cefr_level} IS NULL AND ${conversations.transcript} IS NOT NULL`)
    .execute();

  console.log(`📊 Found ${conversationsToAnalyze.length} conversations to analyze`);

  let successCount = 0;
  let failCount = 0;

  for (const conv of conversationsToAnalyze) {
    try {
      if (!Array.isArray(conv.transcript) || conv.transcript.length === 0) {
        console.log(`⏭️  Skipping ${conv.conversation_id} - no transcript`);
        continue;
      }

      console.log(`🤖 Analyzing ${conv.conversation_id}...`);
      const analysis = await analyzeConversation(conv.transcript as any);
      
      await db
        .update(conversations)
        .set({
          cefr_level: analysis.cefr_level,
          topic_complexity: analysis.topic_complexity,
          grammar_score: analysis.grammar_score.toString(),
          vocabulary_score: analysis.vocabulary_score.toString(),
          fluency_score: analysis.fluency_score.toString(),
          coherence_score: analysis.coherence_score.toString(),
          key_insights: analysis.key_insights
        })
        .where(sql`${conversations.conversation_id} = ${conv.conversation_id}`)
        .execute();

      console.log(`✅ Updated ${conv.conversation_id} - ${analysis.cefr_level}, ${analysis.topic_complexity}`);
      successCount++;

      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error: any) {
      console.error(`❌ Failed to analyze ${conv.conversation_id}:`, error.message);
      failCount++;
    }
  }

  console.log(`\n✨ Backfill complete!`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  process.exit(0);
}

backfillAnalysis().catch((error) => {
  console.error('💥 Backfill failed:', error);
  process.exit(1);
});
