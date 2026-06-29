import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, FolderOpen, ChevronRight } from 'lucide-react';
// ИСПРАВЛЕНО: Импортируем нативный браузер для Capacitor
import { Browser } from '@capacitor/browser';
// ИСПРАВЛЕНО: Импортируем локальное изображение для оффлайн-режима
import equipmentHero from './assets/equipment-hero.jpg';

const categories = [
  {
    icon: BookOpen,
    title: 'Equipping Materials',
    description: 'Monthly 4-part deep dives into essential disciple-making topics.',
    items: [
      {
        title: 'Being a Servant',
        author: 'Ed Hatt',
        month: 'July 2026',
        link: 'https://drive.google.com/drive/folders/1tqM6YuIxe1RXm3CIGLHX14aM-meyW6qX?usp=sharing',
        description: 'Being, making, and multiplying disciples with you.'
      },

      {
        title: 'The Great Commission',
        author: 'Amir Kazikhozhaev',
        month: 'June 2026',
        link: 'https://drive.google.com/drive/folders/1CxZh8-A65Jo8q-8DSwhrul705Qw2OVHB?usp=sharing',
        description: 'Being, making, and multiplying disciples with you.'
      },

      {
        title: 'Elijah & Elisha',
        author: 'Adnan Daniel',
        month: 'May 2026',
        link: 'https://drive.google.com/drive/folders/15PaV-jGNWFkk5hnocCzhxJ9zoKQT4BUJ?usp=sharing',
        description: 'Being, making, and multiplying disciples with you.'
      }
    ],
  },
];

export default function Equipment({ onContactClick }) {
  const archiveLink = "https://drive.google.com/drive/folders/1T8iORexrcE-nK8FotdrZHgaBh4kXxULH?usp=sharing";

  // Хелпер-функция для безопасного нативного открытия документов
  const openExternalLink = async (url) => {
    try {
      await Browser.open({ url });
    } catch (error) {
      console.error("Could not open link inside Capacitor", error);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12 w-full box-border overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[280px] flex flex-col justify-center px-6 text-white box-border w-full">
        <div className="absolute inset-0 z-0">
          {/* ИСПРАВЛЕНО: Заменили внешнюю ссылку Unsplash на локальный файл ассетов */}
          <img 
            src={equipmentHero} 
            className="w-full h-full object-cover" 
            alt="Library" 
          />
          <div className="absolute inset-0 bg-[#101828]/85 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 w-full">
          <span className="text-[#F4B433] text-[10px] font-black uppercase tracking-[0.3em] mb-2.5 block">Resources</span>
          <h2 className="text-4xl font-serif font-bold mb-3 leading-tight">Equipping <br/>Materials</h2>
          <p className="text-gray-300 text-xs max-w-[220px] leading-relaxed opacity-80">
            Monthly studies to help you and your group grow together.
          </p>
        </div>
      </section>

      {/* Categories List */}
      <section className="px-6 -mt-8 relative z-20 space-y-4 w-full box-border">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="bg-white rounded-[32px] p-5 shadow-xl shadow-black/5 border border-gray-50 box-border w-full"
          >
            <div className="flex items-center gap-4 mb-3 w-full box-border">
              <div className="w-12 h-12 rounded-2xl bg-[#F4B433]/10 flex items-center justify-center shrink-0">
                <cat.icon className="w-6 h-6 text-[#F4B433]" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-[#101828] text-base leading-tight truncate">{cat.title}</h3>
                <p className="text-[9px] text-gray-400 mt-0.5 uppercase font-black tracking-wider">Latest Releases</p>
              </div>
            </div>
            
            <p className="text-gray-500 text-xs mb-5 leading-relaxed">{cat.description}</p>
            
            {/* Список курсов */}
            <div className="space-y-3 w-full box-border">
              {cat.items.map((item) => (
                /* ИСПРАВЛЕНО: Тег <a> заменен на интерактивную кнопку с onClick событием */
                <button 
                  key={item.title} 
                  type="button"
                  onClick={() => openExternalLink(item.link)}
                  className="block text-left p-4 rounded-2xl bg-gray-50 active:bg-gray-100 transition-all border border-transparent active:border-[#F4B433]/20 box-border w-full cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2 gap-2 w-full box-border">
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-black text-[#F4B433] uppercase tracking-tighter bg-[#F4B433]/10 px-2 py-0.5 rounded-md mb-2 inline-block">
                        {item.month}
                      </span>
                      <h4 className="text-sm font-black text-[#101828] leading-tight break-words">
                        {item.title}
                      </h4>
                      <p className="text-[10px] font-bold text-gray-400 mt-0.5 truncate">by {item.author}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-[#F4B433] shrink-0">
                      <ExternalLink size={14} />
                    </div>
                  </div>
                  
                  <p className="text-[11px] text-gray-400 leading-relaxed border-t border-gray-100 pt-2 mt-2 break-words">
                    {item.description}
                  </p>
                </button>
              ))}
            </div>

            {/* Кнопка Архива */}
            {/* ИСПРАВЛЕНО: Также переведена с <a> на нативный клик */}
            <button 
              type="button"
              onClick={() => openExternalLink(archiveLink)}
              className="mt-5 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border-2 border-dashed border-gray-100 text-gray-400 active:text-[#101828] active:border-[#F4B433] active:bg-gray-50 transition-all text-[11px] font-black uppercase tracking-widest box-border w-full text-center cursor-pointer"
            >
              <FolderOpen size={14} className="shrink-0" />
              <span className="truncate">View Full Archive</span>
              <ChevronRight size={14} className="shrink-0" />
            </button>
          </motion.div>
        ))}
      </section>

      {/* Custom Request CTA */}
      <section className="px-6 mt-8 w-full box-border">
        <div className="bg-[#101828] rounded-[36px] p-6 text-center relative overflow-hidden box-border w-full">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#F4B433]/10 rounded-full blur-2xl"></div>
          
          <h3 className="text-white font-serif text-lg font-bold mb-2 relative z-10">Want more?</h3>
          <p className="text-gray-400 text-xs mb-6 relative z-10 leading-relaxed max-w-xs mx-auto">
            We want to hear about your needs for disciple-making materials.
          </p>
          <button 
            onClick={onContactClick}
            className="w-full py-4 rounded-2xl bg-[#F4B433] text-[#101828] font-black text-xs flex items-center justify-center gap-2 active:scale-95 transition-all box-border"
          >
            <ExternalLink size={14} />
            TALK TO OUR TEAM
          </button>
        </div>
      </section>
    </div>
  );
}