import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Menu, Moon, Sun, XIcon } from 'lucide-react';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-gray-950/80 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <div className="w-16 h-16">
            <img 
              src="https://i.ibb.co/994RpBZ2/Deep-Detector-Logo.png" 
              alt="Deep Detector Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-xl font-bold text-white">Deepfake Detector</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-gray-300 hover:text-white transition">Home</a>
          <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
          <a href="#mission" className="text-gray-300 hover:text-white transition">Our Mission</a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
          <a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full hover:bg-gray-800 transition">
            {isMenuOpen ? <XIcon size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-900 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <a href="#home" className="text-gray-300 hover:text-white transition py-2" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#about" className="text-gray-300 hover:text-white transition py-2" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#mission" className="text-gray-300 hover:text-white transition py-2" onClick={() => setIsMenuOpen(false)}>Our Mission</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition py-2" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition py-2" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </div>
        </nav>
      )}
    </header>
  );
}
