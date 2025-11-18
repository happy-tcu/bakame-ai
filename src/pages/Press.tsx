import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Download,
  Mail,
  Phone,
  Calendar,
  FileText,
  Image,
  Palette,
  Type,
  Award,
  Newspaper,
  User,
  Building,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  Globe,
  Linkedin,
  Twitter
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";

const Press = () => {
  const { toast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("press@bakame.ai");
    setCopiedEmail(true);
    toast({
      title: "Email copied!",
      description: "Press email has been copied to clipboard."
    });
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("+1 (555) 123-4567");
    setCopiedPhone(true);
    toast({
      title: "Phone copied!",
      description: "Press phone number has been copied to clipboard."
    });
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleDownload = (fileName: string) => {
    const link = document.createElement("a");
    link.href = `/brand-assets/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: `${fileName} is being downloaded.`
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inquiry sent!",
      description: "We'll get back to you within 24 hours."
    });
  };

  const pressReleases = [];

  const brandColors = [
    { name: "Pure Black", hex: "#000000", rgb: "0, 0, 0" },
    { name: "Pure White", hex: "#FFFFFF", rgb: "255, 255, 255" },
    { name: "Brand Blue", hex: "#0066FF", rgb: "0, 102, 255" },
    { name: "Gray 900", hex: "#1A1A1A", rgb: "26, 26, 26" },
    { name: "Gray 700", hex: "#4A4A4A", rgb: "74, 74, 74" },
    { name: "Gray 300", hex: "#CCCCCC", rgb: "204, 204, 204" }
  ];

  const logoVariants = [
    { name: "Logo Horizontal Black", file: "Logo horizonatal black.svg", type: "SVG" },
    { name: "Logo Horizontal White", file: "Logo horizonatal white.svg", type: "SVG" },
    { name: "Logo Horizontal Blue", file: "Logo horizonatal blue.svg", type: "SVG" },
    { name: "Logo Vertical Black", file: "Logo Vertical Black.svg", type: "SVG" },
    { name: "Logo Vertical White", file: "Logo Vertical White.svg", type: "SVG" },
    { name: "Logo Vertical Blue", file: "Logo Vertical Blue.svg", type: "SVG" },
    { name: "Icon Black", file: "Icon Black.png", type: "PNG" },
    { name: "Icon White", file: "Icon White.png", type: "PNG" },
    { name: "Icon Blue", file: "Icon Blue.png", type: "PNG" }
  ];

  const pressArticles = [
    {
      publication: "TechCrunch",
      date: "December 2024",
      title: "How Bakame AI is Making Quality Education Accessible to Millions",
      link: "#"
    },
    {
      publication: "Forbes",
      date: "November 2024",
      title: "The Future of Education: AI-Powered Learning in Africa",
      link: "#"
    },
    {
      publication: "The Verge",
      date: "October 2024",
      title: "Bakame AI's Voice Technology Breaks Language Barriers",
      link: "#"
    },
    {
      publication: "MIT Technology Review",
      date: "September 2024",
      title: "10 Breakthrough Technologies: AI Education Platforms",
      link: "#"
    }
  ];

  const awards = [
    { year: "2024", title: "TIME Best Inventions", organization: "TIME Magazine" },
    { year: "2025", title: "CREATE Award", organization: "CREATE Organization" },
    { year: "2024", title: "AI Excellence Award", organization: "Business Intelligence Group" },
    { year: "2023", title: "Innovation in Education", organization: "UNESCO" }
  ];

  const executives = [
    {
      name: "Happy Herman",
      role: "CEO",
      bio: "Civics Action leader, Startups Expert, Qatar Foundation Ambassador, and Founder of The Street Bridge Inc.",
      image: "/lovable-uploads/5a0d8cef-f727-4d56-8b84-f064ace377c7.png"
    },
    {
      name: "Aime Byiringiro",
      role: "CTO",
      bio: "Serial Entrepreneur, Organizational Strategist, and Seasoned Software Developer. Currently works at Dell Technologies.",
      image: "/lovable-uploads/a40d3f7c-3281-41fc-8a55-76ebc92497e5.png"
    }
  ];

  const stats = [
    { value: "Growing", label: "Active User Base" },
    { value: "Multiple", label: "Countries Served" },
    { value: "High", label: "User Satisfaction" },
    { value: "Multilingual", label: "Language Support" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6">
            <Badge variant="outline" className="border-white/30 text-white">
              Press & Media
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold">
              Press & Media Resources
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Get the latest news, brand assets, and media resources about Bakame AI.
              For press inquiries, contact our media relations team.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={handleCopyEmail}
                variant="outline" 
                className="border-white/30 hover:bg-white hover:text-black"
                data-testid="button-copy-email"
              >
                <Mail className="mr-2 h-4 w-4" />
                press@bakame.ai
                {copiedEmail ? <Check className="ml-2 h-4 w-4" /> : <Copy className="ml-2 h-4 w-4" />}
              </Button>
              <Button 
                onClick={handleCopyPhone}
                variant="outline" 
                className="border-white/30 hover:bg-white hover:text-black"
                data-testid="button-copy-phone"
              >
                <Phone className="mr-2 h-4 w-4" />
                Contact for phone number
                {copiedPhone ? <Check className="ml-2 h-4 w-4" /> : <Copy className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases Section */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl md:text-4xl font-bold">Press Releases</h2>
            </div>
            
            <Card className="bg-gray-900/50 border-white/10">
              <CardContent className="p-8 text-center">
                <p className="text-gray-400 text-lg">
                  Press releases will be posted here when available. For immediate inquiries, please contact our press team.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-6 border-white/30 hover:bg-white hover:text-black"
                  onClick={handleCopyEmail}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Press Team
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Brand Assets Section */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Brand Assets</h2>
            
            <Tabs defaultValue="logos" className="space-y-8">
              <TabsList className="bg-gray-900/50 border border-white/10">
                <TabsTrigger value="logos" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  <Image className="mr-2 h-4 w-4" />
                  Logos
                </TabsTrigger>
                <TabsTrigger value="colors" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  <Palette className="mr-2 h-4 w-4" />
                  Colors
                </TabsTrigger>
                <TabsTrigger value="typography" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  <Type className="mr-2 h-4 w-4" />
                  Typography
                </TabsTrigger>
              </TabsList>

              <TabsContent value="logos" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {logoVariants.map((logo, index) => (
                    <Card 
                      key={index} 
                      className="bg-gray-900/50 border-white/10 hover:border-white/30 transition-all"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-sm text-white">{logo.name}</CardTitle>
                            <Badge variant="outline" className="border-white/20 text-gray-400 mt-2">
                              {logo.type}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <AspectRatio ratio={16 / 9} className="bg-white/5 rounded-lg">
                          <div className="flex items-center justify-center h-full">
                            {logo.file.includes('White') ? (
                              <div className="bg-black p-4 rounded">
                                <img 
                                  src={`/brand-assets/${logo.file}`} 
                                  alt={logo.name}
                                  className="h-12 w-auto"
                                />
                              </div>
                            ) : (
                              <img 
                                src={`/brand-assets/${logo.file}`} 
                                alt={logo.name}
                                className="h-12 w-auto"
                              />
                            )}
                          </div>
                        </AspectRatio>
                        <Button 
                          onClick={() => handleDownload(logo.file)}
                          variant="outline" 
                          className="w-full mt-4 border-white/30 hover:bg-white hover:text-black"
                          data-testid={`button-download-logo-${index}`}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download {logo.type}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Card className="bg-gray-900/50 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Brand Guidelines</CardTitle>
                    <CardDescription className="text-gray-400">
                      Complete brand guidelines including logo usage, spacing requirements, and dos and don'ts.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline"
                      className="border-white/30 hover:bg-white hover:text-black"
                      data-testid="button-download-guidelines"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Download Brand Guidelines (PDF)
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="colors" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {brandColors.map((color, index) => (
                    <Card key={index} className="bg-gray-900/50 border-white/10">
                      <CardHeader>
                        <div 
                          className="h-24 rounded-lg border border-white/20"
                          style={{ backgroundColor: color.hex }}
                        />
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <h3 className="font-semibold text-white">{color.name}</h3>
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-400">HEX: <span className="text-white font-mono">{color.hex}</span></p>
                          <p className="text-gray-400">RGB: <span className="text-white font-mono">{color.rgb}</span></p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="typography" className="space-y-6">
                <Card className="bg-gray-900/50 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Typography</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Satoshi' }}>
                        Satoshi - Primary Typeface
                      </h3>
                      <p className="text-gray-400 mb-4">
                        Satoshi is our primary typeface, used for all headings, body text, and UI elements.
                      </p>
                      <div className="space-y-3 p-6 bg-black/50 rounded-lg">
                        <p className="text-4xl font-black" style={{ fontFamily: 'Satoshi' }}>
                          Aa Bb Cc - Black (900)
                        </p>
                        <p className="text-3xl font-bold" style={{ fontFamily: 'Satoshi' }}>
                          Aa Bb Cc - Bold (700)
                        </p>
                        <p className="text-2xl font-medium" style={{ fontFamily: 'Satoshi' }}>
                          Aa Bb Cc - Medium (500)
                        </p>
                        <p className="text-xl" style={{ fontFamily: 'Satoshi' }}>
                          Aa Bb Cc - Regular (400)
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      className="border-white/30 hover:bg-white hover:text-black"
                      data-testid="button-download-fonts"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Font Package
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Media Kit Section */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Media Kit</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Company Fact Sheet */}
              <Card className="bg-gray-900/50 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Building className="mr-2 h-5 w-5" />
                    Company Fact Sheet
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Founded</h4>
                    <p className="text-white">2022</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Headquarters</h4>
                    <p className="text-white">Kigali, Rwanda & San Francisco, USA</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Mission</h4>
                    <p className="text-white">Making quality education accessible to every student through AI</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Total Funding</h4>
                    <p className="text-white">Private funding information available upon request</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-white/30 hover:bg-white hover:text-black"
                    data-testid="button-download-factsheet"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Full Fact Sheet
                  </Button>
                </CardContent>
              </Card>

              {/* Statistics */}
              <Card className="bg-gray-900/50 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Key Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center p-4 bg-black/50 rounded-lg">
                        <p className="text-3xl font-bold text-white">{stat.value}</p>
                        <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Executive Bios */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Executive Team</h3>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {executives.map((exec, index) => (
                  <Card key={index} className="bg-gray-900/50 border-white/10">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <img src={exec.image} alt={exec.name} className="w-full h-full object-cover grayscale" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg text-white">{exec.name}</CardTitle>
                          <CardDescription className="text-gray-400">{exec.role}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-sm">{exec.bio}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-4 border-white/30 hover:bg-white hover:text-black"
                        data-testid={`button-download-bio-${index}`}
                      >
                        <Download className="mr-2 h-3 w-3" />
                        Download Bio & Photo
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Product Screenshots */}
            <Card className="bg-gray-900/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Product Screenshots & Media</CardTitle>
                <CardDescription className="text-gray-400">
                  High-resolution screenshots and product images for media use
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <AspectRatio key={i} ratio={16 / 9} className="bg-white/5 rounded-lg">
                      <div className="flex items-center justify-center h-full">
                        <Image className="h-12 w-12 text-white/20" />
                      </div>
                    </AspectRatio>
                  ))}
                </div>
                <Button 
                  variant="outline"
                  className="border-white/30 hover:bg-white hover:text-black"
                  data-testid="button-download-screenshots"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download All Screenshots (ZIP)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Press Coverage Section */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Press Coverage & Awards</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Featured Articles */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center">
                  <Newspaper className="mr-2 h-5 w-5" />
                  Featured Articles
                </h3>
                <div className="space-y-3">
                  {pressArticles.map((article, index) => (
                    <Card key={index} className="bg-gray-900/50 border-white/10 hover:border-white/30 transition-all">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="border-white/20 text-gray-400">
                                {article.publication}
                              </Badge>
                              <span className="text-xs text-gray-500">{article.date}</span>
                            </div>
                            <CardTitle className="text-sm text-white">{article.title}</CardTitle>
                          </div>
                          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Awards */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Awards & Recognition
                </h3>
                <div className="space-y-3">
                  {awards.map((award, index) => (
                    <Card key={index} className="bg-gray-900/50 border-white/10">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-sm text-white">{award.title}</CardTitle>
                            <CardDescription className="text-gray-400">
                              {award.organization} • {award.year}
                            </CardDescription>
                          </div>
                          <Award className="h-5 w-5 text-yellow-500" />
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press Contact Section */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Press Contact</h2>
              <p className="text-gray-400">
                For media inquiries, interview requests, or additional information, 
                please contact our press team.
              </p>
              
              <div className="space-y-4">
                <Card className="bg-gray-900/50 border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-white">Media Relations Team</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <span className="text-white">press@bakame.ai</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span className="text-white">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-gray-400" />
                      <span className="text-white">bakame.ai/press</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-white">Follow Us</CardTitle>
                  </CardHeader>
                  <CardContent className="flex gap-3">
                    <Button variant="outline" size="sm" className="border-white/30 hover:bg-white hover:text-black">
                      <Twitter className="mr-2 h-4 w-4" />
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/30 hover:bg-white hover:text-black">
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Press Inquiry Form */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Send Press Inquiry</h3>
              <Card className="bg-gray-900/50 border-white/10">
                <CardContent className="pt-6">
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-white">First Name</Label>
                        <Input 
                          id="firstName"
                          placeholder="John"
                          className="bg-black/50 border-white/20 text-white placeholder:text-gray-500"
                          data-testid="input-first-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-white">Last Name</Label>
                        <Input 
                          id="lastName"
                          placeholder="Doe"
                          className="bg-black/50 border-white/20 text-white placeholder:text-gray-500"
                          data-testid="input-last-name"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input 
                        id="email"
                        type="email"
                        placeholder="john.doe@publication.com"
                        className="bg-black/50 border-white/20 text-white placeholder:text-gray-500"
                        data-testid="input-email"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="organization" className="text-white">Organization</Label>
                      <Input 
                        id="organization"
                        placeholder="TechCrunch"
                        className="bg-black/50 border-white/20 text-white placeholder:text-gray-500"
                        data-testid="input-organization"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="deadline" className="text-white">Deadline</Label>
                      <Input 
                        id="deadline"
                        type="date"
                        className="bg-black/50 border-white/20 text-white"
                        data-testid="input-deadline"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white">Message</Label>
                      <Textarea 
                        id="message"
                        placeholder="Please describe your media inquiry..."
                        className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 min-h-[120px]"
                        data-testid="input-message"
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full bg-white text-black hover:bg-gray-200"
                      data-testid="button-submit-inquiry"
                    >
                      Send Press Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>&copy; 2024 Bakame AI. All rights reserved. Press materials are for media use only.</p>
        </div>
      </footer>
    </div>
  );
};

export default Press;