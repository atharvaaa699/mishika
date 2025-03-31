import React, { useState, useEffect } from 'react';
import { Lock, User, Key, Shield, Bell, Settings, CreditCard, Gift, Calendar, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getUserBookings, getServiceById } from '../lib/supabase';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
  fullName?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  fullName?: string;
}

const MemberArea = () => {
  const { user, profile, signIn, signUp, signOut, isVIP } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    fullName: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
  }, [user]);

  const fetchUserBookings = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { bookings: userBookings, error } = await getUserBookings(user.id);
      
      if (error) throw error;
      
      setBookings(userBookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load your bookings');
    } finally {
      setIsLoading(false);
    }
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email address' : '';
      case 'password':
        return value.length < 6 ? 'Password must be at least 6 characters' : '';
      case 'fullName':
        return !isLogin && value.length < 2 ? 'Full name is required' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      if (isLogin && key === 'fullName') return;
      const error = validateField(key, formData[key as keyof FormData] || '');
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) throw error;
        toast.success('Successfully signed in!');
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.fullName || '');
        if (error) throw error;
        toast.success('Account created successfully!');
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      toast.error(error.message || 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Successfully signed out');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] pt-24 flex items-center justify-center">
        <div className="animate-pulse text-[#C6A45C]">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] pt-24">
        <div className="max-w-md mx-auto px-4 py-12">
          <div className="bg-black p-8 rounded-lg">
            <div className="text-center mb-8">
              <Lock className="h-12 w-12 text-[#C6A45C] mx-auto mb-4" />
              <h1 className="text-3xl font-serif mb-2">{isLogin ? 'Member Access' : 'Create Account'}</h1>
              <p className="text-gray-400">
                {isLogin 
                  ? 'Access your exclusive benefits and personalized services.' 
                  : 'Join our exclusive community of luxury enthusiasts.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-400 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full bg-[#1A1A1A] border ${
                      errors.fullName ? 'border-red-500' : 'border-gray-800'
                    } rounded px-4 py-2 focus:outline-none focus:border-[#C6A45C]`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-[#1A1A1A] border ${
                    errors.email ? 'border-red-500' : 'border-gray-800'
                  } rounded px-4 py-2 focus:outline-none focus:border-[#C6A45C]`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full bg-[#1A1A1A] border ${
                    errors.password ? 'border-red-500' : 'border-gray-800'
                  } rounded px-4 py-2 focus:outline-none focus:border-[#C6A45C]`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C6A45C] text-black py-3 rounded hover:bg-[#B59449] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#C6A45C] hover:text-white transition-colors"
              >
                {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-black p-8 rounded-lg mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-[#1A1A1A] p-3 rounded-full mr-4">
                <User className="h-8 w-8 text-[#C6A45C]" />
              </div>
              <div>
                <h2 className="text-2xl font-serif">Welcome, {profile?.full_name || 'Member'}</h2>
                <p className="text-gray-400">{profile?.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              {profile?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="mr-4 flex items-center text-[#C6A45C] hover:text-white transition-colors"
                >
                  <Shield className="h-5 w-5 mr-1" />
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="text-gray-400 hover:text-[#C6A45C] transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-[#1A1A1A] p-4 rounded-lg">
              <Bell className="h-6 w-6 text-[#C6A45C] mb-2" />
              <h3 className="font-semibold mb-1">Notifications</h3>
              <p className="text-sm text-gray-400">No new notifications</p>
            </div>
            <div className="bg-[#1A1A1A] p-4 rounded-lg">
              <CreditCard className="h-6 w-6 text-[#C6A45C] mb-2" />
              <h3 className="font-semibold mb-1">Membership</h3>
              <p className="text-sm text-gray-400">
                {profile?.membership_tier && profile.membership_tier !== 'none'
                  ? `${profile.membership_tier.charAt(0).toUpperCase() + profile.membership_tier.slice(1)} Member`
                  : 'No active membership'}
              </p>
            </div>
            <div className="bg-[#1A1A1A] p-4 rounded-lg">
              <Gift className="h-6 w-6 text-[#C6A45C] mb-2" />
              <h3 className="font-semibold mb-1">Rewards</h3>
              <p className="text-sm text-gray-400">0 points</p>
            </div>
            <div className="bg-[#1A1A1A] p-4 rounded-lg">
              <Settings className="h-6 w-6 text-[#C6A45C] mb-2" />
              <h3 className="font-semibold mb-1">Preferences</h3>
              <p className="text-sm text-gray-400">Update settings</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-black p-8 rounded-lg">
              <h3 className="text-xl font-serif mb-6 flex items-center">
                <Calendar className="h-6 w-6 text-[#C6A45C] mr-2" />
                Your Bookings
              </h3>
              
              {bookings.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">You don't have any bookings yet.</p>
                  <Link
                    to="/services"
                    className="inline-block px-6 py-2 bg-[#C6A45C] text-black rounded hover:bg-[#B59449] transition-colors"
                  >
                    Explore Services
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {bookings.map(booking => (
                    <div key={booking.id} className="bg-[#1A1A1A] p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{booking.services?.name || 'Unknown Service'}</h4>
                        <span className={`px-2 py-1 text-xs rounded ${
                          booking.status === 'confirmed' ? 'bg-green-900 text-green-300' :
                          booking.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                          booking.status === 'completed' ? 'bg-blue-900 text-blue-300' :
                          'bg-red-900 text-red-300'
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400 mb-3">
                        <div>Booking Date: {format(new Date(booking.created_at), 'MMM d, yyyy')}</div>
                        <div>Service Date: {format(new Date(booking.start_date), 'MMM d, yyyy')}</div>
                        {booking.end_date && (
                          <div>End Date: {format(new Date(booking.end_date), 'MMM d, yyyy')}</div>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-[#C6A45C]">₹{booking.total_amount.toLocaleString()}</div>
                        <div className="flex space-x-2">
                          <span className={`px-2 py-1 text-xs rounded ${
                            booking.payment_status === 'paid' ? 'bg-green-900 text-green-300' :
                            booking.payment_status === 'unpaid' ? 'bg-yellow-900 text-yellow-300' :
                            'bg-blue-900 text-blue-300'
                          }`}>
                            {booking.payment_status.charAt(0).toUpperCase() + booking.payment_status.slice(1)}
                          </span>
                          {booking.payment_status === 'unpaid' && (
                            <button className="px-2 py-1 bg-[#C6A45C] text-black rounded text-xs hover:bg-[#B59449] transition-colors">
                              Pay Now
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-black p-8 rounded-lg mb-8">
              <h3 className="text-xl font-serif mb-4">Membership Status</h3>
              <div className={`p-4 rounded-lg mb-4 ${
                profile?.membership_tier === 'platinum' ? 'bg-gradient-to-r from-gray-300 to-white text-black' :
                profile?.membership_tier === 'gold' ? 'bg-[#C6A45C] text-black' :
                profile?.membership_tier === 'silver' ? 'bg-gray-300 text-gray-800' :
                'bg-[#1A1A1A]'
              }`}>
                <h4 className="font-semibold">
                  {profile?.membership_tier && profile.membership_tier !== 'none'
                    ? `${profile.membership_tier.charAt(0).toUpperCase() + profile.membership_tier.slice(1)} Member`
                    : 'No Active Membership'}
                </h4>
                {profile?.membership_expiry && (
                  <p className="text-sm">
                    Expires: {format(new Date(profile.membership_expiry), 'MMM d, yyyy')}
                  </p>
                )}
              </div>
              
              {(!profile?.membership_tier || profile.membership_tier === 'none') && (
                <Link
                  to="/contact"
                  className="block text-center px-4 py-2 bg-[#C6A45C] text-black rounded hover:bg-[#B59449] transition-colors"
                >
                  Upgrade to VIP
                </Link>
              )}
            </div>

            <div className="bg-black p-8 rounded-lg">
              <h3 className="text-xl font-serif mb-4">Exclusive Offers</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-800 pb-4">
                  <p className="font-semibold">Private Island Retreat</p>
                  <p className="text-gray-400 text-sm mb-2">Limited time offer - 20% off</p>
                  <Link
                    to="/services"
                    className="text-[#C6A45C] hover:text-white text-sm transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
                <div className="border-b border-gray-800 pb-4">
                  <p className="font-semibold">Luxury Safari Experience</p>
                  <p className="text-gray-400 text-sm mb-2">Complimentary upgrade available</p>
                  <Link
                    to="/services"
                    className="text-[#C6A45C] hover:text-white text-sm transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberArea;