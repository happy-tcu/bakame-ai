
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WaitlistSignup {
  email: string;
  name?: string;
  company?: string;
  solution_interest?: string;
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

    const { email, name, company, solution_interest }: WaitlistSignup = await req.json();

    // Validate required fields
    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { error } = await supabaseClient
      .from('waitlist')
      .insert({
        email,
        name,
        company,
        solution_interest
      });

    if (error) {
      // Handle unique constraint violation for duplicate emails
      if (error.code === '23505') {
        return new Response(
          JSON.stringify({ error: 'Email already registered on waitlist' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      console.error('Waitlist submission error:', error);
      throw error;
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Successfully joined the waitlist! We\'ll notify you when we launch.' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Waitlist function error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to join waitlist' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
