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
  Type,
  Loader2
} from 'lucide-react';

const SUBJECTS = [
  { 
    id: 'english', 
    name: 'English', 
    icon: BookOpen, 
    color: 'text-blue-500',
    description: 'Master English conversation, grammar, and vocabulary with personalized practice sessions'
  },
  { 
    id: 'math', 
    name: 'Math', 
    icon: Calculator, 
    color: 'text-green-500',
    description: 'Solve complex problems step-by-step from algebra to calculus with guided explanations'
  },
  { 
    id: 'reading', 
    name: 'Reading', 
    icon: Brain, 
    color: 'text-purple-500',
    description: 'Improve comprehension, critical thinking, and analytical skills through guided reading'
  },
  { 
    id: 'debate', 
    name: 'Debate', 
    icon: Users, 
    color: 'text-orange-500',
    description: 'Develop argumentation skills, logical reasoning, and persuasive communication techniques'
  }
];

const QUICK_ACTIONS = {
  english: [
    { 
      prompt: "Help me practice English conversation for business meetings", 
      title: "Business Conversation", 
      description: "Practice professional dialogue, presentations, and networking scenarios"
    },
    { 
      prompt: "Teach me advanced vocabulary words with examples and usage", 
      title: "Advanced Vocabulary", 
      description: "Learn sophisticated words with context, etymology, and practice sentences"
    },
    { 
      prompt: "Help me understand complex English grammar rules with examples", 
      title: "Grammar Mastery", 
      description: "Master tenses, conditionals, subjunctive mood, and advanced structures"
    }
  ],
  math: [
    { 
      prompt: "Help me solve step-by-step algebra equations with detailed explanations", 
      title: "Algebra Mastery", 
      description: "Linear equations, quadratics, polynomials with complete solution methods"
    },
    { 
      prompt: "Explain geometry concepts with visual examples and proofs", 
      title: "Geometry & Proofs", 
      description: "Theorems, constructions, coordinate geometry with visual demonstrations"
    },
    { 
      prompt: "Practice complex word problems from real-world scenarios", 
      title: "Applied Mathematics", 
      description: "Finance, physics, engineering problems with practical applications"
    }
  ],
  reading: [
    { 
      prompt: "Help me analyze literary techniques and deeper meanings in texts", 
      title: "Literary Analysis", 
      description: "Symbolism, themes, character development, and literary devices"
    },
    { 
      prompt: "Recommend books based on my interests and reading level", 
      title: "Personalized Reading", 
      description: "Curated suggestions with reading guides and discussion questions"
    },
    { 
      prompt: "Improve my critical reading and comprehension strategies", 
      title: "Reading Strategies", 
      description: "Speed reading, note-taking, summarization, and retention techniques"
    }
  ],
  debate: [
    { 
      prompt: "Help me construct logical arguments with evidence and reasoning", 
      title: "Argument Construction", 
      description: "Build compelling cases with logical flow, evidence, and rebuttals"
    },
    { 
      prompt: "Teach me formal logic principles and fallacy identification", 
      title: "Logic & Fallacies", 
      description: "Deductive reasoning, syllogisms, and common logical errors"
    },
    { 
      prompt: "Practice public speaking and persuasive communication techniques", 
      title: "Public Speaking", 
      description: "Voice modulation, body language, audience engagement, and rhetoric"
    }
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
  const [currentSubject, setCurrentSubject] = useState<string>('english');
  const [selectedMode, setSelectedMode] = useState<'text' | 'voice'>('text');
  const [session, setSession] = useState<BakameSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
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
        type: isVoiceMode ? 'voice' : 'text'
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

  const startSession = async (mode: 'text' | 'voice') => {
    setIsLoading(true);
    setSelectedMode(mode);
    setIsVoiceMode(mode === 'voice');
    
    try {
      if (mode === 'voice') {
        chatRef.current = new BakameLlamaChat(handleMessage, handleSessionUpdate, handleSpeakingChange);
        await chatRef.current.init(currentSubject);
      }
      
      setIsConnected(true);
      setMessages([]);
      
      // Add welcome message
      const welcomeMessages = {
        english: "Hello! I'm Bakame, your English tutor. I'm here to help you improve your English skills. What would you like to work on today?",
        math: "Welcome! I'm Bakame, your Math tutor. I'm excited to help you with mathematics. What math topic can we explore together?",
        reading: "Hi there! I'm Bakame, your Reading tutor. I'm here to help you become a better reader. Would you like to read something together or discuss a book?",
        debate: "Greetings! I'm Bakame, your Debate coach. I'll help you develop your argumentation and critical thinking skills. What topic interests you for discussion?"
      };

      const welcomeMessage = welcomeMessages[currentSubject as keyof typeof welcomeMessages] || welcomeMessages.english;
      
      setMessages([{
        role: 'assistant',
        content: welcomeMessage,
        timestamp: new Date(),
        id: Date.now().toString(),
        type: mode
      }]);
      
      toast({
        title: "Connected to Bakame AI",
        description: `Started ${currentSubject} tutoring session in ${mode} mode`,
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
      if (isVoiceMode && chatRef.current) {
        chatRef.current.switchSubject(newSubject);
      }
      setCurrentSubject(newSubject);
      if (!isVoiceMode) {
        setMessages([]); // Clear conversation history for text mode
        startSession('text');
      }
    }
  };

  const sendMessage = async (messageText?: string) => {
    const messageToSend = messageText || currentInput.trim();
    if (!messageToSend || isProcessing) return;

    if (isVoiceMode && chatRef.current) {
      await chatRef.current.sendTextMessage(messageToSend);
      if (!messageText) setCurrentInput('');
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
    if (!messageText) setCurrentInput('');
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

  const toggleListening = () => {
    if (!chatRef.current || !isVoiceMode) return;
    
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
    if (isVoiceMode && chatRef.current) {
      chatRef.current.endSession();
    }
    setIsConnected(false);
    setMessages([]);
    setIsSpeaking(false);
    setIsListening(false);
    
    toast({
      title: "Session Ended",
      description: "Great job learning today!",
    });
  };

  const getConnectionStatus = () => {
    if (!isConnected) return 'Ready to Learn - Select mode and subject to begin';
    if (isProcessing) return 'AI Processing your request...';
    if (isVoiceMode) {
      if (isSpeaking) return 'Bakame AI is speaking - Listen carefully';
      if (isListening) return 'Listening for your voice input...';
      return `Voice Mode Active - Real-time conversation enabled`;
    }
    return `Text Mode Active - Type your questions and responses`;
  };

  const getStatusColor = () => {
    if (!isConnected) return 'bg-muted';
    if (isProcessing) return 'bg-secondary animate-pulse';
    if (isVoiceMode) {
      if (isSpeaking) return 'bg-accent animate-pulse';
      if (isListening) return 'bg-primary animate-pulse';
      return 'bg-primary';
    }
    return 'bg-primary';
  };

  if (showAnalytics) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <Button
              onClick={() => setShowAnalytics(false)}
              variant="outline"
              className="border-border text-foreground hover:bg-muted"
            >
              ← Back to Chat
            </Button>
          </div>
          
          {/* Detailed Analytics Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card className="bg-card/80 backdrop-blur-md border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Total Messages</h3>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {messages.length}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {messages.filter(m => m.role === 'user').length} questions asked, {messages.filter(m => m.role === 'assistant').length} AI responses
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/80 backdrop-blur-md border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Brain className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-semibold text-foreground">Current Subject</h3>
                </div>
                <div className="text-2xl font-bold text-primary capitalize mb-2">
                  {currentSubject}
                </div>
                <p className="text-sm text-muted-foreground">
                  {SUBJECTS.find(s => s.id === currentSubject)?.description}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/80 backdrop-blur-md border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  {isVoiceMode ? <Mic className="w-5 h-5 text-accent" /> : <Type className="w-5 h-5 text-accent" />}
                  <h3 className="text-lg font-semibold text-foreground">Learning Mode</h3>
                </div>
                <div className="text-2xl font-bold text-accent mb-2">
                  {isVoiceMode ? 'Voice Interactive' : 'Text Based'}
                </div>
                <p className="text-sm text-muted-foreground">
                  {isVoiceMode 
                    ? 'Real-time voice conversation with AI tutor'
                    : 'Traditional text-based Q&A learning'
                  }
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-md border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-foreground">Session Status</h3>
                </div>
                <div className="text-2xl font-bold text-green-500 mb-2">
                  {isConnected ? 'Active' : 'Inactive'}
                </div>
                <p className="text-sm text-muted-foreground">
                  {isConnected 
                    ? 'Learning session in progress'
                    : 'Ready to start new session'
                  }
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-card/80 backdrop-blur-md border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Recent Learning Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              {messages.length > 0 ? (
                <div className="space-y-3">
                  {messages.slice(-5).map((message, index) => (
                    <div key={message.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        message.role === 'user' ? 'bg-primary' : 'bg-accent'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">
                            {message.role === 'user' ? 'Your Question' : 'AI Response'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {message.content.length > 100 
                            ? `${message.content.substring(0, 100)}...`
                            : message.content
                          }
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No learning activity yet. Start a session to see your progress!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Bakame AI - English Learning Platform
            </h1>
            <Button
              onClick={() => setShowAnalytics(true)}
              variant="outline"
              className="border-border text-foreground hover:bg-muted flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Button>
          </div>

          {/* Mode Selection */}
          <div className="mb-8 text-center">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Choose Your Learning Mode</h2>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => startSession('text')}
                variant={selectedMode === 'text' ? 'default' : 'outline'}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <Type className="w-4 h-4" />
                Text Chat
              </Button>
              <Button
                onClick={() => startSession('voice')}
                variant={selectedMode === 'voice' ? 'default' : 'outline'}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <Mic className="w-4 h-4" />
                Voice Chat
              </Button>
            </div>
          </div>

          {/* Subject Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-center text-foreground">Select Your Learning Subject</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SUBJECTS.map((subject) => {
                const IconComponent = subject.icon;
                return (
                  <Card 
                    key={subject.id} 
                    className={`cursor-pointer transition-all duration-300 bg-card/80 backdrop-blur-md border-2 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 ${
                      currentSubject === subject.id ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                    onClick={() => setCurrentSubject(subject.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg bg-background/50 ${subject.color}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-2">{subject.name} Tutoring</h4>
                          <p className="text-sm text-muted-foreground mb-4">{subject.description}</p>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentSubject(subject.id);
                              startSession('text');
                            }}
                            variant="outline"
                            size="sm"
                            disabled={isLoading}
                            className="w-full border-border text-foreground hover:bg-muted"
                          >
                            {isLoading && currentSubject === subject.id ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Connecting...
                              </>
                            ) : (
                              <>
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Start {subject.name} Session
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-2">
              <Badge variant="outline" className="border-border text-foreground">
                {getConnectionStatus()}
              </Badge>
              <Badge variant="secondary" className="border-border text-foreground capitalize">
                Subject: {currentSubject}
              </Badge>
              <Badge variant={isVoiceMode ? "default" : "outline"} className="border-border">
                {isVoiceMode ? (
                  <>
                    <Mic className="w-3 h-3 mr-1" />
                    Voice Mode
                  </>
                ) : (
                  <>
                    <Type className="w-3 h-3 mr-1" />
                    Text Mode
                  </>
                )}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowAnalytics(true)}
              variant="outline"
              size="sm"
              className="border-border text-foreground hover:bg-muted flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Button>
            <Button
              onClick={endSession}
              variant="outline"
              size="sm"
              className="border-border text-foreground hover:bg-muted flex items-center gap-2"
            >
              <PhoneOff className="w-4 h-4" />
              End Session
            </Button>
          </div>
        </div>

        {/* Main Chat Interface */}
        <Card className="bg-card/80 backdrop-blur-md border-border mb-6">
          <CardContent className="p-6">
            {/* Activity Indicators */}
            {isVoiceMode && (
              <div className="flex justify-center gap-6 mb-6">
                <div className={`flex items-center gap-2 ${isListening ? 'text-primary' : 'text-muted-foreground'}`}>
                  <Mic className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
                  <span className="text-sm">You're Speaking</span>
                </div>
                <div className={`flex items-center gap-2 ${isSpeaking ? 'text-accent' : 'text-muted-foreground'}`}>
                  <Volume2 className={`w-5 h-5 ${isSpeaking ? 'animate-pulse' : ''}`} />
                  <span className="text-sm">AI Teaching</span>
                </div>
              </div>
            )}

            {/* Conversation History */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <div className="mb-4">
                    {isVoiceMode ? (
                      <Mic className="w-12 h-12 mx-auto text-primary mb-3" />
                    ) : (
                      <MessageSquare className="w-12 h-12 mx-auto text-primary mb-3" />
                    )}
                  </div>
                  <div className="text-foreground font-medium mb-2">
                    Connected via {isVoiceMode ? 'Voice Mode' : 'Text Mode'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {isVoiceMode 
                      ? `Ready for voice conversation in ${currentSubject}. Speak naturally with your AI tutor.`
                      : `Ready for text-based learning in ${currentSubject}. Type your questions below.`
                    }
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-accent/20 to-primary/10 border border-accent/30 ml-8'
                        : 'bg-gradient-to-r from-primary/20 to-accent/10 border border-primary/30 mr-8'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-sm font-medium ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent'
                          : 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'
                      }`}>
                        {message.role === 'user' ? 'You' : 'Bakame AI'}
                      </span>
                      {message.type && (
                        <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                          {message.type}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-foreground">{message.content}</p>
                  </div>
                ))
              )}
            </div>

            {/* Input Area */}
            {!isVoiceMode ? (
              <div className="flex gap-2">
                <Input
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message or question..."
                  disabled={isProcessing}
                  className="flex-1 bg-input border-border text-foreground placeholder-muted-foreground"
                />
                <Button
                  onClick={() => sendMessage()}
                  disabled={!currentInput.trim() || isProcessing}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  {isProcessing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <Button
                  onClick={toggleListening}
                  variant={isListening ? "destructive" : "default"}
                  size="lg"
                  className="rounded-full w-16 h-16"
                >
                  <Mic className="w-6 h-6" />
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  {isListening ? 'Tap to stop listening' : 'Tap to speak'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Subject-Specific Quick Actions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            {(() => {
              const subject = SUBJECTS.find(s => s.id === currentSubject);
              const IconComponent = subject?.icon || BookOpen;
              return (
                <>
                  <IconComponent className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    {subject?.name} Quick Actions
                  </h3>
                </>
              );
            })()}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {QUICK_ACTIONS[currentSubject as keyof typeof QUICK_ACTIONS]?.map((action, index) => (
              <Button
                key={index}
                onClick={() => sendMessage(action.prompt)}
                variant="outline"
                className="border-border text-foreground hover:bg-muted p-4 h-auto text-left"
                disabled={isProcessing}
              >
                <div className="w-full">
                  <div className="font-medium mb-1">{action.title}</div>
                  <div className="text-sm text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedBakameInterface;