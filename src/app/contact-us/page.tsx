'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  };

  return (
    <div className="px-4 md:px-6 lg:px-8">
      <h1 className="text-xl md:text-2xl font-bold text-white text-center mb-6 md:mb-8 w-full md:w-3/4 my-6 md:my-10 mx-auto">
        Got queries about our events or podcasts? Need help with event registrations? Your questions are safe with us—secured and encrypted, always!
      </h1>
      
      <div className="w-full md:w-4/5 lg:w-1/2 bg-gradient-to-b from-blue-950 via-blue-950 to-blue-900 mx-auto p-4 md:p-6 rounded-xl relative">
        <GlowyShit color="#7E7E7E" left="15vh" top="20vh"/>
        <Image 
          src={'/logo/ass.png'} 
          alt="Registration" 
          className='mx-auto z-10 absolute -inset-0 md:-inset-10 w-fit h-fit object-cover opacity-5' 
          width={500} 
          height={500} 
        />
        
        <div className="w-full max-w-2xl p-4 md:p-8 lg:p-10 relative z-10 mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
            {/* Name Input */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-md bg-blue-950/90 border border-blue-500/10 text-white peer placeholder:text-white/70 text-sm md:text-base"
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
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                name="mailId"
                value={formData.mailId}
                onChange={handleInputChange}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-md bg-blue-950/90 border border-blue-500/10 text-white peer placeholder:text-white/70 text-sm md:text-base"
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
            </div>

            {/* Mobile Number Input */}
            <div className="relative">
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                pattern="[0-9]*"
                inputMode="numeric"
                className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-md bg-blue-950/90 border border-blue-500/10 text-white peer placeholder:text-white/70 text-sm md:text-base"
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
            </div>

            {/* Message Input */}
            <div className="relative">
              <textarea
                ref={textareaRef}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-md bg-blue-950/90 border border-blue-500/10 text-white peer placeholder:text-white/70 resize-none overflow-hidden min-h-[120px] md:min-h-[150px] max-h-[200px] text-sm md:text-base"
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
                <div className="absolute bottom-full -right-[35%] bg-blue-900 text-white text-xs p-2 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none mb-2 w-48 text-center">
                  Are you really going to write over 500 words?
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className='flex justify-center'>
              <button
                type="submit"
                className="w-full md:w-1/2 bg-cyan-600 hover:bg-gray-300 duration-200 hover:text-black text-white py-3 md:py-4 text-sm md:text-base font-semibold rounded-md transition-colors"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsFrom;