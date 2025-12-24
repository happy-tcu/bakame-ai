import { useState } from 'react';
import { 
  Users, CheckCircle, GraduationCap, Brain, Building,
  Rocket, Users2, School, FlaskConical, Globe, Lightbulb, Award,
  Heart, Vote, Radio, ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import EarlyAccessModal from '@/components/EarlyAccessModal';
import FloatingVoiceButton from '@/components/FloatingVoiceButton';
import HeroGeometry from '@/components/HeroGeometry';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import drcLogo from '../../attached_assets/1_1764635764642.png';
import shaddockLogo from '../../attached_assets/2_1764635764642.png';
import createLogo from '../../attached_assets/3_1764635764642.png';
import newPartnerLogo from '../../attached_assets/idWoQcnvgi_logos_1764890345667.png';
import replicateLogo from '../../attached_assets/5_1764635764642.png';
import tcuLogo from '../../attached_assets/6_1764635764642.png';
import twilioLogo from '../../attached_assets/7_1764635764639.png';
import openaiLogo from '../../attached_assets/8_1764635764642.png';
import elevenlabsLogo from '../../attached_assets/9_1764635764641.png';

const Index = () => {
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState(false);
  
  const pillarsAnimation = useScrollAnimation({ threshold: 0.15 });
  const programsAnimation = useScrollAnimation({ threshold: 0.15 });
  const partnersAnimation = useScrollAnimation({ threshold: 0.15 });
  const researchAnimation = useScrollAnimation({ threshold: 0.15 });
  const trustAnimation = useScrollAnimation({ threshold: 0.2 });
  const ctaAnimation = useScrollAnimation({ threshold: 0.2 });

  const programs = [
    { 
      icon: GraduationCap, 
      name: 'Education Programs', 
      description: 'AI-powered lessons, quizzes, and speaking practice for students in offline areas.',
      color: 'from-blue-700 to-cyan-700'
    },
    { 
      icon: Vote, 
      name: 'Civic Programs', 
      description: 'Engagement tools for voter education, local governance, and public information.',
      color: 'from-purple-700 to-pink-700'
    },
    { 
      icon: Heart, 
      name: 'Health Programs', 
      description: 'Voice-based health guidance, wellness check-ins, and awareness campaigns.',
      color: 'from-red-700 to-orange-700'
    },
    { 
      icon: Radio, 
      name: 'Public Information Services', 
      description: 'Weather alerts, safety updates, agriculture tips, and remote community messaging.',
      color: 'from-green-700 to-emerald-700'
    },
  ];

  const trustLogos = [
    { src: drcLogo, alt: "Dallas Regional Chamber" },
    { src: shaddockLogo, alt: "Shaddock National Holdings" },
    { src: createLogo, alt: "Create" },
    { src: newPartnerLogo, alt: "Partner" },
    { src: replicateLogo, alt: "Replicate" },
    { src: tcuLogo, alt: "TCU" },
    { src: twilioLogo, alt: "Twilio" },
    { src: openaiLogo, alt: "OpenAI" },
    { src: elevenlabsLogo, alt: "ElevenLabs" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section - Scale AI Style */}
      <section className="relative min-h-screen flex items-center bg-black overflow-hidden">
        {/* Grid pattern background */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen pt-24 pb-20">
            {/* Left content */}
            <div className="flex flex-col justify-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight mb-8">
                <span className="text-white">Accelerate the</span>
                <br />
                <span className="text-white">Development of</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  AI Applications
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 max-w-lg mb-10 leading-relaxed font-light">
                Bakame delivers proven voice-AI infrastructure to schools, governments, and NGOs — all through simple phone calls.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-5">
                <button
                  onClick={() => setIsEarlyAccessOpen(true)}
                  className="group px-7 py-3.5 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center gap-2"
                >
                  Book a Demo
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => setIsEarlyAccessOpen(true)}
                  className="px-7 py-3.5 text-white font-medium rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 flex items-center gap-2 group"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
            
            {/* Right side - 3D Geometry */}
            <div className="hidden lg:block relative h-full min-h-[500px]">
              <HeroGeometry />
            </div>
          </div>
        </div>
        
      </section>

      {/* Three Pillars Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/f4Lzbqu1z-k?autoplay=1&mute=1&loop=1&playlist=f4Lzbqu1z-k&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&vq=hd2160&disablekb=1&fs=0&iv_load_policy=3"
            title="Three Pillars Background"
            allow="autoplay; encrypted-media"
            style={{ pointerEvents: 'none' }}
          />
        </div>
        
        <div className="absolute inset-0 bg-black/70"></div>
        
        <div ref={pillarsAnimation.ref} className="relative max-w-7xl mx-auto px-6">
          <h2 className={`text-4xl md:text-5xl font-light text-center mb-16 scroll-hidden ${pillarsAnimation.isVisible ? 'scroll-visible' : ''}`}>
            Three Pillars of <span className="text-white font-normal">Voice-AI Infrastructure</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className={`bg-white/5 border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 scroll-slide-left ${pillarsAnimation.isVisible ? 'scroll-visible stagger-1' : ''}`}>
              <CardHeader>
                <Brain className="h-10 w-10 text-white/80 mb-4" />
                <CardTitle className="text-xl text-white font-medium">Learn AI</CardTitle>
                <CardDescription className="text-gray-400 font-light">
                  Voice-based programs through basic phone calls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300 text-sm font-light">
                    <CheckCircle className="mr-2 h-4 w-4 text-white/60" />
                    Personalized conversations
                  </li>
                  <li className="flex items-center text-gray-300 text-sm font-light">
                    <CheckCircle className="mr-2 h-4 w-4 text-white/60" />
                    &lt;4s response time
                  </li>
                  <li className="flex items-center text-gray-300 text-sm font-light">
                    <CheckCircle className="mr-2 h-4 w-4 text-white/60" />
                    Localizable + accent-aware
                  </li>
                  <li className="flex items-center text-gray-300 text-sm font-light">
                    <CheckCircle className="mr-2 h-4 w-4 text-white/60" />
                    Works on any feature phone
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className={`bg-white/5 border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 scroll-hidden ${pillarsAnimation.isVisible ? 'scroll-visible stagger-2' : ''}`}>
              <CardHeader>
                <Users2 className="h-10 w-10 text-white/80 mb-4" />
                <CardTitle className="text-xl text-white font-medium">Operate AI</CardTitle>
                <CardDescription className="text-gray-400 font-light">
                  Tools for teams deploying voice programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300 text-sm font-light">
                    <CheckCircle className="mr-2 h-4 w-4 text-white/60" />
                    Real-time dashboards
                  </li>
                  <li className="flex items-center text-gray-300 text-sm font-light">
                    <CheckCircle className="mr-2 h-4 w-4 text-white/60" />
                    Usage + impact metrics
                  </li>
                  <li className="flex items-center text-gray-300 text-sm font-light">
                    <CheckCircle className="mr-2 h-4 w-4 text-white/60" />
                    Compliance-friendly data
                  </li>
                  <li className="flex items-center text-gray-300 text-sm font-light">
                    <CheckCircle className="mr-2 h-4 w-4 text-white/60" />
                    Automated reporting
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className={`bg-white/5 border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 scroll-slide-right ${pillarsAnimation.isVisible ? 'scroll-visible stagger-3' : ''}`}>
              <CardHeader>
                <Rocket className="h-10 w-10 text-white/80 mb-4" />
                <CardTitle className="text-xl text-white font-medium">Scale AI</CardTitle>
                <CardDescription className="text-gray-400 font-light">
                  Built for national and regional outreach
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300 text-sm font-light">
                    <CheckCircle className="mr-2 h-4 w-4 text-white/60" />
                    Offline-first architecture
                  </li>
                  <li className="flex items-center text-gray-300 text-sm font-light">
                    <CheckCircle className="mr-2 h-4 w-4 text-white/60" />
                    Multi-school + multi-district
                  </li>
                  <li className="flex items-center text-gray-300 text-sm font-light">
                    <CheckCircle className="mr-2 h-4 w-4 text-white/60" />
                    Government & NGO integrations
                  </li>
                  <li className="flex items-center text-gray-300 text-sm font-light">
                    <CheckCircle className="mr-2 h-4 w-4 text-white/60" />
                    High-volume telephony
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Voice-AI Programs Section */}
      <section id="products" className="py-24 bg-black">
        <div ref={programsAnimation.ref} className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 scroll-hidden ${programsAnimation.isVisible ? 'scroll-visible' : ''}`}>
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Voice-AI Programs <span className="text-white font-normal">That Work Anywhere</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
              We deliver voice-based programs across sectors — all through a toll-free number.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {programs.map((program, index) => (
              <Card 
                key={index}
                className={`bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300 group overflow-hidden scroll-scale ${programsAnimation.isVisible ? `scroll-visible stagger-${index + 1}` : ''}`}
                data-testid={`program-card-${index}`}
              >
                <CardContent className="p-6">
                  <program.icon className="h-8 w-8 text-white/80 mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">
                    {program.name}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-light">
                    {program.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions for Every Partner */}
      <section id="solutions" className="py-24 bg-gradient-to-b from-black via-gray-950 to-black">
        <div ref={partnersAnimation.ref} className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 scroll-hidden ${partnersAnimation.isVisible ? 'scroll-visible' : ''}`}>
            <h2 className="text-4xl md:text-5xl font-light mb-4">
              Solutions for <span className="text-white font-normal">Every Partner</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className={`bg-white/5 border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 scroll-slide-left ${partnersAnimation.isVisible ? 'scroll-visible stagger-1' : ''}`}>
              <CardHeader>
                <Users className="h-10 w-10 text-white/70 mb-4" />
                <CardTitle className="text-xl text-white font-medium">For Students & Citizens</CardTitle>
                <CardDescription className="text-gray-400 font-light">
                  Access learning through simple phone calls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start text-gray-300 text-sm font-light">
                    <CheckCircle className="mr-2 h-4 w-4 text-white/50 mt-0.5" />
                    <span>Personalized conversations</span>
                  </li>
                  <li className="flex items-start text-gray-300 text-sm font-light">
                    <CheckCircle className="mr-2 h-4 w-4 text-white/50 mt-0.5" />
                    <span>Local language + accent support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className={`bg-white/5 border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 scroll-hidden ${partnersAnimation.isVisible ? 'scroll-visible stagger-2' : ''}`}>
              <CardHeader>
                <School className="h-10 w-10 text-white/70 mb-4" />
                <CardTitle className="text-xl text-white font-medium">For Schools</CardTitle>
                <CardDescription className="text-gray-400 font-light">
                  Offline learning experiences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start text-gray-300 text-sm font-light">
                    <CheckCircle className="mr-2 h-4 w-4 text-white/50 mt-0.5" />
                    <span>Usage-based analytics</span>
                  </li>
                  <li className="flex items-start text-gray-300 text-sm font-light">
                    <CheckCircle className="mr-2 h-4 w-4 text-white/50 mt-0.5" />
                    <span>Multi-classroom support</span>
                  </li>
                  <li className="flex items-start text-gray-300 text-sm font-light">
                    <CheckCircle className="mr-2 h-4 w-4 text-white/50 mt-0.5" />
                    <span>Dashboard for teachers</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className={`bg-white/5 border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 scroll-slide-right ${partnersAnimation.isVisible ? 'scroll-visible stagger-3' : ''}`}>
              <CardHeader>
                <Building className="h-10 w-10 text-white/70 mb-4" />
                <CardTitle className="text-xl text-white font-medium">For Governments & NGOs</CardTitle>
                <CardDescription className="text-gray-400 font-light">
                  National-scale voice outreach
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start text-gray-300 text-sm font-light">
                    <CheckCircle className="mr-2 h-4 w-4 text-white/50 mt-0.5" />
                    <span>Health, civic, education programs</span>
                  </li>
                  <li className="flex items-start text-gray-300 text-sm font-light">
                    <CheckCircle className="mr-2 h-4 w-4 text-white/50 mt-0.5" />
                    <span>Data for audits and reporting</span>
                  </li>
                  <li className="flex items-start text-gray-300 text-sm font-light">
                    <CheckCircle className="mr-2 h-4 w-4 text-white/50 mt-0.5" />
                    <span>Secure + compliant deployments</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Research & Innovation */}
      <section id="research" className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/37zwJuI8hSs?autoplay=1&mute=1&loop=1&playlist=37zwJuI8hSs&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&vq=hd2160&disablekb=1&fs=0&iv_load_policy=3"
            title="Research & Innovation Background"
            allow="autoplay; encrypted-media"
            style={{ pointerEvents: 'none' }}
          />
        </div>
        
        <div className="absolute inset-0 bg-black/70"></div>
        
        <div ref={researchAnimation.ref} className="relative max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 scroll-hidden ${researchAnimation.isVisible ? 'scroll-visible' : ''}`}>
            <h2 className="text-4xl md:text-5xl font-light mb-4">
              Research & <span className="bg-gradient-to-r from-cyan-300 to-sky-200 bg-clip-text text-transparent">Innovation</span>
            </h2>
            <p className="text-lg text-gray-300 font-light">
              We build AI optimized for offline environments and underserved communities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Card className={`bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm scroll-scale ${researchAnimation.isVisible ? 'scroll-visible stagger-1' : ''}`}>
              <CardHeader>
                <FlaskConical className="h-8 w-8 text-cyan-300/80 mb-2" />
                <CardTitle className="text-white font-medium">Voice-AI Infrastructure Lab</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm font-light">
                  Low-latency voice interactions for limited connectivity.
                </p>
              </CardContent>
            </Card>

            <Card className={`bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm scroll-scale ${researchAnimation.isVisible ? 'scroll-visible stagger-2' : ''}`}>
              <CardHeader>
                <Globe className="h-8 w-8 text-cyan-300/80 mb-2" />
                <CardTitle className="text-white font-medium">Localizable AI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm font-light">
                  Systems tuned for African accents and contexts.
                </p>
              </CardContent>
            </Card>

            <Card className={`bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm scroll-scale ${researchAnimation.isVisible ? 'scroll-visible stagger-3' : ''}`}>
              <CardHeader>
                <Lightbulb className="h-8 w-8 text-cyan-300/80 mb-2" />
                <CardTitle className="text-white font-medium">Adaptive Models</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm font-light">
                  AI that adjusts to responses in real time.
                </p>
              </CardContent>
            </Card>

            <Card className={`bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm scroll-scale ${researchAnimation.isVisible ? 'scroll-visible stagger-4' : ''}`}>
              <CardHeader>
                <GraduationCap className="h-8 w-8 text-cyan-300/80 mb-2" />
                <CardTitle className="text-white font-medium">Academic Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm font-light">
                  Collaborating with universities to scale impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section id="partners" className="py-16 bg-white">
        <div ref={trustAnimation.ref} className="max-w-7xl mx-auto px-6">
          <h3 className={`text-center text-black mb-12 uppercase tracking-widest text-sm font-medium scroll-hidden ${trustAnimation.isVisible ? 'scroll-visible' : ''}`}>
            Trusted by Institutions Across Africa and the US
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-8 items-center justify-items-center">
            {trustLogos.map((logo, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-center scroll-scale ${trustAnimation.isVisible ? `scroll-visible stagger-${index + 1}` : ''}`}
              >
                <img 
                  src={logo.src} 
                  alt={logo.alt}
                  className="h-10 md:h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  data-testid={`logo-${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section id="contact" className="py-24 bg-black relative overflow-hidden">
        <div ref={ctaAnimation.ref} className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className={`text-4xl md:text-5xl font-light mb-6 scroll-hidden ${ctaAnimation.isVisible ? 'scroll-visible' : ''}`}>
            Bring Offline Voice-AI to Your
            <span className="block bg-gradient-to-r from-cyan-300 to-sky-200 bg-clip-text text-transparent">School, District, or Organization</span>
          </h2>
          <p className={`text-lg text-gray-400 mb-8 max-w-2xl mx-auto font-light scroll-fade-in ${ctaAnimation.isVisible ? 'scroll-visible stagger-2' : ''}`}>
            Bakame helps governments, NGOs, and schools deliver programs directly to offline communities — through the phones people already own.
          </p>
          <div className="mb-8">
            <Badge className="bg-white/10 text-gray-300 border-white/20 px-6 py-2 text-sm font-light">
              <Building className="mr-2 h-4 w-4" />
              Custom pricing for national, regional, and NGO partners
            </Badge>
          </div>
          
          <p className="text-gray-500 font-light">
            Contact us at{' '}
            <a href="mailto:sales@bakame.org" className="text-white hover:text-cyan-300 transition-colors" data-testid="link-email">
              sales@bakame.org
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-[1fr_auto] gap-8 mb-8">
            <div>
              <p className="text-sm text-gray-500 mb-3 max-w-md font-light">
                AI-powered outreach for the offline world.
              </p>
              <div className="flex">
                <Badge className="bg-white/5 text-gray-400 border-white/10 text-xs font-light">
                  <Award className="mr-1 h-3 w-3" />
                  CREATE Award 2025
                </Badge>
              </div>
            </div>
            
            <div className="md:text-right">
              <h3 className="text-white font-medium mb-3 text-sm">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy" className="text-gray-500 hover:text-white text-sm font-light transition-colors" data-testid="link-privacy">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-500 hover:text-white text-sm font-light transition-colors" data-testid="link-terms">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8">
            <p className="text-center text-gray-600 text-sm font-light">
              © 2025 Bakame AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <EarlyAccessModal 
        isOpen={isEarlyAccessOpen} 
        onClose={() => setIsEarlyAccessOpen(false)} 
      />
      
      <FloatingVoiceButton agentId="agent_0301k3y6dwrve63sb37n6f4ffkrj" triggerSectionId="partners" />
    </div>
  );
};

export default Index;
