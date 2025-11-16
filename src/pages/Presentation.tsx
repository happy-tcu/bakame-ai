import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Book, Mic, Users, Globe, Shield, TrendingUp, Zap, Award, Target, Phone, BarChart3, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 0,
      title: "Bakame AI",
      subtitle: "Making Quality English Education Accessible to Every Rwandan Student",
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-3xl flex items-center justify-center mb-4">
            <Book className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Bakame AI
          </h1>
          <p className="text-3xl text-muted-foreground max-w-3xl text-center">
            AI-Powered English Learning Platform for Rwandan Schools
          </p>
          <div className="mt-8 text-xl text-muted-foreground">
            Investor & School Leader Presentation
          </div>
        </div>
      )
    },
    {
      id: 1,
      title: "The Problem",
      subtitle: "English Education Challenges in Rwanda & Africa",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8">
              <div className="text-6xl font-bold text-red-400 mb-4">65%</div>
              <p className="text-xl text-foreground">
                Of Rwandan students struggle with English proficiency
              </p>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8">
              <div className="text-6xl font-bold text-red-400 mb-4">Limited</div>
              <p className="text-xl text-foreground">
                Access to qualified English teachers, especially in rural areas
              </p>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8">
              <div className="text-6xl font-bold text-red-400 mb-4">Poor</div>
              <p className="text-xl text-foreground">
                Internet connectivity prevents access to online learning tools
              </p>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8">
              <div className="text-6xl font-bold text-red-400 mb-4">High</div>
              <p className="text-xl text-foreground">
                Cost of traditional tutoring puts quality education out of reach
              </p>
            </div>
          </div>
          <p className="text-2xl text-center text-muted-foreground mt-8">
            English proficiency is critical for academic success and economic opportunity
          </p>
        </div>
      )
    },
    {
      id: 2,
      title: "Our Solution",
      subtitle: "AI-Powered, Voice-First, Offline-Capable Learning",
      content: (
        <div className="space-y-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl mb-6">
              <Mic className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-foreground">Bakame AI Platform</h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive AI-powered English learning platform that works anywhere, anytime - even without internet
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <Zap className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-foreground">AI Tutoring</h3>
              <p className="text-lg text-muted-foreground">
                Personalized conversations, grammar help, vocabulary building, and pronunciation feedback
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <Globe className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-foreground">Offline-First</h3>
              <p className="text-lg text-muted-foreground">
                Works completely offline with local processing - perfect for areas with limited connectivity
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <Users className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-foreground">Bilingual</h3>
              <p className="text-lg text-muted-foreground">
                Supports both Kinyarwanda and English for natural, accessible learning
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Key Features",
      subtitle: "Comprehensive Learning Tools for Students",
      content: (
        <div className="grid grid-cols-2 gap-6">
          {[
            { icon: Mic, title: "Voice Journal", desc: "Daily speaking practice with AI feedback" },
            { icon: Award, title: "Pronunciation Scoring", desc: "Real-time feedback on speech quality" },
            { icon: Book, title: "Vocabulary Builder", desc: "Personalized word mastery system" },
            { icon: Users, title: "AI Conversation Partner", desc: "Practice dialogues in real scenarios" },
            { icon: Target, title: "Grammar Lessons", desc: "Interactive grammar explanations" },
            { icon: Phone, title: "Interview Prep", desc: "Job interview practice and coaching" }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:scale-105 transition-transform">
              <feature.icon className="w-10 h-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 4,
      title: "For Schools",
      subtitle: "Powerful Tools for Teachers & Administrators",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-blue-400">Teacher Dashboard</h3>
              <div className="space-y-3">
                {[
                  "Track student progress in real-time",
                  "View detailed pronunciation heat maps",
                  "Automated grading for voice homework",
                  "AI-powered lesson plan generator",
                  "Class-wide performance analytics",
                  "Parent report automation"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 bg-white/5 p-4 rounded-lg">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <p className="text-lg text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-purple-400">School Administration</h3>
              <div className="space-y-3">
                {[
                  "School-wide analytics and insights",
                  "Bulk user management system",
                  "Curriculum alignment tracking",
                  "Multi-school deployment support",
                  "Data export and reporting",
                  "Security and compliance built-in"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 bg-white/5 p-4 rounded-lg">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <p className="text-lg text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Technology Stack",
      subtitle: "Best-in-Class AI and Infrastructure",
      content: (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-8 text-center">
              <Shield className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-foreground">ElevenLabs AI</h3>
              <p className="text-muted-foreground">
                Real-time voice interactions with natural, human-like conversations
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl p-8 text-center">
              <Zap className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-foreground">OpenAI GPT-4</h3>
              <p className="text-muted-foreground">
                Advanced conversation analysis, CEFR level assessment, quality scoring
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-8 text-center">
              <BarChart3 className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-foreground">Analytics Engine</h3>
              <p className="text-muted-foreground">
                Grammar, vocabulary, fluency, and coherence scoring with actionable insights
              </p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center text-foreground">Assessment Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "CEFR Levels", value: "A1 → C2" },
                { label: "Grammar Score", value: "0-10" },
                { label: "Vocabulary Score", value: "0-10" },
                { label: "Fluency Score", value: "0-10" }
              ].map((metric, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">{metric.value}</div>
                  <div className="text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Market Opportunity",
      subtitle: "Three Major Sectors, Massive Potential",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/10 border border-blue-500/30 rounded-xl p-8">
              <Book className="w-14 h-14 text-blue-400 mb-4" />
              <h3 className="text-3xl font-bold mb-4 text-foreground">Education</h3>
              <div className="space-y-3 text-lg text-muted-foreground">
                <p>• 3.2M students in Rwanda</p>
                <p>• 5,000+ schools</p>
                <p>• Growing demand for English</p>
                <p>• Government support</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/10 border border-purple-500/30 rounded-xl p-8">
              <Shield className="w-14 h-14 text-purple-400 mb-4" />
              <h3 className="text-3xl font-bold mb-4 text-foreground">Government</h3>
              <div className="space-y-3 text-lg text-muted-foreground">
                <p>• Citizen service delivery</p>
                <p>• Multi-language support</p>
                <p>• Offline accessibility</p>
                <p>• Data sovereignty</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-green-500/10 border border-green-500/30 rounded-xl p-8">
              <TrendingUp className="w-14 h-14 text-green-400 mb-4" />
              <h3 className="text-3xl font-bold mb-4 text-foreground">Enterprise</h3>
              <div className="space-y-3 text-lg text-muted-foreground">
                <p>• Customer service automation</p>
                <p>• Employee training</p>
                <p>• Scalable solutions</p>
                <p>• Cost reduction</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Regional Expansion</h3>
            <p className="text-xl text-muted-foreground">
              Rwanda first, then Kenya, Uganda, Tanzania, and across Africa
            </p>
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: "Impact & Analytics",
      subtitle: "Measurable Results, Proven Outcomes",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { metric: "Progress Tracking", value: "Real-time", color: "blue" },
              { metric: "Quality Scores", value: "4 Metrics", color: "purple" },
              { metric: "CEFR Assessment", value: "A1-C2", color: "green" },
              { metric: "AI Insights", value: "Automated", color: "orange" }
            ].map((stat, idx) => (
              <div key={idx} className={`bg-${stat.color}-500/10 border border-${stat.color}-500/20 rounded-xl p-6 text-center`}>
                <div className={`text-5xl font-bold text-${stat.color}-400 mb-2`}>{stat.value}</div>
                <div className="text-muted-foreground">{stat.metric}</div>
              </div>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-foreground">What Schools Get</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <BarChart3 className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-2">Comprehensive Analytics</h4>
                    <p className="text-muted-foreground">Track grammar, vocabulary, fluency, and coherence scores across all students</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Target className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-2">CEFR Level Distribution</h4>
                    <p className="text-muted-foreground">Understand where students are and track their progression over time</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Zap className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-2">AI-Generated Insights</h4>
                    <p className="text-muted-foreground">Get actionable recommendations for each student's learning path</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Award className="w-8 h-8 text-orange-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-2">Export & Reporting</h4>
                    <p className="text-muted-foreground">Download data, generate reports, and share progress with stakeholders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      title: "Business Model",
      subtitle: "Sustainable, Scalable Revenue Streams",
      content: (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">School Licenses</h3>
              <div className="text-4xl font-bold text-foreground mb-4">$X/student/year</div>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Per-student pricing</li>
                <li>• Volume discounts</li>
                <li>• Annual contracts</li>
                <li>• Premium support</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Government Contracts</h3>
              <div className="text-4xl font-bold text-foreground mb-4">Enterprise</div>
              <ul className="space-y-2 text-muted-foreground">
                <li>• National deployments</li>
                <li>• Custom integrations</li>
                <li>• On-premise options</li>
                <li>• Dedicated support</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-green-400 mb-4">Enterprise Solutions</h3>
              <div className="text-4xl font-bold text-foreground mb-4">Custom</div>
              <ul className="space-y-2 text-muted-foreground">
                <li>• B2B licensing</li>
                <li>• API access</li>
                <li>• White-label options</li>
                <li>• Training programs</li>
              </ul>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-center text-foreground">Revenue Projections</h3>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">Year 1</div>
                <div className="text-2xl text-muted-foreground">$XXX,XXX</div>
                <div className="text-sm text-muted-foreground mt-2">50 schools</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">Year 2</div>
                <div className="text-2xl text-muted-foreground">$X,XXX,XXX</div>
                <div className="text-sm text-muted-foreground mt-2">500 schools</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-400 mb-2">Year 3</div>
                <div className="text-2xl text-muted-foreground">$XX,XXX,XXX</div>
                <div className="text-sm text-muted-foreground mt-2">Regional expansion</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 9,
      title: "Roadmap",
      subtitle: "12-Month Growth Plan",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-blue-400 mb-6">Q1-Q2 2025</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <span className="text-foreground">Launch pilot program with 10 schools</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <span className="text-foreground">Refine AI models based on feedback</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <span className="text-foreground">Complete offline mode testing</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <span className="text-foreground">Build teacher training program</span>
                </li>
              </ul>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-purple-400 mb-6">Q3-Q4 2025</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <span className="text-foreground">Scale to 100+ schools in Rwanda</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <span className="text-foreground">Launch government pilot program</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <span className="text-foreground">Add French and Swahili support</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <span className="text-foreground">Partnership with education ministry</span>
                </li>
              </ul>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-green-400 mb-6">2026</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <span className="text-foreground">Expand to Kenya and Uganda</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <span className="text-foreground">Launch enterprise solutions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <span className="text-foreground">Mobile app development</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <span className="text-foreground">AI model improvements (GPT-5)</span>
                </li>
              </ul>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-orange-400 mb-6">2027 & Beyond</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                  <span className="text-foreground">Pan-African expansion</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                  <span className="text-foreground">Support for more languages</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                  <span className="text-foreground">Additional subject areas (Math, Science)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                  <span className="text-foreground">Strategic partnerships & acquisitions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 10,
      title: "Investment Opportunity",
      subtitle: "Join Us in Transforming Education in Africa",
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-12">
          <div className="text-center max-w-4xl">
            <Rocket className="w-20 h-20 text-blue-400 mx-auto mb-8" />
            <h2 className="text-5xl font-bold mb-6 text-foreground">We're Raising Our Seed Round</h2>
            <p className="text-2xl text-muted-foreground mb-8">
              Seeking $XXX,XXX to scale across Rwanda and prepare for regional expansion
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/10 border border-blue-500/30 rounded-xl p-8 text-center">
              <Target className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-3">Use of Funds</h3>
              <ul className="text-left space-y-2 text-muted-foreground">
                <li>• 40% - Product development</li>
                <li>• 30% - Sales & marketing</li>
                <li>• 20% - Operations & team</li>
                <li>• 10% - Infrastructure</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/10 border border-purple-500/30 rounded-xl p-8 text-center">
              <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-3">Traction</h3>
              <ul className="text-left space-y-2 text-muted-foreground">
                <li>• X pilot schools signed</li>
                <li>• XXX students using platform</li>
                <li>• Government interest confirmed</li>
                <li>• Strong user engagement</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-green-500/10 border border-green-500/30 rounded-xl p-8 text-center">
              <Award className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-3">Why Now</h3>
              <ul className="text-left space-y-2 text-muted-foreground">
                <li>• AI technology mature</li>
                <li>• Market demand proven</li>
                <li>• Government support</li>
                <li>• Competitive advantage</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-12">
            <p className="text-3xl font-bold text-foreground mb-4">
              Let's Transform English Education Together
            </p>
            <p className="text-xl text-muted-foreground">
              Contact us to learn more about this opportunity
            </p>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentSlide < slides.length - 1) {
        setCurrentSlide(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentSlide > 0) {
        setCurrentSlide(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Main Slide Area */}
      <div className="h-screen flex flex-col">
        {/* Slide Content */}
        <div className="flex-1 p-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto h-full flex flex-col">
            {slides[currentSlide].content}
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="border-t border-white/10 bg-black/50 backdrop-blur-sm p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Progress Dots */}
            <div className="flex items-center space-x-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentSlide 
                      ? 'w-8 bg-blue-400' 
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  data-testid={`slide-dot-${idx}`}
                />
              ))}
            </div>

            {/* Slide Counter */}
            <div className="text-muted-foreground" data-testid="slide-counter">
              {currentSlide + 1} / {slides.length}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="flex items-center space-x-2"
                data-testid="button-prev-slide"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600"
                data-testid="button-next-slide"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="fixed bottom-24 right-8 text-sm text-muted-foreground bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
        Use ← → arrow keys to navigate
      </div>
    </div>
  );
};

export default Presentation;
