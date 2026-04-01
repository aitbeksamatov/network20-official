import React, { useState } from 'react';
// Не забудьте импортировать ваше лого, если оно лежит в assets:
import myLogo from './assets/my-logo.jpg';
// Если логотипа нет, мы заменим его временной иконкой.
import { Plus, Home, Info, UserPlus, BookOpen, Mail, Globe, Heart, ChevronRight, CheckCircle, Search } from 'lucide-react';
import BecomeDisciple from './BecomeDisciple';
import Contacts from './Contacts';
import Equipment from './Equipment';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl relative pb-24 overflow-x-hidden font-sans select-none">
      
      {/* --- HEADER --- */}
    {/* --- HEADER --- */}
      <header className="flex items-center px-6 py-5 bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="mr-3 shrink-0">
          <img 
            src={myLogo} 
            alt="Network 20 Logo" 
            className="w-10 h-10 rounded-xl object-cover shadow-sm" 
            onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }} // Резервный вариант, если путь неверный
          />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-[#101828]">
          Network 20 <span className="text-[#F4B433]">International</span>
        </h1>
      </header>

      {/* --- CONTENT ROUTING --- */}
      <main>
        {activeTab === 'home' && <HomeView onStart={() => setActiveTab('register')} />}
        {activeTab === 'about' && <AboutView />}
        {activeTab === 'register' && <BecomeDisciple onBack={() => setActiveTab('home')} />}
        {activeTab === 'materials' && <Equipment onContactClick={() => setActiveTab('contact')} />}
        {activeTab === 'contact' && <Contacts />}
      </main>

      {/* --- NAVIGATION --- */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-xl border-t border-gray-100 px-8 py-4 flex justify-between items-center z-[100] rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <NavItem icon={<Home size={22}/>} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <NavItem icon={<Info size={22}/>} label="About" active={activeTab === 'about'} onClick={() => setActiveTab('about')} />
        <NavItem icon={<UserPlus size={22}/>} label="Disciple" active={activeTab === 'register'} onClick={() => setActiveTab('register')} />
        <NavItem icon={<BookOpen size={22}/>} label="Library" active={activeTab === 'materials'} onClick={() => setActiveTab('materials')} />
        <NavItem icon={<Mail size={22}/>} label="Contact" active={activeTab === 'contact'} onClick={() => setActiveTab('contact')} />
      </nav>
    </div>
  );
};

const HomeView = ({ onStart }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
    {/* HERO SECTION - ИСПРАВЛЕНО РАСПОЛОЖЕНИЕ */}
    <section className="relative h-[650px] flex flex-col justify-between px-8 pt-10 pb-12 text-white overflow-hidden rounded-b-[48px]">
      <div className="absolute inset-0 z-0">
        <img src="./my-hero.jpg" className="w-full h-full object-cover object-top bg-[#101828]" alt="Hero" />
        {/* Затемнение теперь идет и сверху (для бейджа) и снизу (для кнопки) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#101828]/90 via-transparent to-[#101828]/95"></div>
      </div>
      
      {/* ВЕРХНЯЯ ЧАСТЬ - ПРИЖАТА К САМОМУ ВЕРХУ */}
      <div className="relative z-10 pt-70 space-y-4">
        
        {/* Заголовок поднят выше и немного уменьшен, чтобы освободить лицо */}
        <h2 className="text-[38px] leading-[1.0] font-serif font-bold italic">
          Men Discipling <br /> 
          <span className="text-[#F4B433] not-italic">Young Men</span>
        </h2>
      </div>

      {/* НИЖНЯЯ ЧАСТЬ - КНОПКА ОСТАЕТСЯ ВНИЗУ */}
      <div className="relative z-10 w-full pt-10">
        <button onClick={onStart} className="w-full bg-[#F4B433] text-[#101828] font-black py-4 rounded-2xl text-sm shadow-xl shadow-[#F4B433]/30 active:scale-95 transition-all uppercase tracking-widest">
          BECOME A DISCIPLE-MAKER
        </button>
      </div>
    </section>

    {/* NEW SLOGAN SECTION */}
    <section className="px-8 py-16 space-y-8 bg-white">
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-3 text-[#F4B433] font-serif italic text-xl">
          <span>Be</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
          <span>Make</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
          <span>Multiply</span>
        </div>
        
        <h3 className="text-2xl font-serif font-bold text-[#101828] text-center px-4 leading-tight">
          Fully Committed <br /> Disciples of Jesus
        </h3>
        
        <div className="w-12 h-1 bg-[#F4B433] mx-auto rounded-full" />
      </div>

      <div className="relative bg-gray-50 p-8 rounded-[40px] border border-gray-100">
        <p className="text-gray-600 text-[15px] leading-relaxed text-center font-medium">
          We believe that we who claim Jesus as Lord and Savior are His disciples. 
          <span className="block text-[#101828] font-bold mt-1">
            That is our identity.
          </span>
        </p>
        
        <div className="mt-6 pt-6 border-t border-gray-200/60">
          <p className="text-gray-500 text-[14px] leading-relaxed text-center italic">
            To be a fully committed disciple of Jesus is to flourish in our relationships with God as we 
            <span className="text-[#F4B433] font-bold not-italic px-1">Know, Love, Listen, & Obey</span> 
            the Father, Jesus, and Holy Spirit.
          </p>
        </div>
      </div>
    </section>

    {/* STATS SECTION */}
    <section className="px-6 py-12 text-center grid grid-cols-2 gap-4 bg-gray-50/50 rounded-t-[48px]">
      <StatCard icon={<UserPlus className="text-[#F4B433]"/>} num="2,500+" label="DISCIPLE-MAKERS" />
      <StatCard icon={<Globe className="text-[#F4B433]"/>} num="65" label="Countries" />
      <div className="col-span-2">
        <StatCard icon={<Heart className="text-[#F4B433]"/>} num="10,600+" label="Total Disciples" />
      </div>
    </section>
  </div>
);

const AboutView = () => {
  const openFAQ = () => {
    window.open('https://drive.google.com/file/d/1WcktR_kZ18wqkMFTthNIS59H1nMYPKUX/view?usp=drive_link', '_blank');
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      <section className="relative h-[300px] flex flex-col justify-center items-center px-8 text-center text-white overflow-hidden rounded-b-[40px]">
        <img src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=800&q=80" className="absolute inset-0 w-full h-full object-cover" alt="About" />
        <div className="absolute inset-0 bg-[#101828]/80 backdrop-blur-[2px]"></div>
        <div className="relative space-y-2">
          <span className="text-[#F4B433] font-black tracking-[0.2em] text-[10px] uppercase">Since 2014</span>
          <h2 className="text-5xl font-serif font-bold tracking-tight">About Us</h2>
        </div>
      </section>

      <div className="px-6 -mt-10 relative z-10 space-y-6">
        <button onClick={openFAQ} className="w-full bg-white border border-gray-100 shadow-xl shadow-black/5 p-5 rounded-[28px] flex items-center gap-4 active:scale-95 transition-transform text-left">
          <div className="w-12 h-12 bg-[#F4B433] rounded-2xl flex items-center justify-center text-[#101828]">
            <Info size={24} />
          </div>
          <div className="flex-1">
            <h4 className="font-black text-[#101828] text-sm uppercase tracking-tight">Network 20 FAQ</h4>
            <p className="text-gray-400 text-[11px] font-medium">View & Download Document</p>
          </div>
          <ChevronRight size={20} className="text-[#F4B433]" />
        </button>

        <div className="grid gap-4">
          <div className="bg-[#101828] p-8 rounded-[32px] text-white space-y-3">
            <div className="flex items-center gap-3 text-[#F4B433]">
              <div className="w-8 h-8 rounded-full bg-[#F4B433]/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#F4B433]" />
              </div>
              <span className="font-black uppercase text-[10px] tracking-widest">Our Vision</span>
            </div>
            <p className="text-lg font-serif leading-relaxed">To see young men around the world be fully committed disciples of Jesus.</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100 space-y-3">
            <div className="flex items-center gap-3 text-[#101828]">
              <div className="w-8 h-8 rounded-full bg-[#101828]/5 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#101828]" />
              </div>
              <span className="font-black uppercase text-[10px] tracking-widest">Our Mission</span>
            </div>
            <p className="text-lg font-serif text-gray-700 leading-relaxed">To serve men as they disciple young men to flourish in their relationship with God.</p>
          </div>
        </div>

        <div className="pt-6 space-y-6 text-center">
          <h3 className="font-black text-[#101828] tracking-[0.3em] text-xs uppercase">Core Values</h3>
          <div className="space-y-4 text-left">
            {[
              { t: "Loving God", d: "Our highest purpose is to love and glorify God—Father, Son, and Holy Spirit." },
              { t: "The Authority of Scripture", d: "The Bible is our ultimate guide for truth and life. It must be learned, lived, and shared." },
              { t: "Making Disciples", d: "We are called to help others grow into the character of Christ through teaching and example." },
              { t: "Whole-Person Transformation", d: "True growth involves the whole person—body, soul, and spirit." },
              { t: "Global Community", d: "God’s family is diverse and global. We pursue relationships that reflect His universal Kingdom." }
            ].map((v, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#F4B433] shrink-0" />
                <div className="space-y-1">
                  <h5 className="font-bold text-[#101828] text-sm">{v.t}</h5>
                  <p className="text-gray-500 text-xs leading-relaxed">{v.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#F4B433] p-8 rounded-[40px] space-y-6">
          <h3 className="font-black text-[#101828] tracking-[0.3em] text-xs uppercase text-center">Why We Exist</h3>
          <div className="space-y-5">
            {[
              "Maximize Impact",
              "Realize Purpose",
              "Influence Globally",
              "Impact Decisions",
              "Reveal the Trinity"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/30">
                <CheckCircle size={18} className="text-[#101828]" />
                <span className="text-sm font-bold text-[#101828]">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-10 text-center space-y-6">
          <h3 className="font-black text-[#101828] tracking-[0.3em] text-xs uppercase">Statement of Faith</h3>
          <div className="space-y-6 text-gray-500 text-sm italic font-serif px-4 leading-relaxed text-center">
            <p>"We believe in one God—Father, Son, and Holy Spirit."</p>
            <p>"God the Father is the Creator and sovereign Lord."</p>
            <p>"Jesus Christ died for our sins and rose again."</p>
            <p>"The Holy Spirit is the living presence of God."</p>
          </div>
        </div>

        <div className="mt-12 bg-[#F4B433]/10 p-8 rounded-[32px] border-2 border-dashed border-[#F4B433]/30 text-center">
            <p className="text-[#101828] font-serif font-bold text-lg mb-2">"Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit"</p>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Matthew 28:19</span>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, num, label }) => (
  <div className="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center flex-1">
    <div className="bg-[#F4B433]/10 p-4 rounded-2xl mb-4">{icon}</div>
    <span className="text-2xl font-bold text-[#101828]">{num}</span>
    <span className="text-[10px] text-gray-400 font-bold uppercase mt-1">{label}</span>
  </div>
);

const NavItem = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-[#F4B433]' : 'text-gray-300'}`}>
    <div className={`transition-transform duration-300 ${active ? 'scale-125 -translate-y-1' : ''}`}>{icon}</div>
    <span className={`text-[9px] font-black uppercase tracking-tighter ${active ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>{label}</span>
  </button>
);

export default App;