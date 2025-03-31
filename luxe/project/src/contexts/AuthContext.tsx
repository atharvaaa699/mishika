import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, getCurrentUser, getUserProfile } from '../lib/supabase';

interface AuthContextType {
  user: any | null;
  profile: any | null;
  isLoading: boolean;
  isAdmin: boolean;
  isVIP: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const getSession = async () => {
      setIsLoading(true);
      try {
        const { user: currentUser, error } = await getCurrentUser();
        
        // Don't throw error for AuthSessionMissingError as it's expected when not logged in
        if (error && error.name !== 'AuthSessionMissingError') {
          console.error('Error getting session:', error);
        }
        
        if (currentUser) {
          setUser(currentUser);
          
          // Fetch user profile
          const { profile: userProfile, error: profileError } = await getUserProfile(currentUser.id);
          
          if (profileError) {
            console.error('Error getting user profile:', profileError);
          }
          
          setProfile(userProfile);
        }
      } catch (error) {
        // Only log unexpected errors
        if (error && (error as any).name !== 'AuthSessionMissingError') {
          console.error('Unexpected error getting session:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        
        // Fetch user profile
        const { profile: userProfile } = await getUserProfile(session.user.id);
        setProfile(userProfile);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const refreshProfile = async () => {
    if (!user) return;
    
    try {
      const { profile: userProfile } = await getUserProfile(user.id);
      setProfile(userProfile);
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        return { error };
      }
      
      setUser(data.user);
      
      // Fetch user profile
      const { profile: userProfile } = await getUserProfile(data.user!.id);
      setProfile(userProfile);
      
      return { error: null };
    } catch (error) {
      console.error('Error signing in:', error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        return { error };
      }
      
      if (data.user) {
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
          return { error: profileError };
        }
        
        setUser(data.user);
        
        // Fetch user profile
        const { profile: userProfile } = await getUserProfile(data.user.id);
        setProfile(userProfile);
      }
      
      return { error: null };
    } catch (error) {
      console.error('Error signing up:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isAdmin = profile?.role === 'admin';
  const isVIP = profile?.role === 'vip' || profile?.membership_tier !== 'none';

  const value = {
    user,
    profile,
    isLoading,
    isAdmin,
    isVIP,
    signIn,
    signUp,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};