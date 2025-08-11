import React, { useState } from 'react';
import Header from './shared/Header';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/outline';

const SearchExplore = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const sportsCategories = [
    { name: 'Badminton', image: 'https://images.pexels.com/photos/976873/pexels-photo-976873.jpeg', icon: '🏸' },
    { name: 'Football', image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg', icon: '⚽' },
    { name: 'Cricket', image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg', icon: '🏏' },
    { name: 'Swimming', image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg', icon: '🏊' },
    { name: 'Tennis', image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg', icon: '🎾' },
    { name: 'Table Tennis', image: 'https://images.pexels.com/photos/976873/pexels-photo-976873.jpeg', icon: '🏓' }
  ];

  const recommendedCourts = [
    {
      id: 1,
      name: 'SBR Badminton',
      location: 'Satellite, Jodhpur',
      rating: 4.5,
      price: 200,
      image: 'https://images.pexels.com/photos/976873/pexels-photo-976873.jpeg'
    },
    {
      id: 2,
      name: 'Elite Football Ground',
      location: 'Pali Road, Jodhpur',
      rating: 4.8,
      price: 500,
      image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg'
    },
    {
      id: 3,
      name: 'Premium Cricket Academy',
      location: 'Residency Road, Jodhpur',
      rating: 4.3,
      price: 800,
      image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg'
    },
    {
      id: 4,
      name: 'Aqua Sports Center',
      location: 'Circuit House, Jodhpur',
      rating: 4.7,
      price: 300,
      image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Discover Sports Venues & Connect with Players
          </h1>
          
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courts, sports, locations..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Sports Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Browse by Sport
          </h2>
          
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6 min-w-max lg:justify-center">
              {sportsCategories.map((sport) => (
                <Link
                  key={sport.name}
                  to={`/courts?sport=${sport.name.toLowerCase()}`}
                  className="group flex-shrink-0"
                >
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <img
                      src={sport.image}
                      alt={sport.name}
                      className="w-full h-full rounded-2xl object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center">
                      <span className="text-3xl">{sport.icon}</span>
                    </div>
                  </div>
                  <p className="text-center font-medium text-gray-900 group-hover:text-emerald-600 transition duration-200">
                    {sport.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended Courts */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Recommended Venues Near You
            </h2>
            <Link
              to="/courts"
              className="text-emerald-600 hover:text-emerald-700 font-medium text-lg"
            >
              View All →
            </Link>
          </div>
          
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6 lg:grid lg:grid-cols-4 lg:gap-6 lg:space-x-0">
              {recommendedCourts.map((court) => (
                <Link
                  key={court.id}
                  to={`/court/${court.id}`}
                  className="flex-shrink-0 w-72 lg:w-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={court.image}
                      alt={court.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                      <div className="flex items-center space-x-1">
                        <StarIcon className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm font-medium">{court.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition duration-200">
                      {court.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-gray-600 mb-3">
                      <MapPinIcon className="h-4 w-4" />
                      <span className="text-sm">{court.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-emerald-600">
                        ₹{court.price}/hr
                      </span>
                      <button className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg font-medium hover:bg-emerald-100 transition duration-200">
                        Book Now
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Play?</h2>
          <p className="text-xl mb-8 opacity-90">
            Find the perfect venue and connect with fellow sports enthusiasts
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courts"
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition duration-200"
            >
              Browse All Venues
            </Link>
            <Link
              to="/players"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition duration-200"
            >
              Find Players
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SearchExplore;