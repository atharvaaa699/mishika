import React from 'react';
import { Award, Star, Shield, Crown } from 'lucide-react';

const Awards = () => {
  const awards = [
    {
      icon: <Crown className="h-12 w-12" />,
      title: "Best Luxury Service Provider",
      year: "2024",
      organization: "International Luxury Awards"
    },
    {
      icon: <Star className="h-12 w-12" />,
      title: "Excellence in Customer Service",
      year: "2024",
      organization: "Global Hospitality Awards"
    },
    {
      icon: <Award className="h-12 w-12" />,
      title: "Top Private Aviation Service",
      year: "2023",
      organization: "Aviation Excellence Awards"
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Most Trusted Luxury Brand",
      year: "2023",
      organization: "Luxury Trust Alliance"
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-4 text-3d">Awards & Recognition</h2>
          <p className="text-gray-400 text-lg">
            Excellence recognized by leading industry authorities
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {awards.map((award, index) => (
            <div
              key={index}
              className="card-3d bg-[#1A1A1A] p-8 rounded-lg text-center transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-[#C6A45C] mb-6 transform hover:scale-110 transition-transform">
                {award.icon}
              </div>
              <h3 className="text-xl font-serif mb-2">{award.title}</h3>
              <p className="text-[#C6A45C] mb-1">{award.year}</p>
              <p className="text-sm text-gray-400">{award.organization}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;