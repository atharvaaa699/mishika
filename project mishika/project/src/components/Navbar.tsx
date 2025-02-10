import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Crown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black shadow-lg' : 'bg-black/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <Crown className="h-8 w-8 text-[#C6A45C] transition-transform group-hover:scale-110" />
            <span className="text-2xl font-serif text-white group-hover:text-[#C6A45C] transition-colors">LUXE</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { path: '/services', label: 'Services' },
              { path: '/concierge', label: 'Concierge' },
              { path: '/insights', label: 'Insights' },
              { path: '/contact', label: 'Contact' }
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`text-gray-300 hover:text-[#C6A45C] transition-colors relative ${
                  isActive(path) ? 'text-[#C6A45C]' : ''
                }`}
              >
                {label}
                {isActive(path) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#C6A45C]" />
                )}
              </Link>
            ))}
            <Link
              to="/member"
              className="px-4 py-2 border border-[#C6A45C] text-[#C6A45C] hover:bg-[#C6A45C] hover:text-black transition-all duration-300 rounded hover:scale-105"
            >
              Member Access
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-[#C6A45C] transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-black shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[
                { path: '/services', label: 'Services' },
                { path: '/concierge', label: 'Concierge' },
                { path: '/insights', label: 'Insights' },
                { path: '/contact', label: 'Contact' },
                { path: '/member', label: 'Member Access' }
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive(path)
                      ? 'text-[#C6A45C] bg-gray-900'
                      : 'text-gray-300 hover:text-[#C6A45C] hover:bg-gray-900'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;