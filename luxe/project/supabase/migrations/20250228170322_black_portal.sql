/*
  # Seed Initial Data for Mishika Luxe

  1. Sample Data
    - Luxury services
    - Sample bookings and payments
  
  2. Purpose
    - Provide initial data for testing and development
*/

-- Insert luxury services
INSERT INTO services (name, description, category, price, price_unit, image_url, is_available, featured)
VALUES
  (
    'Private Jet Charter',
    'Experience seamless travel with our luxury fleet and personalized service.',
    'Aviation',
    500000,
    'per day',
    'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80',
    true,
    true
  ),
  (
    'Luxury Yacht Charter',
    'Discover the world''s most exclusive destinations in ultimate luxury.',
    'Marine',
    750000,
    'per day',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
    true,
    true
  ),
  (
    'Bespoke Jewelry Design',
    'Custom jewelry designs crafted to your exact specifications by master artisans.',
    'Accessories',
    NULL,
    NULL,
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80',
    true,
    false
  ),
  (
    'Luxury Villa Rental',
    'Access to the world''s most exclusive properties and residences.',
    'Accommodation',
    250000,
    'per week',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
    true,
    true
  ),
  (
    'VIP Event Planning',
    'Curated events that exceed expectations and create lasting memories.',
    'Events',
    NULL,
    NULL,
    'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80',
    true,
    false
  ),
  (
    'Luxury Car Rental',
    'Premium vehicle fleet with professional chauffeur service.',
    'Transportation',
    50000,
    'per day',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80',
    true,
    false
  ),
  (
    'Private Island Retreat',
    'Exclusive access to private islands for the ultimate luxury getaway.',
    'Accommodation',
    1500000,
    'per week',
    'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80',
    true,
    true
  ),
  (
    'Luxury Safari Experience',
    'Bespoke safari adventures with premium accommodations and expert guides.',
    'Travel',
    800000,
    'per week',
    'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80',
    true,
    false
  );

-- Note: Admin users should be created through the Supabase authentication system
-- and then their role updated to 'admin' in the profiles table