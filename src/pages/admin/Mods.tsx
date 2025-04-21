import React, { useState } from 'react';
import { getAllMods } from '../../services/modService';
import { Download, Edit, Trash2, Plus, ExternalLink } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Mod } from '../../types';

const AdminMods: React.FC = () => {
  const [mods, setMods] = useState<Mod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modToDelete, setModToDelete] = useState<Mod | null>(null);

  React.useEffect(() => {
    const loadMods = async () => {
      try {
        const data = await getAllMods();
        setMods(data);
      } catch (error) {
        console.error('Error loading mods:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMods();
  }, []);

  const handleDeleteClick = (mod: Mod) => {
    setModToDelete(mod);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!modToDelete) return;
    
    // In a real app, this would call an API
    setMods(mods.filter(mod => mod.id !== modToDelete.id));
    setShowDeleteModal(false);
    setModToDelete(null);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Manage Mods</h1>
          <button className="btn btn-primary flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            <span>Add New Mod</span>
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-4">
              <div className="animate-pulse space-y-4">
                <div className="h-10 bg-slate-200 rounded"></div>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex space-x-4">
                    <div className="h-16 w-16 bg-slate-200 rounded"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-5 bg-slate-200 rounded"></div>
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    </div>
                    <div className="h-10 w-32 bg-slate-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Mod
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Downloads
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {mods.map((mod) => (
                    <tr key={mod.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded overflow-hidden mr-3">
                            <img src={mod.thumbnail} alt={mod.title} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-900">{mod.title}</div>
                            <div className="text-sm text-slate-500 truncate max-w-xs">{mod.description.substring(0, 50)}...</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {mod.author}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {formatDate(mod.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        <div className="flex items-center">
                          <Download className="w-4 h-4 mr-1 text-green-600" />
                          <span>{mod.downloadCount}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            mod.rating >= 4.5 ? 'bg-green-100 text-green-800' :
                            mod.rating >= 3.5 ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {mod.rating.toFixed(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <a
                            href={`/mods/${mod.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-600 hover:text-slate-900"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="w-5 h-5" />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteClick(mod)}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Confirm Deletion</h3>
            <p className="text-slate-700 mb-6">
              Are you sure you want to delete <span className="font-semibold">{modToDelete?.title}</span>? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminMods;