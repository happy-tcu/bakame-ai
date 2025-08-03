import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, MicOff, Volume2, MessageSquare, Zap, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const DemoSection = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [demoStep, setDemoStep] = useState(1);
  const [userInput, setUserInput] = useState('');
  
  const demoConversation = [
    {
      user: "Hello, I want to practice English",
      ai: "Great! I'm your AI English tutor. Let's start with pronunciation. Can you say: 'I would like to improve my speaking skills'?"
    },
    {
      user: "I would like to improve my speaking skills",
      ai: "Excellent! Your pronunciation is clear. I noticed you can work on the 'r' sound in 'improve'. Try rolling your tongue slightly. Now, let's practice vocabulary. What's your favorite hobby?"
    }
  ];

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const nextStep = () => {
    if (demoStep < 3) {
      setDemoStep(demoStep + 1);
    }
  };

  return (
    <section className="container mx-auto px-6 py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Try It Now
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Experience AI English Tutoring
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how our AI tutor provides instant feedback and personalized learning. No signup required.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Demo */}
          <div className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Live Conversation Demo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Demo Chat Interface */}
                <div className="h-64 bg-muted/30 rounded-lg p-4 overflow-y-auto">
                  {demoStep >= 1 && (
                    <div className="space-y-4">
                      <div className="flex justify-end">
                        <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 max-w-xs">
                          {demoConversation[0].user}
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-card border rounded-lg px-3 py-2 max-w-xs">
                          {demoConversation[0].ai}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {demoStep >= 2 && (
                    <div className="space-y-4 mt-4">
                      <div className="flex justify-end">
                        <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 max-w-xs">
                          {demoConversation[1].user}
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-card border rounded-lg px-3 py-2 max-w-xs">
                          <div className="mb-2">{demoConversation[1].ai}</div>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">
                              <Zap className="h-3 w-3 mr-1" />
                              Pronunciation feedback
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Interface */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message or click to speak..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant={isRecording ? "destructive" : "secondary"}
                    size="icon"
                    onClick={toggleRecording}
                  >
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button variant="secondary" size="icon">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>

                {demoStep < 3 && (
                  <Button onClick={nextStep} className="w-full">
                    Continue Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Features Highlight */}
          <div className="space-y-6">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mic className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Real Voice Interaction</h3>
                    <p className="text-sm text-muted-foreground">Speak naturally, get instant feedback</p>
                  </div>
                </div>
                <p className="text-foreground/80">
                  Practice pronunciation with real-time AI analysis and personalized corrections.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Zap className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Instant Feedback</h3>
                    <p className="text-sm text-muted-foreground">Get corrections as you speak</p>
                  </div>
                </div>
                <p className="text-foreground/80">
                  Receive immediate pronunciation, grammar, and vocabulary suggestions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Personalized Learning</h3>
                    <p className="text-sm text-muted-foreground">Adapted to your skill level</p>
                  </div>
                </div>
                <p className="text-foreground/80">
                  AI adapts to your progress and focuses on areas you need to improve.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="mr-4">
            Start Learning Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg">
            Schedule Demo Call
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;