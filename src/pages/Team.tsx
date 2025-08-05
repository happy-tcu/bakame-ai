import { useNavigate } from "react-router-dom";
import { ArrowLeft, Linkedin, Twitter, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const Team = () => {
  const navigate = useNavigate();
  const teamMembers = [{
    name: "Happy Herman",
    role: "CEO",
    bio: "Civics Action leader, Startups Expert, Qatar Foundation Amb. and Founder of The Street Bridge Inc.",
    image: "HH",
    linkedin: "#",
    twitter: "#",
    email: "happy@bakame.ai"
  }, {
    name: "Aime Byiringiro",
    role: "CTO",
    bio: "Serial Entrepreneur, Organizational Strategist, and Seasoned Software Developer. Currently works at Dell Technologies",
    image: "AB",
    linkedin: "#",
    twitter: "#",
    email: "aime@bakame.ai"
  }];
  const coaches = [{
    name: "Angelo Biasi",
    role: "COACH",
    bio: "Coach, World Class Entrepreneur & CEO of Solvably and Credibly.ai",
    image: "AB"
  }];
  const mentors = [{
    name: "Paul Evans",
    role: "MENTOR",
    bio: "Associate Director, Institute for Entrepreneurship and Innovation",
    image: "PE"
  }];
  const advisors = [{
    name: "Annelise Joy",
    role: "ADVISOR (STRATEGY)",
    bio: "Philanthropist, Spaceship & Robotics Investor at E Space",
    image: "AJ"
  }, {
    name: "Natasha Harris",
    role: "ADVISOR (VENTURES)",
    bio: "Principle of Biegert Group, Inc. and Chairperson of Hope Haven",
    image: "NH"
  }, {
    name: "J. Dr. Jean Pierre",
    role: "ADVISOR (COMPLIANCY)",
    bio: "President of the High Court HQ of the Republic of Rwanda",
    image: "JP"
  }];
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
          <button onClick={() => navigate('/about')} className="text-muted-foreground hover:text-foreground transition-colors">About</button>
          
          <button onClick={() => navigate('/contact')} className="text-muted-foreground hover:text-foreground transition-colors">Contact</button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Meet The Team and Advisors</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
            We've built civic, cloud, and scalable systems
          </p>
        </section>

        {/* Core Team */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => <Card key={index} className="bg-card/50 border-border hover:bg-card transition-colors">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary-foreground font-bold text-lg">{member.image}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3 uppercase tracking-wide">{member.role}</p>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-3">
                    <a href={member.linkedin} className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href={member.twitter} className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a href={`mailto:${member.email}`} className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </section>

        {/* Coaches */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Coaches</h2>
          <div className="grid grid-cols-1 max-w-md mx-auto">
            {coaches.map((coach, index) => <Card key={index} className="bg-card/50 border-secondary hover:bg-card transition-colors">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-secondary-foreground font-bold">{coach.image}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1">{coach.name}</h3>
                    <p className="text-secondary font-medium mb-3 uppercase tracking-wide">{coach.role}</p>
                  </div>
                  <p className="text-muted-foreground text-sm">{coach.bio}</p>
                </CardContent>
              </Card>)}
          </div>
        </section>

        {/* Mentors */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Mentors</h2>
          <div className="grid grid-cols-1 max-w-md mx-auto">
            {mentors.map((mentor, index) => <Card key={index} className="bg-card/50 border-accent hover:bg-card transition-colors">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-accent-foreground font-bold">{mentor.image}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1">{mentor.name}</h3>
                    <p className="text-accent font-medium mb-3 uppercase tracking-wide">{mentor.role}</p>
                  </div>
                  <p className="text-muted-foreground text-sm">{mentor.bio}</p>
                </CardContent>
              </Card>)}
          </div>
        </section>

        {/* Advisory Board */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Advisory Board</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {advisors.map((advisor, index) => <Card key={index} className="bg-card/50 border-muted hover:bg-card transition-colors">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-muted-foreground to-muted-foreground/80 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-background font-bold">{advisor.image}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1">{advisor.name}</h3>
                    <p className="text-muted-foreground font-medium mb-3 uppercase tracking-wide">{advisor.role}</p>
                  </div>
                  <p className="text-muted-foreground text-sm">{advisor.bio}</p>
                </CardContent>
              </Card>)}
          </div>
        </section>

        {/* Company Culture */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Culture</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-card/50 border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Diversity & Inclusion</h3>
                  <p className="text-muted-foreground">
                    We believe diverse perspectives lead to better solutions. Our team spans 
                    multiple continents, cultures, and backgrounds, bringing unique insights 
                    to every challenge.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Innovation First</h3>
                  <p className="text-muted-foreground">
                    We encourage experimentation and bold thinking. Our team has the freedom 
                    to explore new ideas and push the boundaries of what's possible with AI.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Impact Driven</h3>
                  <p className="text-muted-foreground">
                    Every decision we make is guided by our mission to democratize AI. 
                    We measure success not just by revenue, but by the lives we impact.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Remote First</h3>
                  <p className="text-muted-foreground">
                    We practice what we preach about accessibility. Our distributed team 
                    works from locations worldwide, connected by our shared mission.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Join Us */}
        <section className="text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-muted-foreground text-lg mb-8">
              We're always looking for talented individuals who share our passion for 
              making AI accessible to everyone. If you're excited about solving complex 
              challenges and creating global impact, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/contact')} className="px-8 py-3 text-lg">
                View Open Positions
              </Button>
              <Button onClick={() => navigate('/contact')} variant="outline" className="px-8 py-3 text-lg">
                Get in Touch
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>;
};
export default Team;