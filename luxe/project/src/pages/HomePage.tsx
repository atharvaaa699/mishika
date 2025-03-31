import React from 'react';
import { ArrowRight, Shield, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Testimonials from '../components/Testimonials';
import VIPMembership from '../components/VIPMembership';
import SuccessStories from '../components/SuccessStories';
import LuxuryPartners from '../components/LuxuryPartners';
import Statistics from '../components/Statistics';
import RecommendedServices from '../components/RecommendedServices';

const HomePage = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div 
        className="h-screen relative flex items-center overflow-hidden"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <h1 className="text-6xl md:text-8xl font-serif mb-6 animate-fade-in text-3d">
            Luxury <br />
            <span className="text-[#C6A45C]">Redefined</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-200 animate-slide-up">
            Where exceptional service meets unparalleled luxury experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-[#C6A45C] text-black rounded-none hover:bg-[#B59449] transition-all duration-300 hover:scale-105 text-lg"
            >
              Begin Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center px-8 py-4 border border-[#C6A45C] text-[#C6A45C] rounded-none hover:bg-[#C6A45C] hover:text-black transition-all duration-300 hover:scale-105 text-lg"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 text-3d">The Art of <br />Luxury Living</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                We curate extraordinary experiences for those who seek the exceptional. 
                Our bespoke services are designed to elevate every moment of your journey.
              </p>
              <Link
                to="/services"
                className="inline-flex items-center text-[#C6A45C] hover:text-white transition-colors text-lg"
              >
                Discover More <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80"
                alt="Luxury Experience"
                className="w-full h-64 object-cover transform translate-y-8"
              />
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80"
                alt="Luxury Experience"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Statistics />

      {/* AI-Powered Recommendations */}
      <RecommendedServices />

      {/* Features Section */}
      <div className="bg-black py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-3d">Exceptional Service</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience a level of service that transcends the ordinary
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center transform hover:scale-105 transition-transform duration-300 card-3d bg-[#1A1A1A] p-12 rounded-none">
              <Shield className="h-16 w-16 text-[#C6A45C] mx-auto mb-6" />
              <h3 className="text-2xl font-serif mb-4">Unparalleled Security</h3>
              <p className="text-gray-400">State-of-the-art encryption and privacy measures for your peace of mind.</p>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300 card-3d bg-[#1A1A1A] p-12 rounded-none">
              <Clock className="h-16 w-16 text-[#C6A45C] mx-auto mb-6" />
              <h3 className="text-2xl font-serif mb-4">24/7 Concierge</h3>
              <p className="text-gray-400">Round-the-clock premium support and assistance for all your needs.</p>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300 card-3d bg-[#1A1A1A] p-12 rounded-none">
              <Star className="h-16 w-16 text-[#C6A45C] mx-auto mb-6" />
              <h3 className="text-2xl font-serif mb-4">Exclusive Access</h3>
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
      <div className="py-32 bg-gradient-to-b from-black to-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center text-3d">Featured Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-[500px] group overflow-hidden transform hover:scale-105 transition-all duration-500 card-3d">
              <img
                src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80"
                alt="Private jet charter services - Experience luxury air travel with LUXE"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-12 flex flex-col justify-end">
                <h3 className="text-3xl font-serif mb-4">Private Aviation</h3>
                <p className="text-gray-300 mb-6 text-lg">Experience seamless travel with our luxury fleet and personalized service.</p>
                <Link to="/services" className="text-[#C6A45C] hover:text-white transition-colors text-lg group-hover:translate-x-2 transition-transform duration-300">
                  Learn More →
                </Link>
              </div>
            </div>
            <div className="relative h-[500px] group overflow-hidden transform hover:scale-105 transition-all duration-500 card-3d">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80"
                alt="Luxury yacht charter - Discover exclusive destinations with LUXE"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-12 flex flex-col justify-end">
                <h3 className="text-3xl font-serif mb-4">Yacht Charters</h3>
                <p className="text-gray-300 mb-6 text-lg">Discover the world's most exclusive destinations in ultimate luxury.</p>
                <Link to="/services" className="text-[#C6A45C] hover:text-white transition-colors text-lg group-hover:translate-x-2 transition-transform duration-300">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;