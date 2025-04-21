import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from the location state or default to home
  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setError('');
      setIsLoading(true);
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to log in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = () => {
    setUsername('nlms');
    setPassword('1991');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 py-16">
      <div className="container-custom">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-600 py-4 px-6 text-white text-center">
            <div className="flex justify-center mb-2">
              <Truck className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold">Login to Nolimit Mods</h1>
          </div>
          
          <div className="p-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-slate-700 font-medium mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-slate-700 font-medium mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <button
                type="submit"
                className={`btn btn-primary w-full flex justify-center items-center ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                    Logging in...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <LogIn className="w-5 h-5 mr-2" />
                    Login
                  </span>
                )}
              </button>
            </form>
            
            <div className="mt-4 text-center text-slate-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-800">
                Register
              </Link>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-200">
              <p className="text-center text-slate-500 mb-4">For demo purposes:</p>
              <button
                type="button"
                onClick={handleAdminLogin}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-md transition-colors"
              >
                Use Admin Credentials
              </button>
              <p className="text-center text-slate-400 text-xs mt-2">
                (Username: nlms, Password: 1991)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;