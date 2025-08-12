import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { BookOpen, Calculator, Users, Brain, Send, MessageSquare } from 'lucide-react';

const SUBJECTS = [
  { id: 'english', name: 'English', icon: BookOpen, color: 'bg-blue-500' },
  { id: 'math', name: 'Math', icon: Calculator, color: 'bg-green-500' },
  { id: 'reading', name: 'Reading', icon: BookOpen, color: 'bg-purple-500' },
  { id: 'debate', name: 'Debate', icon: Users, color: 'bg-orange-500' }
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  id: string;
}

interface BakameTextInterfaceProps {
  onSpeakingChange?: (speaking: boolean) => void;
}

const BakameTextInterface: React.FC<BakameTextInterfaceProps> = ({ onSpeakingChange }) => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [textInput, setTextInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const startSession = async (subject: string) => {
    setIsLoading(true);
    try {
      setIsConnected(true);
      setCurrentSubject(subject);
      setMessages([]);
      
      // Add welcome message
      const welcomeMessages = {
        english: "Hello! I'm Bakame, your English tutor. I'm here to help you improve your English skills. What would you like to work on today?",
        math: "Welcome! I'm Bakame, your Math tutor. I'm excited to help you with mathematics. What math topic can we explore together?",
        reading: "Hi there! I'm Bakame, your Reading tutor. I'm here to help you become a better reader. Would you like to read something together or discuss a book?",
        debate: "Greetings! I'm Bakame, your Debate coach. I'll help you develop your argumentation and critical thinking skills. What topic interests you for discussion?"
      };

      const welcomeMessage = welcomeMessages[subject as keyof typeof welcomeMessages] || welcomeMessages.english;
      
      setMessages([{
        role: 'assistant',
        content: welcomeMessage,
        timestamp: new Date(),
        id: Date.now().toString()
      }]);
      
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
    if (currentSubject !== newSubject) {
      setCurrentSubject(newSubject);
      setMessages([]); // Clear conversation history
      startSession(newSubject);
    }
  };

  const sendMessage = async () => {
    if (!textInput.trim() || isProcessing) return;

    const userMessage: Message = {
      role: 'user',
      content: textInput.trim(),
      timestamp: new Date(),
      id: Date.now().toString()
    };

    setMessages(prev => [...prev, userMessage]);
    setTextInput('');
    setIsProcessing(true);

    try {
      // Prepare conversation history for Llama
      const conversationHistory = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      console.log('Sending to Llama:', { messages: conversationHistory, subject: currentSubject });

      // Get response from Llama
      const { data, error } = await supabase.functions.invoke('bakame-llama-chat', {
        body: { 
          messages: conversationHistory,
          subject: currentSubject
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Function error: ${error.message}`);
      }

      if (!data || !data.response) {
        console.error('No response from Llama:', data);
        throw new Error('No response received from AI');
      }

      const aiMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        id: (Date.now() + 1).toString()
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm sorry, I'm having trouble right now. Please try again.",
        timestamp: new Date(),
        id: (Date.now() + 1).toString()
      };

      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to get AI response',
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const endSession = () => {
    setIsConnected(false);
    setCurrentSubject(null);
    setMessages([]);
    
    toast({
      title: "Session Ended",
      description: "Great job learning today!",
    });
  };

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
              Your AI-powered text tutoring system
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Choose a subject to start learning with text conversation
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
                          <MessageSquare className="h-4 w-4 mr-2" />
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
                <Badge variant={isProcessing ? "secondary" : "outline"}>
                  {isProcessing ? 'Thinking...' : 'Ready'}
                </Badge>
                <Badge variant="outline">{currentSubject}</Badge>
              </div>
            </div>
          </div>
          <Button variant="destructive" onClick={endSession}>
            End Session
          </Button>
        </div>

        {/* Subject Switch */}
        <Card className="mb-6">
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Current Subject</p>
                <p className="font-semibold capitalize">{currentSubject}</p>
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

        {/* Chat Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversation */}
          <div className="lg:col-span-2">
            <Card className="h-96">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Conversation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 h-64 overflow-y-auto">
                  {messages.map((message) => (
                    <div key={message.id} className={`p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-blue-50 ml-8' 
                        : 'bg-gray-50 mr-8'
                    }`}>
                      <div className="font-semibold text-sm mb-1 flex items-center gap-2">
                        {message.role === 'user' ? 'You' : 'Bakame'}
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="text-sm">
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="bg-gray-50 mr-8 p-3 rounded-lg">
                      <div className="font-semibold text-sm mb-1">Bakame</div>
                      <div className="text-sm flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                        Thinking...
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Input Area */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Your Message</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    disabled={isProcessing}
                    rows={4}
                  />
                  <Button 
                    onClick={sendMessage}
                    disabled={!textInput.trim() || isProcessing}
                    className="w-full"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BakameTextInterface;