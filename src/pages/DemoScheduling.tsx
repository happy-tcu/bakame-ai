import { useState, useRef, useEffect } from "react";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { useToast } from "@/hooks/use-toast";

const DemoScheduling = () => {
  const [isActive, setIsActive] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const playbackAudioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const audioQueueRef = useRef<Float32Array[]>([]);
  const isPlayingRef = useRef(false);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (playbackAudioContextRef.current) {
        playbackAudioContextRef.current.close();
      }
    };
  }, []);

  const playAudioChunk = async (audioBase64: string) => {
    try {
      // Decode base64 to get raw PCM16 data
      const binaryString = atob(audioBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      // Convert PCM16 (Int16) to Float32
      const pcm16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(pcm16.length);
      for (let i = 0; i < pcm16.length; i++) {
        float32[i] = pcm16[i] / 32768.0; // Convert to -1.0 to 1.0 range
      }
      
      audioQueueRef.current.push(float32);
      
      if (!isPlayingRef.current) {
        playNextInQueue();
      }
    } catch (error) {
      console.error('Error queueing audio chunk:', error);
    }
  };

  const playNextInQueue = async () => {
    if (audioQueueRef.current.length === 0) {
      isPlayingRef.current = false;
      return;
    }

    isPlayingRef.current = true;
    const audioData = audioQueueRef.current.shift()!;
    
    try {
      // Create or reuse playback audio context
      if (!playbackAudioContextRef.current) {
        playbackAudioContextRef.current = new AudioContext({ sampleRate: 16000 });
      }
      
      const audioContext = playbackAudioContextRef.current;
      
      // Create audio buffer from raw PCM data
      const audioBuffer = audioContext.createBuffer(1, audioData.length, 16000);
      audioBuffer.getChannelData(0).set(audioData);
      
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      
      source.onended = () => {
        playNextInQueue();
      };
      
      source.start(0);
    } catch (error) {
      console.error('Error playing audio:', error);
      playNextInQueue();
    }
  };

  const startMicrophoneCapture = async (ws: WebSocket) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1,
          sampleRate: 8000,
          echoCancellation: true,
          noiseSuppression: true,
        } 
      });
      
      mediaStreamRef.current = stream;
      const audioContext = new AudioContext({ sampleRate: 8000 });
      audioContextRef.current = audioContext;
      
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(2048, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (e) => {
        if (ws.readyState !== WebSocket.OPEN) return;
        
        const inputData = e.inputBuffer.getChannelData(0);
        const pcm16 = new Int16Array(inputData.length);
        
        for (let i = 0; i < inputData.length; i++) {
          const s = Math.max(-1, Math.min(1, inputData[i]));
          pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }
        
        const audioBase64 = btoa(String.fromCharCode(...new Uint8Array(pcm16.buffer)));
        
        ws.send(JSON.stringify({
          user_audio_chunk: audioBase64
        }));
      };

      source.connect(processor);
      processor.connect(audioContext.destination);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone Error",
        description: "Failed to access microphone. Please grant permission and try again.",
        variant: "destructive",
      });
    }
  };

  const handleMicClick = async () => {
    if (isConnecting || isActive) return;
    
    setIsConnecting(true);
    setShowVideo(true);
    
    try {
      const response = await fetch('/api/elevenlabs/start-conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to start conversation' }));
        throw new Error(errorData.error || 'Failed to start conversation');
      }

      const data = await response.json();
      const { signedUrl } = data;

      const ws = new WebSocket(signedUrl);
      wsRef.current = ws;

      ws.onopen = async () => {
        console.log('Connected to ElevenLabs agent');
        
        ws.send(JSON.stringify({
          type: "conversation_initiation_client_data"
        }));
        
        await startMicrophoneCapture(ws);
        
        setIsActive(true);
        setIsConnecting(false);
      };

      ws.onmessage = async (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log('Received message type:', message.type);
          
          if (message.type === 'conversation_initiation_metadata') {
            console.log('Conversation started:', message.conversation_initiation_metadata_event);
          }
          
          if (message.type === 'audio') {
            const audioBase64 = message.audio_event.audio_base_64;
            await playAudioChunk(audioBase64);
          }
          
          if (message.type === 'user_transcript') {
            console.log('You said:', message.user_transcription_event.user_transcript);
          }
          
          if (message.type === 'agent_response') {
            console.log('Agent said:', message.agent_response_event.agent_response);
          }
          
          if (message.type === 'ping') {
            const eventId = message.ping_event.event_id;
            ws.send(JSON.stringify({
              type: 'pong',
              event_id: eventId
            }));
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        toast({
          title: "Connection Error",
          description: "Failed to connect to the AI tutor. Please try again.",
          variant: "destructive",
        });
        setIsActive(false);
        setIsConnecting(false);
      };

      ws.onclose = () => {
        console.log('Disconnected from ElevenLabs agent');
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach(track => track.stop());
        }
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
        setIsActive(false);
        setIsConnecting(false);
      };

    } catch (error: any) {
      console.error('Error starting conversation:', error);
      const errorMessage = error.message || "Failed to start conversation. Please check your API credentials.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      setIsConnecting(false);
      setShowVideo(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar />

      {/* YouTube Video Background with Fade In */}
      <div 
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
          showVideo ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <iframe
          className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
          src="https://www.youtube.com/embed/bVbRBLaTMpI?autoplay=1&mute=0&loop=1&playlist=bVbRBLaTMpI&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
          title="Background video"
          allow="autoplay; encrypted-media; microphone"
          style={{ pointerEvents: 'none' }}
        />
        {/* Dark overlay for better visibility */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Microphone Button */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <Button
          onClick={handleMicClick}
          disabled={isActive || isConnecting}
          className={`
            h-32 w-32 rounded-full 
            bg-white text-black 
            hover:bg-gray-200 
            transition-all duration-300 
            shadow-2xl
            ${isActive ? 'scale-110 animate-pulse' : 'scale-100'}
            ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          data-testid="button-microphone"
        >
          <Mic className="h-16 w-16" />
        </Button>
      </div>

      {/* Status indicators */}
      {isConnecting && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
            <p className="text-white text-sm font-medium">Connecting...</p>
          </div>
        </div>
      )}

      {isActive && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
            <p className="text-white text-sm font-medium flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              AI Tutor is listening...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoScheduling;
