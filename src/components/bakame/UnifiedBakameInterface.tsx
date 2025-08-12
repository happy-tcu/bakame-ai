import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { BakameLlamaChat, BakameSession } from '@/utils/BakameLlamaAudio';
import { 
  BookOpen, 
  Calculator, 
  Users, 
  Brain, 
  Send, 
  MessageSquare, 
  Mic, 
  MicOff, 
  Volume2, 
  BarChart3,
  PhoneOff,
  Settings,
  VolumeX
} from 'lucide-react';

const SUBJECTS = [
  { id: 'english', name: 'English', icon: BookOpen, color: 'bg-blue-500' },
  { id: 'math', name: 'Math', icon: Calculator, color: 'bg-green-500' },
  { id: 'reading', name: 'Reading', icon: BookOpen, color: 'bg-purple-500' },
  { id: 'debate', name: 'Debate', icon: Users, color: 'bg-orange-500' }
];

const QUICK_ACTIONS = {
  english: [
    { text: "Help me practice English conversation", label: "Conversation Practice", desc: "Natural dialogue practice" },
    { text: "Teach me new vocabulary words", label: "Vocabulary Building", desc: "Learn new words and meanings" },
    { text: "Help me with English grammar", label: "Grammar Help", desc: "Understanding grammar rules" }
  ],
  math: [
    { text: "Help me solve algebra problems", label: "Algebra Practice", desc: "Step-by-step problem solving" },
    { text: "Explain geometry concepts", label: "Geometry Help", desc: "Visual and spatial concepts" },
    { text: "Practice word problems", label: "Word Problems", desc: "Real-world math applications" }
  ],
  reading: [
    { text: "Help me improve reading comprehension", label: "Comprehension", desc: "Understanding text better" },
    { text: "Recommend good books to read", label: "Book Recommendations", desc: "Find your next great read" },
    { text: "Help me analyze this text", label: "Text Analysis", desc: "Deep reading skills" }
  ],
  debate: [
    { text: "Help me practice debating skills", label: "Debate Practice", desc: "Argumentation techniques" },
    { text: "Teach me logical reasoning", label: "Logic Training", desc: "Critical thinking skills" },
    { text: "Help me prepare counterarguments", label: "Counter Arguments", desc: "Anticipate opposing views" }
  ]
};

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  id: string;
  type?: string;
}

interface UnifiedBakameInterfaceProps {
  onSpeakingChange?: (speaking: boolean) => void;
}

const UnifiedBakameInterface: React.FC<UnifiedBakameInterfaceProps> = ({ onSpeakingChange }) => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<string | null>(null);
  const [session, setSession] = useState<BakameSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [textInput, setTextInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
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
        id: Date.now() + Math.random().toString(),
        type: voiceMode ? 'voice' : 'text'
      }]);
    } else if (event.type === 'error') {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: event.content,
        timestamp: new Date(),
        id: Date.now() + Math.random().toString(),
        type: 'error'
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
      if (voiceMode) {
        chatRef.current = new BakameLlamaChat(handleMessage, handleSessionUpdate, handleSpeakingChange);
        await chatRef.current.init(subject);
      }
      
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
        id: Date.now().toString(),
        type: voiceMode ? 'voice' : 'text'
      }]);
      
      if (voiceMode && chatRef.current) {
        // Voice mode handles its own welcome message
      }
      
      toast({
        title: "Connected to Bakame AI",
        description: `Started ${subject} tutoring session${voiceMode ? ' with voice' : ''}`,
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
      if (voiceMode && chatRef.current) {
        chatRef.current.switchSubject(newSubject);
      }
      setCurrentSubject(newSubject);
      if (!voiceMode) {
        setMessages([]); // Clear conversation history for text mode
        startSession(newSubject);
      }
    }
  };

  const sendMessage = async (messageText?: string) => {
    const messageToSend = messageText || textInput.trim();
    if (!messageToSend || isProcessing) return;

    if (voiceMode && chatRef.current) {
      await chatRef.current.sendTextMessage(messageToSend);
      if (!messageText) setTextInput('');
      return;
    }

    // Text mode
    const userMessage: Message = {
      role: 'user',
      content: messageToSend,
      timestamp: new Date(),
      id: Date.now().toString(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    if (!messageText) setTextInput('');
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
        id: (Date.now() + 1).toString(),
        type: 'text'
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm sorry, I'm having trouble right now. Please try again.",
        timestamp: new Date(),
        id: (Date.now() + 1).toString(),
        type: 'error'
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

  const toggleVoiceMode = () => {
    if (voiceMode && chatRef.current) {
      chatRef.current.endSession();
    }
    setVoiceMode(!voiceMode);
  };

  const toggleListening = () => {
    if (!chatRef.current || !voiceMode) return;
    
    if (isListening) {
      chatRef.current.stopListening();
    } else {
      chatRef.current.startListening();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const endSession = () => {
    if (voiceMode && chatRef.current) {
      chatRef.current.endSession();
    }
    setIsConnected(false);
    setCurrentSubject(null);
    setMessages([]);
    setIsSpeaking(false);
    setIsListening(false);
    
    toast({
      title: "Session Ended",
      description: "Great job learning today!",
    });
  };

  const getConnectionStatus = () => {
    if (!isConnected) return 'Ready to Learn';
    if (isProcessing) return 'Processing...';
    if (voiceMode) {
      if (isSpeaking) return 'Bakame Speaking';
      if (isListening) return 'Listening...';
      return 'Voice Mode Active';
    }
    return 'Text Mode Active';
  };

  const getStatusColor = () => {
    if (!isConnected) return 'bg-muted';
    if (isProcessing) return 'bg-secondary animate-pulse';
    if (voiceMode) {
      if (isSpeaking) return 'bg-accent animate-pulse';
      if (isListening) return 'bg-primary animate-pulse';
      return 'bg-primary';
    }
    return 'bg-green-500';
  };

  if (showAnalytics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button
              onClick={() => setShowAnalytics(false)}
              variant="outline"
            >
              ← Back to Learning
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Learning Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{messages.length}</div>
                  <div className="text-sm text-muted-foreground">Total Messages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{currentSubject || 'None'}</div>
                  <div className="text-sm text-muted-foreground">Current Subject</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{voiceMode ? 'Voice' : 'Text'}</div>
                  <div className="text-sm text-muted-foreground">Learning Mode</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
              Your AI-powered tutoring system
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Choose a subject and learning mode to start
            </p>
          </div>

          {/* Mode Selection */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-center">Learning Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-4">
                <Button
                  variant={!voiceMode ? "default" : "outline"}
                  onClick={() => setVoiceMode(false)}
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Text Chat
                </Button>
                <Button
                  variant={voiceMode ? "default" : "outline"}
                  onClick={() => setVoiceMode(true)}
                  className="flex items-center gap-2"
                >
                  <Mic className="h-4 w-4" />
                  Voice Chat
                </Button>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-2">
                {voiceMode 
                  ? "Speak naturally with voice conversations" 
                  : "Type messages for reliable text conversations"
                }
              </p>
            </CardContent>
          </Card>

          {/* Subject Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                          {voiceMode ? <Mic className="h-4 w-4 mr-2" /> : <MessageSquare className="h-4 w-4 mr-2" />}
                          Start {subject.name} Session
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Analytics Button */}
          <div className="text-center">
            <Button
              onClick={() => setShowAnalytics(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              View Analytics
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Bakame AI</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">
                  {getConnectionStatus()}
                </Badge>
                <Badge variant="outline">{currentSubject}</Badge>
                <Badge variant={voiceMode ? "default" : "secondary"}>
                  {voiceMode ? 'Voice Mode' : 'Text Mode'}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={toggleVoiceMode}
              variant="outline"
              size="sm"
              disabled={isListening || isSpeaking}
            >
              {voiceMode ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button
              onClick={() => setShowAnalytics(true)}
              variant="outline"
              size="sm"
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
            <Button
              onClick={endSession}
              variant="destructive"
              size="sm"
            >
              <PhoneOff className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-96 mb-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {voiceMode ? <Mic className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
                    Conversation
                  </CardTitle>
                  {voiceMode && (
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-2 ${isListening ? 'text-primary' : 'text-muted-foreground'}`}>
                        <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
                        <span className="text-sm">Listening</span>
                      </div>
                      <div className={`flex items-center gap-2 ${isSpeaking ? 'text-accent' : 'text-muted-foreground'}`}>
                        <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
                        <span className="text-sm">Speaking</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 h-64 overflow-y-auto">
                  {messages.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-muted-foreground mb-2">
                        Connected in {voiceMode ? 'Voice' : 'Text'} Mode
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Start your {currentSubject} learning conversation...
                      </div>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div key={message.id} className={`p-3 rounded-lg ${
                        message.role === 'user' 
                          ? 'bg-blue-50 ml-8 border border-blue-200' 
                          : message.type === 'error'
                          ? 'bg-red-50 mr-8 border border-red-200'
                          : 'bg-gray-50 mr-8 border border-gray-200'
                      }`}>
                        <div className="font-semibold text-sm mb-1 flex items-center gap-2">
                          {message.role === 'user' ? 'You' : 'Bakame'}
                          {message.type && (
                            <Badge variant="outline" className="text-xs">
                              {message.type}
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="text-sm">
                          {message.content}
                        </div>
                      </div>
                    ))
                  )}
                  {isProcessing && (
                    <div className="bg-gray-50 mr-8 p-3 rounded-lg border border-gray-200">
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

            {/* Input Area */}
            <Card>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  {voiceMode && (
                    <div className="text-center">
                      <Button 
                        onClick={toggleListening}
                        variant={isListening ? "secondary" : "default"}
                        disabled={isSpeaking}
                        size="lg"
                        className="w-full mb-4"
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
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Textarea
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={voiceMode ? "Or type your message here..." : "Type your message here..."}
                      disabled={isProcessing || (voiceMode && (isListening || isSpeaking))}
                      rows={2}
                      className="flex-1"
                    />
                    <Button 
                      onClick={() => sendMessage()}
                      disabled={!textInput.trim() || isProcessing || (voiceMode && (isListening || isSpeaking))}
                      size="lg"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Quick Actions & Controls */}
          <div className="space-y-4">
            {/* Subject Switch */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Switch Subject</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {SUBJECTS.filter(s => s.id !== currentSubject).map((subject) => (
                    <Button
                      key={subject.id}
                      variant="outline"
                      size="sm"
                      onClick={() => switchSubject(subject.id)}
                      className="w-full justify-start"
                    >
                      <subject.icon className="h-4 w-4 mr-2" />
                      {subject.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {currentSubject && QUICK_ACTIONS[currentSubject as keyof typeof QUICK_ACTIONS]?.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => sendMessage(action.text)}
                      className="w-full text-left h-auto p-2"
                      disabled={isProcessing}
                    >
                      <div>
                        <div className="font-medium text-xs">{action.label}</div>
                        <div className="text-xs text-muted-foreground">{action.desc}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedBakameInterface;