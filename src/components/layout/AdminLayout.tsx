import React, { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Truck,
  Users, 
  LogOut, 
  ChevronRight, 
  Menu, 
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-slate-100 min-h-[calc(100vh-64px)]">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden p-4 bg-white shadow-sm">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="flex items-center text-slate-700"
        >
          <Menu className="w-6 h-6 mr-2" />
          <span>Admin Menu</span>
        </button>
      </div>
      
      <div className="flex">
        {/* Sidebar - Mobile (overlay) */}
        <div 
          className={`md:hidden fixed inset-0 z-40 ${
            isSidebarOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="absolute left-0 top-0 w-64 h-full bg-white shadow-lg">
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Truck className="w-6 h-6 text-blue-600" />
                <span className="font-bold text-slate-900">Admin Panel</span>
              </div>
              <button onClick={() => setIsSidebarOpen(false)}>
                <X className="w-6 h-6 text-slate-700" />
              </button>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/admin"
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      location.pathname === '/admin'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <LayoutDashboard className="w-5 h-5 mr-2" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/mods"
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      location.pathname === '/admin/mods'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Truck className="w-5 h-5 mr-2" />
                    <span>Manage Mods</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/users"
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      location.pathname === '/admin/users'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Users className="w-5 h-5 mr-2" />
                    <span>Manage Users</span>
                  </Link>
                </li>
              </ul>
              
              <div className="pt-4 mt-4 border-t border-slate-200">
                <button
                  onClick={handleLogout}
                  className="flex items-center text-red-600 hover:text-red-800 px-3 py-2 w-full"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
        
        {/* Sidebar - Desktop (persistent) */}
        <div className="hidden md:block w-64 bg-white shadow-sm">
          <div className="p-4 border-b flex items-center space-x-2">
            <Truck className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-slate-900">Admin Panel</span>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin"
                  className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                    location.pathname === '/admin'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5 mr-2" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/mods"
                  className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                    location.pathname === '/admin/mods'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Truck className="w-5 h-5 mr-2" />
                  <span>Manage Mods</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/users"
                  className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                    location.pathname === '/admin/users'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Users className="w-5 h-5 mr-2" />
                  <span>Manage Users</span>
                </Link>
              </li>
            </ul>
            
            <div className="pt-4 mt-4 border-t border-slate-200">
              <button
                onClick={handleLogout}
                className="flex items-center text-red-600 hover:text-red-800 px-3 py-2 w-full"
              >
                <LogOut className="w-5 h-5 mr-2" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-x-auto">
          <div className="container mx-auto px-4 py-6">
            <nav className="mb-4 text-sm text-slate-500 hidden md:block">
              <ol className="flex items-center space-x-1">
                <li>
                  <Link to="/admin" className="hover:text-blue-600">Admin</Link>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4" />
                  <span className="ml-1">
                    {location.pathname === '/admin' && 'Dashboard'}
                    {location.pathname === '/admin/mods' && 'Manage Mods'}
                    {location.pathname === '/admin/users' && 'Manage Users'}
                  </span>
                </li>
              </ol>
            </nav>
            
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;