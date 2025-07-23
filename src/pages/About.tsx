
import { useState } from "react";
import { Target, Globe, Zap, Shield } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const About = () => {
  const [activeTab, setActiveTab] = useState("mission");

  const milestones = [
    {
      year: "2023",
      title: "Company Founded",
      description: "Started with a vision to make AI communication accessible worldwide"
    },
    {
      year: "2024",
      title: "First Pilot Programs",
      description: "Launched initial deployments in educational institutions"
    },
    {
      year: "2025",
      title: "International Expansion",
      description: "Expanding to government and enterprise solutions globally"
    }
  ];

  const tabs = [
    {
      id: "mission",
      label: "Mission",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Our Mission</h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            To democratize access to AI-powered communication technology by creating solutions that work reliably in any environment, 
            regardless of internet connectivity or infrastructure limitations. We believe that everyone deserves access to advanced 
            communication tools, whether they're in a bustling city or a remote rural area.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card/50 rounded-lg p-6 border border-border">
              <Target className="w-8 h-8 text-accent mb-4" />
              <h4 className="font-semibold mb-2">Accessibility First</h4>
              <p className="text-sm text-muted-foreground">
                Building solutions that work for everyone, everywhere, without requiring advanced infrastructure.
              </p>
            </div>
            <div className="bg-card/50 rounded-lg p-6 border border-border">
              <Globe className="w-8 h-8 text-secondary mb-4" />
              <h4 className="font-semibold mb-2">Global Impact</h4>
              <p className="text-sm text-muted-foreground">
                Focusing on regions and communities that have been underserved by traditional technology solutions.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "vision",
      label: "Vision",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Our Vision</h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We envision a world where language barriers and infrastructure limitations don't prevent access to information, 
            education, and essential services. Through our offline-first AI solutions, we're working to create a more 
            connected and equitable world.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card/50 rounded-lg p-6 border border-border">
              <Zap className="w-8 h-8 text-accent mb-4" />
              <h4 className="font-semibold mb-2">Innovation</h4>
              <p className="text-sm text-muted-foreground">
                Pioneering new approaches to AI that prioritize reliability and accessibility over pure performance.
              </p>
            </div>
            <div className="bg-card/50 rounded-lg p-6 border border-border">
              <Shield className="w-8 h-8 text-secondary mb-4" />
              <h4 className="font-semibold mb-2">Trust & Security</h4>
              <p className="text-sm text-muted-foreground">
                Building secure, privacy-focused solutions that organizations and individuals can trust.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "story",
      label: "Our Story",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Our Story</h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Bakame AI was born from a simple observation: while AI technology was advancing rapidly, it wasn't reaching 
            the people who needed it most. We started with a focus on English language education in Rwanda, but quickly 
            realized that the principles of offline-first, accessible AI could transform communication across many sectors.
          </p>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm">
                  {milestone.year}
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{milestone.title}</h4>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center p-6 md:p-8">
        <a href="/" className="text-2xl font-bold">Bakame AI</a>
        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
          <a href="/solutions/education" className="text-muted-foreground hover:text-foreground transition-colors">Solutions</a>
          <a href="/team" className="text-muted-foreground hover:text-foreground transition-colors">Team</a>
          <a href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a>
          <a href="mailto:happy@bakame.org" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          About Bakame AI
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
          We're building the future of AI communication, one that works for everyone, everywhere.
        </p>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
          <div className="group">
            <AnimatedCounter end="12" duration={2000} className="text-3xl font-bold mb-2 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent" />
            <div className="text-muted-foreground">Active Pilots</div>
          </div>
          <div className="group">
            <AnimatedCounter end="3" duration={2000} className="text-3xl font-bold mb-2 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent" />
            <div className="text-muted-foreground">Countries</div>
          </div>
          <div className="group">
            <AnimatedCounter end="45K" duration={2000} className="text-3xl font-bold mb-2 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent" />
            <div className="text-muted-foreground">Hours of Data</div>
          </div>
          <div className="group">
            <AnimatedCounter end="2K+" duration={2000} className="text-3xl font-bold mb-2 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent" />
            <div className="text-muted-foreground">Test Calls</div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-12 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-semibold transition-all duration-300 border-b-2 ${
                  activeTab === tab.id
                    ? 'text-accent border-accent'
                    : 'text-muted-foreground border-transparent hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
            {tabs.find(tab => tab.id === activeTab)?.content}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-12 border border-border">
            <h2 className="text-3xl font-bold mb-6">Ready to Learn More?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover how Bakame AI can transform communication in your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:happy@bakame.org" 
                className="bg-gradient-to-r from-accent to-secondary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                Get in Touch
              </a>
              <a 
                href="/ivr" 
                className="border border-border text-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-card/50 transition-all duration-300 hover:scale-105"
              >
                Try Our Demo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
            <a href="/team" className="text-muted-foreground hover:text-foreground transition-colors">Team</a>
            <a href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a>
            <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a>
          </div>
          <p className="text-muted-foreground text-xs">© 2025 Bakame AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
