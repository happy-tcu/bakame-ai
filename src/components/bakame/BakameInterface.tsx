import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { BakameLlamaChat, BakameSession } from '@/utils/BakameLlamaAudio';
import { Mic, MicOff, Phone, PhoneOff, BookOpen, Calculator, Users, Brain, Send, Volume2 } from 'lucide-react';

const SUBJECTS = [
  { id: 'english', name: 'English', icon: BookOpen, color: 'bg-blue-500' },
  { id: 'math', name: 'Math', icon: Calculator, color: 'bg-green-500' },
  { id: 'reading', name: 'Reading', icon: BookOpen, color: 'bg-purple-500' },
  { id: 'debate', name: 'Debate', icon: Users, color: 'bg-orange-500' }
];

interface BakameInterfaceProps {
  onSpeakingChange?: (speaking: boolean) => void;
}

const BakameInterface: React.FC<BakameInterfaceProps> = ({ onSpeakingChange }) => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<string | null>(null);
  const [session, setSession] = useState<BakameSession | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [textInput, setTextInput] = useState('');
  const chatRef = useRef<BakameLlamaChat | null>(null);

  const handleMessage = (event: any) => {
    console.log('Bakame message:', event);
    
    if (event.type === 'listening_started') {
      setIsListening(true);
    } else if (event.type === 'listening_stopped') {
      setIsListening(false);
    } else if (event.type === 'user_message' || event.type === 'ai_message') {
      setMessages(prev => [...prev, {
        role: event.type === 'user_message' ? 'user' : 'assistant',
        content: event.content,
        timestamp: new Date(),
        id: Date.now() + Math.random()
      }]);
    } else if (event.type === 'error') {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: event.content,
        timestamp: new Date(),
        id: Date.now() + Math.random(),
        isError: true
      }]);
    }
  };

  const handleSessionUpdate = (updatedSession: BakameSession) => {
    setSession(updatedSession);
  };

  const handleSpeakingChange = (speaking: boolean) => {
    setIsSpeaking(speaking);
    onSpeakingChange?.(speaking);
  };

  const startSession = async (subject: string) => {
    setIsLoading(true);
    try {
      chatRef.current = new BakameLlamaChat(handleMessage, handleSessionUpdate, handleSpeakingChange);
      await chatRef.current.init(subject);
      setIsConnected(true);
      setCurrentSubject(subject);
      setMessages([]);
      
      toast({
        title: "Connected to Bakame AI",
        description: `Started ${subject} tutoring session`,
      });
    } catch (error) {
      console.error('Error starting Bakame session:', error);
      toast({
        title: "Connection Error",
        description: error instanceof Error ? error.message : 'Failed to start tutoring session',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const switchSubject = (newSubject: string) => {
    if (chatRef.current && currentSubject !== newSubject) {
      chatRef.current.switchSubject(newSubject);
      setCurrentSubject(newSubject);
      toast({
        title: "Subject Changed",
        description: `Switched to ${newSubject} tutoring`,
      });
    }
  };

  const toggleListening = () => {
    if (!chatRef.current) return;
    
    if (isListening) {
      chatRef.current.stopListening();
    } else {
      chatRef.current.startListening();
    }
  };

  const sendTextMessage = async () => {
    if (!textInput.trim() || !chatRef.current) return;
    
    await chatRef.current.sendTextMessage(textInput);
    setTextInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendTextMessage();
    }
  };

  const endSession = () => {
    chatRef.current?.endSession();
    setIsConnected(false);
    setCurrentSubject(null);
    setIsSpeaking(false);
    setIsListening(false);
    setMessages([]);
    onSpeakingChange?.(false);
    
    toast({
      title: "Session Ended",
      description: "Great job learning today!",
    });
  };

  const formatDuration = (start: Date, end?: Date) => {
    const endTime = end || new Date();
    const duration = Math.floor((endTime.getTime() - start.getTime()) / 1000 / 60);
    return `${duration} min`;
  };

  useEffect(() => {
    return () => {
      chatRef.current?.disconnect();
    };
  }, []);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-12 w-12 text-primary" />
              <div>
                <h1 className="text-4xl font-bold text-primary">Bakame AI</h1>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">
              Your AI-powered voice tutoring system
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Choose a subject to start learning with voice conversation or text chat
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SUBJECTS.map((subject) => {
              const Icon = subject.icon;
              return (
                <Card key={subject.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 rounded-full ${subject.color} flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{subject.name} Tutoring</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button
                      onClick={() => startSession(subject.id)}
                      disabled={isLoading}
                      className="w-full"
                      size="lg"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Phone className="h-4 w-4 mr-2" />
                          Start {subject.name} Session
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Brain className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-primary">Bakame AI</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={isSpeaking ? "default" : isListening ? "secondary" : "outline"}>
                  {isSpeaking ? (
                    <><Volume2 className="h-3 w-3 mr-1" />Bakame Speaking</>
                  ) : isListening ? (
                    <><Mic className="h-3 w-3 mr-1" />Listening...</>
                  ) : (
                    <><MicOff className="h-3 w-3 mr-1" />Ready</>
                  )}
                </Badge>
                <Badge variant="outline">{currentSubject}</Badge>
              </div>
            </div>
          </div>
          <Button variant="destructive" onClick={endSession}>
            <PhoneOff className="h-4 w-4 mr-2" />
            End Session
          </Button>
        </div>

        {/* Session Info */}
        {session && (
          <Card className="mb-6">
            <CardContent className="pt-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold">{formatDuration(session.startTime, session.endTime)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Interactions</p>
                    <p className="font-semibold">{session.interactions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Subject</p>
                    <p className="font-semibold capitalize">{session.subject}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {SUBJECTS.filter(s => s.id !== currentSubject).map((subject) => (
                    <Button
                      key={subject.id}
                      variant="outline"
                      size="sm"
                      onClick={() => switchSubject(subject.id)}
                    >
                      Switch to {subject.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5" />
              Voice & Text Conversation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              {/* Voice Controls */}
              <div className="text-center">
                <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center transition-all cursor-pointer ${
                  isSpeaking ? 'bg-primary animate-pulse' : 
                  isListening ? 'bg-secondary animate-pulse' : 'bg-muted hover:bg-muted/80'
                }`} onClick={toggleListening}>
                  {isSpeaking ? (
                    <Volume2 className="h-12 w-12 text-white" />
                  ) : isListening ? (
                    <Mic className="h-12 w-12 text-primary animate-pulse" />
                  ) : (
                    <Mic className="h-12 w-12 text-muted-foreground" />
                  )}
                </div>
                <Button 
                  onClick={toggleListening}
                  variant={isListening ? "secondary" : "default"}
                  disabled={isSpeaking}
                >
                  {isListening ? (
                    <>
                      <MicOff className="h-4 w-4 mr-2" />
                      Stop Listening
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4 mr-2" />
                      Start Talking
                    </>
                  )}
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  {isSpeaking ? 'Bakame is speaking...' : 
                   isListening ? 'Listening to your voice...' : 
                   'Click to start voice conversation'}
                </p>
              </div>

              {/* Text Input */}
              <div className="w-full max-w-md">
                <div className="flex gap-2">
                  <Input
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Or type your message here..."
                    disabled={isSpeaking || isListening}
                  />
                  <Button 
                    onClick={sendTextMessage}
                    disabled={!textInput.trim() || isSpeaking || isListening}
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversation History */}
        {messages.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Conversation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {messages.map((message, index) => (
                  <div key={message.id || index} className={`p-3 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-blue-50 ml-8' 
                      : message.isError
                      ? 'bg-red-50 mr-8'
                      : 'bg-gray-50 mr-8'
                  }`}>
                    <div className="font-semibold text-sm mb-1 flex items-center gap-2">
                      {message.role === 'user' ? 'You' : 'Bakame'}
                      {message.isError && <span className="text-red-500 text-xs">(Error)</span>}
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp?.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-sm">
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BakameInterface;