import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Phone, PhoneOff, Volume2, Mic } from 'lucide-react';

interface IVRInterfaceProps {
  className?: string;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const IVRInterface: React.FC<IVRInterfaceProps> = ({ className = '' }) => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [sessionId, setSessionId] = useState<string>('');
  const [silenceTimer, setSilenceTimer] = useState<NodeJS.Timeout | null>(null);
  const [isWaitingForSpeech, setIsWaitingForSpeech] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Generate session ID function
  const generateSessionId = () => {
    return `ivr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Clear any existing silence timer
  const clearSilenceTimer = useCallback(() => {
    if (silenceTimer) {
      clearTimeout(silenceTimer);
      setSilenceTimer(null);
    }
  }, [silenceTimer]);

  // Start silence timer for automatic processing
  const startSilenceTimer = useCallback(() => {
    clearSilenceTimer();
    console.log('Starting 4-second silence timer...');
    const timer = setTimeout(() => {
      console.log('4 seconds of silence detected, processing audio...');
      if (isRecording && mediaRecorderRef.current) {
        stopRecording();
      }
    }, 4000); // 4 seconds
    setSilenceTimer(timer);
  }, [isRecording, clearSilenceTimer]);

  const startCall = async () => {
    try {
      console.log('Starting IVR call...');
      // Generate a new session ID for each call to avoid conflicts
      const newSessionId = generateSessionId();
      console.log('Generated session ID:', newSessionId);
      setSessionId(newSessionId);
      setIsCallActive(true);
      
      // Create IVR session
      const { error: sessionError } = await supabase.from('ivr_sessions').insert({
        session_id: newSessionId,
        status: 'active'
      });

      if (sessionError) {
        console.error('Session creation error:', sessionError);
        // Don't fail the call if session creation fails
      }

      toast({
        title: "Call Connected",
        description: "You are now connected to Bakame AI. Start speaking!",
      });

      // Add welcome message
      const welcomeMessage: ConversationMessage = {
        role: 'assistant',
        content: "Hello! Welcome to Bakame AI. How can I help you today?",
        timestamp: new Date()
      };
      
      setConversation([welcomeMessage]);
      
      // Speak welcome message and start recording immediately after
      await speakText(welcomeMessage.content, true);
      
    } catch (error) {
      console.error('Error starting call:', error);
      toast({
        title: "Error",
        description: "Failed to start call. Please try again.",
        variant: "destructive",
      });
    }
  };

  const endCall = async () => {
    try {
      stopRecording();
      cleanupRecording();
      setIsCallActive(false);
      setConversation([]);
      clearSilenceTimer();
      setIsWaitingForSpeech(false);
      
      // End IVR session
      if (sessionId) {
        const { error: updateError } = await supabase.from('ivr_sessions')
          .update({ 
            status: 'completed',
            ended_at: new Date().toISOString()
          })
          .eq('session_id', sessionId);

        if (updateError) {
          console.error('Session update error:', updateError);
        }
      }

      toast({
        title: "Call Ended",
        description: "Thank you for using Bakame AI IVR system.",
      });
      
    } catch (error) {
      console.error('Error ending call:', error);
    }
  };

  const cleanupRecording = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const startRecording = async () => {
    try {
      console.log('Starting continuous recording...');
      
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 44100,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        }
      });

      streamRef.current = stream;
      
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
          console.log('Audio data received, restarting silence timer...');
          startSilenceTimer(); // Reset timer when we receive audio data
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        console.log('Recording stopped, processing audio...');
        clearSilenceTimer();
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        if (audioBlob.size > 0) {
          await processAudio(audioBlob);
        }
      };

      // Start recording with data interval
      mediaRecorderRef.current.start(1000); // Collect data every second for silence detection
      setIsRecording(true);
      setIsWaitingForSpeech(true);
      
      // Start initial silence timer
      startSilenceTimer();
      
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Error",
        description: "Failed to access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      clearSilenceTimer();
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsWaitingForSpeech(false);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    console.log('Processing audio with session:', sessionId);
    
    try {
      // Convert audio to base64
      const base64Audio = await blobToBase64(audioBlob);
      console.log('Audio converted to base64, length:', base64Audio.length);
      
      // Send to voice-to-text with better error handling
      console.log('Sending audio to voice-to-text...');
      const { data: transcriptionData, error: transcriptionError } = await supabase.functions
        .invoke('voice-to-text', {
          body: { audio: base64Audio }
        });

      console.log('Voice-to-text response:', { transcriptionData, transcriptionError });

      if (transcriptionError) {
        console.error('Transcription error details:', transcriptionError);
        throw new Error(`Transcription failed: ${transcriptionError.message || 'Unknown error'}`);
      }

      const userText = transcriptionData.text;
      
      if (!userText.trim()) {
        console.log('No speech detected, continuing to listen...');
        // Restart recording if no speech was detected
        if (isCallActive && !isSpeaking) {
          setTimeout(() => startRecording(), 500);
        }
        return;
      }

      // Add user message to conversation
      const userMessage: ConversationMessage = {
        role: 'user',
        content: userText,
        timestamp: new Date()
      };
      
      setConversation(prev => [...prev, userMessage]);

      // Send to ChatGPT with better error handling
      console.log('Sending message to IVR chat...');
      const { data: chatData, error: chatError } = await supabase.functions
        .invoke('ivr-chat', {
          body: { 
            message: userText,
            sessionId: sessionId
          }
        });

      console.log('IVR chat response:', { chatData, chatError });

      if (chatError) {
        console.error('Chat error details:', chatError);
        throw new Error(`Chat failed: ${chatError.message || 'Unknown error'}`);
      }

      const aiResponse = chatData.response;
      
      // Add AI response to conversation
      const aiMessage: ConversationMessage = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setConversation(prev => [...prev, aiMessage]);

      // Convert to speech and play, then restart recording
      console.log('AI Response received, converting to speech:', aiResponse);
      await speakText(aiResponse, true);
      
    } catch (error) {
      console.error('Error processing audio:', error);
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      toast({
        title: "Processing Error",
        description: error instanceof Error ? error.message : "Failed to process your message",
        variant: "destructive",
      });
      
      // Restart recording even if there was an error
      if (isCallActive && !isSpeaking) {
        setTimeout(() => startRecording(), 1000);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const speakText = async (text: string, shouldContinueRecording = false) => {
    try {
      setIsSpeaking(true);
      
      console.log('Generating speech...');
      const { data: speechData, error: speechError } = await supabase.functions
        .invoke('text-to-speech', {
          body: { text }
        });

      console.log('Text-to-speech response:', { speechData, speechError });

      if (speechError) {
        console.error('Speech error details:', speechError);
        throw new Error(`Speech generation failed: ${speechError.message || 'Unknown error'}`);
      }

      // Play audio
      const audioBlob = base64ToBlob(speechData.audioContent, 'audio/mp3');
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(audioUrl);
          
          // Auto-start recording after AI finishes speaking (like a real phone call)
          if (shouldContinueRecording && isCallActive && !isProcessing) {
            console.log('AI finished speaking, starting recording...');
            setTimeout(() => {
              startRecording();
            }, 500); // Small delay to ensure audio has fully stopped
          }
        };
        await audioRef.current.play();
      }
      
    } catch (error) {
      console.error('Error speaking text:', error);
      setIsSpeaking(false);
      
      // Start recording even if speech generation failed
      if (shouldContinueRecording && isCallActive && !isProcessing) {
        setTimeout(() => startRecording(), 500);
      }
    }
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.readAsDataURL(blob);
    });
  };

  const base64ToBlob = (base64: string, mimeType: string): Blob => {
    const bytes = atob(base64);
    const array = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
      array[i] = bytes.charCodeAt(i);
    }
    return new Blob([array], { type: mimeType });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearSilenceTimer();
      cleanupRecording();
    };
  }, [clearSilenceTimer]);

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <audio ref={audioRef} className="hidden" />
      
      <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Phone className="h-6 w-6" />
            Bakame AI IVR System
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Call Controls */}
          <div className="flex justify-center gap-4">
            {!isCallActive ? (
              <Button
                onClick={startCall}
                className="bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                <Phone className="h-5 w-5 mr-2" />
                Start Call
              </Button>
            ) : (
              <Button
                onClick={endCall}
                variant="destructive"
                size="lg"
              >
                <PhoneOff className="h-5 w-5 mr-2" />
                End Call
              </Button>
            )}
          </div>

          {/* Call Status Indicator */}
          {isCallActive && (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${
                  isRecording ? 'bg-red-500 animate-pulse' : 
                  isSpeaking ? 'bg-blue-500 animate-pulse' :
                  isProcessing ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'
                }`} />
                <Mic className={`h-6 w-6 ${isRecording ? 'text-red-500' : 'text-muted-foreground'}`} />
              </div>
              
              <div className="text-center">
                {isProcessing && (
                  <p className="text-sm text-muted-foreground">Processing your message...</p>
                )}
                {isSpeaking && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Volume2 className="h-4 w-4" />
                    AI is speaking...
                  </div>
                )}
                {isRecording && (
                  <p className="text-sm text-red-600">
                    🎤 Listening... (will auto-process after 4 seconds of silence)
                  </p>
                )}
                {isWaitingForSpeech && !isRecording && !isProcessing && !isSpeaking && (
                  <p className="text-sm text-muted-foreground">
                    Waiting for you to speak...
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Conversation History */}
          {conversation.length > 0 && (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              <h3 className="text-lg font-semibold">Call Transcript</h3>
              {conversation.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg animate-fade-in ${
                    message.role === 'user'
                      ? 'bg-primary/10 ml-8'
                      : 'bg-muted mr-8'
                  }`}
                >
                  <p className="text-sm font-medium mb-1">
                    {message.role === 'user' ? '🗣️ You' : '🤖 AI Assistant'}
                  </p>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IVRInterface;