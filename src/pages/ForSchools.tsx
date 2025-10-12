import { useNavigate } from "react-router-dom";
import { Building2, Shield, BarChart3, Users, TrendingUp, CheckCircle, DollarSign, Award, Clock, Globe, BookOpen, ChevronRight, Calendar, Phone, FileText, Zap, Target, Lock, HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/components/auth/AuthContext";
import { hasRole } from "@/utils/roleUtils";
import SchoolAdminDashboard from "@/components/progress/SchoolAdminDashboard";

const ForSchools = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [roiMetrics, setRoiMetrics] = useState({
    teacherHours: "Substantial",
    costSavings: "Significant",
    studentImprovement: "Remarkable",
    parentSatisfaction: "Excellent"
  });
  
  // Check if user is authenticated and has school role
  const isSchoolAdmin = user && hasRole(user, "school");
  
  // Redirect to homepage with auth modal if accessing protected content
  useEffect(() => {
    // If user tries to access school dashboard without authentication
    if (!user && window.location.search.includes("dashboard")) {
      navigate("/", { state: { openAuth: true } });
    }
  }, [user, navigate]);

  // Animate ROI metrics on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleCards((prev) => new Set(prev).add(index));
            
            // Show ROI metrics when visible
            if (entry.target.id === "roi-section") {
              setRoiMetrics({
                teacherHours: "Substantial",
                costSavings: "Significant",
                studentImprovement: "Remarkable",
                parentSatisfaction: "Excellent"
              });
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


  // If user is authenticated as a school admin, show the school admin dashboard
  if (isSchoolAdmin) {
    return <SchoolAdminDashboard />;
  }

  // Otherwise show the public school information page
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-5xl mx-auto">
          <Badge className="mb-4 bg-gray-500/10 text-gray-500 border-gray-500/30">
            Enterprise-Grade AI for Education
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Transform English Education Across Your School
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Empower your teachers, engage your students, and deliver measurable learning outcomes with enterprise-grade AI technology designed specifically for educational institutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => navigate("/demo-scheduling")}
              className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4"
              data-testid="button-get-quote"
            >
              <FileText className="mr-2 h-5 w-5" />
              Get Enterprise Quote
            </Button>
            <Button
              onClick={() => navigate("/demo-scheduling")}
              variant="outline"
              className="text-lg px-8 py-4 border-gray-500/50 hover:bg-gray-500/10"
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
          <Card className="text-center bg-gradient-to-br from-gray-500/10 to-gray-500/10 border-gray-500/30">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-gray-600 mb-2">
                {roiMetrics.teacherHours}
              </div>
              <p className="text-sm text-muted-foreground">Teacher time saved monthly</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {roiMetrics.costSavings}
              </div>
              <p className="text-sm text-muted-foreground">Cost reduction achieved</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {roiMetrics.studentImprovement}
              </div>
              <p className="text-sm text-muted-foreground">Student improvement</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {roiMetrics.parentSatisfaction}
              </div>
              <p className="text-sm text-muted-foreground">Parent satisfaction</p>
            </CardContent>
          </Card>
        </div>

        {/* ROI Calculator Preview */}
        <Card className="max-w-3xl mx-auto border-gray-500/30 bg-gradient-to-br from-gray-500/5 to-gray-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-gray-600" />
              Calculate Your School's ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Your School Size</p>
                <div className="text-2xl font-bold text-gray-600">Customizable</div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Potential Annual Savings</p>
                <div className="text-2xl font-bold text-green-600">Significant</div>
              </div>
            </div>
            <Button 
              className="w-full mt-6 bg-gradient-to-r from-gray-600 to-gray-600 text-white hover:opacity-90"
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
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-600" style={{ transform: "translateY(-50%)" }} />
            
            {[
              { week: "Phase 1", title: "Discovery & Planning", icon: Target, description: "Assess needs, map curriculum, set success metrics" },
              { week: "Phase 2", title: "Setup & Integration", icon: Zap, description: "Platform deployment, data migration, system integration" },
              { week: "Phase 3", title: "Teacher Training", icon: Users, description: "Comprehensive training, best practices, certification" },
              { week: "Phase 4", title: "Launch & Support", icon: HeadphonesIcon, description: "Go-live support, ongoing optimization, success tracking" }
            ].map((step, index) => (
              <div key={index} className="relative">
                <Card 
                  data-index={index}
                  className={`bg-card border-border backdrop-blur-sm transition-all duration-700 ${
                    visibleCards.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white relative z-10">
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
                    <Building2 className="h-5 w-5 text-gray-600" />
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
                        <Shield className="h-4 w-4 text-gray-500 mt-0.5" />
                        <span>Single Sign-On (SSO) support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-gray-500 mt-0.5" />
                        <span>Multi-factor authentication</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-gray-500 mt-0.5" />
                        <span>IP whitelisting options</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-gray-500 mt-0.5" />
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
                  <Globe className="h-5 w-5 text-gray-600" />
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

      {/* Contact Sales Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Custom Pricing for Your School
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Every school has unique needs. Let's create a tailored solution that fits your budget and requirements.
          </p>
          
          <div className="bg-card border border-border rounded-lg p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div>
                <DollarSign className="h-10 w-10 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Flexible Pricing</h3>
                <p className="text-sm text-muted-foreground">
                  Solutions that scale with your school size and budget
                </p>
              </div>
              <div>
                <Shield className="h-10 w-10 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Enterprise Security</h3>
                <p className="text-sm text-muted-foreground">
                  FERPA compliant with data privacy guarantees
                </p>
              </div>
              <div>
                <HeadphonesIcon className="h-10 w-10 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Dedicated Support</h3>
                <p className="text-sm text-muted-foreground">
                  Personal success manager and 24/7 priority support
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold text-white">What's Included:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
                {[
                  "Full AI tutoring platform access",
                  "Custom curriculum alignment",
                  "Teacher training & onboarding",
                  "Parent portal access",
                  "Advanced analytics dashboard",
                  "API integration support",
                  "Multi-school management",
                  "White-labeling options"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/contact")}
                className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4"
                data-testid="button-contact-sales"
              >
                <Phone className="mr-2 h-5 w-5" />
                Contact Sales Team
              </Button>
              <Button
                onClick={() => navigate("/demo-scheduling")}
                variant="outline"
                className="text-lg px-8 py-4 border-white/20 hover:bg-white/10"
                data-testid="button-schedule-demo"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Demo
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              Typical response time: Within 24 hours
            </p>
          </div>
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
            
            <Card className="bg-gradient-to-br from-gray-500/10 to-gray-500/10 border-gray-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-gray-600" />
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
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-gray-600 to-gray-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your School's English Program?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the power of AI-driven education designed for your school's success
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/demo-scheduling")}
              className="bg-white text-gray-600 hover:bg-gray-100"
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