import React from 'react';
import Header from './shared/Header';
import { Link } from 'react-router-dom';
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid';

const Dashboard = () => {
  const sportsCategories = [
    { name: 'Badminton', image: 'https://images.pexels.com/photos/976873/pexels-photo-976873.jpeg', color: 'bg-blue-500' },
    { name: 'Football', image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg', color: 'bg-green-500' },
    { name: 'Cricket', image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg', color: 'bg-red-500' },
    { name: 'Swimming', image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg', color: 'bg-cyan-500' },
    { name: 'Tennis', image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg', color: 'bg-yellow-500' },
    { name: 'Table Tennis', image: 'https://images.pexels.com/photos/976873/pexels-photo-976873.jpeg', color: 'bg-purple-500' }
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
      
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="bg-white p-4">
          <div className="flex items-center space-x-3 mb-4">
            <MapPinIcon className="h-5 w-5 text-emerald-600" />
            <span className="text-gray-700">Ahmedabad</span>
          </div>
          
          <div className="bg-emerald-50 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">FIND PLAYERS & VENUES NEARBY</h2>
            <p className="text-gray-600 text-sm">Seamlessly explore sports venues and play with sports enthusiasts just like you!</p>
          </div>
          
          <Link
            to="/courts"
            className="block bg-emerald-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-emerald-700 transition duration-200 mb-6"
          >
            Book Venues
          </Link>
          
          <div className="space-y-4">
            {recommendedCourts.slice(0, 2).map((court) => (
              <div key={court.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={court.image}
                  alt={court.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{court.name}</h3>
                  <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{court.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <StarIcon className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-medium">{court.rating}</span>
                    </div>
                    <span className="font-semibold text-emerald-600">₹{court.price}/hour</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-2xl p-8 text-white mb-12">
            <div className="flex items-center space-x-3 mb-4">
              <MapPinIcon className="h-6 w-6" />
              <span className="text-lg">Ahmedabad</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">FIND PLAYERS & VENUES NEARBY</h1>
            <p className="text-xl mb-6 opacity-90">
              Seamlessly explore sports venues and play with sports enthusiasts just like you!
            </p>
            <Link
              to="/courts"
              className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition duration-200"
            >
              Book Venues
            </Link>
          </div>

          {/* Recommended Courts */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Book Venues</h2>
              <Link
                to="/courts"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                See all venues →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedCourts.map((court) => (
                <Link
                  key={court.id}
                  to={`/court/${court.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200"
                >
                  <img
                    src={court.image}
                    alt={court.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{court.name}</h3>
                    <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{court.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <StarIcon className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm font-medium">{court.rating}</span>
                      </div>
                      <span className="font-semibold text-emerald-600">₹{court.price}/hour</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Popular Sports */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Sports</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {sportsCategories.map((sport) => (
                <Link
                  key={sport.name}
                  to={`/courts?sport=${sport.name.toLowerCase()}`}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-lg aspect-square">
                    <img
                      src={sport.image}
                      alt={sport.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">{sport.name}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;