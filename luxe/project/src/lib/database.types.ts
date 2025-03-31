export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name: string | null
          phone: string | null
          avatar_url: string | null
          role: 'user' | 'admin' | 'vip'
          membership_tier: 'none' | 'silver' | 'gold' | 'platinum' | null
          membership_expiry: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin' | 'vip'
          membership_tier?: 'none' | 'silver' | 'gold' | 'platinum' | null
          membership_expiry?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin' | 'vip'
          membership_tier?: 'none' | 'silver' | 'gold' | 'platinum' | null
          membership_expiry?: string | null
        }
      }
      services: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string
          category: string
          price: number | null
          price_unit: string | null
          image_url: string | null
          is_available: boolean
          featured: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description: string
          category: string
          price?: number | null
          price_unit?: string | null
          image_url?: string | null
          is_available?: boolean
          featured?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string
          category?: string
          price?: number | null
          price_unit?: string | null
          image_url?: string | null
          is_available?: boolean
          featured?: boolean
        }
      }
      bookings: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          service_id: string
          start_date: string
          end_date: string | null
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          total_amount: number
          payment_status: 'unpaid' | 'paid' | 'refunded'
          payment_id: string | null
          special_requests: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          service_id: string
          start_date: string
          end_date?: string | null
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          total_amount: number
          payment_status?: 'unpaid' | 'paid' | 'refunded'
          payment_id?: string | null
          special_requests?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          service_id?: string
          start_date?: string
          end_date?: string | null
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          total_amount?: number
          payment_status?: 'unpaid' | 'paid' | 'refunded'
          payment_id?: string | null
          special_requests?: string | null
        }
      }
      payments: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          booking_id: string
          user_id: string
          amount: number
          currency: string
          payment_method: string
          status: 'pending' | 'succeeded' | 'failed' | 'refunded'
          stripe_payment_id: string | null
          receipt_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          booking_id: string
          user_id: string
          amount: number
          currency: string
          payment_method: string
          status?: 'pending' | 'succeeded' | 'failed' | 'refunded'
          stripe_payment_id?: string | null
          receipt_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          booking_id?: string
          user_id?: string
          amount?: number
          currency?: string
          payment_method?: string
          status?: 'pending' | 'succeeded' | 'failed' | 'refunded'
          stripe_payment_id?: string | null
          receipt_url?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}