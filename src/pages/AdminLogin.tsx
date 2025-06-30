
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SecureAuthForm } from "@/components/auth/SecureAuthForm";

const AdminLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          navigate('/admin/dashboard');
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleAuthSuccess = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bakame AI</h1>
          <p className="text-gray-600">Admin Portal</p>
        </div>
        
        <SecureAuthForm onSuccess={handleAuthSuccess} />
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Secure authentication with advanced password protection</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
