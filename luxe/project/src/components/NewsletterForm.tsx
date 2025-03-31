import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import toast from 'react-hot-toast';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black p-8 rounded-lg shadow-lg transform hover:shadow-2xl transition-all duration-300">
      <div className="text-center max-w-2xl mx-auto">
        <Mail className="h-8 w-8 text-[#C6A45C] mx-auto mb-4 animate-bounce" />
        <h2 className="text-2xl font-serif mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-400 mb-6">
          Stay updated with the latest insights in luxury lifestyle and exclusive offers.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 input-field focus:ring-2 focus:ring-[#C6A45C] transition-all duration-300"
            required
            aria-label="Email address"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary whitespace-nowrap focus:ring-2 focus:ring-offset-2 focus:ring-[#C6A45C]"
            aria-label={isSubmitting ? 'Subscribing...' : 'Subscribe to newsletter'}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterForm;