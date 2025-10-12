import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mic, Volume2, BookOpen, Brain, Send, ChevronRight, Sparkles, Play, RefreshCw, Check, X, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import EarlyAccessModal from '@/components/EarlyAccessModal';
import { useAuth } from '@/components/auth/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TryDemo = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalDefaultTab, setAuthModalDefaultTab] = useState<'login' | 'signup'>('login');
  
  // Pronunciation Test State
  const [pronunciationText, setPronunciationText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  
  // Flashcard Generator State
  const [flashcardTopic, setFlashcardTopic] = useState('');
  const [flashcards, setFlashcards] = useState<Array<{ front: string; back: string }>>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // AI Conversation State
  const [userMessage, setUserMessage] = useState('');
  const [conversation, setConversation] = useState([
    { role: 'ai', message: "Hello! I'm your AI English tutor. Let's practice a conversation. You can ask me anything or we can discuss a topic of your choice!" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  // Vocabulary Quiz State
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  
  const quizQuestions = [
    {
      word: 'Eloquent',
      options: ['Angry', 'Fluent and persuasive', 'Silent', 'Confused'],
      correct: 1
    },
    {
      word: 'Resilient',
      options: ['Weak', 'Fragile', 'Able to recover quickly', 'Slow'],
      correct: 2
    },
    {
      word: 'Pragmatic',
      options: ['Idealistic', 'Practical', 'Emotional', 'Careless'],
      correct: 1
    }
  ];
  
  // Pronunciation Test Handler with Real API
  const handlePronunciationTest = async () => {
    if (!pronunciationText) return;
    
    if (!user) {
      setAuthModalDefaultTab('login');
      setIsAuthModalOpen(true);
      toast({
        title: 'Authentication Required',
        description: 'Please log in to use the pronunciation test.',
      });
      return;
    }
    
    setIsSpeaking(true);
    setSpokenText(pronunciationText);
    
    try {
      const response = await apiRequest('/api/pronunciation/check', {
        method: 'POST',
        body: JSON.stringify({
          text: pronunciationText,
        }),
      });
      
      if (response.score !== undefined) {
        toast({
          title: 'Pronunciation Score',
          description: `You scored ${response.score.toFixed(1)}%. ${response.feedback}`,
        });
        
        // Store session for progress tracking
        await apiRequest('/api/sessions', {
          method: 'POST',
          body: JSON.stringify({
            session_type: 'pronunciation',
            duration_seconds: 30,
            score: response.score.toString(),
          }),
        });
      }
    } catch (error) {
      console.error('Error checking pronunciation:', error);
      // Don't show error toast for pronunciation check, just continue
    }
    
    setTimeout(() => {
      setIsSpeaking(false);
    }, 2000);
  };
  
  // Flashcard Generator Handler with Real API
  const generateFlashcards = async () => {
    if (!flashcardTopic) return;
    
    if (!user) {
      setAuthModalDefaultTab('signup');
      setIsAuthModalOpen(true);
      toast({
        title: 'Authentication Required',
        description: 'Please sign up or log in to generate flashcards.',
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const response = await apiRequest('/api/flashcards/generate', {
        method: 'POST',
        body: JSON.stringify({
          topic: flashcardTopic,
          text: flashcardTopic,
          count: 4
        }),
      });
      
      if (response.flashcards && response.flashcards.length > 0) {
        const formattedFlashcards = response.flashcards.map((card: any) => ({
          front: card.front,
          back: card.back
        }));
        setFlashcards(formattedFlashcards);
        setCurrentCardIndex(0);
        setIsFlipped(false);
        
        toast({
          title: 'Flashcards Generated!',
          description: `Created ${formattedFlashcards.length} flashcards for "${flashcardTopic}"`,
        });
      }
    } catch (error) {
      console.error('Error generating flashcards:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate flashcards. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  // AI Conversation Handler with Session Tracking
  const sendMessage = async () => {
    if (!userMessage.trim()) return;
    
    if (!user) {
      setAuthModalDefaultTab('login');
      setIsAuthModalOpen(true);
      toast({
        title: 'Authentication Required',
        description: 'Please log in to chat with the AI tutor.',
      });
      return;
    }
    
    const newUserMessage = { role: 'user', message: userMessage };
    setConversation([...conversation, newUserMessage]);
    setUserMessage('');
    setIsTyping(true);
    
    try {
      // Store conversation session
      await apiRequest('/api/sessions', {
        method: 'POST',
        body: JSON.stringify({
          session_type: 'conversation',
          duration_seconds: 60,
          score: null,
        }),
      });
      
      // Simulate AI response (in real app, this would call an AI API)
      setTimeout(() => {
        const aiResponses = [
          "That's a great point! Can you tell me more about your experience with that?",
          "Excellent use of vocabulary! You're making great progress. Let me ask you: how would you use this in a formal setting?",
          "I understand what you mean. Here's a tip: try using transition words like 'however' or 'furthermore' to connect your ideas better.",
          "Perfect grammar! You're really improving. Would you like to practice more complex sentence structures?",
          "That's interesting! In English, we often express this idea differently. Try saying it like this..."
        ];
        
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        setConversation(prev => [...prev, { role: 'ai', message: randomResponse }]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
    }
  };
  
  // Quiz Handler
  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(quizQuestions[currentQuizQuestion].options[answerIndex]);
    
    if (answerIndex === quizQuestions[currentQuizQuestion].correct) {
      setQuizScore(quizScore + 1);
    }
    
    setTimeout(() => {
      if (currentQuizQuestion < quizQuestions.length - 1) {
        setCurrentQuizQuestion(currentQuizQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowQuizResult(true);
      }
    }, 1000);
  };
  
  const resetQuiz = () => {
    setCurrentQuizQuestion(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setShowQuizResult(false);
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-white mr-2" />
            <h1 className="text-4xl md:text-5xl font-bold text-white font-bold">
              Try Bakame Free
            </h1>
            <Sparkles className="h-8 w-8 text-white ml-2" />
          </div>
          <p className="text-xl text-muted-foreground mb-2">No Signup Required</p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the power of AI-powered English learning. Test our interactive features below 
            and see how Bakame can transform education in your school.
          </p>
        </div>
      </section>
      
      {/* Demo Sections */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pronunciation Test */}
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-6 w-6 text-white" />
                  <CardTitle>Pronunciation Test</CardTitle>
                </div>
                <Badge variant="secondary">Interactive</Badge>
              </div>
              <CardDescription>
                Type any text and hear it pronounced correctly. Perfect for practicing difficult words or phrases.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Type any English text here... Try: 'The quick brown fox jumps over the lazy dog'"
                value={pronunciationText}
                onChange={(e) => setPronunciationText(e.target.value)}
                className="min-h-[100px]"
              />
              
              <Button 
                onClick={handlePronunciationTest}
                disabled={!pronunciationText || isSpeaking}
                className="w-full"
                variant={isSpeaking ? "secondary" : "default"}
              >
                {isSpeaking ? (
                  <>
                    <Volume2 className="mr-2 h-4 w-4 animate-pulse" />
                    Speaking...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Test Pronunciation
                  </>
                )}
              </Button>
              
              {spokenText && !isSpeaking && (
                <div className="p-4 bg-muted rounded-lg animate-in fade-in slide-in-from-bottom-2">
                  <p className="text-sm text-muted-foreground">Last spoken:</p>
                  <p className="font-medium">{spokenText}</p>
                </div>
              )}
              
              <div className="pt-4 border-t border-border">
                <Button 
                  onClick={() => setIsEarlyAccessOpen(true)}
                  variant="outline"
                  className="w-full group"
                >
                  Want voice feedback? Join Waitlist
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Flashcard Generator */}
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-6 w-6 text-white" />
                  <CardTitle>Flashcard Generator</CardTitle>
                </div>
                <Badge variant="secondary">AI-Powered</Badge>
              </div>
              <CardDescription>
                Generate custom flashcards for any topic or vocabulary you want to learn.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter a topic or word (e.g., 'Present Perfect Tense')"
                  value={flashcardTopic}
                  onChange={(e) => setFlashcardTopic(e.target.value)}
                />
                <Button 
                  onClick={generateFlashcards}
                  disabled={!flashcardTopic || isGenerating}
                >
                  {isGenerating ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    'Generate'
                  )}
                </Button>
              </div>
              
              {flashcards.length > 0 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                  <div 
                    className="relative h-48 cursor-pointer preserve-3d transition-transform duration-500"
                    style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    <div className="absolute inset-0 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg border border-border backface-hidden">
                      <div className="h-full flex flex-col justify-center items-center text-center">
                        <p className="text-sm text-muted-foreground mb-2">Question</p>
                        <p className="text-lg font-medium">{flashcards[currentCardIndex].front}</p>
                        <p className="text-xs text-muted-foreground mt-4">Click to flip</p>
                      </div>
                    </div>
                    <div 
                      className="absolute inset-0 p-6 bg-gray-200 dark:bg-gray-700 rounded-lg border border-border backface-hidden"
                      style={{ transform: 'rotateY(180deg)' }}
                    >
                      <div className="h-full flex flex-col justify-center items-center text-center">
                        <p className="text-sm text-muted-foreground mb-2">Answer</p>
                        <p className="text-lg">{flashcards[currentCardIndex].back}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentCardIndex(Math.max(0, currentCardIndex - 1));
                        setIsFlipped(false);
                      }}
                      disabled={currentCardIndex === 0}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {currentCardIndex + 1} / {flashcards.length}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentCardIndex(Math.min(flashcards.length - 1, currentCardIndex + 1));
                        setIsFlipped(false);
                      }}
                      disabled={currentCardIndex === flashcards.length - 1}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="pt-4 border-t border-border">
                <Button 
                  onClick={() => setIsEarlyAccessOpen(true)}
                  variant="outline"
                  className="w-full group"
                >
                  Create unlimited flashcards - Join Waitlist
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* AI Conversation Partner */}
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mic className="h-6 w-6 text-white" />
                  <CardTitle>AI Conversation Partner</CardTitle>
                </div>
                <Badge variant="secondary">Chat Demo</Badge>
              </div>
              <CardDescription>
                Practice conversational English with our AI tutor. Get instant feedback and suggestions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-64 overflow-y-auto space-y-3 p-4 bg-muted/50 rounded-lg">
                {conversation.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-1`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-primary text-white-foreground'
                          : 'bg-card border border-border'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-card border border-border p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button onClick={sendMessage} disabled={!userMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="pt-4 border-t border-border">
                <Button 
                  onClick={() => setIsEarlyAccessOpen(true)}
                  variant="outline"
                  className="w-full group"
                >
                  Get voice conversations - Join Waitlist
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Vocabulary Builder */}
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="h-6 w-6 text-white" />
                  <CardTitle>Vocabulary Builder</CardTitle>
                </div>
                <Badge variant="secondary">Quiz Demo</Badge>
              </div>
              <CardDescription>
                Test your vocabulary knowledge with our adaptive quiz system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!showQuizResult ? (
                <>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                      Question {currentQuizQuestion + 1} of {quizQuestions.length}
                    </p>
                    <p className="text-lg font-medium mb-4">
                      What does "{quizQuestions[currentQuizQuestion].word}" mean?
                    </p>
                    
                    <div className="space-y-2">
                      {quizQuestions[currentQuizQuestion].options.map((option, index) => (
                        <Button
                          key={index}
                          variant={
                            selectedAnswer === option
                              ? index === quizQuestions[currentQuizQuestion].correct
                                ? "default"
                                : "destructive"
                              : "outline"
                          }
                          className="w-full justify-start"
                          onClick={() => handleQuizAnswer(index)}
                          disabled={selectedAnswer !== null}
                        >
                          {selectedAnswer === option && (
                            index === quizQuestions[currentQuizQuestion].correct ? (
                              <Check className="mr-2 h-4 w-4" />
                            ) : (
                              <X className="mr-2 h-4 w-4" />
                            )
                          )}
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Score: {quizScore}/{quizQuestions.length}</span>
                    <span>Progress: {Math.round((currentQuizQuestion + 1) / quizQuestions.length * 100)}%</span>
                  </div>
                </>
              ) : (
                <div className="text-center p-8 bg-muted/50 rounded-lg animate-in fade-in zoom-in">
                  <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
                  <p className="text-4xl font-bold text-white mb-2">
                    {quizScore}/{quizQuestions.length}
                  </p>
                  <p className="text-muted-foreground mb-6">
                    {quizScore === quizQuestions.length 
                      ? "Perfect score! You're a vocabulary master!"
                      : quizScore >= quizQuestions.length / 2
                      ? "Good job! Keep practicing to improve."
                      : "Nice try! Regular practice will help you improve."}
                  </p>
                  <Button onClick={resetQuiz} className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                </div>
              )}
              
              <div className="pt-4 border-t border-border">
                <Button 
                  onClick={() => setIsEarlyAccessOpen(true)}
                  variant="outline"
                  className="w-full group"
                >
                  Access full vocabulary courses - Join Waitlist
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Ready to Transform English Learning?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of schools already using Bakame to improve student outcomes.
            Get early access to our full platform with exclusive benefits.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => setIsEarlyAccessOpen(true)}
              className="bg-gradient-to-r from-primary to-accent text-white-foreground hover:opacity-90 transition-all text-lg px-8 py-4"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Join Waitlist Now
            </Button>
            
            <Button 
              onClick={() => navigate('/contact')}
              variant="outline"
              className="text-lg px-8 py-4"
            >
              Contact Government Sales
            </Button>
          </div>
          
          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500+</div>
              <p className="text-muted-foreground">Schools Using Bakame</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">85%</div>
              <p className="text-muted-foreground">Improvement in Speaking</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <p className="text-muted-foreground">AI Tutor Availability</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Early Access Modal */}
      <EarlyAccessModal 
        isOpen={isEarlyAccessOpen} 
        onClose={() => setIsEarlyAccessOpen(false)} 
      />
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalDefaultTab}
      />
    </div>
  );
};

export default TryDemo;