import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Download, ExternalLink } from 'lucide-react';

const categories = [
  {
    icon: BookOpen,
    title: 'Equipment Materials',
    description: 'Comprehensive guides for individual and group sessions.',
    items: ['Foundations of Faith', 'Gospel of John Deep Dive', 'Spiritual Disciplines'],
  },
];

export default function Equipment({ onContactClick }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {/* Hero Section */}
      <section className="relative h-[300px] flex flex-col justify-center px-8 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80" 
            className="w-full h-full object-cover" 
            alt="Library" 
          />
          <div className="absolute inset-0 bg-[#101828]/85 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10">
          <span className="text-[#F4B433] text-[10px] font-black uppercase tracking-[0.3em] mb-3 block">Resources</span>
          <h2 className="text-4xl font-serif font-bold mb-4">Equipment <br/>Materials</h2>
          <p className="text-gray-300 text-xs max-w-[240px] leading-relaxed opacity-80">
            Lessons to help you make disciples.
          </p>
        </div>
      </section>

      {/* Categories List */}
      <section className="px-6 -mt-8 relative z-20 space-y-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[32px] p-6 shadow-xl shadow-black/5 border border-gray-50"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F4B433]/10 flex items-center justify-center shrink-0">
                <cat.icon className="w-6 h-6 text-[#F4B433]" />
              </div>
              <div>
                <h3 className="font-bold text-[#101828] text-lg leading-none">{cat.title}</h3>
                <p className="text-[10px] text-gray-400 mt-1 uppercase font-black tracking-wider">Category</p>
              </div>
            </div>
            
            <p className="text-gray-500 text-xs mb-5 leading-relaxed">{cat.description}</p>
            
            <div className="space-y-2">
              {cat.items.map((item) => (
                <div 
                  key={item} 
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                >
                  <span className="text-xs font-bold text-[#101828]">{item}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-gray-300 uppercase opacity-0 group-hover:opacity-100 transition-opacity">PDF</span>
                    <Download size={14} className="text-[#F4B433]" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </section>

      {/* Custom Request CTA */}
      <section className="px-6 mt-10">
        <div className="bg-[#101828] rounded-[40px] p-10 text-center relative overflow-hidden">
          {/* Декоративный круг */}
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#F4B433]/10 rounded-full blur-2xl"></div>
          
          <h3 className="text-white font-serif text-xl font-bold mb-3 relative z-10">Want more?</h3>
          <p className="text-gray-400 text-xs mb-8 relative z-10 leading-relaxed">
            We want to hear about your needs for disciple-making materials.
          </p>
          <button 
            onClick={onContactClick}
            className="w-full py-4 rounded-2xl bg-[#F4B433] text-[#101828] font-black text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <ExternalLink size={14} />
            TALK TO OUR TEAM
          </button>
        </div>
      </section>
    </div>
  );
}