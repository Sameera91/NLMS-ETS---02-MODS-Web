import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Truck className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold">Nolimit <span className="text-red-400">Mods</span></span>
            </div>
            <p className="text-slate-300 mb-4">
              Your #1 source for high-quality Euro Truck Simulator 2 mods from Sri Lanka
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-blue-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-blue-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-blue-400 transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-300 hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/mods" className="text-slate-300 hover:text-blue-400 transition-colors">All Mods</Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-300 hover:text-blue-400 transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-slate-300 hover:text-blue-400 transition-colors">Register</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Mod Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/mods?category=trucks" className="text-slate-300 hover:text-blue-400 transition-colors">Trucks</Link>
              </li>
              <li>
                <Link to="/mods?category=trailers" className="text-slate-300 hover:text-blue-400 transition-colors">Trailers</Link>
              </li>
              <li>
                <Link to="/mods?category=maps" className="text-slate-300 hover:text-blue-400 transition-colors">Maps</Link>
              </li>
              <li>
                <Link to="/mods?category=skins" className="text-slate-300 hover:text-blue-400 transition-colors">Skins</Link>
              </li>
              <li>
                <Link to="/mods?category=parts" className="text-slate-300 hover:text-blue-400 transition-colors">Parts</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <p className="text-slate-300 mb-2">Have questions or need assistance?</p>
            <a href="mailto:info@nolimitmods.lk" className="text-blue-400 hover:text-blue-300 transition-colors">info@nolimitmods.lk</a>
            <p className="text-slate-300 mt-4 mb-2">Join our community:</p>
            <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="btn btn-primary inline-block">Discord</a>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-slate-400">
          <p>&copy; {currentYear} Nolimit Mods Srilanka. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;