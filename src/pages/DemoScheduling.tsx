import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mic, MicOff, Volume2, Send, Loader2, Play, Pause } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

const DemoScheduling = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI English tutor. I'm here to help you practice speaking, pronunciation, vocabulary, and conversation skills. How would you like to practice today?",
      timestamp: new Date()
    }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMicClick = async () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setIsProcessing(true);
      
      // Simulate processing (will be replaced with actual ElevenLabs integration)
      setTimeout(() => {
        const newUserMessage: Message = {
          id: Date.now().toString(),
          role: 'user',
          content: "Hi! I'd like to practice pronunciation.",
          timestamp: new Date()
        };
        
        const newAssistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Great choice! Let's start with some common words that English learners find challenging. Could you please say the word 'thought' for me?",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, newUserMessage, newAssistantMessage]);
        setIsProcessing(false);
        
        toast({
          title: "Demo Mode",
          description: "This is a preview. Connect your ElevenLabs agent to enable real conversations.",
        });
      }, 2000);
    } else {
      // Start recording
      setIsRecording(true);
    }
  };

  const samplePrompts = [
    "Help me practice pronunciation",
    "Can you quiz me on vocabulary?",
    "Let's have a conversation about daily activities",
    "How do I pronounce 'schedule'?",
  ];

  const handlePromptClick = (prompt: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsProcessing(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses: { [key: string]: string } = {
        "Help me practice pronunciation": "Excellent! Pronunciation practice is so important. Let's start with some challenging sounds in English. Try saying 'th' as in 'think' - place your tongue between your teeth. Would you like to try that?",
        "Can you quiz me on vocabulary?": "I'd love to! Let's start with everyday vocabulary. Can you tell me what 'refrigerator' means? And try to use it in a sentence.",
        "Let's have a conversation about daily activities": "Perfect! Let's talk about your morning routine. Can you describe what you typically do when you wake up?",
        "How do I pronounce 'schedule'?": "Great question! In American English, it's pronounced 'SKED-jool', while in British English it's 'SHED-yool'. Try saying it: 'My schedule is busy today.' Give it a try!"
      };
      
      const responseContent = responses[prompt] || "That's a great topic! Let's practice together. Can you tell me more about what you'd like to learn?";
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Try Bakame AI Now
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Have a real conversation with your AI English tutor. Practice speaking, get instant feedback, and improve your pronunciation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="outline" className="border-primary/30 text-primary">
              <Volume2 className="w-3 h-3 mr-1" />
              Voice-powered
            </Badge>
            <Badge variant="outline" className="border-primary/30 text-primary">
              <Mic className="w-3 h-3 mr-1" />
              Instant feedback
            </Badge>
            <Badge variant="outline" className="border-primary/30 text-primary">
              Works offline
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border h-[600px] flex flex-col">
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground ml-12'
                            : 'bg-muted mr-12'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        {message.audioUrl && (
                          <button className="mt-2 flex items-center gap-2 text-xs opacity-70 hover:opacity-100">
                            <Volume2 className="w-3 h-3" />
                            Play audio
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-2xl px-4 py-3 mr-12">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm text-muted-foreground">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Voice Controls */}
                <div className="border-t border-border p-6">
                  <div className="flex flex-col items-center gap-4">
                    {/* Voice Visualizer (when recording) */}
                    {isRecording && (
                      <div className="flex items-center gap-1 h-12">
                        {[...Array(20)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-primary rounded-full animate-pulse"
                            style={{
                              height: `${Math.random() * 100}%`,
                              animationDelay: `${i * 0.05}s`,
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Microphone Button */}
                    <button
                      onClick={handleMicClick}
                      disabled={isProcessing}
                      className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isRecording
                          ? 'bg-red-500 hover:bg-red-600 scale-110 animate-pulse'
                          : 'bg-primary hover:bg-primary/90'
                      } ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                      data-testid="button-voice-record"
                    >
                      {isProcessing ? (
                        <Loader2 className="w-8 h-8 text-primary-foreground animate-spin" />
                      ) : isRecording ? (
                        <MicOff className="w-8 h-8 text-white" />
                      ) : (
                        <Mic className="w-8 h-8 text-primary-foreground" />
                      )}
                      
                      {isRecording && (
                        <span className="absolute -bottom-8 text-sm text-muted-foreground animate-pulse">
                          Listening...
                        </span>
                      )}
                    </button>

                    <p className="text-sm text-muted-foreground text-center">
                      {isRecording ? 'Click to stop recording' : 'Click the microphone to start speaking'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Sample Prompts & Info */}
          <div className="space-y-6">
            {/* Sample Prompts */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Try saying:</h3>
                <div className="space-y-2">
                  {samplePrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handlePromptClick(prompt)}
                      className="w-full text-left px-4 py-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm"
                      data-testid={`button-prompt-${index}`}
                    >
                      "{prompt}"
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">What You Can Practice</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Volume2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Pronunciation with instant feedback</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Mic className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Natural conversation practice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Send className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Vocabulary and grammar</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Like what you see?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Bring this AI-powered learning to your school or organization.
                </p>
                <Button 
                  onClick={() => navigate('/contact')} 
                  className="w-full"
                  variant="outline"
                >
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            This is a demo preview. To enable full voice conversations, connect your ElevenLabs agent.
            <button 
              onClick={() => navigate('/contact')}
              className="ml-2 text-primary hover:underline"
            >
              Learn more
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoScheduling;
