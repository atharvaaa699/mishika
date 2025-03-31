import React from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Alexander Thompson",
    role: "Business Executive",
    content: "LUXE has redefined luxury travel for me. Their private jet service is impeccable, and their attention to detail is unmatched.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
  },
  {
    name: "Isabella Chen",
    role: "Fashion Designer",
    content: "The yacht charter experience arranged by LUXE was beyond my expectations. Every moment was curated to perfection.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
  },
  {
    name: "Marcus Rodriguez",
    role: "Entertainment Producer",
    content: "Their concierge service is exceptional. Available 24/7 and always going above and beyond to fulfill any request.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-black" itemScope itemType="https://schema.org/Review">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Client Testimonials</h2>
          <p className="text-gray-400">Discover what our distinguished clients have to say about their LUXE experience.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              itemProp="review"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                  itemProp="image"
                />
                <div className="ml-4">
                  <h3 className="font-semibold" itemProp="author">{testimonial.name}</h3>
                  <p className="text-sm text-gray-400" itemProp="reviewRating">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#C6A45C] fill-current" />
                ))}
              </div>

              <Quote className="w-8 h-8 text-[#C6A45C] mb-2 opacity-50" />
              <p className="text-gray-300" itemProp="reviewBody">
                {testimonial.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;