
import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChat } from '@/utils/RealtimeChat';

export type IVRMode = 'webrtc' | 'websocket' | 'http';

export interface IVRMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'vocabulary' | 'grammar' | 'conversation' | 'general';
}

export interface IVRSession {
  sessionId: string;
  mode: IVRMode;
  status: 'connecting' | 'connected' | 'disconnected' | 'error';
  messages: IVRMessage[];
}

export const useIVRClient = () => {
  const [session, setSession] = useState<IVRSession | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [lastErrorTime, setLastErrorTime] = useState<number | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const rtcRef = useRef<RealtimeChat | null>(null);

  // Circuit breaker pattern to prevent cascading failures
  const MAX_ERRORS = 3;
  const ERROR_RESET_TIME = 60000; // 1 minute

  const isCircuitBroken = () => {
    if (errorCount >= MAX_ERRORS) {
      const now = Date.now();
      if (lastErrorTime && now - lastErrorTime < ERROR_RESET_TIME) {
        return true;
      } else {
        // Reset circuit breaker
        setErrorCount(0);
        setLastErrorTime(null);
        return false;
      }
    }
    return false;
  };

  const recordError = () => {
    setErrorCount(prev => prev + 1);
    setLastErrorTime(Date.now());
  };

  const generateSessionId = () => `ivr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const startSession = useCallback(async (mode: IVRMode) => {
    const sessionId = generateSessionId();
    
    setSession({
      sessionId,
      mode,
      status: 'connecting',
      messages: []
    });

    try {
      switch (mode) {
        case 'webrtc':
          await startWebRTCSession(sessionId);
          break;
        case 'websocket':
          await startWebSocketSession(sessionId);
          break;
        case 'http':
          await startHTTPSession(sessionId);
          break;
      }
    } catch (error) {
      console.error('Failed to start IVR session:', error);
      setSession(prev => prev ? { ...prev, status: 'error' } : null);
    }
  }, []);

  const startWebRTCSession = async (sessionId: string) => {
    const rtcClient = new RealtimeChat((event: any) => {
      handleRealtimeMessage(event);
    });

    await rtcClient.init();
    rtcRef.current = rtcClient;
    
    setSession(prev => prev ? { ...prev, status: 'connected' } : null);
  };

  const startWebSocketSession = async (sessionId: string) => {
    const wsUrl = `wss://wzjorefhpnkjsjciyozh.functions.supabase.co/realtime-chat`;
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      console.log('WebSocket connected');
      setSession(prev => prev ? { ...prev, status: 'connected' } : null);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleRealtimeMessage(data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setSession(prev => prev ? { ...prev, status: 'error' } : null);
    };

    wsRef.current = ws;
  };

  const startHTTPSession = async (sessionId: string) => {
    // HTTP mode uses the bakame-llama-chat edge function with Groq Llama model
    setSession(prev => prev ? { ...prev, status: 'connected' } : null);
  };

  const handleRealtimeMessage = (event: any) => {
    switch (event.type) {
      case 'session.created':
        setSession(prev => prev ? { ...prev, status: 'connected' } : null);
        break;
      case 'input_audio_buffer.speech_started':
        setIsRecording(true);
        break;
      case 'input_audio_buffer.speech_stopped':
        setIsRecording(false);
        break;
      case 'response.audio.delta':
        setIsSpeaking(true);
        break;
      case 'response.audio.done':
        setIsSpeaking(false);
        break;
      case 'response.audio_transcript.done':
        if (event.transcript) {
          addMessage({
            role: 'assistant',
            content: event.transcript,
            timestamp: new Date(),
            type: detectMessageType(event.transcript)
          });
        }
        break;
      case 'conversation.item.input_audio_transcription.completed':
        if (event.transcript) {
          addMessage({
            role: 'user',
            content: event.transcript,
            timestamp: new Date()
          });
        }
        break;
    }
  };

  const sendMessage = useCallback(async (content: string) => {
    if (!session) return;

    // Check circuit breaker
    if (isCircuitBroken()) {
      console.warn('Circuit breaker is open, skipping message send');
      addMessage({
        role: 'assistant',
        content: 'I\'m experiencing some technical difficulties. Please wait a moment before trying again.',
        timestamp: new Date(),
        type: 'general'
      });
      return;
    }

    const userMessage: IVRMessage = {
      role: 'user',
      content,
      timestamp: new Date()
    };

    addMessage(userMessage);

    try {
      switch (session.mode) {
        case 'webrtc':
          if (rtcRef.current) {
            await rtcRef.current.sendMessage(content);
          }
          break;
        case 'websocket':
          if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({
              type: 'conversation.item.create',
              item: {
                type: 'message',
                role: 'user',
                content: [{ type: 'input_text', text: content }]
              }
            }));
          }
          break;
        case 'http':
          // Build conversation history for context
          const conversationMessages = session.messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }));
          
          const { data, error } = await supabase.functions.invoke('bakame-llama-chat', {
            body: {
              messages: conversationMessages,
              subject: 'english' // Since IVR is focused on English learning
            }
          });

          if (error) {
            throw new Error(`Function error: ${error.message}`);
          }
          
          if (data?.response) {
            addMessage({
              role: 'assistant',
              content: data.response,
              timestamp: new Date(),
              type: detectMessageType(data.response)
            });
            // Reset error count on success
            setErrorCount(0);
            setLastErrorTime(null);
          } else if (data?.error) {
            throw new Error(data.error);
          } else {
            throw new Error('No response received from AI');
          }
          break;
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      recordError();
      
      // Add user-friendly error message
      addMessage({
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble processing your request right now. Please try again in a moment.',
        timestamp: new Date(),
        type: 'general'
      });
    }
  }, [session, isCircuitBroken, recordError]);

  const addMessage = (message: IVRMessage) => {
    setSession(prev => prev ? {
      ...prev,
      messages: [...prev.messages, message]
    } : null);
  };

  const detectMessageType = (content: string): 'vocabulary' | 'grammar' | 'conversation' | 'general' => {
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes('word') || lowerContent.includes('vocabulary') || lowerContent.includes('meaning')) {
      return 'vocabulary';
    } else if (lowerContent.includes('grammar') || lowerContent.includes('tense') || lowerContent.includes('rule')) {
      return 'grammar';
    } else if (lowerContent.includes('practice') || lowerContent.includes('conversation') || lowerContent.includes('interview')) {
      return 'conversation';
    }
    return 'general';
  };

  const endSession = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (rtcRef.current) {
      rtcRef.current.disconnect();
      rtcRef.current = null;
    }
    
    setSession(prev => prev ? { ...prev, status: 'disconnected' } : null);
    setIsRecording(false);
    setIsSpeaking(false);
  }, []);

  return {
    session,
    isRecording,
    isSpeaking,
    startSession,
    sendMessage,
    endSession
  };
};
