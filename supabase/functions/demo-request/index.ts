
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DemoRequest {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  solution_type: string;
  message?: string;
  preferred_date?: string;
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

    const { name, email, company, phone, solution_type, message, preferred_date }: DemoRequest = await req.json();

    // Validate required fields
    if (!name || !email || !solution_type) {
      return new Response(
        JSON.stringify({ error: 'Name, email, and solution type are required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { error } = await supabaseClient
      .from('demo_requests')
      .insert({
        name,
        email,
        company,
        phone,
        solution_type,
        message,
        preferred_date: preferred_date ? new Date(preferred_date).toISOString() : null
      });

    if (error) {
      console.error('Demo request submission error:', error);
      throw error;
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Demo request submitted successfully! We\'ll contact you soon to schedule.' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Demo request function error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to submit demo request' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
