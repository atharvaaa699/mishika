import React from 'react';
import { Clock, Shield, Star, Phone, Calendar, MessageSquare } from 'lucide-react';

const ConciergeService = () => {
  const services = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Availability",
      description: "Round-the-clock service to fulfill your requests at any time."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Absolute Discretion",
      description: "Your privacy is our top priority with secure and confidential service."
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Personalized Service",
      description: "Tailored solutions that match your unique preferences and requirements."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24">
      <div className="relative h-[400px] mb-12">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80"
            alt="Luxury Concierge"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Personal Concierge Service</h1>
            <p className="text-xl text-gray-200">
              Your dedicated team for extraordinary requests and seamless experiences.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-black p-8 rounded-lg text-center">
              <div className="text-[#C6A45C] mb-4">{service.icon}</div>
              <h3 className="text-xl font-serif mb-2">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-serif mb-6">Request Our Services</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Service Type
                </label>
                <select className="w-full bg-[#1A1A1A] border border-gray-800 rounded-md px-4 py-2 focus:outline-none focus:border-[#C6A45C]">
                  <option>Travel Arrangements</option>
                  <option>Event Planning</option>
                  <option>Luxury Transportation</option>
                  <option>Personal Shopping</option>
                  <option>Custom Experience</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-[#1A1A1A] border border-gray-800 rounded-md px-4 py-2 focus:outline-none focus:border-[#C6A45C]"
                  placeholder="Tell us about your request..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-[#1A1A1A] border border-gray-800 rounded-md px-4 py-2 focus:outline-none focus:border-[#C6A45C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Budget Range
                  </label>
                  <select className="w-full bg-[#1A1A1A] border border-gray-800 rounded-md px-4 py-2 focus:outline-none focus:border-[#C6A45C]">
                    <option>Select Range</option>
                    <option>$1,000 - $5,000</option>
                    <option>$5,000 - $10,000</option>
                    <option>$10,000+</option>
                    <option>Flexible</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#C6A45C] text-black py-3 rounded-md hover:bg-[#B59449] transition"
              >
                Submit Request
              </button>
            </form>
          </div>

          <div className="bg-black p-8 rounded-lg">
            <h2 className="text-3xl font-serif mb-6">Immediate Assistance</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-[#C6A45C]" />
                <div>
                  <p className="font-semibold">Call Us</p>
                  <p className="text-gray-400">+91 91197 27956</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MessageSquare className="h-6 w-6 text-[#C6A45C]" />
                <div>
                  <p className="font-semibold">Email Us</p>
                  <p className="text-gray-400">mishika.2025.02@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Calendar className="h-6 w-6 text-[#C6A45C]" />
                <div>
                  <p className="font-semibold">Schedule a Consultation</p>
                  <p className="text-gray-400">Book a private meeting with our team</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-[#1A1A1A] rounded-lg">
              <h3 className="text-xl font-serif mb-4">Priority Response</h3>
              <p className="text-gray-400 mb-4">
                Members receive priority handling for all requests with dedicated support.
              </p>
              <a href="/member" className="text-[#C6A45C] hover:text-white transition">
                Learn about membership →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConciergeService;