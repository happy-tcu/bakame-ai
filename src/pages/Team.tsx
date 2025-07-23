
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Linkedin, Twitter, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Team = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: "Dr. Amina Kone",
      role: "CEO & Co-Founder",
      bio: "Former AI researcher at MIT with 15 years of experience in natural language processing. Passionate about making AI accessible to underserved communities.",
      image: "AK",
      linkedin: "#",
      twitter: "#",
      email: "amina@bakame.ai"
    },
    {
      name: "David Okafor",
      role: "CTO & Co-Founder",
      bio: "Ex-Google engineer specializing in distributed systems and offline-first architecture. Expert in building scalable AI infrastructure.",
      image: "DO",
      linkedin: "#",
      twitter: "#",
      email: "david@bakame.ai"
    },
    {
      name: "Sarah Chen",
      role: "Head of Product",
      bio: "Product leader with 10+ years at Microsoft and Dropbox. Focused on creating intuitive AI experiences for diverse global audiences.",
      image: "SC",
      linkedin: "#",
      twitter: "#",
      email: "sarah@bakame.ai"
    },
    {
      name: "Marcus Johnson",
      role: "Head of Engineering",
      bio: "Full-stack engineer with expertise in AI/ML systems. Previously led teams at Spotify and built scalable voice recognition systems.",
      image: "MJ",
      linkedin: "#",
      twitter: "#",
      email: "marcus@bakame.ai"
    },
    {
      name: "Dr. Fatima Al-Rashid",
      role: "Chief AI Officer",
      bio: "PhD in Computational Linguistics from Stanford. Specializes in multilingual AI models and cross-cultural communication systems.",
      image: "FA",
      linkedin: "#",
      twitter: "#",
      email: "fatima@bakame.ai"
    },
    {
      name: "James Mwangi",
      role: "Head of Business Development",
      bio: "Former McKinsey consultant with deep expertise in African markets. Leads partnerships with governments and NGOs across the continent.",
      image: "JM",
      linkedin: "#",
      twitter: "#",
      email: "james@bakame.ai"
    }
  ];

  const advisors = [
    {
      name: "Prof. Kwame Asante",
      role: "Advisor - AI Ethics",
      bio: "Professor of Computer Science at University of Ghana. Leading expert in ethical AI and digital inclusion in Africa.",
      image: "KA"
    },
    {
      name: "Maria Rodriguez",
      role: "Advisor - International Markets",
      bio: "Former VP of International at WhatsApp. Specialist in scaling communication platforms across emerging markets.",
      image: "MR"
    },
    {
      name: "Dr. John Smith",
      role: "Technical Advisor",
      bio: "Former Chief Scientist at IBM Watson. Pioneer in offline AI processing and edge computing technologies.",
      image: "JS"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 md:p-8 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-2xl font-bold">Bakame AI</div>
        </div>
        <div className="hidden md:flex space-x-8">
          <button onClick={() => navigate('/about')} className="text-white/70 hover:text-white transition-colors">About</button>
          <button onClick={() => navigate('/solutions/education')} className="text-white/70 hover:text-white transition-colors">Solutions</button>
          <button onClick={() => navigate('/contact')} className="text-white/70 hover:text-white transition-colors">Contact</button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Meet Our Team</h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto">
            We're a diverse group of engineers, researchers, and innovators united by a 
            common mission: making AI accessible to everyone, everywhere.
          </p>
        </section>

        {/* Core Team */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-lg">{member.image}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-blue-400 font-medium mb-3">{member.role}</p>
                  </div>
                  <p className="text-white/80 text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-3">
                    <a href={member.linkedin} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href={member.twitter} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a href={`mailto:${member.email}`} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Advisors */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Advisory Board</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {advisors.map((advisor, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">{advisor.image}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1">{advisor.name}</h3>
                    <p className="text-green-400 font-medium mb-3">{advisor.role}</p>
                  </div>
                  <p className="text-white/80 text-sm">{advisor.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Company Culture */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Culture</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Diversity & Inclusion</h3>
                  <p className="text-white/80">
                    We believe diverse perspectives lead to better solutions. Our team spans 
                    multiple continents, cultures, and backgrounds, bringing unique insights 
                    to every challenge.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Innovation First</h3>
                  <p className="text-white/80">
                    We encourage experimentation and bold thinking. Our team has the freedom 
                    to explore new ideas and push the boundaries of what's possible with AI.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Impact Driven</h3>
                  <p className="text-white/80">
                    Every decision we make is guided by our mission to democratize AI. 
                    We measure success not just by revenue, but by the lives we impact.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Remote First</h3>
                  <p className="text-white/80">
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
            <p className="text-white/80 text-lg mb-8">
              We're always looking for talented individuals who share our passion for 
              making AI accessible to everyone. If you're excited about solving complex 
              challenges and creating global impact, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/contact')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              >
                View Open Positions
              </Button>
              <Button 
                onClick={() => navigate('/contact')}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg"
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Team;
