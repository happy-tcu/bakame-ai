import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Building2, 
  Settings as SettingsIcon, 
  BarChart3, 
  LogOut,
  Menu,
  X,
  UserCheck
} from "lucide-react";
import { UserProfile } from "@/pages/AdminDashboard";
import { useState } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  userProfile: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSignOut: () => void;
}

export const DashboardLayout = ({ 
  children, 
  userProfile, 
  activeTab, 
  setActiveTab, 
  onSignOut 
}: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "organizations", label: "Organizations", icon: Building2 },
    { id: "team", label: "Team", icon: UserCheck },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  // Filter navigation based on user role - using the corrected logic
  const filteredNavigation = navigationItems.filter((item) => {
    // Allow all items if user is an admin
    if (userProfile.role === 'admin') return true;

    // Block non-admins from seeing the 'users' tab
    if (item.id === 'users') return false;

    // Allow all other tabs
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">Bakame AI</h1>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="text-sm text-gray-500">Welcome back,</div>
            <div className="text-lg font-semibold text-gray-900">
              {userProfile.full_name || userProfile.email}
            </div>
            <div className="text-sm text-blue-600 capitalize">
              {userProfile.role}
            </div>
          </div>

          <nav className="space-y-2">
            {filteredNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
            onClick={onSignOut}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b h-16 flex items-center px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-4"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-semibold text-gray-900 capitalize">
            {activeTab === "dashboard" ? "Dashboard" : activeTab}
          </h2>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
