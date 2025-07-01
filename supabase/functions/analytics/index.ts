
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalyticsEvent {
  page_path: string;
  event_type: string;
  event_data?: any;
  session_id?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { page_path, event_type, event_data, session_id }: AnalyticsEvent = await req.json();

    // Get user agent and IP
    const user_agent = req.headers.get('user-agent');
    const forwarded = req.headers.get('x-forwarded-for');
    const ip_address = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip');

    // Get authenticated user if available
    const authHeader = req.headers.get('authorization');
    let user_id = null;
    
    if (authHeader) {
      const { data: { user } } = await supabaseClient.auth.getUser(authHeader.replace('Bearer ', ''));
      user_id = user?.id || null;
    }

    const { error } = await supabaseClient
      .from('analytics')
      .insert({
        page_path,
        event_type,
        event_data,
        session_id,
        user_id,
        user_agent,
        ip_address
      });

    if (error) {
      console.error('Analytics insertion error:', error);
      throw error;
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Analytics function error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
