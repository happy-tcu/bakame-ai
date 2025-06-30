
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserProfile } from "@/pages/AdminDashboard";
import { Mail, Calendar, MapPin } from "lucide-react";

interface TeamProps {
  userProfile: UserProfile;
}

// Mock team data - in a real app, this would come from your database
const teamMembers = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Product Manager",
    email: "sarah@bakame.ai",
    joinDate: "2024-01-15",
    location: "San Francisco, CA",
    status: "active",
    avatar: "SJ"
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Lead Developer",
    email: "michael@bakame.ai",
    joinDate: "2023-11-20",
    location: "New York, NY",
    status: "active",
    avatar: "MC"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "UX Designer",
    email: "emily@bakame.ai",
    joinDate: "2024-02-01",
    location: "Austin, TX",
    status: "active",
    avatar: "ER"
  },
  {
    id: "4",
    name: "David Kim",
    role: "Data Scientist",
    email: "david@bakame.ai",
    joinDate: "2023-12-10",
    location: "Seattle, WA",
    status: "away",
    avatar: "DK"
  }
];

export const Team = ({ userProfile }: TeamProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Team</h1>
        <p className="text-gray-600 mt-2">
          Meet the amazing people behind Bakame AI
        </p>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers.filter(m => m.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(teamMembers.map(m => m.location.split(',')[1]?.trim())).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-500 text-white font-semibold">
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
                <Badge 
                  variant={member.status === 'active' ? 'default' : 'secondary'}
                  className={member.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                >
                  {member.status}
                </Badge>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(member.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{member.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
