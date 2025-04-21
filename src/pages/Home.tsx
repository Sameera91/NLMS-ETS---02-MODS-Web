import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowRight, Search, Truck } from 'lucide-react';
import { getFeaturedMods, getPopularMods } from '../services/modService';
import { Mod } from '../types';
import ModCard from '../components/mods/ModCard';

const Home: React.FC = () => {
  const [featuredMods, setFeaturedMods] = useState<Mod[]>([]);
  const [popularMods, setPopularMods] = useState<Mod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadMods = async () => {
      try {
        const featured = await getFeaturedMods();
        const popular = await getPopularMods();
        
        setFeaturedMods(featured);
        setPopularMods(popular);
      } catch (error) {
        console.error('Error loading mods:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadMods();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-slate-900 text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2519390/pexels-photo-2519390.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-20"></div>
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-fadeIn">
              Nolimit Mods <span className="text-yellow-400">Sri Lanka</span>
            </h1>
            <p className="text-xl mb-8 text-slate-200 animate-fadeIn animation-delay-200">
              Download high-quality Euro Truck Simulator 2 mods created by Sri Lankan modders.
              Enhance your trucking experience with our premium collection.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fadeIn animation-delay-400">
              <Link to="/mods" className="btn bg-red-600 hover:bg-red-700 text-white flex items-center justify-center sm:justify-start space-x-2">
                <Truck className="w-5 h-5" />
                <span>Browse Mods</span>
              </Link>
              <Link to="/register" className="btn bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 transition-colors flex items-center justify-center sm:justify-start space-x-2">
                <span>Join Community</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for mods..."
                className="input pl-12 py-4 text-lg w-full shadow-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Link 
                to={`/mods?search=${searchTerm}`}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 btn btn-primary py-2"
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Mods */}
      <section className="py-16 bg-slate-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900">Featured Mods</h2>
            <Link to="/mods" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
              <span>View All</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredMods.map((mod) => (
                <ModCard key={mod.id} mod={mod} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Popular Mods */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900">Popular Downloads</h2>
            <Link to="/mods?sort=popular" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
              <span>View All</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="card animate-pulse">
                  <div className="h-40 bg-slate-200"></div>
                  <div className="p-4">
                    <div className="h-6 bg-slate-200 rounded mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {popularMods.map((mod) => (
                <div key={mod.id} className="card group">
                  <Link to={`/mods/${mod.id}`} className="block">
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={mod.thumbnail} 
                        alt={mod.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 bg-blue-600 text-white px-2 py-1 text-sm flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        <span>{mod.downloadCount}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-slate-900 mb-1 line-clamp-1">{mod.title}</h3>
                      <p className="text-sm text-slate-500">By {mod.author}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-blue-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Enhance Your ETS2 Experience?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join the Nolimit Mods community today and get access to exclusive Euro Truck Simulator 2 mods.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register" className="btn bg-white text-blue-700 hover:bg-blue-50">
              Create Account
            </Link>
            <Link to="/mods" className="btn bg-transparent border-2 border-white hover:bg-white hover:text-blue-700">
              Browse Mods
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;