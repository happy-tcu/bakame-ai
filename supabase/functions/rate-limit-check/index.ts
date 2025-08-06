import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RateLimitRequest {
  action: string;
  limit: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { action, limit }: RateLimitRequest = await req.json();
    
    // Get real client IP from headers (works with most reverse proxies)
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                     req.headers.get('x-real-ip') || 
                     req.headers.get('cf-connecting-ip') || // Cloudflare
                     'unknown';
    
    const userAgent = req.headers.get('user-agent') || '';
    
    // Create a more robust identifier using server-side data
    const identifier = `${clientIP}-${userAgent}`.slice(0, 64);
    
    const windowMinutes = 15; // 15-minute window
    const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000);

    // Check current rate limit
    const { data: existingLimits, error: selectError } = await supabase
      .from('rate_limits')
      .select('count, window_start')
      .eq('identifier', identifier)
      .eq('action', action)
      .gte('window_start', windowStart.toISOString())
      .order('window_start', { ascending: false })
      .limit(1);

    if (selectError) {
      console.error('Rate limit check error:', selectError);
      return new Response(JSON.stringify({ allowed: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    const currentCount = existingLimits?.[0]?.count || 0;

    if (currentCount >= limit) {
      // Log security event for rate limit exceeded
      await supabase
        .from('security_events')
        .insert({
          event_type: 'rate_limit_exceeded',
          ip_address: clientIP,
          user_agent: userAgent,
          details: { 
            identifier, 
            action, 
            count: currentCount, 
            limit,
            window_minutes: windowMinutes 
          },
          severity: 'medium'
        });

      return new Response(JSON.stringify({ 
        allowed: false, 
        remaining: 0,
        resetTime: new Date(Date.now() + windowMinutes * 60 * 1000).toISOString()
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 429,
      });
    }

    // Update or insert rate limit record
    if (existingLimits && existingLimits.length > 0) {
      // Update existing record
      await supabase
        .from('rate_limits')
        .update({ count: currentCount + 1 })
        .eq('identifier', identifier)
        .eq('action', action)
        .gte('window_start', windowStart.toISOString());
    } else {
      // Insert new record
      await supabase
        .from('rate_limits')
        .insert({
          identifier,
          action,
          count: 1,
          window_start: new Date().toISOString()
        });
    }

    return new Response(JSON.stringify({ 
      allowed: true, 
      remaining: limit - currentCount - 1 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Rate limiting error:', error);
    return new Response(JSON.stringify({ 
      allowed: true, // Fail open for availability
      error: 'Rate limit check failed' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  }
});