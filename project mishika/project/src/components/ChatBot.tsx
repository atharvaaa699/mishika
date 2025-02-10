import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919119727956?text=Hello,%20I'm%20interested%20in%20LUXE's%20services"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-6 bottom-24 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 bottom-6 z-50 bg-[#C6A45C] hover:bg-[#B59449] text-black p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-black rounded-lg shadow-luxury z-50 overflow-hidden">
          <div className="bg-[#1A1A1A] p-4 flex justify-between items-center">
            <div>
              <h3 className="font-serif text-lg">LUXE Assistant</h3>
              <p className="text-sm text-gray-400">Online | Typically replies instantly</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4">
            <div className="mb-4">
              <div className="bg-[#1A1A1A] rounded-lg p-3 max-w-[80%]">
                <p>Welcome to LUXE! How may I assist you today?</p>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-800">
            <form className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 input-field"
              />
              <button
                type="submit"
                className="btn-primary py-2"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;