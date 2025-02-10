import React from 'react';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';

const BlogPage = () => {
  const articles = [
    {
      title: "The Art of Luxury Travel: Private Jets vs. First Class",
      excerpt: "Discover why private aviation is revolutionizing luxury travel and how it provides unmatched convenience and privacy.",
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80",
      author: "Mishika Luxe",
      date: "March 1, 2025",
      readTime: "5 min read"
    },
    {
      title: "Curating the Perfect Luxury Experience: A Guide to Personalization",
      excerpt: "Learn how we create bespoke experiences that cater to the unique preferences of our distinguished clientele.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80",
      author: "Mishika Luxe",
      date: "February 28, 2025",
      readTime: "4 min read"
    },
    {
      title: "The Rise of Sustainable Luxury: Eco-Friendly Private Travel",
      excerpt: "Exploring how luxury travel is adapting to environmental consciousness without compromising on quality.",
      image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80",
      author: "Mishika Luxe",
      date: "February 25, 2025",
      readTime: "6 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Luxury Insights</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover the latest trends and insights in luxury lifestyle and travel.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article key={index} className="bg-black rounded-lg overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <div className="flex items-center mr-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    {article.date}
                  </div>
                  <div className="flex items-center mr-4">
                    <User className="h-4 w-4 mr-1" />
                    {article.author}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {article.readTime}
                  </div>
                </div>
                <h2 className="text-xl font-serif mb-3">{article.title}</h2>
                <p className="text-gray-400 mb-4">{article.excerpt}</p>
                <a href="#" className="inline-flex items-center text-[#C6A45C] hover:text-white transition">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <div className="bg-black p-8 rounded-lg">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-serif mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-gray-400 mb-6">
                Stay updated with the latest insights in luxury lifestyle and exclusive offers.
              </p>
              <form className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-[#1A1A1A] border border-gray-800 rounded-md px-4 py-2 focus:outline-none focus:border-[#C6A45C]"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#C6A45C] text-black rounded-md hover:bg-[#B59449] transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;