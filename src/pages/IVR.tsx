import React from 'react';
import IVRInterface from '@/components/ivr/IVRInterface';

const IVR = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-primary/8 via-primary/4 to-transparent rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-secondary/10 via-secondary/5 to-transparent rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center p-6 md:p-8">
        <a href="/" className="text-2xl font-bold hover:text-primary transition-colors">
          Bakame AI
        </a>
        <div className="hidden md:flex space-x-8">
          <a href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a>
          <a href="/resources" className="text-muted-foreground hover:text-foreground transition-colors">Resources</a>
          <a href="/team" className="text-muted-foreground hover:text-foreground transition-colors">Team</a>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
            IVR Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Experience our intelligent voice response system powered by AI. 
            Click "Start Call" to begin your interaction with our virtual assistant.
          </p>
        </div>

        <div className="flex justify-center">
          <IVRInterface />
        </div>

        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/20">
              <h3 className="text-xl font-semibold mb-3">Voice Recognition</h3>
              <p className="text-muted-foreground">
                Advanced speech-to-text technology powered by OpenAI Whisper
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/20">
              <h3 className="text-xl font-semibold mb-3">AI Intelligence</h3>
              <p className="text-muted-foreground">
                Intelligent responses powered by ChatGPT with custom business knowledge
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/20">
              <h3 className="text-xl font-semibold mb-3">Natural Speech</h3>
              <p className="text-muted-foreground">
                Human-like text-to-speech synthesis for natural conversations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IVR;