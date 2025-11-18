import { useNavigate } from "react-router-dom";
import { Check, Building, Users, Shield, Zap, Phone, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter",
      price: "$99",
      period: "/month",
      description: "Perfect for small schools starting their English learning program",
      features: [
        "Up to 500 students",
        "Basic English conversation practice", 
        "Student progress tracking",
        "Teacher dashboard access",
        "Email support",
        "Works offline"
      ],
      cta: "Start Free Trial",
      popular: false,
      icon: Users
    },
    {
      name: "Professional",
      price: "$499",
      period: "/month", 
      description: "Ideal for medium to large schools",
      features: [
        "Up to 2,500 students",
        "Advanced English curriculum integration",
        "Detailed learning analytics",
        "Priority support",
        "Teacher training included",
        "Custom lesson plans",
        "Parent progress reports",
        "Pronunciation assessment"
      ],
      cta: "Try Demo",
      popular: true,
      icon: Building
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "Comprehensive solution for school districts and large institutions",
      features: [
        "Unlimited students",
        "District-wide deployment",
        "Custom English curriculum development",
        "24/7 dedicated support team",
        "White-label solutions",
        "Advanced security & compliance",
        "On-premise deployment options",
        "Custom AI tutor training",
        "Service level agreements",
        "Dedicated account manager"
      ],
      cta: "Contact Sales",
      popular: false,
      icon: Shield
    }
  ];

  const additionalFeatures = [
    {
      icon: Phone,
      title: "Works Anywhere",
      description: "Full functionality with or without internet connectivity"
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Meets educational data privacy and security requirements"
    },
    {
      icon: Zap,
      title: "Quick Implementation", 
      description: "Quick and efficient implementation process"
    },
    {
      icon: Users,
      title: "Scalable Solution",
      description: "Grows with your school from pilot to district-wide"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your school. All plans include our AI English tutoring with offline capabilities.
          </p>
          <Badge variant="outline" className="border-primary/30 text-primary">
            30-day free trial • No setup fees • Cancel anytime
          </Badge>
        </section>

        {/* Pricing Cards */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <Card 
                  key={index} 
                  className={`relative bg-card border-border ${plan.popular ? 'ring-2 ring-primary shadow-lg scale-105' : ''} hover:shadow-lg transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent className="pt-4">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      onClick={() => navigate('/demo-scheduling')}
                      className={`w-full transition-all duration-300 hover:scale-105 ${
                        plan.popular 
                          ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                          : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Additional Features */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Schools Choose Bakame AI for English Learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {additionalFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Can I upgrade or downgrade my plan?</h3>
                  <p className="text-muted-foreground">Yes, you can change your plan at any time. Changes take effect at your next billing cycle, and we'll prorate any differences.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">What happens if I exceed my monthly interaction limit?</h3>
                  <p className="text-muted-foreground">We'll notify you when approaching your limit. Additional interactions may incur extra charges, or you can upgrade your plan.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Is there a setup fee?</h3>
                  <p className="text-muted-foreground">No setup fees for Starter and Professional plans. Enterprise deployments may include one-time implementation costs depending on customization requirements.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Do you offer educational discounts?</h3>
                  <p className="text-muted-foreground">Yes! We offer special pricing for schools, educational institutions, and non-profit organizations. Contact our sales team for details.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-card/50 to-card/30 rounded-3xl p-12 border border-border">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join schools worldwide that are improving English learning outcomes with AI-powered tutoring technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/demo-scheduling')}
                className="bg-primary hover:opacity-90 text-primary-foreground px-8 py-3 text-lg"
              >
                Schedule a Demo
              </Button>
              <Button 
                onClick={() => navigate('/contact')}
                variant="outline" 
                className="border-border text-foreground hover:bg-muted px-8 py-3 text-lg"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Pricing;