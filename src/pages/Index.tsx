import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Building, Shield, Users, Zap, Globe, Heart, Star, ChevronRight } from "lucide-react";
import { VideoModal } from "@/components/VideoModal";
import { useAnalytics } from "@/hooks/useAnalytics";
import { WaitlistForm } from "@/components/forms/WaitlistForm";

const Index = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { trackButtonClick } = useAnalytics();

  const testimonials = [
    {
      quote: "Bakame AI has revolutionized our approach to education. The offline capabilities are a game-changer for our remote schools.",
      author: "Jean D'Arc, Education Director",
      organization: "Rwanda Education Board"
    },
    {
      quote: "The enterprise solutions provided by Bakame AI have streamlined our operations and improved communication across our teams.",
      author: "Nadia Uwamahoro, CEO",
      organization: "Kigali Tech Solutions"
    },
    {
      quote: "Bakame AI's government solutions have enabled us to connect with citizens in ways we never thought possible. The impact is truly transformative.",
      author: "Patrick Nkurunziza, Government Official",
      organization: "Ministry of ICT and Innovation"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSolutionClick = (solution: string) => {
    trackButtonClick(`solution_${solution}`);
    navigate(`/solutions/${solution}`);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 md:p-8 border-b border-white/10 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">Bakame Ai</div>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="/blog" className="text-white/70 hover:text-white transition-colors hover:scale-105 transform duration-200">Blog</a>
          <a href="/resources" className="text-white/70 hover:text-white transition-colors hover:scale-105 transform duration-200">Resources</a>
          <a href="/team" className="text-white/70 hover:text-white transition-colors hover:scale-105 transform duration-200">Team</a>
          <a href="/signup" className="text-white/70 hover:text-white transition-colors hover:scale-105 transform duration-200">Sign In</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 px-6 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl animate-pulse"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-fade-in">
            Revolutionizing Communication with Offline-First IVR
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto animate-fade-in">
            Bakame AI provides cutting-edge IVR solutions that work seamlessly offline, ensuring reliable communication in any environment.
          </p>
          <div className="mt-12 flex justify-center gap-4 animate-fade-in">
            <button 
              onClick={() => {
                trackButtonClick('watch_demo_hero');
                setShowVideo(true);
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
            >
              Watch Demo
            </button>
            <button 
              onClick={() => {
                trackButtonClick('get_started_hero');
                navigate('/signup');
              }}
              className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/60"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Solutions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Education",
                description: "Empowering educational institutions with offline-first IVR systems that work in any environment.",
                icon: BookOpen,
                color: "blue"
              },
              {
                title: "Enterprise",
                description: "Streamlining business operations with reliable communication solutions for internal and external stakeholders.",
                icon: Building,
                color: "purple"
              },
              {
                title: "Government",
                description: "Connecting governments with citizens through accessible and secure communication channels.",
                icon: Shield,
                color: "green"
              }
            ].map((solution, index) => (
              <div 
                key={index}
                className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer`}
                onClick={() => handleSolutionClick(solution.title.toLowerCase())}
              >
                <div className={`w-12 h-12 bg-${solution.color}-500/20 rounded-lg flex items-center justify-center mb-4 transition-all duration-300`}>
                  <solution.icon className={`w-6 h-6 text-${solution.color}-400`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                <p className="text-white/70">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Offline-First Technology",
                description: "Our IVR systems are designed to work seamlessly offline, ensuring reliable communication in areas with limited connectivity.",
                icon: Wifi,
                color: "blue"
              },
              {
                title: "Multi-Language Support",
                description: "We support multiple languages, making our solutions accessible to diverse communities.",
                icon: Globe,
                color: "purple"
              },
              {
                title: "Secure Communication",
                description: "We prioritize the security of your data and communications, ensuring confidentiality and compliance.",
                icon: Shield,
                color: "green"
              },
              {
                title: "Customizable Solutions",
                description: "Our IVR systems can be tailored to meet the specific needs of your organization.",
                icon: Zap,
                color: "yellow"
              },
              {
                title: "User-Friendly Interface",
                description: "Our solutions are designed to be intuitive and easy to use, minimizing training time and maximizing efficiency.",
                icon: Users,
                color: "red"
              },
              {
                title: "24/7 Support",
                description: "Our dedicated support team is available around the clock to assist you with any issues.",
                icon: Heart,
                color: "pink"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105`}
              >
                <div className={`w-12 h-12 bg-${feature.color}-500/20 rounded-lg flex items-center justify-center mb-4 transition-all duration-300`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Testimonials</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <Star className="w-6 h-6 text-yellow-400 mb-4 mx-auto" />
              <p className="text-white/80 text-xl italic mb-4">
                "{testimonials[currentTestimonial].quote}"
              </p>
              <p className="text-white/60">
                - {testimonials[currentTestimonial].author}, {testimonials[currentTestimonial].organization}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section with Waitlist */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Join the waitlist to be among the first to experience Bakame AI's revolutionary offline-first IVR solutions.
              </p>
              
              {/* Waitlist Form */}
              <div className="max-w-md mx-auto mb-8">
                <WaitlistForm compact />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => {
                    trackButtonClick('get_started_main');
                    navigate('/signup');
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button 
                  onClick={() => {
                    trackButtonClick('learn_more_main');
                    setShowVideo(true);
                  }}
                  className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/60"
                >
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="container mx-auto text-center">
          <p className="text-white/60">
            &copy; {new Date().getFullYear()} Bakame Ai. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Video Modal */}
      <VideoModal show={showVideo} setShow={setShowVideo} videoId="your_youtube_video_id" />
    </div>
  );
};

export default Index;
