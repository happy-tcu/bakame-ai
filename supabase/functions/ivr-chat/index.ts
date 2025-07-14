import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Web scraping function using Firecrawl
async function scrapeWebsite(url: string): Promise<string> {
  const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
  if (!firecrawlApiKey) {
    throw new Error('Firecrawl API key not configured');
  }

  console.log('Scraping website:', url);
  
  try {
    const response = await fetch('https://api.firecrawl.dev/v0/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        formats: ['markdown'],
        onlyMainContent: true,
        includeTags: ['h1', 'h2', 'h3', 'p', 'article', 'div'],
        excludeTags: ['nav', 'footer', 'aside', 'script', 'style'],
        waitFor: 2000
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Firecrawl API error:', errorText);
      return `Failed to scrape ${url}: ${errorText}`;
    }

    const result = await response.json();
    console.log('Scraping successful for:', url);
    
    if (result.success && result.data?.markdown) {
      // Limit content to prevent token overflow
      const content = result.data.markdown.substring(0, 3000);
      return content;
    } else {
      return `No content found at ${url}`;
    }
  } catch (error) {
    console.error('Scraping error:', error);
    return `Error scraping ${url}: ${error.message}`;
  }
}

// Search function for web queries
async function searchWeb(query: string): Promise<string> {
  console.log('Performing web search for:', query);
  
  // Use DuckDuckGo for search results
  try {
    const searchUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
    const response = await fetch(searchUrl);
    
    if (!response.ok) {
      return `Failed to search for: ${query}`;
    }
    
    const result = await response.json();
    
    if (result.Abstract) {
      return result.Abstract;
    } else if (result.RelatedTopics && result.RelatedTopics.length > 0) {
      return result.RelatedTopics.slice(0, 3).map((topic: any) => topic.Text).join('. ');
    } else {
      return `No search results found for: ${query}`;
    }
  } catch (error) {
    console.error('Search error:', error);
    return `Error searching for: ${query}`;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, sessionId, context = {} } = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Processing IVR message:', message);

    // Check for custom IVR content first
    const { data: customContent } = await supabase
      .from('ivr_content')
      .select('*')
      .eq('is_active', true)
      .order('priority', { ascending: false });

    let systemPrompt = `You are Bakame AI, an intelligent IVR assistant specifically designed to help people in Rwanda. You are FULLY BILINGUAL in Kinyarwanda and English, and you should respond naturally in the language the user prefers.

LANGUAGE BEHAVIOR:
- If user speaks in Kinyarwanda, respond primarily in Kinyarwanda with English explanations when helpful
- If user speaks in English, respond in English but offer Kinyarwanda translations when teaching
- Feel free to code-switch naturally between languages as Rwandans do
- For English learning requests, use both languages to explain concepts clearly

PRIMARY FOCUS AREAS:
1. **Kwiga Icyongereza (Learning English)** - Your #1 priority
   - Iga abantu amagambo mashya mu Cyongereza (Teach people new English words)
   - Gufasha mu gusobanura grammar na pronunciation (Help explain grammar and pronunciation)  
   - Gutegura abandi ku biganiro by'akazi (Prepare others for job interviews)
   - Guhindura hagati ya Kinyarwanda n'Icyongereza (Translate between Kinyarwanda and English)
   - Gutanga amasomo y'Icyongereza ku nzego zinyuranye (Give English lessons at different levels)

2. **Serivisi za Irembo (Irembo Government Services)** - Your #2 priority
   - Kuyobora abantu mu serivisi za irembo.gov.rw (Guide people through irembo.gov.rw services)
   - Gusobanura uburyo bwo gusaba inyandiko za leta (Explain how to apply for government documents)
   - Gufasha mu kwandikisha ubucuruzi (Help with business registration)
   - Gutanga amakuru ku mpushya n'andi mategeko (Provide information about permits and laws)

3. **Ubumenyi bw'Igihugu (Local Rwanda Knowledge)**
   - Kaminuza y'u Rwanda (UR) - ubusabe n'amakuru (University of Rwanda applications and info)
   - Amategeko y'umuhanda muri Rwanda (Traffic laws in Rwanda)
   - Amateka, umuco, n'amakuru y'ubu y'u Rwanda (History, culture, and current affairs of Rwanda)
   - Amahirwe y'ubucuruzi n'ibisabwa (Business opportunities and requirements)

RESPONSE STYLE:
- Kora nk'umunyeshuri ukomeye, ufite amahoro, kandi ushishikaza (Be patient, peaceful, and encouraging like a good teacher)
- Sobanura mu buryo bworoshye, ukoresha ingero za buri munsi (Explain in simple ways, using everyday examples)
- Nya ko utanga ibisubizo bifite akamaro kandi byoroshye gukurikirana (Always give practical and easy-to-follow answers)
- Menya umuco w'u Rwanda kandi ubane neza n'abantu (Understand Rwandan culture and be respectful)

SAMPLE KINYARWANDA RESPONSES:
- Kuri "Kwiga Icyongereza": "Murakoze kubaza! Reka mbaraguhe amagambo y'ingenzi..."
- Kuri "Irembo": "Nzagufasha kureba uburyo bwo gukoresha irembo.gov.rw..."
- Kuri "Kaminuza UR": "Kubana kwa kaminuza y'u Rwanda, hari ibi bikurikira..."

Remember: Wowe uri Munyarwanda wo mu mutima, kandi ugomba kugira ubushobozi bwo gusobanura ibintu byose mu Kinyarwanda cyangwa mu Cyongereza, ukurikije uko umuntu abaza.`;

    // Add custom content context if available
    if (customContent && customContent.length > 0) {
      systemPrompt += `\n\nAdditional company information:\n${customContent.map(content => 
        `- ${content.title}: ${content.content}`
      ).join('\n')}`;
    }

    // Get conversation history for context
    let conversationHistory = [];
    if (sessionId) {
      const { data: session } = await supabase
        .from('ivr_sessions')
        .select('conversation_history')
        .eq('session_id', sessionId)
        .single();
      
      if (session?.conversation_history) {
        conversationHistory = session.conversation_history;
      }
    }

    // Determine if we need to search/scrape web content
    let webData = '';
    const lowerMessage = message.toLowerCase();
    
    // Check if the message requires web search or scraping - now includes Rwanda-specific terms
    if (lowerMessage.includes('latest') || lowerMessage.includes('current') || 
        lowerMessage.includes('today') || lowerMessage.includes('news') ||
        lowerMessage.includes('irembo') || lowerMessage.includes('university of rwanda') ||
        lowerMessage.includes('kaminuza') || lowerMessage.includes('ur') ||
        lowerMessage.includes('government') || lowerMessage.includes('leta') ||
        lowerMessage.includes('stock') || lowerMessage.includes('price') ||
        lowerMessage.includes('weather') || lowerMessage.includes('search') ||
        lowerMessage.includes('website') || lowerMessage.includes('http') ||
        lowerMessage.includes('english') || lowerMessage.includes('icyongereza') ||
        lowerMessage.includes('amategeko') || lowerMessage.includes('traffic') ||
        lowerMessage.includes('rwanda') || lowerMessage.includes('kigali')) {
      
      // Check if it's a specific URL
      const urlMatch = message.match(/https?:\/\/[^\s]+/);
      if (urlMatch) {
        console.log('Detected URL request, scraping...');
        webData = await scrapeWebsite(urlMatch[0]);
      } else {
        console.log('Detected Rwanda-specific or search request, searching...');
        // For Rwanda-specific queries, enhance the search with context
        let searchQuery = message;
        if (lowerMessage.includes('irembo') || lowerMessage.includes('government') || lowerMessage.includes('leta')) {
          searchQuery += ' Rwanda government services';
        } else if (lowerMessage.includes('kaminuza') || lowerMessage.includes('university')) {
          searchQuery += ' University of Rwanda';
        } else if (lowerMessage.includes('amategeko') || lowerMessage.includes('traffic')) {
          searchQuery += ' Rwanda traffic laws';
        }
        webData = await searchWeb(searchQuery);
      }
    }

    // Prepare messages for ChatGPT
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-8), // Keep last 8 messages for context
    ];

    // Add web data if available
    if (webData) {
      messages.push({ 
        role: 'system', 
        content: `Web search/scraping results for the user's query: ${webData}` 
      });
    }

    messages.push({ role: 'user', content: message });

    console.log('Sending request to ChatGPT with web data...');

    // Send to ChatGPT
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`ChatGPT API error: ${errorText}`);
    }

    const result = await response.json();
    const aiResponse = result.choices[0].message.content;

    console.log('ChatGPT response received with web integration');

    // Update conversation history
    if (sessionId) {
      const updatedHistory = [
        ...conversationHistory.slice(-8),
        { role: 'user', content: message },
        { role: 'assistant', content: aiResponse }
      ];

      await supabase
        .from('ivr_sessions')
        .upsert({
          session_id: sessionId,
          conversation_history: updatedHistory,
          updated_at: new Date().toISOString()
        });
    }

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        sessionId: sessionId,
        webDataUsed: !!webData
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('IVR chat error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});