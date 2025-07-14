import React, { useState, useRef, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Phone, PhoneOff, Mic, MicOff, Volume2, Settings, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface IVRInterfaceProps {
  className?: string;
}

const IVRInterface: React.FC<IVRInterfaceProps> = ({ className = '' }) => {
  const { toast } = useToast();
  
  // Core state
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [sessionId, setSessionId] = useState<string>('');
  const [isWaitingForSpeech, setIsWaitingForSpeech] = useState(false);
  const [voiceId, setVoiceId] = useState('default');

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Voice options
  const voiceOptions = [
    { value: 'default', label: 'Arnold (Rwandan Male)', description: 'Default Rwandan voice' },
    { value: 'rwandan_female', label: 'Sarah (Rwandan Female)', description: 'Clear, friendly voice' },
    { value: 'professional', label: 'Adam (Professional)', description: 'Neutral professional voice' },
    { value: 'warm', label: 'Liam (Warm)', description: 'Warm, approachable voice' }
  ];

  const generateSessionId = () => {
    return 'ivr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  const clearSilenceTimer = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  };

  const startSilenceTimer = () => {
    clearSilenceTimer();
    silenceTimerRef.current = setTimeout(() => {
      console.log('Silence detected, stopping recording');
      stopRecording();
    }, 4000); // 4 seconds of silence
  };

  const startCall = async () => {
    try {
      console.log('Starting IVR call...');
      const newSessionId = generateSessionId();
      setSessionId(newSessionId);
      setIsCallActive(true);
      setConversation([]);
      
      // Create IVR session
      const { error: sessionError } = await supabase.from('ivr_sessions').insert({
        session_id: newSessionId,
        status: 'active'
      });

      if (sessionError) {
        console.error('Session creation error:', sessionError);
      }

      toast({
        title: "Call Started",
        description: "You can now speak to the AI assistant",
      });

      // Start with welcome message
      const welcomeMessage = "Muraho! Welcome to Bakame AI. I can help you learn English, navigate Irembo government services, or answer questions about Rwanda. How can I assist you today? Mpigire icyo nshobora kugufasha!";
      
      const welcomeMsg: ConversationMessage = {
        role: 'assistant',
        content: welcomeMessage,
        timestamp: new Date()
      };
      
      setConversation([welcomeMsg]);
      await speakText(welcomeMessage, true);
      
    } catch (error) {
      console.error('Error starting call:', error);
      toast({
        title: "Error",
        description: "Failed to start call",
        variant: "destructive",
      });
    }
  };

  const endCall = async () => {
    try {
      console.log('Ending IVR call...');
      setIsCallActive(false);
      setIsRecording(false);
      setIsProcessing(false);
      setIsSpeaking(false);
      setIsWaitingForSpeech(false);
      clearSilenceTimer();
      cleanupRecording();
      
      if (sessionId) {
        // Convert conversation to JSON-compatible format
        const conversationJson = conversation.map(msg => ({
          role: msg.role,
          content: msg.content,
          timestamp: msg.timestamp.toISOString()
        }));
        
        await supabase
          .from('ivr_sessions')
          .update({
            status: 'completed',
            ended_at: new Date().toISOString(),
            duration_seconds: Math.floor((new Date().getTime() - parseInt(sessionId.split('_')[1])) / 1000),
            conversation_history: conversationJson
          })
          .eq('session_id', sessionId);
      }
      
      setConversation([]);
      setSessionId('');
      
      toast({
        title: "Call Ended",
        description: "Thank you for using Bakame AI",
      });
      
    } catch (error) {
      console.error('Error ending call:', error);
    }
  };

  const cleanupRecording = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current = null;
    }
    audioChunksRef.current = [];
  };

  const startRecording = async () => {
    try {
      setIsWaitingForSpeech(true);
      console.log('Starting audio recording...');
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        } 
      });
      
      mediaStreamRef.current = stream;
      audioChunksRef.current = [];
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = async () => {
        console.log('MediaRecorder stopped, processing audio...');
        setIsRecording(false);
        setIsWaitingForSpeech(false);
        
        if (audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          await processAudio(audioBlob);
        }
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      startSilenceTimer();
      
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsWaitingForSpeech(false);
      toast({
        title: "Microphone Error",
        description: "Please allow microphone access to use voice features",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    console.log('Stopping recording...');
    clearSilenceTimer();
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    try {
      setIsProcessing(true);
      console.log('Processing audio blob, size:', audioBlob.size);
      
      // Convert to base64
      const audioBase64 = await blobToBase64(audioBlob);
      console.log('Audio converted to base64, length:', audioBase64.length);
      
      // Send to voice-to-text
      const { data: transcriptData, error: transcriptError } = await supabase.functions
        .invoke('voice-to-text', {
          body: { audio: audioBase64 }
        });

      console.log('Voice-to-text response:', { transcriptData, transcriptError });

      if (transcriptError) {
        throw new Error(`Transcription failed: ${transcriptError.message || 'Unknown error'}`);
      }

      const userText = transcriptData.text;
      
      if (!userText || userText.trim().length < 2) {
        console.log('No meaningful speech detected, restarting recording');
        if (isCallActive) {
          setTimeout(() => startRecording(), 500);
        }
        return;
      }

      console.log('User said:', userText);
      
      // Add user message to conversation
      const userMessage: ConversationMessage = {
        role: 'user',
        content: userText,
        timestamp: new Date()
      };
      
      setConversation(prev => [...prev, userMessage]);

      // Send to IVR chat
      const { data: chatData, error: chatError } = await supabase.functions
        .invoke('ivr-chat', {
          body: {
            message: userText,
            sessionId: sessionId
          }
        });

      if (chatError) {
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

      // Convert to speech and play
      await speakText(aiResponse, true);
      
    } catch (error) {
      console.error('Error processing audio:', error);
      toast({
        title: "Processing Error",
        description: "Failed to process your speech. Please try again.",
        variant: "destructive",
      });
      
      // Restart recording on error
      if (isCallActive) {
        setTimeout(() => startRecording(), 1000);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const speakText = async (text: string, shouldContinueRecording = false) => {
    try {
      setIsSpeaking(true);
      
      console.log('Generating speech with voice:', voiceId);
      const { data: speechData, error: speechError } = await supabase.functions
        .invoke('text-to-speech', {
          body: { 
            text,
            voice: voiceId
          }
        });

      if (speechError) {
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
          
          // Auto-start recording after AI finishes speaking
          if (shouldContinueRecording && isCallActive && !isProcessing) {
            console.log('AI finished speaking, starting recording...');
            setTimeout(() => {
              startRecording();
            }, 500);
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
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // Remove data:audio/webm;base64, prefix
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const base64ToBlob = (base64: string, mimeType: string): Blob => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearSilenceTimer();
      cleanupRecording();
    };
  }, []);

  const getCallStatus = () => {
    if (!isCallActive) return 'Disconnected';
    if (isSpeaking) return 'AI Speaking';
    if (isProcessing) return 'Processing';
    if (isRecording) return 'Listening';
    if (isWaitingForSpeech) return 'Ready to Listen';
    return 'Connected';
  };

  const getStatusColor = () => {
    if (!isCallActive) return 'bg-red-500';
    if (isSpeaking) return 'bg-blue-500';
    if (isProcessing) return 'bg-yellow-500';
    if (isRecording) return 'bg-green-500 animate-pulse';
    return 'bg-gray-500';
  };

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardContent className="p-8">
          {/* Voice Settings */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Voice Settings</span>
            </div>
            <Select value={voiceId} onValueChange={setVoiceId} disabled={isCallActive}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                {voiceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-white">
                    <div className="flex flex-col">
                      <span>{option.label}</span>
                      <span className="text-xs text-gray-400">{option.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Call Status */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
              <Badge variant="outline" className="border-white/30 text-white">
                {getCallStatus()}
              </Badge>
            </div>
            
            {/* Main Call Button */}
            <div className="flex justify-center gap-4">
              {!isCallActive ? (
                <Button 
                  onClick={startCall}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full flex items-center gap-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  <Phone className="w-6 h-6" />
                  Start Call
                </Button>
              ) : (
                <Button 
                  onClick={endCall}
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full flex items-center gap-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  <PhoneOff className="w-6 h-6" />
                  End Call
                </Button>
              )}
            </div>
          </div>

          {/* Activity Indicators */}
          {isCallActive && (
            <div className="flex justify-center gap-6 mb-6">
              <div className={`flex items-center gap-2 ${isRecording ? 'text-green-400' : 'text-white/50'}`}>
                <Mic className={`w-5 h-5 ${isRecording ? 'animate-pulse' : ''}`} />
                <span className="text-sm">Microphone</span>
              </div>
              
              <div className={`flex items-center gap-2 ${isSpeaking ? 'text-blue-400' : 'text-white/50'}`}>
                <Volume2 className={`w-5 h-5 ${isSpeaking ? 'animate-pulse' : ''}`} />
                <span className="text-sm">Speaker</span>
              </div>
              
              <div className={`flex items-center gap-2 ${isProcessing ? 'text-yellow-400' : 'text-white/50'}`}>
                <Loader2 className={`w-5 h-5 ${isProcessing ? 'animate-spin' : ''}`} />
                <span className="text-sm">Processing</span>
              </div>
            </div>
          )}

          {/* Conversation History */}
          {conversation.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-white/80 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Conversation
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {conversation.slice(-6).map((message, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-blue-500/20 border border-blue-500/30 ml-8' 
                        : 'bg-purple-500/20 border border-purple-500/30 mr-8'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className={`text-xs ${
                        message.role === 'user' ? 'border-blue-400 text-blue-400' : 'border-purple-400 text-purple-400'
                      }`}>
                        {message.role === 'user' ? 'You' : 'AI'}
                      </Badge>
                      <span className="text-xs text-white/60">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-white/90">{message.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          {!isCallActive && (
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <h4 className="text-sm font-medium text-white/90 mb-2">How to use:</h4>
              <ul className="text-xs text-white/70 space-y-1">
                <li>1. Choose your preferred voice</li>
                <li>2. Click "Start Call" and allow microphone access</li>
                <li>3. Speak naturally in Kinyarwanda or English</li>
                <li>4. Wait for the AI to respond</li>
                <li>5. Continue the conversation naturally</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Hidden audio element for playback */}
      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  );
};

export default IVRInterface;