import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-8 border-t border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-sm">
                    © {new Date().getFullYear()} <span className="text-white font-medium">Mohd Ahtesham</span>. All rights reserved.
                </p>

                <p className="text-gray-500 text-sm flex items-center gap-1">
                    Made with <Heart size={14} className="text-brand-red fill-brand-red" /> using React & Tailwind
                </p>
            </div>
        </footer>
    );
};

export default Footer;
