import React from 'react';

const partners = [
  {
    name: "Ritz-Carlton",
    logo: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80",
  },
  {
    name: "Emirates",
    logo: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80",
  },
  {
    name: "Ferrari",
    logo: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80",
  },
  {
    name: "Rolls-Royce",
    logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80",
  }
];

const LuxuryPartners = () => {
  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif mb-4">Our Luxury Partners</h2>
          <p className="text-gray-400">
            Collaborating with the world's most prestigious brands to deliver excellence.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="relative h-32 bg-[#1A1A1A] rounded-lg overflow-hidden group transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0">
                <img
                  src={partner.logo}
                  alt={`${partner.name} - Luxury partner of LUXE`}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-xl font-serif text-white">{partner.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LuxuryPartners;