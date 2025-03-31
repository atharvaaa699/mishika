import React, { useEffect } from 'react';
import { Crown, Star, Diamond, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const tiers = [
  {
    name: 'Silver',
    icon: <Star className="h-12 w-12 text-[#C6A45C]" />,
    price: '100',
    benefits: [
      'Priority Bookings',
      'Dedicated Concierge',
      'Exclusive Event Access',
      'Luxury Hotel Upgrades',
      'Airport Fast-Track Service'
    ]
  },
  {
    name: 'Gold',
    icon: <Crown className="h-12 w-12 text-[#C6A45C]" />,
    price: '150',
    benefits: [
      'All Silver Benefits',
      'Private Jet Credits',
      'Yacht Charter Privileges',
      'VIP Event Invitations',
      'Luxury Car Service',
      'Personal Shopping Assistant'
    ]
  },
  {
    name: 'Platinum',
    icon: <Diamond className="h-12 w-12 text-[#C6A45C]" />,
    price: '200',
    benefits: [
      'All Gold Benefits',
      'Unlimited Jet Hours',
      'Private Island Access',
      'Secret Events & Experiences',
      'Ultra-Luxury Concierge',
      'Bespoke Travel Planning',
      'Exclusive Investment Opportunities'
    ]
  }
];

const VIPMembership = () => {
  useEffect(() => {
    const cards = document.querySelectorAll('.membership-card');
    
    const handleMouseMove = (e: MouseEvent, card: Element) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.setAttribute('style', `
        transform: perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg);
        transition: transform 0.1s ease;
      `);
    };
    
    const handleMouseLeave = (card: Element) => {
      card.setAttribute('style', `
        transform: perspective(1000px) rotateX(0) rotateY(0);
        transition: transform 0.3s ease;
      `);
    };
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => handleMouseMove(e, card));
      card.addEventListener('mouseleave', () => handleMouseLeave(card));
    });
    
    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', (e) => handleMouseMove(e, card));
        card.removeEventListener('mouseleave', () => handleMouseLeave(card));
      });
    };
  }, []);

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-4">VIP Membership</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join an exclusive circle of distinguished members and unlock unprecedented luxury privileges.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="membership-card bg-[#1A1A1A] rounded-lg p-8 transform hover:scale-105 transition-all duration-300 neon-glow"
            >
              <div className="text-center mb-8">
                {tier.icon}
                <h3 className="text-2xl font-serif mt-4 mb-2">{tier.name}</h3>
                <div className="text-[#C6A45C] text-xl">
                  ${tier.price}
                  <span className="text-sm text-gray-400">/year</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-[#C6A45C] mr-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="block text-center btn-primary w-full magnetic-button"
              >
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VIPMembership;