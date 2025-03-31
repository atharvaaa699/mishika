import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Authentication helpers
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName
      }
    }
  });
  
  if (data.user && !error) {
    // Create user profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: data.user.id,
          email,
          full_name: fullName,
          role: 'user',
          membership_tier: 'none',
        },
      ]);
    
    if (profileError) {
      console.error('Error creating profile:', profileError);
      return { data, error: profileError };
    }
  }
  
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    return { user: data.user, error };
  } catch (error) {
    return { user: null, error };
  }
};

// User profile helpers
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    // If profile doesn't exist but we have a user, create the profile
    if (error && error.code === 'PGRST116') {
      const { data: userData } = await supabase.auth.getUser();
      if (userData.user) {
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert([
            {
              id: userId,
              email: userData.user.email,
              full_name: userData.user.user_metadata?.full_name || null,
              role: 'user',
              membership_tier: 'none',
            },
          ])
          .select()
          .single();
        
        if (!insertError) {
          return { profile: newProfile, error: null };
        }
      }
    }
    
    return { profile: data, error };
  } catch (error) {
    return { profile: null, error };
  }
};

export const updateUserProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select();
  return { data, error };
};

// Service helpers
export const getServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false });
  return { services: data, error };
};

export const getServiceById = async (id: string) => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();
  return { service: data, error };
};

// Booking helpers
export const createBooking = async (bookingData: any) => {
  const { data, error } = await supabase
    .from('bookings')
    .insert([bookingData])
    .select();
  return { booking: data?.[0], error };
};

export const getUserBookings = async (userId: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      services (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { bookings: data, error };
};

export const getBookingById = async (id: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      services (*)
    `)
    .eq('id', id)
    .single();
  return { booking: data, error };
};

// Admin helpers
export const getAllBookings = async () => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      services (*),
      profiles (*)
    `)
    .order('created_at', { ascending: false });
  return { bookings: data, error };
};

export const updateBookingStatus = async (id: string, status: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id)
    .select();
  return { booking: data?.[0], error };
};

export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });
  return { users: data, error };
};

// Create an admin user (for initial setup)
export const createAdminUser = async (email: string, password: string, fullName: string) => {
  // First sign up the user
  const { data, error } = await signUp(email, password, fullName);
  
  if (error) {
    return { data, error };
  }
  
  if (data.user) {
    // Update the user's role to admin
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', data.user.id);
    
    if (updateError) {
      return { data, error: updateError };
    }
  }
  
  return { data, error: null };
};