import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, Shield, BarChart3, Users, TrendingUp, CheckCircle, DollarSign, Award, Clock, Globe, BookOpen, ChevronRight, Calendar, Phone, FileText, Zap, Target, Lock, HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

const ForSchools = () => {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [roiMetrics, setRoiMetrics] = useState({
    teacherHours: 0,
    costSavings: 0,
    studentImprovement: 0,
    parentSatisfaction: 0
  });

  // Animate ROI metrics on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleCards((prev) => new Set(prev).add(index));
            
            // Animate ROI metrics when visible
            if (entry.target.id === "roi-section") {
              const duration = 2000;
              const steps = 60;
              const stepTime = duration / steps;
              let step = 0;
              
              const timer = setInterval(() => {
                step++;
                const progress = step / steps;
                setRoiMetrics({
                  teacherHours: Math.floor(320 * progress),
                  costSavings: Math.floor(47 * progress),
                  studentImprovement: Math.floor(68 * progress),
                  parentSatisfaction: Math.floor(94 * progress)
                });
                if (step >= steps) clearInterval(timer);
              }, stepTime);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-index], #roi-section").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const pricingTiers = [
    {
      name: "Starter",
      students: "Up to 500 students",
      price: "$999",
      features: [
        "Core AI tutoring platform",
        "Basic analytics dashboard",
        "Email support",
        "Teacher training (online)",
        "Standard curriculum alignment"
      ]
    },
    {
      name: "Professional",
      students: "500-2000 students",
      price: "$2,999",
      popular: true,
      features: [
        "Everything in Starter, plus:",
        "Advanced analytics & reporting",
        "Priority support (phone & chat)",
        "On-site teacher training",
        "Custom curriculum mapping",
        "Parent portal access",
        "API integration"
      ]
    },
    {
      name: "Enterprise",
      students: "2000+ students",
      price: "Custom",
      features: [
        "Everything in Professional, plus:",
        "Dedicated success manager",
        "Custom AI model training",
        "White-labeling options",
        "SLA guarantees",
        "Compliance certifications",
        "Multi-school management",
        "Unlimited API access"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 md:p-8 border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-muted rounded-lg transition-all duration-300 hover:scale-105"
            data-testid="button-home"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-2xl font-bold">Bakame AI</div>
          <Badge variant="outline" className="border-blue-500/30 text-blue-500">
            For Schools
          </Badge>
        </div>
        <Button
          onClick={() => navigate("/demo-scheduling")}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:opacity-90"
          data-testid="button-schedule-demo"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Demo
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-5xl mx-auto">
          <Badge className="mb-4 bg-blue-500/10 text-blue-500 border-blue-500/30">
            Trusted by 500+ Schools Worldwide
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Transform English Education Across Your School
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Empower your teachers, engage your students, and deliver measurable learning outcomes with enterprise-grade AI technology. Join leading schools achieving 68% improvement in English proficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => navigate("/government-demo")}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:opacity-90 text-lg px-8 py-4"
              data-testid="button-get-quote"
            >
              <FileText className="mr-2 h-5 w-5" />
              Get Enterprise Quote
            </Button>
            <Button
              onClick={() => navigate("/demo-scheduling")}
              variant="outline"
              className="text-lg px-8 py-4 border-blue-500/50 hover:bg-blue-500/10"
              data-testid="button-book-demo"
            >
              <Phone className="mr-2 h-5 w-5" />
              Talk to Sales
            </Button>
          </div>
        </div>
      </section>

      {/* ROI & Impact Metrics */}
      <section id="roi-section" className="container mx-auto px-6 py-16 bg-muted/30">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Proven ROI & Impact Metrics
        </h2>
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          <Card className="text-center bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {roiMetrics.teacherHours}+ hrs
              </div>
              <p className="text-sm text-muted-foreground">Teacher time saved monthly</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {roiMetrics.costSavings}%
              </div>
              <p className="text-sm text-muted-foreground">Cost reduction in first year</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {roiMetrics.studentImprovement}%
              </div>
              <p className="text-sm text-muted-foreground">Average score improvement</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {roiMetrics.parentSatisfaction}%
              </div>
              <p className="text-sm text-muted-foreground">Parent satisfaction rate</p>
            </CardContent>
          </Card>
        </div>

        {/* ROI Calculator Preview */}
        <Card className="max-w-3xl mx-auto border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              Calculate Your School's ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Number of Students</p>
                <div className="text-2xl font-bold text-blue-600">1,200</div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Estimated Annual Savings</p>
                <div className="text-2xl font-bold text-green-600">$124,000</div>
              </div>
            </div>
            <Button 
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
              onClick={() => navigate("/pricing")}
              data-testid="button-full-calculator"
            >
              Access Full ROI Calculator
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Implementation Process */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Simple Implementation Process
        </h2>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600" style={{ transform: "translateY(-50%)" }} />
            
            {[
              { week: "Week 1", title: "Discovery & Planning", icon: Target, description: "Assess needs, map curriculum, set success metrics" },
              { week: "Week 2-3", title: "Setup & Integration", icon: Zap, description: "Platform deployment, data migration, system integration" },
              { week: "Week 4", title: "Teacher Training", icon: Users, description: "Comprehensive training, best practices, certification" },
              { week: "Week 5+", title: "Launch & Support", icon: HeadphonesIcon, description: "Go-live support, ongoing optimization, success tracking" }
            ].map((step, index) => (
              <div key={index} className="relative">
                <Card 
                  data-index={index}
                  className={`bg-card border-border backdrop-blur-sm transition-all duration-700 ${
                    visibleCards.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white relative z-10">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <Badge variant="outline" className="mb-2">{step.week}</Badge>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* School-wide Features */}
      <section className="container mx-auto px-6 py-16 bg-muted/30">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Enterprise-Grade Features for Schools
        </h2>
        
        <Tabs defaultValue="management" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="management">Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="management" className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    Centralized Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Multi-campus management dashboard</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Bulk user provisioning & management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Role-based access control</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Department-level customization</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Teacher Empowerment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">AI-powered lesson planning tools</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Automated grading & feedback</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Professional development resources</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Collaboration tools for educators</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Comprehensive Analytics Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Student Performance</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Individual progress tracking</li>
                      <li>• Learning gap identification</li>
                      <li>• Predictive performance analytics</li>
                      <li>• Benchmark comparisons</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">School-wide Insights</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Department performance metrics</li>
                      <li>• Teacher effectiveness analysis</li>
                      <li>• Resource utilization reports</li>
                      <li>• ROI tracking dashboard</li>
                    </ul>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Data Export Formats</span>
                    <div className="flex gap-2">
                      <Badge variant="secondary">CSV</Badge>
                      <Badge variant="secondary">PDF</Badge>
                      <Badge variant="secondary">API</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="compliance" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-600" />
                  Security & Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Data Protection</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Lock className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>End-to-end encryption for all data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Lock className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>FERPA & COPPA compliant</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Lock className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>GDPR & CCPA compliant</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Lock className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>SOC 2 Type II certified</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Access Control</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-blue-500 mt-0.5" />
                        <span>Single Sign-On (SSO) support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-blue-500 mt-0.5" />
                        <span>Multi-factor authentication</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-blue-500 mt-0.5" />
                        <span>IP whitelisting options</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-blue-500 mt-0.5" />
                        <span>Audit logs & monitoring</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integration" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-cyan-600" />
                  Seamless Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3">Learning Management Systems</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Canvas</Badge>
                      <Badge>Blackboard</Badge>
                      <Badge>Moodle</Badge>
                      <Badge>Google Classroom</Badge>
                      <Badge>Schoology</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Student Information Systems</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge>PowerSchool</Badge>
                      <Badge>Infinite Campus</Badge>
                      <Badge>Clever</Badge>
                      <Badge>Skyward</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Communication Platforms</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Microsoft Teams</Badge>
                      <Badge>Zoom</Badge>
                      <Badge>Slack</Badge>
                      <Badge>ClassDojo</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Pricing Tiers */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Transparent Pricing for Every School Size
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Flexible pricing options designed to fit your budget and scale with your growth
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative ${tier.popular ? 'border-blue-500 border-2' : 'border-border'}`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.students}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  {tier.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full mt-6 ${
                    tier.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' 
                      : 'variant-outline'
                  }`}
                  onClick={() => navigate("/demo-scheduling")}
                  data-testid={`button-select-${tier.name.toLowerCase()}`}
                >
                  {tier.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section className="container mx-auto px-6 py-16 bg-muted/30">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Success Stories from Leading Schools
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              school: "Lincoln International Academy",
              location: "New York, USA",
              students: "2,400 students",
              results: "73% improvement in English proficiency scores",
              quote: "Bakame AI transformed how we teach English. Our teachers save 15 hours weekly, and students are more engaged than ever.",
              author: "Dr. Sarah Johnson, Principal"
            },
            {
              school: "St. Mary's School Network",
              location: "London, UK",
              students: "5,200 students",
              results: "£380,000 saved in first year",
              quote: "The ROI was immediate. We reduced tutoring costs by 60% while improving outcomes across all grade levels.",
              author: "Michael Chen, Director of Education"
            },
            {
              school: "Tokyo International School",
              location: "Tokyo, Japan",
              students: "1,800 students",
              results: "91% parent satisfaction rate",
              quote: "Parents love the progress tracking and personalized support their children receive. Enrollment increased by 22%.",
              author: "Yuki Tanaka, Head of School"
            }
          ].map((study, index) => (
            <Card key={index} className="bg-card border-border">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Award className="h-8 w-8 text-yellow-500" />
                  <Badge variant="outline">{study.location}</Badge>
                </div>
                <CardTitle className="text-lg">{study.school}</CardTitle>
                <CardDescription>{study.students}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg">
                  <p className="text-sm font-medium text-green-600">{study.results}</p>
                </div>
                <blockquote className="italic text-sm text-muted-foreground">
                  "{study.quote}"
                </blockquote>
                <p className="text-xs font-medium">— {study.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Partnership Benefits
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  Growth Partnership
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Co-marketing opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Joint research initiatives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Pilot program participation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Advisory board opportunities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Professional Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Quarterly training workshops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">AI in education certification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Best practices library access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Peer learning community</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your School's English Program?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 500+ schools achieving exceptional results with Bakame AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/government-demo")}
              className="bg-white text-blue-600 hover:bg-gray-100"
              data-testid="button-request-proposal"
            >
              <FileText className="mr-2 h-5 w-5" />
              Request Enterprise Proposal
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/demo-scheduling")}
              className="border-white text-white hover:bg-white/10"
              data-testid="button-schedule-consultation"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Consultation
            </Button>
          </div>
          <p className="mt-6 text-sm opacity-75">
            No credit card required • Full support included • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
};

export default ForSchools;