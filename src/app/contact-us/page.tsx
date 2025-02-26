'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlowyShit from '@/components/GlowyShit';
import Image from 'next/image';

interface FormData {
  name: string;
  mailId: string;
  mobileNumber: string;
  message: string;
}

const ContactUsFrom = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mailId: '',
    mobileNumber: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [formData.message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitting(true);
    
    // Simulate network request with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      mailId: '',
      mobileNumber: '',
      message: ''
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: { ease: "easeInOut" }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const loadingContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <div className="px-4 md:px-6 lg:px-8 space-y-12">
      <h1 className="text-xl md:text-2xl font-bold text-white text-center mb-6 md:mb-8 w-full md:w-3/4 my-6 md:my-10 mx-auto">
        Got queries about our events or podcasts? Need help with event registrations? Your questions are safe with us—secured and encrypted, always!
      </h1>
      
      <div className="w-full md:w-4/5 lg:w-1/2 bg-ass-gradient mx-auto p-4 md:p-6 rounded-xl relative">
        <GlowyShit color="#7E7E7E" left="15vh" top="20vh"/>
        <Image 
          src={'/logo/ass.png'} 
          alt="Registration" 
          className='mx-auto z-10 absolute -inset-0 md:-inset-10 w-fit h-fit object-cover opacity-5' 
          width={500} 
          height={500} 
        />
        
        <div className="w-full max-w-2xl p-4 md:p-8 lg:p-10 relative z-10 mx-auto">
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.div 
                key="loading"
                className="flex flex-col items-center justify-center space-y-4 min-h-[400px]"
                variants={loadingContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div 
                  className="relative w-16 h-16"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"></div>
                  <motion.div 
                    className="absolute inset-1 border-4 border-t-blue-300 border-r-transparent border-b-transparent border-l-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear", direction: "reverse" }}
                  ></motion.div>
                </motion.div>
                <motion.p 
                  className="text-white text-lg"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  Sending your message...
                </motion.p>
                <motion.p 
                  className="text-white/50 text-sm italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Waking up the backend team...
                </motion.p>
              </motion.div>
            ) : isSubmitted ? (
              <motion.div 
                key="submitted"
                className="flex flex-col items-center justify-center space-y-6 min-h-[400px] text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div 
                  className="text-3xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  🙄
                </motion.div>
                <motion.h3 
                  className="text-white text-xl md:text-2xl font-bold"
                  variants={itemVariants}
                >
                  Oops! Message Sent to the Void
                </motion.h3>
                <motion.p 
                  className="text-white/80 text-base md:text-lg"
                  variants={itemVariants}
                >
                  Your message was received but our backend developers are currently &quot;debugging&quot;
                  (which we all know means playing video games or watching hentai in the server room).
                </motion.p>
                <motion.p 
                  className="text-white/70 text-sm md:text-base italic"
                  variants={itemVariants}
                >
                  &quot;We&apos;ll add a database... eventually. Right after this coffee break that started 3 months ago.&quot;
                </motion.p>
                <motion.div 
                  className="mt-4 flex space-x-4"
                  variants={itemVariants}
                >
                  <motion.button
                    onClick={resetForm}
                    className="px-6 py-2 bg-ass-button hover:bg-gray-300 duration-200 hover:text-black text-gray-100 text-sm md:text-base font-semibold rounded-md transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    TRY AGAIN
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                onSubmit={handleSubmit} 
                className="space-y-8 md:space-y-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Name Input */}
                <motion.div 
                  className="relative"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-md bg-blue-950/30 border border-blue-500/10 text-white peer placeholder:text-white/70 text-sm md:text-base"
                    placeholder="What should we call you?"
                    id='name'
                    required
                  />
                  <label 
                    htmlFor='name'
                    className={`absolute left-0 top-[-5px] bg-transparent px-1 text-white/50 text-sm 
                      ${formData.name ? 'scale-75 -translate-y-full transition-all duration-200' : 'hidden'}`}
                  >
                    Name
                  </label>
                </motion.div>

                {/* Email Input */}
                <motion.div 
                  className="relative"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <input
                    type="email"
                    name="mailId"
                    value={formData.mailId}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-md bg-blue-950/30 border border-blue-500/10 text-white peer placeholder:text-white/70 text-sm md:text-base"
                    placeholder="name@gmail.com"
                    id='mailId'
                    required
                  />
                  <label 
                    htmlFor='mailId'
                    className={`absolute left-0 top-[-5px] bg-transparent px-1 text-white/50 text-sm
                        ${formData.mailId ? 'scale-75 -translate-y-full transition-all duration-200' : 'hidden'}`}
                  >
                    Mail ID
                  </label>
                </motion.div>

                {/* Mobile Number Input */}
                <motion.div 
                  className="relative"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    pattern="[0-9]*"
                    inputMode="numeric"
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-md bg-blue-950/30 border border-blue-500/10 text-white peer placeholder:text-white/70 text-sm md:text-base"
                    placeholder="digits, please! No prank calls, we promise"
                    id='mobileNumber'
                    required
                  />
                  <label 
                    htmlFor='mobileNumber'
                    className={`absolute -left-2 top-[-5px] bg-transparent px-1 text-white/50 text-sm
                        ${formData.mobileNumber ? 'scale-75 -translate-y-full transition-all duration-200' : 'hidden'}`}
                  >
                    Mobile Number
                  </label>
                  {formData.mobileNumber.length > 0 && formData.mobileNumber.length < 10 && (
                    <p className="text-red-300 text-xs md:text-sm mt-1">
                      Please enter a valid 10-digit mobile number
                    </p>
                  )}
                </motion.div>

                {/* Message Input */}
                <motion.div 
                  className="relative"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <textarea
                    ref={textareaRef}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-md bg-blue-950/30 border border-blue-500/10 text-white peer placeholder:text-white/70 resize-none overflow-hidden min-h-[120px] md:min-h-[150px] max-h-[200px] text-sm md:text-base"
                    placeholder="Your message here..."
                    id='message'
                    maxLength={500}
                    required
                  />
                  <label 
                    htmlFor='message'
                    className={`absolute -left-1 top-[-5px] bg-transparent px-1 text-white/50 text-sm
                        ${formData.message ? 'scale-75 -translate-y-full transition-all duration-200' : 'hidden'}`}
                  >
                    Message
                  </label>
                  <div className="text-right text-white/50 text-xs md:text-sm mt-1 relative group">
                    <span className="cursor-help">
                      {formData.message.length}/500
                    </span>
                    <div className="absolute bottom-full right-[0%] md:-right-[25%] lg:-right-[35%] bg-blue-900 text-white text-xs p-2 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none mb-2 w-48 text-center">
                      Are you really going to write over 500 words?
                    </div>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div 
                  className='flex justify-center'
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <motion.button
                    type="submit"
                    className="w-1/2 sm:w-1/3 xl:w-1/4 bg-ass-button text-gray-100 py-2 text-sm md:text-base font-semibold rounded-md"
                    whileHover={{ 
                      backgroundColor: "rgb(229 231 235)",
                      color: "rgb(0 0 0)",
                      scale: 1.05,
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    SUBMIT
                  </motion.button>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ContactUsFrom;