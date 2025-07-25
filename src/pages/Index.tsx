
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Globe, Zap, Phone, PhoneCall } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FAQ from "@/components/FAQ";
import NewsletterSignup from "@/components/forms/NewsletterSignup";
import ContactForm from "@/components/forms/ContactForm";
import TypingAnimation from "@/components/TypingAnimation";
import AnimatedCounter from "@/components/AnimatedCounter";
import EarlyAccessModal from "@/components/EarlyAccessModal";
import { usePageTracking } from "@/hooks/usePageTracking";

const Index = () => {
  usePageTracking();
  const navigate = useNavigate();
  const [showEarlyAccess, setShowEarlyAccess] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff914d]/20 via-[#0d4dcc]/20 to-[#081a2e]/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center p-6 md:p-8 backdrop-blur-sm bg-white/5 border-b border-white/10">
        <div className="text-2xl font-bold bg-gradient-to-r from-[#ff914d] to-[#0d4dcc] bg-clip-text text-transparent hover:from-[#0d4dcc] hover:to-[#ff914d] transition-all duration-500">
          Bakame AI
        </div>
        <div className="hidden md:flex space-x-8">
          <span className="text-white/70">Blog</span>
          <span className="text-white/70">Careers</span>
          <span className="text-white/70">About</span>
          <span className="text-white/70">Contact</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="bg-gradient-to-r from-[#ff914d]/20 to-[#0d4dcc]/20 text-white border-white/20 mb-6 px-4 py-2">
            🚀 AI-Powered English Learning Platform
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <TypingAnimation 
              text="Learn English Anytime, Anywhere"
              speed={100}
            />
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            Revolutionary offline AI that brings personalized English learning to your phone. 
            No internet required – just call and start learning.
          </p>

          {/* Offline Phone Number CTA */}
          <div className="mb-8 p-6 bg-gradient-to-r from-[#ff914d]/10 to-[#0d4dcc]/10 rounded-2xl border border-white/20 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-3 mb-4">
              <PhoneCall className="w-6 h-6 text-[#ff914d]" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#ff914d] to-[#0d4dcc] bg-clip-text text-transparent">
                Start Learning Now - Call Offline
              </h2>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              📞 885 471 1896
            </div>
            <p className="text-white/70">
              Call anytime to practice English with our AI tutor - no internet connection needed!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={() => navigate("/ivr")}
              size="lg"
              className="bg-gradient-to-r from-[#ff914d] to-[#0d4dcc] hover:from-[#0d4dcc] hover:to-[#ff914d] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-500 hover:scale-105 shadow-[0_0_20px_rgba(255,145,77,0.3),0_0_40px_rgba(13,77,204,0.3)] hover:shadow-[0_0_30px_rgba(255,145,77,0.5),0_0_60px_rgba(13,77,204,0.5)]"
            >
              Try Web Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => setShowEarlyAccess(true)}
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
            >
              Get Early Access
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#ff914d] mb-2">
              <AnimatedCounter end={24} duration={2000} />
              /7
            </div>
            <p className="text-white/70">Always Available</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#0d4dcc] mb-2">
              <AnimatedCounter end={100} duration={2000} />
              %
            </div>
            <p className="text-white/70">Offline Capable</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">
              <AnimatedCounter end={0} duration={2000} />
              ms
            </div>
            <p className="text-white/70">Response Time</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#ff914d] to-[#0d4dcc] bg-clip-text text-transparent">
            Why Choose Bakame AI?
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Experience the future of English learning with our revolutionary offline AI technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-[#081a2e]/60 border-white/20 backdrop-blur-sm hover:bg-[#081a2e]/80 transition-all duration-300 group">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-[#ff914d]/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#ff914d]/30 transition-all duration-300">
                <Shield className="w-6 h-6 text-[#ff914d]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-[#ff914d] transition-colors">
                100% Offline
              </h3>
              <p className="text-white/70">
                No internet required. Your learning continues even during network outages or in remote areas.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#081a2e]/60 border-white/20 backdrop-blur-sm hover:bg-[#081a2e]/80 transition-all duration-300 group">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-[#0d4dcc]/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#0d4dcc]/30 transition-all duration-300">
                <Globe className="w-6 h-6 text-[#0d4dcc]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-[#0d4dcc] transition-colors">
                Global Access
              </h3>
              <p className="text-white/70">
                Available anywhere in the world through simple phone calls. No smartphone or app required.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#081a2e]/60 border-white/20 backdrop-blur-sm hover:bg-[#081a2e]/80 transition-all duration-300 group">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white/30 transition-all duration-300">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-white transition-colors">
                Instant Response
              </h3>
              <p className="text-white/70">
                Real-time conversations with AI tutors. No delays, no buffering - just natural learning.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#ff914d] to-[#0d4dcc] bg-clip-text text-transparent">
            Stay Updated
          </h2>
          <p className="text-white/70 mb-8">
            Get the latest updates about our AI English learning platform
          </p>
          <NewsletterSignup />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <FAQ />
      </div>

      {/* Contact Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-[#ff914d] to-[#0d4dcc] bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-white/70 mb-8 text-center">
            Ready to transform your English learning experience? Contact us today.
          </p>
          <ContactForm />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 backdrop-blur-sm bg-white/5 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-[#ff914d] to-[#0d4dcc] bg-clip-text text-transparent mb-4">
            Bakame AI
          </div>
          <p className="text-white/70 mb-6">
            Revolutionizing English learning through offline AI technology
          </p>
          <div className="flex justify-center space-x-6 text-white/70">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
            <a href="/support" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>

      <EarlyAccessModal 
        isOpen={showEarlyAccess} 
        onClose={() => setShowEarlyAccess(false)} 
      />
    </div>
  );
};

export default Index;
