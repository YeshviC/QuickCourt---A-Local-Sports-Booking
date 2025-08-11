import React, { useState } from 'react';
import Header from './shared/Header';
import { useAuth } from '../contexts/AuthContext';
import { PencilIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { StarIcon, MapPinIcon, CalendarDaysIcon } from '@heroicons/react/24/solid';

const ProfileScreen = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('details');
  const [isEditing, setIsEditing] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    oldPassword: '',
    newPassword: ''
  });

  const bookings = [
    {
      id: 1,
      venue: 'SBR Badminton Court',
      sport: 'Badminton',
      date: '10 June 2024',
      time: '5:00 PM - 6:00 PM',
      location: 'Rajkot, Gujarat',
      status: 'Confirmed',
      canCancel: false
    },
    {
      id: 2,
      venue: 'Skyline Badminton Court',
      sport: 'Badminton',
      date: '18 June 2024',
      time: '5:00 PM - 6:00 PM',
      location: 'Rajkot, Gujarat',
      status: 'Confirmed',
      canCancel: true
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProfile({
      firstName: editForm.firstName,
      lastName: editForm.lastName,
      email: editForm.email,
      phone: editForm.phone
    });
    setIsEditing(false);
  };

  const handleReset = () => {
    setEditForm({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      oldPassword: '',
      newPassword: ''
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Sidebar */}
            <div className="lg:w-1/4 bg-gray-50 p-6 border-r border-gray-200">
              <div className="text-center mb-6">
                <div className="relative mx-auto w-20 h-20 mb-4">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-semibold text-xl">
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900">{user?.firstName} {user?.lastName}</h3>
                <p className="text-sm text-gray-600">{user?.phone}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition duration-200 ${
                    activeTab === 'details'
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition duration-200 ${
                    activeTab === 'bookings'
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All Bookings
                </button>
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4 p-6">
              {activeTab === 'details' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Profile Details</h2>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition duration-200"
                      >
                        <PencilIcon className="h-4 w-4" />
                        <span>Edit Profile</span>
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            name="firstName"
                            type="text"
                            value={editForm.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                          </label>
                          <input
                            name="lastName"
                            type="text"
                            value={editForm.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={editForm.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          name="phone"
                          type="tel"
                          value={editForm.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Old Password
                        </label>
                        <div className="relative">
                          <input
                            name="oldPassword"
                            type={showOldPassword ? 'text' : 'password'}
                            value={editForm.oldPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          >
                            {showOldPassword ? (
                              <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                              <EyeIcon className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            name="newPassword"
                            type={showNewPassword ? 'text' : 'password'}
                            value={editForm.newPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          >
                            {showNewPassword ? (
                              <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                              <EyeIcon className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <button
                          onClick={handleReset}
                          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
                        >
                          Reset
                        </button>
                        <button
                          onClick={handleSave}
                          className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition duration-200"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name
                          </label>
                          <p className="text-gray-900 text-lg">{user?.firstName} {user?.lastName}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <p className="text-gray-900 text-lg">{user?.email}</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <p className="text-gray-900 text-lg">{user?.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'bookings' && (
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <button className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-medium">
                      All Bookings
                    </button>
                    <button className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium">
                      Cancelled
                    </button>
                  </div>

                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-blue-600 font-medium">{booking.sport}</span>
                              <h3 className="font-semibold text-gray-900">{booking.venue}</h3>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                              <div className="flex items-center space-x-1">
                                <CalendarDaysIcon className="h-4 w-4" />
                                <span>{booking.date}</span>
                              </div>
                              <span>{booking.time}</span>
                            </div>

                            <div className="flex items-center space-x-1 text-sm text-gray-600 mb-3">
                              <MapPinIcon className="h-4 w-4" />
                              <span>{booking.location}</span>
                            </div>

                            <div className="flex items-center space-x-4">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                ● {booking.status}
                              </span>
                              {booking.canCancel && (
                                <>
                                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                    [Cancel Booking]
                                  </button>
                                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                    [Write Review]
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        {!booking.canCancel && (
                          <p className="text-xs text-gray-500 mt-2">
                            No cancel booking button for past dates
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;