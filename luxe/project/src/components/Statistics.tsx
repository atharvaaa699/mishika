import React, { useEffect, useRef } from 'react';
import { Users, Plane, Globe, Star } from 'lucide-react';

const Statistics = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      value: "1000+",
      label: "VIP Clients",
      description: "Trusted by global elite"
    },
    {
      icon: <Plane className="h-8 w-8" />,
      value: "500+",
      label: "Private Flights",
      description: "Annual charter services"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      value: "50+",
      label: "Countries",
      description: "Global presence"
    },
    {
      icon: <Star className="h-8 w-8" />,
      value: "99%",
      label: "Satisfaction",
      description: "Client happiness rate"
    }
  ];

  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-count-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-black to-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={statsRef} className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card-3d bg-[#1A1A1A] p-8 rounded-lg text-center transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-[#C6A45C] mb-4 transform hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-3xl font-serif mb-2 text-3d">{stat.value}</div>
              <div className="text-xl mb-1">{stat.label}</div>
              <p className="text-sm text-gray-400">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;