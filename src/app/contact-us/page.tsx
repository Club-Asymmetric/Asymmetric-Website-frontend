'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  name: string;
  mailId: string;
  mobileNumber: string;
  topic: string;
  message: string;
}

const TOPICS = [
  'Event Registration',
  'Workshop Query',
  'Hackathon Query',
  'Podcast',
  'Collaboration',
  'Sponsorship',
  'Membership',
  'Technical Issue',
  'Other',
];

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">
      {children} {required && <span className="text-red-400">*</span>}
    </label>
  );
}

const inputBase =
  'h-[54px] w-full rounded-[12px] border border-[#252633] bg-[#111218] px-4 text-sm text-white placeholder:text-white/30 transition-colors hover:border-[#6366f1] hover:shadow-[0_0_0_3px_rgba(99,102,241,0.12)] focus:outline-none focus:border-[#6366f1]';

const ContactUsForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mailId: '',
    mobileNumber: '',
    topic: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 260)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [formData.message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1400);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({ name: '', mailId: '', mobileNumber: '', topic: '', message: '' });
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
          src="/assets/logo/ass.png"
          alt=""
          aria-hidden="true"
          width={500}
          height={500}
          className="pointer-events-none absolute inset-0 z-0 m-auto h-[80%] w-[80%] object-contain opacity-[0.025]"
        />

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.div
                key="loading"
                className="flex min-h-[360px] flex-col items-center justify-center space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="relative h-12 w-12"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="absolute inset-0 rounded-full border-4 border-t-[#6366f1] border-r-transparent border-b-transparent border-l-transparent" />
                </motion.div>
                <p className="text-sm text-white/50">Sending your message...</p>
              </motion.div>
            ) : isSubmitted ? (
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
                    Message Sent ✓
                  </motion.h2>
                  <motion.p
                    className="text-sm md:text-base leading-relaxed text-white/70 max-w-md mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  >
                    Your message has entered the Asymmetric universe. We&apos;ll get back to you soon.
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
                      onClick={resetForm}
                      className="px-6 py-2.5 rounded-[12px] bg-[#6366f1] hover:bg-[#5457e0] text-white text-sm md:text-base font-semibold transition-colors"
                    >
                      Send Another
                    </motion.button>
                    <Link
                      href="/"
                      className="px-6 py-2.5 rounded-[12px] border border-white/15 text-white/80 hover:bg-white/5 text-sm md:text-base font-semibold transition-colors"
                    >
                      Back Home
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-10"
              >
                {/* Header */}
                <div className="space-y-3">
                  <p className="font-mono text-xs tracking-[0.25em] text-[#6366f1] uppercase">
                    Contact // Asymmetric
                  </p>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                    Got something to ask?
                  </h1>
                  <p className="text-sm md:text-base text-white/50 max-w-xl">
                    Events, registrations, podcasts, collaborations, random questions — send them our way.
                  </p>
                  <p className="text-xs md:text-sm italic text-white/30">
                    We usually reply before your next existential crisis.
                  </p>
                </div>

                {/* Row 1: Name + Email */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <FieldLabel required>Name</FieldLabel>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="What should we call you?"
                      className={inputBase}
                      required
                    />
                  </div>
                  <div>
                    <FieldLabel required>Email</FieldLabel>
                    <input
                      type="email"
                      name="mailId"
                      id="mailId"
                      value={formData.mailId}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                      className={inputBase}
                      required
                    />
                  </div>
                </div>

                {/* Row 2: Phone + Topic */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <FieldLabel>Phone Number (optional)</FieldLabel>
                    <input
                      type="tel"
                      name="mobileNumber"
                      id="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      pattern="[0-9]*"
                      inputMode="numeric"
                      placeholder="Your contact number"
                      className={inputBase}
                    />
                    <p className="mt-1.5 text-xs text-white/40">Only if you&apos;d like us to call back.</p>
                    {formData.mobileNumber.length > 0 && formData.mobileNumber.length < 10 && (
                      <p className="mt-1 text-xs text-red-300">Please enter a valid 10-digit number</p>
                    )}
                  </div>
                  <div>
                    <FieldLabel required>Topic</FieldLabel>
                    <div className="relative">
                      <select
                        name="topic"
                        id="topic"
                        value={formData.topic}
                        onChange={handleInputChange}
                        required
                        className={`${inputBase} appearance-none pr-10 ${
                          formData.topic ? 'text-white' : 'text-white/30'
                        }`}
                      >
                        <option value="" disabled>
                          Select a topic
                        </option>
                        {TOPICS.map((t) => (
                          <option key={t} value={t} className="text-white bg-[#111218]">
                            {t}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
                        ▾
                      </span>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <FieldLabel required>What&apos;s up?</FieldLabel>
                  <textarea
                    ref={textareaRef}
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    maxLength={500}
                    placeholder="Tell us what you need help with..."
                    className="min-h-[140px] w-full resize-none overflow-hidden rounded-[12px] border border-[#252633] bg-[#111218] px-4 py-3.5 text-sm text-white placeholder:text-white/30 transition-colors hover:border-[#6366f1] focus:border-[#6366f1] focus:outline-none"
                    required
                  />
                  <div className="mt-1.5 text-right text-xs text-white/40">{formData.message.length}/500</div>
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.98 }}
                    className="group flex h-[54px] w-full items-center justify-center gap-2 rounded-[12px] bg-[#6366f1] px-8 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.45)] sm:w-auto sm:min-w-[230px]"
                  >
                    Send Message
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
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

export default ContactUsForm;
