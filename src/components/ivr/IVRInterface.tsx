import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
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

// Audio encoding for OpenAI API
const encodeAudioForAPI = (float32Array: Float32Array): string => {
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
};

// Create WAV from PCM data
const createWavFromPCM = (pcmData: Uint8Array): Uint8Array => {
  const int16Data = new Int16Array(pcmData.length / 2);
  for (let i = 0; i < pcmData.length; i += 2) {
    int16Data[i / 2] = (pcmData[i + 1] << 8) | pcmData[i];
  }
  
  const wavHeader = new ArrayBuffer(44);
  const view = new DataView(wavHeader);
  
  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const sampleRate = 24000;
  const numChannels = 1;
  const bitsPerSample = 16;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const byteRate = sampleRate * blockAlign;

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + int16Data.byteLength, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(view, 36, 'data');
  view.setUint32(40, int16Data.byteLength, true);

  const wavArray = new Uint8Array(wavHeader.byteLength + int16Data.byteLength);
  wavArray.set(new Uint8Array(wavHeader), 0);
  wavArray.set(new Uint8Array(int16Data.buffer), wavHeader.byteLength);
  
  return wavArray;
};

// Audio queue for sequential playback
class AudioQueue {
  private queue: Uint8Array[] = [];
  private isPlaying = false;
  private audioContext: AudioContext;

  constructor(audioContext: AudioContext) {
    this.audioContext = audioContext;
  }

  async addToQueue(audioData: Uint8Array) {
    console.log('Adding audio to queue, size:', audioData.length);
    this.queue.push(audioData);
    if (!this.isPlaying) {
      await this.playNext();
    }
  }

  private async playNext() {
    if (this.queue.length === 0) {
      this.isPlaying = false;
      return;
    }

    this.isPlaying = true;
    const audioData = this.queue.shift()!;

    try {
      const wavData = createWavFromPCM(audioData);
      const audioBuffer = await this.audioContext.decodeAudioData(wavData.buffer);
      
      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.audioContext.destination);
      
      source.onended = () => this.playNext();
      source.start(0);
    } catch (error) {
      console.error('Error playing audio:', error);
      this.playNext(); // Continue with next segment
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
  const wsRef = useRef<WebSocket | null>(null);
  const audioRecorderRef = useRef<AudioRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioQueueRef = useRef<AudioQueue | null>(null);
  const currentTranscriptRef = useRef<string>('');

  // Initialize audio context
  useEffect(() => {
    audioContextRef.current = new AudioContext({ sampleRate: 24000 });
    audioQueueRef.current = new AudioQueue(audioContextRef.current);
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playAudioData = async (audioData: Uint8Array) => {
    if (audioQueueRef.current) {
      await audioQueueRef.current.addToQueue(audioData);
    }
  };

  const handleAudioData = useCallback((audioData: Float32Array) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const base64Audio = encodeAudioForAPI(audioData);
      const event = {
        type: 'input_audio_buffer.append',
        audio: base64Audio
      };
      wsRef.current.send(JSON.stringify(event));
    }
  }, []);

  const startConnection = async () => {
    try {
      console.log('Starting WebSocket connection...');
      setConnectionStatus('Connecting...');
      
      // Connect to our edge function
      const ws = new WebSocket('wss://wzjorefhpnkjsjciyozh.functions.supabase.co/realtime-chat');
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setConnectionStatus('Connected');
        toast({
          title: "Connected",
          description: "Real-time conversation started!",
        });
      };

      ws.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        console.log('Received message type:', data.type);

        switch (data.type) {
          case 'session.created':
            console.log('Session created');
            setConnectionStatus('Session Ready');
            break;

          case 'session.updated':
            console.log('Session configured');
            setConnectionStatus('Ready to Talk');
            // Start audio recording
            startAudioRecording();
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
            if (data.delta) {
              setIsSpeaking(true);
              const binaryString = atob(data.delta);
              const bytes = new Uint8Array(binaryString.length);
              for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
              }
              await playAudioData(bytes);
            }
            break;

          case 'response.audio.done':
            console.log('Audio response completed');
            setIsSpeaking(false);
            break;

          case 'response.audio_transcript.delta':
            if (data.delta) {
              currentTranscriptRef.current += data.delta;
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
            if (data.transcript) {
              const userMessage: ConversationMessage = {
                role: 'user',
                content: data.transcript,
                timestamp: new Date()
              };
              setConversation(prev => [...prev, userMessage]);
            }
            break;

          case 'error':
            console.error('WebSocket error:', data.error);
            toast({
              title: "Connection Error",
              description: data.error,
              variant: "destructive",
            });
            break;
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionStatus('Connection Error');
        toast({
          title: "Connection Error",
          description: "Failed to connect to AI service",
          variant: "destructive",
        });
      };

      ws.onclose = () => {
        console.log('WebSocket closed');
        setIsConnected(false);
        setConnectionStatus('Disconnected');
        setIsRecording(false);
        setIsSpeaking(false);
        stopAudioRecording();
      };

    } catch (error) {
      console.error('Error starting connection:', error);
      setConnectionStatus('Connection Failed');
      toast({
        title: "Error",
        description: "Failed to start conversation",
        variant: "destructive",
      });
    }
  };

  const endConnection = () => {
    console.log('Ending connection...');
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    stopAudioRecording();
    setIsConnected(false);
    setConnectionStatus('Disconnected');
    setConversation([]);
    
    toast({
      title: "Disconnected",
      description: "Conversation ended",
    });
  };

  const startAudioRecording = async () => {
    try {
      console.log('Starting audio recording...');
      audioRecorderRef.current = new AudioRecorder(handleAudioData);
      await audioRecorderRef.current.start();
    } catch (error) {
      console.error('Error starting audio recording:', error);
      toast({
        title: "Microphone Error",
        description: "Please allow microphone access",
        variant: "destructive",
      });
    }
  };

  const stopAudioRecording = () => {
    if (audioRecorderRef.current) {
      audioRecorderRef.current.stop();
      audioRecorderRef.current = null;
    }
  };

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