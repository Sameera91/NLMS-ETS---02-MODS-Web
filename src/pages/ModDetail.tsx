import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Calendar, Star, User, Tag, MessageSquare, Share2, Clock } from 'lucide-react';
import { getModById } from '../services/modService';
import { Mod } from '../types';

const ModDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mod, setMod] = useState<Mod | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'description' | 'comments' | 'changelog'>('description');

  useEffect(() => {
    const loadMod = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await getModById(id);
        setMod(data);
      } catch (error) {
        console.error('Error loading mod:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadMod();
  }, [id]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (isLoading) {
    return (
      <div className="container-custom py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-slate-200 rounded-lg mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="h-6 bg-slate-200 rounded mb-4"></div>
              <div className="h-4 bg-slate-200 rounded mb-2"></div>
              <div className="h-4 bg-slate-200 rounded mb-2"></div>
              <div className="h-4 bg-slate-200 rounded mb-2"></div>
            </div>
            <div>
              <div className="h-40 bg-slate-200 rounded-lg mb-4"></div>
              <div className="h-10 bg-slate-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!mod) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Mod Not Found</h1>
        <p className="text-slate-600 mb-6">The mod you're looking for doesn't exist or has been removed.</p>
        <Link to="/mods" className="btn btn-primary">
          Browse Mods
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-custom">
        <nav className="mb-6 flex items-center text-sm text-slate-500">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/mods" className="hover:text-blue-600">Mods</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">{mod.title}</span>
        </nav>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative h-64 md:h-96">
            <img 
              src={mod.thumbnail} 
              alt={mod.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 w-full">
                <h1 className="text-3xl font-bold text-white mb-2">{mod.title}</h1>
                <div className="flex flex-wrap items-center text-white gap-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{mod.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{formatDate(mod.createdAt)}</span>
                  </div>
                  <div className="flex items-center">
                    <Download className="w-4 h-4 mr-1" />
                    <span>{mod.downloadCount} downloads</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    <span>{mod.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="border-b border-slate-200">
                <nav className="flex">
                  <button
                    className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                      activeTab === 'description'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    onClick={() => setActiveTab('description')}
                  >
                    Description
                  </button>
                  <button
                    className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                      activeTab === 'comments'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    onClick={() => setActiveTab('comments')}
                  >
                    Comments
                  </button>
                  <button
                    className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                      activeTab === 'changelog'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    onClick={() => setActiveTab('changelog')}
                  >
                    Changelog
                  </button>
                </nav>
              </div>
              
              <div className="p-6">
                {activeTab === 'description' && (
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">About This Mod</h2>
                    <p className="text-slate-700 mb-6">{mod.description}</p>
                    
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Features</h3>
                    <ul className="list-disc pl-5 mb-6 text-slate-700 space-y-1">
                      <li>High-quality 3D models with detailed textures</li>
                      <li>Compatible with the latest ETS2 version</li>
                      <li>Realistic physics and driving behavior</li>
                      <li>Custom sound effects for an immersive experience</li>
                      <li>Multiple customization options</li>
                    </ul>
                    
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Installation Instructions</h3>
                    <ol className="list-decimal pl-5 text-slate-700 space-y-1 mb-6">
                      <li>Download the mod file</li>
                      <li>Extract the contents to your ETS2 mod folder</li>
                      <li>Start Euro Truck Simulator 2</li>
                      <li>Enable the mod in the mod manager</li>
                      <li>Enjoy your new mod!</li>
                    </ol>
                    
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Requirements</h3>
                      <p className="text-slate-700 mb-1">
                        <span className="font-medium">ETS2 Version:</span> 1.45 or higher
                      </p>
                      <p className="text-slate-700 mb-1">
                        <span className="font-medium">DLCs Required:</span> None
                      </p>
                      <p className="text-slate-700">
                        <span className="font-medium">Compatible with:</span> All map DLCs
                      </p>
                    </div>
                  </div>
                )}
                
                {activeTab === 'comments' && (
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Comments</h2>
                    
                    <div className="mb-6">
                      <textarea
                        placeholder="Write a comment..."
                        className="input min-h-[100px] resize-y"
                      ></textarea>
                      <button className="btn btn-primary mt-2">Post Comment</button>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="border-b border-slate-200 pb-6">
                        <div className="flex items-start">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                            JD
                          </div>
                          <div>
                            <div className="flex items-center mb-1">
                              <h3 className="font-medium text-slate-900 mr-2">JohnDriver</h3>
                              <span className="text-slate-500 text-sm">3 days ago</span>
                            </div>
                            <p className="text-slate-700 mb-2">
                              This mod is amazing! The level of detail is incredible, and it works perfectly with my setup.
                            </p>
                            <div className="flex items-center text-slate-500 text-sm">
                              <button className="flex items-center hover:text-blue-600">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                <span>Reply</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-b border-slate-200 pb-6">
                        <div className="flex items-start">
                          <div className="bg-green-100 text-green-800 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                            TS
                          </div>
                          <div>
                            <div className="flex items-center mb-1">
                              <h3 className="font-medium text-slate-900 mr-2">TruckSimFan</h3>
                              <span className="text-slate-500 text-sm">1 week ago</span>
                            </div>
                            <p className="text-slate-700 mb-2">
                              Great mod, but I had a small issue with the sound. It sometimes cuts out when driving over 80 km/h. Any fix for this?
                            </p>
                            <div className="flex items-center text-slate-500 text-sm">
                              <button className="flex items-center hover:text-blue-600">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                <span>Reply</span>
                              </button>
                            </div>
                            
                            <div className="mt-4 ml-6 pl-4 border-l-2 border-slate-200">
                              <div className="flex items-start">
                                <div className="bg-red-100 text-red-800 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                                  NL
                                </div>
                                <div>
                                  <div className="flex items-center mb-1">
                                    <h3 className="font-medium text-slate-900 mr-2">NL Modder</h3>
                                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">Author</span>
                                    <span className="text-slate-500 text-sm ml-2">6 days ago</span>
                                  </div>
                                  <p className="text-slate-700">
                                    Thanks for reporting this issue. Please make sure you have the latest sound drivers installed. I'll also release a fix in the next update!
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'changelog' && (
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Changelog</h2>
                    
                    <div className="space-y-6">
                      <div className="border-l-2 border-blue-500 pl-4">
                        <div className="flex items-center mb-2">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <h3 className="font-semibold text-slate-900">Version 2.1 - {formatDate(mod.updatedAt)}</h3>
                        </div>
                        <ul className="list-disc pl-5 text-slate-700 space-y-1">
                          <li>Fixed compatibility issues with the latest ETS2 update</li>
                          <li>Added new customization options</li>
                          <li>Improved textures for better visual quality</li>
                          <li>Fixed sound issues reported by users</li>
                        </ul>
                      </div>
                      
                      <div className="border-l-2 border-slate-300 pl-4">
                        <div className="flex items-center mb-2">
                          <Clock className="w-5 h-5 text-slate-500 mr-2" />
                          <h3 className="font-semibold text-slate-900">Version 2.0 - March 15, 2023</h3>
                        </div>
                        <ul className="list-disc pl-5 text-slate-700 space-y-1">
                          <li>Major update with completely redesigned 3D models</li>
                          <li>Added support for all map DLCs</li>
                          <li>New sound effects recorded from real trucks</li>
                          <li>Performance optimizations</li>
                        </ul>
                      </div>
                      
                      <div className="border-l-2 border-slate-300 pl-4">
                        <div className="flex items-center mb-2">
                          <Clock className="w-5 h-5 text-slate-500 mr-2" />
                          <h3 className="font-semibold text-slate-900">Version 1.0 - January 10, 2023</h3>
                        </div>
                        <ul className="list-disc pl-5 text-slate-700 space-y-1">
                          <li>Initial release</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <button className="btn bg-green-600 hover:bg-green-700 text-white w-full flex items-center justify-center space-x-2 mb-4">
                <Download className="w-5 h-5" />
                <span>Download Mod</span>
              </button>
              
              <div className="flex flex-col space-y-4 text-slate-700">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="font-medium">File Size</span>
                  <span>25.4 MB</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="font-medium">Version</span>
                  <span>2.1</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="font-medium">Last Updated</span>
                  <span>{formatDate(mod.updatedAt)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="font-medium">Created</span>
                  <span>{formatDate(mod.createdAt)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium">License</span>
                  <span>Free to use</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-bold text-slate-900 mb-3">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {mod.categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/mods?category=${category}`}
                    className="flex items-center bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    <span>{category}</span>
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-3">Share</h2>
              <div className="flex space-x-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white p-2 rounded">
                  <MessageSquare className="w-5 h-5" />
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
                  <Star className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModDetail;