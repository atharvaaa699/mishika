import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Instagram, Twitter, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <Crown className="h-8 w-8 text-[#C6A45C]" />
              <span className="text-2xl font-serif">LUXE(mishikA)</span>
            </Link>
            <p className="mt-4 text-gray-400">
              Elevating lifestyles through exceptional service and unparalleled luxury experiences.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-400 hover:text-[#C6A45C]">Private Aviation</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-[#C6A45C]">Yacht Charters</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-[#C6A45C]">Luxury Properties</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-[#C6A45C]">Personalized Jewelry</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-[#C6A45C]">Birthday Experiences</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-[#C6A45C]">Concierge Services</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-[#C6A45C]">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[#C6A45C]">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-[#C6A45C]">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-[#C6A45C]">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://instagram.com/mishikaluxe" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#C6A45C]">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="mailto:mishika.2025.02@gmail.com" className="text-gray-400 hover:text-[#C6A45C]">
                <Mail className="h-6 w-6" />
              </a>
              <a href="tel:+919119727956" className="text-gray-400 hover:text-[#C6A45C]">
                <Phone className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-gray-400">24/7 Support</p>
              <p className="text-[#C6A45C] text-lg">+91 91197 27956</p>
              <p className="text-gray-400 text-sm mt-2">mishika.2025.02@gmail.com</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Mishika Luxe World. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;