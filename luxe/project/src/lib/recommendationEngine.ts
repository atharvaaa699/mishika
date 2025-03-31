import { supabase } from './supabase';
import type { Database } from './database.types';

type Service = Database['public']['Tables']['services']['Row'];
type Booking = Database['public']['Tables']['bookings']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

interface ServiceWithScore {
  service: Service;
  score: number;
}

// Get user's booking history
export const getUserBookingHistory = async (userId: string) => {
  try {
    if (!supabase) {
      throw new Error('Supabase client is not initialized');
    }

    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        services (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching user booking history:', error);
    throw error;
  }
};

// Get all available services
export const getAllServices = async () => {
  try {
    if (!supabase) {
      throw new Error('Supabase client is not initialized');
    }

    const { data: services, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_available', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }

    return services || [];
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

// Get user preferences from profile
export const getUserPreferences = async (userId: string) => {
  try {
    if (!supabase) {
      throw new Error('Supabase client is not initialized');
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      throw error;
    }

    return profile;
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    throw error;
  }
};

// Get similar users based on booking patterns
export const getSimilarUsers = async (userId: string) => {
  try {
    if (!supabase) {
      throw new Error('Supabase client is not initialized');
    }

    // Get current user's bookings
    const userBookings = await getUserBookingHistory(userId);
    
    if (userBookings.length === 0) {
      return [];
    }
    
    // Get service IDs booked by current user
    const userServiceIds = userBookings.map(booking => booking.service_id);
    
    // Find users who booked similar services
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        user_id,
        services (*)
      `)
      .in('service_id', userServiceIds)
      .neq('user_id', userId);
    
    if (error) {
      throw error;
    }
    
    if (!data) {
      return [];
    }
    
    // Count how many similar bookings each user has
    const userSimilarityMap = new Map<string, number>();
    
    data.forEach(booking => {
      const similarUserId = booking.user_id;
      userSimilarityMap.set(
        similarUserId, 
        (userSimilarityMap.get(similarUserId) || 0) + 1
      );
    });
    
    // Convert to array and sort by similarity score
    const similarUsers = Array.from(userSimilarityMap.entries())
      .map(([userId, count]) => ({ userId, similarityScore: count }))
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, 5); // Get top 5 similar users
    
    return similarUsers;
  } catch (error) {
    console.error('Error finding similar users:', error);
    throw error;
  }
};

// Get services booked by similar users
export const getServicesFromSimilarUsers = async (similarUsers: { userId: string; similarityScore: number }[]) => {
  try {
    if (!supabase) {
      throw new Error('Supabase client is not initialized');
    }

    if (similarUsers.length === 0) {
      return [];
    }
    
    const similarUserIds = similarUsers.map(user => user.userId);
    
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        services (*)
      `)
      .in('user_id', similarUserIds)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    if (!data) {
      return [];
    }
    
    return data.map(booking => booking.services).filter(Boolean) || [];
  } catch (error) {
    console.error('Error fetching services from similar users:', error);
    throw error;
  }
};

// Calculate service scores based on category preferences
const calculateCategoryScore = (service: Service, userBookings: Booking[]) => {
  // Count how many times user booked each category
  const categoryCount = userBookings.reduce((acc, booking) => {
    const serviceCategory = booking.services?.category;
    if (serviceCategory) {
      acc[serviceCategory] = (acc[serviceCategory] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  // Calculate total bookings
  const totalBookings = Object.values(categoryCount).reduce((sum, count) => sum + count, 0);
  
  // If user has no bookings, return neutral score
  if (totalBookings === 0) return 0.5;
  
  // Calculate score based on category preference
  const categoryPreferenceScore = (categoryCount[service.category] || 0) / totalBookings;
  
  return categoryPreferenceScore;
};

// Calculate service scores based on price preferences
const calculatePriceScore = (service: Service, userBookings: Booking[]) => {
  // If service has no price, return neutral score
  if (!service.price) return 0.5;
  
  // Calculate average price of user's bookings
  const bookingsWithPrice = userBookings.filter(booking => booking.total_amount > 0);
  
  if (bookingsWithPrice.length === 0) return 0.5;
  
  const avgBookingPrice = bookingsWithPrice.reduce((sum, booking) => sum + booking.total_amount, 0) / bookingsWithPrice.length;
  
  // Calculate price similarity (closer to 1 means more similar to user's average spending)
  const priceDifference = Math.abs(service.price - avgBookingPrice);
  const maxPrice = Math.max(service.price, avgBookingPrice);
  
  // Normalize the difference to get a score between 0 and 1
  const priceScore = 1 - (priceDifference / maxPrice);
  
  return priceScore;
};

// Generate personalized recommendations for a user
export const generateRecommendations = async (userId: string) => {
  try {
    if (!supabase) {
      throw new Error('Supabase client is not initialized');
    }

    // Get user's booking history
    const userBookings = await getUserBookingHistory(userId);
    
    // Get all available services
    const allServices = await getAllServices();
    
    // Get user preferences
    const userProfile = await getUserPreferences(userId);
    
    // Get similar users
    const similarUsers = await getSimilarUsers(userId);
    
    // Get services booked by similar users
    const similarUserServices = await getServicesFromSimilarUsers(similarUsers);
    
    // Calculate scores for each service
    const scoredServices: ServiceWithScore[] = allServices.map(service => {
      // Skip services the user has already booked
      const alreadyBooked = userBookings.some(booking => booking.service_id === service.id);
      
      // Base score
      let score = 0;
      
      // If user has already booked this service, give it a lower score
      if (alreadyBooked) {
        score -= 0.5;
      }
      
      // Category preference score (30% weight)
      const categoryScore = calculateCategoryScore(service, userBookings);
      score += categoryScore * 0.3;
      
      // Price preference score (20% weight)
      const priceScore = calculatePriceScore(service, userBookings);
      score += priceScore * 0.2;
      
      // Similar users score (30% weight)
      const similarityScore = similarUserServices.filter(s => s?.id === service.id).length / Math.max(1, similarUsers.length);
      score += similarityScore * 0.3;
      
      // Featured service bonus (10% weight)
      if (service.featured) {
        score += 0.1;
      }
      
      // VIP membership bonus (10% weight)
      if (userProfile?.membership_tier && userProfile.membership_tier !== 'none') {
        score += 0.1;
      }
      
      return { service, score };
    });
    
    // Sort by score and return top recommendations
    return scoredServices
      .sort((a, b) => b.score - a.score)
      .slice(0, 6); // Return top 6 recommendations
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw error; // Re-throw the error to be handled by the component
  }
};

// Get trending services based on recent bookings
export const getTrendingServices = async () => {
  try {
    if (!supabase) {
      throw new Error('Supabase client is not initialized');
    }

    // Get bookings from the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        service_id,
        services (*)
      `)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    if (!data) {
      return [];
    }
    
    // Count bookings per service
    const serviceBookingCount = new Map<string, { service: Service; count: number }>();
    
    data.forEach(booking => {
      if (booking.services && booking.service_id) {
        const existingEntry = serviceBookingCount.get(booking.service_id);
        
        if (existingEntry) {
          existingEntry.count += 1;
        } else {
          serviceBookingCount.set(booking.service_id, { 
            service: booking.services as Service, 
            count: 1 
          });
        }
      }
    });
    
    // Convert to array and sort by booking count
    const trendingServices = Array.from(serviceBookingCount.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 4) // Get top 4 trending services
      .map(item => item.service);
    
    return trendingServices;
  } catch (error) {
    console.error('Error fetching trending services:', error);
    throw error; // Re-throw the error to be handled by the component
  }
};