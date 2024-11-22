'use client';

import React, { useState, useRef, useEffect } from 'react';
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
    <div>
      <h1 className="text-2xl font-bold text-white text-center mb-8 w-3/4 my-10 mx-auto">
        Got queries about our events or podcasts? Need help with event registrations? Your questions are safe with us—secured and encrypted, always!
      </h1>
      <div className="py-8 w-1/2 inset-x-0 bg-gradient-to-b from-blue-950 to-blue-900 mx-auto p-4 rounded-xl relative">
            <Image 
            src={'/ass.png'} 
            alt="Registration" 
            className='mx-auto z-10 absolute -inset-10 w-fit h-fit object-cover opacity-5' 
            width={500} 
            height={500} 
            />
        <div className="w-full max-w-2xl p-10 relative z-10 mx-auto">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Name Input */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-md bg-blue-950/90 border border-blue-500/10 text-white peer placeholder:text-white/70"
                placeholder="What should we call you?"
                id='name'
                required
              />
              <label 
                htmlFor='name'
                className={`absolute left-0 top-[-5px] bg-transparent px-1 text-white/50 
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
                className="w-full px-4 py-3 rounded-md bg-blue-950/90 border border-blue-500/10 text-white peer placeholder:text-white/70"
                placeholder="name@gmail.com"
                id='mailId'
                required
              />
              <label 
                htmlFor='mailId'
                className={`absolute left-0 top-[-5px] bg-transparent px-1 text-white/50 
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
                className="w-full px-4 py-3 rounded-md bg-blue-950/90 border border-blue-500/10 text-white peer placeholder:text-white/70"
                placeholder="digits, please! No prank calls, we promise"
                id='mobileNumber'
                required
              />
              <label 
                htmlFor='mobileNumber'
                className={`absolute -left-2 top-[-5px] bg-transparent px-1 text-white/50 
                    ${formData.mobileNumber ? 'scale-75 -translate-y-full transition-all duration-200' : 'hidden'}`}
              >
                Mobile Number
              </label>
              {/* Mobile Number Validation */}
              {formData.mobileNumber.length > 0 && formData.mobileNumber.length < 10 && (
                <p className="text-red-300 text-sm mt-1">
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
                className="w-full px-4 py-3 rounded-md bg-blue-950/90 border border-blue-500/10 text-white peer placeholder:text-white/70 resize-none overflow-hidden min-h-[150px] max-h-[200px]"
                placeholder="Your message here..."
                id='message'
                maxLength={500}
                required
              />
              <label 
                htmlFor='message'
                className={`absolute -left-1 top-[-5px] bg-transparent px-1 text-white/50 
                    ${formData.message ? 'scale-75 -translate-y-full transition-all duration-200' : 'hidden'}`}
              >
                Message
              </label>
              <div 
                className="text-right text-white/50 text-sm mt-1 relative group"
              >
                <span className="cursor-help">
                  {formData.message.length}/500
                </span>
                <div className="absolute bottom-full -right-[35%] bg-blue-900 text-white text-xs p-2 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none mb-2 w-48 text-centers">
                  Are you really going to write over 500 words?
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <div className='flex justify-center'>
              <button
                type="submit"
                className="w-1/2 inset-x-0 bg-cyan-600 hover:bg-gray-300 duration-200 hover:text-black text-white py-4 font-semibold rounded-md transition-colors"
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