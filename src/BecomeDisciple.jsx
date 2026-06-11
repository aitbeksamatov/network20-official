import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare, Square, ChevronLeft, Loader2, CheckCircle, BookOpen } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { Browser } from '@capacitor/browser';

const STAGES = ['Eutychus', 'Timothy', 'Titus', 'Silas', 'Paul'];
const TOTAL_STEPS = 10;

// --- УНИФИЦИРОВАННЫЕ КОМПОНЕНТЫ СТИЛЯ ---
const StyledInput = (props) => (
  <input 
    {...props} 
    className={`w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#F4B433]/20 focus:border-[#F4B433] transition-all box-border ${props.className || ''}`} 
  />
);

const PrimaryButton = ({ children, onClick, disabled, className }) => (
  <button 
    type="button"
    onClick={onClick} 
    disabled={disabled}
    className={`w-full py-4 rounded-2xl bg-[#F4B433] text-[#101828] font-black text-sm shadow-lg shadow-[#F4B433]/20 disabled:opacity-40 transition-all active:scale-95 ${className || ''}`}
  >
    {children}
  </button>
);

const emptyDisciple = () => ({ firstName: '', lastName: '', age: '', stage: '' });

export default function BecomeDisciple({ onBack }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', dob: '',
    email: '', phone: '',
    country: '', city: '',
    church: '', pastor: '',
    stage: '', count: '',
    disciples: [],
    agreedToFaithDoc: false,
    agreedToCommittment: false,
    agreedToLord: false,
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
    const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbx1PEUzfOxy5NLmn2G5b-23LSbB1Al1SgyXNzK2dj9WOfX3kVAET22RiesdJ_7x0BnmlQ/exec';
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

  const stepsInstructions = [
    { title: "QUALIFY", text: "You are at least 18 and do you claim Jesus as your Lord and Savior." },
    { title: "LEARN", text: "Ask the Network 20 leader in your area to teach you all you need to know about the movement." },
    { title: "PRAY", text: "Ask God what six or fewer 18 to 29-year-old men He wants you to disciple." },
    { title: "REGISTER", text: "Join the movement for one year by clicking the below button and progressing through the registration steps." }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white px-6 text-center box-border w-full">
        <Loader2 className="w-12 h-12 animate-spin text-[#F4B433]" />
        <p className="font-bold text-[#101828]">Sending Your Registration...</p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white px-6 text-center box-border w-full">
        <CheckCircle className="w-20 h-20 text-green-500" />
        <h2 className="text-3xl font-serif font-bold">Success!</h2>
        <p className="text-gray-500 text-sm">We will email you the details soon.</p>
        <PrimaryButton onClick={onBack}>BACK TO HOME</PrimaryButton>
      </div>
    );
  }

  return (
    <div className="w-full bg-white flex flex-col box-border overflow-x-hidden">
      <Toaster position="top-center" />
      
      <div className="flex items-center px-6 py-4 w-full box-border">
        <button onClick={back} className="p-2 -ml-2 text-[#101828] active:scale-95 transition-transform"><ChevronLeft size={24} /></button>
        <div className="flex-1 text-center pr-8">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Step {step + 1} of {TOTAL_STEPS}</span>
        </div>
      </div>

      <div className="h-1 bg-gray-100 w-full mb-6">
        <motion.div className="h-full bg-[#F4B433]" animate={{ width: `${progress}%` }} />
      </div>

      <div className="flex-1 px-6 pb-10 w-full box-border overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-full box-border"
          >
            {/* ШАГ 0: HOW IT WORKS */}
            {step === 0 && (
              <div className="space-y-6 w-full box-border">
                <div className="space-y-2">
                  <h1 className="text-2xl font-serif font-bold text-[#101828] leading-tight">How do men join the Network 20 movement?</h1>
                  <p className="text-sm text-gray-400">Follow these simple steps to get started.</p>
                </div>
                <div className="space-y-3 w-full box-border">
                    {stepsInstructions.map((item, idx) => (
                        <div key={idx} className="p-5 bg-gray-50 rounded-[24px] border border-gray-100 box-border w-full">
                            <span className="text-[#F4B433] text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">Step {idx + 1}</span>
                            <p className="text-[13px] leading-relaxed text-gray-600">
                                <span className="font-black text-[#101828] mr-1">{item.title}.</span> {item.text}
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
              <div className="space-y-4 w-full box-border">
                <div className="mb-4">
                  <h1 className="text-xl font-black text-[#101828] uppercase tracking-tight">Network 20 Statement of Faith</h1>
                  <button 
                    type="button"
                    onClick={async () => {
                      try {
                        await Browser.open({ url: 'https://drive.google.com/file/d/1TEBct4VOFgGx9ZHDdv6G3KI8HyehNH0l/view?usp=sharing' });
                      } catch (error) {
                        toast.error('Could not open the document.');
                      }
                    }}
                    className="flex items-center gap-2 text-[#F4B433] font-bold mt-2 hover:underline text-sm bg-transparent border-none p-0 cursor-pointer focus:outline-none"
                  >
                    <BookOpen size={18} /> View Document
                  </button>
                </div>

                <div className="space-y-3 w-full box-border">
                  {[
                      { k: 'agreedToFaithDoc', t: 'I read, understand, and agree with Network 20’s Statement of Faith.' },
                      { k: 'agreedToCommittment', t: 'I am committed to being an excellent disciple-maker of young men.' },
                      { k: 'agreedToLord', t: 'Jesus is my Lord and Savior.' }
                  ].map(item => (
                      /* ИСПРАВЛЕНО: Добавлен явный type="button" для предотвращения неявного сабмита */
                      <button type="button" key={item.k} onClick={() => set(item.k, !form[item.k])} className="w-full p-4 bg-gray-50 rounded-2xl flex gap-4 text-left border border-transparent active:scale-[0.99] transition-all box-border items-start">
                          <div className="mt-0.5 shrink-0">
                            {form[item.k] ? <CheckSquare className="text-[#F4B433]"/> : <Square className="text-gray-300"/>}
                          </div>
                          <span className="text-sm font-bold text-gray-700 leading-tight">{item.t}</span>
                      </button>
                  ))}
                </div>
                
                <div className="pt-4">
                  <PrimaryButton 
                    disabled={!form.agreedToFaithDoc || !form.agreedToCommittment || !form.agreedToLord} 
                    onClick={next}
                  >
                    I AGREE
                  </PrimaryButton>
                </div>
              </div>
            )}

            {/* ШАГ 2: PERSONAL INFO */}
            {step === 2 && (
              <div className="space-y-6 w-full box-border">
                <h1 className="text-2xl font-serif font-bold text-[#101828]">Personal Info</h1>
                <div className="space-y-4 w-full box-border">
                    <StyledInput 
                      autoFocus 
                      placeholder="First Name" 
                      value={form.firstName} 
                      onChange={e => set('firstName', e.target.value)} 
                    />
                    <StyledInput 
                      placeholder="Last Name" 
                      value={form.lastName} 
                      onChange={e => set('lastName', e.target.value)} 
                    />
                    <StyledInput 
                        placeholder="Age" 
                        type="text"
                        inputMode="numeric" 
                        value={form.dob} 
                        onChange={e => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value) && value.length <= 3) {
                                set('dob', value);
                            }
                        }}
                    />
                </div>
                <PrimaryButton 
                  disabled={!form.firstName || !form.lastName || !form.dob} 
                  onClick={next}
                >
                  NEXT
                </PrimaryButton>
              </div>
            )}

            {/* ШАГ 3: CONTACT INFO */}
            {step === 3 && (
              <div className="space-y-6 w-full box-border">
                <div className="space-y-2">
                    <h1 className="text-2xl font-serif font-bold text-[#101828]">Contact Info</h1>
                    <p className="text-xs text-gray-400 font-medium">You can skip this or fill it in any format.</p>
                </div>
                <div className="space-y-4 w-full box-border">
                    <StyledInput 
                      type="email" 
                      placeholder="Email Address (Optional)" 
                      value={form.email} 
                      onChange={e => set('email', e.target.value)} 
                    />
                    <StyledInput 
                      type="tel" 
                      placeholder="Phone Number (Optional)" 
                      value={form.phone} 
                      onChange={e => {
                        const val = e.target.value;
                        const filteredVal = val.replace(/[^\d+]/g, '');
                        set('phone', filteredVal);
                      }} 
                    />
                </div>
                <PrimaryButton onClick={next}>
                    {(!form.email && !form.phone) ? "SKIP FOR NOW" : "NEXT"}
                </PrimaryButton>
              </div>
            )}

            {/* ШАГ 4: LOCATION */}
            {step === 4 && (
              <div className="space-y-6 w-full box-border">
                <h1 className="text-2xl font-serif font-bold text-[#101828]">Location</h1>
                <div className="space-y-4 w-full box-border">
                    <StyledInput placeholder="Country" value={form.country} onChange={e => set('country', e.target.value)} />
                    <StyledInput placeholder="City" value={form.city} onChange={e => set('city', e.target.value)} />
                </div>
                <PrimaryButton disabled={!form.country || !form.city} onClick={next}>NEXT</PrimaryButton>
              </div>
            )}

            {/* ШАГ 5: CHURCH */}
            {step === 5 && (
              <div className="space-y-6 w-full box-border">
                <h1 className="text-2xl font-serif font-bold text-[#101828]">Church</h1>
                <div className="space-y-4 w-full box-border">
                    <StyledInput placeholder="Church Name" value={form.church} onChange={e => set('church', e.target.value)} />
                    <StyledInput placeholder="Pastor's Name" value={form.pastor} onChange={e => set('pastor', e.target.value)} />
                </div>
                <PrimaryButton disabled={!form.church || !form.pastor} onClick={next}>NEXT</PrimaryButton>
              </div>
            )}

            {/* ШАГ 6: STAGES INFO */}
            {step === 6 && (
              <div className="space-y-6 w-full box-border">
                <div className="space-y-3">
                  <div className="p-3 bg-[#F4B433]/10 w-fit rounded-xl">
                    <BookOpen className="text-[#F4B433]" size={24} />
                  </div>
                  <h1 className="text-2xl font-serif font-bold text-[#101828] leading-tight">Understanding Stages of Faith</h1>
                  <p className="text-[14px] leading-relaxed text-gray-600">
                    Network 20 disciple-makers use <span className="text-[#101828] font-bold">“stages of faith”</span> labels to measure discipleship effectiveness. The disciple-makers encourage their guys to advance through the stages. 
                  </p>
                  <p className="text-[14px] leading-relaxed text-gray-600">
                    Network 20 has assigned Biblical character names to the stages of faith. The characters are associated with Paul.
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h3 className="text-xs font-black text-[#101828] mb-3 uppercase tracking-wider">
                    Following are the characters:
                  </h3>
                  {/* ИСПРАВЛЕНО: Добавлен layout для плавной анимации раздвижения аккордеона */}
                  <motion.div layout className="space-y-3 w-full box-border">
                    {STAGE_DETAILS.map((detail) => (
                      <details key={`step6-${detail.title}`} className="group bg-gray-50 rounded-2xl overflow-hidden transition-all border border-gray-100/50">
                        <summary className="list-none p-4 cursor-pointer flex justify-between items-center font-bold text-xs text-gray-600 select-none">
                          <span className="pr-2">{detail.title}</span>
                          <span className="text-[#F4B433] transition-transform group-open:rotate-180 shrink-0">↓</span>
                        </summary>
                        <div className="px-4 pb-4 text-[13px] leading-relaxed text-gray-500 space-y-3 box-border">
                          <p>{detail.desc}</p>
                          <p className="text-[11px] italic bg-white p-2 rounded-lg border-l-2 border-[#F4B433] box-border shadow-sm">{detail.history}</p>
                        </div>
                      </details>
                    ))}
                  </motion.div>
                </div>
                <PrimaryButton onClick={next}>CONTINUE</PrimaryButton>
              </div>
            )}

            {/* ШАГ 7: YOUR STAGE */}
            {step === 7 && (
              <div className="space-y-6 w-full box-border">
                <div>
                  <h1 className="text-2xl font-serif font-bold text-[#101828] leading-tight uppercase">
                    Your Stage.
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">
                    Are you registering as a Paul or Barnabas?
                  </p>
                </div>

                <div className="space-y-3 w-full box-border">
                  {[
                    { name: 'Paul', age: 'age 18-29' },
                    { name: 'Barnabas', age: 'age 30 or older' }
                  ].map(role => (
                    <button 
                      key={role.name} 
                      type="button"
                      onClick={() => set('stage', role.name)} 
                      className={`w-full p-5 rounded-2xl border-2 transition-all text-left flex justify-between items-center box-border ${
                        form.stage === role.name 
                        ? 'border-[#F4B433] bg-[#F4B433]/5 text-[#101828]' 
                        : 'border-gray-50 bg-gray-50 text-gray-400'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-lg font-bold">{role.name}</span>
                        <span className={`text-[10px] font-black uppercase tracking-wider mt-0.5 ${form.stage === role.name ? 'text-[#F4B433]' : 'text-gray-300'}`}>
                          ({role.age})
                        </span>
                      </div>
                      {form.stage === role.name && <div className="w-2.5 h-2.5 rounded-full bg-[#F4B433] shrink-0" />}
                    </button>
                  ))}
                </div>

                <PrimaryButton disabled={!form.stage} onClick={next}>NEXT</PrimaryButton>

                <div className="border-t border-gray-100 pt-4">
                  <h3 className="text-xs font-black text-[#101828] mb-3 uppercase tracking-wider">
                    Following are the characters:
                  </h3>
                  {/* ИСПРАВЛЕНО: Добавлен layout и уникальный префикс для ключей на Шаге 7 */}
                  <motion.div layout className="space-y-3 w-full box-border">
                    {STAGE_DETAILS
                      .filter(d => d.title.includes('Paul') || d.title.includes('Barnabas'))
                      .map((detail) => (
                      <details key={`step7-${detail.title}`} className="group bg-gray-50 rounded-2xl overflow-hidden transition-all border border-gray-100/50">
                        <summary className="list-none p-4 cursor-pointer flex justify-between items-center font-bold text-xs text-gray-600 select-none">
                          <span className="pr-2">{detail.title}</span>
                          <span className="text-[#F4B433] transition-transform group-open:rotate-180 shrink-0">↓</span>
                        </summary>
                        <div className="px-4 pb-4 text-[13px] leading-relaxed text-gray-500 space-y-3 box-border">
                          <p>{detail.desc}</p>
                          <p className="text-[11px] italic bg-white p-2 rounded-lg border-l-2 border-[#F4B433] box-border shadow-sm">{detail.history}</p>
                        </div>
                      </details>
                    ))}
                  </motion.div>
                </div>
              </div>
            )}

            {/* ШАГ 8: COUNT */}
            {step === 8 && (
              <div className="space-y-6 w-full box-border">
                <div className="text-center">
                  <h1 className="text-2xl font-serif font-bold text-[#101828] mb-1">How many disciples?</h1>
                  <p className="text-sm text-gray-400">Select the number of men in your group.</p>
                </div>
                <div className="grid grid-cols-3 gap-3 w-full box-border">
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <button 
                      key={n} 
                      type="button"
                      onClick={() => handleCountChange(String(n))} 
                      className={`py-6 rounded-2xl text-2xl font-serif font-bold transition-all border-2 box-border ${
                        form.count === String(n) 
                        ? 'bg-[#F4B433] border-[#F4B433] text-[#101828]' 
                        : 'bg-gray-50 border-transparent text-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <div className="pt-2">
                  <PrimaryButton disabled={!form.count} onClick={next}>NEXT</PrimaryButton>
                </div>
              </div>
            )}

            {/* ШАГ 9: DISCIPLE DETAILS */}
            {step === 9 && (
              <div className="w-full box-border">
                <div className="mb-4">
                  <h1 className="text-2xl font-serif font-bold text-[#101828]">Disciple Details</h1>
                  <p className="text-sm text-gray-400">Information for your {form.count} disciples.</p>
                </div>

                <div className="space-y-4 mb-6 w-full box-border">
                    {form.disciples.map((d, i) => (
                        <div key={i} className="p-5 bg-gray-50 rounded-[28px] space-y-4 border border-gray-100 box-border w-full">
                            <div className="flex justify-between items-center">
                              <p className="text-[10px] font-black text-[#F4B433] uppercase">Disciple #{i+1}</p>
                              {d.firstName && d.stage && d.age && <CheckCircle size={14} className="text-green-500 shrink-0" />}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3 w-full box-border">
                              <StyledInput 
                                placeholder="First Name" 
                                value={d.firstName} 
                                onChange={e => updateDisciple(i, 'firstName', e.target.value)} 
                              />
                              <StyledInput 
                                placeholder="Last Name" 
                                value={d.lastName} 
                                onChange={e => updateDisciple(i, 'lastName', e.target.value)} 
                              />
                            </div>
                            
                            <StyledInput 
                                type="text" 
                                inputMode="numeric"
                                placeholder="Age" 
                                value={d.age} 
                                onChange={e => {
                                    const val = e.target.value;
                                    if (/^\d*$/.test(val) && val.length <= 3) {
                                        updateDisciple(i, 'age', val);
                                    }
                                }} 
                            />

                            <div className="space-y-1.5">
                              <p className="text-[10px] font-bold text-gray-400 uppercase ml-1">Select Stage</p>
                              <div className="flex flex-wrap gap-1.5 w-full box-border">
                                  {STAGES.map(s => (
                                      <button 
                                        key={s} 
                                        type="button"
                                        onClick={() => {
                                          if (s === 'Paul' && form.stage !== 'Barnabas') {
                                            toast.error('Only a Barnabas can disciple a Paul.');
                                            return;
                                          }
                                          updateDisciple(i, 'stage', s);
                                        }} 
                                        className={`px-3 py-2 rounded-xl text-[10px] font-bold transition-all border box-border ${
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
                    disabled={form.disciples.length === 0 || form.disciples.some(d => !d.firstName || !d.age || !d.stage)} 
                    onClick={handleSubmit}
                >
                    COMPLETE REGISTRATION
                </PrimaryButton>

                <div className="border-t border-gray-100 pt-4 mt-6">
                  <h3 className="text-xs font-black text-[#101828] mb-3 uppercase tracking-wider">
                    Not sure which stage to choose?
                  </h3>
                  {/* ИСПРАВЛЕНО: Добавлен layout и уникальный префикс для ключей на Шаге 9 */}
                  <motion.div layout className="space-y-3 w-full box-border">
                    {STAGE_DETAILS.map((detail) => (
                      <details key={makeUniqueKey(9, detail.title)} className="group bg-gray-50 rounded-2xl overflow-hidden transition-all border border-gray-100/50">
                        <summary className="list-none p-4 cursor-pointer flex justify-between items-center font-bold text-xs text-gray-600 select-none">
                          <span className="pr-2">{detail.title}</span>
                          <span className="text-[#F4B433] transition-transform group-open:rotate-180 shrink-0">↓</span>
                        </summary>
                        <div className="px-4 pb-4 text-[13px] leading-relaxed text-gray-500 space-y-3 box-border">
                          <p>{detail.desc}</p>
                          <p className="text-[11px] italic bg-white p-2 rounded-lg border-l-2 border-[#F4B433] box-border shadow-sm">{detail.history}</p>
                        </div>
                      </details>
                    ))}
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Вспомогательный хелпер для генерации изолированных ключей DOM
const makeUniqueKey = (step, title) => `step-${step}-${title.replace(/\s+/g, '-').toLowerCase()}`;

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