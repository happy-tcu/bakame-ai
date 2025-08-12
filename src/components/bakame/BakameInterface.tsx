import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { BakameRealtimeChat, BakameSession } from '@/utils/BakameRealtimeAudio';
import { Mic, MicOff, Phone, PhoneOff, BookOpen, Calculator, Users, Brain } from 'lucide-react';

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
  const chatRef = useRef<BakameRealtimeChat | null>(null);

  const handleMessage = (event: any) => {
    console.log('Bakame message:', event);
    
    // Handle different event types
    if (event.type === 'response.audio.delta') {
      setIsSpeaking(true);
      onSpeakingChange?.(true);
    } else if (event.type === 'response.audio.done') {
      setIsSpeaking(false);
      onSpeakingChange?.(false);
    } else if (event.type === 'conversation.item.created') {
      setMessages(prev => [...prev, event.item]);
    } else if (event.type === 'response.text.delta') {
      // Update the last message with new text
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === 'assistant') {
          newMessages[newMessages.length - 1].content = (newMessages[newMessages.length - 1].content || '') + event.delta;
        } else {
          newMessages.push({
            role: 'assistant',
            content: event.delta,
            id: Date.now()
          });
        }
        return newMessages;
      });
    }
  };

  const handleSessionUpdate = (updatedSession: BakameSession) => {
    setSession(updatedSession);
  };

  const startSession = async (subject: string) => {
    setIsLoading(true);
    try {
      chatRef.current = new BakameRealtimeChat(handleMessage, handleSessionUpdate);
      await chatRef.current.init(subject);
      setIsConnected(true);
      setCurrentSubject(subject);
      setMessages([]);
      
      toast({
        title: "Connected to Bakame",
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

  const endSession = () => {
    chatRef.current?.endSession();
    setIsConnected(false);
    setCurrentSubject(null);
    setIsSpeaking(false);
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
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="h-12 w-12 text-primary" />
              <h1 className="text-4xl font-bold text-primary">Bakame AI</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Your AI-powered voice tutoring system
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Choose a subject to start learning with voice conversation
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
              <div className="flex items-center gap-2">
                <Badge variant={isSpeaking ? "default" : "secondary"}>
                  {isSpeaking ? <Mic className="h-3 w-3 mr-1" /> : <MicOff className="h-3 w-3 mr-1" />}
                  {isSpeaking ? 'Bakame Speaking' : 'Listening'}
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

        {/* Voice Interface */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5" />
              Voice Conversation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center transition-all ${
                isSpeaking ? 'bg-primary animate-pulse' : 'bg-muted'
              }`}>
                <Brain className={`h-12 w-12 ${isSpeaking ? 'text-white' : 'text-muted-foreground'}`} />
              </div>
              <p className="text-lg font-semibold mb-2">
                {isSpeaking ? 'Bakame is speaking...' : 'Speak naturally to Bakame'}
              </p>
              <p className="text-muted-foreground">
                Your microphone is active. Just start talking!
              </p>
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
                      : 'bg-gray-50 mr-8'
                  }`}>
                    <div className="font-semibold text-sm mb-1">
                      {message.role === 'user' ? 'You' : 'Bakame'}
                    </div>
                    <div className="text-sm">
                      {typeof message.content === 'string' 
                        ? message.content 
                        : message.content?.map((c: any) => c.text || c.transcript || '').join(' ') || ''
                      }
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