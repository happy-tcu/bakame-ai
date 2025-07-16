
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoModal from "@/components/VideoModal";
import { Phone, Zap, Brain, GraduationCap, Building, Landmark } from "lucide-react";

const Index = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleScheduleDemo = () => {
    window.open('https://calendly.com/bakame-ai/enterprise-demo', '_blank');
  };

  const handleContributeVoice = () => {
    navigate('/early-access');
  };

  const coreFeatures = [
    {
      icon: Phone,
      title: "Voice-first & Mobile-friendly",
      description: "Works on any phone — no smartphone needed"
    },
    {
      icon: Zap,
      title: "Offline by Design",
      description: "No app. No data. Just a call."
    },
    {
      icon: Brain,
      title: "AI Tutoring in Local Languages",
      description: "Supports English & Kinyarwanda (more coming)"
    }
  ];

  const useCases = [
    {
      icon: GraduationCap,
      title: "Education",
      description: "For schools and universities — AI tutors that adapt to student needs."
    },
    {
      icon: Building,
      title: "Enterprise",
      description: "Voice-based automation for low-connectivity customer support."
    },
    {
      icon: Landmark,
      title: "Government",
      description: "Deliver civic education and services by voice, anywhere."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">
            Bakame AI
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a>
            <a href="/resources" className="text-muted-foreground hover:text-foreground transition-colors">Resources</a>
            <a href="/team" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a>
            <a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            <a href="/admin-settings" className="text-muted-foreground hover:text-foreground transition-colors">Admin</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="py-20 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Empowering students in the Global South with voice-based AI tutors — no internet required.
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Just call and learn. No apps. No data.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="/ivr" className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Try Live Demo
            </a>
            
            <button onClick={handleScheduleDemo} className="bg-accent text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent/90 transition-all duration-300 hover:scale-105">
              Schedule Enterprise Demo
            </button>
          </div>

          {/* Hero Visual Placeholder */}
          <div className="max-w-2xl mx-auto bg-muted rounded-2xl aspect-video flex items-center justify-center">
            <div className="text-center">
              <Phone className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Product demo visual</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Features Section */}
      <div className="py-20 px-6 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {coreFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-card border rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <useCase.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{useCase.title}</h3>
                <p className="text-muted-foreground">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Kinyarwanda Dataset CTA */}
      <div className="py-20 px-6 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-card border-2 border-primary/20 rounded-2xl p-12">
            <Brain className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">
              We're building the first Kinyarwanda voice dataset for AI training. Be part of it.
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join us in creating the foundation for AI that understands and speaks Kinyarwanda.
            </p>
            <button 
              onClick={handleContributeVoice}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
            >
              Contribute Your Voice
            </button>
          </div>
        </div>
      </div>

      {/* Partners & Pilots Section */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Partners & Pilots</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-muted/30 rounded-lg p-6 h-24 flex items-center justify-center">
                <span className="text-sm text-muted-foreground text-center">TCU Institute</span>
              </div>
              <div className="bg-muted/30 rounded-lg p-6 h-24 flex items-center justify-center">
                <span className="text-sm text-muted-foreground text-center">Shaddock Fund</span>
              </div>
              <div className="bg-muted/30 rounded-lg p-6 h-24 flex items-center justify-center">
                <span className="text-sm text-muted-foreground text-center">Values & Ventures</span>
              </div>
            </div>
            
            <div className="space-y-4 max-w-2xl mx-auto">
              <p className="text-lg">✅ Currently piloting in 3 Rwandan schools</p>
              <p className="text-lg">✅ Voice assistant tested with 50+ students</p>
              <p className="text-lg">✅ First government call test completed in 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted/20 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-xl font-bold text-primary mb-4">Bakame AI</div>
              <p className="text-muted-foreground text-sm">
                Voice-based AI education for the Global South
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm">
                <a href="/blog" className="block text-muted-foreground hover:text-foreground">Blog</a>
                <a href="/resources" className="block text-muted-foreground hover:text-foreground">Resources</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm">
                <a href="/team" className="block text-muted-foreground hover:text-foreground">Careers</a>
                <a href="/contact" className="block text-muted-foreground hover:text-foreground">Contact</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Get Started</h4>
              <div className="space-y-3">
                <a href="/ivr" className="block bg-primary text-primary-foreground px-4 py-2 rounded text-sm text-center hover:bg-primary/90">
                  Start Free Trial
                </a>
                <button 
                  onClick={handleScheduleDemo}
                  className="block w-full border border-border px-4 py-2 rounded text-sm text-center hover:bg-muted"
                >
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            © 2024 Bakame AI. All rights reserved.
          </div>
        </div>
      </footer>

      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} videoId="dQw4w9WgXcQ" />
    </div>
  );
};

export default Index;
