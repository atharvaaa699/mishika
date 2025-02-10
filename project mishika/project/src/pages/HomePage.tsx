import React from 'react';
import { ArrowRight, Shield, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Testimonials from '../components/Testimonials';
import VIPMembership from '../components/VIPMembership';
import SuccessStories from '../components/SuccessStories';
import LuxuryPartners from '../components/LuxuryPartners';

const HomePage = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div 
        className="h-screen relative flex items-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 animate-fade-in">
            Elevate Your <br />
            <span className="text-[#C6A45C]">Lifestyle</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-200 animate-slide-up">
            Experience unparalleled luxury services tailored exclusively for the most discerning clientele.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-3 bg-[#C6A45C] text-black rounded hover:bg-[#B59449] transition-all duration-300 hover:scale-105"
            >
              Request Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center px-8 py-3 border border-[#C6A45C] text-[#C6A45C] rounded hover:bg-[#C6A45C] hover:text-black transition-all duration-300 hover:scale-105"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <Shield className="h-12 w-12 text-[#C6A45C] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Unparalleled Security</h3>
              <p className="text-gray-400">State-of-the-art encryption and privacy measures for your peace of mind.</p>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <Clock className="h-12 w-12 text-[#C6A45C] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Concierge</h3>
              <p className="text-gray-400">Round-the-clock premium support and assistance for all your needs.</p>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <Star className="h-12 w-12 text-[#C6A45C] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Exclusive Access</h3>
              <p className="text-gray-400">Priority access to the world's most coveted experiences and opportunities.</p>
            </div>
          </div>
        </div>
      </div>

      <VIPMembership />
      <SuccessStories />
      <LuxuryPartners />
      <Testimonials />

      {/* Featured Services */}
      <div className="py-24 bg-gradient-to-b from-black to-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif mb-12 text-center">Featured Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-[400px] group overflow-hidden rounded-lg transform hover:scale-105 transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80"
                alt="Private jet charter services - Experience luxury air travel with LUXE"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-serif mb-2">Private Aviation</h3>
                <p className="text-gray-300 mb-4">Experience seamless travel with our luxury fleet and personalized service.</p>
                <Link to="/services" className="text-[#C6A45C] hover:text-white transition-colors">Learn More →</Link>
              </div>
            </div>
            <div className="relative h-[400px] group overflow-hidden rounded-lg transform hover:scale-105 transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80"
                alt="Luxury yacht charter - Discover exclusive destinations with LUXE"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-serif mb-2">Yacht Charters</h3>
                <p className="text-gray-300 mb-4">Discover the world's most exclusive destinations in ultimate luxury.</p>
                <Link to="/services" className="text-[#C6A45C] hover:text-white transition-colors">Learn More →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;