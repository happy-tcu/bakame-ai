import { useState, useEffect } from 'react';
import { 
  Users, CheckCircle, GraduationCap, Brain, Building, Award,
  Rocket, Users2, School, Lightbulb, FlaskConical, 
  Phone, BarChart3, Shield, Globe, Mic, Clock,
  Heart, Vote, Cloud, Radio, Settings, FileCheck
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import EarlyAccessModal from '@/components/EarlyAccessModal';
import chamberLogo from '../../attached_assets/1_1763424292144.png';
import tcu360Logo from '../../attached_assets/2_1763424292144.png';
import tcuResearchLogo from '../../attached_assets/3_1763424292140.png';
import fwrLogo from '../../attached_assets/4_1763424292143.png';
import dallasInnovatesLogo from '../../attached_assets/5_1763424292143.png';
import neeleyLogo from '../../attached_assets/6_1763424292142.png';

const Index = () => {
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

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

  const infrastructureFeatures = [
    { icon: Mic, text: 'AI listens, processes, and responds instantly' },
    { icon: Phone, text: 'Works on basic feature phones' },
    { icon: Cloud, text: 'No mobile data required' },
    { icon: Settings, text: 'Runs on Whisper + GPT + high-reliability TTS' },
    { icon: BarChart3, text: 'All interactions sync to dashboards for admins' },
  ];

  const trustLogos = [
    { src: chamberLogo, alt: "US India Chamber of Commerce Dallas/Fort Worth" },
    { src: tcu360Logo, alt: "TCU 360" },
    { src: tcuResearchLogo, alt: "TCU reSEaRCh Science and Engineering Research Center" },
    { src: fwrLogo, alt: "Fort Worth Report" },
    { src: dallasInnovatesLogo, alt: "Dallas Innovates" },
    { src: neeleyLogo, alt: "TCU Neeley School of Business" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/77GEyS8xfts?autoplay=1&mute=1&loop=1&playlist=77GEyS8xfts&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&vq=hd2160&disablekb=1&fs=0&iv_load_policy=3"
            title="Background video"
            allow="autoplay; encrypted-media"
            style={{ pointerEvents: 'none' }}
          />
        </div>
        
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl text-white">
            The First Voice-AI Platform for Offline Programs
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 max-w-4xl mx-auto drop-shadow-lg mb-4">
            AI that delivers learning, health, and civic content through simple phone calls — no internet required.
          </p>
          
          <p className="text-md md:text-lg text-gray-300 max-w-3xl mx-auto drop-shadow-lg">
            We build offline-native voice infrastructure for schools, governments, and NGOs to reach communities that traditional digital services cannot.
          </p>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-black border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-center text-gray-400 mb-8 uppercase tracking-wider">
            Trusted by Institutions Across Africa and the US
          </h3>
          <div className="relative overflow-hidden">
            <div className="flex space-x-12 marquee">
              {[...trustLogos, ...trustLogos].map((logo, index) => (
                <div key={index} className="flex-shrink-0">
                  <div className="h-16 px-8 py-3 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                    <img 
                      src={logo.src} 
                      alt={logo.alt}
                      className="h-12 w-auto object-contain grayscale brightness-90 hover:brightness-110 transition-all"
                      data-testid={`logo-${index}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
        <div className="relative max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 drop-shadow-2xl">
            Three Pillars of <span className="text-white font-extrabold">Offline Voice-AI Infrastructure</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/20 hover-depth backdrop-blur-sm">
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

            <Card className="bg-white/5 border-white/20 hover-depth backdrop-blur-sm">
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

            <Card className="bg-white/5 border-white/20 hover-depth backdrop-blur-sm">
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
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
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
                className="bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300 hover-depth group overflow-hidden"
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

          {/* Infrastructure Features */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Infrastructure Features</h3>
            <div className="grid md:grid-cols-5 gap-6">
              {infrastructureFeatures.map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <feature.icon className="h-8 w-8 text-blue-400 mb-3" />
                  <p className="text-sm text-gray-300">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions for Every Partner */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              Solutions for <span className="text-white font-extrabold">Every Partner</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/20 hover-depth backdrop-blur-sm">
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

            <Card className="bg-white/5 border-white/20 hover-depth backdrop-blur-sm">
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

            <Card className="bg-white/5 border-white/20 hover-depth backdrop-blur-sm">
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
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 drop-shadow-2xl">
              Research & <span className="text-[#4c9dff]">Innovation</span>
            </h2>
            <p className="text-xl text-gray-200 drop-shadow-lg">
              We build AI optimized for offline environments and underserved communities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all hover-depth backdrop-blur-sm">
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

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all hover-depth backdrop-blur-sm">
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

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all hover-depth backdrop-blur-sm">
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

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all hover-depth backdrop-blur-sm">
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

      {/* Call-to-Action Section */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Bring Offline Voice-AI to Your
            <span className="block text-[#4c9dff]">School, District, or Organization</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
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

      {/* Footer */}
      <footer className="bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-[1fr_auto] gap-8 mb-8">
            <div>
              <p className="text-sm text-gray-400 mb-3 max-w-md">
                AI-powered outreach for the offline world.
              </p>
              <div className="flex">
                <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30 text-xs">
                  <Award className="mr-1 h-3 w-3" />
                  CREATE Award 2025
                </Badge>
              </div>
            </div>
            
            <div className="md:text-right">
              <h3 className="text-white font-semibold mb-3">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy" className="text-gray-400 hover:text-gray-300 text-sm" data-testid="link-privacy">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-400 hover:text-gray-300 text-sm" data-testid="link-terms">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8">
            <p className="text-center text-gray-500 text-sm">
              © 2025 Bakame AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <EarlyAccessModal 
        isOpen={isEarlyAccessOpen} 
        onClose={() => setIsEarlyAccessOpen(false)} 
      />
      
      {/* ElevenLabs Conversational AI */}
      <div dangerouslySetInnerHTML={{ __html: '<elevenlabs-convai agent-id="agent_0301k3y6dwrve63sb37n6f4ffkrj"></elevenlabs-convai>' }} />
    </div>
  );
};

export default Index;
