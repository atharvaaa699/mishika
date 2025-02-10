import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Anchor, Home, Gift, Gem, Crown, Calendar, Wine, Car } from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      icon: <Plane className="h-8 w-8" />,
      title: "Private Aviation",
      description: "Experience seamless travel with our luxury fleet and personalized service.",
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80"
    },
    {
      icon: <Anchor className="h-8 w-8" />,
      title: "Yacht Charters",
      description: "Discover the world's most exclusive destinations in ultimate luxury.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80"
    },
    {
      icon: <Gem className="h-8 w-8" />,
      title: "Personalized Jewelry",
      description: "Bespoke jewelry designs crafted to your exact specifications.",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80"
    },
    {
      icon: <Gift className="h-8 w-8" />,
      title: "Birthday Experiences",
      description: "Create unforgettable birthday celebrations tailored to your desires.",
      image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&q=80"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Event Planning",
      description: "Curated events that exceed expectations and create lasting memories.",
      image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80"
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: "Luxury Properties",
      description: "Access to the world's most exclusive properties and residences.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80"
    },
    {
      icon: <Wine className="h-8 w-8" />,
      title: "Fine Dining",
      description: "Priority reservations at the world's most exclusive restaurants.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80"
    },
    {
      icon: <Car className="h-8 w-8" />,
      title: "Luxury Transportation",
      description: "Premium vehicle fleet with professional chauffeur service.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Our Services</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience unparalleled luxury with our comprehensive range of exclusive services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6 flex flex-col justify-end">
                <div className="text-[#C6A45C] mb-2">{service.icon}</div>
                <h3 className="text-xl font-serif mb-2">{service.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{service.description}</p>
                <Link
                  to="/contact"
                  className="text-[#C6A45C] hover:text-white transition inline-flex items-center"
                >
                  Learn More <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-serif mb-4">Need Something Special?</h2>
          <p className="text-gray-400 mb-8">
            Our concierge team is available 24/7 to fulfill your unique requests.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3 bg-[#C6A45C] text-black rounded hover:bg-[#B59449] transition"
          >
            Contact Concierge
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;