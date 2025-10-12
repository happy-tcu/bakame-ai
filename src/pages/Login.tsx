import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home } from 'lucide-react';
import { AuthModal } from '@/components/auth/AuthModal';
import { useState } from 'react';

const Login = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Access Required</CardTitle>
          <CardDescription>
            Please log in to access this area
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full"
            data-testid="button-open-login"
          >
            Open Login Form
          </Button>
          
          <div className="text-center">
            <Link to="/">
              <Button variant="outline" className="gap-2" data-testid="button-return-home">
                <Home className="h-4 w-4" />
                Return to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab="login"
      />
    </div>
  );
};

export default Login;