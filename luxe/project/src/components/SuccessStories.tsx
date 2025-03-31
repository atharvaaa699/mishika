import React from 'react';
import { Star, Quote } from 'lucide-react';
import LazyImage from './LazyImage';

const stories = [
  {
    name: "James Anderson",
    title: "CEO, Global Ventures",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    story: "LUXE orchestrated a month-long private yacht journey through the Mediterranean, complete with Michelin-starred chefs and exclusive port access. Their attention to detail was extraordinary.",
    experience: "Mediterranean Yacht Tour"
  },
  {
    name: "Victoria Chen",
    title: "Fashion House Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    story: "From arranging private museum viewings in Paris to securing front-row fashion week seats, LUXE delivered experiences that exceeded all expectations.",
    experience: "European Cultural Tour"
  },
  {
    name: "Sheikh Mohammed Al-Rashid",
    title: "Royal Family Member",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    story: "Their private island experience in the Maldives was beyond imagination. Complete privacy, world-class service, and experiences that money simply cannot buy.",
    experience: "Private Island Retreat"
  }
];

const SuccessStories = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-black to-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-4">Success Stories</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover how we've created extraordinary experiences for our distinguished clients.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-black rounded-lg p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-luxury"
            >
              <Quote className="h-12 w-12 text-[#C6A45C] opacity-25 mb-6" />
              
              <div className="flex items-center mb-6">
                <LazyImage
                  src={story.image}
                  alt={story.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">{story.name}</h3>
                  <p className="text-sm text-gray-400">{story.title}</p>
                </div>
              </div>

              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="inline-block h-5 w-5 text-[#C6A45C] fill-current"
                  />
                ))}
              </div>

              <p className="text-gray-300 mb-4">{story.story}</p>
              
              <div className="text-sm text-[#C6A45C]">
                Experience: {story.experience}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;