import { useNavigate } from "react-router-dom";
import { Target, Eye, Heart, Users, Globe, Shield, Zap, MapPin, Clock, Award, TrendingUp, Lightbulb, Rocket, Phone, GraduationCap, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedCounter from "@/components/AnimatedCounter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const About = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            The First Voice-AI Platform
            <span className="text-foreground"> for Offline Programs</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
            Like Duolingo — But for Civics, Weather, Health... and No Internet. 
            We deliver education, health, and civic programs through basic phone calls — powered by AI, not humans.
          </p>
          <div className="flex items-center justify-center gap-6 mt-8 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Kigali, Rwanda</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Founded 2025</span>
            </div>
            <Badge variant="secondary" className="text-xs">Seed Fundraising</Badge>
          </div>
        </section>

        {/* Traction Metrics */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Real Traction, Real Impact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center p-6 bg-card/50 border border-border/50 rounded-lg hover:bg-card/70 transition-colors">
                <div className="text-4xl font-bold mb-2 text-foreground">15K</div>
                <p className="text-sm text-muted-foreground">Students reached across Rwanda</p>
              </div>
              <div className="text-center p-6 bg-card/50 border border-border/50 rounded-lg hover:bg-card/70 transition-colors">
                <div className="text-4xl font-bold mb-2 text-foreground">10</div>
                <p className="text-sm text-muted-foreground">Schools in pilot programs</p>
              </div>
              <div className="text-center p-6 bg-card/50 border border-border/50 rounded-lg hover:bg-card/70 transition-colors">
                <div className="text-4xl font-bold mb-2 text-foreground">$30K</div>
                <p className="text-sm text-muted-foreground">Invoiced contracts</p>
              </div>
              <div className="text-center p-6 bg-card/50 border border-border/50 rounded-lg hover:bg-card/70 transition-colors">
                <div className="text-4xl font-bold mb-2 text-foreground">$20K</div>
                <p className="text-sm text-muted-foreground">Pre-seed capital raised</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">The Problem We're Solving</h2>
            
            {/* Problem Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-card/50 border border-border/50 rounded-lg hover:bg-card/70 transition-colors">
                <div className="text-4xl font-bold mb-2 text-foreground">2.7B</div>
                <p className="text-sm text-muted-foreground">People without internet, reachable by voice</p>
              </div>
              <div className="text-center p-6 bg-card/50 border border-border/50 rounded-lg hover:bg-card/70 transition-colors">
                <div className="text-4xl font-bold mb-2 text-foreground">$70B</div>
                <p className="text-sm text-muted-foreground">Market opportunity by 2030</p>
              </div>
              <div className="text-center p-6 bg-card/50 border border-border/50 rounded-lg hover:bg-card/70 transition-colors">
                <div className="text-4xl font-bold mb-2 text-foreground">75%</div>
                <p className="text-sm text-muted-foreground">Of digital content is in English only</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Users className="w-8 h-8 text-foreground flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-2 text-foreground">Governments & NGOs Can't Reach Rural Learners</h3>
                      <p className="text-foreground/90">
                        Organizations struggle to deliver educational and civic programs to offline populations. 
                        They have no engagement data from remote areas and find it expensive to scale digital services.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Phone className="w-8 h-8 text-foreground flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-2 text-foreground">Billions Are Locked Out of AI Services</h3>
                      <p className="text-foreground/90">
                        <strong className="text-foreground">2.7 billion people</strong> lack internet access but have feature phones. 
                        They're excluded from AI-powered education, health information, and civic services that could transform their lives.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">How Bakame Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-card border border-border rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">01</span>
                </div>
                <h3 className="font-bold mb-2">User Calls</h3>
                <p className="text-sm text-muted-foreground">Toll-free number works on any feature phone</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-card border border-border rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">02</span>
                </div>
                <h3 className="font-bold mb-2">AI Delivers</h3>
                <p className="text-sm text-muted-foreground">Personalized voice lesson or information</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-card border border-border rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">03</span>
                </div>
                <h3 className="font-bold mb-2">AI Adapts</h3>
                <p className="text-sm text-muted-foreground">Listens and adjusts based on response</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-card border border-border rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">04</span>
                </div>
                <h3 className="font-bold mb-2">Data Flows</h3>
                <p className="text-sm text-muted-foreground">Analytics to dashboards for tracking</p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-card border border-border rounded-lg text-center">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Powered by:</strong> Whisper + GPT-4 + TTS | 
                <strong className="text-foreground"> &lt;4s latency</strong> for real-time learning
              </p>
            </div>
          </div>
        </section>

        {/* Strategic Priorities */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Strategic Priorities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-6 h-6 text-foreground flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-2 text-foreground">Scale Education Programs</h3>
                      <p className="text-foreground/90 text-sm mb-3">
                        Expand from 10 to 100 schools by end of 2025, reaching 150,000 students with offline AI tutoring.
                      </p>
                      <Badge variant="secondary" className="text-xs">Target: 100 schools by Dec 2025</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-6 h-6 text-foreground flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-2 text-foreground">Build Government Partnerships</h3>
                      <p className="text-foreground/90 text-sm mb-3">
                        Launch civic and health use cases with national integration, generating $500K in licensing revenue.
                      </p>
                      <Badge variant="secondary" className="text-xs">Target: $500K ARR by Q4 2025</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-foreground flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-2 text-foreground">Optimize Infrastructure</h3>
                      <p className="text-foreground/90 text-sm mb-3">
                        Maintain &lt;4s latency at scale, reduce infrastructure costs by 30% through telecom API partnerships.
                      </p>
                      <Badge variant="secondary" className="text-xs">Target: 30% cost reduction</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Globe className="w-6 h-6 text-foreground flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-2 text-foreground">Expand Regionally</h3>
                      <p className="text-foreground/90 text-sm mb-3">
                        Launch in Kenya and Uganda by 2026, making content accent-aware and localizable for East Africa.
                      </p>
                      <Badge variant="secondary" className="text-xs">Target: 3 countries by 2026</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-card border-border text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-muted/60 border border-border rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Our Belief</h3>
                <p className="text-foreground/80">
                  Everyone deserves the benefits of a modern connected life — even without internet.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-muted/60 border border-border rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Our Vision</h3>
                <p className="text-foreground/80">
                  Build the voice internet for the 2.7 billion people offline, starting with Africa.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-muted/60 border border-border rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Our Mission</h3>
                <p className="text-foreground/80">
                  Deliver any voice-based program — education, health, civics — with no internet required.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="mb-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Our Leadership Team</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Built by civic tech, telecom, and AI experts who've built scalable systems across Africa.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Core Team */}
              <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-muted/60 border-2 border-border rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">HH</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1">Happy Herman</h3>
                  <p className="text-sm text-foreground/70 mb-2">CEO & Founder</p>
                  <p className="text-xs text-muted-foreground">
                    Ex-Rwandan Civics Ambassador to Qatar. Economics + Finance Double Degree at TCU.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-muted/60 border-2 border-border rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">AB</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1">Aime Byiringiro</h3>
                  <p className="text-sm text-foreground/70 mb-2">CTO & Co-founder</p>
                  <p className="text-xs text-muted-foreground">
                    Software Engineer at Dell. Expert in scalable cloud infrastructure and real-time systems.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-muted/60 border-2 border-border rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">CI</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1">Chretien Igiraneza</h3>
                  <p className="text-sm text-foreground/70 mb-2">Graphic Designer</p>
                  <p className="text-xs text-muted-foreground">
                    CEO & Co-founder of Korikori Creative Agency. Award-winning brand and UX designer.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Advisors */}
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-6 text-center">Advisory Board</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-card/50 border-border/50 shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-foreground/70 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-sm mb-1">Twagirayezu Gaspard</h4>
                        <p className="text-xs text-foreground/60 mb-1">Strategy Advisor</p>
                        <p className="text-xs text-muted-foreground">CEO, Rwanda Space Agency. Former Minister of Education.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50 shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-foreground/70 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-sm mb-1">Natasha Harris</h4>
                        <p className="text-xs text-foreground/60 mb-1">Ventures Advisor</p>
                        <p className="text-xs text-muted-foreground">Principal, Biegert Group. Chairperson, Hope Haven.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50 shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-foreground/70 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-sm mb-1">Dr. Jean Pierre</h4>
                        <p className="text-xs text-foreground/60 mb-1">Compliance Advisor</p>
                        <p className="text-xs text-muted-foreground">President, High Court of Rwanda. Chair, AU Constitutional Committee.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">What Makes Us Different</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Phone className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Works Offline</h3>
                  <p className="text-muted-foreground text-sm">
                    Any feature phone works — even in rural zones with no internet.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Accent-Aware & Localizable</h3>
                  <p className="text-muted-foreground text-sm">
                    Built for African languages and accents, not just English.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Built for Public Sector</h3>
                  <p className="text-muted-foreground text-sm">
                    Dashboards, compliance tools, and audit trails for governments.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Lightbulb className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Adaptable Across Sectors</h3>
                  <p className="text-muted-foreground text-sm">
                    Education, health, civic programs — all on the same platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Milestones */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
            
            <div className="space-y-6">
              <Card className="bg-card border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Badge variant="secondary" className="text-xs">2025 Q1</Badge>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Founded & Pre-seed Round</h3>
                      <p className="text-sm text-muted-foreground">
                        Bakame AI founded in Kigali. Raised $20K in pre-seed capital and built MVP with Whisper + GPT-4 + TTS.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Badge variant="secondary" className="text-xs">2025 Q2</Badge>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">First Pilot Schools</h3>
                      <p className="text-sm text-muted-foreground">
                        Launched pilots in 10 schools across Rwanda, reaching 15,000 students. Signed $30K in contracts.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Badge className="text-xs bg-foreground text-background">Now</Badge>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Seed Fundraising</h3>
                      <p className="text-sm text-muted-foreground">
                        Raising $100K seed round to scale infrastructure, expand to 100 schools, and launch civic use cases.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Badge variant="outline" className="text-xs">2025 Q4</Badge>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">National Integration</h3>
                      <p className="text-sm text-muted-foreground">
                        Planned: Partner with government ministries for civic education and health information delivery.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Badge variant="outline" className="text-xs">2026</Badge>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Regional Expansion</h3>
                      <p className="text-sm text-muted-foreground">
                        Planned: Expand into Kenya and Uganda with localized content and partnerships.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="max-w-2xl mx-auto bg-card rounded-2xl p-8 border border-border">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            
            <p className="text-muted-foreground mb-6">
              Join us in building the voice internet for the 2.7 billion people offline.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => navigate('/contact')} 
                className="bg-foreground hover:bg-foreground/90 text-background px-6 py-2"
                data-testid="button-contact"
              >
                Contact Us
              </Button>
              <Button 
                onClick={() => navigate('/demo-scheduling')} 
                variant="outline" 
                className="border-border text-foreground hover:bg-muted px-6 py-2"
                data-testid="button-demo"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
