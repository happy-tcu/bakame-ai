import { useState } from 'react';
import { 
  Users, CheckCircle, GraduationCap, Brain, Building,
  Rocket, Users2, School, FlaskConical, Globe, Lightbulb,
  Heart, Vote, Radio
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import EarlyAccessModal from '@/components/EarlyAccessModal';
import FloatingVoiceButton from '@/components/FloatingVoiceButton';
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
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <HeroSection onGetStarted={() => setIsEarlyAccessOpen(true)} />

      {/* Three Pillars of Offline Voice-AI Infrastructure */}
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
        
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80"></div>
        
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div ref={pillarsAnimation.ref} className="relative max-w-7xl mx-auto px-6">
          <h2 className={`text-5xl font-bold text-center mb-16 drop-shadow-2xl scroll-hidden ${pillarsAnimation.isVisible ? 'scroll-visible' : ''}`}>
            Three Pillars of <span className="text-white font-extrabold">Offline Voice-AI Infrastructure</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className={`bg-white/5 border-white/20 hover-depth backdrop-blur-sm scroll-slide-left ${pillarsAnimation.isVisible ? 'scroll-visible stagger-1' : ''}`}>
              <CardHeader>
                <Brain className="h-12 w-12 text-white mb-4" />
                <CardTitle className="text-2xl text-white">Learn AI</CardTitle>
                <CardDescription className="text-gray-400">
                  Voice-based programs delivered through basic phone calls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Personalized conversations
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    &lt;4s response time
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Localizable + accent-aware
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Works on any feature phone
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className={`bg-white/5 border-white/20 hover-depth backdrop-blur-sm scroll-hidden ${pillarsAnimation.isVisible ? 'scroll-visible stagger-2' : ''}`}>
              <CardHeader>
                <Users2 className="h-12 w-12 text-white mb-4" />
                <CardTitle className="text-2xl text-white">Operate AI</CardTitle>
                <CardDescription className="text-gray-400">
                  Tools for teams deploying voice programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Real-time dashboards
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Usage + impact metrics
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Compliance-friendly data
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Automated reporting
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className={`bg-white/5 border-white/20 hover-depth backdrop-blur-sm scroll-slide-right ${pillarsAnimation.isVisible ? 'scroll-visible stagger-3' : ''}`}>
              <CardHeader>
                <Rocket className="h-12 w-12 text-white mb-4" />
                <CardTitle className="text-2xl text-white">Scale AI</CardTitle>
                <CardDescription className="text-gray-400">
                  Built for national and regional outreach
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Offline-first architecture
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Multi-school + multi-district support
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Government & NGO integrations
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    High-volume telephony pipelines
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Voice-AI Programs Section */}
      <section className="py-24 bg-black">
        <div ref={programsAnimation.ref} className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 scroll-hidden ${programsAnimation.isVisible ? 'scroll-visible' : ''}`}>
            <h2 className="text-5xl font-bold mb-6">
              Voice-AI Programs <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-extrabold">That Work Anywhere</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              We deliver voice-based programs across sectors — all through a toll-free number.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {programs.map((program, index) => (
              <Card 
                key={index}
                className={`bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300 hover-depth group overflow-hidden scroll-scale ${programsAnimation.isVisible ? `scroll-visible stagger-${index + 1}` : ''}`}
                data-testid={`program-card-${index}`}
              >
                <CardContent className="p-8">
                  <program.icon className="h-10 w-10 text-white mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {program.name}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {program.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions for Every Partner */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div ref={partnersAnimation.ref} className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 scroll-hidden ${partnersAnimation.isVisible ? 'scroll-visible' : ''}`}>
            <h2 className="text-5xl font-bold mb-4">
              Solutions for <span className="text-white font-extrabold">Every Partner</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className={`bg-white/5 border-white/20 hover-depth backdrop-blur-sm scroll-slide-left ${partnersAnimation.isVisible ? 'scroll-visible stagger-1' : ''}`}>
              <CardHeader>
                <Users className="h-12 w-12 text-gray-400 mb-4" />
                <CardTitle className="text-2xl text-white">For Students & Citizens</CardTitle>
                <CardDescription className="text-gray-400">
                  Access learning and information through simple phone calls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Personalized conversations</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Local language + accent support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className={`bg-white/5 border-white/20 hover-depth backdrop-blur-sm scroll-hidden ${partnersAnimation.isVisible ? 'scroll-visible stagger-2' : ''}`}>
              <CardHeader>
                <School className="h-12 w-12 text-gray-400 mb-4" />
                <CardTitle className="text-2xl text-white">For Schools</CardTitle>
                <CardDescription className="text-gray-400">
                  Offline learning experiences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Usage-based analytics</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Multi-classroom support</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Dashboard for teachers & administrators</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className={`bg-white/5 border-white/20 hover-depth backdrop-blur-sm scroll-slide-right ${partnersAnimation.isVisible ? 'scroll-visible stagger-3' : ''}`}>
              <CardHeader>
                <Building className="h-12 w-12 text-gray-400 mb-4" />
                <CardTitle className="text-2xl text-white">For Governments & NGOs</CardTitle>
                <CardDescription className="text-gray-400">
                  National-scale voice outreach
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Health, civic, and education programs</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Data for audits and reporting</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Secure deployments + compliance tools</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Research & Innovation */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/37zwJuI8hSs?autoplay=1&mute=1&loop=1&playlist=37zwJuI8hSs&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&vq=hd2160&disablekb=1&fs=0&iv_load_policy=3"
            title="Research & Innovation Background"
            allow="autoplay; encrypted-media"
            style={{ pointerEvents: 'none' }}
          />
        </div>
        
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80"></div>
        
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div ref={researchAnimation.ref} className="relative max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 scroll-hidden ${researchAnimation.isVisible ? 'scroll-visible' : ''}`}>
            <h2 className="text-5xl font-bold mb-4 drop-shadow-2xl">
              Research & <span className="text-[#4c9dff]">Innovation</span>
            </h2>
            <p className="text-xl text-gray-200 drop-shadow-lg">
              We build AI optimized for offline environments and underserved communities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <Card className={`bg-white/5 border-white/10 hover:bg-white/10 transition-all hover-depth backdrop-blur-sm scroll-scale ${researchAnimation.isVisible ? 'scroll-visible stagger-1' : ''}`}>
              <CardHeader>
                <FlaskConical className="h-10 w-10 text-[#4c9dff] mb-2" />
                <CardTitle className="text-white">Voice-AI Infrastructure Lab</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Developing low-latency voice interactions for regions with limited connectivity.
                </p>
              </CardContent>
            </Card>

            <Card className={`bg-white/5 border-white/10 hover:bg-white/10 transition-all hover-depth backdrop-blur-sm scroll-scale ${researchAnimation.isVisible ? 'scroll-visible stagger-2' : ''}`}>
              <CardHeader>
                <Globe className="h-10 w-10 text-[#4c9dff] mb-2" />
                <CardTitle className="text-white">Localizable AI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Systems tuned for African accents, environments, and learning contexts.
                </p>
              </CardContent>
            </Card>

            <Card className={`bg-white/5 border-white/10 hover:bg-white/10 transition-all hover-depth backdrop-blur-sm scroll-scale ${researchAnimation.isVisible ? 'scroll-visible stagger-3' : ''}`}>
              <CardHeader>
                <Lightbulb className="h-10 w-10 text-[#4c9dff] mb-2" />
                <CardTitle className="text-white">Adaptive Interaction Models</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  AI that adjusts to user responses in real time — even over basic phone lines.
                </p>
              </CardContent>
            </Card>

            <Card className={`bg-white/5 border-white/10 hover:bg-white/10 transition-all hover-depth backdrop-blur-sm scroll-scale ${researchAnimation.isVisible ? 'scroll-visible stagger-4' : ''}`}>
              <CardHeader>
                <GraduationCap className="h-10 w-10 text-[#4c9dff] mb-2" />
                <CardTitle className="text-white">Academic + Government Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Collaborating with universities and public agencies to validate and scale impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section id="trust-section" className="py-16 bg-white">
        <div ref={trustAnimation.ref} className="max-w-7xl mx-auto px-6">
          <h3 className={`text-center text-black mb-12 uppercase tracking-wider text-xl md:text-2xl font-semibold scroll-hidden ${trustAnimation.isVisible ? 'scroll-visible' : ''}`}>
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
                  className="h-12 md:h-16 w-auto object-contain"
                  data-testid={`logo-${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern"></div>
        <div ref={ctaAnimation.ref} className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 scroll-hidden ${ctaAnimation.isVisible ? 'scroll-visible' : ''}`}>
            Bring Offline Voice-AI to Your
            <span className="block text-[#4c9dff]">School, District, or Organization</span>
          </h2>
          <p className={`text-xl text-gray-300 mb-8 max-w-3xl mx-auto scroll-fade-in ${ctaAnimation.isVisible ? 'scroll-visible stagger-2' : ''}`}>
            Bakame helps governments, NGOs, and schools deliver programs directly to offline communities — through the phones people already own.
          </p>
          <div className="mb-8">
            <Badge className="bg-blue-600/20 text-blue-300 border-blue-600/30 px-6 py-2 text-sm">
              <Building className="mr-2 h-4 w-4" />
              Custom pricing for national, regional, and NGO partners
            </Badge>
          </div>
          
          <p className="text-gray-400">
            Contact us at{' '}
            <a href="mailto:sales@bakame.org" className="text-blue-400 hover:text-blue-300" data-testid="link-email">
              sales@bakame.org
            </a>
          </p>
        </div>
      </section>

      <Footer />

      <EarlyAccessModal 
        isOpen={isEarlyAccessOpen} 
        onClose={() => setIsEarlyAccessOpen(false)} 
      />
      
      <FloatingVoiceButton agentId="agent_0301k3y6dwrve63sb37n6f4ffkrj" triggerSectionId="trust-section" />
    </div>
  );
};

export default Index;
