'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';

// Define events
const EVENTS = [
  'Technical Symposium',
  'Coding Competition',
  'Robotics Workshop',
  'Hackathon',
  'Data Science Summit',
  'AI Conference'
];

// Maximum number of team members
const MAX_TEAM_MEMBERS = 4;

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
    event: '' // New event field
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
    if (formData.teamMembers.length > 1) {
      setFormData(prev => ({
        ...prev,
        teamMembers: prev.teamMembers.filter((_, index) => index !== indexToRemove)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div>
        <h1 className="text-2xl font-bold text-white text-center mb-8">
            REGISTRATION FORM
        </h1>
    <div className="py-8 w-1/2 inset-x-0 bg-gradient-to-b from-blue-950 to-blue-900 mx-auto p-4 rounded-xl relative">
      <div className=''
      // use this for the radial gradient
      >
        <Image src={'/ass.png'} alt="Registration" className='mx-auto z-10 absolute inset-0 w-fit h-fit object-cover opacity-5' width={500} height={500} />
      <div className="w-full max-w-2xl p-10 relative z-10 mx-auto">
      <form onSubmit={handleSubmit} className="space-y-7">
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-md bg-blue-950/90 border border-blue-500/10 text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-white peer"
              placeholder=" "
              id='name'
              required
            />
            <label className="absolute text-gray-300 duration-200 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-blue-950/90 px-2 my-2 left-1
              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:bg-white peer-focus:text-black peer-focus:-translate-y-6 rounded-3xl cursor-text "
              htmlFor='name'
              >
              Name
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              name="teamName"
              value={formData.teamName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-md bg-blue-950/90 border border-blue-500/10 text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-white peer"
              placeholder=" "
              id='teamName'
              required
            />
            <label className="absolute text-gray-300 duration-200 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-blue-950/90 px-2 my-2 left-1
              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:bg-white peer-focus:text-black peer-focus:-translate-y-6 rounded-3xl cursor-text"
              htmlFor='teamName'
              >
              Team Name
            </label>
          </div>
          <div className="space-y-4">
            {formData.teamMembers.map((member, index) => (
              <div key={index} className="flex gap-2 items-center">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder=" "
                    value={member.name}
                    onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-blue-950/90 border border-blue-500/10 text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-white peer"
                    id={`name-${index}`}
                    required
                  />
                  <label 
                    className="absolute text-gray-300 duration-200 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-blue-950/90 px-2 my-2 left-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:bg-white peer-focus:text-black peer-focus:-translate-y-6 rounded-3xl cursor-text"
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
                    className="w-full px-4 py-3 rounded-md bg-blue-950/90 border border-blue-500/10 text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-white peer"
                    id={`department-${index}`}
                    required
                  />
                  <label 
                    className="absolute text-gray-300 duration-200 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-blue-950/90 px-2 my-2 left-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:bg-white peer-focus:text-black peer-focus:-translate-y-6 rounded-3xl cursor-text"
                    htmlFor={`department-${index}`}
                  >
                    Department
                  </label>
                </div>

                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeTeamMember(index)}
                    className="p-2 text-red-600 hover:bg-red-500/20 rounded-full transition-all border border-white/10"
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
                className="text-blue-300 border border-blue-300 px-3 py-1 rounded-md hover:bg-white/50 hover:text-black transition-all duration-200 hover:border-black"
              >
                + Add Another
              </button>
            )}
            {formData.teamMembers.length === MAX_TEAM_MEMBERS && (
              <p className="text-red-300 text-sm">
                Maximum team size of {MAX_TEAM_MEMBERS} members reached
              </p>
            )}
          </div>
          <div className="relative">
          <div className="relative">
              <select
                name="event"
                value={formData.event}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-md bg-blue-950/90 border border-blue-500/10 text-white 
                  focus:outline-none focus:ring-1 focus:ring-white 
                  appearance-none" // Removes default browser styling
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
              {/* Custom dropdown arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <svg 
                  className="fill-current h-4 w-4" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" 
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-md bg-blue-950/90 border border-blue-500/10 text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-white peer"
              placeholder=" "
              id='collegeName'
              required
            />
            <label className="absolute text-gray-300 duration-200 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-blue-950/90 px-2 my-2 left-1
              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:bg-white peer-focus:text-black peer-focus:-translate-y-6 rounded-3xl cursor-text"
              htmlFor='collegeName'
              >
              College Name
            </label>
          </div>
          <div className="relative">
            <input
              type="email"
              name="mailId"
              value={formData.mailId}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-md bg-blue-950/90 border border-blue-500/10 text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-white peer"
              placeholder=" "
              id='mailId'
              required
            />
            <label className="absolute text-gray-300 duration-200 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-blue-950/90 px-2 my-2 left-1
              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:bg-white peer-focus:text-black peer-focus:-translate-y-6 rounded-3xl cursor-text"
              htmlFor='mailId'
              >
              Mail ID
            </label>
          </div>
          <div className="relative">
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              pattern="[0-9]*"
              inputMode="numeric"
              className="w-full px-4 py-3 rounded-md bg-blue-950/90 border border-blue-500/10 text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-white peer"
              placeholder=" "
              id='mobileNumber'
              required
            />
            <label 
              className="absolute text-gray-300 duration-200 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-blue-950/90 px-2 my-2 left-1
              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:bg-white peer-focus:text-black peer-focus:-translate-y-6 rounded-3xl cursor-text"
              htmlFor='mobileNumber'
            >
              Mobile Number
            </label>
          </div>
          {/* Validation message */}
          {formData.mobileNumber.length > 0 && formData.mobileNumber.length < 10 && (
            <p className="text-red-300 text-sm mt-1">
              Please enter a valid 10-digit mobile number
            </p>
          )}
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
    </div>
  );
};

export default EventRegistrationForm;