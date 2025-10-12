import { useNavigate } from "react-router-dom";
import { BookOpen, Users, BarChart3, Clock, Award, CheckCircle, Star, Download, Calendar, Play, ChevronRight, GraduationCap, Target, Zap, TrendingUp, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/components/auth/AuthContext";
import { hasRole } from "@/utils/roleUtils";
import TeacherDashboard from "@/components/progress/TeacherDashboard";

const ForTeachers = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scrollY, setScrollY] = useState(0);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  
  // Check if user is authenticated and has teacher role
  const isTeacher = user && hasRole(user, "teacher");
  
  // Redirect to homepage with auth modal if accessing protected content
  useEffect(() => {
    // If user tries to access teacher dashboard without authentication
    if (!user && window.location.search.includes("dashboard")) {
      navigate("/", { state: { openAuth: true } });
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleCards((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-index]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // If user is authenticated as a teacher, show the teacher dashboard
  if (isTeacher) {
    return <TeacherDashboard />;
  }

  // Otherwise show the public teacher information page
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Empower Your English Classroom with AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Save hours on grading, track student progress effortlessly, and create engaging lessons that inspire learning. Join thousands of teachers transforming their classrooms with AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => navigate("/try")}
              className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4"
            >
              <Play className="mr-2 h-5 w-5" />
              See It In Action
            </Button>
            <Button
              onClick={() => navigate("/demo-scheduling")}
              variant="outline"
              className="text-lg px-8 py-4"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Get Personal Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          We Understand Your Daily Challenges
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: Clock,
              title: "Endless Grading Hours",
              description: "Spending nights and weekends grading papers instead of planning engaging lessons",
              solution: "AI automates grading with detailed feedback in seconds"
            },
            {
              icon: BarChart3,
              title: "Tracking Individual Progress",
              description: "Struggling to monitor each student's progress and identify those who need extra help",
              solution: "Real-time dashboards show individual progress at a glance"
            },
            {
              icon: Users,
              title: "Student Engagement",
              description: "Keeping students motivated and engaged, especially those who are shy to speak up",
              solution: "AI tutors provide safe, judgment-free practice anytime"
            }
          ].map((pain, index) => (
            <Card
              key={index}
              data-index={index}
              className={`bg-card border-border backdrop-blur-sm transition-all duration-700 ${
                visibleCards.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <CardHeader>
                <pain.icon className="h-8 w-8 text-destructive mb-2" />
                <CardTitle>{pain.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{pain.description}</CardDescription>
                <div className="text-sm text-primary font-medium">
                  <CheckCircle className="h-4 w-4 inline mr-2" />
                  {pain.solution}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Key Features for Teachers */}
      <section className="container mx-auto px-6 py-16 bg-muted/30">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Features Designed for Your Success
        </h2>
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Teacher Dashboard */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Comprehensive Teacher Dashboard</h3>
                  <p className="text-muted-foreground mb-4">
                    See all your classes, student progress, and upcoming assignments in one place. Identify struggling students instantly with AI-powered insights.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Class Average Progress</span>
                      <span className="text-primary font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Smart Lesson Planning</h3>
                  <p className="text-muted-foreground">
                    Generate complete lesson plans aligned with curriculum standards. Customize activities based on your students' proficiency levels and learning styles.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Automated Grading & Feedback</h3>
                  <p className="text-muted-foreground">
                    Grade speaking exercises, essays, and homework instantly. Provide personalized, constructive feedback that helps students improve.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Demo Area */}
          <div className="space-y-6">
            <div className="bg-bg-white text-black hover:bg-gray-200-to-br from-primary/10 to-accent/10 rounded-xl p-8 border border-border">
              <h3 className="text-2xl font-semibold mb-6">Your Daily Time Savings</h3>
              <div className="space-y-4">
                {[
                  { task: "Grading assignments", saved: "3 hours/week", percentage: 85 },
                  { task: "Progress tracking", saved: "2 hours/week", percentage: 70 },
                  { task: "Lesson preparation", saved: "4 hours/week", percentage: 60 },
                  { task: "Parent communication", saved: "1 hour/week", percentage: 50 }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.task}</span>
                      <span className="text-primary font-medium">{item.saved}</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                <p className="text-center">
                  <span className="text-3xl font-bold text-primary">10+ hours</span>
                  <br />
                  <span className="text-muted-foreground">saved every week</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Get Started in 3 Simple Steps
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              step: 1,
              title: "Set Up Your Classes",
              description: "Import your student roster and customize settings for each class. Takes less than 5 minutes.",
              icon: GraduationCap
            },
            {
              step: 2,
              title: "Assign AI-Powered Activities",
              description: "Choose from our library or create custom exercises. Students can practice anytime, anywhere.",
              icon: Target
            },
            {
              step: 3,
              title: "Monitor & Guide Progress",
              description: "Watch students improve in real-time. Focus your attention where it's needed most.",
              icon: TrendingUp
            }
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="absolute -top-4 left-6 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  {item.step}
                </div>
                <item.icon className="h-12 w-12 text-primary mb-4 mt-2" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
              {index < 2 && (
                <ChevronRight className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 py-16 bg-muted/30">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Trusted by Teachers Worldwide
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: "Sarah Johnson",
              role: "High School English Teacher",
              school: "Lincoln High School",
              quote: "Bakame AI has revolutionized my classroom. I can finally give each student the individual attention they deserve, and my evenings are mine again!",
              rating: 5
            },
            {
              name: "Michael Chen",
              role: "ESL Instructor",
              school: "International Academy",
              quote: "The speaking practice feature is incredible. My shy students are now confident speakers, practicing with AI tutors until they're ready to participate in class.",
              rating: 5
            }
          ].map((testimonial, index) => (
            <Card key={index} className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                <CardDescription>
                  {testimonial.role} • {testimonial.school}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Resources Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Resources to Support Your Teaching
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: BookOpen,
              title: "Lesson Plan Library",
              description: "1000+ ready-to-use lesson plans aligned with curriculum standards",
              action: "Browse Library"
            },
            {
              icon: Award,
              title: "Professional Development",
              description: "Free webinars and courses on AI-enhanced teaching methods",
              action: "View Schedule"
            },
            {
              icon: MessageSquare,
              title: "Teacher Community",
              description: "Connect with other educators, share tips, and get support",
              action: "Join Community"
            }
          ].map((resource, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary transition-colors">
              <CardHeader>
                <resource.icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{resource.description}</CardDescription>
                <Button variant="link" className="p-0 h-auto text-primary">
                  {resource.action} <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-bg-white text-black hover:bg-gray-200-to-r from-primary/10 to-accent/10 rounded-3xl p-12 text-center border border-border">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of teachers who are saving time, improving student outcomes, and rekindling their passion for teaching.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/demo-scheduling")}
              className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4"
            >
              Schedule Your Demo
            </Button>
            <Button
              onClick={() => navigate("/try")}
              variant="outline"
              className="text-lg px-8 py-4"
            >
              Try It Free
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required • Setup in minutes • Full support included
          </p>
        </div>
      </section>
    </div>
  );
};

export default ForTeachers;