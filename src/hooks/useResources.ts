
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  file_size: string;
  file_extension: string;
  file_url?: string;
  external_url?: string;
  download_count: number;
  is_featured: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export const useResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchResources = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch resources');
      toast({
        title: "Error",
        description: "Failed to load resources",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadResource = async (resourceId: string) => {
    try {
      // Track the download
      await supabase
        .from('resource_downloads')
        .insert({
          resource_id: resourceId,
          ip_address: null, // Will be handled by server
          user_agent: navigator.userAgent
        });

      // Update download count
      const { error } = await supabase
        .from('resources')
        .update({ download_count: supabase.raw('download_count + 1') })
        .eq('id', resourceId);

      if (error) throw error;

      // Refresh resources to show updated count
      fetchResources();

      toast({
        title: "Download Started",
        description: "Your download will begin shortly",
      });
    } catch (err) {
      toast({
        title: "Download Failed",
        description: "Failed to start download",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return {
    resources,
    loading,
    error,
    downloadResource,
    refetch: fetchResources
  };
};
