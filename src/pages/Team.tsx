
import { useState } from "react";
import { Users, Mail, Linkedin, Github, Twitter } from "lucide-react";

const Team = () => {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  const teamMembers = [
    {
      id: "founder",
      name: "Founder & CEO",
      role: "Leading AI Innovation",
      bio: "Passionate about building AI solutions that work for everyone, everywhere.",
      email: "happy@bakame.org",
      linkedin: "#",
      twitter: "#",
      github: "#"
    },
    {
      id: "cto",
      name: "Chief Technology Officer",
      role: "Engineering Excellence",
      bio: "Expert in offline-first technologies and scalable AI systems.",
      email: "tech@bakame.org",
      linkedin: "#",
      twitter: "#",
      github: "#"
    },
    {
      id: "research",
      name: "Head of Research",
      role: "AI & Language Models",
      bio: "Specializing in low-resource language processing and speech recognition.",
      email: "research@bakame.org",
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  ];

  const values = [
    {
      icon: Users,
      title: "Inclusive Innovation",
      description: "We believe technology should work for everyone, regardless of location or infrastructure."
    },
    {
      icon: Mail,
      title: "Open Communication",
      description: "Transparency and collaboration are at the heart of everything we do."
    },
    {
      icon: Users,
      title: "Global Impact",
      description: "Our work focuses on creating solutions that can transform communities worldwide."
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
          <a href="/ivr" className="text-muted-foreground hover:text-foreground transition-colors">IVR Demo</a>
          <a href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a>
          <a href="mailto:happy@bakame.org" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Meet Our Team
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
          We're a diverse group of innovators, engineers, and researchers united by a shared mission to make AI communication accessible worldwide.
        </p>
      </div>

      {/* Team Members */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border hover:bg-card/80 transition-all duration-300 hover:scale-105 group"
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-center">{member.name}</h3>
              <p className="text-accent text-center mb-4">{member.role}</p>
              <p className="text-muted-foreground text-center mb-6">{member.bio}</p>
              
              <div className="flex justify-center space-x-4">
                <a href={`mailto:${member.email}`} className="text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
                <a href={member.linkedin} className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={member.twitter} className="text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href={member.github} className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Company Values */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Our Values
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The principles that guide our work and shape our vision for the future of AI communication.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <div key={index} className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border hover:bg-card/80 transition-all duration-300 hover:scale-105 group text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-6 mx-auto group-hover:bg-accent/30 transition-colors">
                <value.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Join Us Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-12 border border-border">
            <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for creating accessible AI solutions. If you're interested in joining our team, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:careers@bakame.org" 
                className="bg-gradient-to-r from-accent to-secondary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                View Open Positions
              </a>
              <a 
                href="mailto:happy@bakame.org" 
                className="border border-border text-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-card/50 transition-all duration-300 hover:scale-105"
              >
                Send Us Your Resume
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

export default Team;
