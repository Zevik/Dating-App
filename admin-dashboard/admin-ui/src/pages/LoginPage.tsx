import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Check if user is already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      return;
    }
    
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      
      // Clear form and navigate to dashboard
      setEmail('');
      setPassword('');
      console.log('Login successful, redirecting to dashboard');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Provide more specific error messages based on error type
      if (error.response) {
        if (error.response.status === 401) {
          setError('Invalid credentials. Please check your email and password.');
        } else if (error.response.status === 403) {
          setError('Your account does not have admin privileges.');
        } else {
          setError(`Server error: ${error.response.data.message || 'Unable to login'}`);
        }
      } else if (error.request) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">OneMatch Admin</CardTitle>
          <CardDescription className="text-center">
            Login to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertDescription className="text-red-500">{error}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage; 