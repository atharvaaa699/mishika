import React, { useState } from 'react';
import { Lock, User, Key, Shield, Bell, Settings, CreditCard, Gift } from 'lucide-react';

const MemberArea = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto bg-black p-8 rounded-lg">
            <div className="text-center mb-8">
              <Lock className="h-12 w-12 text-[#C6A45C] mx-auto mb-4" />
              <h1 className="text-3xl font-serif mb-2">Member Access</h1>
              <p className="text-gray-400">Access your exclusive benefits and personalized services.</p>
            </div>

            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-[#1A1A1A] border border-gray-800 rounded-md px-4 py-2 focus:outline-none focus:border-[#C6A45C]"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full bg-[#1A1A1A] border border-gray-800 rounded-md px-4 py-2 focus:outline-none focus:border-[#C6A45C]"
                />
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsLoggedIn(true);
                }}
                className="w-full bg-[#C6A45C] text-black py-3 rounded-md hover:bg-[#B59449] transition"
              >
                Sign In
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-black p-8 rounded-lg">
              <h2 className="text-2xl font-serif mb-6 flex items-center">
                <User className="h-6 w-6 text-[#C6A45C] mr-2" />
                Welcome Back, Member
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-[#1A1A1A] p-4 rounded-lg">
                  <Bell className="h-6 w-6 text-[#C6A45C] mb-2" />
                  <h3 className="font-semibold mb-1">Notifications</h3>
                  <p className="text-sm text-gray-400">3 new updates</p>
                </div>
                <div className="bg-[#1A1A1A] p-4 rounded-lg">
                  <CreditCard className="h-6 w-6 text-[#C6A45C] mb-2" />
                  <h3 className="font-semibold mb-1">Membership</h3>
                  <p className="text-sm text-gray-400">Platinum Status</p>
                </div>
                <div className="bg-[#1A1A1A] p-4 rounded-lg">
                  <Gift className="h-6 w-6 text-[#C6A45C] mb-2" />
                  <h3 className="font-semibold mb-1">Rewards</h3>
                  <p className="text-sm text-gray-400">250 points</p>
                </div>
                <div className="bg-[#1A1A1A] p-4 rounded-lg">
                  <Settings className="h-6 w-6 text-[#C6A45C] mb-2" />
                  <h3 className="font-semibold mb-1">Preferences</h3>
                  <p className="text-sm text-gray-400">Update settings</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-black p-8 rounded-lg">
                <h3 className="text-xl font-serif mb-4">Upcoming Reservations</h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-800 pb-4">
                    <p className="font-semibold">Private Jet to Maldives</p>
                    <p className="text-gray-400">March 15, 2025</p>
                  </div>
                  <div className="border-b border-gray-800 pb-4">
                    <p className="font-semibold">Yacht Charter - Mediterranean</p>
                    <p className="text-gray-400">April 2, 2025</p>
                  </div>
                </div>
              </div>

              <div className="bg-black p-8 rounded-lg">
                <h3 className="text-xl font-serif mb-4">Exclusive Offers</h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-800 pb-4">
                    <p className="font-semibold">Private Island Retreat</p>
                    <p className="text-gray-400">Limited time offer - 20% off</p>
                  </div>
                  <div className="border-b border-gray-800 pb-4">
                    <p className="font-semibold">Luxury Safari Experience</p>
                    <p className="text-gray-400">Complimentary upgrade available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberArea;