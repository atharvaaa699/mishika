import React, { useState } from 'react';
import { Mail, Phone, Instagram, Clock, MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email address' : '';
      case 'message':
        return value.length < 10 ? 'Message must be at least 10 characters' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      await emailjs.send(
        'service_xxxxxxx', // Replace with your EmailJS service ID
        'template_xxxxxxx', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'mishika.2025.02@gmail.com'
        },
        'your_public_key' // Replace with your EmailJS public key
      );

      // Send a backup email using mailto link
      const mailtoLink = `mailto:mishika.2025.02@gmail.com?subject=New Contact Form Submission&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AMessage: ${formData.message}`;
      window.location.href = mailtoLink;

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      setTouched({});
      setErrors({});
    } catch (error) {
      toast.error('Failed to send message. Please try again or use WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Get in Touch</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience unparalleled luxury service. Our team is available 24/7 to assist you with any inquiries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-black p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-serif mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <Phone className="h-6 w-6 text-[#C6A45C] mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <a href="tel:+919119727956" className="text-gray-400 hover:text-[#C6A45C] transition-colors">
                    +91 91197 27956
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <Mail className="h-6 w-6 text-[#C6A45C] mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a href="mailto:mishika.2025.02@gmail.com" className="text-gray-400 hover:text-[#C6A45C] transition-colors">
                    mishika.2025.02@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <MessageCircle className="h-6 w-6 text-[#C6A45C] mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <a 
                    href="https://wa.me/919119727956"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#C6A45C] transition-colors"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <Instagram className="h-6 w-6 text-[#C6A45C] mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold">Instagram</p>
                  <a 
                    href="https://instagram.com/mishikaluxe" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#C6A45C] transition-colors"
                  >
                    @mishikaluxe
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <Clock className="h-6 w-6 text-[#C6A45C] mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold">Hours</p>
                  <p className="text-gray-400">24/7 Availability</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-serif mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full bg-[#1A1A1A] border ${
                    errors.name ? 'border-red-500' : 'border-gray-800'
                  } rounded-md px-4 py-2 focus:outline-none focus:border-[#C6A45C] transition-colors`}
                />
                {touched.name && errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full bg-[#1A1A1A] border ${
                    errors.email ? 'border-red-500' : 'border-gray-800'
                  } rounded-md px-4 py-2 focus:outline-none focus:border-[#C6A45C] transition-colors`}
                />
                {touched.email && errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={4}
                  className={`w-full bg-[#1A1A1A] border ${
                    errors.message ? 'border-red-500' : 'border-gray-800'
                  } rounded-md px-4 py-2 focus:outline-none focus:border-[#C6A45C] transition-colors`}
                />
                {touched.message && errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || Object.keys(errors).length > 0}
                className="w-full bg-[#C6A45C] text-black py-3 rounded-md hover:bg-[#B59449] transition-colors disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;