import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Calendar,
  TrendingUp,
  Clock,
  Award,
  MessageSquare,
  FileText,
  Settings,
  ChevronRight,
  Star,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for demonstration - replace with real API calls
  const teacherStats = {
    totalStudents: 32,
    activeClasses: 3,
    avgClassProgress: 78,
    hoursTeaching: 24,
    lessonsThisWeek: 12,
    assignmentsGraded: 45,
    upcomingLessons: 5,
    pendingGrading: 8
  };

  const recentActivities = [
    { id: 1, student: "Sarah Johnson", action: "completed", item: "Unit 5 Assessment", time: "2 hours ago", score: 92 },
    { id: 2, student: "Mike Chen", action: "submitted", item: "Essay: My Family", time: "3 hours ago", pending: true },
    { id: 3, student: "Emma Davis", action: "achieved", item: "Speaking Milestone", time: "5 hours ago", badge: true },
    { id: 4, student: "Class 3B", action: "average score", item: "Grammar Quiz", time: "Yesterday", score: 85 }
  ];

  const classes = [
    { id: 1, name: "English 3A", students: 28, progress: 82, nextLesson: "Present Perfect", time: "Mon 10:00 AM" },
    { id: 2, name: "Advanced Speaking", students: 15, progress: 71, nextLesson: "Debate Practice", time: "Tue 2:00 PM" },
    { id: 3, name: "Business English", students: 12, progress: 65, nextLesson: "Email Writing", time: "Thu 3:00 PM" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {user?.user_metadata?.name || "Teacher"}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Users className="h-5 w-5 text-primary" />
                <Badge variant="secondary">Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teacherStats.totalStudents}</div>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <BookOpen className="h-5 w-5 text-blue-500" />
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teacherStats.lessonsThisWeek}</div>
              <p className="text-sm text-muted-foreground">Lessons This Week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <BarChart3 className="h-5 w-5 text-green-500" />
                <span className="text-sm text-green-600">+5%</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teacherStats.avgClassProgress}%</div>
              <p className="text-sm text-muted-foreground">Avg. Class Progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <FileText className="h-5 w-5 text-orange-500" />
                {teacherStats.pendingGrading > 0 && (
                  <Badge variant="destructive">{teacherStats.pendingGrading}</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teacherStats.assignmentsGraded}</div>
              <p className="text-sm text-muted-foreground">Graded This Week</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="classes">My Classes</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* My Classes */}
              <Card>
                <CardHeader>
                  <CardTitle>My Classes</CardTitle>
                  <CardDescription>Your active classes and upcoming lessons</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {classes.map((cls) => (
                    <div key={cls.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{cls.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {cls.students} students
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Next: {cls.nextLesson} • {cls.time}
                        </p>
                        <div className="mt-2">
                          <Progress value={cls.progress} className="h-2" />
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates from your students</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        {activity.badge ? (
                          <Award className="h-4 w-4 text-primary" />
                        ) : activity.pending ? (
                          <AlertCircle className="h-4 w-4 text-orange-500" />
                        ) : (
                          <Star className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.student}</span>
                          {" "}{activity.action}{" "}
                          <span className="text-muted-foreground">{activity.item}</span>
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                          {activity.score && (
                            <Badge variant="secondary" className="text-xs">
                              Score: {activity.score}%
                            </Badge>
                          )}
                          {activity.pending && (
                            <Badge variant="outline" className="text-xs text-orange-600">
                              Needs Review
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-auto flex-col py-4"
                    onClick={() => navigate("/try")}
                  >
                    <BookOpen className="h-5 w-5 mb-2" />
                    <span className="text-sm">Create Lesson</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto flex-col py-4"
                    onClick={() => navigate("/try")}
                  >
                    <FileText className="h-5 w-5 mb-2" />
                    <span className="text-sm">Grade Work</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto flex-col py-4"
                    onClick={() => navigate("/try")}
                  >
                    <BarChart3 className="h-5 w-5 mb-2" />
                    <span className="text-sm">View Reports</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto flex-col py-4"
                    onClick={() => navigate("/try")}
                  >
                    <Calendar className="h-5 w-5 mb-2" />
                    <span className="text-sm">Schedule Class</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Detailed class management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Student roster and progress tracking coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Assignment management and grading tools coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Advanced analytics and insights coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;