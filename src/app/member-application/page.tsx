"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, limit } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

interface FormState {
  name: string;
  mailId: string;
  contactNumber: string;
  department: string;
  year: string;
  track: string;
  linkedIn?: string;
  github?: string;
  description: string;
}

const DEPARTMENTS = [
  'Artificial Intelligence & Data Science',
  'Computer Science Engineering',
  'CSE (AI and Machine Learning)',
  'Electronics & Communication Engineering',
  'EE (VLSI Design & Technology)',
  'Electrical & Electronics Engineering',
  'Mechanical Engineering',
  'Sciences & Humanities',
  'Computer Science & Business Systems',
  'CSE (Cyber Security)',
  'Information Technology',
  'ECE (Advanced Communication Technology)',
  'Biomedical Engineering',
  'B.E Mechatronics Engineering',
  'Civil Engineering',
];

const YEARS = ['I', 'II', 'III', 'IV'];
const TRACKS: { label: string; value: string }[] = [
  { label: 'TECH', value: 'Tech' },
  { label: 'NON-TECH', value: 'Non-Tech' },
];

const urlPattern = /^(https?:\/\/)?[\w.-]+(\.[\w\.-]+)+[\w\-\._~:?#@!$&'()*+,;=/]*$/i;
const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB

// ---------- Shared field primitives ----------

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">
      {children} {required && <span className="text-red-400">*</span>}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-300">{message}</p>;
}

const inputBase =
  'h-[54px] w-full rounded-[12px] border bg-[#111218] px-4 text-sm text-white placeholder:text-white/30 transition-colors hover:border-[#6366f1] hover:shadow-[0_0_0_3px_rgba(99,102,241,0.12)] focus:outline-none focus:border-[#6366f1]';

function TextField({
  id,
  label,
  required,
  error,
  ...rest
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <input
        id={id}
        className={`${inputBase} ${error ? 'border-red-400/60' : 'border-[#252633]'}`}
        {...rest}
      />
      <FieldError message={error} />
    </div>
  );
}

// ---------- Searchable department select ----------

function SearchableSelect({
  id,
  options,
  value,
  onChange,
  placeholder,
  error,
}: {
  id: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = query
    ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))
    : options;

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const openList = () => {
    setOpen(true);
    setHighlight(Math.max(0, options.indexOf(value)));
    requestAnimationFrame(() => searchRef.current?.focus());
  };

  const selectOption = (opt: string) => {
    onChange(opt);
    setOpen(false);
    setQuery('');
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        openList();
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[highlight]) selectOption(filtered[highlight]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      setQuery('');
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <FieldLabel required>Department</FieldLabel>
      <button
        type="button"
        id={id}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`flex h-[54px] w-full items-center justify-between rounded-[12px] border bg-[#111218] px-4 text-left text-sm text-white transition-colors hover:border-[#6366f1] hover:shadow-[0_0_0_3px_rgba(99,102,241,0.12)] focus:outline-none ${
          open || error ? 'border-[#6366f1]' : 'border-[#252633]'
        } ${error && !open ? 'border-red-400/60' : ''}`}
      >
        <span className={`truncate ${value ? 'text-white' : 'text-white/30'}`}>{value || placeholder}</span>
        <span className={`ml-2 shrink-0 text-white/40 transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-[12px] border border-[#252633] bg-[#111218] shadow-2xl">
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlight(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search department..."
            className="w-full border-b border-[#252633] bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none"
          />
          <ul role="listbox" className="minimal-scrollbar max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 && <li className="px-4 py-3 text-sm text-white/40">No matches</li>}
            {filtered.map((opt, i) => (
              <li
                key={opt}
                role="option"
                aria-selected={value === opt}
                onMouseEnter={() => setHighlight(i)}
                onClick={() => selectOption(opt)}
                className={`cursor-pointer px-4 py-2.5 text-sm transition-colors ${
                  i === highlight ? 'bg-[#6366f1]/20 text-white' : 'text-white/70'
                } ${value === opt ? 'font-semibold text-white' : ''}`}
              >
                {opt}
              </li>
            ))}
          </ul>
        </div>
      )}
      <FieldError message={error} />
    </div>
  );
}

// ---------- Segmented control ----------

function SegmentedControl({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-[12px] border border-[#252633] bg-[#111218] p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded-[9px] px-5 py-2.5 text-sm font-semibold transition-colors ${
            value === opt.value
              ? 'bg-[#6366f1] text-white'
              : 'text-white/50 hover:bg-[#6366f1]/15 hover:text-white'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

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
    description: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const descRef = useRef<HTMLTextAreaElement>(null);

  const autoGrow = () => {
    const el = descRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 260) + 'px';
  };
  useEffect(() => {
    autoGrow();
  }, [form.description]);

  const setSingle = (field: keyof Pick<FormState, 'department' | 'year' | 'track'>, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > MAX_RESUME_BYTES) {
      setErrors((prev) => ({ ...prev, resumeFile: 'File must be under 5MB' }));
      return;
    }
    setErrors((prev) => {
      const { resumeFile: _drop, ...rest } = prev;
      return rest;
    });
    setResumeFile(file);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.mailId)) newErrors.mailId = 'Valid email required';
    if (!/^\d{10}$/.test(form.contactNumber)) newErrors.contactNumber = '10-digit contact number required';
    if (!form.department) newErrors.department = 'Select a department';
    if (!form.year) newErrors.year = 'Select a year';
    if (!form.track) newErrors.track = 'Select a track';
    if (form.linkedIn && !urlPattern.test(form.linkedIn)) newErrors.linkedIn = 'Invalid URL';
    if (form.github && !urlPattern.test(form.github)) newErrors.github = 'Invalid URL';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!resumeFile) newErrors.resumeFile = 'Resume is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const baseCol = collection(db, 'member_applications');
      const mailQ = query(baseCol, where('mailId', '==', form.mailId), limit(1));
      const phoneQ = query(baseCol, where('contactNumber', '==', form.contactNumber), limit(1));
      const [mailSnap, phoneSnap] = await Promise.all([getDocs(mailQ), getDocs(phoneQ)]);
      const dupErrors: Record<string, string> = {};
      if (!mailSnap.empty) dupErrors.mailId = 'This email is already used';
      if (!phoneSnap.empty) dupErrors.contactNumber = 'This contact number is already used';
      if (Object.keys(dupErrors).length) {
        setErrors((prev) => ({ ...prev, ...dupErrors }));
        setSubmitting(false);
        return;
      }

      let resumeUrl: string | null = null;
      if (resumeFile) {
        const path = `resumes/${Date.now()}-${resumeFile.name}`;
        const fileRef = storageRef(storage, path);
        await uploadBytes(fileRef, resumeFile);
        resumeUrl = await getDownloadURL(fileRef);
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
        resumeUrl,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error('Firestore submit error', err);
      setSubmitError(err.message || 'Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setForm({
      name: '',
      mailId: '',
      contactNumber: '',
      department: '',
      year: '',
      track: '',
      linkedIn: '',
      github: '',
      description: '',
    });
    setResumeFile(null);
    setErrors({});
    setSubmitted(false);
    setSubmitError(null);
  };

  return (
    <div className="px-4 py-10 md:px-8 md:py-16">
      <div className="relative mx-auto w-full max-w-[950px] overflow-hidden rounded-2xl border border-[#24252d] bg-[#0b0b0e] p-6 sm:p-8 md:p-12">
        {/* subtle indigo corner glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#6366f1] opacity-[0.12] blur-[100px]"
        />
        {/* faint logo watermark */}
        <Image
          src="/logo/ass.png"
          alt=""
          aria-hidden="true"
          width={500}
          height={500}
          className="pointer-events-none absolute inset-0 z-0 m-auto h-[80%] w-[80%] object-contain opacity-[0.025]"
        />

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#6366f1]/20 via-[#111218] to-transparent p-8 md:p-10 space-y-6"
              >
                <motion.div
                  className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-[#6366f1]/10 blur-2xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                />
                <div className="relative z-10 space-y-4 text-center">
                  <motion.h2
                    className="text-2xl md:text-3xl font-extrabold text-white tracking-wide"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Application Received
                  </motion.h2>
                  <motion.p
                    className="text-sm md:text-base leading-relaxed text-white/70 max-w-md mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  >
                    Your application is in. Our team will review it and reach out if there&apos;s a fit. Keep building cool stuff in the meantime.
                  </motion.p>
                  <motion.div
                    className="flex flex-col md:flex-row gap-4 justify-center pt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={reset}
                      className="px-6 py-2.5 rounded-[12px] bg-[#6366f1] hover:bg-[#5457e0] text-white text-sm md:text-base font-semibold transition-colors"
                    >
                      Submit Another
                    </motion.button>
                    <Link
                      href="/"
                      className="px-6 py-2.5 rounded-[12px] border border-white/15 text-white/80 hover:bg-white/5 text-sm md:text-base font-semibold transition-colors"
                    >
                      Back Home
                    </Link>
                  </motion.div>
                  <motion.p
                    className="text-[11px] md:text-xs uppercase tracking-wider text-white/30 pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                  >
                    You&apos;ll hear from us if there&apos;s a fit — no spam, promise.
                  </motion.p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-10"
              >
                {/* Header */}
                <div className="space-y-3">
                  <p className="font-mono text-xs tracking-[0.25em] text-[#6366f1] uppercase">Apply // Asymmetric</p>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                    Build. Break. Learn. Repeat.
                  </h1>
                  <p className="text-sm md:text-base text-white/50 max-w-xl">
                    Tell us a little about yourself. No corporate essays required.
                  </p>
                </div>

                {/* Error summary */}
                {Object.keys(errors).length > 0 && (
                  <div className="rounded-[12px] border border-red-400/30 bg-red-900/20 px-4 py-3 text-xs md:text-sm text-red-200 space-y-1">
                    <p className="font-semibold tracking-wide">Please fix the following:</p>
                    <ul className="list-disc list-inside space-y-0.5">
                      {Object.entries(errors).slice(0, 4).map(([field, msg]) => (
                        <li key={field}>{msg}</li>
                      ))}
                      {Object.keys(errors).length > 4 && <li>...and more</li>}
                    </ul>
                  </div>
                )}

                {/* Row 1 */}
                <div className="grid gap-6 md:grid-cols-2">
                  <TextField
                    id="name"
                    name="name"
                    label="Name"
                    required
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="Your full name"
                  />
                  <TextField
                    id="mailId"
                    name="mailId"
                    label="Mail ID"
                    required
                    type="email"
                    value={form.mailId}
                    onChange={handleChange}
                    error={errors.mailId}
                    placeholder="you@example.com"
                  />
                </div>

                {/* Row 2 */}
                <div className="grid gap-6 md:grid-cols-2">
                  <TextField
                    id="contactNumber"
                    name="contactNumber"
                    label="Contact Number"
                    required
                    type="tel"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    value={form.contactNumber}
                    onChange={handleChange}
                    error={errors.contactNumber}
                    placeholder="10-digit number"
                  />
                  <TextField
                    id="linkedIn"
                    name="linkedIn"
                    label="LinkedIn URL (optional)"
                    type="url"
                    value={form.linkedIn}
                    onChange={handleChange}
                    error={errors.linkedIn}
                    placeholder="linkedin.com/in/you"
                  />
                </div>

                {/* Row 3 */}
                <div className="grid gap-6 md:grid-cols-2">
                  <TextField
                    id="github"
                    name="github"
                    label="GitHub URL (optional)"
                    type="url"
                    value={form.github}
                    onChange={handleChange}
                    error={errors.github}
                    placeholder="github.com/you"
                  />
                  <div>
                    <FieldLabel required>Resume</FieldLabel>
                    <div
                      className={`flex h-[54px] items-center justify-between gap-3 rounded-[12px] border bg-[#111218] px-4 transition-colors hover:border-[#6366f1] hover:shadow-[0_0_0_3px_rgba(99,102,241,0.12)] ${
                        errors.resumeFile ? 'border-red-400/60' : 'border-[#252633]'
                      }`}
                    >
                      {resumeFile ? (
                        <div className="flex min-w-0 items-center gap-2">
                          <span className="shrink-0 text-emerald-400">✓</span>
                          <span className="truncate text-sm text-white/80">{resumeFile.name}</span>
                        </div>
                      ) : (
                        <span className="truncate text-sm text-white/30">PDF or DOC, up to 5MB</span>
                      )}
                      <div className="flex shrink-0 items-center gap-3">
                        {resumeFile && (
                          <button
                            type="button"
                            onClick={() => setResumeFile(null)}
                            className="text-xs text-white/50 transition-colors hover:text-red-300"
                          >
                            Remove
                          </button>
                        )}
                        <label className="cursor-pointer rounded-[8px] bg-[#1b1c24] px-3 py-1.5 text-xs font-semibold text-white/80 transition-colors hover:bg-[#6366f1]/20 hover:text-white">
                          {resumeFile ? 'Change' : 'Upload'}
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={handleResumeChange}
                          />
                        </label>
                      </div>
                    </div>
                    <FieldError message={errors.resumeFile} />
                  </div>
                </div>

                {/* Row 4: Department + Year */}
                <div className="grid gap-6 md:grid-cols-2">
                  <SearchableSelect
                    id="department"
                    options={DEPARTMENTS}
                    value={form.department}
                    onChange={(v) => setSingle('department', v)}
                    placeholder="Select your department"
                    error={errors.department}
                  />
                  <div>
                    <FieldLabel required>Year</FieldLabel>
                    <SegmentedControl
                      options={YEARS.map((y) => ({ label: y, value: y }))}
                      value={form.year}
                      onChange={(v) => setSingle('year', v)}
                    />
                    <FieldError message={errors.year} />
                  </div>
                </div>

                {/* Track */}
                <div>
                  <FieldLabel required>Track</FieldLabel>
                  <SegmentedControl options={TRACKS} value={form.track} onChange={(v) => setSingle('track', v)} />
                  <FieldError message={errors.track} />
                </div>

                {/* Description */}
                <div>
                  <FieldLabel required>What have you been up to?</FieldLabel>
                  <p className="mb-2 text-xs text-white/40">
                    Projects, events, competitions, experiments, communities — anything you&apos;re proud of.
                  </p>
                  <textarea
                    name="description"
                    ref={descRef}
                    value={form.description}
                    onChange={handleChange}
                    maxLength={800}
                    className="min-h-[140px] w-full resize-none overflow-hidden rounded-[12px] border border-[#252633] bg-[#111218] px-4 py-3.5 text-sm text-white placeholder:text-white/30 transition-colors hover:border-[#6366f1] hover:shadow-[0_0_0_3px_rgba(99,102,241,0.12)] focus:border-[#6366f1] focus:outline-none"
                    aria-label="What have you been up to? (required)"
                  />
                  <div className="mt-1.5 flex justify-between text-xs text-white/40">
                    <span>{form.description.length}/800</span>
                    {errors.description && <span className="text-red-300">{errors.description}</span>}
                  </div>
                </div>

                {/* Submit */}
                {submitError && <p className="text-center text-red-400 text-sm">{submitError}</p>}
                <div className="flex justify-end">
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileTap={!submitting ? { scale: 0.98 } : undefined}
                    className="group flex h-[54px] w-full items-center justify-center gap-2 rounded-[12px] bg-[#6366f1] px-8 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.45)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[230px]"
                  >
                    {submitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        Submit Application
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </>
                    )}
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
