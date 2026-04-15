import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, FolderOpen, ChevronRight } from 'lucide-react';

const categories = [
  {
    icon: BookOpen,
    title: 'Equipping Materials',
    description: 'Monthly 4-part deep dives into essential disciple-making topics.',
    items: [
      {
        title: 'Jesus Said "I Am"',
        author: 'Pastor Yepabo',
        month: 'April 2026',
        link: 'https://drive.google.com/drive/folders/1FScoDABXViRv5Vw30-b3xdEMosFak9AJ?usp=sharing', // Твоя ссылка здесь
        description: 'Being, making, and multiplying disciples with you.'
      },
      {
        title: 'Leadership God\'s Way',
        author: 'Aitbek Samatov',
        month: 'March 2026',
        link: 'https://drive.google.com/drive/folders/1t3nhKbcPqCO_FzKeDAtcw2gf1kqh0GYL?usp=sharing', // Твоя ссылка здесь
        description: 'Being, making, and multiplying disciples with you.'
      },
      {
        title: 'Integrity',
        author: 'Patrick Milazi ',
        month: 'February 2026',
        link: 'https://drive.google.com/drive/folders/15t8C9OIaZtalTBBPDDwRS8HivcMFM9Fj?usp=sharing', // Твоя ссылка здесь
        description: 'Being, making, and multiplying disciples with you.'
      }
    ],
  },
];

export default function Equipment({ onContactClick }) {
  // Ссылка на общую папку со всеми материалами
  const archiveLink = "https://drive.google.com/drive/folders/1T8iORexrcE-nK8FotdrZHgaBh4kXxULH?usp=sharing";

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
          <h2 className="text-4xl font-serif font-bold mb-4">Equipping <br/>Materials</h2>
          <p className="text-gray-300 text-xs max-w-[240px] leading-relaxed opacity-80">
            Monthly studies to help you and your group grow together.
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
                <p className="text-[10px] text-gray-400 mt-1 uppercase font-black tracking-wider">Latest Releases</p>
              </div>
            </div>
            
            <p className="text-gray-500 text-xs mb-6 leading-relaxed">{cat.description}</p>
            
            {/* Список курсов */}
            {/* Список курсов — исправлено для мобильных */}
              <div className="space-y-3">
                {cat.items.map((item) => (
                  <a 
                    key={item.title} 
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-2xl bg-gray-50 active:bg-gray-100 transition-all border border-transparent active:border-[#F4B433]/20"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 pr-4">
                        <span className="text-[9px] font-black text-[#F4B433] uppercase tracking-tighter bg-[#F4B433]/10 px-2 py-0.5 rounded-md mb-2 inline-block">
                          {item.month}
                        </span>
                        <h4 className="text-sm font-black text-[#101828] leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-[10px] font-bold text-gray-400 mt-0.5">by {item.author}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-[#F4B433] shrink-0">
                        <ExternalLink size={14} />
                      </div>
                    </div>
                    
                    {/* Описание теперь всегда видно, но оно очень аккуратное */}
                    <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2 border-t border-gray-100 pt-2 mt-2">
                      {item.description}
                    </p>
                  </a>
                ))}
              </div>

            {/* Кнопка Архива */}
            <a 
              href={archiveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-dashed border-gray-100 text-gray-400 hover:text-[#101828] hover:border-[#F4B433] hover:bg-gray-50 transition-all text-[11px] font-black uppercase tracking-widest"
            >
              <FolderOpen size={14} />
              View Full Archive
              <ChevronRight size={14} />
            </a>
          </motion.div>
        ))}
      </section>

      {/* Custom Request CTA */}
      <section className="px-6 mt-10">
        <div className="bg-[#101828] rounded-[40px] p-10 text-center relative overflow-hidden">
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