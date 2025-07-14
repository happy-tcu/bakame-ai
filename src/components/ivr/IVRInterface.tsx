import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Phone, PhoneOff, Mic, MicOff, Volume2, Settings, Loader2, Wifi, WifiOff } from 'lucide-react';
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

// Audio utilities
class AudioRecorder {
  private stream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private processor: ScriptProcessorNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;

  constructor(private onAudioData: (audioData: Float32Array) => void) {}

  async start() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      this.audioContext = new AudioContext({
        sampleRate: 24000,
      });

      this.source = this.audioContext.createMediaStreamSource(this.stream);
      this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);
      
      this.processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        this.onAudioData(new Float32Array(inputData));
      };

      this.source.connect(this.processor);
      this.processor.connect(this.audioContext.destination);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      throw error;
    }
  }

  stop() {
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
    if (this.processor) {
      this.processor.disconnect();
      this.processor = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

// RealtimeChat class using WebRTC
class RealtimeChat {
  private pc: RTCPeerConnection | null = null;
  private dc: RTCDataChannel | null = null;
  private audioEl: HTMLAudioElement;
  private recorder: AudioRecorder | null = null;

  constructor(private onMessage: (message: any) => void) {
    this.audioEl = document.createElement("audio");
    this.audioEl.autoplay = true;
  }

  async init() {
    try {
      console.log('Getting ephemeral token...');
      // Get ephemeral token from our Supabase Edge Function
      const { data: tokenData, error: tokenError } = await supabase.functions.invoke("create-session");
      
      if (tokenError || !tokenData?.client_secret?.value) {
        console.error('Token error:', tokenError);
        throw new Error("Failed to get ephemeral token");
      }

      const EPHEMERAL_KEY = tokenData.client_secret.value;
      console.log('Got ephemeral token, setting up WebRTC...');

      // Create peer connection
      this.pc = new RTCPeerConnection();

      // Set up remote audio
      this.pc.ontrack = e => {
        console.log('Received remote audio track');
        this.audioEl.srcObject = e.streams[0];
      };

      // Add local audio track
      const ms = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.pc.addTrack(ms.getTracks()[0]);
      console.log('Added local audio track');

      // Set up data channel
      this.dc = this.pc.createDataChannel("oai-events");
      this.dc.addEventListener("message", (e) => {
        const event = JSON.parse(e.data);
        console.log("Received event:", event.type);
        this.onMessage(event);
      });

      // Create and set local description
      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);
      console.log('Created local offer');

      // Connect to OpenAI's Realtime API
      const baseUrl = "https://api.openai.com/v1/realtime";
      const model = "gpt-4o-realtime-preview-2024-12-17";
      console.log('Connecting to OpenAI Realtime API...');
      
      const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${EPHEMERAL_KEY}`,
          "Content-Type": "application/sdp"
        },
      });

      if (!sdpResponse.ok) {
        const errorText = await sdpResponse.text();
        console.error('SDP response error:', errorText);
        throw new Error(`Failed to connect to OpenAI: ${errorText}`);
      }

      const answer = {
        type: "answer" as RTCSdpType,
        sdp: await sdpResponse.text(),
      };
      
      await this.pc.setRemoteDescription(answer);
      console.log("WebRTC connection established");

      // Start recording
      this.recorder = new AudioRecorder((audioData) => {
        if (this.dc?.readyState === 'open') {
          this.dc.send(JSON.stringify({
            type: 'input_audio_buffer.append',
            audio: this.encodeAudioData(audioData)
          }));
        }
      });
      await this.recorder.start();
      console.log('Audio recording started');

    } catch (error) {
      console.error("Error initializing chat:", error);
      throw error;
    }
  }

  private encodeAudioData(float32Array: Float32Array): string {
    const int16Array = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    
    const uint8Array = new Uint8Array(int16Array.buffer);
    let binary = '';
    const chunkSize = 0x8000;
    
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.subarray(i, Math.min(i + chunkSize, uint8Array.length));
      binary += String.fromCharCode.apply(null, Array.from(chunk));
    }
    
    return btoa(binary);
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
    console.log('Disconnecting RealtimeChat...');
    this.recorder?.stop();
    this.dc?.close();
    this.pc?.close();
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
        setConnectionStatus('Session Ready');
        break;

      case 'session.updated':
        console.log('Session configured');
        setConnectionStatus('Ready to Talk');
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
      
      setIsConnected(true);
      setConnectionStatus('Connected');
      
      toast({
        title: "Connected",
        description: "Real-time conversation started!",
      });
    } catch (error) {
      console.error('Error starting conversation:', error);
      setConnectionStatus('Connection Failed');
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
          {!isConnected && (
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <h4 className="text-sm font-medium text-white/90 mb-2">Real-time AI Conversation:</h4>
              <ul className="text-xs text-white/70 space-y-1">
                <li>• Click "Start Real-time Chat" and allow microphone access</li>
                <li>• Speak naturally in Kinyarwanda or English</li>
                <li>• AI responds instantly with voice</li>
                <li>• No need to pause or click buttons - just talk!</li>
                <li>• AI automatically detects when you stop speaking</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IVRInterface;