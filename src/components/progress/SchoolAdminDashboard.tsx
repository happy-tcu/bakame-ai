import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2,
  Users, 
  BarChart3, 
  Calendar,
  TrendingUp,
  DollarSign,
  Award,
  FileText,
  Settings,
  ChevronRight,
  AlertCircle,
  Shield,
  GraduationCap,
  BookOpen,
  Clock,
  Target
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";

const SchoolAdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for demonstration - replace with real API calls
  const schoolStats = {
    totalStudents: 1250,
    totalTeachers: 48,
    activeClasses: 72,
    avgSchoolProgress: 76,
    monthlyActiveUsers: 1180,
    completionRate: 84,
    parentEngagement: 67,
    platformUsageHours: 3420
  };

  const departmentMetrics = [
    { name: "Primary English", students: 450, teachers: 18, progress: 82, trend: "+5%" },
    { name: "Secondary English", students: 380, teachers: 15, progress: 74, trend: "+3%" },
    { name: "Advanced English", students: 220, teachers: 10, progress: 78, trend: "+7%" },
    { name: "Business English", students: 200, teachers: 5, progress: 71, trend: "+2%" }
  ];

  const recentAlerts = [
    { id: 1, type: "success", message: "Q3 learning targets exceeded by 12%", time: "2 hours ago" },
    { id: 2, type: "warning", message: "5 teachers need license renewal", time: "5 hours ago" },
    { id: 3, type: "info", message: "New curriculum update available", time: "1 day ago" },
    { id: 4, type: "success", message: "Parent satisfaction survey: 92% positive", time: "2 days ago" }
  ];

  const teacherPerformance = [
    { id: 1, name: "Sarah Thompson", classes: 3, students: 85, rating: 4.8, completion: 92 },
    { id: 2, name: "John Martinez", classes: 4, students: 112, rating: 4.6, completion: 88 },
    { id: 3, name: "Emily Chen", classes: 3, students: 78, rating: 4.9, completion: 95 },
    { id: 4, name: "Michael Brown", classes: 2, students: 56, rating: 4.7, completion: 87 }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "success": return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "warning": return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case "info": return <Shield className="h-4 w-4 text-blue-500" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">School Administrator Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user?.user_metadata?.name || "Administrator"}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Reports
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                School Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Users className="h-5 w-5 text-primary" />
                <Badge variant="secondary">Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{schoolStats.totalStudents.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Total Students</p>
              <div className="mt-2 flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>94% active this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <GraduationCap className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-green-600">+8%</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{schoolStats.totalTeachers}</div>
              <p className="text-sm text-muted-foreground">Active Teachers</p>
              <div className="mt-2 flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>{schoolStats.activeClasses} classes running</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Target className="h-5 w-5 text-green-500" />
                <Badge className="bg-green-500/10 text-green-600">On Track</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{schoolStats.avgSchoolProgress}%</div>
              <p className="text-sm text-muted-foreground">Curriculum Progress</p>
              <Progress value={schoolStats.avgSchoolProgress} className="h-2 mt-2" />
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <DollarSign className="h-5 w-5 text-purple-500" />
                <span className="text-sm text-green-600">Optimal</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{schoolStats.completionRate}%</div>
              <p className="text-sm text-muted-foreground">Course Completion</p>
              <div className="mt-2 flex items-center text-xs text-muted-foreground">
                <Award className="h-3 w-3 mr-1" />
                <span>Above district average</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Department Performance */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Department Performance</CardTitle>
                  <CardDescription>Performance metrics by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departmentMetrics.map((dept, index) => (
                      <div key={index} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{dept.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {dept.trend}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Students:</span>
                            <span className="ml-2 font-medium">{dept.students}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Teachers:</span>
                            <span className="ml-2 font-medium">{dept.teachers}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Progress:</span>
                            <span className="ml-2 font-medium">{dept.progress}%</span>
                          </div>
                        </div>
                        <Progress value={dept.progress} className="h-2 mt-3" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Alerts & Updates */}
              <Card>
                <CardHeader>
                  <CardTitle>Alerts & Updates</CardTitle>
                  <CardDescription>Important notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <p className="text-sm">{alert.message}</p>
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4">
                    View All Notifications
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Top Teachers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Teachers</CardTitle>
                <CardDescription>Based on student progress and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-muted-foreground border-b">
                        <th className="pb-3">Teacher</th>
                        <th className="pb-3">Classes</th>
                        <th className="pb-3">Students</th>
                        <th className="pb-3">Rating</th>
                        <th className="pb-3">Completion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teacherPerformance.map((teacher) => (
                        <tr key={teacher.id} className="border-b hover:bg-muted/30">
                          <td className="py-3 font-medium">{teacher.name}</td>
                          <td className="py-3">{teacher.classes}</td>
                          <td className="py-3">{teacher.students}</td>
                          <td className="py-3">
                            <div className="flex items-center gap-1">
                              <Award className="h-4 w-4 text-yellow-500" />
                              <span>{teacher.rating}</span>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <Progress value={teacher.completion} className="h-2 w-20" />
                              <span className="text-sm">{teacher.completion}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Administrative Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-auto flex-col py-4"
                    onClick={() => navigate("/pricing")}
                  >
                    <FileText className="h-5 w-5 mb-2" />
                    <span className="text-sm">Generate Report</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto flex-col py-4"
                    onClick={() => navigate("/contact")}
                  >
                    <Users className="h-5 w-5 mb-2" />
                    <span className="text-sm">Manage Staff</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto flex-col py-4"
                    onClick={() => navigate("/contact")}
                  >
                    <BookOpen className="h-5 w-5 mb-2" />
                    <span className="text-sm">Curriculum</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto flex-col py-4"
                    onClick={() => navigate("/support")}
                  >
                    <Shield className="h-5 w-5 mb-2" />
                    <span className="text-sm">Support</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Detailed department management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teachers">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Teacher management and performance tracking coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Advanced analytics and reporting coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">School settings and configuration coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SchoolAdminDashboard;