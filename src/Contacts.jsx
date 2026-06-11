import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { toast, Toaster } from 'sonner';

const contactInfo = [
  { icon: Mail, label: 'Email Us', value: 'info@n20i.org', detail: 'Response within 24h' },
  { icon: Phone, label: 'Call Us', value: '+1 (616) 260-7564', detail: 'Mon–Fri, 9am–5pm' },
  { icon: MapPin, label: 'Visit Us', value: '150 Wealthy SE Unit 356 Grand Rapids MI 49503', detail: 'By appointment only' },
];

const ContactInput = ({ label, ...props }) => (
  <div className="w-full box-border">
    <label className="text-[10px] font-black uppercase text-gray-400 mb-1.5 block ml-1">{label}</label>
    <input 
      {...props} 
      /* ИЗМЕНЕНО: вместо text-sm ставим text-base (16px) */
      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-[#F4B433]/20 focus:border-[#F4B433] transition-all box-border"
    />
  </div>
);

export default function Contacts() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const BOT_TOKEN = '8599268249:AAEbq6WJLqA0kjUoRxCwDumQG8R9Uk9C0aY';
    const CHAT_ID = '-5275746610';
    
    const text = `🚀 *New Contact Message*\n\n👤 *Name:* ${form.name}\n📧 *Email:* ${form.email}\n📌 *Subject:* ${form.subject}\n💬 *Message:* ${form.message}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
          parse_mode: 'Markdown',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        toast.success('Message sent! We will contact you soon.');
      } else {
        throw new Error('Telegram API error');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="min-h-[60vh] flex flex-col items-center justify-center px-8 text-center box-border w-full"
      >
        <div className="w-20 h-20 rounded-3xl bg-green-50 flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-3xl font-serif font-bold text-[#101828] mb-4">Message Sent!</h3>
        <p className="text-gray-500 text-sm">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-8 text-[#F4B433] font-bold text-sm uppercase tracking-widest active:scale-95 transition-transform"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 pb-12 w-full box-border overflow-x-hidden">
      <Toaster position="top-center" />
      
      {/* Hero Section */}
      <section className="relative h-[320px] flex flex-col justify-center items-center px-6 text-center text-white box-border w-full">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80" 
            className="w-full h-full object-cover" alt="Contact"
          />
          <div className="absolute inset-0 bg-[#101828]/85 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 w-full">
          <span className="text-[#F4B433] text-[10px] font-black uppercase tracking-[0.3em] mb-3 block">Reach Out</span>
          <h2 className="text-4xl font-serif font-bold mb-3">Contact Us</h2>
          <p className="text-gray-300 text-sm max-w-xs opacity-80 mx-auto">We are eager to hear from you and answer your questions.</p>
        </div>
      </section>

      {/* Contact Cards (Вертикальная сетка вместо ломающего скролла) */}
      <section className="px-6 -mt-10 relative z-20 flex flex-col gap-3 w-full box-border">
        {contactInfo.map((item) => (
          <div key={item.label} className="w-full bg-white p-5 rounded-[28px] shadow-xl shadow-black/5 border border-gray-50 box-border flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F4B433]/10 flex items-center justify-center shrink-0">
              <item.icon className="w-6 h-6 text-[#F4B433]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-black text-[9px] uppercase text-gray-400 mb-0.5">{item.label}</p>
              <p className="font-bold text-[#101828] text-sm mb-0.5 break-words whitespace-normal">{item.value}</p>
              <p className="text-[11px] text-gray-400">{item.detail}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Form Section */}
      <section className="px-6 mt-8 w-full box-border">
        <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm box-border w-full">
          <h3 className="text-xl font-serif font-bold text-[#101828] mb-6">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4 w-full box-border">
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
            <div className="w-full box-border">
              <label className="text-[10px] font-black uppercase text-gray-400 mb-1.5 block ml-1">Message</label>
              <textarea 
                rows={4}
                required
                placeholder="Write your message here..."
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                /* ИЗМЕНЕНО: здесь тоже ставим text-base (16px) */
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-[#F4B433]/20 focus:border-[#F4B433] transition-all resize-none box-border"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-[#101828] text-white font-bold text-sm flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all mt-2 disabled:opacity-50 box-border"
            >
              <Send size={18} className="text-[#F4B433]" />
              {loading ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}