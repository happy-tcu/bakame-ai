import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Users, MapPin, BookOpen, Zap, Shield, Mail, Globe, ArrowRight, Check, Mic, Database, Brain } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Larger moving gradient orbs with colors */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-l from-emerald-500/8 via-cyan-500/5 to-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/5 via-violet-500/3 to-white/2 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Additional moving orbs */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-cyan-400/8 to-blue-600/4 rounded-full blur-2xl animate-bounce delay-2000"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-tr from-violet-400/6 to-purple-600/3 rounded-full blur-2xl animate-bounce delay-3000"></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse opacity-40"></div>
        
        {/* More floating particles with colors */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-blue-400/30 rounded-full animate-bounce delay-300 shadow-lg shadow-blue-400/20"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-purple-400/40 rounded-full animate-bounce delay-700 shadow-lg shadow-purple-400/20"></div>
        <div className="absolute bottom-40 left-20 w-2.5 h-2.5 bg-cyan-400/35 rounded-full animate-bounce delay-1000 shadow-lg shadow-cyan-400/20"></div>
        <div className="absolute bottom-20 right-40 w-2 h-2 bg-emerald-400/30 rounded-full animate-bounce delay-500 shadow-lg shadow-emerald-400/20"></div>
        <div className="absolute top-60 left-1/3 w-1.5 h-1.5 bg-violet-400/40 rounded-full animate-bounce delay-1500 shadow-lg shadow-violet-400/20"></div>
        <div className="absolute bottom-60 right-1/3 w-2 h-2 bg-indigo-400/35 rounded-full animate-bounce delay-2500 shadow-lg shadow-indigo-400/20"></div>
        
        {/* Subtle moving lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-pulse delay-1000"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-500/15 to-transparent animate-pulse delay-2000"></div>
      </div>

      {/* Navigation with subtle backdrop */}
      <nav className="relative z-50 backdrop-blur-xl bg-black/90 border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 via-purple-400 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-blue-400/25 group-hover:shadow-purple-400/40 transition-all duration-500 group-hover:scale-110">
                <span className="text-black font-bold text-sm">🦉</span>
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">Bakame AI</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#how-it-works" className="text-gray-400 hover:text-blue-300 transition-all duration-300 text-sm font-medium hover:scale-105 relative group">
                How It Works
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></div>
              </a>
              <a href="#who-we-serve" className="text-gray-400 hover:text-purple-300 transition-all duration-300 text-sm font-medium hover:scale-105 relative group">
                Who We Serve
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></div>
              </a>
              <a href="#technology" className="text-gray-400 hover:text-cyan-300 transition-all duration-300 text-sm font-medium hover:scale-105 relative group">
                Technology
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></div>
              </a>
              <a href="#contact" className="text-gray-400 hover:text-emerald-300 transition-all duration-300 text-sm font-medium hover:scale-105 relative group">
                Contact
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative py-32 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-7xl md:text-9xl font-black text-white mb-8 leading-none tracking-tighter">
              Learning by
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                Voice
              </span>
            </h1>
            <div className="text-2xl md:text-3xl font-light text-gray-300 mb-4 tracking-wide">
              <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Powered by AI.</span> Accessible to All.
            </div>
          </div>
          
          <p className="text-xl text-gray-400 mb-16 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in delay-300">
            Delivering education via phone calls — no internet needed. We're bringing English learning and civic services to remote communities across Africa through AI-powered voice technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in delay-500">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-105 transition-all duration-300 px-10 py-6 h-auto text-lg font-semibold rounded-lg shadow-2xl shadow-blue-500/25 hover:shadow-purple-500/40">
              Join the Beta Program
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:border-blue-400/40 hover:scale-105 transition-all duration-300 px-10 py-6 h-auto text-lg font-semibold rounded-lg backdrop-blur-sm hover:text-blue-300">
              Partner With Us
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Impact Metrics */}
      <section className="relative py-24 px-6 lg:px-8 border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/[0.01] to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="group hover:scale-110 transition-all duration-500">
              <div className="text-5xl md:text-6xl font-black mb-4 text-white group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">1,000+</div>
              <div className="text-gray-400 text-sm font-medium tracking-widest uppercase group-hover:text-blue-300 transition-colors duration-300">Students Served</div>
            </div>
            <div className="group hover:scale-110 transition-all duration-500 delay-100">
              <div className="text-5xl md:text-6xl font-black mb-4 text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-violet-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">5</div>
              <div className="text-gray-400 text-sm font-medium tracking-widest uppercase group-hover:text-purple-300 transition-colors duration-300">Countries</div>
            </div>
            <div className="group hover:scale-110 transition-all duration-500 delay-200">
              <div className="text-5xl md:text-6xl font-black mb-4 text-white group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">24/7</div>
              <div className="text-gray-400 text-sm font-medium tracking-widest uppercase group-hover:text-emerald-300 transition-colors duration-300">Accessibility</div>
            </div>
            <div className="group hover:scale-110 transition-all duration-500 delay-300">
              <div className="text-5xl md:text-6xl font-black mb-4 text-white group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">0</div>
              <div className="text-gray-400 text-sm font-medium tracking-widest uppercase group-hover:text-indigo-300 transition-colors duration-300">Internet Required</div>
            </div>
          </div>
        </div>
      </section>

      {/* Kinyarwanda Dataset Section */}
      <section className="relative py-32 px-6 lg:px-8 border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.02] via-purple-500/[0.01] to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full border border-indigo-400/30 mb-8 backdrop-blur-sm">
              <Database className="w-5 h-5 mr-2 text-indigo-400" />
              <span className="text-indigo-300 font-medium">Building the Future of African Languages</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black text-white mb-8 tracking-tighter">
              First-of-its-Kind
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                Kinyarwanda Dataset
              </span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
              We're on the road to collecting <span className="text-white font-semibold">100,000 hours</span> of recorded voice data to create the first proficient LLM-ready Kinyarwanda dataset.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group hover:scale-105 transition-all duration-500">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 backdrop-blur-sm border border-indigo-400/30 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:border-indigo-400/60 group-hover:shadow-2xl group-hover:shadow-indigo-500/25 transition-all duration-500">
                <Mic className="w-12 h-12 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-indigo-300 transition-colors duration-300">Voice Collection</h3>
              <p className="text-gray-400 leading-relaxed font-light text-lg">Gathering diverse Kinyarwanda speech patterns from across Rwanda and the diaspora to build comprehensive language models.</p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-all duration-500 delay-100">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-violet-500/10 backdrop-blur-sm border border-purple-400/30 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:border-purple-400/60 group-hover:shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-500">
                <Brain className="w-12 h-12 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-purple-300 transition-colors duration-300">AI Training</h3>
              <p className="text-gray-400 leading-relaxed font-light text-lg">Training advanced language models specifically optimized for Kinyarwanda understanding and generation.</p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-all duration-500 delay-200">
              <div className="w-24 h-24 bg-gradient-to-br from-violet-500/20 to-blue-500/10 backdrop-blur-sm border border-violet-400/30 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:border-violet-400/60 group-hover:shadow-2xl group-hover:shadow-violet-500/25 transition-all duration-500">
                <Globe className="w-12 h-12 text-violet-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-violet-300 transition-colors duration-300">Global Impact</h3>
              <p className="text-gray-400 leading-relaxed font-light text-lg">Preserving and promoting Kinyarwanda while making AI accessible to millions of native speakers worldwide.</p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-6 p-8 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl">
              <div className="text-center">
                <div className="text-4xl font-black text-white mb-2">100K</div>
                <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">Hours Target</div>
              </div>
              <div className="w-px h-12 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-4xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">12K+</div>
                <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">Hours Collected</div>
              </div>
              <div className="w-px h-12 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">1st</div>
                <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">LLM Dataset</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-32 px-6 lg:px-8 border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.01] to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-black text-white mb-8 tracking-tighter">How It Works</h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto font-light">Simple, accessible education through voice-based AI technology</p>
          </div>
          <div className="grid md:grid-cols-3 gap-16">
            <div className="text-center group hover:scale-105 transition-all duration-500">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 backdrop-blur-sm border border-blue-400/30 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:border-blue-400/60 group-hover:shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-500">
                <Phone className="w-12 h-12 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-lg font-bold mb-3 text-blue-400">01</div>
              <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-blue-300 transition-colors duration-300">Make a Call</h3>
              <p className="text-gray-400 leading-relaxed font-light text-lg">Students dial our toll-free number from any basic phone — no smartphone or internet needed.</p>
            </div>
            <div className="text-center group hover:scale-105 transition-all duration-500 delay-100">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-violet-500/10 backdrop-blur-sm border border-purple-400/30 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:border-purple-400/60 group-hover:shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-500">
                <Zap className="w-12 h-12 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-lg font-bold mb-3 text-purple-400">02</div>
              <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-purple-300 transition-colors duration-300">AI Tutor Responds</h3>
              <p className="text-gray-400 leading-relaxed font-light text-lg">Our AI-powered system provides personalized English lessons and civic education through voice interaction.</p>
            </div>
            <div className="text-center group hover:scale-105 transition-all duration-500 delay-200">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 backdrop-blur-sm border border-emerald-400/30 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:border-emerald-400/60 group-hover:shadow-2xl group-hover:shadow-emerald-500/25 transition-all duration-500">
                <BookOpen className="w-12 h-12 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-lg font-bold mb-3 text-emerald-400">03</div>
              <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-emerald-300 transition-colors duration-300">Learn & Progress</h3>
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
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700/50 hover:border-blue-400/40 hover:bg-gray-900/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
              <CardHeader className="pb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-indigo-500/10 border border-blue-400/30 rounded-sm flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-7 h-7 text-blue-400" />
                </div>
                <CardTitle className="text-xl text-center text-white font-semibold">Governments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-300 leading-relaxed font-light">
                  Scale civic education and literacy programs across remote regions efficiently.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700/50 hover:border-purple-400/40 hover:bg-gray-900/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
              <CardHeader className="pb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-violet-500/10 border border-purple-400/30 rounded-sm flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-7 h-7 text-purple-400" />
                </div>
                <CardTitle className="text-xl text-center text-white font-semibold">NGOs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-300 leading-relaxed font-light">
                  Extend educational outreach programs to underserved communities without infrastructure costs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700/50 hover:border-emerald-400/40 hover:bg-gray-900/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10">
              <CardHeader className="pb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 border border-emerald-400/30 rounded-sm flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-7 h-7 text-emerald-400" />
                </div>
                <CardTitle className="text-xl text-center text-white font-semibold">Schools</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-300 leading-relaxed font-light">
                  Supplement classroom learning with 24/7 accessible English tutoring for students.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700/50 hover:border-indigo-400/40 hover:bg-gray-900/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/10">
              <CardHeader className="pb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-blue-500/10 border border-indigo-400/30 rounded-sm flex items-center justify-center mx-auto mb-6">
                  <Users className="w-7 h-7 text-indigo-400" />
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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.02] via-transparent to-purple-500/[0.02]"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-6xl md:text-7xl font-black mb-12 text-white tracking-tighter">Join Our Beta Program</h2>
          <p className="text-2xl mb-16 text-gray-300 leading-relaxed font-light max-w-4xl mx-auto">
            Be among the first schools to pilot Bakame AI. We're currently serving 1,000 students in rural Rwanda and expanding across Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-105 transition-all duration-300 px-10 py-6 h-auto text-lg font-semibold rounded-lg shadow-2xl shadow-blue-500/25 hover:shadow-purple-500/40">
              Apply for Beta Access
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:border-blue-400/40 hover:scale-105 transition-all duration-300 px-10 py-6 h-auto text-lg font-semibold rounded-lg backdrop-blur-sm hover:text-blue-300">
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
                <div className="flex items-start space-x-6 group">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-2 text-lg group-hover:text-blue-300 transition-colors duration-300">IVR System</div>
                    <div className="text-gray-300 font-light leading-relaxed">Interactive Voice Response for seamless phone-based learning</div>
                  </div>
                </div>
                <div className="flex items-start space-x-6 group">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-2 text-lg group-hover:text-purple-300 transition-colors duration-300">Speech Recognition</div>
                    <div className="text-gray-300 font-light leading-relaxed">Advanced voice processing for natural conversations</div>
                  </div>
                </div>
                <div className="flex items-start space-x-6 group">
                  <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-2 text-lg group-hover:text-emerald-300 transition-colors duration-300">GPT-4 Turbo</div>
                    <div className="text-gray-300 font-light leading-relaxed">Personalized AI tutoring adapted to each learner</div>
                  </div>
                </div>
                <div className="flex items-start space-x-6 group">
                  <div className="w-6 h-6 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-2 text-lg group-hover:text-indigo-300 transition-colors duration-300">Text-to-Speech</div>
                    <div className="text-gray-300 font-light leading-relaxed">Natural voice synthesis for clear communication</div>
                  </div>
                </div>
                <div className="flex items-start space-x-6 group">
                  <div className="w-6 h-6 bg-gradient-to-r from-violet-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-2 text-lg group-hover:text-violet-300 transition-colors duration-300">Real-time Analytics</div>
                    <div className="text-gray-300 font-light leading-relaxed">Comprehensive dashboards for tracking progress</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 p-12 rounded-sm hover:border-gray-600/60 transition-all duration-500 hover:shadow-2xl hover:shadow-white/5">
              <h4 className="text-2xl font-semibold mb-8 text-white">Key Differentiators</h4>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <Phone className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-300 font-light text-lg group-hover:text-blue-300 transition-colors duration-300">No internet connection required</span>
                </div>
                <div className="flex items-center space-x-4 group">
                  <Zap className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-300 font-light text-lg group-hover:text-purple-300 transition-colors duration-300">AI-powered personalization</span>
                </div>
                <div className="flex items-center space-x-4 group">
                  <MapPin className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-300 font-light text-lg group-hover:text-emerald-300 transition-colors duration-300">Accessible anywhere with phone service</span>
                </div>
                <div className="flex items-center space-x-4 group">
                  <BookOpen className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-300 font-light text-lg group-hover:text-indigo-300 transition-colors duration-300">Real-time progress dashboards</span>
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
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 p-10 rounded-sm hover:border-blue-400/40 hover:bg-gray-900/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
              <h3 className="text-xl font-semibold mb-4 text-white">Cost-Effective Scale</h3>
              <p className="text-gray-300 leading-relaxed font-light">Reach thousands of learners without building physical infrastructure.</p>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 p-10 rounded-sm hover:border-purple-400/40 hover:bg-gray-900/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
              <h3 className="text-xl font-semibold mb-4 text-white">Immediate Impact</h3>
              <p className="text-gray-300 leading-relaxed font-light">Deploy education programs that work from day one with existing phone networks.</p>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 p-10 rounded-sm hover:border-emerald-400/40 hover:bg-gray-900/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10">
              <h3 className="text-xl font-semibold mb-4 text-white">Data-Driven Insights</h3>
              <p className="text-gray-300 leading-relaxed font-light">Track learning outcomes with comprehensive analytics and reporting.</p>
            </div>
          </div>
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-105 transition-all duration-300 px-8 py-6 h-auto text-base font-medium rounded-sm shadow-2xl shadow-blue-500/25 hover:shadow-purple-500/40">
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
          <div className="flex items-center justify-center space-x-4 mb-16 group">
            <Mail className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
            <a href="mailto:h.niyorurema@tcu.edu" className="text-xl text-white hover:text-blue-300 transition-colors font-medium">
              h.niyorurema@tcu.edu
            </a>
          </div>
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-105 transition-all duration-300 px-8 py-6 h-auto text-base font-medium rounded-sm shadow-2xl shadow-blue-500/25 hover:shadow-purple-500/40">
            Get In Touch
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-8 md:mb-0 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 via-purple-400 to-cyan-400 rounded-md flex items-center justify-center shadow-lg shadow-blue-400/25 group-hover:shadow-purple-400/40 transition-all duration-500 group-hover:scale-110">
                <span className="text-black font-bold text-sm">🦉</span>
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">Bakame AI</span>
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
