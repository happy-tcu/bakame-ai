
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface SecureAuthFormProps {
  onSuccess?: (isAdmin: boolean) => void;
}

export const SecureAuthForm = ({ onSuccess }: SecureAuthFormProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const { toast } = useToast();

  // Password strength validation
  const validatePasswordStrength = (pwd: string) => {
    if (pwd.length < 8) return "weak";
    if (pwd.length < 12) return "medium";
    
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumbers = /\d/.test(pwd);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    
    const criteriaMet = [hasUpper, hasLower, hasNumbers, hasSymbols].filter(Boolean).length;
    
    if (criteriaMet >= 3 && pwd.length >= 12) return "strong";
    if (criteriaMet >= 2 && pwd.length >= 10) return "medium";
    return "weak";
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (value) {
      setPasswordStrength(validatePasswordStrength(value));
    } else {
      setPasswordStrength("");
    }
  };

  const validateForm = () => {
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Email and password are required",
        variant: "destructive",
      });
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }

    if (isSignUp) {
      if (!fullName.trim()) {
        toast({
          title: "Name Required",
          description: "Please enter your full name",
          variant: "destructive",
        });
        return false;
      }

      if (password !== confirmPassword) {
        toast({
          title: "Password Mismatch",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return false;
      }

      if (passwordStrength === "weak") {
        toast({
          title: "Weak Password",
          description: "Password must be at least 8 characters with uppercase, lowercase, numbers, and symbols",
          variant: "destructive",
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: fullName.trim(),
              role: isAdmin ? 'admin' : 'creator'
            }
          }
        });

        if (error) throw error;

        if (data.user && !data.user.email_confirmed_at) {
          toast({
            title: "Check Your Email",
            description: "Please check your email and click the confirmation link to complete registration",
          });
        } else {
          toast({
            title: "Account Created",
            description: "Your account has been created successfully",
          });
          onSuccess?.(isAdmin);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });

        if (error) throw error;

        if (data.user) {
          toast({
            title: "Welcome Back",
            description: "Successfully signed in",
          });
          onSuccess?.(isAdmin);
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      
      // Provide user-friendly error messages
      let errorMessage = "An unexpected error occurred";
      
      if (error.message?.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password";
      } else if (error.message?.includes("User already registered")) {
        errorMessage = "An account with this email already exists";
      } else if (error.message?.includes("Password should be")) {
        errorMessage = "Password does not meet requirements";
      } else if (error.message?.includes("Email not confirmed")) {
        errorMessage = "Please confirm your email before signing in";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: isSignUp ? "Sign Up Failed" : "Sign In Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case "weak": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "strong": return "bg-green-500";
      default: return "bg-gray-200";
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {isSignUp ? "Create Account" : "Sign In"}
        </CardTitle>
        <CardDescription className="text-center">
          {isSignUp 
            ? "Enter your details to create your account" 
            : "Enter your credentials to access your account"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={isSignUp}
                disabled={isLoading}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                className="pl-10 pr-10"
                required
                disabled={isLoading}
                autoComplete={isSignUp ? "new-password" : "current-password"}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            
            {isSignUp && password && (
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ 
                        width: passwordStrength === "weak" ? "33%" : 
                               passwordStrength === "medium" ? "66%" : "100%" 
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 capitalize">{passwordStrength}</span>
                </div>
                <p className="text-xs text-gray-500">
                  Use 8+ characters with uppercase, lowercase, numbers & symbols
                </p>
              </div>
            )}
          </div>

          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required={isSignUp}
                  disabled={isLoading}
                  autoComplete="new-password"
                />
              </div>
            </div>
          )}

          {/* Admin checkbox for both sign up and sign in */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="admin"
              checked={isAdmin}
              onCheckedChange={(checked) => setIsAdmin(checked as boolean)}
              disabled={isLoading}
            />
            <Label htmlFor="admin" className="flex items-center space-x-2 text-sm">
              <Shield className="h-4 w-4" />
              <span>{isSignUp ? "Create admin account" : "Sign in as admin"}</span>
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : (isSignUp ? "Create Account" : "Sign In")}
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setPassword("");
                setConfirmPassword("");
                setPasswordStrength("");
                setIsAdmin(false);
              }}
              disabled={isLoading}
            >
              {isSignUp 
                ? "Already have an account? Sign in" 
                : "Don't have an account? Sign up"
              }
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
