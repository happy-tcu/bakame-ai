
import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface DevinSession {
  sessionId: string;
  status: 'connecting' | 'connected' | 'disconnected' | 'error';
  devinEndpoint?: string;
  lastSync?: Date;
}

export const useDevinIntegration = () => {
  const [devinSession, setDevinSession] = useState<DevinSession | null>(null);
  const syncIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const connectToDevin = useCallback(async (devinEndpoint: string) => {
    console.log('Connecting to Devin infrastructure:', devinEndpoint);
    
    const sessionId = `devin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    setDevinSession({
      sessionId,
      status: 'connecting',
      devinEndpoint
    });

    try {
      // Test connection to Devin infrastructure
      const response = await fetch(`${devinEndpoint}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        setDevinSession(prev => prev ? { ...prev, status: 'connected', lastSync: new Date() } : null);
        
        // Start sync with Devin
        startDevinSync(devinEndpoint, sessionId);
        
        return { success: true, sessionId };
      } else {
        throw new Error('Failed to connect to Devin infrastructure');
      }
    } catch (error) {
      console.error('Devin connection error:', error);
      setDevinSession(prev => prev ? { ...prev, status: 'error' } : null);
      return { success: false, error: error.message };
    }
  }, []);

  const startDevinSync = (endpoint: string, sessionId: string) => {
    // Sync every 30 seconds
    syncIntervalRef.current = setInterval(async () => {
      try {
        const response = await fetch(`${endpoint}/sync`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId })
        });

        if (response.ok) {
          setDevinSession(prev => prev ? { ...prev, lastSync: new Date() } : null);
        }
      } catch (error) {
        console.error('Devin sync error:', error);
      }
    }, 30000);
  };

  const syncConversationToDevin = useCallback(async (messages: any[]) => {
    if (!devinSession || devinSession.status !== 'connected') return;

    try {
      const response = await fetch(`${devinSession.devinEndpoint}/conversations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: devinSession.sessionId,
          messages,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        console.log('Conversation synced to Devin successfully');
        return { success: true };
      } else {
        throw new Error('Failed to sync conversation');
      }
    } catch (error) {
      console.error('Devin sync error:', error);
      return { success: false, error: error.message };
    }
  }, [devinSession]);

  const disconnectFromDevin = useCallback(() => {
    if (syncIntervalRef.current) {
      clearInterval(syncIntervalRef.current);
      syncIntervalRef.current = null;
    }
    
    setDevinSession(prev => prev ? { ...prev, status: 'disconnected' } : null);
  }, []);

  return {
    devinSession,
    connectToDevin,
    syncConversationToDevin,
    disconnectFromDevin
  };
};
