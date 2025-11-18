import React, { useState, useEffect } from 'react';
import { 
  Users, CheckCircle, GraduationCap, Brain, Building, Award,
  Rocket, Users2, School, Lightbulb, FlaskConical, 
  GraduationCap as GradCap, Star, MicVocal, MessageCircle,
  Podcast, FileText, Mic, WifiOff
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
import privacyPolicyPdf from '../../attached_assets/Bakame AI Privacy Policy_1763450785833.pdf';
import dpaPdf from '../../attached_assets/Bakame AI Data Processing Agreement (DPA)_1763450778716.pdf';
import subprocessorsPdf from '../../attached_assets/Bakame AI — List of Subprocessors_1763450775731.pdf';

const Index = () => {
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const heroPlayerRef = React.useRef<any>(null);

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
    // Load ElevenLabs Conversational AI widget script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    // Guard against re-initialization
    if (heroPlayerRef.current) return;

    // Load YouTube IFrame API if not already loaded
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Initialize player when API is ready
    const initPlayer = () => {
      if (heroPlayerRef.current) return;
      
      const element = document.getElementById('hero-video');
      if (!element) {
        console.warn('Hero video element not found');
        return;
      }

      try {
        heroPlayerRef.current = new (window as any).YT.Player('hero-video', {
          videoId: '-A32bZkp7GA',
          playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: '-A32bZkp7GA',
            controls: 0,
            showinfo: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
          },
          events: {
            onReady: (event: any) => {
              try {
                event.target.mute();
                event.target.setPlaybackRate(0.75); // Slow down to 75% speed
                event.target.playVideo();
              } catch (error) {
                console.error('Error setting playback rate:', error);
              }
            },
            onError: (event: any) => {
              console.error('YouTube Player Error:', event.data);
            },
          },
        });
      } catch (error) {
        console.error('Error initializing YouTube Player:', error);
      }
    };

    // Delay initialization to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      if ((window as any).YT && (window as any).YT.Player) {
        initPlayer();
      } else {
        (window as any).onYouTubeIframeAPIReady = initPlayer;
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  const features = [
    { icon: MicVocal, name: 'Subject Convos', description: 'Personalized AI voice tutoring' },
    { icon: MessageCircle, name: 'AI Debate Partner', description: 'Practice argumentation skills' },
    { icon: Podcast, name: 'Podcast Generator', description: 'Create custom learning content' },
    { icon: FileText, name: 'Document Intelligence', description: 'Smart content analysis' },
    { icon: Mic, name: 'Voice Journal', description: 'Audio practice diary' },
    { icon: WifiOff, name: 'Offline Learning', description: 'Works without internet' },
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

      {/* Hero Section with YouTube Video Background */}
      <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div
            id="hero-video"
            className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
            style={{ pointerEvents: 'none' }}
          />
        </div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl text-white">
            Empowering School Districts with Offline-AI
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-lg">
            We are Dallas-based start-up specializing in developing cool AI tools and integrations for remote schools in Africa.
          </p>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-black border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-center text-gray-400 mb-8 uppercase tracking-wider">
            Trusted by Schools and Institutions Across Africa and the US
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

      {/* Core Capabilities Grid */}
      <section className="py-24 bg-black relative overflow-hidden">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/f4Lzbqu1z-k?autoplay=1&mute=1&loop=1&playlist=f4Lzbqu1z-k&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&vq=hd2160&disablekb=1&fs=0&iv_load_policy=3"
            title="Three Pillars Background"
            allow="autoplay; encrypted-media"
            style={{ pointerEvents: 'none' }}
          />
        </div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80"></div>
        
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 drop-shadow-2xl">
            Three Pillars of <span className="text-white font-extrabold">Language Mastery</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/20 hover-depth backdrop-blur-sm">
              <CardHeader>
                <Brain className="h-12 w-12 text-white mb-4" />
                <CardTitle className="text-2xl text-white">Learn AI</CardTitle>
                <CardDescription className="text-gray-400">
                  Voice-first learning features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Personalized AI conversations
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Real-time pronunciation feedback
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Adaptive difficulty levels
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/20 hover-depth backdrop-blur-sm">
              <CardHeader>
                <Users2 className="h-12 w-12 text-white mb-4" />
                <CardTitle className="text-2xl text-white">Teach AI</CardTitle>
                <CardDescription className="text-gray-400">
                  Teacher empowerment tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Student progress analytics
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Curriculum alignment tools
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Automated assessment reports
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/20 hover-depth backdrop-blur-sm">
              <CardHeader>
                <Rocket className="h-12 w-12 text-white mb-4" />
                <CardTitle className="text-2xl text-white">Scale AI</CardTitle>
                <CardDescription className="text-gray-400">
                  School-wide deployment
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
                    Multi-classroom support
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Administrative dashboard
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              Features & <span className="text-white font-extrabold">Integrations</span>
            </h2>
            <p className="text-xl text-gray-400">
              Tools your students need to gain the command of English Language
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover-depth"
              >
                <CardContent className="p-6">
                  <feature.icon className="h-10 w-10 text-white mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions by Role */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              Tailored Solutions <span className="text-white font-extrabold">for Everyone</span>
            </h2>
            <p className="text-xl text-gray-400">
              Designed for every stakeholder in the education ecosystem
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/20 hover-depth backdrop-blur-sm">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-gray-400 mb-4" />
                <CardTitle className="text-2xl text-white">For Students</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>24/7 AI tutoring support</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Gamified learning experience</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Personalized learning paths</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Safe practice environment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/20 hover-depth backdrop-blur-sm">
              <CardHeader>
                <Users className="h-12 w-12 text-gray-400 mb-4" />
                <CardTitle className="text-2xl text-white">For Teachers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Real-time progress tracking</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Automated grading system</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Custom lesson creation</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Class performance analytics</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/20 hover-depth backdrop-blur-sm">
              <CardHeader>
                <School className="h-12 w-12 text-gray-400 mb-4" />
                <CardTitle className="text-2xl text-white">For Schools</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>School-wide deployment</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Administrative controls</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>ROI & impact metrics</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Training & support included</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Research & Innovation */}
      <section className="py-24 bg-black relative overflow-hidden">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/37zwJuI8hSs?autoplay=1&mute=1&loop=1&playlist=37zwJuI8hSs&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&vq=hd2160&disablekb=1&fs=0&iv_load_policy=3"
            title="Research & Innovation Background"
            allow="autoplay; encrypted-media"
            style={{ pointerEvents: 'none' }}
          />
        </div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80"></div>
        
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 drop-shadow-2xl">
              Research & <span className="text-[#4c9dff]">Innovation</span>
            </h2>
            <p className="text-xl text-gray-200 drop-shadow-lg">
              Advancing the frontier of AI-powered education
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all hover-depth backdrop-blur-sm">
              <CardHeader>
                <FlaskConical className="h-10 w-10 text-[#4c9dff] mb-2" />
                <CardTitle className="text-white">AI Research Lab</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Pioneering natural language processing models optimized for African languages and accents.
                </p>
                <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">
                  Active Research
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all hover-depth backdrop-blur-sm">
              <CardHeader>
                <Lightbulb className="h-10 w-10 text-[#4c9dff] mb-2" />
                <CardTitle className="text-white">Learning Breakthroughs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Developing adaptive learning algorithms that personalize to each student's unique needs.
                </p>
                <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">
                  Patent Pending
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all hover-depth backdrop-blur-sm">
              <CardHeader>
                <GradCap className="h-10 w-10 text-[#4c9dff] mb-2" />
                <CardTitle className="text-white">Academic Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Collaborating with leading universities to validate and improve our methodologies.
                </p>
                <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">
                  5+ Universities
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call-to-Action Footer Section */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Transform Your School's
            <span className="block text-[#4c9dff]">English Program</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the force of school districts revolutionizing language education with AI. 
            Students own their learning, and instructors notice real-time results.
          </p>
          <div className="mb-8">
            <Badge className="bg-blue-600/20 text-blue-300 border-blue-600/30 px-6 py-2 text-sm">
              <Building className="mr-2 h-4 w-4" />
              Custom pricing tailored for NGOs
            </Badge>
          </div>
          
          <p className="text-gray-400">
            Or contact our NGO sales team at{' '}
            <a href="mailto:sales@bakame.org" className="text-gray-400 hover:text-gray-300">
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
                Revolutionizing English education across Africa with AI-powered learning that works everywhere.
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
                  <a 
                    href={subprocessorsPdf} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                    data-testid="link-subprocessors"
                  >
                    Subprocessors
                  </a>
                </li>
                <li>
                  <a 
                    href={privacyPolicyPdf} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                    data-testid="link-privacy-policy"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a 
                    href={dpaPdf} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                    data-testid="link-dpa"
                  >
                    DPA
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8">
            <p className="text-gray-500 text-sm">
              © 2025 Bakame AI. All rights reserved. Building the future of education in Africa.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
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