import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Calendar, Star } from 'lucide-react';
import { Mod } from '../../types';

interface ModCardProps {
  mod: Mod;
}

const ModCard: React.FC<ModCardProps> = ({ mod }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="card group hover:translate-y-[-5px]">
      <Link to={`/mods/${mod.id}`}>
        <div className="relative h-52 overflow-hidden">
          <img 
            src={mod.thumbnail} 
            alt={mod.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 bg-blue-600 text-white rounded-full px-2 py-1 text-sm flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-300 fill-yellow-300" />
            <span>{mod.rating.toFixed(1)}</span>
          </div>
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent w-full pt-8 pb-3 px-4">
            <h3 className="text-white font-bold text-lg line-clamp-1">{mod.title}</h3>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-slate-500 flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(mod.createdAt)}
          </span>
          <span className="text-sm text-slate-500 flex items-center">
            <Download className="w-4 h-4 mr-1" />
            {mod.downloadCount}
          </span>
        </div>
        <p className="text-slate-700 mb-4 line-clamp-2">{mod.description}</p>
        <div className="flex space-x-2">
          {mod.categories.map((category, index) => (
            <span key={index} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
              {category}
            </span>
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <Link to={`/mods/${mod.id}`} className="btn btn-primary">
            View Details
          </Link>
          <button className="btn bg-green-600 hover:bg-green-700 text-white flex items-center space-x-1">
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModCard;