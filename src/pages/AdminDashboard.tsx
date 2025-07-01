
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { UserManagement } from "@/components/dashboard/UserManagement";
import { OrganizationManagement } from "@/components/dashboard/OrganizationManagement";
import { Settings } from "@/components/dashboard/Settings";
import { Team } from "@/components/dashboard/Team";
import { GovernmentDemoManagement } from "@/components/dashboard/GovernmentDemoManagement";
import { ContactSubmissionsManagement } from "@/components/dashboard/ContactSubmissionsManagement";
import { NewsletterManagement } from "@/components/dashboard/NewsletterManagement";
import { AnalyticsDashboard } from "@/components/dashboard/AnalyticsDashboard";

export type UserProfile = {
  id: string;
  email: string;
  full_name: string | null;
  organization: string | null;
  role: 'admin' | 'creator' | 'manager' | 'school' | 'government' | 'ngo';
  created_at: string;
  updated_at: string;
};

// Auth state cleanup utility for security
const cleanupAuthState = () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
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
        // Set up auth state listener FIRST to prevent missing events
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log('Auth state change:', event, session?.user?.id);
            
            if (event === 'SIGNED_OUT' || !session) {
              setUser(null);
              setUserProfile(null);
              navigate('/admin');
            } else if (event === 'SIGNED_IN' && session) {
              setUser(session.user);
              
              // Defer data fetching to prevent deadlocks
              setTimeout(async () => {
                try {
                  const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                  if (error) {
                    console.error('Profile fetch error:', error);
                    toast({
                      title: "Error",
                      description: "Failed to load user profile",
                      variant: "destructive",
                    });
                  } else {
                    setUserProfile(profile);
                  }
                } catch (err) {
                  console.error('Profile fetch exception:', err);
                }
              }, 0);
            }
          }
        );

        // THEN check for existing session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          throw sessionError;
        }
        
        if (!session) {
          navigate('/admin');
          return;
        }

        setUser(session.user);

        // Get user profile with better error handling
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle(); // Use maybeSingle instead of single for better error handling

        if (profileError) {
          console.error('Profile error:', profileError);
          toast({
            title: "Error",
            description: "Failed to load user profile. Please try refreshing the page.",
            variant: "destructive",
          });
        } else if (profile) {
          setUserProfile(profile);
        } else {
          // Profile doesn't exist - this might happen if the trigger failed
          toast({
            title: "Profile Missing",
            description: "Your user profile needs to be created. Please contact support.",
            variant: "destructive",
          });
        }

        // Cleanup subscription
        return () => subscription.unsubscribe();
      } catch (error: any) {
        console.error('Auth initialization error:', error);
        toast({
          title: "Authentication Error",
          description: "Failed to initialize authentication. Please try again.",
          variant: "destructive",
        });
        navigate('/admin');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [navigate, toast]);

  const handleSignOut = async () => {
    try {
      // Clean up auth state first
      cleanupAuthState();
      
      // Attempt global sign out
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      
      if (error) {
        console.error('Sign out error:', error);
        // Continue with cleanup even if signOut fails
      }

      toast({
        title: "Success",
        description: "Successfully signed out",
      });
      
      // Force page reload for clean state
      window.location.href = '/admin';
    } catch (error: any) {
      console.error('Sign out exception:', error);
      // Force navigation even if there's an error
      window.location.href = '/admin';
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
      case "team":
        return <Team userProfile={userProfile} />;
      case "government-demos":
        return <GovernmentDemoManagement userProfile={userProfile} />;
      case "contact-submissions":
        return <ContactSubmissionsManagement userProfile={userProfile} />;
      case "newsletter":
        return <NewsletterManagement userProfile={userProfile} />;
      case "analytics":
        return <AnalyticsDashboard userProfile={userProfile} />;
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
