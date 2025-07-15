import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Phone, PhoneOff, Mic, MicOff, Volume2, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface IVRInterfaceProps {
  className?: string;
}

// Simplified WebRTC RealtimeChat that works
class RealtimeChat {
  private pc: RTCPeerConnection | null = null;
  private dc: RTCDataChannel | null = null;
  private audioEl: HTMLAudioElement | null = null;

  constructor(private onMessage: (message: any) => void) {
    this.audioEl = document.createElement("audio");
    this.audioEl.autoplay = true;
  }

  async init() {
    try {
      console.log('Initializing WebRTC connection...');
      
      // Get ephemeral token from our edge function
      const response = await fetch('https://wzjorefhpnkjsjciyozh.functions.supabase.co/functions/v1/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Session response:', data);
      
      if (!data.client_secret?.value) {
        throw new Error("Failed to get ephemeral token");
      }

      const EPHEMERAL_KEY = data.client_secret.value;

      // Create peer connection
      this.pc = new RTCPeerConnection();

      // Set up remote audio
      this.pc.ontrack = e => {
        if (this.audioEl) {
          this.audioEl.srcObject = e.streams[0];
        }
      };

      // Add local audio track
      const ms = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.pc.addTrack(ms.getTracks()[0]);

      // Set up data channel
      this.dc = this.pc.createDataChannel("oai-events");
      this.dc.addEventListener("message", (e) => {
        try {
          const event = JSON.parse(e.data);
          console.log("Received event:", event.type);
          this.onMessage(event);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      });

      // Create and set local description
      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);

      // Connect to OpenAI's Realtime API
      const baseUrl = "https://api.openai.com/v1/realtime";
      const model = "gpt-4o-realtime-preview-2024-12-17";
      const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${EPHEMERAL_KEY}`,
          "Content-Type": "application/sdp"
        },
      });

      if (!sdpResponse.ok) {
        throw new Error(`OpenAI connection failed: ${sdpResponse.status}`);
      }

      const answer = {
        type: "answer" as RTCSdpType,
        sdp: await sdpResponse.text(),
      };
      
      await this.pc.setRemoteDescription(answer);
      console.log("WebRTC connection established");
      
      // Notify connection success
      this.onMessage({ type: 'session.created' });

    } catch (error) {
      console.error("Error initializing chat:", error);
      this.onMessage({ type: 'error', error: error.message });
      throw error;
    }
  }

  async sendMessage(text: string) {
    if (!this.dc || this.dc.readyState !== 'open') {
      throw new Error('Data channel not ready');
    }

    const event = {
      type: 'conversation.item.create',
      item: {
        type: 'message',
        role: 'user',
        content: [
          {
            type: 'input_text',
            text
          }
        ]
      }
    };

    this.dc.send(JSON.stringify(event));
    this.dc.send(JSON.stringify({type: 'response.create'}));
  }

  disconnect() {
    console.log('Disconnecting...');
    this.dc?.close();
    this.pc?.close();
    if (this.audioEl) {
      this.audioEl.srcObject = null;
    }
  }
}

const IVRInterface: React.FC<IVRInterfaceProps> = ({ className = '' }) => {
  const { toast } = useToast();
  
  // Core state
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<string>('Disconnected');

  // Refs
  const chatRef = useRef<RealtimeChat | null>(null);
  const currentTranscriptRef = useRef<string>('');

  const handleMessage = (event: any) => {
    console.log('Received message:', event.type);
    
    switch (event.type) {
      case 'session.created':
        console.log('Session created');
        setConnectionStatus('Ready to Talk');
        setIsConnected(true);
        break;

      case 'input_audio_buffer.speech_started':
        console.log('Speech started');
        setIsRecording(true);
        break;

      case 'input_audio_buffer.speech_stopped':
        console.log('Speech stopped');
        setIsRecording(false);
        break;

      case 'response.audio.delta':
        setIsSpeaking(true);
        break;

      case 'response.audio.done':
        console.log('Audio response completed');
        setIsSpeaking(false);
        break;

      case 'response.audio_transcript.delta':
        if (event.delta) {
          currentTranscriptRef.current += event.delta;
        }
        break;

      case 'response.audio_transcript.done':
        if (currentTranscriptRef.current) {
          const aiMessage: ConversationMessage = {
            role: 'assistant',
            content: currentTranscriptRef.current,
            timestamp: new Date()
          };
          setConversation(prev => [...prev, aiMessage]);
          currentTranscriptRef.current = '';
        }
        break;

      case 'conversation.item.input_audio_transcription.completed':
        if (event.transcript) {
          const userMessage: ConversationMessage = {
            role: 'user',
            content: event.transcript,
            timestamp: new Date()
          };
          setConversation(prev => [...prev, userMessage]);
        }
        break;

      case 'error':
        console.error('Realtime API error:', event.error);
        setConnectionStatus('Connection Failed');
        toast({
          title: "Connection Error",
          description: event.error,
          variant: "destructive",
        });
        break;
    }
  };

  const startConnection = async () => {
    try {
      console.log('Starting real-time conversation...');
      setConnectionStatus('Connecting...');
      
      chatRef.current = new RealtimeChat(handleMessage);
      await chatRef.current.init();
      
      toast({
        title: "Connected",
        description: "Real-time conversation started!",
      });
    } catch (error) {
      console.error('Error starting conversation:', error);
      setConnectionStatus('Connection Failed');
      setIsConnected(false);
      toast({
        title: "Connection Error",
        description: error instanceof Error ? error.message : 'Failed to start conversation',
        variant: "destructive",
      });
    }
  };

  const endConnection = () => {
    console.log('Ending connection...');
    chatRef.current?.disconnect();
    setIsConnected(false);
    setConnectionStatus('Disconnected');
    setIsRecording(false);
    setIsSpeaking(false);
    setConversation([]);
    
    toast({
      title: "Disconnected",
      description: "Conversation ended",
    });
  };

  useEffect(() => {
    return () => {
      chatRef.current?.disconnect();
    };
  }, []);

  const getStatusColor = () => {
    if (!isConnected) return 'bg-red-500';
    if (isSpeaking) return 'bg-blue-500 animate-pulse';
    if (isRecording) return 'bg-green-500 animate-pulse';
    return 'bg-green-500';
  };

  const getStatusIcon = () => {
    if (!isConnected) return <WifiOff className="w-4 h-4" />;
    return <Wifi className="w-4 h-4" />;
  };

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardContent className="p-8">
          {/* Connection Status */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
              {getStatusIcon()}
              <Badge variant="outline" className="border-white/30 text-white">
                {connectionStatus}
              </Badge>
            </div>
            
            {/* Main Call Button */}
            <div className="flex justify-center gap-4">
              {!isConnected ? (
                <Button 
                  onClick={startConnection}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full flex items-center gap-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  <Phone className="w-6 h-6" />
                  Start Real-time Chat
                </Button>
              ) : (
                <Button 
                  onClick={endConnection}
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full flex items-center gap-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  <PhoneOff className="w-6 h-6" />
                  End Chat
                </Button>
              )}
            </div>
          </div>

          {/* Activity Indicators */}
          {isConnected && (
            <div className="flex justify-center gap-6 mb-6">
              <div className={`flex items-center gap-2 ${isRecording ? 'text-green-400' : 'text-white/50'}`}>
                <Mic className={`w-5 h-5 ${isRecording ? 'animate-pulse' : ''}`} />
                <span className="text-sm">Listening</span>
              </div>
              
              <div className={`flex items-center gap-2 ${isSpeaking ? 'text-blue-400' : 'text-white/50'}`}>
                <Volume2 className={`w-5 h-5 ${isSpeaking ? 'animate-pulse' : ''}`} />
                <span className="text-sm">AI Speaking</span>
              </div>
            </div>
          )}

          {/* Conversation History */}
          {conversation.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-white/80 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Real-time Conversation
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {conversation.slice(-6).map((message, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-blue-500/20 border border-blue-500/30 ml-8' 
                        : 'bg-green-500/20 border border-green-500/30 mr-8'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-medium ${
                        message.role === 'user' ? 'text-blue-400' : 'text-green-400'
                      }`}>
                        {message.role === 'user' ? 'You' : 'Bakame AI'}
                      </span>
                      <span className="text-xs text-white/50">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-white/90">{message.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IVRInterface;