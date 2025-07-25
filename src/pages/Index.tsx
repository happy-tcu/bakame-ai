
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

const Index = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

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
          <span className="text-white/70 hover:text-white transition-colors cursor-pointer">Home</span>
          <span className="text-white/70 hover:text-white transition-colors cursor-pointer">Blog</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <Badge variant="outline" className="mb-4 text-[#ff914d] border-[#ff914d]/50 bg-[#ff914d]/10">
              Revolutionary AI Technology
            </Badge>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
              Learn English with{" "}
              <span className="bg-gradient-to-r from-[#ff914d] to-[#0d4dcc] bg-clip-text text-transparent">
                AI-Powered
              </span>
              <br />
              <TypingAnimation 
                text="Voice Technology"
                className="bg-gradient-to-r from-[#0d4dcc] to-[#ff914d] bg-clip-text text-transparent"
              />
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              Experience the future of language learning with our advanced AI that teaches English through natural conversation
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={() => navigate('/ivr')}
              size="lg"
              className="bg-gradient-to-r from-[#ff914d] to-[#0d4dcc] hover:from-[#0d4dcc] hover:to-[#ff914d] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-500 hover:scale-105 shadow-[0_0_20px_rgba(255,145,77,0.3),0_0_40px_rgba(13,77,204,0.3)] hover:shadow-[0_0_30px_rgba(255,145,77,0.5),0_0_60px_rgba(13,77,204,0.5)]"
            >
              Start Learning Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              onClick={() => setShowModal(true)}
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
            >
              Get Early Access
            </Button>
          </div>

          {/* Offline Phone CTA */}
          <div className="mb-16 p-8 bg-gradient-to-r from-[#ff914d]/10 to-[#0d4dcc]/10 rounded-2xl border border-white/20 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <PhoneCall className="w-8 h-8 text-[#ff914d]" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#ff914d] to-[#0d4dcc] bg-clip-text text-transparent">
                Learn English Offline
              </h2>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                📞 Call: 885 471 1896
              </div>
              <p className="text-white/70">
                Start learning anytime - no internet required!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-6 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 bg-gradient-to-r from-[#ff914d] to-[#0d4dcc] bg-clip-text text-transparent">
            Why Choose Bakame AI?
          </h2>
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
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center bg-gradient-to-r from-[#ff914d] to-[#0d4dcc] bg-clip-text text-transparent">
            Advanced Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <Shield className="w-12 h-12 text-[#ff914d] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold mb-4 text-white">Enterprise Security</h3>
                <p className="text-white/70">
                  Bank-grade encryption and privacy protection for all your conversations
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <Globe className="w-12 h-12 text-[#0d4dcc] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold mb-4 text-white">Global Accessibility</h3>
                <p className="text-white/70">
                  Learn from anywhere in the world with our multilingual AI tutor
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <Zap className="w-12 h-12 text-[#ff914d] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold mb-4 text-white">Lightning Fast</h3>
                <p className="text-white/70">
                  Instant responses and real-time conversation practice
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 py-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center bg-gradient-to-r from-[#ff914d] to-[#0d4dcc] bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Contact Us</h3>
              <ContactForm />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Stay Updated</h3>
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center bg-gradient-to-r from-[#ff914d] to-[#0d4dcc] bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <FAQ />
        </div>
      </section>

      <EarlyAccessModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
};

export default Index;
