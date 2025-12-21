import { useState } from 'react';
import { 
  Users, CheckCircle, GraduationCap, Brain, Building,
  Rocket, Users2, School, FlaskConical, Globe, Lightbulb, Award,
  Heart, Vote, Radio
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import EarlyAccessModal from '@/components/EarlyAccessModal';
import FloatingVoiceButton from '@/components/FloatingVoiceButton';
import AnimatedSection from '@/components/AnimatedSection';
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
      description: 'AI-powered lessons, quizzes, and speaking practice for students in offline areas.'
    },
    { 
      icon: Vote, 
      name: 'Civic Programs', 
      description: 'Engagement tools for voter education, local governance, and public information.'
    },
    { 
      icon: Heart, 
      name: 'Health Programs', 
      description: 'Voice-based health guidance, wellness check-ins, and awareness campaigns.'
    },
    { 
      icon: Radio, 
      name: 'Public Information Services', 
      description: 'Weather alerts, safety updates, agriculture tips, and remote community messaging.'
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
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section - Blocky Black & White */}
      <section className="min-h-screen flex items-center justify-center bg-foreground text-background relative">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
          <div className="border-4 border-background p-12 md:p-20">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1.1] uppercase tracking-tight">
              The First Voice-AI Platform for Offline Programs
            </h1>
            
            <p className="text-lg md:text-xl max-w-3xl mb-6 font-medium">
              AI that delivers learning, health, and civic content through simple phone calls — no internet required.
            </p>
            
            <p className="text-base md:text-lg max-w-2xl opacity-80">
              We build offline-native voice infrastructure for schools, governments, and NGOs to reach communities that traditional digital services cannot.
            </p>
          </div>
        </div>
      </section>

      {/* Three Pillars - Blocky Cards */}
      <section className="py-24 bg-background border-b-4 border-foreground">
        <div ref={pillarsAnimation.ref} className="max-w-7xl mx-auto px-6">
          <div className="border-4 border-foreground p-8 mb-16">
            <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight scroll-hidden ${pillarsAnimation.isVisible ? 'scroll-visible' : ''}`}>
              Three Pillars of Offline Voice-AI Infrastructure
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-0">
            <div className={`border-4 border-foreground p-8 hover-depth scroll-slide-left ${pillarsAnimation.isVisible ? 'scroll-visible stagger-1' : ''}`}>
              <Brain className="h-16 w-16 mb-6" />
              <h3 className="text-2xl font-black uppercase mb-4">Learn AI</h3>
              <p className="text-muted-foreground mb-6">
                Voice-based programs delivered through basic phone calls
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5" />
                  Personalized conversations
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5" />
                  &lt;4s response time
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5" />
                  Localizable + accent-aware
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5" />
                  Works on any feature phone
                </li>
              </ul>
            </div>

            <div className={`border-4 border-foreground border-l-0 md:border-l-0 p-8 bg-foreground text-background hover-depth scroll-hidden ${pillarsAnimation.isVisible ? 'scroll-visible stagger-2' : ''}`}>
              <Users2 className="h-16 w-16 mb-6" />
              <h3 className="text-2xl font-black uppercase mb-4">Operate AI</h3>
              <p className="opacity-70 mb-6">
                Tools for teams deploying voice programs
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5" />
                  Real-time dashboards
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5" />
                  Usage + impact metrics
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5" />
                  Compliance-friendly data
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5" />
                  Automated reporting
                </li>
              </ul>
            </div>

            <div className={`border-4 border-foreground border-l-0 md:border-l-0 p-8 hover-depth scroll-slide-right ${pillarsAnimation.isVisible ? 'scroll-visible stagger-3' : ''}`}>
              <Rocket className="h-16 w-16 mb-6" />
              <h3 className="text-2xl font-black uppercase mb-4">Scale AI</h3>
              <p className="text-muted-foreground mb-6">
                Built for national and regional outreach
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5" />
                  Offline-first architecture
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5" />
                  Multi-school + multi-district support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5" />
                  Government & NGO integrations
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5" />
                  High-volume telephony pipelines
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Voice-AI Programs Section */}
      <section className="py-24 bg-foreground text-background">
        <div ref={programsAnimation.ref} className="max-w-7xl mx-auto px-6">
          <div className={`mb-16 scroll-hidden ${programsAnimation.isVisible ? 'scroll-visible' : ''}`}>
            <div className="border-4 border-background p-8 inline-block mb-6">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                Voice-AI Programs That Work Anywhere
              </h2>
            </div>
            <p className="text-xl opacity-80 max-w-2xl">
              We deliver voice-based programs across sectors — all through a toll-free number.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0">
            {programs.map((program, index) => (
              <div 
                key={index}
                className={`border-4 border-background ${index > 0 ? 'border-l-0 md:border-l-0' : ''} p-8 hover-depth scroll-scale ${programsAnimation.isVisible ? `scroll-visible stagger-${index + 1}` : ''}`}
                data-testid={`program-card-${index}`}
              >
                <program.icon className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-black uppercase mb-3">
                  {program.name}
                </h3>
                <p className="text-sm opacity-70">
                  {program.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions for Every Partner */}
      <section className="py-24 bg-background border-b-4 border-foreground">
        <div ref={partnersAnimation.ref} className="max-w-7xl mx-auto px-6">
          <div className={`border-4 border-foreground p-8 mb-16 scroll-hidden ${partnersAnimation.isVisible ? 'scroll-visible' : ''}`}>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              Solutions for Every Partner
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-0">
            <div className={`border-4 border-foreground p-8 hover-depth scroll-slide-left ${partnersAnimation.isVisible ? 'scroll-visible stagger-1' : ''}`}>
              <Users className="h-14 w-14 mb-6" />
              <h3 className="text-2xl font-black uppercase mb-4">For Students & Citizens</h3>
              <p className="text-muted-foreground mb-6">
                Access learning and information through simple phone calls
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-5 w-5 mt-0.5" />
                  <span>Personalized conversations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-5 w-5 mt-0.5" />
                  <span>Local language + accent support</span>
                </li>
              </ul>
            </div>

            <div className={`border-4 border-foreground border-l-0 p-8 bg-foreground text-background hover-depth scroll-hidden ${partnersAnimation.isVisible ? 'scroll-visible stagger-2' : ''}`}>
              <School className="h-14 w-14 mb-6" />
              <h3 className="text-2xl font-black uppercase mb-4">For Schools</h3>
              <p className="opacity-70 mb-6">
                Offline learning experiences
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-5 w-5 mt-0.5" />
                  <span>Usage-based analytics</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-5 w-5 mt-0.5" />
                  <span>Multi-classroom support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-5 w-5 mt-0.5" />
                  <span>Dashboard for teachers & administrators</span>
                </li>
              </ul>
            </div>

            <div className={`border-4 border-foreground border-l-0 p-8 hover-depth scroll-slide-right ${partnersAnimation.isVisible ? 'scroll-visible stagger-3' : ''}`}>
              <Building className="h-14 w-14 mb-6" />
              <h3 className="text-2xl font-black uppercase mb-4">For Governments & NGOs</h3>
              <p className="text-muted-foreground mb-6">
                National-scale voice outreach
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-5 w-5 mt-0.5" />
                  <span>Health, civic, and education programs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-5 w-5 mt-0.5" />
                  <span>Data for audits and reporting</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-5 w-5 mt-0.5" />
                  <span>Secure deployments + compliance tools</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Innovation */}
      <section className="py-24 bg-foreground text-background">
        <div ref={researchAnimation.ref} className="max-w-7xl mx-auto px-6">
          <div className={`mb-16 scroll-hidden ${researchAnimation.isVisible ? 'scroll-visible' : ''}`}>
            <div className="border-4 border-background p-8 inline-block mb-6">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                Research & Innovation
              </h2>
            </div>
            <p className="text-xl opacity-80">
              We build AI optimized for offline environments and underserved communities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0">
            <div className={`border-4 border-background p-8 hover-depth scroll-scale ${researchAnimation.isVisible ? 'scroll-visible stagger-1' : ''}`}>
              <FlaskConical className="h-12 w-12 mb-4" />
              <h3 className="text-lg font-black uppercase mb-3">Voice-AI Infrastructure Lab</h3>
              <p className="text-sm opacity-70">
                Developing low-latency voice interactions for regions with limited connectivity.
              </p>
            </div>

            <div className={`border-4 border-background border-l-0 p-8 bg-background text-foreground hover-depth scroll-scale ${researchAnimation.isVisible ? 'scroll-visible stagger-2' : ''}`}>
              <Globe className="h-12 w-12 mb-4" />
              <h3 className="text-lg font-black uppercase mb-3">Localizable AI</h3>
              <p className="text-sm text-muted-foreground">
                Systems tuned for African accents, environments, and learning contexts.
              </p>
            </div>

            <div className={`border-4 border-background border-l-0 p-8 hover-depth scroll-scale ${researchAnimation.isVisible ? 'scroll-visible stagger-3' : ''}`}>
              <Lightbulb className="h-12 w-12 mb-4" />
              <h3 className="text-lg font-black uppercase mb-3">Adaptive Interaction Models</h3>
              <p className="text-sm opacity-70">
                AI that adjusts to user responses in real time — even over basic phone lines.
              </p>
            </div>

            <div className={`border-4 border-background border-l-0 p-8 bg-background text-foreground hover-depth scroll-scale ${researchAnimation.isVisible ? 'scroll-visible stagger-4' : ''}`}>
              <GraduationCap className="h-12 w-12 mb-4" />
              <h3 className="text-lg font-black uppercase mb-3">Academic + Government Partnerships</h3>
              <p className="text-sm text-muted-foreground">
                Collaborating with universities and public agencies to validate and scale impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section id="trust-section" className="py-20 bg-background border-b-4 border-foreground">
        <div ref={trustAnimation.ref} className="max-w-7xl mx-auto px-6">
          <div className={`border-4 border-foreground p-6 mb-12 scroll-hidden ${trustAnimation.isVisible ? 'scroll-visible' : ''}`}>
            <h3 className="text-center uppercase tracking-widest text-lg md:text-xl font-black">
              Trusted by Institutions Across Africa and the US
            </h3>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-8 items-center justify-items-center">
            {trustLogos.map((logo, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-center scroll-scale ${trustAnimation.isVisible ? `scroll-visible stagger-${index + 1}` : ''}`}
              >
                <img 
                  src={logo.src} 
                  alt={logo.alt}
                  className="h-12 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                  data-testid={`logo-${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-24 bg-foreground text-background">
        <div ref={ctaAnimation.ref} className="max-w-4xl mx-auto px-6">
          <div className="border-4 border-background p-12 md:p-16">
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-8 scroll-hidden ${ctaAnimation.isVisible ? 'scroll-visible' : ''}`}>
              Bring Offline Voice-AI to Your School, District, or Organization
            </h2>
            <p className={`text-xl opacity-80 mb-8 scroll-fade-in ${ctaAnimation.isVisible ? 'scroll-visible stagger-2' : ''}`}>
              Bakame helps governments, NGOs, and schools deliver programs directly to offline communities — through the phones people already own.
            </p>
            <div className="mb-8">
              <span className="inline-block border-2 border-background px-6 py-3 text-sm uppercase tracking-wider font-bold">
                <Building className="inline mr-2 h-4 w-4" />
                Custom pricing for national, regional, and NGO partners
              </span>
            </div>
            
            <p className="opacity-70">
              Contact us at{' '}
              <a 
                href="mailto:sales@bakame.org" 
                className="underline underline-offset-4 hover:opacity-100 transition-opacity font-bold"
                data-testid="link-email"
              >
                sales@bakame.org
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t-4 border-foreground">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-[1fr_auto] gap-8 mb-8">
            <div>
              <p className="text-sm text-muted-foreground mb-4 max-w-md font-medium">
                AI-powered outreach for the offline world.
              </p>
              <div className="inline-block border-2 border-foreground px-4 py-2">
                <Award className="inline mr-2 h-4 w-4" />
                <span className="text-sm font-bold uppercase">CREATE Award 2025</span>
              </div>
            </div>
            
            <div className="md:text-right">
              <h3 className="font-black uppercase mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy" className="text-muted-foreground hover:text-foreground text-sm font-medium underline-offset-4 hover:underline" data-testid="link-privacy">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-muted-foreground hover:text-foreground text-sm font-medium underline-offset-4 hover:underline" data-testid="link-terms">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t-2 border-foreground pt-8">
            <p className="text-center text-muted-foreground text-sm font-medium">
              © 2025 Bakame AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <EarlyAccessModal 
        isOpen={isEarlyAccessOpen} 
        onClose={() => setIsEarlyAccessOpen(false)} 
      />
      
      <FloatingVoiceButton agentId="agent_0301k3y6dwrve63sb37n6f4ffkrj" triggerSectionId="trust-section" />
    </div>
  );
};

export default Index;
