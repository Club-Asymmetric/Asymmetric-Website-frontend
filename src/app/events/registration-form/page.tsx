'use client';

import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

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
}

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    teamName: '',
    teamMembers: [{ name: '', department: '' }],
    collegeName: '',
    mailId: '',
    mobileNumber: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: '', department: '' }]
    }));
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
            Registration Form
        </h1>
    <div className="py-8 w-fit inset-x-0 bg-gradient-to-br from-blue-950 via-blue-800 to-blue-950 mx-auto p-4 rounded-xl">
      <div className="w-full max-w-2xl p-10">
      <form onSubmit={handleSubmit} className="space-y-7">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md bg-blue-950/5 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            placeholder="Team Name"
            name="teamName"
            value={formData.teamName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md bg-blue-950/5 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="space-y-4">
            {formData.teamMembers.map((member, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Team Member Name"
                  value={member.name}
                  onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                  className="flex-1 px-4 py-2 rounded-md bg-blue-950/5 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Department"
                  value={member.department}
                  onChange={(e) => handleTeamMemberChange(index, 'department', e.target.value)}
                  className="flex-1 px-4 py-2 rounded-md bg-blue-950/5 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeTeamMember(index)}
                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-full transition-colors"
                    title="RemoveYOU"
                  >
                    <IoMdClose size={20} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addTeamMember}
              className="text-blue-300 border border-blue-300 px-3 py-1 rounded-md hover:bg-blue-300/10 transition-colors"
            >
              + Add Another
            </button>
          </div>

          <input
            type="text"
            placeholder="College Name"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md bg-blue-950/5 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            placeholder="Mail ID"
            name="mailId"
            value={formData.mailId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md bg-blue-950/5 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md bg-blue-950/5 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default EventRegistrationForm;