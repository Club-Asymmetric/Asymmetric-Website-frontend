'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';
import GlowyShit from '@/components/GlowyShit';

const EVENTS = [
  'Technical Symposium',
  'Coding Competition',
  'Robotics Workshop',
  'Hackathon',
  'Data Science Summit',
  'AI Conference'
];

const MAX_TEAM_MEMBERS = 4;
const MIN_TEAM_MEMBERS = 2;

interface TeamMember {
  name: string;
  department: string;
}

interface FormData {
  name: string;
  teamName: string;
  teamMembers: TeamMember[];
  collegeName: string;
  mailId: string;
  mobileNumber: string;
  event: string;
}

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    teamName: '',
    teamMembers: [{ name: '', department: '' }],
    collegeName: '',
    mailId: '',
    mobileNumber: '',
    event: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    setFormData(prev => {
      const newTeamMembers = [...prev.teamMembers];
      newTeamMembers[index] = {
        ...newTeamMembers[index],
        [field]: value
      };
      return {
        ...prev,
        teamMembers: newTeamMembers
      };
    });
  };

  const addTeamMember = () => {
    if (formData.teamMembers.length < MAX_TEAM_MEMBERS) {
      setFormData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, { name: '', department: '' }]
      }));
    }
  };

  const removeTeamMember = (indexToRemove: number) => {
    if (formData.teamMembers.length > MIN_TEAM_MEMBERS) {
      setFormData(prev => ({
        ...prev,
        teamMembers: prev.teamMembers.filter((_, index) => index !== indexToRemove)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.teamMembers.length < MIN_TEAM_MEMBERS) {
      alert(`Minimum ${MIN_TEAM_MEMBERS} team members required`);
      return;
    }
    
    const hasEmptyFields = formData.teamMembers.some(
      member => !member.name || !member.department
    );
    
    if (hasEmptyFields) {
      alert('Please fill in all team member details');
      return;
    }

    console.log('Form submitted:', formData);
  };

  return (
    <div className="px-4 md:px-6 lg:px-8">
      <h1 className="text-xl md:text-2xl font-bold text-white text-center mb-6 md:mb-8">
        REGISTRATION FORM
      </h1>
      <div className="py-6 md:py-8 w-full md:w-4/5 lg:w-1/2 bg-gradient-to-b from-blue-950 via-blue-950 to-blue-900 mx-auto p-4 rounded-xl relative">
        <GlowyShit color="#7E7E7E" left="15vh" top="20vh"/>
        <Image 
          src={'/ass.png'} 
          alt="Registration" 
          className='mx-auto z-10 absolute -inset-x-5 inset-y-20 sm:inset-0 md:-inset-10 lg:inset-0 w-fit h-fit object-cover opacity-5' 
          width={500} 
          height={500} 
        />
        <div className="w-full max-w-2xl p-4 md:p-8 lg:p-10 relative z-10 mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-7">
            {/* Basic Input Fields */}
            {['name', 'teamName'].map((field) => (
              <div key={field} className="relative">
                <input
                  type="text"
                  name={field}
                  value={formData[field as keyof FormData] as string}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-md bg-blue-950/90 border border-blue-500/10 text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-white peer text-sm md:text-base"
                  placeholder=" "
                  id={field}
                  required
                />
                <label 
                  className="absolute text-gray-300 duration-200 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-transparent px-2 my-2 left-1
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:bg-white peer-focus:text-black peer-focus:-translate-y-6 rounded-3xl cursor-text text-sm md:text-base"
                  htmlFor={field}
                >
                  {field === 'name' ? 'Name' : 'Team Name'}
                </label>
              </div>
            ))}

            {/* Team size indicator */}
            <div className="text-xs md:text-sm text-gray-300 flex flex-col md:flex-row md:justify-between gap-2 md:gap-0">
              <span>Require Team: Min: {MIN_TEAM_MEMBERS}, Max: {MAX_TEAM_MEMBERS}</span>
              <span>Your Team: {formData.teamMembers.length}</span>
            </div>

            {/* Team Members Section */}
            <div className="space-y-4">
              {formData.teamMembers.map((member, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-2 md:items-center">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder=" "
                      value={member.name}
                      onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-md bg-blue-950/90 border border-blue-500/10 text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-white peer text-sm md:text-base"
                      id={`name-${index}`}
                      required
                    />
                    <label 
                      className="absolute text-gray-300 duration-200 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-transparent px-2 my-2 left-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:bg-white peer-focus:text-black peer-focus:-translate-y-6 rounded-3xl cursor-text text-sm md:text-base"
                      htmlFor={`name-${index}`}
                    >
                      Team Member Name
                    </label>
                  </div>
                  
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder=" "
                      value={member.department}
                      onChange={(e) => handleTeamMemberChange(index, 'department', e.target.value)}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-md bg-blue-950/90 border border-blue-500/10 text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-white peer text-sm md:text-base"
                      id={`department-${index}`}
                      required
                    />
                    <label 
                      className="absolute text-gray-300 duration-200 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-transparent px-2 my-2 left-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:bg-white peer-focus:text-black peer-focus:-translate-y-6 rounded-3xl cursor-text text-sm md:text-base"
                      htmlFor={`department-${index}`}
                    >
                      Department
                    </label>
                  </div>

                  {formData.teamMembers.length > MIN_TEAM_MEMBERS && (
                    <button
                      type="button"
                      onClick={() => removeTeamMember(index)}
                      className="p-2 text-red-600 hover:bg-red-500/20 rounded-full transition-all border border-white/10 self-center"
                      title="Remove"
                    >
                      <IoMdClose size={20} />
                    </button>
                  )}
                </div>
              ))}

              {formData.teamMembers.length < MAX_TEAM_MEMBERS && (
                <button
                  type="button"
                  onClick={addTeamMember}
                  className="text-blue-300 border border-blue-300 px-3 py-1 rounded-md hover:bg-white/50 hover:text-black transition-all duration-200 hover:border-black text-sm md:text-base"
                >
                  + Add Another
                </button>
              )}
            </div>

            {/* Event Selection */}
            <div className="relative">
              <select
                name="event"
                value={formData.event}
                onChange={handleInputChange}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-md bg-blue-950/90 border border-blue-500/10 text-white 
                  focus:outline-none focus:ring-1 focus:ring-white appearance-none text-sm md:text-base"
                required
              >
                <option value="" disabled className="text-gray-500">Select an Event</option>
                {EVENTS.map((event, index) => (
                  <option 
                    key={index} 
                    value={event}
                    className="bg-blue-950 text-white hover:bg-blue-900"
                  >
                    {event}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            {/* Contact Information Fields */}
            {['collegeName', 'mailId', 'mobileNumber'].map((field) => (
              <div key={field} className="relative">
                <input
                  type={field === 'mailId' ? 'email' : field === 'mobileNumber' ? 'tel' : 'text'}
                  name={field}
                  value={formData[field as keyof FormData] as string}
                  onChange={handleInputChange}
                  pattern={field === 'mobileNumber' ? '[0-9]*' : undefined}
                  inputMode={field === 'mobileNumber' ? 'numeric' : undefined}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-md bg-blue-950/90 border border-blue-500/10 text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-white peer text-sm md:text-base"
                  placeholder=" "
                  id={field}
                  required
                />
                <label 
                  className="absolute text-gray-300 duration-200 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-transparent px-2 my-2 left-1
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:bg-white peer-focus:text-black peer-focus:-translate-y-6 rounded-3xl cursor-text text-sm md:text-base"
                  htmlFor={field}
                >
                  {field === 'collegeName' ? 'College Name' : field === 'mailId' ? 'Mail ID' : 'Mobile Number'}
                </label>
              </div>
            ))}

            {/* Mobile Validation Message */}
            {formData.mobileNumber.length > 0 && formData.mobileNumber.length < 10 && (
              <p className="text-red-300 text-xs md:text-sm mt-1">
                Please enter a valid 10-digit mobile number
              </p>
            )}

            {/* Submit Button */}
            <div className='flex justify-center'>
              <button
                type="submit"
                className="w-full md:w-1/2 bg-cyan-600 hover:bg-gray-300 duration-200 hover:text-black text-white py-3 md:py-4 font-semibold rounded-md transition-colors text-sm md:text-base"
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

export default EventRegistrationForm;