import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Truck, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Truck className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-900">Nolimit <span className="text-red-600">Mods</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium hover:text-blue-600 transition-colors ${
                location.pathname === '/' ? 'text-blue-600' : 'text-slate-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/mods" 
              className={`font-medium hover:text-blue-600 transition-colors ${
                location.pathname === '/mods' ? 'text-blue-600' : 'text-slate-700'
              }`}
            >
              Mods
            </Link>
            {user && user.isAdmin && (
              <Link 
                to="/admin" 
                className={`font-medium hover:text-blue-600 transition-colors ${
                  location.pathname.startsWith('/admin') ? 'text-blue-600' : 'text-slate-700'
                }`}
              >
                Admin
              </Link>
            )}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-1 text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>{user.username}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="btn btn-primary"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-900 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-slate-200 animate-fadeIn">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`font-medium hover:text-blue-600 transition-colors ${
                  location.pathname === '/' ? 'text-blue-600' : 'text-slate-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/mods" 
                className={`font-medium hover:text-blue-600 transition-colors ${
                  location.pathname === '/mods' ? 'text-blue-600' : 'text-slate-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Mods
              </Link>
              {user && user.isAdmin && (
                <Link 
                  to="/admin" 
                  className={`font-medium hover:text-blue-600 transition-colors ${
                    location.pathname.startsWith('/admin') ? 'text-blue-600' : 'text-slate-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-1 text-slate-700 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>{user.username}</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="btn btn-primary w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;