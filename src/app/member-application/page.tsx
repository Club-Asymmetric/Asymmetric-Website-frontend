"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import GlowyShit from '@/components/GlowyShit';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, limit } from 'firebase/firestore';

interface FormState {
  name: string;
  mailId: string;
  contactNumber: string;
  department: string; // single select
  year: string; // single select
  track: string; // single select
  linkedIn?: string;
  github?: string;
  resumeUrl?: string; // external link (Drive, etc.)
  description: string;
}

// Map abbreviation -> full form
const DEPARTMENTS: Record<string,string> = {
  'AI-DS': 'Artificial Intelligence and Data Science',
  'CSE': 'Computer Science and Engineering',
  'AI-ML': 'Artificial Intelligence and Machine Learning',
  'ECE': 'Electronics and Communication Engineering',
  'VLSI': 'VLSI Design',
  'EEE': 'Electrical and Electronics Engineering',
  'MECH': 'Mechanical Engineering',
  'CSBS': 'Computer Science and Business Systems',
  'CS': 'Cyber Security',
  'IT': 'Information Technology',
  'ACT': 'Applied Cloud Technology',
  'BME': 'Bio Medical Engineering',
  'MCT': 'Mechatronics Engineering',
  'CE': 'Civil Engineering'
};

const YEARS = ['I','II','III','IV'];

const TRACKS = ['Tech','Non-Tech'];

const urlPattern = /^(https?:\/\/)?[\w.-]+(\.[\w\.-]+)+[\w\-\._~:?#@!$&'()*+,;=/]*$/i;

const MemberApplicationForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    mailId: '',
    contactNumber: '',
    department: '',
    year: '',
    track: '',
    linkedIn: '',
    github: '',
  resumeUrl: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string,string>>({});
  const descRef = useRef<HTMLTextAreaElement>(null);

  const autoGrow = () => {
    const el = descRef.current; if(!el) return; el.style.height='auto'; el.style.height=Math.min(el.scrollHeight, 240)+"px";
  };
  useEffect(()=>{autoGrow();},[form.description]);

  // for radio groups use generic handler
  const setSingle = (field: keyof Pick<FormState,'department'|'year'|'track'>, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev=>({...prev, [name]: value}));
  };

  const validate = (): boolean => {
    const newErrors: Record<string,string> = {};
    if(!form.name.trim()) newErrors.name = 'Name is required';
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.mailId)) newErrors.mailId = 'Valid email required';
    if(!/^\d{10}$/.test(form.contactNumber)) newErrors.contactNumber = '10-digit contact number required';
  if(!form.department) newErrors.department = 'Select a department';
  if(!form.year) newErrors.year = 'Select a year';
  if(!form.track) newErrors.track = 'Select a track';
    if(form.linkedIn && !urlPattern.test(form.linkedIn)) newErrors.linkedIn = 'Invalid URL';
    if(form.github && !urlPattern.test(form.github)) newErrors.github = 'Invalid URL';
    if(!form.description.trim()) newErrors.description = 'Description is required';
  if(form.resumeUrl && !urlPattern.test(form.resumeUrl)) newErrors.resumeUrl = 'Invalid resume URL';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!validate()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      // Duplicate check (mailId or contactNumber already exists)
      const baseCol = collection(db, 'member_applications');
      const mailQ = query(baseCol, where('mailId', '==', form.mailId), limit(1));
      const phoneQ = query(baseCol, where('contactNumber', '==', form.contactNumber), limit(1));
      const [mailSnap, phoneSnap] = await Promise.all([getDocs(mailQ), getDocs(phoneQ)]);
      const dupErrors: Record<string,string> = {};
      if(!mailSnap.empty) dupErrors.mailId = 'This email is already used';
      if(!phoneSnap.empty) dupErrors.contactNumber = 'This contact number is already used';
      if(Object.keys(dupErrors).length) {
        setErrors(prev => ({ ...prev, ...dupErrors }));
        setSubmitting(false);
        return;
      }
      await addDoc(collection(db, 'member_applications'), {
        name: form.name,
        mailId: form.mailId,
        contactNumber: form.contactNumber,
        department: form.department,
        year: form.year,
        track: form.track,
        linkedIn: form.linkedIn || null,
        github: form.github || null,
        description: form.description,
  resumeUrl: form.resumeUrl || null,
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error('Firestore submit error', err);
      setSubmitError(err.message || 'Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => { setForm({ name:'',mailId:'',contactNumber:'',department:'',year:'',track:'',linkedIn:'',github:'',resumeUrl:'',description:''}); setErrors({}); setSubmitted(false); setSubmitError(null); };

  return (
    <div className="px-4 py-8 md:px-8 space-y-12">
      <h1 className="text-xl md:text-2xl font-bold text-white text-center mb-2">
        MEMBER APPLICATION
      </h1>
      
      <div className="py-6 md:py-8 w-full md:w-4/5 lg:w-1/2 bg-ass-gradient mx-auto p-4 rounded-xl relative">
        <GlowyShit color="#7E7E7E" left="15vh" top="20vh" />
        <Image src={'/logo/ass.png'} alt="Member Application" className='mx-auto z-10 absolute -inset-x-5 inset-y-20 sm:inset-0 md:-inset-10 lg:inset-0 w-fit h-fit object-cover opacity-5' width={500} height={500} />
        <div className="w-full max-w-2xl p-4 md:p-8 lg:p-10 relative z-10 mx-auto">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{opacity:0, y:20, scale:0.97}}
                animate={{opacity:1, y:0, scale:1}}
                exit={{opacity:0, y:-10}}
                transition={{duration:0.55, ease:'easeOut'}}
                className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-green-800/30 via-emerald-800/20 to-transparent p-8 md:p-10 space-y-6 shadow-[0_0_25px_-5px_rgba(16,185,129,0.4)]"
              >
                {/* Decorative pulses */}
                <motion.div
                  className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-green-400/10 blur-2xl"
                  animate={{scale:[1,1.2,1]}}
                  transition={{repeat:Infinity, duration:6, ease:'easeInOut'}}
                />
                <motion.div
                  className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl"
                  animate={{scale:[1.1,0.9,1.1]}}
                  transition={{repeat:Infinity, duration:7.5, ease:'easeInOut'}}
                />
                <div className="relative z-10 space-y-4 text-center">
                  <motion.h2
                    className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-400 bg-clip-text text-transparent tracking-wide"
                    initial={{opacity:0, y:10}}
                    animate={{opacity:1, y:0}}
                    transition={{delay:0.1}}
                  >
                    Application Received ✨
                  </motion.h2>
                  <motion.p
                    className="text-sm md:text-base leading-relaxed text-emerald-50/80 max-w-md mx-auto"
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{delay:0.25}}
                  >
                    Your profile just took a quantum leap into our system. Our team will review it soon and reach out if there’s a cosmic alignment. Keep building cool stuff in the meantime.
                  </motion.p>
                  <motion.div
                    className="flex flex-col md:flex-row gap-4 justify-center pt-2"
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{delay:0.4}}
                  >
                    <motion.button
                      whileHover={{scale:1.05}}
                      whileTap={{scale:0.95}}
                      onClick={reset}
                      className="px-6 py-2 rounded-md bg-ass-button hover:bg-gray-300 hover:text-black text-gray-100 text-sm md:text-base font-semibold transition-colors"
                    >
                      Submit Another
                    </motion.button>
                    <a
                      href="/"
                      className="px-6 py-2 rounded-md border border-emerald-300/40 text-emerald-200 hover:bg-emerald-300 hover:text-black text-sm md:text-base font-semibold transition-colors"
                    >
                      Back Home
                    </a>
                  </motion.div>
                  <motion.p
                    className="text-[11px] md:text-xs uppercase tracking-wider text-emerald-200/50 pt-4"
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{delay:0.55}}
                  >
                    You’ll hear from us if there’s a fit — no spam, promise.
                  </motion.p>
                </div>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="space-y-8 md:space-y-10">
                {/* Basic Text Fields */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative">
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder=" " className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-md bg-blue-950/30 border border-blue-500/10 text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-white peer text-sm md:text-base" required />
                    <label className="absolute text-gray-300 duration-200 transform -translate-y-9 scale-75 top-1 z-10 origin-[0] bg-transparent px-2 my-2 left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:bg-white peer-focus:text-black peer-focus:-translate-y-6 peer-focus:left-1 rounded-3xl cursor-text text-sm md:text-base">Name <span className='text-red-400'>*</span></label>
                    {errors.name && <p className="text-xs text-red-300 mt-1">{errors.name}</p>}
                  </div>
                  <div className="relative">
                    <input type="email" name="mailId" value={form.mailId} onChange={handleChange} placeholder=" " className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-md bg-blue-950/30 border border-blue-500/10 text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-white peer text-sm md:text-base" required />
                    <label className="absolute text-gray-300 duration-200 transform -translate-y-9 peer-focus:left-1 scale-75 top-1 z-10 origin-[0] bg-transparent px-2 my-2 left-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:bg-white peer-focus:text-black peer-focus:-translate-y-6 rounded-3xl cursor-text text-sm md:text-base">Mail ID <span className='text-red-400'>*</span></label>
                    {errors.mailId && <p className="text-xs text-red-300 mt-1">{errors.mailId}</p>}
                  </div>
                  <div className="relative">
                    <input type="tel" name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder=" " pattern="[0-9]*" inputMode="numeric" className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-md bg-blue-950/30 border border-blue-500/10 text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-white peer text-sm md:text-base" required />
                    <label className="absolute text-gray-300 duration-200 transform -translate-y-9 peer-focus:left-1 scale-75 top-1 z-10 origin-[0] bg-transparent px-2 my-2 left-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:bg-white peer-focus:text-black peer-focus:-translate-y-6 rounded-3xl cursor-text text-sm md:text-base">Contact Number <span className='text-red-400'>*</span></label>
                    {errors.contactNumber && <p className="text-xs text-red-300 mt-1">{errors.contactNumber}</p>}
                  </div>
                  <div className="relative">
                    <input type="url" name="linkedIn" value={form.linkedIn} onChange={handleChange} placeholder=" " className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-md bg-blue-950/30 border border-blue-500/10 text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-white peer text-sm md:text-base" />
                    <label className="absolute text-gray-300 duration-200 transform -translate-y-9 peer-focus:left-1 scale-75 top-1 z-10 origin-[0] bg-transparent px-2 my-2 left-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:bg-white peer-focus:text-black peer-focus:-translate-y-6 rounded-3xl cursor-text text-sm md:text-base">LinkedIn URL (Optional)</label>
                    {errors.linkedIn && <p className="text-xs text-red-300 mt-1">{errors.linkedIn}</p>}
                  </div>
                  <div className="relative">
                    <input type="url" name="github" value={form.github} onChange={handleChange} placeholder=" " className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-md bg-blue-950/30 border border-blue-500/10 text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-white peer text-sm md:text-base" />
                    <label className="absolute text-gray-300 duration-200 transform -translate-y-9 peer-focus:left-1 scale-75 top-1 z-10 origin-[0] bg-transparent px-2 my-2 left-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:bg-white peer-focus:text-black peer-focus:-translate-y-6 rounded-3xl cursor-text text-sm md:text-base">GitHub URL (Optional)</label>
                    {errors.github && <p className="text-xs text-red-300 mt-1">{errors.github}</p>}
                  </div>
                  <div className="relative">
                    <input type="url" name="resumeUrl" value={form.resumeUrl} onChange={handleChange} placeholder=" " className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-md bg-blue-950/30 border border-blue-500/10 text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-white peer text-sm md:text-base" />
                    <label className="absolute text-gray-300 duration-200 transform -translate-y-9 peer-focus:left-1 scale-75 top-1 z-10 origin-[0] bg-transparent px-2 my-2 left-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:bg-white peer-focus:text-black peer-focus:-translate-y-6 rounded-3xl cursor-text text-sm md:text-base">Resume URL (Optional)</label>
                    {errors.resumeUrl && <p className="text-xs text-red-300 mt-1">{errors.resumeUrl}</p>}
                  </div>
                </div>

                {/* Radio Groups */}
                <div className="grid md:grid-cols-3 gap-8">
                  <fieldset className="space-y-3">
                    <legend className="text-white font-semibold text-sm md:text-base">Department <span className="text-red-400">*</span></legend>
                    <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1 minimal-scrollbar">
                      {Object.entries(DEPARTMENTS).map(([abbr, full]) => (
                        <label key={abbr} className="flex items-start gap-2 text-xs md:text-sm text-white/80 cursor-pointer">
                          <input type="radio" name="department" value={abbr} className="accent-ass-button mt-[2px]" checked={form.department === abbr} onChange={()=>setSingle('department', abbr)} required />
                          <span><span className="font-semibold text-white/90">{full}</span><span className="text-white/40"> ({abbr})</span></span>
                        </label>
                      ))}
                    </div>
                    {errors.department && <p className="text-xs text-red-300 mt-1">{errors.department}</p>}
                  </fieldset>

                  <fieldset className="space-y-3">
                    <legend className="text-white font-semibold text-sm md:text-base">Year <span className="text-red-400">*</span></legend>
                    <div className="flex flex-wrap gap-3">
                      {YEARS.map(yr => (
                        <label key={yr} className="flex items-center gap-2 text-xs md:text-sm text-white/80 cursor-pointer">
                          <input type="radio" name="year" value={yr} className="accent-ass-button" checked={form.year === yr} onChange={()=>setSingle('year', yr)} required />
                          <span>{yr}</span>
                        </label>
                      ))}
                    </div>
                    {errors.year && <p className="text-xs text-red-300 mt-1">{errors.year}</p>}
                  </fieldset>

                  <fieldset className="space-y-3">
                    <legend className="text-white font-semibold text-sm md:text-base">Track <span className="text-red-400">*</span></legend>
                    <div className="flex flex-col gap-2">
                      {TRACKS.map(t => (
                        <label key={t} className="flex items-center gap-2 text-xs md:text-sm text-white/80 cursor-pointer">
                          <input type="radio" name="track" value={t} className="accent-ass-button" checked={form.track === t} onChange={()=>setSingle('track', t)} required />
                          <span>{t}</span>
                        </label>
                      ))}
                    </div>
                    {errors.track && <p className="text-xs text-red-300 mt-1">{errors.track}</p>}
                  </fieldset>
                </div>

                {/* Description */}
                <div className="relative">
                  <textarea name="description" ref={descRef} value={form.description} onChange={handleChange} placeholder="Describe work you've done, projects, events, achievements..." maxLength={800} className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-md bg-blue-950/30 border border-blue-500/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-1 focus:ring-white resize-none overflow-hidden min-h-[140px] text-sm md:text-base" aria-label="Description (required)" required />
                  <div className="flex justify-between text-white/50 text-xs mt-1">
                    <span><span className='text-red-400'>*</span> {form.description.length}/800</span>
                    {errors.description && <span className="text-red-300">{errors.description}</span>}
                  </div>
                </div>

                {/* Submit */}
                {submitError && <p className="text-center text-red-400 text-sm">{submitError}</p>}
                <div className="flex justify-center">
                  <motion.button type="submit" disabled={submitting} whileHover={!submitting ? {backgroundColor:"rgb(229 231 235)",color:"rgb(0 0 0)",scale:1.05}: undefined} whileTap={!submitting ? {scale:0.95}: undefined} className={`w-1/2 sm:w-1/3 xl:w-1/4 bg-ass-button text-gray-100 py-2 text-sm md:text-base font-semibold rounded-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed`}>
                    {submitting ? 'Submitting...' : 'SUBMIT'}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MemberApplicationForm;
