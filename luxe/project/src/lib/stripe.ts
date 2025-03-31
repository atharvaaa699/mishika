import { loadStripe } from '@stripe/stripe-js';
import { supabase } from './supabase';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

// Create a payment intent
export const createPaymentIntent = async (amount: number, currency: string = 'inr', bookingId: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Call your serverless function or API endpoint to create a payment intent
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
        bookingId,
        userId: user.id,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Process payment with Stripe Elements
export const processPayment = async (
  paymentMethodId: string,
  paymentIntentId: string,
  bookingId: string
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Call your serverless function or API endpoint to confirm the payment
    const response = await fetch('/api/confirm-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentMethodId,
        paymentIntentId,
        bookingId,
        userId: user.id,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to process payment');
    }

    const data = await response.json();
    
    // Update booking payment status
    await supabase
      .from('bookings')
      .update({
        payment_status: 'paid',
        payment_id: data.paymentId,
      })
      .eq('id', bookingId);

    return data;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

export default stripePromise;