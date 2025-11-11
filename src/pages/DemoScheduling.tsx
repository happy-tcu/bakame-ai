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
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

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

      ws.onopen = () => {
        console.log('Connected to ElevenLabs agent');
        setIsActive(true);
        setIsConnecting(false);
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log('Received from agent:', message);
          
          if (message.type === 'conversation_initiation_metadata') {
            console.log('Conversation started');
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
