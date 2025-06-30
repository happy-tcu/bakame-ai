
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Users, MapPin, BookOpen, Zap, Shield, Mail, Globe, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🦉</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">Bakame AI</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">How It Works</a>
              <a href="#who-we-serve" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Who We Serve</a>
              <a href="#technology" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Technology</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Learning by Voice.
            <br />
            <span className="text-purple-600">Powered by AI.</span>
            <br />
            <span className="text-gray-600">Accessible to All.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Delivering education via phone calls — no internet needed. We're bringing English learning and civic services to remote communities across Africa through AI-powered voice technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 h-auto text-base font-medium">
              Join the Beta Program
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 h-auto text-base font-medium">
              Partner With Us
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2 text-gray-900">1,000+</div>
              <div className="text-gray-600 text-sm font-medium">Students Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 text-gray-900">5</div>
              <div className="text-gray-600 text-sm font-medium">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 text-gray-900">24/7</div>
              <div className="text-gray-600 text-sm font-medium">Accessibility</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 text-gray-900">0</div>
              <div className="text-gray-600 text-sm font-medium">Internet Required</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Simple, accessible education through voice-based AI technology</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">1. Make a Call</h3>
              <p className="text-gray-600 leading-relaxed">Students dial our toll-free number from any basic phone — no smartphone or internet needed.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">2. AI Tutor Responds</h3>
              <p className="text-gray-600 leading-relaxed">Our AI-powered system provides personalized English lessons and civic education through voice interaction.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">3. Learn & Progress</h3>
              <p className="text-gray-600 leading-relaxed">Students receive real-time feedback and track their progress through adaptive learning pathways.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section id="who-we-serve" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Who We Serve</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Empowering diverse organizations to deliver scalable education</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border border-gray-200 hover:border-purple-200 transition-colors bg-white">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-lg text-center text-gray-900">Governments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Scale civic education and literacy programs across remote regions efficiently.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-purple-200 transition-colors bg-white">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg text-center text-gray-900">NGOs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Extend educational outreach programs to underserved communities without infrastructure costs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-purple-200 transition-colors bg-white">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg text-center text-gray-900">Schools</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Supplement classroom learning with 24/7 accessible English tutoring for students.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-purple-200 transition-colors bg-white">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg text-center text-gray-900">Remote Learners</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Individual students in rural areas seeking quality English education and civic knowledge.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Beta Program CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Join Our Beta Program</h2>
          <p className="text-xl mb-12 text-gray-300 leading-relaxed">
            Be among the first schools to pilot Bakame AI. We're currently serving 1,000 students in rural Rwanda and expanding across Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 h-auto text-base font-medium">
              Apply for Beta Access
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-4 h-auto text-base font-medium">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section id="technology" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Technology</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Cutting-edge AI infrastructure built for accessibility</p>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-8 text-gray-900">AI-Powered Voice Platform</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">IVR System</div>
                    <div className="text-gray-600">Interactive Voice Response for seamless phone-based learning</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Speech Recognition</div>
                    <div className="text-gray-600">Advanced voice processing for natural conversations</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">GPT-4 Turbo</div>
                    <div className="text-gray-600">Personalized AI tutoring adapted to each learner</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Text-to-Speech</div>
                    <div className="text-gray-600">Natural voice synthesis for clear communication</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Real-time Analytics</div>
                    <div className="text-gray-600">Comprehensive dashboards for tracking progress</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h4 className="text-lg font-semibold mb-6 text-gray-900">Key Differentiators</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">No internet connection required</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">AI-powered personalization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">Accessible anywhere with phone service</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700">Real-time progress dashboards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Partner With Us</h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed">
            Join governments and NGOs already leveraging Bakame AI to deliver scalable education solutions. Together, we can bridge the digital divide and empower communities through voice-based learning.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Cost-Effective Scale</h3>
              <p className="text-gray-600 leading-relaxed">Reach thousands of learners without building physical infrastructure.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Immediate Impact</h3>
              <p className="text-gray-600 leading-relaxed">Deploy education programs that work from day one with existing phone networks.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Data-Driven Insights</h3>
              <p className="text-gray-600 leading-relaxed">Track learning outcomes with comprehensive analytics and reporting.</p>
            </div>
          </div>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 h-auto text-base font-medium">
            Explore Partnership Opportunities
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Contact Our Team</h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Ready to bring voice-based AI education to your community? Let's discuss how Bakame AI can support your educational goals.
          </p>
          <div className="flex items-center justify-center space-x-3 mb-12">
            <Mail className="w-6 h-6 text-purple-600" />
            <a href="mailto:h.niyorurema@tcu.edu" className="text-xl text-purple-600 hover:text-purple-700 transition-colors font-medium">
              h.niyorurema@tcu.edu
            </a>
          </div>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 h-auto text-base font-medium">
            Get In Touch
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🦉</span>
              </div>
              <span className="text-xl font-semibold">Bakame AI</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p className="mb-2 text-sm">Learning by Voice. Powered by AI. Accessible to All.</p>
              <p className="text-sm">&copy; 2024 Bakame AI. Empowering education across Africa.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
