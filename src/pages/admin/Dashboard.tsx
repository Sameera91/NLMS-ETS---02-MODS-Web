import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, Users, FileText, Truck, TrendingUp, Clock } from 'lucide-react';
import { getTotalDownloads, getTotalUsers, getTotalMods } from '../../services/adminService';
import AdminLayout from '../../components/layout/AdminLayout';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalDownloads: 0,
    totalUsers: 0,
    totalMods: 0,
    recentActivity: [],
    popularMods: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const downloads = await getTotalDownloads();
        const users = await getTotalUsers();
        const mods = await getTotalMods();
        
        setStats({
          totalDownloads: downloads,
          totalUsers: users,
          totalMods: mods,
          recentActivity: [], // This would come from an API
          popularMods: [] // This would come from an API
        });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);

  return (
    <AdminLayout>
      <div className="py-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Admin Dashboard</h1>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
                <div className="h-8 bg-slate-200 rounded mb-4 w-1/2"></div>
                <div className="h-10 bg-slate-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Truck className="text-blue-600 w-6 h-6" />
                </div>
                <h2 className="text-lg font-semibold text-slate-700">Total Mods</h2>
              </div>
              <p className="text-3xl font-bold text-slate-900">{stats.totalMods}</p>
              <Link to="/admin/mods" className="text-sm text-blue-600 hover:text-blue-800 mt-3 inline-block">
                View All Mods
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Download className="text-green-600 w-6 h-6" />
                </div>
                <h2 className="text-lg font-semibold text-slate-700">Total Downloads</h2>
              </div>
              <p className="text-3xl font-bold text-slate-900">{stats.totalDownloads}</p>
              <p className="text-sm text-slate-500 mt-3">
                Across all mods
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Users className="text-purple-600 w-6 h-6" />
                </div>
                <h2 className="text-lg font-semibold text-slate-700">Total Users</h2>
              </div>
              <p className="text-3xl font-bold text-slate-900">{stats.totalUsers}</p>
              <Link to="/admin/users" className="text-sm text-blue-600 hover:text-blue-800 mt-3 inline-block">
                Manage Users
              </Link>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-slate-900 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Popular Mods
              </h2>
              <Link to="/admin/mods" className="text-sm text-blue-600 hover:text-blue-800">
                View All
              </Link>
            </div>
            
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-center animate-pulse">
                    <div className="h-12 w-12 bg-slate-200 rounded mr-3"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-slate-200 rounded mb-2"></div>
                      <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                    </div>
                    <div className="h-8 w-16 bg-slate-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {stats.popularMods && stats.popularMods.length > 0 ? (
                  <div className="space-y-4">
                    {stats.popularMods.map((mod: any, index: number) => (
                      <div key={index} className="flex items-center">
                        <img 
                          src={mod.thumbnail} 
                          alt={mod.title}
                          className="w-12 h-12 object-cover rounded mr-3"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-slate-900">{mod.title}</h3>
                          <p className="text-sm text-slate-500">By {mod.author}</p>
                        </div>
                        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          <span>{mod.downloads}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-slate-400" />
                    <p>No data available yet</p>
                  </div>
                )}
              </>
            )}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-slate-900 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Recent Activity
              </h2>
            </div>
            
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 bg-slate-200 rounded-full mr-3"></div>
                      <div className="h-5 bg-slate-200 rounded w-1/3"></div>
                    </div>
                    <div className="h-4 bg-slate-200 rounded mb-2 ml-11"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/4 ml-11 mb-4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {stats.recentActivity && stats.recentActivity.length > 0 ? (
                  <div className="space-y-6">
                    {stats.recentActivity.map((activity: any, index: number) => (
                      <div key={index} className="border-l-2 border-blue-500 pl-4">
                        <p className="text-sm text-slate-500 mb-1">{activity.time}</p>
                        <p className="font-medium text-slate-900">{activity.user} {activity.action}</p>
                        <p className="text-slate-700">{activity.details}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-slate-400" />
                    <p>No recent activity</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;