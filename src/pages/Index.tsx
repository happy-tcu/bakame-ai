
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Users, MapPin, BookOpen, Zap, Shield, Mail, Globe } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🦉</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Bakame AI</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#how-it-works" className="text-gray-600 hover:text-orange-600 transition-colors">How It Works</a>
              <a href="#who-we-serve" className="text-gray-600 hover:text-orange-600 transition-colors">Who We Serve</a>
              <a href="#technology" className="text-gray-600 hover:text-orange-600 transition-colors">Technology</a>
              <a href="#contact" className="text-gray-600 hover:text-orange-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Learning by Voice.
            <br />
            <span className="text-orange-600">Powered by AI.</span>
            <br />
            <span className="text-green-600">Accessible to All.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Delivering education via phone calls — no internet needed. We're bringing English learning and civic services to remote communities across Africa through AI-powered voice technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
              Join the Beta Program
            </Button>
            <Button size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-3">
              Partner With Us
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">1,000+</div>
              <div className="text-orange-100">Students Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">5</div>
              <div className="text-orange-100">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-orange-100">Accessibility</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">0</div>
              <div className="text-orange-100">Internet Required</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Make a Call</h3>
              <p className="text-gray-600">Students dial our toll-free number from any basic phone — no smartphone or internet needed.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. AI Tutor Responds</h3>
              <p className="text-gray-600">Our AI-powered system provides personalized English lessons and civic education through voice interaction.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Learn & Progress</h3>
              <p className="text-gray-600">Students receive real-time feedback and track their progress through adaptive learning pathways.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section id="who-we-serve" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Who We Serve</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-2 hover:border-orange-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-lg">Governments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Scale civic education and literacy programs across remote regions efficiently.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-orange-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">NGOs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Extend educational outreach programs to underserved communities without infrastructure costs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-orange-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Schools</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Supplement classroom learning with 24/7 accessible English tutoring for students.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-orange-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Remote Learners</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Individual students in rural areas seeking quality English education and civic knowledge.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Beta Program CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Beta Program</h2>
          <p className="text-xl mb-8 text-orange-100">
            Be among the first schools to pilot Bakame AI. We're currently serving 1,000 students in rural Rwanda and expanding across Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3">
              Apply for Beta Access
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section id="technology" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Our Technology</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Cutting-Edge AI Infrastructure</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>IVR System:</strong> Interactive Voice Response for seamless phone-based learning
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Speech Recognition:</strong> Advanced voice processing for natural conversations
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>GPT-4 Turbo:</strong> Personalized AI tutoring adapted to each learner
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Text-to-Speech:</strong> Natural voice synthesis for clear communication
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Real-time Analytics:</strong> Comprehensive dashboards for tracking progress
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h4 className="text-lg font-semibold mb-4">Key Differentiators</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-green-600" />
                  <span>No internet connection required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <span>AI-powered personalization</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <span>Accessible anywhere with phone service</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-orange-600" />
                  <span>Real-time progress dashboards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Partner With Us</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Join governments and NGOs already leveraging Bakame AI to deliver scalable education solutions. Together, we can bridge the digital divide and empower communities through voice-based learning.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Cost-Effective Scale</h3>
              <p className="text-gray-600">Reach thousands of learners without building physical infrastructure.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Immediate Impact</h3>
              <p className="text-gray-600">Deploy education programs that work from day one with existing phone networks.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Data-Driven Insights</h3>
              <p className="text-gray-600">Track learning outcomes with comprehensive analytics and reporting.</p>
            </div>
          </div>
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
            Explore Partnership Opportunities
          </Button>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Our Team</h2>
          <p className="text-xl text-gray-600 mb-8">
            Ready to bring voice-based AI education to your community? Let's discuss how Bakame AI can support your educational goals.
          </p>
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Mail className="w-6 h-6 text-orange-600" />
            <a href="mailto:h.niyorurema@tcu.edu" className="text-xl text-orange-600 hover:text-orange-700 transition-colors">
              h.niyorurema@tcu.edu
            </a>
          </div>
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
            Get In Touch
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🦉</span>
              </div>
              <span className="text-2xl font-bold">Bakame AI</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p className="mb-2">Learning by Voice. Powered by AI. Accessible to All.</p>
              <p>&copy; 2024 Bakame AI. Empowering education across Africa.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
