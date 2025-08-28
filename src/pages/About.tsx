import { useNavigate } from "react-router-dom";
import { ArrowLeft, Target, Eye, Heart, Users, Globe, Shield, Zap, MapPin, Clock, Award, TrendingUp, Lightbulb, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedCounter from "@/components/AnimatedCounter";
const About = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 md:p-8 border-b border-border">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-2xl font-bold">Bakame AI</div>
        </div>
        <div className="hidden md:flex space-x-8">
          
          <button onClick={() => navigate('/demo-scheduling')} className="text-muted-foreground hover:text-foreground transition-colors">Demo</button>
          <button onClick={() => navigate('/team')} className="text-muted-foreground hover:text-foreground transition-colors">Team</button>
          <button onClick={() => navigate('/contact')} className="text-muted-foreground hover:text-foreground transition-colors">Contact</button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <Badge variant="outline" className="border-border text-muted-foreground mb-4 animate-fade-in">
            Breaking barriers since 2025
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
            The AI Revolution That 
            <span className="text-foreground"> Works Everywhere</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto animate-fade-in" style={{animationDelay: '0.4s'}}>
            What if I told you that <strong>2.9 billion people</strong> still lack reliable internet access? 
            Yet they deserve the same AI-powered opportunities as anyone else. That's why we built 
            Bakame AI – to make cutting-edge technology work <em>everywhere</em>, not just in Silicon Valley.
          </p>
          <div className="flex items-center justify-center gap-6 mt-8 animate-fade-in" style={{animationDelay: '0.6s'}}>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Kigali, Rwanda</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Founded 2025</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Award className="w-4 h-4" />
              <span>AI Innovation Award</span>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Story That Started It All</h2>
              <div className="w-20 h-1 bg-foreground mx-auto"></div>
            </div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>
              
              <div className="space-y-12">
                <div className="relative flex items-start gap-8 group hover:transform hover:scale-[1.02] transition-all duration-300">
                  <div className="hidden md:block w-16 h-16 bg-muted rounded-full flex items-center justify-center relative z-10">
                    <Lightbulb className="w-8 h-8" />
                  </div>
                  <Card className="flex-1 bg-card border-border group-hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <Badge variant="outline" className="mb-3 border-border text-muted-foreground">The Problem</Badge>
                      <p className="text-lg leading-relaxed">
                        Picture this: A teacher in rural Rwanda trying to help students learn English, but the internet cuts out <em>again</em>. 
                        A government official needing to reach remote communities during an emergency, but cellular towers are down. 
                        These weren't just technical problems—they were human problems that required a fundamentally different approach.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="relative flex items-start gap-8 group hover:transform hover:scale-[1.02] transition-all duration-300">
                  <div className="hidden md:block w-16 h-16 bg-muted rounded-full flex items-center justify-center relative z-10">
                    <Rocket className="w-8 h-8" />
                  </div>
                  <Card className="flex-1 bg-card border-border group-hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <Badge variant="outline" className="mb-3 border-border text-muted-foreground">The Breakthrough</Badge>
                      <p className="text-lg leading-relaxed">
                        After 18 months of relentless innovation, we cracked the code: <strong>AI that works without the internet</strong>. 
                        Not a dumbed-down version, but full-powered artificial intelligence running locally. 
                        Suddenly, a student in the most remote village could have the same AI tutor as someone in New York City.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="relative flex items-start gap-8 group hover:transform hover:scale-[1.02] transition-all duration-300">
                  <div className="hidden md:block w-16 h-16 bg-muted rounded-full flex items-center justify-center relative z-10">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <Card className="flex-1 bg-card border-border group-hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <Badge variant="outline" className="mb-3 border-border text-muted-foreground">The Impact</Badge>
                      <p className="text-lg leading-relaxed">
                        Today, Bakame AI powers education in schools across Africa, enables government services in remote regions, 
                        and helps businesses communicate effectively regardless of connectivity. We're not just building software—
                        <strong>we're democratizing the future</strong>.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Drives Us Forward</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every line of code, every sleepless night, every breakthrough—it all comes back to these core beliefs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-card border-border text-center group hover:scale-105 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-muted/80 transition-colors">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Democratize AI for everyone.</strong> We refuse to accept a world where your zip code determines 
                  your access to cutting-edge technology. Every person deserves AI-powered opportunities, period.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border text-center group hover:scale-105 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-muted/80 transition-colors">
                  <Eye className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>A connected world without barriers.</strong> Imagine a farmer in rural Kenya getting the same 
                  AI-powered insights as a CEO in Silicon Valley. That's the future we're building, one offline AI at a time.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border text-center group hover:scale-105 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-muted/80 transition-colors">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Values</h3>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Humanity first, technology second.</strong> Every algorithm we write, every feature we build 
                  starts with a simple question: "How can this make someone's life genuinely better?"
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What Makes Us Different</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <Globe className="w-8 h-8 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Offline-First Technology</h3>
                  <p className="text-muted-foreground">
                    Our AI works completely offline, ensuring communication never stops, 
                    even in the most remote locations or during network outages.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Shield className="w-8 h-8 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Privacy by Design</h3>
                  <p className="text-muted-foreground">
                    Your data never leaves your premises. Local processing ensures 
                    ultimate privacy and security for sensitive communications.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Users className="w-8 h-8 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Cultural Sensitivity</h3>
                  <p className="text-muted-foreground">
                    Built with African languages and contexts in mind, our AI 
                    understands cultural nuances and local communication patterns.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Zap className="w-8 h-8 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Lightning Performance</h3>
                  <p className="text-muted-foreground">
                    Local processing means instant responses without the latency 
                    and bandwidth limitations of cloud-based solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Numbers */}
        <section className="mb-20">
          <div className="bg-muted/30 rounded-3xl p-12 max-w-6xl mx-auto border border-border">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Impact, Real Numbers</h2>
              <p className="text-lg text-muted-foreground">
                These aren't just statistics—they're stories of transformation happening right now.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group hover:scale-110 transition-transform duration-300">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <AnimatedCounter end="50K" duration={2000} />+
                </div>
                <p className="text-muted-foreground">Students Learning Daily</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Across 3 countries</p>
              </div>
              
              <div className="group hover:scale-110 transition-transform duration-300">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <AnimatedCounter end="99.9%" duration={2500} />
                </div>
                <p className="text-muted-foreground">Uptime Guarantee</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Even offline</p>
              </div>
              
              <div className="group hover:scale-110 transition-transform duration-300">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <AnimatedCounter end="24H" duration={2000} />
                </div>
                <p className="text-muted-foreground">Implementation Time</p>
                <p className="text-xs text-muted-foreground/70 mt-1">From sign-up to live</p>
              </div>
              
              <div className="group hover:scale-110 transition-transform duration-300">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <AnimatedCounter end="15+" duration={1500} />
                </div>
                <p className="text-muted-foreground">Languages Supported</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Growing daily</p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Badge variant="outline" className="border-border text-muted-foreground px-6 py-2">
                Our goal: Reach 1M users by 2026
              </Badge>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="max-w-4xl mx-auto bg-card rounded-3xl p-12 border border-border">
            <Badge variant="outline" className="border-border text-muted-foreground mb-6">
              Join the AI Revolution
            </Badge>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Make AI Work 
              <span className="text-foreground"> Everywhere?</span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
              Don't let connectivity limitations hold you back. Join <strong>50,000+ students, 200+ schools, 
              and dozens of organizations</strong> who've already discovered what AI can do when it works everywhere.
            </p>
            
            <p className="text-sm text-muted-foreground/80 mb-8">
              Free 30-day trial • 24-hour setup • Works offline from day one
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/contact')} className="bg-foreground hover:bg-foreground/90 text-background px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Start Your Free Trial
              </Button>
              <Button onClick={() => navigate('/demo-scheduling')} variant="outline" className="border-border text-foreground hover:bg-muted px-8 py-4 text-lg hover:scale-105 transition-all duration-300">
                See It In Action
              </Button>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-foreground/60 rounded-full"></div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-foreground/60 rounded-full"></div>
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-foreground/60 rounded-full"></div>
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>;
};
export default About;