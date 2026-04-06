import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare, Square, ChevronLeft, Loader2, CheckCircle, Info } from 'lucide-react';
import { toast, Toaster } from 'sonner';

const STAGES = ['Eutychus', 'Timothy', 'Titus', 'Silas', 'Paul'];
const TOTAL_STEPS = 9;

// --- УНИФИЦИРОВАННЫЕ КОМПОНЕНТЫ СТИЛЯ ---
const StyledInput = (props) => (
  <input 
    {...props} 
    className={`w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F4B433]/20 focus:border-[#F4B433] transition-all ${props.className || ''}`} 
  />
);

const PrimaryButton = ({ children, onClick, disabled, className }) => (
  <button 
    onClick={onClick} 
    disabled={disabled}
    className={`w-full py-4 rounded-2xl bg-[#F4B433] text-[#101828] font-black text-sm shadow-lg shadow-[#F4B433]/20 disabled:opacity-40 transition-all active:scale-95 ${className || ''}`}
  >
    {children}
  </button>
);

const emptyDisciple = () => ({ name: '', age: '', stage: '' });

export default function BecomeDisciple({ onBack }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: '', dob: '',
    email: '', countryCode: '+1', phone: '',
    country: '', city: '',
    church: '', pastor: '',
    stage: '', count: '',
    disciples: [],
    agreedToFaith: false,
    agreedToRole: false,
  });

  const next = () => setStep(s => s + 1);
  const back = () => step === 0 ? onBack() : setStep(s => s - 1);
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleCountChange = (count) => {
    const num = parseInt(count);
    const disciples = Array.from({ length: num }, (_, i) => form.disciples[i] || emptyDisciple());
    setForm(f => ({ ...f, count, disciples }));
    next();
  };

  const updateDisciple = (index, key, val) => {
    const newD = [...form.disciples];
    newD[index] = { ...newD[index], [key]: val };
    setForm(f => ({ ...f, disciples: newD }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyceWoQpS90vHxwtajK_L2Fza64P0W5qK7hopPnTCUmq9mBda7hHE3pPPbehcF4cO18/exec';
    try {
      await fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setDone(true);
    } catch {
      toast.error('Submission failed. Check connection.');
    } finally {
      setLoading(false);
    }
  };

  const progress = (step / (TOTAL_STEPS - 1)) * 100;

  // Данные для первого шага
  const stepsInstructions = [
    { title: "QUALIFY", text: "Are you at least 18 and do you claim Jesus as your Lord and Savior? If you answer YES to these questions, move on to Step 2" },
    { title: "LEARN", text: "Ask the Network 20 leader in your area to teach you all you need to know about the movement." },
    { title: "PRAY", text: "Ask God what six or fewer 18 to 29-year-old men He wants you to disciple." },
    { title: "REGISTER", text: "Join the movement for one year by clicking the below button and progressing through the registration steps." }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white px-6 text-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#F4B433]" />
        <p className="font-bold text-[#101828]">Sending Your Registration...</p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white px-8 text-center">
        <CheckCircle className="w-20 h-20 text-green-500" />
        <h2 className="text-3xl font-serif font-bold">Success!</h2>
        <p className="text-gray-500 text-sm">We will email you the details soon.</p>
        <PrimaryButton onClick={onBack}>BACK TO HOME</PrimaryButton>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Toaster position="top-center" />
      
      <div className="flex items-center px-6 py-5">
        <button onClick={back} className="p-2 -ml-2 text-[#101828]"><ChevronLeft size={24} /></button>
        <div className="flex-1 text-center pr-8">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Step {step + 1} of {TOTAL_STEPS}</span>
        </div>
      </div>

      <div className="h-1 bg-gray-100 w-full mb-8">
        <motion.div className="h-full bg-[#F4B433]" animate={{ width: `${progress}%` }} />
      </div>

      <div className="flex-1 px-6 pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* ШАГ 0: HOW IT WORKS */}
            {step === 0 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-3xl font-serif font-bold text-[#101828] leading-tight">How do men join the movement?</h1>
                  <p className="text-sm text-gray-400">Follow these simple steps to get started.</p>
                </div>
                
                <div className="space-y-3">
                    {stepsInstructions.map((item, idx) => (
                        <div key={idx} className="group p-5 bg-gray-50 rounded-[24px] border border-gray-100 transition-all hover:bg-white hover:shadow-md">
                            <span className="text-[#F4B433] text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">
                              Step {idx + 1}
                            </span>
                            <p className="text-[13px] leading-relaxed text-gray-600">
                                <span className="font-black text-[#101828] mr-1">{item.title}.</span> 
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="pt-2">
                  <PrimaryButton onClick={next}>I UNDERSTAND</PrimaryButton>
                </div>
              </div>
            )}

            {/* ШАГ 1: AGREEMENTS */}
            {step === 1 && (
              <div className="space-y-4">
                <h1 className="text-3xl font-serif font-bold text-[#101828] mb-6">Agreements</h1>
                {[
                    { k: 'agreedToFaith', t: 'I acknowledge Jesus as my Lord and Savior.' },
                    { k: 'agreedToRole', t: 'I understand what it means to be a Network 20 disciple-maker.' }
                ].map(item => (
                    <button key={item.k} onClick={() => set(item.k, !form[item.k])} className="w-full p-5 bg-gray-50 rounded-2xl flex gap-4 text-left border border-transparent">
                        {form[item.k] ? <CheckSquare className="text-[#F4B433]"/> : <Square className="text-gray-300"/>}
                        <span className="text-sm font-bold">{item.t}</span>
                    </button>
                ))}
                <PrimaryButton disabled={!form.agreedToFaith || !form.agreedToRole} onClick={next}>I AGREE</PrimaryButton>
              </div>
            )}

            {/* ШАГ 2: PERSONAL INFO */}
            {step === 2 && (
              <div className="space-y-6">
                <h1 className="text-3xl font-serif font-bold text-[#101828]">Personal Info</h1>
                <div className="space-y-4">
                    <StyledInput autoFocus placeholder="Full Name" value={form.name} onChange={e => set('name', e.target.value)} />
                    <StyledInput 
                        placeholder="Date of Birth (MM/DD/YYYY)" 
                        value={form.dob} 
                        onChange={e => {
                            const input = e.target.value;
                            if (input.length < form.dob.length) { set('dob', input); return; }
                            let v = input.replace(/\D/g, '');
                            let formatted = v;
                            if (v.length > 2) formatted = v.slice(0, 2) + '/' + v.slice(2);
                            if (v.length > 4) formatted = formatted.slice(0, 5) + '/' + v.slice(4, 8);
                            set('dob', formatted);
                        }}
                        maxLength={10} 
                    />
                </div>
                <PrimaryButton disabled={!form.name || form.dob.length < 10} onClick={next}>NEXT</PrimaryButton>
              </div>
            )}

            {/* ШАГ 3: CONTACT INFO */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-serif font-bold text-[#101828]">Contact Info</h1>
                    <p className="text-xs text-gray-400 font-medium">You can skip this or fill it in any format.</p>
                </div>
                <div className="space-y-4">
                    <StyledInput type="email" placeholder="Email Address (Optional)" value={form.email} onChange={e => set('email', e.target.value)} />
                    <div className="flex gap-2">
                        <StyledInput className="w-20 text-center" placeholder="+1" value={form.countryCode} onChange={e => set('countryCode', e.target.value)} />
                        <StyledInput className="flex-1" placeholder="Phone Number (Optional)" value={form.phone} onChange={e => set('phone', e.target.value)} />
                    </div>
                </div>
                <PrimaryButton onClick={next}>
                    {(!form.email && !form.phone) ? "SKIP FOR NOW" : "NEXT"}
                </PrimaryButton>
              </div>
            )}

            {/* ШАГ 4: LOCATION */}
            {step === 4 && (
              <div className="space-y-6">
                <h1 className="text-3xl font-serif font-bold text-[#101828]">Location</h1>
                <div className="space-y-4">
                    <StyledInput placeholder="Country" value={form.country} onChange={e => set('country', e.target.value)} />
                    <StyledInput placeholder="City" value={form.city} onChange={e => set('city', e.target.value)} />
                </div>
                <PrimaryButton disabled={!form.country || !form.city} onClick={next}>NEXT</PrimaryButton>
              </div>
            )}

            {/* ШАГ 5: CHURCH */}
            {step === 5 && (
              <div className="space-y-6">
                <h1 className="text-3xl font-serif font-bold text-[#101828]">Church</h1>
                <div className="space-y-4">
                    <StyledInput placeholder="Church Name" value={form.church} onChange={e => set('church', e.target.value)} />
                    <StyledInput placeholder="Pastor's Name" value={form.pastor} onChange={e => set('pastor', e.target.value)} />
                </div>
                <PrimaryButton disabled={!form.church || !form.pastor} onClick={next}>NEXT</PrimaryButton>
              </div>
            )}

            {/* ШАГ 6: YOUR STAGE */}
            {step === 6 && (
              <div className="space-y-4 pb-10">
                <h1 className="text-3xl font-serif font-bold text-[#101828]">Your Stage</h1>
                <div className="space-y-3">
                  {[...STAGES, 'Barnabas']
                    .filter(s => s !== 'Eutychus') 
                    .map(s => (
                    <button 
                      key={s} 
                      onClick={() => set('stage', s)} 
                      className={`w-full p-5 rounded-2xl font-bold border-2 transition-all text-left flex justify-between items-center ${
                        form.stage === s 
                        ? 'border-[#F4B433] bg-[#F4B433]/5 text-[#101828]' 
                        : 'border-gray-50 bg-gray-50 text-gray-400'
                      }`}
                    >
                      {s}
                      {form.stage === s && <div className="w-2 h-2 rounded-full bg-[#F4B433]" />}
                    </button>
                  ))}
                </div>
                <PrimaryButton disabled={!form.stage} onClick={next}>NEXT</PrimaryButton>

                <div className="mt-8 border-t border-gray-100 pt-6">
                  <h3 className="text-sm font-bold text-[#101828] mb-4 flex items-center gap-2">
                    <Info size={16} className="text-[#F4B433]" /> Not sure which stage to choose?
                  </h3>
                  <div className="space-y-3">
                    {STAGE_DETAILS.map((detail) => (
                      <details key={detail.title} className="group bg-gray-50 rounded-2xl overflow-hidden transition-all">
                        <summary className="list-none p-4 cursor-pointer flex justify-between items-center font-bold text-xs text-gray-600">
                          {detail.title}
                          <span className="text-[#F4B433] transition-transform group-open:rotate-180">↓</span>
                        </summary>
                        <div className="px-4 pb-4 text-[13px] leading-relaxed text-gray-500 space-y-3">
                          <p>{detail.desc}</p>
                          <p className="text-[11px] italic bg-white/50 p-2 rounded-lg border-l-2 border-[#F4B433]/30">{detail.history}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ШАГ 7: COUNT */}
            {step === 7 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h1 className="text-3xl font-serif font-bold text-[#101828] mb-2">How many disciples?</h1>
                  <p className="text-sm text-gray-400">Select the number of men in your group.</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <button 
                      key={n} 
                      type="button"
                      onClick={() => handleCountChange(String(n))} 
                      className={`py-8 rounded-3xl text-3xl font-serif font-bold transition-all border-2 ${
                        form.count === String(n) 
                        ? 'bg-[#F4B433] border-[#F4B433] text-[#101828] shadow-lg shadow-[#F4B433]/20' 
                        : 'bg-gray-50 border-transparent text-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <div className="pt-4">
                  <PrimaryButton disabled={!form.count} onClick={next}>NEXT</PrimaryButton>
                </div>
              </div>
            )}

            {/* ШАГ 8: DISCIPLE DETAILS */}
            {step === 8 && (
              <div className="pb-10">
                <div className="mb-6">
                  <h1 className="text-3xl font-serif font-bold text-[#101828]">Disciple Details</h1>
                  <p className="text-sm text-gray-400">Information for your {form.count} disciples.</p>
                </div>

                <div className="space-y-6 mb-8">
                    {form.disciples.map((d, i) => (
                        <div key={i} className="p-6 bg-gray-50 rounded-[32px] space-y-4 border border-gray-100">
                            <div className="flex justify-between items-center">
                              <p className="text-[10px] font-black text-[#F4B433] uppercase">Disciple #{i+1}</p>
                              {d.name && d.stage && d.age && <CheckCircle size={14} className="text-green-500" />}
                            </div>
                            
                            <StyledInput placeholder="Full Name" value={d.name} onChange={e => updateDisciple(i, 'name', e.target.value)} />
                            
                            <StyledInput 
                                type="number" 
                                min="1"
                                placeholder="Age" 
                                value={d.age} 
                                onKeyDown={(e) => ["-", "e", "E", "+", "."].includes(e.key) && e.preventDefault()}
                                onChange={e => {
                                    const val = e.target.value;
                                    if (val === '' || parseInt(val) > 0) {
                                        updateDisciple(i, 'age', val);
                                    }
                                }} 
                            />

                            <div className="space-y-2">
                              <p className="text-[10px] font-bold text-gray-400 uppercase ml-1">Select Stage</p>
                              <div className="flex flex-wrap gap-2">
                                  {STAGES.map(s => (
                                      <button 
                                        key={s} 
                                        onClick={() => {
                                          if (s === 'Paul' && form.stage !== 'Barnabas') {
                                            toast.error('Only a Barnabas can disciple a Paul.');
                                            return;
                                          }
                                          updateDisciple(i, 'stage', s);
                                        }} 
                                        className={`px-3 py-2 rounded-xl text-[10px] font-bold transition-all border ${
                                          d.stage === s 
                                          ? 'bg-[#F4B433] border-[#F4B433] text-[#101828]' 
                                          : 'bg-white border-gray-100 text-gray-400'
                                        }`}
                                      >
                                          {s}
                                      </button>
                                  ))}
                              </div>
                            </div>
                        </div>
                    ))}
                </div>

                <PrimaryButton 
                    disabled={form.disciples.length === 0 || form.disciples.some(d => !d.name || !d.age || !d.stage)} 
                    onClick={handleSubmit}
                >
                    COMPLETE REGISTRATION
                </PrimaryButton>

                <div className="mt-12 border-t border-gray-100 pt-8">
                  <h3 className="text-sm font-bold text-[#101828] mb-4 flex items-center gap-2">
                    <Info size={16} className="text-[#F4B433]" /> Not sure which stage to choose?
                  </h3>
                  <div className="space-y-3">
                    {STAGE_DETAILS.map((detail) => (
                      <details key={detail.title} className="group bg-gray-50 rounded-2xl overflow-hidden transition-all">
                        <summary className="list-none p-4 cursor-pointer flex justify-between items-center font-bold text-xs text-gray-600">
                          {detail.title}
                          <span className="text-[#F4B433] transition-transform group-open:rotate-180">↓</span>
                        </summary>
                        <div className="px-4 pb-4 text-[13px] leading-relaxed text-gray-500 space-y-3">
                          <p>{detail.desc}</p>
                          <p className="text-[11px] italic bg-white/50 p-2 rounded-lg border-l-2 border-[#F4B433]/30">{detail.history}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

const STAGE_DETAILS = [
  {
    title: "Stage 1: Eutychus (Discover)",
    desc: "A man in his 20s who does not yet know Jesus but is willing to explore. He hasn't committed yet, but he is listening and growing.",
    history: "From Acts 20: A young man raised from the dead by Paul after falling from a window during a late-night session."
  },
  {
    title: "Stage 2: Timothy (Learn and Belong)",
    desc: "A newly born disciple in his 20s. He is like a 'spiritual son', receiving encouragement to grow in faith and lead.",
    history: "From Acts 16: Mentored by Paul, Timothy had an excellent reputation and served as Paul’s representative."
  },
  {
    title: "Stage 3: Titus (Work for God)",
    desc: "A 20-year-old disciple who engages in church work as preparation for future leadership assignments.",
    history: "In 2 Corinthians: Paul refers to Titus as a fellow worker who passionately supported the early church."
  },
  {
    title: "Stage 4: Silas (Focus Inward)",
    desc: "A determined disciple in his 20s showing great potential. He partners with Paul and is preparing to disciple his own group.",
    history: "From Acts 16: Partnered with Paul in sharing the Gospel; they were miraculously released from prison together."
  },
  {
    title: "Stage 5: Paul (Focus Outward)",
    desc: "A leader in his 20s who disciples others. His group is centered on life-on-life disciple-making.",
    history: "The Apostle Paul transformed the early church, went on major missions, and wrote 13 New Testament books."
  },
  {
    title: "Stage 6: Barnabas (Live like Christ)",
    desc: "30 years or older. A mature disciple who acts as a father figure, discipling young men or mentoring 'Pauls'.",
    history: "In Acts: Barnabas mentored Paul, vouched for him, and was a spiritual father to him during missions."
  }
];