
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { UserManagement } from "@/components/dashboard/UserManagement";
import { OrganizationManagement } from "@/components/dashboard/OrganizationManagement";
import { Settings } from "@/components/dashboard/Settings";

export type UserProfile = {
  id: string;
  email: string;
  full_name: string | null;
  organization: string | null;
  role: 'admin' | 'creator' | 'manager' | 'school' | 'government' | 'ngo';
  created_at: string;
  updated_at: string;
};

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (!session) {
          navigate('/admin');
          return;
        }

        setUser(session.user);

        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) throw profileError;
        
        setUserProfile(profile);
      } catch (error: any) {
        console.error('Auth initialization error:', error);
        toast({
          title: "Error",
          description: "Failed to load user data",
          variant: "destructive",
        });
        navigate('/admin');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          navigate('/admin');
        } else if (event === 'SIGNED_IN' && session) {
          setUser(session.user);
          // Fetch profile after sign in
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          setUserProfile(profile);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Success",
        description: "Successfully signed out",
      });
      navigate('/admin');
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || !userProfile) {
    return null;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardStats userProfile={userProfile} />;
      case "users":
        return <UserManagement userProfile={userProfile} />;
      case "organizations":
        return <OrganizationManagement userProfile={userProfile} />;
      case "settings":
        return <Settings userProfile={userProfile} />;
      default:
        return <DashboardStats userProfile={userProfile} />;
    }
  };

  return (
    <DashboardLayout
      userProfile={userProfile}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onSignOut={handleSignOut}
    >
      {renderActiveTab()}
    </DashboardLayout>
  );
};

export default AdminDashboard;
