import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Package, 
  Settings, 
  Calendar, 
  DollarSign, 
  PieChart, 
  BarChart2, 
  User, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search,
  Edit,
  Trash,
  Plus
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getAllUsers, getAllBookings, getServices, updateBookingStatus } from '../lib/supabase';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

// Simple Chart component for visualization
const Chart = ({ data, type }: { data: any, type: 'bar' | 'line' | 'pie' }) => {
  // This is a placeholder component - in a real app, you would use a charting library
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-gray-400 text-center">
        {type === 'pie' && (
          <div className="flex flex-wrap justify-center gap-2">
            {data.labels.map((label: string, index: number) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 mr-1 rounded-full" 
                  style={{ backgroundColor: getRandomColor(index) }}
                />
                <span className="text-xs">{label}: {data.values[index]}</span>
              </div>
            ))}
          </div>
        )}
        
        {type === 'bar' && (
          <div className="flex h-40 items-end justify-between gap-1 w-full">
            {data.labels.map((label: string, index: number) => {
              const maxValue = Math.max(...data.values);
              const height = (data.values[index] / maxValue) * 100;
              return (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-6 bg-[#C6A45C] rounded-t" 
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs mt-1">{label}</span>
                </div>
              );
            })}
          </div>
        )}
        
        {type === 'line' && (
          <div className="text-center">
            <PieChart className="h-16 w-16 text-[#C6A45C] mx-auto mb-2" />
            <p>Line Chart Visualization</p>
            <p className="text-xs">(Placeholder for actual chart)</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to generate random colors for chart elements
const getRandomColor = (index: number) => {
  const colors = [
    '#C6A45C', '#4C9F70', '#6A8CAF', '#D66853', '#9A7AA0', 
    '#D4AA7D', '#8FB9AA', '#A37774', '#D4B483', '#8A9EA7'
  ];
  return colors[index % colors.length];
};

// Helper function to get service category data for charts
const getServiceCategoryData = () => {
  return {
    labels: ['Aviation', 'Marine', 'Accommodation', 'Events', 'Transportation', 'Accessories'],
    values: [35, 25, 15, 10, 10, 5]
  };
};

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch users
        const { users: allUsers, error: usersError } = await getAllUsers();
        if (usersError) throw usersError;
        setUsers(allUsers || []);
        
        // Fetch bookings
        const { bookings: allBookings, error: bookingsError } = await getAllBookings();
        if (bookingsError) throw bookingsError;
        setBookings(allBookings || []);
        
        // Fetch services
        const { services: allServices, error: servicesError } = await getServices();
        if (servicesError) throw servicesError;
        setServices(allServices || []);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        toast.error('Failed to load admin data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleUpdateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const { booking, error } = await updateBookingStatus(bookingId, status);
      if (error) throw error;
      
      // Update local state
      setBookings(prevBookings => 
        prevBookings.map(b => b.id === bookingId ? { ...b, status } : b)
      );
      
      toast.success(`Booking status updated to ${status}`);
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status');
    }
  };

  const filteredUsers = users.filter(user => 
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBookings = bookings.filter(booking => 
    booking.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.services?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredServices = services.filter(service => 
    service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] pt-24 flex items-center justify-center">
        <div className="animate-pulse text-[#C6A45C]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-black p-8 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-serif mb-2">Admin Dashboard</h1>
              <p className="text-gray-400">Manage users, bookings, and services</p>
            </div>
            <div className="mt-4 md:mt-0 relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#1A1A1A] border border-gray-800 rounded-md px-4 py-2 pl-10 focus:outline-none focus:border-[#C6A45C]"
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="flex border-b border-gray-800 mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'users'
                  ? 'text-[#C6A45C] border-b-2 border-[#C6A45C]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Users className="h-5 w-5 inline mr-2" />
              Users
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'bookings'
                  ? 'text-[#C6A45C] border-b-2 border-[#C6A45C]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Calendar className="h-5 w-5 inline mr-2" />
              Bookings
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'services'
                  ? 'text-[#C6A45C] border-b-2 border-[#C6A45C]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Package className="h-5 w-5 inline mr-2" />
              Services
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'analytics'
                  ? 'text-[#C6A45C] border-b-2 border-[#C6A45C]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <BarChart2 className="h-5 w-5 inline mr-2" />
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'settings'
                  ? 'text-[#C6A45C] border-b-2 border-[#C6A45C]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Settings className="h-5 w-5 inline mr-2" />
              Settings
            </button>
          </div>

          <div>
            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-serif">User Management</h3>
                  <button className="px-3 py-1 bg-[#C6A45C] text-black rounded-md hover:bg-[#B59449] transition-colors flex items-center">
                    <Plus className="h-4 w-4 mr-1" />
                    Add User
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-[#1A1A1A] rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-black">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Membership</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-black/30">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center">
                                {user.avatar_url ? (
                                  <img src={user.avatar_url} alt={user.full_name} className="h-10 w-10 rounded-full" />
                                ) : (
                                  <User className="h-5 w-5 text-gray-400" />
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium">{user.full_name || 'Unnamed User'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.role === 'admin' ? 'bg-red-900 text-red-300' :
                              user.role === 'vip' ? 'bg-purple-900 text-purple-300' :
                              'bg-blue-900 text-blue-300'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.membership_tier === 'platinum' ? 'bg-gray-300 text-gray-800' :
                              user.membership_tier === 'gold' ? 'bg-yellow-500 text-yellow-900' :
                              user.membership_tier === 'silver' ? 'bg-gray-400 text-gray-800' :
                              'bg-gray-700 text-gray-300'
                            }`}>
                              {user.membership_tier !== 'none' ? user.membership_tier : 'none'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {format(new Date(user.created_at), 'MMM d, yyyy')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            <button className="text-blue-400 hover:text-blue-300 mr-3">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-400 hover:text-red-300">
                              <Trash className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <h3 className="text-xl font-serif mb-4">Booking Management</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-[#1A1A1A] rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-black">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Payment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-black/30">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                            {booking.id.substring(0, 8)}...
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {booking.profiles?.full_name || 'Unknown User'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {booking.services?.name || 'Unknown Service'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {format(new Date(booking.start_date), 'MMM d, yyyy')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              booking.status === 'confirmed' ? 'bg-green-900 text-green-300' :
                              booking.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                              booking.status === 'completed' ? 'bg-blue-900 text-blue-300' :
                              'bg-red-900 text-red-300'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              booking.payment_status === 'paid' ? 'bg-green-900 text-green-300' :
                              booking.payment_status === 'unpaid' ? 'bg-yellow-900 text-yellow-300' :
                              'bg-blue-900 text-blue-300'
                            }`}>
                              {booking.payment_status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            ₹{booking.total_amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex space-x-2">
                              {booking.status === 'pending' && (
                                <>
                                  <button 
                                    onClick={() => handleUpdateBookingStatus(booking.id, 'confirmed')}
                                    className="text-green-400 hover:text-green-300"
                                    title="Confirm booking"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </button>
                                  <button 
                                    onClick={() => handleUpdateBookingStatus(booking.id, 'cancelled')}
                                    className="text-red-400 hover:text-red-300"
                                    title="Cancel booking"
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </button>
                                </>
                              )}
                              {booking.status === 'confirmed' && (
                                <button 
                                  onClick={() => handleUpdateBookingStatus(booking.id, 'completed')}
                                  className="text-blue-400 hover:text-blue-300"
                                  title="Mark as completed"
                                >
                                  <Clock className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-serif">Service Management</h3>
                  <button className="px-3 py-1 bg-[#C6A45C] text-black rounded-md hover:bg-[#B59449] transition-colors flex items-center">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Service
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <div key={service.id} className="bg-[#1A1A1A] rounded-lg overflow-hidden">
                      <div className="h-40 relative">
                        {service.image_url ? (
                          <img 
                            src={service.image_url} 
                            alt={service.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                            <Package className="h-12 w-12 text-gray-600" />
                          </div>
                        )}
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <button className="p-1 bg-black/70 rounded hover:bg-black">
                            <Edit className="h-4 w-4 text-white" />
                          </button>
                          <button className="p-1 bg-black/70 rounded hover:bg-black">
                            <Trash className="h-4 w-4 text-white" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{service.name}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            service.is_available ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                          }`}>
                            {service.is_available ? 'Available' : 'Unavailable'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2 line-clamp-2">{service.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs bg-gray-800 px-2 py-1 rounded">{service.category}</span>
                          <span className="text-[#C6A45C]">
                            {service.price 
                              ? `₹${service.price.toLocaleString()} ${service.price_unit || ''}`
                              : 'Price on request'
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-xl font-serif mb-6">Analytics Dashboard</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-[#1A1A1A] p-6 rounded-lg">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <PieChart className="h-5 w-5 text-[#C6A45C] mr-2" />
                      Service Categories
                    </h4>
                    <div className="h-64">
                      <Chart data={getServiceCategoryData()} type="pie" />
                    </div>
                  </div>
                  
                  <div className="bg-[#1A1A1A] p-6 rounded-lg">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <BarChart2 className="h-5 w-5 text-[#C6A45C] mr-2" />
                      Monthly Bookings
                    </h4>
                    <div className="h-64">
                      <Chart 
                        data={{
                          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                          values: [12, 19, 15, 22, 30, 28, 25, 35, 40, 38, 42, 45]
                        }} 
                        type="bar" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-[#1A1A1A] p-6 rounded-lg">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <Users className="h-5 w-5 text-[#C6A45C] mr-2" />
                      User Growth
                    </h4>
                    <div className="h-64">
                      <Chart 
                        data={{
                          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                          values: [50, 75, 100, 125, 150, 200, 250, 300, 350, 400, 450, 500]
                        }} 
                        type="line" 
                      />
                    </div>
                  </div>
                  
                  <div className="bg-[#1A1A1A] p-6 rounded-lg">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <DollarSign className="h-5 w-5 text-[#C6A45C] mr-2" />
                      Revenue by Service
                    </h4>
                    <div className="h-64">
                      <Chart 
                        data={{
                          labels: ['Private Jet', 'Yacht', 'Villa', 'Safari', 'Island', 'Car'],
                          values: [5000000, 3500000, 2000000, 1500000, 1000000, 500000]
                        }} 
                        type="bar" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h3 className="text-xl font-serif mb-6">System Settings</h3>
                
                <div className="bg-[#1A1A1A] p-6 rounded-lg mb-6">
                  <h4 className="font-semibold mb-4">General Settings</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        defaultValue="LUXE (mishikA)"
                        className="w-full bg-[#0A0A0A] border border-gray-800 rounded-md px-4 py-2 focus:outline-none focus:border-[#C6A45C]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        defaultValue="mishika.2025.02@gmail.com"
                        className="w-full bg-[#0A0A0A] border border-gray-800 rounded-md px-4 py-2 focus:outline-none focus:border-[#C6A45C]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        defaultValue="+91 91197 27956"
                        className="w-full bg-[#0A0A0A] border border-gray-800 rounded-md px-4 py-2 focus:outline-none focus:border-[#C6A45C]"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#1A1A1A] p-6 rounded-lg">
                  <h4 className="font-semibold mb-4">Payment Settings</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Currency
                      </label>
                      <select className="w-full bg-[#0A0A0A] border border-gray-800 rounded-md px-4 py-2 focus:outline-none focus:border-[#C6A45C]">
                        <option value="INR">Indian Rupee (₹)</option>
                        <option value="USD">US Dollar ($)</option>
                        <option value="EUR">Euro (€)</option>
                        <option value="GBP">British Pound (£)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Stripe API Key
                      </label>
                      <input
                        type="password"
                        defaultValue="sk_test_••••••••••••••••••••••••"
                        className="w-full bg-[#0A0A0A] border border-gray-800 rounded-md px-4 py-2 focus:outline-none focus:border-[#C6A45C]"
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="test-mode"
                        defaultChecked
                        className="mr-2"
                      />
                      <label htmlFor="test-mode" className="text-sm text-gray-400">
                        Enable Test Mode
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;