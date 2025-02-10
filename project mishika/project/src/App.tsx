import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ConciergeService from './pages/ConciergeService';
import MemberArea from './pages/MemberArea';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import ChatBot from './components/ChatBot';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0A0A0A] text-white">
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
        <ChatBot />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/concierge" element={<ConciergeService />} />
          <Route path="/member" element={<MemberArea />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/insights" element={<BlogPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App