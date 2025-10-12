import { ContactForm } from '@/components/forms/ContactForm';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MessageCircle, Headphones, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
const Contact = () => {
  return <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 py-12">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-6">
                Contact Our Team
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Connect with our government solutions team for customized pricing and implementation strategies tailored to your organization's needs.
              </p>
            </div>

            {/* Government Sales Section */}
            <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-600/30 mb-12">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl flex items-center">
                    <Building className="mr-3 h-6 w-6 text-blue-400" />
                    Government & Enterprise Solutions
                  </CardTitle>
                  <Badge className="bg-blue-600/20 text-blue-300 border-blue-600/30">
                    B2G Solutions
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground mb-6">
                  For government organizations requiring custom pricing, compliance documentation, and enterprise-level support.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-background/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Direct Sales Contact</h4>
                    <a href="mailto:sales@bakame.org" className="text-blue-400 hover:text-blue-300 flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      sales@bakame.org
                    </a>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">What We Offer</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Custom pricing packages</li>
                      <li>• Compliance & security reviews</li>
                      <li>• Dedicated account management</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <ContactForm />
              
              <div className="space-y-8">
                <div className="bg-card backdrop-blur-sm rounded-3xl p-6 border border-border shadow-sm">
                  <h3 className="text-xl font-semibold text-card-foreground mb-4">Quick Response</h3>
                  <p className="text-muted-foreground mb-4">
                    Our support team typically responds within 24 hours during business days.
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center hover:text-foreground transition-colors p-3 border border-border/50 rounded-lg bg-background/30 hover:bg-background/50">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      Technical support
                    </li>
                    <li className="flex items-center hover:text-foreground transition-colors p-3 border border-border/50 rounded-lg bg-background/30 hover:bg-background/50">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      Implementation guidance
                    </li>
                    <li className="flex items-center hover:text-foreground transition-colors p-3 border border-border/50 rounded-lg bg-background/30 hover:bg-background/50">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      Custom solution design
                    </li>
                    <li className="flex items-center hover:text-foreground transition-colors p-3 border border-border/50 rounded-lg bg-background/30 hover:bg-background/50">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      Training and documentation
                    </li>
                  </ul>
                </div>

                <div className="bg-card backdrop-blur-sm rounded-3xl p-6 border border-border shadow-sm">
                  <h3 className="text-xl font-semibold text-card-foreground mb-4">Alternative Support</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-primary" />
                      <span>General Support: happy@bakame.org</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-2 text-primary" />
                      <span>Government Sales: sales@bakame.org</span>
                    </div>
                    
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Live Chat: Available on our main website</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Headphones className="w-4 h-4 mr-2 text-primary" />
                      <span>Live Agent: Request immediate assistance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Contact;