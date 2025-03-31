# Mishika Luxe Backend

This repository contains the backend implementation for Mishika Luxe, a luxury services platform offering private jets, yachts, and exclusive concierge services.

## Tech Stack

- **Frontend**: React with TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Payment Processing**: Stripe
- **Email Service**: EmailJS

## Features

- **User Authentication & Role Management**
  - Email/password authentication
  - Role-based access control (Admin, VIP, Regular users)
  - User profiles with membership tiers

- **Service Booking & Order Management**
  - Browse luxury services
  - Book services with date selection
  - Real-time availability checking
  - Special requests handling

- **Payment Processing**
  - Secure payment with Stripe
  - Payment status tracking
  - Receipt generation

- **Admin Dashboard**
  - Manage users, bookings, and services
  - View analytics and reports
  - Process booking requests

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your credentials:
   ```
   cp .env.example .env
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Supabase Setup

1. Create a new Supabase project
2. Connect to Supabase using the "Connect to Supabase" button in the StackBlitz interface
3. Run the migrations in the `supabase/migrations` folder to set up the database schema
4. Update your `.env` file with the Supabase URL and anon key

## Deployment

The application can be deployed to Netlify or any other static hosting service. The backend is fully managed by Supabase.

## Security

- Row Level Security (RLS) is implemented for all database tables
- Authentication is handled securely by Supabase
- Sensitive operations are protected by role-based policies

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.