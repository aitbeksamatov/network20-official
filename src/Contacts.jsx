import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { toast, Toaster } from 'sonner';

const contactInfo = [
  { icon: Mail, label: 'Email Us', value: 'garywybenga@n20i.org', detail: 'Response within 24h' },
  { icon: Phone, label: 'Call Us', value: '+1 (616) 260-7564', detail: 'Mon–Fri, 9am–5pm' },
  { icon: MapPin, label: 'Visit Us', value: '150 Wealthy Street SE', detail: 'By appointment only' },
];

// Вспомогательные компоненты (вне основного, чтобы не терять фокус)
const ContactInput = ({ label, ...props }) => (
  <div className="w-full">
    <label className="text-[10px] font-black uppercase text-gray-400 mb-1.5 block ml-1">{label}</label>
    <input 
      {...props} 
      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F4B433]/20 focus:border-[#F4B433] transition-all"
    />
  </div>
);

export default function Contacts() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Message sent! We will contact you soon.');
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="min-h-[60vh] flex flex-col items-center justify-center px-8 text-center"
      >
        <div className="w-20 h-20 rounded-3xl bg-green-50 flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-3xl font-serif font-bold text-[#101828] mb-4">Message Sent!</h3>
        <p className="text-gray-500 text-sm">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-8 text-[#F4B433] font-bold text-sm uppercase tracking-widest"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <Toaster position="top-center" />
      
      {/* Hero Section */}
      <section className="relative h-[350px] flex flex-col justify-center items-center px-8 text-center text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80" 
            className="w-full h-full object-cover" alt="Contact"
          />
          <div className="absolute inset-0 bg-[#101828]/85 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10">
          <span className="text-[#F4B433] text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Reach Out</span>
          <h2 className="text-5xl font-serif font-bold mb-4">Contact Us</h2>
          <p className="text-gray-300 text-sm max-w-xs opacity-80">We are here to support your journey and answer any questions.</p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="px-6 -mt-10 relative z-20 overflow-x-auto flex gap-4 pb-4 no-scrollbar">
        {contactInfo.map((item) => (
          <div key={item.label} className="min-w-[240px] bg-white p-6 rounded-[32px] shadow-xl shadow-black/5 border border-gray-50">
            <div className="w-12 h-12 rounded-2xl bg-[#F4B433]/10 flex items-center justify-center mb-4">
              <item.icon className="w-6 h-6 text-[#F4B433]" />
            </div>
            <p className="font-black text-[10px] uppercase text-gray-400 mb-1">{item.label}</p>
            <p className="font-bold text-[#101828] text-sm mb-1">{item.value}</p>
            <p className="text-[11px] text-gray-400">{item.detail}</p>
          </div>
        ))}
      </section>

      {/* Form Section */}
      <section className="px-6 mt-12">
        <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
          <h3 className="text-2xl font-serif font-bold text-[#101828] mb-8">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <ContactInput 
              label="Full Name" 
              placeholder="Enter your name"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              required
            />
            <ContactInput 
              label="Email Address" 
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              required
            />
            <ContactInput 
              label="Subject" 
              placeholder="How can we help?"
              value={form.subject}
              onChange={e => setForm({...form, subject: e.target.value})}
              required
            />
            <div className="w-full">
              <label className="text-[10px] font-black uppercase text-gray-400 mb-1.5 block ml-1">Message</label>
              <textarea 
                rows={4}
                required
                placeholder="Write your message here..."
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F4B433]/20 focus:border-[#F4B433] transition-all resize-none"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-5 rounded-2xl bg-[#101828] text-white font-bold text-sm flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all mt-4"
            >
              <Send size={18} className="text-[#F4B433]" />
              SEND MESSAGE
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}