import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ConciergeService from './pages/ConciergeService';
import MemberArea from './pages/MemberArea';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import AdminDashboard from './pages/AdminDashboard';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import WhatsAppButton from './components/WhatsAppButton';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen bg-[#0A0A0A] pt-24 flex items-center justify-center">
      <div className="animate-pulse text-[#C6A45C]">Loading...</div>
    </div>;
  }
  
  if (!user) {
    return <Navigate to="/member" replace />;
  }
  
  return <>{children}</>;
};

// Admin route component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen bg-[#0A0A0A] pt-24 flex items-center justify-center">
      <div className="animate-pulse text-[#C6A45C]">Loading...</div>
    </div>;
  }
  
  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function AppContent() {
  const [bgPosition, setBgPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setBgPosition(window.scrollY * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="min-h-screen bg-[#0A0A0A] text-white relative perspective-1000"
      style={{
        background: `linear-gradient(${bgPosition}deg, #0A0A0A, #1A1A1A, #0A0A0A)`,
        transition: 'background 0.3s ease'
      }}
    >
      <LoadingScreen />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <Navbar />
      <ScrollToTop />
      <WhatsAppButton />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/concierge" element={<ConciergeService />} />
        <Route path="/member" element={<MemberArea />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/insights" element={<BlogPage />} />
        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;