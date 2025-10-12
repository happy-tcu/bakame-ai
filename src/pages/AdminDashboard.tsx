import { useState, useMemo, useEffect } from "react";
import { 
  Users, UserPlus, Activity, Shield, TrendingUp, Download, Settings, 
  FileText, Search, Filter, ChevronDown, Edit, Ban, Trash2, MoreVertical,
  ArrowUpRight, ArrowDownRight, CheckCircle, AlertCircle, Clock, Calendar,
  PieChart as PieChartIcon, BarChart3, LineChart as LineChartIcon,
  RefreshCw, Bell, Mail, UserCheck, UserX, Eye, Key, Database
} from "lucide-react";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  ChartContainer, ChartTooltip, ChartTooltipContent,
  ChartLegend, ChartLegendContent 
} from "@/components/ui/chart";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/components/auth/AuthContext";
import AnimatedCounter from "@/components/AnimatedCounter";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Get admin's name from auth context
  const adminName = user?.user_metadata?.name || "Administrator";
  const adminInitials = adminName.split(' ').map((n: string) => n[0]).join('').toUpperCase();
  const adminEmail = user?.email || "admin@example.com";
  
  // State for user management
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [editingUser, setEditingUser] = useState<any>(null);
  
  const itemsPerPage = 10;
  
  // Mock data for demonstration - in production, this would come from an API
  const [users] = useState([
    { id: "1", name: "John Smith", email: "john@example.com", role: "student", registeredAt: "2024-01-15", lastActive: "2 hours ago", status: "active" },
    { id: "2", name: "Sarah Johnson", email: "sarah@example.com", role: "teacher", registeredAt: "2024-01-10", lastActive: "1 hour ago", status: "active" },
    { id: "3", name: "Mike Davis", email: "mike@example.com", role: "student", registeredAt: "2024-01-08", lastActive: "3 days ago", status: "active" },
    { id: "4", name: "Emily Wilson", email: "emily@example.com", role: "admin", registeredAt: "2023-12-20", lastActive: "Just now", status: "active" },
    { id: "5", name: "Alex Brown", email: "alex@example.com", role: "student", registeredAt: "2024-01-12", lastActive: "5 hours ago", status: "suspended" },
    { id: "6", name: "Lisa Anderson", email: "lisa@example.com", role: "teacher", registeredAt: "2024-01-05", lastActive: "1 day ago", status: "active" },
    { id: "7", name: "Tom Martinez", email: "tom@example.com", role: "student", registeredAt: "2024-01-18", lastActive: "4 hours ago", status: "active" },
    { id: "8", name: "Rachel Green", email: "rachel@example.com", role: "student", registeredAt: "2024-01-20", lastActive: "6 hours ago", status: "active" },
    { id: "9", name: "David Lee", email: "david@example.com", role: "teacher", registeredAt: "2024-01-03", lastActive: "2 days ago", status: "active" },
    { id: "10", name: "Jennifer Taylor", email: "jennifer@example.com", role: "student", registeredAt: "2024-01-22", lastActive: "Just now", status: "active" },
    { id: "11", name: "Robert Johnson", email: "robert@example.com", role: "student", registeredAt: "2024-01-25", lastActive: "1 hour ago", status: "active" },
    { id: "12", name: "Maria Garcia", email: "maria@example.com", role: "teacher", registeredAt: "2024-01-11", lastActive: "30 minutes ago", status: "active" },
  ]);
  
  // Overview statistics
  const stats = {
    totalUsers: users.length,
    activeToday: users.filter(u => u.lastActive.includes("hour") || u.lastActive.includes("Just now")).length,
    newThisWeek: 8,
    systemHealth: 98
  };
  
  // Filter and sort users
  const filteredUsers = useMemo(() => {
    let filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
    
    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortBy as keyof typeof a];
      let bVal = b[sortBy as keyof typeof b];
      
      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
    
    return filtered;
  }, [users, searchTerm, roleFilter, sortBy, sortOrder]);
  
  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Chart data
  const userGrowthData = [
    { day: "Jan 1", users: 120 },
    { day: "Jan 5", users: 145 },
    { day: "Jan 10", users: 178 },
    { day: "Jan 15", users: 195 },
    { day: "Jan 20", users: 220 },
    { day: "Jan 25", users: 245 },
    { day: "Jan 30", users: 268 },
  ];
  
  const roleDistributionData = [
    { name: "Students", value: 180, fill: "#3b82f6" },
    { name: "Teachers", value: 65, fill: "#10b981" },
    { name: "Admins", value: 23, fill: "#8b5cf6" },
  ];
  
  const activityHeatmapData = [
    { hour: "00:00", Monday: 20, Tuesday: 25, Wednesday: 30, Thursday: 22, Friday: 18, Saturday: 15, Sunday: 12 },
    { hour: "06:00", Monday: 45, Tuesday: 50, Wednesday: 48, Thursday: 52, Friday: 40, Saturday: 35, Sunday: 30 },
    { hour: "12:00", Monday: 80, Tuesday: 85, Wednesday: 88, Thursday: 82, Friday: 75, Saturday: 60, Sunday: 55 },
    { hour: "18:00", Monday: 95, Tuesday: 92, Wednesday: 90, Thursday: 88, Friday: 85, Saturday: 70, Sunday: 65 },
    { hour: "23:00", Monday: 30, Tuesday: 28, Wednesday: 25, Thursday: 22, Friday: 35, Saturday: 40, Sunday: 38 },
  ];
  
  // Chart configurations
  const chartConfig = {
    users: {
      label: "Users",
      color: "hsl(var(--primary))",
    },
    Students: {
      label: "Students",
      color: "#3b82f6",
    },
    Teachers: {
      label: "Teachers",
      color: "#10b981",
    },
    Admins: {
      label: "Admins",
      color: "#8b5cf6",
    },
  };
  
  // Actions
  const handleEditRole = (userId: string, newRole: string) => {
    toast({
      title: "Role updated",
      description: `User role has been changed to ${newRole}.`,
    });
  };
  
  const handleSuspendUser = (userId: string) => {
    toast({
      title: "User suspended",
      description: "The user account has been suspended.",
      variant: "destructive",
    });
  };
  
  const handleDeleteUser = (userId: string) => {
    toast({
      title: "User deleted",
      description: "The user account has been permanently deleted.",
      variant: "destructive",
    });
  };
  
  const handleExportCSV = () => {
    const csv = [
      ["Name", "Email", "Role", "Registered", "Last Active", "Status"],
      ...filteredUsers.map(u => [u.name, u.email, u.role, u.registeredAt, u.lastActive, u.status])
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    
    toast({
      title: "Export successful",
      description: "User data has been exported to CSV.",
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Admin Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Avatar className="h-14 w-14">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                {adminInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {adminName}</h1>
              <p className="text-muted-foreground">Admin Dashboard • {adminEmail}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" data-testid="button-refresh">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" data-testid="button-notifications">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-total-users">
                <AnimatedCounter end={stats.totalUsers.toString()} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500 inline-flex items-center">
                  <ArrowUpRight className="h-3 w-3" />
                  12%
                </span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Today</CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-active-users">
                <AnimatedCounter end={stats.activeToday.toString()} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Currently online users
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">New This Week</CardTitle>
              <UserPlus className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-new-users">
                <AnimatedCounter end={stats.newThisWeek.toString()} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                New registrations
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Shield className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-system-health">
                <AnimatedCounter end={`${stats.systemHealth}%`} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                <CheckCircle className="h-3 w-3 inline text-green-500" /> All systems operational
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">System Analytics</TabsTrigger>
            <TabsTrigger value="actions">Quick Actions</TabsTrigger>
          </TabsList>
          
          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage and monitor all user accounts in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search and Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search users by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                        data-testid="input-search"
                      />
                    </div>
                  </div>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[180px]" data-testid="select-role-filter">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="student">Students</SelectItem>
                      <SelectItem value="teacher">Teachers</SelectItem>
                      <SelectItem value="admin">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleExportCSV} variant="outline" data-testid="button-export">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
                
                {/* Users Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead 
                          className="cursor-pointer"
                          onClick={() => {
                            setSortBy("name");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                          }}
                        >
                          Name
                          <ChevronDown className="inline ml-1 h-3 w-3" />
                        </TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Registered</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedUsers.map((user) => (
                        <TableRow key={user.id} data-testid={`row-user-${user.id}`}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              {user.name}
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.registeredAt}</TableCell>
                          <TableCell>{user.lastActive}</TableCell>
                          <TableCell>
                            <Badge variant={user.status === "active" ? "outline" : "destructive"}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" data-testid={`button-actions-${user.id}`}>
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setEditingUser(user)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Role
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSuspendUser(user.id)}>
                                  <Ban className="h-4 w-4 mr-2" />
                                  Suspend
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
                    {filteredUsers.length} users
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      data-testid="button-prev-page"
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        data-testid={`button-page-${page}`}
                      >
                        {page}
                      </Button>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      data-testid="button-next-page"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* System Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChartIcon className="h-5 w-5" />
                    User Growth (Last 30 Days)
                  </CardTitle>
                  <CardDescription>
                    Track user registration trends over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <LineChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="users" 
                        stroke="var(--color-users)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-users)", r: 4 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              
              {/* Role Distribution Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5" />
                    Role Distribution
                  </CardTitle>
                  <CardDescription>
                    Breakdown of users by role type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <PieChart>
                      <Pie
                        data={roleDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {roleDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              
              {/* Activity Heatmap */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Weekly Activity Heatmap
                  </CardTitle>
                  <CardDescription>
                    User activity patterns throughout the week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <AreaChart data={activityHeatmapData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="Monday" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="Tuesday" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                      <Area type="monotone" dataKey="Wednesday" stackId="1" stroke="#ffc658" fill="#ffc658" />
                      <Area type="monotone" dataKey="Thursday" stackId="1" stroke="#ff7c7c" fill="#ff7c7c" />
                      <Area type="monotone" dataKey="Friday" stackId="1" stroke="#8dd1e1" fill="#8dd1e1" />
                      <Area type="monotone" dataKey="Saturday" stackId="1" stroke="#d084d0" fill="#d084d0" />
                      <Area type="monotone" dataKey="Sunday" stackId="1" stroke="#ffb347" fill="#ffb347" />
                      <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Quick Actions Tab */}
          <TabsContent value="actions" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" data-testid="card-add-user">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Add New User
                  </CardTitle>
                  <CardDescription>
                    Create a new user account manually
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" data-testid="button-add-user">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add User
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>
                          Create a new user account with specified details
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 my-4">
                        <div>
                          <Label>Full Name</Label>
                          <Input placeholder="Enter user's full name" data-testid="input-new-user-name" />
                        </div>
                        <div>
                          <Label>Email Address</Label>
                          <Input type="email" placeholder="user@example.com" data-testid="input-new-user-email" />
                        </div>
                        <div>
                          <Label>Role</Label>
                          <Select>
                            <SelectTrigger data-testid="select-new-user-role">
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="teacher">Teacher</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button data-testid="button-create-user">Create User</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" data-testid="card-export-users">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Export Users
                  </CardTitle>
                  <CardDescription>
                    Download user data in CSV format
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={handleExportCSV}
                    data-testid="button-export-csv"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export to CSV
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" data-testid="card-system-settings">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    System Settings
                  </CardTitle>
                  <CardDescription>
                    Configure system preferences and options
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" data-testid="button-system-settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Open Settings
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" data-testid="card-audit-logs">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Audit Logs
                  </CardTitle>
                  <CardDescription>
                    View system activity and security logs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" data-testid="button-view-logs">
                    <Eye className="h-4 w-4 mr-2" />
                    View Logs
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" data-testid="card-backup">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Database Backup
                  </CardTitle>
                  <CardDescription>
                    Create and manage system backups
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" data-testid="button-backup">
                    <Database className="h-4 w-4 mr-2" />
                    Backup Now
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" data-testid="card-security">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Security Center
                  </CardTitle>
                  <CardDescription>
                    Manage security settings and access control
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" data-testid="button-security">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent System Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent System Activity
                </CardTitle>
                <CardDescription>
                  Latest administrative actions and system events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-3">
                    {[
                      { action: "User role updated", user: "john@example.com", time: "5 minutes ago", type: "info" },
                      { action: "New user registered", user: "newuser@example.com", time: "1 hour ago", type: "success" },
                      { action: "Failed login attempt", user: "unknown@example.com", time: "2 hours ago", type: "warning" },
                      { action: "System backup completed", user: "System", time: "3 hours ago", type: "success" },
                      { action: "User account suspended", user: "violation@example.com", time: "5 hours ago", type: "warning" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.type === "success" ? "bg-green-500" :
                            activity.type === "warning" ? "bg-yellow-500" :
                            "bg-blue-500"
                          }`} />
                          <div>
                            <p className="text-sm font-medium">{activity.action}</p>
                            <p className="text-xs text-muted-foreground">{activity.user}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;