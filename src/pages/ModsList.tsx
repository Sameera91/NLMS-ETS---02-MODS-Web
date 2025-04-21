import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Truck, X } from 'lucide-react';
import { getAllMods } from '../services/modService';
import { Mod } from '../types';
import ModCard from '../components/mods/ModCard';

const ModsList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mods, setMods] = useState<Mod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') as 'newest' | 'popular' | 'rating' | undefined;
    
    // Update active filters for display
    const newFilters: Record<string, string> = {};
    if (category) newFilters.category = category;
    if (search) newFilters.search = search;
    if (sort) newFilters.sort = sort;
    setActiveFilters(newFilters);
    
    const loadMods = async () => {
      setIsLoading(true);
      try {
        const data = await getAllMods({ 
          category: category || undefined, 
          search: search || undefined, 
          sort 
        });
        setMods(data);
      } catch (error) {
        console.error('Error loading mods:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadMods();
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      searchParams.set('search', searchTerm);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const handleCategoryClick = (category: string) => {
    searchParams.set('category', category);
    setSearchParams(searchParams);
    setIsFilterOpen(false);
  };

  const handleSortChange = (sort: string) => {
    searchParams.set('sort', sort);
    setSearchParams(searchParams);
    setIsFilterOpen(false);
  };

  const removeFilter = (key: string) => {
    searchParams.delete(key);
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    setSearchParams({});
    setSearchTerm('');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Browse Mods</h1>
            <p className="text-slate-600">Discover high-quality ETS2 mods for your game</p>
          </div>
          
          <button 
            className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-slate-200 rounded-md text-slate-700 hover:bg-slate-300 transition-colors md:ml-4"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <SlidersHorizontal className="w-5 h-5 mr-2" />
            <span>Filters</span>
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <form onSubmit={handleSearchSubmit} className="flex">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search for mods..."
                className="input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            </div>
            <button type="submit" className="btn btn-primary ml-2">
              Search
            </button>
          </form>
        </div>
        
        {/* Active Filters */}
        {Object.keys(activeFilters).length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
            <div className="flex flex-wrap items-center">
              <span className="text-slate-700 mr-2">Active Filters:</span>
              {Object.entries(activeFilters).map(([key, value]) => (
                <div 
                  key={key} 
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center mr-2 mb-2"
                >
                  <span>{key === 'category' ? 'Category: ' : key === 'sort' ? 'Sort: ' : ''}{value}</span>
                  <button 
                    onClick={() => removeFilter(key)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button 
                onClick={clearAllFilters}
                className="text-red-600 hover:text-red-800 text-sm ml-2"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:block ${isFilterOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Filters</h2>
              
              <div className="mb-6">
                <h3 className="font-medium text-slate-800 mb-3">Categories</h3>
                <ul className="space-y-2">
                  {['trucks', 'trailers', 'maps', 'skins', 'parts', 'sounds', 'traffic'].map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => handleCategoryClick(category)}
                        className={`w-full text-left capitalize py-1 px-2 rounded ${
                          activeFilters.category === category
                            ? 'bg-blue-100 text-blue-800'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-slate-800 mb-3">Sort By</h3>
                <ul className="space-y-2">
                  {[
                    { id: 'newest', label: 'Newest' },
                    { id: 'popular', label: 'Most Downloads' },
                    { id: 'rating', label: 'Highest Rating' }
                  ].map((sort) => (
                    <li key={sort.id}>
                      <button
                        onClick={() => handleSortChange(sort.id)}
                        className={`w-full text-left py-1 px-2 rounded ${
                          activeFilters.sort === sort.id
                            ? 'bg-blue-100 text-blue-800'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        {sort.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Mods Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="card animate-pulse">
                    <div className="h-48 bg-slate-200"></div>
                    <div className="p-4">
                      <div className="h-6 bg-slate-200 rounded mb-2"></div>
                      <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                      <div className="h-10 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : mods.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mods.map((mod) => (
                  <ModCard key={mod.id} mod={mod} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Truck className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                <h2 className="text-2xl font-bold text-slate-700 mb-2">No Mods Found</h2>
                <p className="text-slate-500 mb-6">
                  We couldn't find any mods matching your current filters.
                </p>
                <button 
                  onClick={clearAllFilters}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModsList;