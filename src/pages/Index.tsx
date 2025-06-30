import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Users, MapPin, BookOpen, Zap, Shield, Mail, Globe, ArrowRight, Check } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Moving gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-white/5 to-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-l from-white/3 to-white/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-white/2 to-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-white/20 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-white/30 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-white/25 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 right-40 w-1 h-1 bg-white/20 rounded-full animate-bounce delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 backdrop-blur-sm bg-black/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-300 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-black font-bold text-sm">🦉</span>
              </div>
              <span className="text-xl font-bold tracking-tight">Bakame AI</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#how-it-works" className="text-gray-400 hover:text-white transition-all duration-300 text-sm font-medium hover:scale-105">How It Works</a>
              <a href="#who-we-serve" className="text-gray-400 hover:text-white transition-all duration-300 text-sm font-medium hover:scale-105">Who We Serve</a>
              <a href="#technology" className="text-gray-400 hover:text-white transition-all duration-300 text-sm font-medium hover:scale-105">Technology</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-all duration-300 text-sm font-medium hover:scale-105">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-32 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-7xl md:text-9xl font-black text-white mb-8 leading-none tracking-tighter">
              Learning by
              <br />
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent animate-pulse">
                Voice
              </span>
            </h1>
            <div className="text-2xl md:text-3xl font-light text-gray-300 mb-4 tracking-wide">
              Powered by AI. Accessible to All.
            </div>
          </div>
          
          <p className="text-xl text-gray-400 mb-16 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in delay-300">
            Delivering education via phone calls — no internet needed. We're bringing English learning and civic services to remote communities across Africa through AI-powered voice technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in delay-500">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 hover:scale-105 transition-all duration-300 px-10 py-6 h-auto text-lg font-semibold rounded-lg shadow-2xl">
              Join the Beta Program
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 hover:scale-105 transition-all duration-300 px-10 py-6 h-auto text-lg font-semibold rounded-lg backdrop-blur-sm">
              Partner With Us
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="relative py-24 px-6 lg:px-8 border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.01] to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="group hover:scale-110 transition-all duration-500">
              <div className="text-5xl md:text-6xl font-black mb-4 text-white group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">1,000+</div>
              <div className="text-gray-400 text-sm font-medium tracking-widest uppercase">Students Served</div>
            </div>
            <div className="group hover:scale-110 transition-all duration-500 delay-100">
              <div className="text-5xl md:text-6xl font-black mb-4 text-white group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">5</div>
              <div className="text-gray-400 text-sm font-medium tracking-widest uppercase">Countries</div>
            </div>
            <div className="group hover:scale-110 transition-all duration-500 delay-200">
              <div className="text-5xl md:text-6xl font-black mb-4 text-white group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">24/7</div>
              <div className="text-gray-400 text-sm font-medium tracking-widest uppercase">Accessibility</div>
            </div>
            <div className="group hover:scale-110 transition-all duration-500 delay-300">
              <div className="text-5xl md:text-6xl font-black mb-4 text-white group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">0</div>
              <div className="text-gray-400 text-sm font-medium tracking-widest uppercase">Internet Required</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-32 px-6 lg:px-8 border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-black text-white mb-8 tracking-tighter">How It Works</h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto font-light">Simple, accessible education through voice-based AI technology</p>
          </div>
          <div className="grid md:grid-cols-3 gap-16">
            <div className="text-center group hover:scale-105 transition-all duration-500">
              <div className="w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:border-white/40 group-hover:shadow-2xl transition-all duration-500">
                <Phone className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-lg font-bold mb-3 text-gray-400">01</div>
              <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-gray-200 transition-colors duration-300">Make a Call</h3>
              <p className="text-gray-400 leading-relaxed font-light text-lg">Students dial our toll-free number from any basic phone — no smartphone or internet needed.</p>
            </div>
            <div className="text-center group hover:scale-105 transition-all duration-500 delay-100">
              <div className="w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:border-white/40 group-hover:shadow-2xl transition-all duration-500">
                <Zap className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-lg font-bold mb-3 text-gray-400">02</div>
              <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-gray-200 transition-colors duration-300">AI Tutor Responds</h3>
              <p className="text-gray-400 leading-relaxed font-light text-lg">Our AI-powered system provides personalized English lessons and civic education through voice interaction.</p>
            </div>
            <div className="text-center group hover:scale-105 transition-all duration-500 delay-200">
              <div className="w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:border-white/40 group-hover:shadow-2xl transition-all duration-500">
                <BookOpen className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-lg font-bold mb-3 text-gray-400">03</div>
              <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-gray-200 transition-colors duration-300">Learn & Progress</h3>
              <p className="text-gray-400 leading-relaxed font-light text-lg">Students receive real-time feedback and track their progress through adaptive learning pathways.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section id="who-we-serve" className="py-32 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">Who We Serve</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">Empowering diverse organizations to deliver scalable education</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors">
              <CardHeader className="pb-6">
                <div className="w-14 h-14 bg-gray-800 border border-gray-700 rounded-sm flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl text-center text-white font-semibold">Governments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-300 leading-relaxed font-light">
                  Scale civic education and literacy programs across remote regions efficiently.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors">
              <CardHeader className="pb-6">
                <div className="w-14 h-14 bg-gray-800 border border-gray-700 rounded-sm flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl text-center text-white font-semibold">NGOs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-300 leading-relaxed font-light">
                  Extend educational outreach programs to underserved communities without infrastructure costs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors">
              <CardHeader className="pb-6">
                <div className="w-14 h-14 bg-gray-800 border border-gray-700 rounded-sm flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl text-center text-white font-semibold">Schools</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-300 leading-relaxed font-light">
                  Supplement classroom learning with 24/7 accessible English tutoring for students.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors">
              <CardHeader className="pb-6">
                <div className="w-14 h-14 bg-gray-800 border border-gray-700 rounded-sm flex items-center justify-center mx-auto mb-6">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl text-center text-white font-semibold">Remote Learners</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-300 leading-relaxed font-light">
                  Individual students in rural areas seeking quality English education and civic knowledge.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Beta Program CTA */}
      <section className="relative py-32 px-6 lg:px-8 border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] via-transparent to-white/[0.02]"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-6xl md:text-7xl font-black mb-12 text-white tracking-tighter">Join Our Beta Program</h2>
          <p className="text-2xl mb-16 text-gray-300 leading-relaxed font-light max-w-4xl mx-auto">
            Be among the first schools to pilot Bakame AI. We're currently serving 1,000 students in rural Rwanda and expanding across Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 hover:scale-105 transition-all duration-300 px-10 py-6 h-auto text-lg font-semibold rounded-lg shadow-2xl">
              Apply for Beta Access
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 hover:scale-105 transition-all duration-300 px-10 py-6 h-auto text-lg font-semibold rounded-lg backdrop-blur-sm">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section id="technology" className="py-32 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">Our Technology</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">Cutting-edge AI infrastructure built for accessibility</p>
          </div>
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h3 className="text-3xl font-semibold mb-12 text-white">AI-Powered Voice Platform</h3>
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-2 text-lg">IVR System</div>
                    <div className="text-gray-300 font-light leading-relaxed">Interactive Voice Response for seamless phone-based learning</div>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-2 text-lg">Speech Recognition</div>
                    <div className="text-gray-300 font-light leading-relaxed">Advanced voice processing for natural conversations</div>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-2 text-lg">GPT-4 Turbo</div>
                    <div className="text-gray-300 font-light leading-relaxed">Personalized AI tutoring adapted to each learner</div>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-2 text-lg">Text-to-Speech</div>
                    <div className="text-gray-300 font-light leading-relaxed">Natural voice synthesis for clear communication</div>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-2 text-lg">Real-time Analytics</div>
                    <div className="text-gray-300 font-light leading-relaxed">Comprehensive dashboards for tracking progress</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-700 p-12 rounded-sm">
              <h4 className="text-2xl font-semibold mb-8 text-white">Key Differentiators</h4>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-white" />
                  <span className="text-gray-300 font-light text-lg">No internet connection required</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Zap className="w-6 h-6 text-white" />
                  <span className="text-gray-300 font-light text-lg">AI-powered personalization</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-white" />
                  <span className="text-gray-300 font-light text-lg">Accessible anywhere with phone service</span>
                </div>
                <div className="flex items-center space-x-4">
                  <BookOpen className="w-6 h-6 text-white" />
                  <span className="text-gray-300 font-light text-lg">Real-time progress dashboards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="py-32 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-8 tracking-tight">Partner With Us</h2>
          <p className="text-xl text-gray-300 mb-20 max-w-4xl mx-auto leading-relaxed font-light">
            Join governments and NGOs already leveraging Bakame AI to deliver scalable education solutions. Together, we can bridge the digital divide and empower communities through voice-based learning.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-gray-900 border border-gray-700 p-10 rounded-sm">
              <h3 className="text-xl font-semibold mb-4 text-white">Cost-Effective Scale</h3>
              <p className="text-gray-300 leading-relaxed font-light">Reach thousands of learners without building physical infrastructure.</p>
            </div>
            <div className="bg-gray-900 border border-gray-700 p-10 rounded-sm">
              <h3 className="text-xl font-semibold mb-4 text-white">Immediate Impact</h3>
              <p className="text-gray-300 leading-relaxed font-light">Deploy education programs that work from day one with existing phone networks.</p>
            </div>
            <div className="bg-gray-900 border border-gray-700 p-10 rounded-sm">
              <h3 className="text-xl font-semibold mb-4 text-white">Data-Driven Insights</h3>
              <p className="text-gray-300 leading-relaxed font-light">Track learning outcomes with comprehensive analytics and reporting.</p>
            </div>
          </div>
          <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-6 h-auto text-base font-medium rounded-sm">
            Explore Partnership Opportunities
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-8 tracking-tight">Contact Our Team</h2>
          <p className="text-xl text-gray-300 mb-16 leading-relaxed font-light max-w-3xl mx-auto">
            Ready to bring voice-based AI education to your community? Let's discuss how Bakame AI can support your educational goals.
          </p>
          <div className="flex items-center justify-center space-x-4 mb-16">
            <Mail className="w-6 h-6 text-white" />
            <a href="mailto:h.niyorurema@tcu.edu" className="text-xl text-white hover:text-gray-300 transition-colors font-medium">
              h.niyorurema@tcu.edu
            </a>
          </div>
          <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-6 h-auto text-base font-medium rounded-sm">
            Get In Touch
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-8 md:mb-0">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <span className="text-black font-bold text-sm">🦉</span>
              </div>
              <span className="text-xl font-semibold">Bakame AI</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p className="mb-2 text-sm font-light">Learning by Voice. Powered by AI. Accessible to All.</p>
              <p className="text-sm font-light">&copy; 2024 Bakame AI. Empowering education across Africa.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
