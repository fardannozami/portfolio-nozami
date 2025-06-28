import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-8">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="text-gray-400 flex items-center justify-center space-x-2">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 fill-current" />
            <span>by Fardan Nozami Ajitama</span>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;